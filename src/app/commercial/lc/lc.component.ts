import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-lc',
  templateUrl: './lc.component.html',
  styleUrls: ['./lc.component.css']
})
export class LcComponent implements OnInit {
  collapse = false;
  response: any[];
  companies: any;

  previousData: any;
  collectionSize: number;
  item: string;
  searchTo: string;
  searchFrom: string;
  goToPage: number;
  companySearch: number;
  LCNOSearch: string;

  meta: {
    totalItemCount: number,
    totalPageCount: number,
    itemsPerPage: number,
    currentPage: number,
  };

  fromPage: number;
  toPage: number;
  editId: number;

  constructor(public api: ApiService) {
    this.goToPage = 1;
    this.collectionSize = 0;
    this.meta = {
      totalItemCount: 0,
      totalPageCount: 0,
      itemsPerPage: 15,
      currentPage: 1,
    };
  }

  ngOnInit() {
    //this.searchFrom=this.api.formatDate(new Date());
    //this.searchTo=this.api.formatDate(new Date());
    this.get();
    this.getCompanies();
  }

  get() {
    const link = this.generateQueryLink(this.meta.currentPage, this.meta.itemsPerPage);
    this.api.getdata(link).subscribe((res: {size: number, data: any[]}) => {
      this.response = res.data;
      this.meta.totalItemCount = res.size;
      this.meta.totalPageCount = this.meta.totalItemCount/this.meta.itemsPerPage + 1;
    });
  }


  searchTable() {
    this.meta.currentPage = 1;
    this.get();
  }

  reset() {
    this.LCNOSearch = null;
    this.searchFrom= null;
    this.searchTo= null;
    this.companySearch = null;
    this.meta.currentPage = 1;
    this.get();
  }

  onSaved(event: any) {
    this.reset();
  }

  goToPageNo() {
    this.meta.currentPage = this.goToPage;
    this.get();
  }

  getReportData(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const dataSize = (this.toPage - (this.fromPage - 1)) * this.meta.itemsPerPage;
      const link = this.generateQueryLink(this.fromPage, dataSize);
      this.api.getdata(link).subscribe((res: {size: number, data: any[]}) => resolve(res.data));
    });
  }

  generateQueryLink(pageNo: number, pageSize: number): string {
    const start = (pageNo - 1) * pageSize;
    let link = 'BBLC-masters/getBBLCMasterData?pageNo=' + start + '&pageSize=' + pageSize;
    if(this.searchFrom) link += '&fromDate=' + this.searchFrom;
    if(this.searchTo) link += '&toDate=' + this.searchTo;
    if(this.LCNOSearch) link += '&LCNo=' + this.LCNOSearch;
    if(this.companySearch) link += '&company=' + this.companySearch;
    return link;
  }

  getCompanies() {
    this.api.getdata('comp').subscribe((res: any[]) => this.companies = res);
  }

}
