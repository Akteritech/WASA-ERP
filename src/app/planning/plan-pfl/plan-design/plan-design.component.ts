import { Component, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';
import { Designpfl } from '../modal/designpfl';
import { Pflproread } from '../modal/pflproread';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-plan-design',
  templateUrl: './plan-design.component.html',
  styleUrls: ['./plan-design.component.css']
})
export class PlanDesignComponent implements OnInit {
  showSearchForm = false;
  scanData: any;
  options: any;
  myJobcards: any;
  encodeData: string;
  encodedData: {};
  forConfirmData: any;
  planning: any;
  sample: any;
  pflDesigns: any;
  detail: any;
  pflDesignsDATA: any;
  Machine_details: any;
  workorder: any;
  createdby: any;
  plan: any;
  progress: boolean;
  ordStatus: any;
  error: string;
  collapse: boolean;
  meta: {
    totalItemCount: number,
    totalPageCount: number,
    itemsPerPage: number,
    currentPage: number,
    nextPage: number,
  };
  goToPage: any;
  workOrders: any;
  pflDesign: any;
  design: any;
  fromDate: Date;
  toDate: Date;
  fromPage: any;
  toPage: any;
  selectAllCard: any;
  selectedCards: any;
  proRead: any;
  offsetTop = 0;
  private response: any;
  private mystatus: any;
  // @ts-ignore
  // @ViewChild(IonContent) content: IonContent;
  search = false;
  designTableData: any;
  deletedRecord: any;
  searchedRecord: any;
  jobreceived: any;
  dataList: any;
   jobCardReport: any;

  constructor(public api: ApiService,
              public route: ActivatedRoute,
              public tost: ApiService,
              public router: Router) {
    this.pflDesign = new Designpfl();
    this.proRead = new Pflproread();
    this.meta = {
      totalItemCount: 0,
      totalPageCount: 0,
      itemsPerPage: 10,
      currentPage: 1,
      nextPage: 0,
    };
    // this.fromDate = '1900-01-01';
// this.toDate = '2500-01-01';
  }

  // scrollToTop() {
  //   this.content.scrollToTop(700);
  // }
  onScroll(e) {
    this.offsetTop = e.detail.scrollTop;
  }

  // scrollToTop() {
  //   this.content.scrollToTop(300);
  // }

  // scrollToBottom() {
  //   this.content.scrollToBottom(300);
  // }
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

  goToPageNo() {
    this.pflDesigns.forEach(item => {
      item.selected = false;
    });
    this.meta.currentPage = this.goToPage;
  }

  selectCardsForconfirm(item, i) {
    if (item.showJob) {
      this.forConfirmData.push(item);
      console.log('forConfirmData ' + this.forConfirmData);
    } else {
      this.forConfirmData.splice(i, 1);
      this.selectAllCard = false;
    }
  }

  collapseCard(item, i) {
    if (item.use) {
      console.log(item.use);
    }
  }

  updateStatusDesign() {
    if (this.selectedCards.length < 1) {
      this.tost.showSuccessToast('', ' Please select the order first');
    } else {
      this.pflDesign.prodesignid = this.selectedCards[0].Pro_De_Id;
      console.log(this.pflDesign.prodesignid);
      this.pflDesign.prodesignstatus = 3;
      this.pflDesign.Designrecdate = new Date();
      this.api.patchdata('ProductionDesigns', this.pflDesign).subscribe((resp: any) => {
        this.designdata = resp;
        console.log(this.designdata);
        this.getData();
        this.selectedCards = [];
      });
    }
  }

  designdata(designdata: any) {
    throw new Error('Method not implemented.');
  }

  // completeData() {
  //   // this.selectedCards.forEach(items => {
  //   //   // items.prodesignstatus = 4;
  //   //   this.proRead.proreadingjobid = items.JobCardID;
  //   //   this.proRead.proreadingjobcardno = items.JobCardNo;
  //   //   this.proRead.proreadingorderid = items.Pro_De_Order_Id;
  //   //   this.proRead.proreadingorderno = items.WorkOrderNo;
  //   //   this.proRead.proreadingsampleid = items.SampleID;
  //   //   this.proRead.proreadingsamplename = items.SampleName;
  //   //   this.proRead.proreadingorderqty = items.Pro_De_Ord_Qty;
  //   //   this.proRead.proreadingjobqty = items.Pro_De_Job_Qty;
  //   //   this.proRead.proreadingstatus = 0;
  //   //   this.proRead.proreadingdate = new Date();
  //   //   this.api.patchdata('ProductionProfReadings' , this.proRead).subscribe( (res2: any) => {
  //   //     console.log(res2);
  //   //     this.tost.showSuccessToast('', ' Job card added into Prof Reading process successfully');
  //   //
  //   //   });
  //   //   setTimeout( () => {
  //   //     this.pflDesign.prodesignid = items.Pro_De_Id;
  //   //     this.pflDesign.prodesignstatus = 4;
  //   //     this.pflDesign.designinsertdate = new Date();
  //   //     this.api.patchdata('ProductionDesigns' , this.pflDesign).subscribe( (res: any) => {
  //   //       console.log(res);
  //   //       this.selectedCards = [];
  //   //     });
  //   //   }, 500);
  //   // });
  //   // setTimeout( () => {
  //   //   this.getData();
  //   // }, 1000);
  // }

