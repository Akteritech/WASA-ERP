import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { SuiModalService } from 'ng2-semantic-ui';
import { ShowDetail } from '../../templates/show-detail/show-detail.component';

@Component({
  selector: 'app-pi',
  templateUrl: './pi.component.html',
  styleUrls: ['./pi.component.css']
})
export class PIComponent implements OnInit {
  editId: number;
  goToPage: any;
  fromPage: any;
  toPage: any;
  fromDate: Date;
  toDate: Date;
  meta: {
    totalItemCount: number,
    totalPageCount: number,
    itemsPerPage: number,
    currentPage: number,
    nextPage: number,
  };
  pino: any;
  piData: any[];

  constructor(private api: ApiService, public modalService: SuiModalService, ) {
    this.meta = {
      totalItemCount: 0,
      totalPageCount: 0,
      itemsPerPage: 10,
      currentPage: 1,
      nextPage: 0,
    };
    // this.fromDate = new Date();
    // this.toDate = new Date();
  }

  ngOnInit() {
    this.get();
  }

  get() {
    this.api.getdata(this.getFilterUrl()).subscribe((res: any) => {
      this.piData = res.data;
      this.meta.totalItemCount = res.size;
    });
  }

  getFilterUrl(): string {
    const page = (this.meta.currentPage - 1) * this.meta.itemsPerPage;
    let link = `BuyerWisePIMasters/piTableData/?page=` + page + '&pageSize=' + this.meta.itemsPerPage;
    if (this.pino) link += '&pino=' + this.pino;
    if (this.fromDate) link += '&from=' + this.api.formatDate(this.fromDate);
    if (this.toDate) link += '&to=' + this.api.formatDate(this.toDate);

    return link;
  }

  goToPageNo() {
    this.meta.currentPage = this.goToPage;
    this.get();
  }

  edit(index: number) {
    this.editId = this.piData[index].PIID;
    setTimeout(() => {
      this.editId = null;
    }, 1000);
  }

  reset() {
    this.meta.currentPage = 1;
    this.pino = null;
    this.fromDate = null;
    this.toDate = null;
    this.get();
  }

  viewDetail1(index: number) {
    let reportCode = 'showPI';
    if(this.piData[index].CompanyID == 4) reportCode =  'nexgenPI';
    else if(this.piData[index].CompanyID == 6) reportCode =  'bywaysPI';

    this.modalService.open(new ShowDetail('PI Details', reportCode, this.piData[index].PINo));
  }

}
