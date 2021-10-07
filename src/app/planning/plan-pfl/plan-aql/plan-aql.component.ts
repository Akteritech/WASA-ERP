import { Component, OnInit } from '@angular/core';
import {CuttingProduction} from '../modal/cuttingProduction';
import {ApiService} from '../../../api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SuiModalService} from 'ng2-semantic-ui';
import {ProdAql} from '../modal/ProdAql';
declare var $: any;

@Component({
  selector: 'app-plan-aql',
  templateUrl: './plan-aql.component.html',
  styleUrls: ['./plan-aql.component.css']
})
export class PlanAqlComponent implements OnInit {
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
  operatores: any;
  data: any;
  breakdownDetails: any;
  curringTableData: any;
  labtestTableData: any;
   aqlTableData: any;
   aql: any;
  meta: {
    totalItemCount: number,
    totalPageCount: number,
    itemsPerPage: number,
    currentPage: number,
    nextPage: number,
  };
   dataList: any;
   jobCardReport: any;
  constructor(
      public api: ApiService,
      public route: ActivatedRoute,
      public tost: ApiService,
      public router: Router,
      public modalService: SuiModalService
  ) {
    this.aql = new ProdAql();
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
    this.api.getdata('ProductionAqls/getProductionAql').subscribe((res: any) => {
      this.aqlTableData = res;
      this.meta.totalItemCount = this.aqlTableData.length;
      this.dataList = this.aqlTableData.slice(0, this.meta.itemsPerPage);
      console.log(this.aqlTableData);
    });
  }

pageChange() {
  const start = (this.meta.currentPage - 1) * this.meta.itemsPerPage;
  const end = start + this.meta.itemsPerPage
  this.dataList = this.aqlTableData.slice(start, end);
}
  searchRecord() {
    let link = `ProductionAqls/searchData?`;
    if (this.aql.proaqlorderid) link += '&workorderno='+encodeURIComponent(this.aql.proaqlorderid);
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
      this.api.getdata('ProductionAqls/jobReceiveInAql?printid=' + item.AQL_Id +
          '&userid=' + sessionStorage.getItem('empid') + '&comment=' + 0).subscribe((res: any) => {
        this.jobreceived = res;
        console.log(this.jobreceived);
        this.selectedCards = [];
        this.getData();
      });
    });
  }
  deleteRecord(id: number , id2: number) {
    const link = 'ProductionAqls/deleteRecordFromAql?aqlid=' + id +
        '&userid=' + sessionStorage.getItem('empid') + '&finid=' + id2;
    this.api.getdata(link).subscribe((res: any) => {
      this.deletedRecord = res;
      console.log(this.deletedRecord);
    });
    this.getData();
  }
  // preview(id: number) {
  //   $('.cutting').modal('setting', 'closable', false).modal({centered: false,  onDeny    : function() {
  //       return false;
  //     }}).modal('toggle');
  // }
 async completeData() {
    const data = {
      'data': { 'record': this.selectedCards,
        'userid': sessionStorage.getItem('empid')
      }};
    console.log(data);
   await this.api.patchdata('ProductionAqls/insertDefeactPoint' , data).subscribe( (res: any) => {
      console.log(res);
      this.api.showSuccessToast(' defect inserted');
      this.selectedCards = [];
    });
    await this.selectedCards.forEach(item => {
      this.api.getdata('ProductionAqls/confirmAql?aqlid=' + item.AQL_Id).subscribe( (res: any) => {
        console.log(res);
        // this.api.showSuccessToast(' Job card added into design process successfully');
        this.selectedCards = [];
        this.getData();
      });
    });
  }
  completeData1() {

  }

}
