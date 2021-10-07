import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-addleaveapplication',
  templateUrl: './addleaveapplication.component.html',
  styleUrls: ['./addleaveapplication.component.css']
})
export class AddleaveapplicationComponent implements OnInit {
  currentRoute: any;
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

  constructor(private _location: Location, public api: ApiService, ) {
    this.today = new Date();
    this.leave = {CREATE_DATE: this.today, APPLIED_DATE: this.today, CREATED_BY: sessionStorage.getItem('username')};
  }

  ngOnInit() {
    this.getCards();
    this.api.getdata('hrm-leaveapplications/leavetypes').subscribe((res: any[]) => this.leaveTypes = res);
  }

  getCards(search: string = null) {
    //http://localhost:3000/api/psn-employees?filter[limit]=50&filter[where][EMP_CARD_NO][like]=%16%
    let link = 'psn-employees?filter[limit]=50';
    if(search) link += '&filter[where][EMP_CARD_NO][like]=%' + search + '%';
    this.api.getdata(link).subscribe((res: any[]) => this.cardnos = res);
  }

  cardSelected() {
    if(!this.leave.LEAVE_ID) {
      this.api.showWarningToast('Select Leave Name');
      return;
    }
    if(!this.leave.EMP_CARD_NO) return;

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
    if(!this.leave.EMP_CARD_NO) {
      this.leave.FROM_DATE = null;
      return;
    }
    if(!this.leave.FROM_DATE || !this.leave.TO_DATE) return;
    this.leave.NO_OF_LEAVEDAY = 0;
    this.leave.NO_OF_LEAVEDAY = ((this.leave.TO_DATE - this.leave.FROM_DATE) / this.oneDaye) + 1;
    if(this.leave.NO_OF_LEAVEDAY < 1) {
      this.api.showWarningToast('To Date Must be Later Them From Date');
      this.leave.TO_DATE = null;
    } 
    else {
      const allowedDays = this.leaveTypes.find((element: any) => element.LEAVE_ID === this.leave.LEAVE_ID).LEAVE_DAYS_COUNT;
      this.balance = allowedDays - (this.leave.NO_OF_USEDDAY + this.leave.NO_OF_LEAVEDAY);
    }
  }

  reset() {
    this.name = null;
    this.balance = null;
    this.leave = {CREATE_DATE: this.today, APPLIED_DATE: this.today, CREATED_BY: sessionStorage.getItem('username')};
  }

  validate(): boolean {
    if(this.balance < 0) {
      this.api.showWarningToast('Leaven Days Not Avalable');
      return false
    }

    if(!this.leave.FROM_DATE) {
      this.api.showWarningToast('Enter From Date');
      return false
    }

    if(!this.leave.TO_DATE) {
      this.api.showWarningToast('Enter To Date');
      return false
    }

    return true;
  }

  patch() {
    if(!this.validate()) return;

    this.api.postdata('hrm-leaveapplications', this.leave).subscribe((res1: any) => {
      const leaveDetails: any = {
        EMP_ID: this.leave.EMP_ID, LEAVE_ID: this.leave.LEAVE_ID, CREATE_DATE: this.api.formatDate(this.today),
        MASTER_TAB_SERIAL_NO: res1.SERIAL_NO,
      }

      for(let i = 0; i < this.leave.NO_OF_LEAVEDAY; i++) {
        leaveDetails.LEAVE_DATES = this.leave.FROM_DATE.getTime() + (this.oneDaye * i);
        this.api.postdata('hrm-leave-details', leaveDetails).subscribe((res) => {
          if(res) {
            if(i + 1 == this.leave.NO_OF_LEAVEDAY) {
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

  backClicked() {
    this._location.back();
  }
}
