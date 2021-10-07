import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-deliverychartreports',
  templateUrl: './deliverychartreports.component.html',
  styleUrls: ['./deliverychartreports.component.css']
})
export class DeliverychartreportsComponent implements OnInit {
  productcategory: any;
  searchFrom: any;
  searchTo: any;
  productcategories: any;
  reportType: any;
  confirmorder: boolean;

  constructor(public api: ApiService) { 

  }

  ngOnInit() {
    this.getproductcategories();
    this.confirmorder = true;
  }

  getproductcategories() {
    this.api.getdata('productcategories').subscribe((res: any) => {
      this.productcategories = res;
    }, err => {
      console.log(err);
    });
  }

  reset() {
    this.productcategory = null;
    this.searchFrom = null;
    this.searchTo = null;
    this.reportType = null;
  }

}
