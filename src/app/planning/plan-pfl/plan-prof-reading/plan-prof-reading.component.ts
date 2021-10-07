import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Designpfl } from '../modal/designpfl';
import { Pflproread } from '../modal/pflproread';
import { PrintingProduction } from '../modal/printingProduction';

@Component({
  selector: 'app-plan-prof-reading',
  templateUrl: './plan-prof-reading.component.html',
  styleUrls: ['./plan-prof-reading.component.css']
})
export class PlanProfReadingComponent implements OnInit {
  forConfirmData: any;
  showSearchForm = false;
  scanData: any;
  options: any;
  myJobcards: any;
  encodeData: string;
  encodedData: {};
  planning: any;
  sample: any;
  pflProRead: any;
  detail: any;
  pflDesignsDATA: any;
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
  pflDesign: any;
  design: any;
  fromDate: Date;
  toDate: Date;
  fromPage: any;
  toPage: any;
  selectAllCard: any;
  selectedCards: any;
  proRead: any;
  private response: any;
  private mystatus: any;
  offsetTop = 0;
  // @ts-ignore
  // @ViewChild(IonContent) content: IonContent;
  search = false;
  ptintData: any;
  profReadingTableData: any;
  // profreadingdata: any;
   pflplanning: string;
   searchedRecord: any;
   jobreceived: any;
   deletedRecord: any;
  profreadername: any;
   dataList: any;
   jobCardReport: any;
  constructor(public api: ApiService,
    public route: ActivatedRoute,
    public tost: ApiService,
    public router: Router) {
    this.pflDesign = new Designpfl();
    this.proRead = new Pflproread();
    this.ptintData = new PrintingProduction();
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
  onScroll(e) {
    this.offsetTop = e.detail.scrollTop;
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
  collapseCard(item, i) {
    if (item.use) {
      console.log(item.use);
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
  selectCardsForconfirm(item, i) {
    if (item.showJob) {
      this.forConfirmData.push(item);
      console.log('forConfirmData ' + this.forConfirmData);
    } else {
      this.forConfirmData.splice(i, 1);
      this.selectAllCard = false;
    }
  }
  goToPageNo() {
    this.dataList.forEach(item => {
      item.selected = false;
    });
    this.meta.currentPage = this.goToPage;
  }
  profreadingdata(profreadingdata: any) {
    throw new Error('Method not implemented.');
  }
  optionsLookupWorkOrder(query) {
    this.api.getdata('WorkOrderMasters?filter={"limit":10,"where":{"workorderno":{"like":"%25' + query + '%25"}}}').subscribe((res: any) => {
      this.workOrders = res;
      console.log(this.workOrders);
    }, error1 => {
      console.log('error1 ', error1);
    });
  }
  jobReceive() {
    this.selectedCards.forEach(item => {
      this.api.getdata('ProductionProfReadings/jobReceiveInProfReading?profreadid=' + item.Red_Id +
          '&userid=' + sessionStorage.getItem('userid') + '&comment=0').subscribe((res: any) => {
        this.jobreceived = res;
        console.log(this.jobreceived);
        this.selectedCards = [];
        this.getData();
      });
    });
  }
  deleteRecord(id: number, id2: number, id3: number, id4: number) {
    const link = 'ProductionProfReadings/deleteRecordFromProf?redid=' + id +
        '&userid=' + sessionStorage.getItem('userid') + '&jobcardid=' + id2 +
        '&orderid=' + id3 + '&sampleid=' + id4;
    this.api.getdata(link).subscribe((res: any) => {
      this.deletedRecord = res;
      this.api.showSuccessToast('deleted successfully');
      console.log(this.deletedRecord);
    });
    this.getData();
  }
  getData() {
    this.api.getdata('ProductionProfReadings/getProductionProfReading').subscribe((res: any) => {
      this.profReadingTableData = res;
      this.meta.totalItemCount = this.profReadingTableData.length;
      this.dataList = this.profReadingTableData.slice(0, this.meta.itemsPerPage);
      console.log(this.profReadingTableData);
    });
  }


pageChange() {
  const start = (this.meta.currentPage - 1) * this.meta.itemsPerPage;
  const end = start + this.meta.itemsPerPage
  this.dataList = this.profReadingTableData.slice(start, end);
}
  completeData() {
if (!this.selectedCards[0].profreadername) {
  this.api.showWarningToast('please enter Profreadername');
}
    const data = {
      'data': {
        record: this.selectedCards,
      'userid': sessionStorage.getItem('userid'),
    }};
    console.log(data);
    this.api.patchdata('ProductionProfReadings/confirmInProfReading' , data).subscribe( (res: any) => {
      console.log(res);
      this.api.showSuccessToast(' Record added into Printing process successfully');
      this.selectedCards = [];
      this.getData();
    });
  }

  searchRecord() {
    // this.api.getdata('ProductionProfReadings/searchData?workorderno=' + this.proRead.proreadingorderid + '&fromdate=' +
    //  this.fromDate + '&todate=' + this.toDate).subscribe((res: any) => {
    //   this.dataList = res;
    //   console.log(this.dataList);
    // });
    let link = `ProductionProfReadings/searchData?`;
    if (  this.proRead.proreadingorderid) link += '&workorderno=' + encodeURIComponent(  this.proRead.proreadingorderid);
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
  ngOnInit() {
    this.getData();
    this.optionsLookupWorkOrder('a');
    this.forConfirmData = [];
    this.selectedCards = [];
    this.pflProRead = [];
  }
}
