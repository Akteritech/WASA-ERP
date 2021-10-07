import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-csorderreports',
  templateUrl: './csorderreports.component.html',
  styleUrls: ['./csorderreports.component.css']
})
export class CsorderreportsComponent implements OnInit {
  companies: any;
  outstanding: boolean;
    companyname: any;
  searchFrom: any;
  searchTo: any;

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies() {
    this.api.getdata('comp').subscribe(res => {
      this.companies = res;
    }, error1 => {
      console.log('error1 ', error1);
    });
  }

  getOutstanding(){
    this.outstanding = true;
    console.log("Outstanding Report");

  }

}
