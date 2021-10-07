import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../../api.service';
import {NgForm} from '@angular/forms';
export class Attendance {
  series: any;
  postDate: any;
  empNo: any;
  empName: any;
  companyId: any;
  status: any;
}
@Component({
  selector: 'app-salary-structure',
  templateUrl: './salary-structure.component.html',
  styleUrls: ['./salary-structure.component.css']
})
export class SalaryStructureComponent implements OnInit {

  collapseCompany = false;
  companies: any;
  attend: any;
  response: any;
  vendors: any;
  sStructures: any;
  employees: any;
  selectedItem: any;
  bomItem: any;
  collapse: any;
  constructor(public api: ApiService) {
    this.attend = new Attendance();
    this.sStructures = [];
  }
  getEmployees() {
    this.api.getdata('employees').subscribe( res => {
      this.employees = res;
    }, err => {
      console.log('Class: AddProductComponent, Line: 31 err ', err);
    });
  }
  getCompanies() {
    this.api.getdata('companies').subscribe(res => {
      this.companies = res;
      // this.api.showRefreshToast('Data Refreshed', '');
    }, err => {
      console.log(err);
    });
  }
  ngOnInit() {
    this.getCompanies();
    this.getEmployees();
  }

  addBomItem() {

  }

  get() {

  }

  toggleCompanyCollapse() {

  }

  patch(form: NgForm) {

  }
}