  optionsLookupWorkOrder(query) {
    this.api.getdata('WorkOrderMasters?filter={"limit":10,"where":{"workorderno":{"like":"%25' + query + '%25"}}}').subscribe((res: any) => {
      this.workOrders = res;
      console.log(this.workOrders);
    }, error1 => {
      console.log('error1 ', error1);
    });
  }

  getData() {
    this.api.getdata('ProductionDesigns/getProductionDesign').subscribe((res: any) => {
      this.designTableData = res;
      this.meta.totalItemCount = this.designTableData.length;
      this.dataList = this.designTableData.slice(0, this.meta.itemsPerPage);
      console.log(this.designTableData);
    });
  }


  pageChange() {
    const start = (this.meta.currentPage - 1) * this.meta.itemsPerPage;
    const end = start + this.meta.itemsPerPage
    this.dataList = this.designTableData.slice(start, end);
  }

  ngOnInit() {
    this.getData();
    this.optionsLookupWorkOrder('a');
    this.selectedCards = [];
    this.pflDesigns = [];
    this.forConfirmData = [];
    this.pflDesignsDATA = [];
  }

  jobReceive() {
    this.selectedCards.forEach(item => {
      console.log(item);
      this.api.getdata('ProductionDesigns/jobReceiveInDesign?designid=' + item.Pro_De_Id +
          '&userid=' + sessionStorage.getItem('userid')).subscribe((res: any) => {
        this.jobreceived = res;
        console.log(this.jobreceived);
        this.selectedCards = [];
        this.getData();
      });
    });
  }

  deleteRecord(id: number, id2: number, id3: number, id4: number) {
    const link = 'ProductionDesigns/deleteRecordFromDesign?redid=' + id +
        '&userid=' + sessionStorage.getItem('userid') + '&jobcardid=' + id2 +
        '&orderid=' + id3 + '&sampleid=' + id4;
    this.api.getdata(link).subscribe((res: any) => {
      this.deletedRecord = res;
      this.api.showSuccessToast('deleted successfully');
      console.log(this.deletedRecord);
    });
    this.getData();
  }

  completeData() {
    // if (this.selectedCards[0].Pro_De_Status == 0) {
    //   this.api.showWarningToast('please receive jobs');
    //   return;
    // } else if (this.selectedCards.length >= 1) {
    //   this.api.showWarningToast('please receive jobs');
    //   return;
    // }
    const data = {
      'data': {
        record: this.selectedCards,
        'userid': sessionStorage.getItem('userid')
      }
    };
    console.log(data);
    this.api.patchdata('ProductionDesigns/confirmInDesign', data).subscribe((res: any) => {
      console.log(res);
      this.api.showSuccessToast(' Record added into ProfReading process successfully');
      this.getData();
      this.selectedCards = [];
    });
  }

  // searchRecord() {
  //   this.api.getdata('PflPlannings/searchData?companyid=' +0 + '&workorderno=' + this.pflDesign.prodesignorderid).subscribe((res: any) => {
  //     this.designTableData = res;
  //     console.log(this.designTableData);
  //   });
  // }
  searchRecord() {
    //   this.api.getdata('ProductionDesigns/searchData?workorderno=' + this.pflDesign.prodesignorderid + '&fromdate=' +
    //    this.fromDate + '&todate=' + this.toDate).subscribe((res: any) => {
    //     this.dataList = res;
    //     console.log(this.dataList);
    //   });
    // }
    let link = `ProductionDesigns/searchData?`;
    if (this.pflDesign.prodesignorderid) link += '&workorderno=' + encodeURIComponent(this.pflDesign.prodesignorderid);
    if (this.fromDate) link += '&fromdate=' + this.fromDate.toJSON();
    if (this.toDate) link += '&todate=' + this.toDate.toJSON();
    this.api.getdata(link).subscribe((res: any) => {
      this.jobCardReport = res;
      this.meta.totalItemCount = this.jobCardReport.length;
      this.dataList = this.jobCardReport.slice(0, this.meta.itemsPerPage);
    });
  }
}