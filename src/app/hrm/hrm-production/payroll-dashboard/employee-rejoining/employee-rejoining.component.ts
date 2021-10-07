import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-employee-rejoining',
  templateUrl: './employee-rejoining.component.html',
  styleUrls: ['./employee-rejoining.component.css']
})
export class EmployeeRejoiningComponent implements OnInit {
  departments: any[];
  inActiveStatus = [
    { type: 'Regular', value: 0 }, { type: 'Probationary', value: 1 }, { type: 'Dismissed', value: 2 }, { type: 'Resigned', value: 3 }, { type: 'Terminated', value: 4 }, { type: 'Discharged', value: 5 }, { type: 'Unauthorised', value: 6 }
  ];
  rejoinEmployee: any;
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
  dataList: any;
  allDataList: any;

  constructor(private api: ApiService) {
    this.rejoinEmployee = {};
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
    let link = `psn-employees/getCardListDepartmentWise`;
    if (this.rejoinEmployee.DeptID) link += `?DeptID=` + this.rejoinEmployee.DeptID.replace('#', '|');
    if (this.rejoinEmployee.IDNo) link += '?IDNo=' + this.rejoinEmployee.IDNo;

    this.api.getdata(link).subscribe((res: any[]) => {
      this.allEmployeeDetails = res;
      this.meta.totalItemCount = this.allEmployeeDetails.length;
      this.employerDetails = this.allEmployeeDetails.slice(0, this.meta.itemsPerPage);
      console.log(this.allEmployeeDetails);
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
          "EMP_ID": element.CadrNo,
          "RejoinDate": this.api.formatDate(this.rejoinEmployee.RejoinDate),
          "Remarks": this.rejoinEmployee.Remarks,
        };
        this.api.postdata('psn-employees/employeeRejoinInsert', senddata).subscribe((res: any) => {
          this.response = res;
          console.log(this.response);
          this.added.emit(true);
          this.api.showSuccessToast('Success', this.response.message);
        });
      }
    });
  }

  searchEmpRejoiningList() {
    if (!this.rejoinEmployee.IDNo) {
      this.api.showWarningToast("Select Card No");
      return;
    }
    let link = `psn-employees/getEmpRejoiningList`;
    if (this.rejoinEmployee.IDNo) link += '?IDNo=' + this.rejoinEmployee.IDNo;
    this.api.getdata(link).subscribe((res: any) => {
      this.allDataList = res;
      this.meta1.totalItemCount = this.allDataList.length;
      this.dataList = this.allDataList.slice(0, this.meta1.itemsPerPage);
    });
  }

  pageChangeInactive() {
    const start = (this.meta1.currentPage - 1) * this.meta1.itemsPerPage;
    const end = start + this.meta1.itemsPerPage
    this.dataList = this.allDataList.slice(start, end);
  }

  reset() {
    this.rejoinEmployee = [];
    this.dataList = [];
  }

  resetData() {
    this.rejoinEmployee = [];
    this.employerDetails = [];
  }
}
