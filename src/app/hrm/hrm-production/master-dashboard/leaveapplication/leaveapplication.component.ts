import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SuiModalService } from 'ng2-semantic-ui';
import { ApiService } from '../../../../api.service';
import { Location } from '@angular/common';
import { ShowDetail } from '../../../../templates/show-detail/show-detail.component';

@Component({
  selector: 'app-leaveapplication',
  templateUrl: './leaveapplication.component.html',
  styleUrls: ['./leaveapplication.component.css']
})
export class LeaveapplicationComponent implements OnInit {
  collectionSize: any;
  pageSize: any;
  selectedPage: any;
  goToPage: any;
  fromPage: any;
  toPage: any;
  checks: boolean[];
  allCheck = true;
  meta: {
    totalItemCount: number,
    totalPageCount: number,
    itemsPerPage: number,
    currentPage: number,
    nextPage: number,
  };
  leaveData: any[];
  allleaveData: any;
  currentRoute: any;
  url = 'hrm-leaveapplications';
  searchDatas: any;
  cardNo: string;


  @Output() added = new EventEmitter<boolean>();
  @Input() id: number;
  leave: any;
  selectedDate: Date;
  cardnos: any[];
  leaveTypes: any[];
  leaveType: number;
  name: string;
  today: Date;
  oneDaye = 24 * 60 * 60 * 1000;
  balance: number;
  editId: boolean;
  SERIAL_NO: any;

  constructor(private _location: Location, public api: ApiService, public modalService: SuiModalService, private route: ActivatedRoute, private router: Router) {
    this.meta = {
      totalItemCount: 0,
      totalPageCount: 0,
      itemsPerPage: 25,
      currentPage: 1,
      nextPage: 0,
    };

    this.today = new Date();
    this.leave = { CREATE_DATE: this.today, APPLIED_DATE: this.today, CREATED_BY: sessionStorage.getItem('username') };

  }

  ngOnInit() {
    this.selectedPage = 1;
    this.checks = new Array(this.meta.itemsPerPage).fill(true);
    this.get();

    this.getCards();
    this.api.getdata('hrm-leaveapplications/leavetypes').subscribe((res: any[]) => this.leaveTypes = res);
  }

  getCards(search: string = null) {
    //http://localhost:3000/api/psn-employees?filter[limit]=50&filter[where][EMP_CARD_NO][like]=%16%
    let link = 'psn-employees?filter[limit]=50';
    if (search) link += '&filter[where][EMP_CARD_NO][like]=%' + search + '%';
    this.api.getdata(link).subscribe((res: any[]) => this.cardnos = res);
  }

  cardSelected() {
    if (!this.leave.LEAVE_ID) {
      this.api.showWarningToast('Select Leave Name');
      return;
    }
    if (!this.leave.EMP_CARD_NO) return;

    const employee = this.cardnos.find((element: any) => element.EMP_CARD_NO = this.leave.EMP_CARD_NO);
    this.name = employee.EMP_NAME_ENG;
    this.leave.EMP_ID = employee.EMP_ID;

    const yearString = '' + this.today.getFullYear();
    const link = 'hrm-leave-details?filter[where][EMP_ID]=' + encodeURIComponent(this.leave.EMP_ID) + '&filter[where][LEAVE_ID]=' + this.leave.LEAVE_ID;
    this.api.getdata(link).subscribe((res: any[]) => {
      this.leave.NO_OF_USEDDAY = res.filter((element: any) => element.LEAVE_DATES.includes(yearString)).length;
      this.calculateDays();
    });
  }

  calculateDays() {
    if (!this.leave.EMP_CARD_NO) {
      this.leave.fromDate = null;
      return;
    }
    if (!this.leave.fromDate || !this.leave.toDate) return;
    this.leave.NO_OF_LEAVEDAY = 0;
    this.leave.NO_OF_LEAVEDAY = ((this.leave.toDate - this.leave.fromDate) / this.oneDaye) + 1;
    if (this.leave.NO_OF_LEAVEDAY < 1) {
      this.api.showWarningToast('To Date Must be Later Them From Date');
      this.leave.toDate = null;
    }
    else {
      const allowedDays = this.leaveTypes.find((element: any) => element.LEAVE_ID === this.leave.LEAVE_ID).LEAVE_DAYS_COUNT;
      this.balance = allowedDays - (this.leave.NO_OF_USEDDAY + this.leave.NO_OF_LEAVEDAY);
    }
  }

  get() {
    const start = (this.meta.currentPage - 1) * this.meta.itemsPerPage;
    let link = 'hrm-leaveapplications/tabledata?start=' + start + '&size=' + this.meta.itemsPerPage;
    this.api.getdata(link).subscribe((res: any) => {
      this.leaveData = res.data;
      this.meta.totalItemCount = res.size;
    });
  }

  approve() {
    const data = { APRVED: 1, APPROVED_BY: sessionStorage.getItem('username') };

    this.leaveData.forEach((element: any, index: number) => {
      if (this.checks[index]) {
        this.api.patchdata('hrm-leaveapplications/' + element.SERIAL_NO, data).subscribe(res => {
          if (res) {
            this.api.showSuccessToast('Approved');
          }
        });
      }
      if (index == this.meta.itemsPerPage - 1) this.get();
    });
  }

