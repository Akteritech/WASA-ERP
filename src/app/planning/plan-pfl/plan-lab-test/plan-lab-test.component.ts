import { Component, OnInit } from '@angular/core';
import {CuttingProduction} from '../modal/cuttingProduction';
import {ApiService} from '../../../api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SuiModalService} from 'ng2-semantic-ui';
import {LabTest} from '../modal/labTest';
declare var $: any;

@Component({
  selector: 'app-plan-lab-test',
  templateUrl: './plan-lab-test.component.html',
  styleUrls: ['./plan-lab-test.component.css']
})
export class PlanLabTestComponent implements OnInit {
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
  meta: {
    totalItemCount: number,
    totalPageCount: number,
    itemsPerPage: number,
    currentPage: number,
    nextPage: number,
  };
  machines: any;
  operatores: any;
  data: any;
  breakdownDetails: any;
  curringTableData: any;
   labtestTableData: any;
   labtest: LabTest;
   dataList: any;
  private jobCardReport: any;
  constructor(
      public api: ApiService,
      public route: ActivatedRoute,
      public tost: ApiService,
      public router: Router,
      public modalService: SuiModalService
  ) {
    this.labtest = new LabTest();
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
    this.api.getdata('ProductionLabTests/getProductionLabTest').subscribe((res: any) => {
      this.labtestTableData = res;
      this.meta.totalItemCount = this.labtestTableData.length;
      this.dataList = this.labtestTableData.slice(0, this.meta.itemsPerPage);
      console.log(this.labtestTableData);
    });
  }

pageChange() {
  const start = (this.meta.currentPage - 1) * this.meta.itemsPerPage;
  const end = start + this.meta.itemsPerPage
  this.dataList = this.labtestTableData.slice(start, end);
}
  searchRecord() {
    // this.api.getdata('ProductionLabTests/searchData?workorderno=' + this.labtest.prolabtestorderid + '&fromdate=' +
    //     this.fromDate + '&todate=' + this.toDate).subscribe((res: any) => {
    //   this.dataList = res;
    //   console.log(this.dataList);
    // });
    let link = `ProductionLabTests/searchData?`;
    if (this.labtest.prolabtestorderid) link += '&workorderno=' + encodeURIComponent(this.labtest.prolabtestorderid);
    if (this.fromDate) link += '&fromdate=' + this.fromDate.toJSON();
    if (this.toDate) link += '&todate=' + this.toDate.toJSON();
    this.api.getdata(link).subscribe((res: any) => {
      this.jobCardReport = res;
      this.meta.totalItemCount = this.jobCardReport.length;
      this.dataList = this.jobCardReport.slice(0, this.meta.itemsPerPage);
    });
  }
  jobReceive() {
    this.selectedCards.forEach(item => {
      this.api.getdata('ProductionLabTests/jobReceiveInLabTest?printid=' + item.Lab_Id +
          '&userid=' + sessionStorage.getItem('empid') + '&comment=' + 0).subscribe((res: any) => {
        this.jobreceived = res;
        console.log(this.jobreceived);
        this.selectedCards = [];
        this.getData();
      });
    });
  }
  deleteRecord(id: number, id2: number) {
    const link = 'ProductionLabTests/deleteRecordFromLabTest?labid=' + id +
        '&userid=' + sessionStorage.getItem('empid') + '&currid=' + id2;
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
    this.selectedCards.forEach(item => {
      this.api.getdata('ProductionLabTests/confirmLabtest?labid=' + item.Lab_Id).subscribe( (res: any) => {
        console.log(res);
        this.api.showSuccessToast(' Status Updated successfully');
        this.selectedCards = [];
        this.getData();
      });
    });
  }
}
