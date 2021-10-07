import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {ApiService} from '../../../../api.service';
export class SalarySlip {
  series: any;
  attDate: any;
  empNo: any;
  empName: any;
  companyId: any;
  departmentId: any;
  designationId: any;
  status: any;
  postingDate: any;
  startDate: any;
  endDate: any;
  letterHead: any;
  payrollFreq: any;
  workingDays: any;
  leaveWithoutPay: any;
  paymentsDays: any;
  grosPay: any;
  totalDeduction: any;
  totalPrincipalAmount: any;
  totalLoanRepayment: any;
  totalInterestAmount: any;
  netPay: any;
  roundedTotal: any;

}
@Component({
  selector: 'app-salary-slip',
  templateUrl: './salary-slip.component.html',
  styleUrls: ['./salary-slip.component.css']
})
export class SalarySlipComponent implements OnInit {
  sal: any;
  response: any;
  companies: any;
  departments: any;
  designations: any;
  collapseCompany = false;
  collapseDepartment = false;
  collapseDesignation = false;
  collapse: any;
  empNo: any;
  branches: any;
  constructor(public api: ApiService) {
    this.sal = new SalarySlip();
  }  patch(form: NgForm) {
    if (!form.valid) {
      this.api.showWarningToast('Warning', 'Please fill all fields first.');
      return;
    }
    this.api.patchdata('/', this.sal).subscribe(res => {
      this.response = res;
      this.api.showSuccessToast('Success', this.response.message);
      form.resetForm();
    }, err => {
      this.api.showFailureToast('Error', err.message);
      console.log(err);
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
  getDepartments() {
    this.api.getdata('departments').subscribe(res => {
      this.departments = res;
      // this.api.showRefreshToast('Data Refreshed', '');
    }, err => {
      console.log(err);
    });
  }
  getDesignations() {
    this.api.getdata('designations').subscribe(res => {
      this.designations = res;
      // this.api.showRefreshToast('Data Refreshed', '');
    }, err => {
      console.log(err);
    });
  }
  toggleCompanyCollapse() {
    this.collapseCompany = !this.collapseCompany;
    this.getCompanies();
  }
  toggleDepartmentCollapse() {
    this.collapseDepartment = !this.collapseDepartment;
    this.getDepartments();
  }
  toggleDesignationCollapse() {
    this.collapseDesignation = !this.collapseDesignation;
    this.getDesignations();
  }
  ngOnInit() {
    this.getCompanies();
    this.getDepartments();
    this.getDesignations();
  }

  get() {

  }
}
