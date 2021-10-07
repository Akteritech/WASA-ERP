import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Location } from "@angular/common";
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit {
  grade: any;
  allEmployeeDetails: any[];
  meta: {
    totalItemCount: number,
    totalPageCount: number,
    itemsPerPage: number,
    currentPage: number,
    nextPage: number,
  };
  response: any;
  dataList: any;
  allDataList: any;
  showDetails: string;
  showCollapse: boolean;
  editId: any;
  @Input() id: number;
  editdatas: any;

  status = [
    { type: 'Active', value: 1 }, { type: 'Inactive', value: 0 } 
  ];
  getEditDatas: any;
  currentRoute: string;
  Name: string;
  SerachText: string;
  datas: any;

  constructor(private api: ApiService, private route: ActivatedRoute, private _location: Location, private router: Router) {
    this.grade = {};
    this.meta = {
      totalItemCount: 0,
      totalPageCount: 0,
      itemsPerPage: 30,
      currentPage: 1,
      nextPage: 0,
    };
    this.showCollapse = true;
    this.route.params.subscribe( params => {
      if (params.id) {
        this.editId = params.id;
        this.getDataGradeEdit(params.id);
      }
    });

    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = this.router.url;
        }
      }
  );
    
  }

  ngOnInit() {
    this.get()
  }

  patch() {
    this.grade.CommandID = 1,
    this.grade.Updated = new Date(),
    this.grade.UpdatedBy = sessionStorage.getItem('username'),

      this.api.postdata('psn-employees/gradeInsert', this.grade).subscribe((res: any) => {
        this.response = res;
        console.log(this.response);
        this.api.showSuccessToast('Success', this.response.message);
      });
  }

  get() {
    let link = `psn-employees/getGradeList`;
    this.api.getdata(link).subscribe((res: any) => {
      this.allDataList = res;
      this.meta.totalItemCount = this.allDataList.length;
      this.dataList = this.allDataList.slice(0, this.meta.itemsPerPage);
    });
  }

  getDataGradeEdit (id) {
    this.api.getdata('psn-employees/getDataGradeEdit?gradid=' + encodeURIComponent(id)).subscribe((res: any) => {
      if (res.length > 0) {
        this.grade = res[0];
      } else {
        this.api.showInfoToast('No data on List.');
      }
      console.log(res);

    }, err => {
      console.log(err);
    });
  }

  editGrade() {
    this.grade.Updated = new Date(),
    this.grade.UpdatedBy = sessionStorage.getItem('username'),

      this.api.postdata('psn-employees/gradeEdit', this.grade).subscribe((res: any) => {
        this.response = res;
        this.api.showSuccessToast('Success', this.response.message);
        this.get();
      });
  }

  pageChange() {
    const start = (this.meta.currentPage - 1) * this.meta.itemsPerPage;
    const end = start + this.meta.itemsPerPage
    this.dataList = this.allDataList.slice(start, end);
  }

  reset() {
    this.grade = [];
    this.dataList = [];
  }

  viewDetail(index: number) {
    this.showDetails = JSON.stringify(this.allDataList[index]);
    this.showCollapse = false;
  }

  backClicked() {
    this._location.back();
  }

  search() {
    this.api.getdata('hrm-weekendsetups/searchHRMConfiguration?Name=' + this.Name + `&SerachText=` + this.SerachText).subscribe((res: any) => {
      this.datas = res.result;
    });
  }
  
}
