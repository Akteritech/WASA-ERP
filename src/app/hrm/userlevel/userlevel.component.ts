import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Location } from "@angular/common";
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-userlevel',
  templateUrl: './userlevel.component.html',
  styleUrls: ['./userlevel.component.css']
})
export class UserlevelComponent implements OnInit {


  allEmployeeDetails: any[];
  meta: {
    totalItemCount: number,
    totalPageCount: number,
    itemsPerPage: number,
    currentPage: number,
    nextPage: number,
  };
  checks: boolean[];
  allCheck = false;
  employerDetails: any[];
  response: any;
  @Output() added = new EventEmitter<boolean>();
  dataList: any;
  allDataList: any;
  showDetails: string;
  showCollapse: boolean;
  editDraft: any;
  editId: any;
  @Input() id: number;
  editdatas: any;

  status = [
    { type: 'Yes', value: 1 }, { type: 'No', value: 0 } 
  ];
  roles = [
    { type: 'Super Admin', value: 0 }, { type: 'Area Admin', value: 1 }, { type: 'User', value: 2 }
  ];
  companies: string[];
  user: any;

  constructor(private api: ApiService, private route: ActivatedRoute, private _location: Location) {
    this.user = {};
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
        this.getDataUserEdit(params.id);
      }
    });
    
  }

  ngOnInit() {
    this.api.getdata('employee-attendences/companies?id=true').subscribe((res: string[]) => this.companies = res);

    this.get();
  }

  patch() {
    this.user.CommandID = 1,
    this.user.UpDated = new Date(),
    this.user.UpDatedBy = sessionStorage.getItem('username'),

      this.api.postdata('psn-employees/userInsert', this.user).subscribe((res: any) => {
        this.response = res;
        console.log(this.response);
        this.added.emit(true);
        this.api.showSuccessToast('Success', this.response.message);
      });
  }

  get() {
    let link = `psn-employees/getUserList`;
    this.api.getdata(link).subscribe((res: any) => {
      this.allDataList = res;
      this.meta.totalItemCount = this.allDataList.length;
      this.dataList = this.allDataList.slice(0, this.meta.itemsPerPage);
    });
  }

  getDataUserEdit (id) {
    this.api.getdata('psn-employees/getUserEditData?userID=' + encodeURIComponent(id)).subscribe((res: any) => {
      if (res.length > 0) {
        this.user = res[0];
      } else {
        this.api.showInfoToast('No data on List.');
      }
      console.log(res);

    }, err => {
      console.log(err);
    });
  }

  edit() {
    this.user.UpDated = new Date(),
    this.user.UpDatedBy = sessionStorage.getItem('username'),

      this.api.postdata('psn-employees/userEdit', this.user).subscribe((res: any) => {
        this.response = res;
        this.get();
        this.api.showSuccessToast('Success', this.response.message);
      });
  }

  pageChange() {
    const start = (this.meta.currentPage - 1) * this.meta.itemsPerPage;
    const end = start + this.meta.itemsPerPage
    this.dataList = this.allDataList.slice(start, end);
  }

  reset() {
    this.user = [];
    this.dataList = [];
  }

  viewDetail(index: number) {
    this.showDetails = JSON.stringify(this.allDataList[index]);
    this.showCollapse = false;
  }



  backClicked() {
    this._location.back();
  }



}
