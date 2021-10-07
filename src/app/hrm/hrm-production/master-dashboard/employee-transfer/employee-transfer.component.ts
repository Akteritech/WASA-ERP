import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ApiService} from "../../../../api.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {SuiModalService} from "ng2-semantic-ui";
import { Location } from "@angular/common";
export class EmployeeTransfer {
  CURRENT_DEPT_ID: string;
  CURRENT_DIV_ID: string;
  EMP_CARD_NO: string;
  EFFECTIVE_DATE: string;
  REMARK: string;
  TRANS_ORDER_REF_NO: string;
  TRANS_ORDER_REF_DATE: string;
  CURRENT_DESIG_ID: string;
  constructor() {
    this.CURRENT_DEPT_ID = '';
    this.CURRENT_DIV_ID = '';
    this.CURRENT_DESIG_ID = '';
    this.EMP_CARD_NO = '';
  }
}
@Component({
  selector: 'app-employee-transfer',
  templateUrl: './employee-transfer.component.html',
  styleUrls: ['./employee-transfer.component.css']
})
export class EmployeeTransferComponent implements OnInit {
  departments: any[];
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
  DIVISION_ID: number;
  unit: any;
   emptransfer: EmployeeTransfer;
   tabledata: any;
   selectedEmployees: any[];
   selectAllEmployee: any;
   employees: any;
   alltablesdata: any;
   editId: any;
   currentRoute: string;
  designations: any;

