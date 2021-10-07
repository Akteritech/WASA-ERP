import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {SuiModalService} from "ng2-semantic-ui";

@Component({
  selector: 'app-pfl-jobcard-approval',
  templateUrl: './pfl-jobcard-approval.component.html',
  styleUrls: ['./pfl-jobcard-approval.component.css']
})
export class PflJobcardApprovalComponent implements OnInit {
  orderTypes: any;
  companies: any;
  ordertype: any;
  workOrdernumber: any;
  fromDate: any;
  toDate: any;
  company: any;
  items: any;
  itemid: any;
  meta: {
    totalItemCount: number,
    totalPageCount: number,
    itemsPerPage: number,
    currentPage: number,
    nextPage: number,
  };
  goToPage: any;
  selectedCards: any[];
  pflDesigns: any;
  selectAllCard: any;
  orders: any;
  productcategoryid: any;
  searchedData: any;
  AllSearchedData: any;

  constructor(public api: ApiService, private route: ActivatedRoute,
              private router: Router, private _location: Location, public modalService: SuiModalService) {
    this.meta = {
      totalItemCount: 0,
      totalPageCount: 0,
      itemsPerPage: 10,
      currentPage: 1,
      nextPage: 0,
    };
  }

  selectAll() {
    this.selectedCards = [];
    if (this.selectAllCard) {
      this.pflDesigns.forEach(item => {
        item.selected = true;
        this.selectedCards.push(item);
        console.log(this.selectedCards);
      });
    } else {
      this.pflDesigns.forEach(item => {
        item.selected = false;
        console.log(this.selectedCards);

      });
      this.selectedCards = [];
    }
  }

  selectCards(item, i) {
    if (item.selected === true) {
      this.selectedCards.push(item);
      console.log(this.selectedCards);
    } else {
      const index = this.selectedCards.indexOf(item);
      if (index !== -1) {
        this.selectedCards.splice(index, 1);
      }
      console.log(this.selectedCards);
      // this.selectedCards = false;
    }
  }

  ngOnInit() {
    this.getcompanies()
    this.getOrderType()
    this.optionsLookupItem()
    this.selectedCards = [];
  }

  getOrderType() {
    this.api.getdata('lovData?filter[where][lovtype]=Order Type').subscribe((res: any) => {
      this.orderTypes = res;
      // console.log(res);
    }, error1 => {
      // console.log('error1 ', error1);
    });
  }

  pageChange() {
    const start = (this.meta.currentPage - 1) * this.meta.itemsPerPage;
    const end = start + this.meta.itemsPerPage
    this.searchedData = this.AllSearchedData.slice(start, end);
  }

  optionsLookupItem() {
    this.api.getdata('SampleWiseMaterialDetails/getRawMaterialForPFL').subscribe(res => {
      this.items = res;
      console.log(res);
    }, error1 => {
      console.log('error1 ', error1);
    });
  }

  getcompanies() {
    this.api.getdata('comp').subscribe((res: any) => {
      this.companies = res;
    }, err => {
      console.log(err);
    });
  }

  searchForAprrove() {
    let link = `pflplannings/searchDataForApproval?`;
    if (this.company) link += '&companyid=' + this.company;
    if (this.productcategoryid) link += '&productcategoryid=2';
    if (this.itemid) link += '&itemid=' + this.itemid;
    if (this.workOrdernumber) link += '&workorderno=' + this.workOrdernumber;
    if (this.fromDate) link += '&startdate=' + this.fromDate.toJSON();
    if (this.toDate) link += '&enddate=' + this.toDate.toJSON();
    console.log(link);
    this.api.getdata(link).subscribe((res: any) => {
      this.searchedData = res.slice(0, 10);
      this.AllSearchedData = res;
      this.meta.totalItemCount = res.length;
      console.log(res);
    }, error1 => {
      console.log('error1 ', error1);
    });
  }
  excel() {
    let link = `pflplannings/searchDataForApproval?`;
    if (this.company) link += '&companyid=' + this.company;
    if (this.productcategoryid) link += '&productcategoryid=2';
    if (this.workOrdernumber) link += '&workorderno=' + this.workOrdernumber;
    if (this.fromDate) link += '&startdate=' + this.fromDate.toJSON();
    if (this.toDate) link += '&enddate=' + this.toDate.toJSON();
    console.log(link);
    this.api.getdata(link).subscribe((res: any) => {
      this.searchedData = res.slice(0, 10);
      this.AllSearchedData = res;
      this.meta.totalItemCount = res.length;
      console.log(res);
    }, error1 => {
      console.log('error1 ', error1);
    });
  }
  approvJobCard() {
    const data = {
      'data': {
        record: this.selectedCards,
        'userid': sessionStorage.getItem('userid')
      }
    };
    console.log(data);
    this.api.patchdata('PflPlannings/approvPflJobCard' , data).subscribe( (res: any) => {
      console.log(res);
      this.api.showSuccessToast(' Record added into design process successfully');
    });
  }
}