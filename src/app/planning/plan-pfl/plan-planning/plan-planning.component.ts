import { Component, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';

import {ActivatedRoute, Router} from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { PflPlanning } from '../modal/pflPlanning';
// import { Designpfl } from '../modal/designpfl';

@Component({
  selector: 'app-plan-planning',
  templateUrl: './plan-planning.component.html',
  styleUrls: ['./plan-planning.component.css']
})
export class PlanPlanningComponent implements OnInit {
  showSearchForm = false;
  scanData: any;
  options: any;
  myJobcards: any ;
  encodeData: string ;
  encodedData: {} ;
  planning: any;
  sample: any;
  jobCardReport: any;
  detail: any;
  Machine_details: any;
  workorder: any;
  createdby: any;
  plan: any;
  progress: boolean;
  ordStatus: any;
  error: string;
  meta: {
    totalItemCount: number,
    totalPageCount: number,
    itemsPerPage: number,
    currentPage: number,
    nextPage: number,
  };
  goToPage: any;
  workOrders: any;
  pflplanning: any;
  design: any;
  fromDate: any;
  toDate: any;
  response: any;
  toPage: any;
  selectAllCard: any;
  pflDesign: any;
  selectedCards: any;
  jobCardReport1: any;
  updatedata: any;
   searchedRecord: any;
   dataList: any;
  constructor( public api: ApiService,
               public route: ActivatedRoute,
               public tost: ApiService,
               public router: Router) {
    this.pflplanning = new PflPlanning();
   // this.pflDesign = new Designpfl();
    this.planning = 3;
// this.fromDate = new Date(1900, 1, 1);
// this.fromDate = new Date(2500, 1, 1);
    this.meta = {
      totalItemCount: 0,
      totalPageCount: 0,
      itemsPerPage: 10,
      currentPage: 1,
      nextPage: 0,
    };


  }
  open() {
    this.design = true;
    console.log(this.design);
  }
  selectAll() {
    this.selectedCards = [];
    if (this.selectAllCard) {
      this.dataList.forEach(item => {
        item.selected = true;
        this.selectedCards.push(item);
        console.log(this.selectedCards);
      });
    } else {
      this.dataList.forEach(item => {
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
  updateStatus() {
    this.api.patchdata('ProductionDesigns/updateProductionDesign' , this.pflDesign).subscribe((resp: any) => {
      this.updatedata = resp;
      console.log(this.updatedata);
      this.tost.showSuccessToast('updated successfully');
    });
  }
  completeData() {
    const data = {
      'data': {
            record: this.selectedCards,
           'userid': sessionStorage.getItem('userid')
      }
    };
    console.log(data);
        this.api.patchdata('PflPlannings/confirmPlanning' , data).subscribe( (res: any) => {
          console.log(res);
          this.api.showSuccessToast(' Record added into design process successfully');
          this.getData();
          this.selectedCards = [];
        });
  }

  goToPageNo() {
    this.dataList.forEach(item => {
      item.selected = false;
    });
    this.meta.currentPage = this.goToPage;
    // this.getJobCard();
  }
  getData() {
    this.api.getdata('PflPlannings/getProductionPlanning').subscribe((res: any) => {
      this.jobCardReport = res;
      this.meta.totalItemCount = this.jobCardReport.length;
      this.dataList = this.jobCardReport.slice(0, this.meta.itemsPerPage);
      console.log(this.jobCardReport);
    });
  }
  pageChange() {
    const start = (this.meta.currentPage - 1) * this.meta.itemsPerPage;
    const end = start + this.meta.itemsPerPage
    this.dataList = this.jobCardReport.slice(start, end);
  }

   optionsLookupWorkOrder(query) {
    this.api.getdata('WorkOrderMasters?filter={"limit":10,"where":{"workorderno":{"like":"%25' + query + '%25"}}}').subscribe( (res: any) => {  
      this.workOrders = res;
      console.log(this.workOrders);
    }, error1 => {
      console.log('error1 ', error1);
    });
  }
  ngOnInit() {
    // this.my();
    this.getData();
    this.optionsLookupWorkOrder('a');
    this.selectedCards = [];
    this.dataList = [];
  }

   searchRecord() {
    // this.api.getdata('PflPlannings/searchData?workorderno=' + this.pflplanning.proorderid + '&fromdate=' +
    //  this.fromDate + '&todate=' + this.toDate).subscribe((res: any) => {
    //   this.dataList = res;
    //   console.log(this.dataList);
    // });
     let link = `PflPlannings/searchData?`;
     if ( this.pflplanning.proorderid) link += '&workorderno=' + encodeURIComponent( this.pflplanning.proorderid);
     if (this.fromDate) link += '&fromdate=' + this.fromDate.toJSON();
     if (this.toDate) link += '&todate=' + this.toDate.toJSON();
     this.api.getdata(link).subscribe((res: any) => {
       this.jobCardReport = res;
       this.meta.totalItemCount = this.jobCardReport.length;
       this.dataList = this.jobCardReport.slice(0, this.meta.itemsPerPage);
       // console.log(this.jobCardReport);
       console.log(this.dataList);
     });
  }
}
