import { Component, OnInit } from '@angular/core';
import {CuttingProduction} from '../modal/cuttingProduction';
import {ApiService} from '../../../api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SuiModalService} from 'ng2-semantic-ui';
import {Curring} from '../modal/curring';
declare var $: any;

@Component({
  selector: 'app-plan-curing',
  templateUrl: './plan-curing.component.html',
  styleUrls: ['./plan-curing.component.css']
})
export class PlanCuringComponent implements OnInit {
  showSearchForm = false;
  fromDate: Date;
  toDate: Date;
  cuttingTableData: any;
  jobreceived: any;
  selectedCards: any;
  selectAllCard: any;
  cutting: CuttingProduction;
  pflProRead: any;
  deletedRecord: any;
  machines: any;
  meta: {
    totalItemCount: number,
    totalPageCount: number,
    itemsPerPage: number,
    currentPage: number,
    nextPage: number,
  };
  operatores: any;
  data: any;
  breakdownDetails: any;
   curringTableData: any;
   curring: Curring;
   dataList: any;
   jobCardReport: any;
  constructor(
      public api: ApiService,
      public route: ActivatedRoute,
      public tost: ApiService,
      public router: Router,
      public modalService: SuiModalService
  ) {
    this.curring = new Curring();
    // this.fromDate = '1900-01-01';
    // this.toDate = '2500-01-01';
    this.meta = {
      totalItemCount: 0,
      totalPageCount: 0,
      itemsPerPage: 10,
      currentPage: 1,
      nextPage: 0,
    };
  }

  ngOnInit() {
    this.getData();
    this.selectedCards = [];
    this.pflProRead = [];
  }
  selectAll() {
    this.selectedCards = [];
    if (this.selectAllCard) {
      this.pflProRead.forEach(item => {
        item.selected = true;
        this.selectedCards.push(item);
        console.log(this.selectedCards);
      });
    } else {
      this.pflProRead.forEach(item => {
        item.selected = false;
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
  getData() {
    this.api.getdata('ProductionCurrings/getProductionCurring').subscribe((res: any) => {
      this.curringTableData = res;
      this.meta.totalItemCount = this.curringTableData.length;
      this.dataList = this.curringTableData.slice(0, this.meta.itemsPerPage);
      console.log(this.curringTableData);
    });
  }



pageChange() {
  const start = (this.meta.currentPage - 1) * this.meta.itemsPerPage;
  const end = start + this.meta.itemsPerPage
  this.dataList = this.curringTableData.slice(start, end);
}
  // searchRecord() {
  //   this.api.getdata(`ProductionCurrings/searchData?companyid=` + this.curring.procurringorderid + '&workorderno=' +
  //       this.curring.procurringorderid).subscribe((res: any) => {
  //     this.cuttingTableData = res;
  //     console.log(this.cuttingTableData);
  //   });
  // }
  searchRecord() {
    let link = `ProductionCurrings/searchData?`;
    if (this.curring.procurringorderid) link += '&workorderno='+encodeURIComponent(this.curring.procurringorderid);
    if (this.fromDate) link += '&fromdate='+ this.fromDate.toJSON();
    if (this.toDate) link += '&todate='+ this.toDate.toJSON();
    this.api.getdata(link).subscribe((res: any) => {
      this.jobCardReport = res;
      this.meta.totalItemCount = this.jobCardReport.length;
      this.dataList = this.jobCardReport.slice(0, this.meta.itemsPerPage);
    });
  }
  jobReceive() {
    this.selectedCards.forEach(item => {
      this.api.getdata('ProductionCurrings/jobReceiveInCurring?printid=' + item.Curr_Id +
          '&userid=' + sessionStorage.getItem('empid') + '&comment=' + 0).subscribe((res: any) => {
        this.jobreceived = res;
        console.log(this.jobreceived);
        this.selectedCards = [];
        this.getData();
      });
    });
  }
  deleteRecord(id: number, id2: number) {
    const link = 'ProductionCurrings/deleteRecordFromCurring?currid=' + id +
        '&userid=' + sessionStorage.getItem('empid') + '&cutid=' + id2;
    this.api.getdata(link).subscribe((res: any) => {
      this.deletedRecord = res;
      this.api.showSuccessToast('deleted successfully');
      console.log(this.deletedRecord);
    });
    this.getData();
  }
  // preview(id: number) {
  //   $('.cutting').modal('setting', 'closable', false).modal({centered: false,  onDeny    : function() {
  //       return false;
  //     }}).modal('toggle');
  // }
  completeData() {
    const data = {
      'data': { 'record': this.selectedCards,
        'userid': sessionStorage.getItem('empid')
      }};
    console.log(data);
    this.api.patchdata('ProductionCurrings/confirmInCurring' , data).subscribe( (res: any) => {
      console.log(res);
      this.api.showSuccessToast(' Job card added into labtest, finish and aql process successfully');
      this.selectedCards = [];
      this.getData();
    });
  }
}
