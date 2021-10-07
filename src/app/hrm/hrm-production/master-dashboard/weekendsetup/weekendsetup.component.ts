import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../../api.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-weekendsetup',
  templateUrl: './weekendsetup.component.html',
  styleUrls: ['./weekendsetup.component.css']
})
export class WeekendsetupComponent implements OnInit {
  datas: any;
  Name: string;
  SerachText: string;
  constructor(private _location: Location, public api: ApiService) {

  }

  ngOnInit() {
  }

  backClicked() {
    this._location.back();
  }

  search() {
    // if(!this.companyname) {
    //   this.api.showWarningToast('Please Select Zone.');
    //   return;
    // }
    this.api.getdata('hrm-weekendsetups/searchHRMConfiguration?Name=' + this.Name + `&SerachText=` + this.SerachText).subscribe((res: any) => {
      this.datas = res.result;
    });
  }

  reset() {

  }


}
