import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-addholidaysetup',
  templateUrl: './addholidaysetup.component.html',
  styleUrls: ['./addholidaysetup.component.css']
})
export class AddholidaysetupComponent implements OnInit {
  response: any;
  currentRoute: any;
  @Output() added = new EventEmitter<boolean>();
  @Input() id: number;
  holiday: any;
  selectedDate: Date;
  empid: any;

  constructor(private _location: Location, public api: ApiService, private route: ActivatedRoute, private router: Router) {

    this.holiday = {}

    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = this.router.url;
        }
      }
    );
  }

  patch(form: NgForm) {
    if (!form.valid) {
      this.api.showWarningToast('Warning', 'please fill required fields first.');
      return;
    }

    const date: Date = this.holiday.HOLIDAY_DATE;
    //let mm = date.toLocaleString('default', { month: 'long' }) + date.getFullYear().toString().substr(-2);
    let mm = date.toLocaleString('default', { month: 'long' }).substring(0, 3) + date.getFullYear().toString().substr(-2);
    let dd = date.toLocaleString('default', { weekday: 'long' });
    console.log(date);
    console.log(dd);
    console.log(mm);

    this.holiday.HOLIDAY_DATE = this.api.formatDate(this.holiday.HOLIDAY_DATE);
    this.holiday.HOLIDAY_MONTH = mm;
    this.holiday.HOLIDAY_DAY_NAME = dd;
    this.holiday.CREATE_DATE = new Date();
    this.holiday.UPDATE_DATE = new Date();
    this.holiday.CREATED_BY = this.empid;

    this.api.patchdata('hrm-holidaysetups', this.holiday).subscribe(res1 => {
      this.response = res1;
      this.added.emit(true);

      this.api.showSuccessToast('Success', this.response.message);
      form.resetForm();
    }, err => {
      this.api.showFailureToast('Error', err.message);
      console.log(err);
    });
  }

  

  ngOnInit() {
    this.empid = sessionStorage.getItem('empid')
  }

  backClicked() {
    this._location.back();
  }

}
