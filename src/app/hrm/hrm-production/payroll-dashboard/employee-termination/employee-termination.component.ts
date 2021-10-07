import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-employee-termination',
  templateUrl: './employee-termination.component.html',
  styleUrls: ['./employee-termination.component.css']
})
export class EmployeeTerminationComponent implements OnInit {
  departments: any[];
  inActiveStatus = [
    { type: 'Regular', value: 0 }, { type: 'Probationary', value: 1 }, { type: 'Dismissed', value: 2 }, { type: 'Resigned', value: 3 }, { type: 'Terminated', value: 4 }, { type: 'Discharged', value: 5 }, { type: 'Unauthorised', value: 6 }
  ];
  terminateEmployee: any;
  allEmployeeDetails: any[];
  meta: {
    totalItemCount: number,
    totalPageCount: number,
    itemsPerPage: number,
    currentPage: number,
    nextPage: number,
  };
  meta1: {
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
  monthlyInActiveList: any;
  allmonthlyInActiveList: any;

  constructor(private api: ApiService) {
    this.terminateEmployee = {};
    this.meta = {
      totalItemCount: 0,
      totalPageCount: 0,
      itemsPerPage: 10,
      currentPage: 1,
      nextPage: 0,
    };
    this.meta1 = {
      totalItemCount: 0,
      totalPageCount: 0,
      itemsPerPage: 30,
      currentPage: 1,
      nextPage: 0,
    };
  }

  ngOnInit() {
    this.api.getdata('employee-attendences/departments').subscribe((res: any[]) => this.departments = res);
    this.checks = new Array(this.meta.itemsPerPage).fill(false);
  }

  cardListDeptWise() {
    let link = `employee-payrolls/getCardListDepartmentWise`;
    if (this.terminateEmployee.IDNo) link += '?IDNo=' + this.terminateEmployee.IDNo;
    else if (this.terminateEmployee.DeptID) link += `?DeptID=` + this.terminateEmployee.DeptID.replace('#', '|');
    

    this.api.getdata(link).subscribe((res: any[]) => {
      this.allEmployeeDetails = res;
      this.meta.totalItemCount = this.allEmployeeDetails.length;
      this.employerDetails = this.allEmployeeDetails.slice(0, this.meta.itemsPerPage);
    });
  }

  pageChange() {
    const start = (this.meta.currentPage - 1) * this.meta.itemsPerPage;
    const end = start + this.meta.itemsPerPage
    this.employerDetails = this.allEmployeeDetails.slice(start, end);
  }

  checkAll() {
    this.checks.fill(this.allCheck);
  }

  save() {
    this.allEmployeeDetails.forEach((element: any, index: number) => {
      if (this.checks[index]) {
        const senddata = {
          "pstrEmpID": element.CadrNo,
          "EffectiveDate": this.api.formatDate(this.terminateEmployee.EffectiveDate),
          "piSeparationTypeValue": this.terminateEmployee.piSeparationTypeValue,
          "pstrRemarks": this.terminateEmployee.pstrRemarks,
          "psiCretedby": sessionStorage.getItem('username'),
        };
        this.api.postdata('employee-payrolls/employeeTerminationInsert', senddata).subscribe((res: any) => {
          this.response = res;
          this.added.emit(true);
          this.api.showSuccessToast('Success', this.response.message);
        });
      }
    });
  }

  searchmonthlyInActiveList(){
    let link = `employee-payrolls/getMonthlyInActiveList`;
    if (this.terminateEmployee.DeptID) link += `?DeptID=` + encodeURIComponent(this.terminateEmployee.DeptID);
    if (this.terminateEmployee.IDNo) link += '&IDNo=' + this.terminateEmployee.IDNo;
    this.api.getdata(link).subscribe((res: any) => {
      this.allmonthlyInActiveList = res;
      this.meta1.totalItemCount = this.allmonthlyInActiveList.length;
      this.monthlyInActiveList = this.allmonthlyInActiveList.slice(0, this.meta1.itemsPerPage);
    });
  }

  pageChangeInactive() {
    const start = (this.meta1.currentPage - 1) * this.meta1.itemsPerPage;
    const end = start + this.meta1.itemsPerPage
    this.monthlyInActiveList = this.allmonthlyInActiveList.slice(start, end);
  }

  reset() {
    this.terminateEmployee = [];
    this.monthlyInActiveList = [];
  }

}