  checkAll() {
    this.checks.fill(this.allCheck);
  }

  // pageChange() {
  //     const start = (this.meta.currentPage - 1) * this.meta.itemsPerPage;
  //     const end = start + this.meta.itemsPerPage
  //     this.leaveData = this.allleaveData.slice(start, end);
  // }

  backClicked() {
    this._location.back();
  }

  reset() {
    this.name = null;
    this.balance = null;
    this.leave = { CREATE_DATE: this.today, APPLIED_DATE: this.today, CREATED_BY: sessionStorage.getItem('username') };
  }

  validate(): boolean {
    if (this.balance < 0) {
      this.api.showWarningToast('Leaven Days Not Avalable');
      return false
    }

    if (!this.leave.fromDate) {
      this.api.showWarningToast('Enter From Date');
      return false
    }

    if (!this.leave.toDate) {
      this.api.showWarningToast('Enter To Date');
      return false
    }

    return true;
  }

  patch() {
    if (!this.validate()) return;
    this.leave.FROM_DATE = this.api.formatDate(this.leave.fromDate);
    this.leave.TO_DATE = this.api.formatDate(this.leave.toDate);
    this.api.postdata('hrm-leaveapplications', this.leave).subscribe((res1: any) => {
      const leaveDetails: any = {
        EMP_ID: this.leave.EMP_ID, LEAVE_ID: this.leave.LEAVE_ID, CREATE_DATE: this.api.formatDate(this.today),
        MASTER_TAB_SERIAL_NO: res1.SERIAL_NO,
      }

      for (let i = 0; i < this.leave.NO_OF_LEAVEDAY; i++) {
        //leaveDetails.LEAVE_DATES = this.leave.FROM_DATE.getTime() + (this.oneDaye * i);
        //leaveDetails.LEAVE_DATES = this.leave.FROM_DATE;
        leaveDetails.LEAVE_DATES =new Date(this.leave.FROM_DATE);
        leaveDetails.LEAVE_DATES = (leaveDetails.LEAVE_DATES).setDate((leaveDetails.LEAVE_DATES).getDate()+i)
        this.api.postdata('hrm-leave-details', leaveDetails).subscribe((res) => {
          if (res) {
            if (i + 1 == this.leave.NO_OF_LEAVEDAY) {
              this.reset();
              this.added.emit(true);
              this.api.showSuccessToast('Leave Added');
            }
          }

        });
      }
    }, err => {
      this.api.showFailureToast('Error', err.message);
    });
  }

  search() {
    this.api.getdata('hrm-leaveapplications/searchLeaveApplication?cardno=' + this.cardNo).subscribe((res: any) => {
      this.searchDatas = res.result;
      // this.ADVANCE_KEY = res.result[0].ADVANCE_KEY;
      //console.log(this.ADVANCE_KEY);
    });
  }

  getLeaveEditData(id) {
    this.api.getdata('hrm-leaveapplications/getLeaveEditData?serialno=' + encodeURIComponent(id)).subscribe((res: any) => {
      if (res.length > 0) {
        this.leave = res[0];
        this.cardnos = [
          { EMP_CARD_NO: this.leave.EMP_CARD_NO }
        ];
        //console.log(this.cardnos);
        this.name = res[0].EMP_NAME_ENG;
        this.leave.fromDate = new Date(res[0].FROM_DATE);
        this.leave.toDate = new Date(res[0].TO_DATE);
        this.SERIAL_NO = res[0].SERIAL_NO;
        //console.log(this.name);
      } else {
        this.api.showInfoToast('No data on List');
      }
    });
    this.editId = true;
  }

  edit() {
    if (!this.validate()) return;
    // LEAVE_ID: this.leave.LEAVE_ID,
    this.leave.FROM_DATE = this.api.formatDate(this.leave.fromDate);
    this.leave.TO_DATE = this.api.formatDate(this.leave.toDate);
    this.api.patchdata('hrm-leaveapplications/' + this.SERIAL_NO, this.leave).subscribe((res1: any) => {
      const leaveDetails: any = {
        EMP_ID: this.leave.EMP_ID, CREATE_DATE: this.api.formatDate(this.today),
        MASTER_TAB_SERIAL_NO: res1.SERIAL_NO,
      }

      for (let i = 0; i < this.leave.NO_OF_LEAVEDAY; i++) {
        //leaveDetails.LEAVE_DATES = this.leave.FROM_DATE.getTime() + (this.oneDaye * i);
        leaveDetails.LEAVE_DATES = this.leave.FROM_DATE;
        this.api.patchdata('hrm-leave-details/' + leaveDetails.MASTER_TAB_SERIAL_NO, leaveDetails).subscribe((res) => {
          if (res) {
            if (i + 1 == this.leave.NO_OF_LEAVEDAY) {
              this.reset();
              this.added.emit(true);
              this.api.showSuccessToast('Leave Edited');
            }
          }

        });
      }
    }, err => {
      this.api.showFailureToast('Error', err.message);
    });
  }

}
