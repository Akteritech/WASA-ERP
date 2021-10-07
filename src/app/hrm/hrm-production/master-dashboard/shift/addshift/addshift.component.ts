import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-addshift',
  templateUrl: './addshift.component.html',
  styleUrls: ['./addshift.component.css']
})
export class AddshiftComponent implements OnInit {
  response: any;
  currentRoute: any;
  @Output() added = new EventEmitter<boolean>();
  @Input() id: number;
  shift: any;
  selectedDate: Date;
  empid: any;
  groups: any;

  constructor(private _location: Location, public api: ApiService, private route: ActivatedRoute, private router: Router) {

    this.shift = {}

    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = this.router.url;
        }
      }
    );
  }

  getGroup() {
    this.api.getdata('icg-groups/').subscribe(res => {
      this.groups = res;
    }, err => {
      console.log(err);
    });
  }

  patch(form: NgForm) {
    if (!form.valid) {
      this.api.showWarningToast('Warning', 'please fill required fields first.');
      return;
    }

    const date: Date = this.shift.HOLIDAY_DATE;
    //let mm = date.toLocaleString('default', { month: 'long' }) + date.getFullYear().toString().substr(-2);
    let mm = date.toLocaleString('default', { month: 'long' }) + date.getFullYear().toString().substr(-2);
    let dd = date.toLocaleString('default', { weekday: 'long' });
    console.log(date);
    console.log(dd);
    console.log(mm);

    this.shift.HOLIDAY_DATE = this.api.formatDate(this.shift.HOLIDAY_DATE);
    this.shift.HOLIDAY_MONTH = mm;
    this.shift.HOLIDAY_DAY_NAME = dd;
    this.shift.CREATE_DATE = new Date();
    this.shift.UPDATE_DATE = new Date();
    this.shift.CREATED_BY = this.empid;

    this.api.patchdata('hrm-holidaysetups', this.shift).subscribe(res1 => {
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
    this.getGroup();
  }

  backClicked() {
    this._location.back();
  }

}
