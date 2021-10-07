import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import {ShowDetail} from '../../templates/show-detail/show-detail.component';
import {Router} from '@angular/router';
import {SuiModalService} from 'ng2-semantic-ui';
import {Location} from '@angular/common';

@Component({
  selector: 'app-masterchallan',
  templateUrl: './masterchallan.component.html',
  styleUrls: ['./masterchallan.component.css']
})
export class MasterchallanComponent implements OnInit {
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
  masterpino: any;
   masterChallan: any;
  pino: any;
  constructor(private api: ApiService, private router: Router, public modalService: SuiModalService, private _location: Location) {
    this.meta = {
      totalItemCount: 0,
      totalPageCount: 0,
      itemsPerPage: 10,
      currentPage: 1,
      nextPage: 0,
    };
   }

  ngOnInit() {
this.get(true);
  }


  reset() {
    this.meta.currentPage = 1;
    this.masterpino = null;
    this.fromDate = null;
    this.toDate = null;
  }
  getFilterUrl() {
    const filter: any = {};
    filter['where'] = {};
    filter['order'] = 'masterchallanid DESC';
    if (this.pino) {
      filter['where']['workorderid'] = this.pino;
    }
    if (this.masterpino) {
      filter['where']['masterchallanno'] = this.masterpino;
    }
    if (this.fromDate && this.toDate) {
      filter['where']['createddate'] = {};
      filter['where']['createddate']['between'] = [this.api.formatDate(this.fromDate), this.api.formatDate(this.toDate)];
    }
    return filter;
  }
  get(search?: boolean) {
    if (search) {
      this.meta.currentPage = 1;
    }
    this.api.getdata('master-challans' + '?page=' + this.meta.currentPage + '&filter=' + JSON.stringify(this.getFilterUrl())).subscribe((res: any) => {
      this.masterChallan = res.data;
      console.log(this.masterChallan);
      this.meta = res.meta;
    }, error2 => {
      console.log(error2);
    });
  }
  viewDetail(id) {
    this.modalService
        .open(new ShowDetail('Master Challan Details', 'masterchallan', id))
        .onApprove(() => {
        })
        .onDeny(() => {
          console.log();
        });
  }
  goToPageNo() {}
}
