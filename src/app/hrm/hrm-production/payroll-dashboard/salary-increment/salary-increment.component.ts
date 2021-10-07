import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { NgForm } from '@angular/forms';
import { Location } from "@angular/common";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-salary-increment',
  templateUrl: './salary-increment.component.html',
  styleUrls: ['./salary-increment.component.css']
})
export class SalaryIncrementComponent implements OnInit {
  increment: any;
  cardnos: any[];
  name: any;
  response: any;

  @Output() added = new EventEmitter<boolean>(); z
  searchDatas: any;
  cardNo: string;
  editId: boolean;
  lastincrementAmount: any;
  constructor(public api: ApiService, private _location: Location, private route: ActivatedRoute) {
    this.increment = {};
    this.editId = false;
  }

  getEmployeeIncrement(id) {
    this.api.getdata('psn-employee-salary-incrs/getEmployeeIncrementEditData?empid=' + encodeURIComponent(id)).subscribe((res: any) => {
      if (res.length > 0) {
        this.increment = res[0];
        this.cardnos = [
          { EMP_CARD_NO: this.increment.EMP_CARD_NO }
        ];
        console.log(this.cardnos);
        this.name = res[0].Name;
        this.increment.NEW_INCR_REF_DATE = new Date(res[0].NEW_INCR_REF_DATE);
        this.increment.NEW_INCR_EFF_DATE = new Date(res[0].NEW_INCR_EFF_DATE);

      } else {
        this.api.showInfoToast('No data on List');
      }
    });
    this.editId = true;
  }

  getEmployeedeleteIncrement(id) {
    this.api.getdata('psn-employee-salary-incrs/getEmployeeIncrementDeleteData?serialno=' + id).subscribe((res: any) => {
      if (res.length > 0) {
        this.increment = res[0];
        this.cardnos = [
          { EMP_CARD_NO: this.increment.EMP_CARD_NO }
        ];
        console.log(this.cardnos);
        this.name = res[0].Name;
        this.increment.NEW_INCR_REF_DATE = new Date(res[0].NEW_INCR_REF_DATE);
        this.increment.NEW_INCR_EFF_DATE = new Date(res[0].NEW_INCR_EFF_DATE);

      } else {
        this.api.showInfoToast('No data on List');
      }
    });
    this.editId = true;
  }

  deleteEmployeeIncrement() {
    const senddata = {
      // "EMP_ID": this.increment.EMP_ID,
      // "LAST_INCR_DATE": this.api.formatDate(this.increment.LAST_INCR_DATE),
      // "NEW_INCR_REF_NO": this.increment.NEW_INCR_REF_NO,
      // "NEW_INCR_AMOUNT": this.increment.NEW_INCR_AMOUNT,
      // "NEW_INCR_REF_DATE": this.api.formatDate(this.increment.NEW_INCR_REF_DATE),
      // "NEW_INCR_EFF_DATE": this.api.formatDate(this.increment.NEW_INCR_EFF_DATE),
      // "REMARKS": this.increment.REMARKS,
      // "AREARMONTHS": this.increment.AREARMONTHS,
      // "AREARAMOUNT": this.increment.AREARAMOUNT,

      "IDNo": this.increment.EMP_CARD_NO,
      "Increment": this.increment.NEW_INCR_AMOUNT,
      "IncDate": this.api.formatDate(this.increment.NEW_INCR_EFF_DATE),
      

    };
    this.api.patchdata('psn-employee-salary-incrs/deleteEmployeeIncrementData', senddata).subscribe(res => {
      this.response = res;
      console.log(this.response);
      this.added.emit(true);

      this.api.showSuccessToast('Success', this.response.message);
      // form.resetForm();
    });
    this.editId = true;
  }

  edit() {
    // const senddata = {
    //   "EMP_ID": this.increment.EMP_ID,
    //   "LAST_INCR_DATE": this.increment.LAST_INCR_DATE,
    //   "LAST_INCR_AMOUNT": this.increment.LAST_INCR_AMOUNT,
    //   "NEW_INCR_REF_NO": this.increment.NEW_INCR_REF_NO,
    //   "NEW_INCR_AMOUNT": this.increment.NEW_INCR_AMOUNT,
    //   "NEW_INCR_REF_DATE": this.increment.NEW_INCR_REF_DATE,
    //   "NEW_INCR_EFF_DATE": this.increment.NEW_INCR_EFF_DATE,
    //   "REMARKS": this.increment.REMARKS,
    //   "AREARMONTHS": this.increment.AREARMONTHS,
    //   "AREARAMOUNT": this.increment.AREARAMOUNT,

    // };
    // this.api.postdata('psn-employee-salary-incrs/updatePSNEmployeeSalaryIncr', senddata).subscribe(res => {
    //   this.response = res;
    //   console.log(this.response);
    //   this.added.emit(true);

    //   this.api.showSuccessToast('Success', this.response.message);
    // });
  }

