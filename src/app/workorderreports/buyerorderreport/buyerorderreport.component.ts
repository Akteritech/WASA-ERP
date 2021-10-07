import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-buyerorderreport',
  templateUrl: './buyerorderreport.component.html',
  styleUrls: ['./buyerorderreport.component.css']
})
export class BuyerorderreportComponent implements OnInit {
  companies: any;
  outstanding: boolean;
    companyname: any;
  searchFrom: any;
  searchTo: any;

  constructor(public api: ApiService) { }

  ngOnInit() {
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
