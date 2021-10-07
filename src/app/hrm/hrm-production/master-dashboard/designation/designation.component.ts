import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Location } from "@angular/common";
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {

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
    { type: 'Active', value: 1 }, { type: 'Inactive', value: 0 } 
  ];
  companies: string[];
  departments: string[];
  designation: any;

  constructor(private api: ApiService, private route: ActivatedRoute, private _location: Location) {
    this.designation = {};
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
        this.getDataDesignationEdit(params.id);
      }
    });
    
  }

  ngOnInit() {
    this.api.getdata('employee-attendences/companies?id=true').subscribe((res: string[]) => this.companies = res);
    this.api.getdata('employee-attendences/departments').subscribe((res: string[]) => this.departments = res);

    this.get();
  }

  patch() {
    this.designation.CommandID = 1,
    this.designation.UpDated = new Date(),
    this.designation.UpDatedBy = sessionStorage.getItem('username'),

      this.api.postdata('psn-employees/designationInsert', this.designation).subscribe((res: any) => {
        this.response = res;
        console.log(this.response);
        this.added.emit(true);
        this.api.showSuccessToast('Success', this.response.message);
      });
  }

  get() {
    let link = `psn-employees/getDesignationList`;
    this.api.getdata(link).subscribe((res: any) => {
      this.allDataList = res;
      this.meta.totalItemCount = this.allDataList.length;
      this.dataList = this.allDataList.slice(0, this.meta.itemsPerPage);
    });
  }

  getDataDesignationEdit (id) {
    this.api.getdata('psn-employees/getDesignationEditData?DesigID=' + encodeURIComponent(id)).subscribe((res: any) => {
      if (res.length > 0) {
        this.designation = res[0];
      } else {
        this.api.showInfoToast('No data on List.');
      }
      console.log(res);

    }, err => {
      console.log(err);
    });
  }

  edit() {
    this.designation.UpDated = new Date(),
    this.designation.UpDatedBy = sessionStorage.getItem('username'),

      this.api.postdata('psn-employees/designationEdit', this.designation).subscribe((res: any) => {
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
    this.designation = [];
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