  ngOnInit() {
    this.getCards();

  }

  getCards(search: string = null) {
    let link = 'psn-employees?filter[limit]=50&filter[where][EMP_ACTIVITY]=1';
    if (search) link += '&filter[where][EMP_CARD_NO][like]=%' + search + '%';
    this.api.getdata(link).subscribe((res: any[]) => this.cardnos = res);
  }

  cardSelected() {
    if (!this.increment.EMP_CARD_NO) return;
    const employee = this.cardnos.find((element: any) => element.EMP_CARD_NO = this.increment.EMP_CARD_NO);
    const lastIncrement = this.cardnos.find((element: any) => element.EMP_CARD_NO = this.increment.EMP_CARD_NO);
    this.name = employee.EMP_NAME_ENG;
    this.increment.EMP_ID = employee.EMP_ID;
    this.lastincrementAmount = lastIncrement.LAST_INCREMENT_AMOUNT;
  }

  patch(form: NgForm) {
    // if (!this.increment.EMP_CARD_NO) {
    //   this.api.showWarningToast('Warning', 'please fill employee card no.');
    //   return;
    // }
    // if (!this.increment.LAST_INCR_DATE) {
    //   this.api.showWarningToast('Warning', 'please fill last increment date.');
    //   return;
    // }
    // if (!this.increment.LAST_INCR_AMOUNT) {
    //   this.api.showWarningToast('Warning', 'please fill last increment amount.');
    //   return;
    // }
    if (!this.increment.NEW_INCR_AMOUNT) {
      this.api.showWarningToast('Warning', 'please fill increment amount.');
      return;
    }
    // if (!this.increment.NEW_INCR_REF_NO) {
    //   this.api.showWarningToast('Warning', 'please fill ref no.');
    //   return;
    // }
    // if (!this.increment.NEW_INCR_REF_DATE) {
    //   this.api.showWarningToast('Warning', 'please fill ref date.');
    //   return;
    // }
    if (!this.increment.NEW_INCR_EFF_DATE) {
      this.api.showWarningToast('Warning', 'please fill effective date.');
      return;
    }

    if(!this.increment.LAST_INCR_DATE)this.increment.LAST_INCR_DATE = '1990-01-01';
    if(!this.increment.NEW_INCR_REF_DATE)this.increment.NEW_INCR_REF_DATE = this.api.formatDate(this.increment.NEW_INCR_EFF_DATE);
    const senddata = {
      "EMP_ID": this.increment.EMP_ID,
      "LAST_INCR_DATE": this.api.formatDate(this.increment.LAST_INCR_DATE),
      //"LAST_INCR_AMOUNT": this.increment.LAST_INCR_AMOUNT,
      "NEW_INCR_REF_NO": this.increment.NEW_INCR_REF_NO,
      "NEW_INCR_AMOUNT": this.increment.NEW_INCR_AMOUNT,
      "NEW_INCR_REF_DATE": this.api.formatDate(this.increment.NEW_INCR_REF_DATE),
      "NEW_INCR_EFF_DATE": this.api.formatDate(this.increment.NEW_INCR_EFF_DATE),
      "REMARKS": this.increment.REMARKS,
      "AREARMONTHS": this.increment.AREARMONTHS,
      "AREARAMOUNT": this.increment.AREARAMOUNT,

    };
    this.api.postdata('psn-employee-salary-incrs/insertPSNEmployeeSalaryIncr', senddata).subscribe(res => {
      this.response = res;
      console.log(this.response);
      this.added.emit(true);

      this.api.showSuccessToast('Success', this.response.message);
      form.resetForm();
    });
  }

  search() {
    this.api.getdata('psn-employee-salary-incrs/searchSalaryIncrement?cardno=' + this.cardNo).subscribe((res: any) => {
      this.searchDatas = res.result;
      // this.ADVANCE_KEY = res.result[0].ADVANCE_KEY;
      //console.log(this.ADVANCE_KEY);
    });
  }

  reset() {
    this.increment = [];
  }

  backClicked() {
    this._location.back();
  }

}
