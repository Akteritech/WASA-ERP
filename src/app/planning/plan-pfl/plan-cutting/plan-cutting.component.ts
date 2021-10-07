import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../api.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {SuiModalService} from 'ng2-semantic-ui';
import {PrintingProduction} from '../modal/printingProduction';
import {CuttingProduction} from '../modal/cuttingProduction';
declare var $: any;

@Component({
  selector: 'app-plan-cutting',
  templateUrl: './plan-cutting.component.html',
  styleUrls: ['./plan-cutting.component.css']
})
export class PlanCuttingComponent implements OnInit {
  fromDate: Date;
  toDate: Date;
  showSearchForm = false;
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
   machinestatus: any;
   currentRoute: string;
   editId: any;
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
    this.cutting = new CuttingProduction();
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

  ngOnInit() {
    this.getData();
    this.selectedCards = [];
    this.pflProRead = [];
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
  getData() {
    this.api.getdata('ProductionCuttings/getProductionCutting').subscribe((res: any) => {
      this.cuttingTableData = res;
      this.meta.totalItemCount = this.cuttingTableData.length;
      this.dataList = this.cuttingTableData.slice(0, this.meta.itemsPerPage);
      console.log(this.cuttingTableData);
        this.getMachineIdToChangeStatus();
    });
  }

pageChange() {
  const start = (this.meta.currentPage - 1) * this.meta.itemsPerPage;
  const end = start + this.meta.itemsPerPage
  this.dataList = this.cuttingTableData.slice(start, end);
  this.getMachineIdToChangeStatus();
}
  getBreakDownDetails(id: number) {
    this.api.getdata('ProductionCuttings/getDetailsByMasterID?masterid=' + id).subscribe((res: any) => {
      this.breakdownDetails = res;
      console.log(this.breakdownDetails);
    });
  }
  getMachineIdToChangeStatus() {
    this.dataList.forEach(item => {
      this.api.getdata('ProductionCuttings/getmachine?cuttingid=' + item.Cat_Id).subscribe((res: any) => {
        item.machinestatus = res;
        if (!item.machinestatus.length) {
          item.hides =true;
          // document.getElementById('machine').style.display = 'none';
          // document.getElementById('machine1').style.display = 'none';
        }
        console.log(this.machinestatus);
      });
    });
  }
  jobReceive() {
    this.selectedCards.forEach(item => {
      this.api.getdata('ProductionCuttings/jobReceiveInCutting?catid=' + item.Cat_Id +
        '&userid=' + sessionStorage.getItem('userid') + '&comment=' + 0).subscribe((res: any) => {
      this.jobreceived = res;
      console.log(this.jobreceived);
      this.getData();
    });
    });
  }
  deleteRecord(id: number, id2: number) {
    const link = 'ProductionCuttings/deleteRecordFromCutting?cuttingid=' + id +
        '&userid=' + sessionStorage.getItem('userid') + '&priid=' + id2;
    this.api.getdata(link).subscribe((res: any) => {
      this.deletedRecord = res;
      this.api.showSuccessToast('deleted successfully');
      console.log(this.deletedRecord);
    });
    this.getData();
  }
  completeData() {
    const data = {
      'data': {
        'breakdown': this.selectedCards,
        'userid': sessionStorage.getItem('userid')
      }};
    console.log(data);
    this.api.patchdata('ProductionCuttings/confirmInCutting' , data).subscribe( (res: any) => {
      console.log(res);
      this.api.showSuccessToast(' machine started');
      this.selectedCards = [];
      this.getData();
    });
  }

  searchRecord() {
    // this.api.getdata('ProductionCuttings/searchData?workorderno=' + this.cutting.procuttingorderid + '&fromdate=' +
    //     this.fromDate + '&todate=' + this.toDate).subscribe((res: any) => {
    //   this.dataList = res;
    //   console.log(this.dataList);
    // });
    let link = `ProductionCuttings/searchData?`;
    if (this.cutting.procuttingorderid) link += '&workorderno='+encodeURIComponent(this.cutting.procuttingorderid);
    if (this.fromDate) link += '&fromdate='+ this.fromDate.toJSON();
    if (this.toDate) link += '&todate='+ this.toDate.toJSON();
    this.api.getdata(link).subscribe((res: any) => {
      this.jobCardReport = res;
      this.meta.totalItemCount = this.jobCardReport.length;
      this.dataList = this.jobCardReport.slice(0, this.meta.itemsPerPage);
    });
  }

}
