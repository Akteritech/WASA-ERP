import { PrintingProduction } from './../modal/printingProduction';
import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../api.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import { SuiModalService } from 'ng2-semantic-ui';
import { ShowDetail } from 'src/app/templates/show-detail/show-detail.component';
declare var $: any;

@Component({
  selector: 'app-plan-printing',
  templateUrl: './plan-printing.component.html',
  styleUrls: ['./plan-printing.component.css']
})
export class PlanPrintingComponent implements OnInit {
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
   printingTableData: any;
  print: PrintingProduction;
  breakdownDetails: any;
   data: any;
  machine: any;
  machines: any;
   operatores: any;
  operator: any;
   inserted: any;
   currentRoute: string;
     machinestatus: any;
   editId: any;
   dataList: any;
   jobCardReport: any;
  constructor(
      public api: ApiService,
      public route: ActivatedRoute,
      public tost: ApiService,
      public router: Router,
      public modalService: SuiModalService,
  ) {

    this.print = new PrintingProduction();
    // this.fromDate = '1900-01-01';
    // this.toDate = '2500-01-01';
    this.meta = {
      totalItemCount: 0,
      totalPageCount: 0,
      itemsPerPage: 10,
      currentPage: 1,
      nextPage: 0,
    };
    this.route.params.subscribe(param => {
      if (param.id) {
        this.editId = param.id;
        this.getMachineIdToChangeStatus();
      }
    });
    this.router.events.subscribe(
        (event: any) => {
          if (event instanceof NavigationEnd) {
            this.currentRoute = this.router.url;
          }
        }
    );
   }

  selectAll() {
    this.selectedCards = [];
    if (this.selectAllCard) {
      this.breakdownDetails.forEach(item => {
        item.selected = true;
        this.selectedCards.push(item);
        console.log(this.selectedCards);
      });
    } else {
      this.breakdownDetails.forEach(item => {
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
  selectCardsForconfirm(item, i) {
    if (item.showJob) {
      this.forConfirmData.push(item);
      console.log('forConfirmData ' + this.forConfirmData);
    } else {
      this.forConfirmData.splice(i, 1);
      this.selectAllCard = false;
    }
  }
 
  getMachineIdToChangeStatus() {
    this.dataList.forEach(item => {
      this.api.getdata('ProductionPrintings/getmachine?printid=' + item.Pri_Id).subscribe((res: any) => {
        item.machinestatus = res;
        if (!item.machinestatus.length) {
          item.hides =true;
          // document.getElementById('machine').style.display = 'none';

          // document.getElementById('machine1').style.display = 'none';
        }
        console.log(item.machinestatus);
      });
    });
  }
 
  goToPageNo() {
    this.profReadingTableData.forEach(item => {
      item.selected = false;
    });
    this.meta.currentPage = this.goToPage;
  }

  optionsLookupWorkOrder(query: string) {
    this.api.getdata('WorkOrderMasters?filter={"limit":10,"where":{"workorderno":{"like":"%25' + query + '%25"}}}').subscribe((res: any) => {
      this.workOrders = res;
      console.log(this.workOrders);
    }, error1 => {
      console.log('error1 ', error1);
    });
  }
  getData() {
    this.api.getdata('ProductionPrintings/getProductionPrinting').subscribe((res: any) => {
      this.printingTableData = res;
      this.meta.totalItemCount = this.printingTableData.length;
      this.dataList = this.printingTableData.slice(0, this.meta.itemsPerPage);
      console.log(this.dataList);
      this.getMachineIdToChangeStatus();
    });
  }


pageChange() {
  const start = (this.meta.currentPage - 1) * this.meta.itemsPerPage;
  const end = start + this.meta.itemsPerPage
  this.dataList = this.printingTableData.slice(start, end);
  this.getMachineIdToChangeStatus();
}
  getBreakDownDetails() {
    this.api.getdata('ProductionPrintings/getBreakDownDetailsByWorkOrder?prijobid=' + this.data.proprintingjobid +
        '&priorderid=' + this.data.proprintingorderid).subscribe((res: any) => {
      this.breakdownDetails = res;
      console.log(this.breakdownDetails);
    });
  }
  jobReceive() {
    this.selectedCards.forEach(item => {
      this.api.getdata('ProductionPrintings/jobReceiveInPrinting?printid=' + item.Pri_Id +
          '&userid=' + sessionStorage.getItem('userid') + '&comment=' + 0).subscribe((res: any) => {
        this.jobreceived = res;
        console.log(this.jobreceived);
        this.selectedCards = [];
        this.getData();
      });
    });
  }
  deleteRecord(id: number, id2: number) {
    const link = 'ProductionPrintings/deleteRecordFromPrinting?printid=' + id +
        '&userid=' + sessionStorage.getItem('userid') + '&prireadid=' + id2;
    this.api.getdata(link).subscribe((res: any) => {
      this.deletedRecord = res;
      this.api.showSuccessToast('deleted successfully');
      console.log(this.deletedRecord);
    });
    this.getData();
  }


  searchRecord() {
    let link = `ProductionPrintings/searchData?`;
    if (this.print.proprintingorderid) link += '&workorderno='+encodeURIComponent(this.print.proprintingorderid);
if (this.fromDate) link += '&fromdate='+ this.fromDate.toJSON();
if (this.toDate) link += '&todate='+ this.toDate.toJSON();
    this.api.getdata(link).subscribe((res: any) => {
      this.jobCardReport = res;
      this.meta.totalItemCount = this.jobCardReport.length;
      this.dataList = this.jobCardReport.slice(0, this.meta.itemsPerPage);
      console.log(this.dataList);
    });
  }
  viewDetail(id) {
    console.log(id);
    this.modalService
      .open(new ShowDetail('Print Details', 'productionPrinting', id))
      .onApprove(() => {

      })
      .onDeny(() => {
        console.log();
      });
//       this.api.getdataByid('ProductionPrintings', id).subscribe((res: any) => {
// console.log(res);
// this.data = res;
//       });
//       setTimeout(() => {
//         this.getBreakDownDetails();
//       }, 500);
  }
  machineAutoSelect() {
    this.selectedCards.forEach((item , index) => {
      item.MachingId = item[index].MachingId;
      console.log(item.MachingId);
    });
  }
    preview(id: number) {
     this.api.getdataByid('ProductionPrintings', id).subscribe((res: any) => {
    console.log(res); this.data = res; });
      setTimeout(() => {
        this.getBreakDownDetails();
      }, 500);
      $('.woven').modal('setting', 'closable', false, {blurring: true}).modal({centered: false,  onDeny    : function() {
          return false;
        }}).modal('toggle');
  }
  ngOnInit() {
    this.getData();
    this.optionsLookupWorkOrder('a');
    this.forConfirmData = [];
    this.selectedCards = [];
    this.pflProRead = [];
    // this.selectAllCard.forEach(item => {
    //   this.breakdownDetails.MachingId
    // });
  }

  selectAllMachine() {
    this.selectedCards.forEach(item => {
      item.MachingId = this.selectedCards[0].MachingId;
    });
  }


  selectAllOperator() {
    this.selectedCards.forEach(item => {
      item.OperatorID = this.selectedCards[0].OperatorID;
    });
  }
}