  constructor(private api: ApiService,
              private route: ActivatedRoute, public modalService: SuiModalService, private router: Router, private _location: Location) {
    this.emptransfer = new EmployeeTransfer();
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
    this.route.params.subscribe( params => {
      if (params.id) {
        this.editId = params.id;
        this.getEmployees(params.id);
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
    this.checks = new Array(this.meta.itemsPerPage).fill(false);
    console.log(this.checks);
    this.getUnit();
    this.getDepartment();
    this.employerDetails = [];
    this.selectedEmployees = [];
    this.getDesignation();
  }
  getEmployees (id) {
    this.api.getdata('employee-transfers/' +id).subscribe((res: any) => {
      this.emptransfer = res;
      console.log(res);
      this.searchData();
    }, err => {
      console.log(err);
    });
  }
  getDepartment() {
    this.api.getdata('employee-profiles/getDepartment').subscribe((res: any) => {
      this.departments = res;
      // console.log(res);
    }, error2 => {
      console.log(error2);
    });
  }
  getUnit() {
    this.api.getdata('employee-profiles/getUnit').subscribe((res: any) => {
      this.unit = res;
      // console.log(res);
    }, err => {
      console.log(err);
    });
  }
  searchData() {
    let link =`employee-transfers/searchData?`;
    if (this.emptransfer.CURRENT_DIV_ID) link += `&unitid=` + this.emptransfer.CURRENT_DIV_ID.replace('#', '|');
    if (this.emptransfer.CURRENT_DEPT_ID) link += `&deptid=` + this.emptransfer.CURRENT_DEPT_ID.replace('#', '|');
    if (this.emptransfer.EMP_CARD_NO) link += `&idno=` + this.emptransfer.EMP_CARD_NO;
    this.api.getdata(link).subscribe((res: any) => {
      this.allEmployeeDetails = res;
      this.meta.totalItemCount = this.allEmployeeDetails.length;
      this.employerDetails = this.allEmployeeDetails.slice(0, this.meta.itemsPerPage);
      console.log(this.allEmployeeDetails);
      console.log(this.employerDetails);
    }, error2 => {
      console.log(error2);
    });
  }
  tableData() {
    let link =`employee-transfers/tableData?`;
    if (this.emptransfer.CURRENT_DIV_ID) link += `&unitid=` + this.emptransfer.CURRENT_DIV_ID.replace('#', '|');
    if (this.emptransfer.CURRENT_DEPT_ID) link += `&deptid=` + this.emptransfer.CURRENT_DEPT_ID.replace('#', '|');
    if (this.emptransfer.EMP_CARD_NO) link += `&idno=` + this.emptransfer.EMP_CARD_NO;
    this.api.getdata(link).subscribe((res: any) => {
      this.tabledata = res;
      this.meta1.totalItemCount = this.tabledata.length;
      this.alltablesdata = this.tabledata.slice(0, this.meta1.itemsPerPage);
      console.log(this.tabledata);
    }, error2 => {
      console.log(error2);
    });

  }
  pageChange() {
    const start = (this.meta.currentPage - 1) * this.meta.itemsPerPage;
    const end = start + this.meta.itemsPerPage
    this.employerDetails = this.allEmployeeDetails.slice(start, end);
  }
  pageChangeInactive() {
    const start = (this.meta1.currentPage - 1) * this.meta1.itemsPerPage;
    const end = start + this.meta1.itemsPerPage
    this.tabledata = this.alltablesdata.slice(start, end);
  }
  selectAll() {
    this.selectedEmployees = [];
    if (this.selectAllEmployee) {
      this.employerDetails.forEach(item => {
        item.selected = true;
        this.selectedEmployees.push(item);
        console.log(this.selectedEmployees);
      });
    } else {
      this.employerDetails.forEach(item => {
        item.selected = false;
      });
      this.selectedEmployees = [];
    }
  }
  selectEmployees(item, i) {
    if (item.selected === true) {
      this.selectedEmployees.push(item);
      console.log(this.selectedEmployees);
    } else {
      const index = this.selectedEmployees.indexOf(item);
      if (index !== -1) {
        this.selectedEmployees.splice(index, 1);
      }
      console.log(this.selectedEmployees);
      // this.selectedCards = false;
    }
  }
  save() {
    if (!this.emptransfer.TRANS_ORDER_REF_NO) {
      this.api.showWarningToast('Trans Order Ref No. required', '');
      return ;

    }  else if (!this.emptransfer.TRANS_ORDER_REF_DATE) {
      this.api.showWarningToast('Trans Date required', '');
      return;

    } else if (!this.emptransfer.EFFECTIVE_DATE) {
      this.api.showWarningToast('Effective Date required', '');
      return;

    } else if (!this.emptransfer.REMARK) {
      this.api.showWarningToast('Remark required', '');
      return;

    }
    if (this.selectedEmployees.length > 0) {
      this.selectedEmployees.forEach(item => {
        const data = {
          'data': {
            'record': item,
            "trforder": this.emptransfer.TRANS_ORDER_REF_NO,
            "trforderdate": this.emptransfer.TRANS_ORDER_REF_DATE,
            "effectivedate": this.emptransfer.EFFECTIVE_DATE,
            "CURRENT_DIV_ID": this.emptransfer.CURRENT_DIV_ID,
            "CURRENT_DEPT_ID": this.emptransfer.CURRENT_DEPT_ID,
            "CURRENT_DESIG_ID": this.emptransfer.CURRENT_DESIG_ID,
            "remark": this.emptransfer.REMARK,
            "createdby": sessionStorage.getItem('empid')
          }};
        console.log(data);
        this.api.patchdata('employee-transfers/insertEmployeeTransfer', data).subscribe((res: any) => {
          this.response = res;
          console.log(this.response);
          this.added.emit(true);
          this.api.showSuccessToast('Success', this.response.message);
        });
      });
    } else {
      this.api.showWarningToast('Select Record First');
    }

  }
  update() {
    if (!this.emptransfer.TRANS_ORDER_REF_NO) {
      this.api.showWarningToast('Trans Order Ref No. required', '');
      return ;

    }  else if (!this.emptransfer.TRANS_ORDER_REF_DATE) {
      this.api.showWarningToast('Trans Date required', '');
      return;

    } else if (!this.emptransfer.EFFECTIVE_DATE) {
      this.api.showWarningToast('Effective Date required', '');
      return;

    } else if (!this.emptransfer.REMARK) {
      this.api.showWarningToast('Remark required', '');
      return;

    }
    if (this.selectedEmployees.length > 0) {
      this.selectedEmployees.forEach(item => {
        const data = {
          'data': {
            'record': item,
            "trforder": this.emptransfer.TRANS_ORDER_REF_NO,
            "trforderdate": this.emptransfer.TRANS_ORDER_REF_DATE,
            "effectivedate": this.emptransfer.EFFECTIVE_DATE,
            "CURRENT_DIV_ID": this.emptransfer.CURRENT_DIV_ID,
            "CURRENT_DEPT_ID": this.emptransfer.CURRENT_DEPT_ID,
            "CURRENT_DESIG_ID": this.emptransfer.CURRENT_DESIG_ID,
            "remark": this.emptransfer.REMARK,
            "createdby": sessionStorage.getItem('empid')
          }};
        console.log(data);
        this.api.patchdata('employee-transfers/updateEmployeeTransfer', data).subscribe((res: any) => {
          this.response = res;
          console.log(this.response);
          this.added.emit(true);
          this.api.showSuccessToast('Success', this.response.message);
        });
      });
    } else {
      this.api.showWarningToast('Select Record First');
    }
  }

  backClicked() {
    this._location.back();
  }

  getDesignation() {
    this.api.getdata('employee-profiles/getDesignation').subscribe((res: any) => {
      this.designations = res;
      // console.log(res);
    }, error2 => {
      console.log(error2);
    });
  }

}
