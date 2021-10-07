import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CuttingProduction} from '../modal/cuttingProduction';
import {ApiService} from '../../../api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SuiModalService} from 'ng2-semantic-ui';
import {ProdFinished} from '../modal/ProdFinished';
declare var $: any;

@Component({
  selector: 'app-plan-finishing',
  templateUrl: './plan-finishing.component.html',
  styleUrls: ['./plan-finishing.component.css']
})
export class PlanFinishingComponent implements OnInit {
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
  meta: {
    totalItemCount: number,
    totalPageCount: number,
    itemsPerPage: number,
    currentPage: number,
    nextPage: number,
  };
  breakdownDetails: any;
  curringTableData: any;
  labtestTableData: any;
   finishTableData: any;
   finish: ProdFinished;
   dataList: any;
   jobCardReport: any;
  constructor(
      public api: ApiService,
      public route: ActivatedRoute,
      public tost: ApiService,
      public router: Router,
      public modalService: SuiModalService
  ) {
    this.finish = new ProdFinished();
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
    this.api.getdata('ProductionFinisheds/getProductionFinished').subscribe((res: any) => {
      this.finishTableData = res;
      this.meta.totalItemCount = this.finishTableData.length;
      this.dataList = this.finishTableData.slice(0, this.meta.itemsPerPage);
      console.log(this.finishTableData);
    });
  }

pageChange() {
  const start = (this.meta.currentPage - 1) * this.meta.itemsPerPage;
  const end = start + this.meta.itemsPerPage
  this.dataList = this.finishTableData.slice(start, end);
}
  searchRecord() {
    // this.api.getdata('ProductionFinisheds/searchData?workorderno=' + this.finish.profinishedorderid + '&fromdate=' +
    //     this.fromDate + '&todate=' + this.toDate).subscribe((res: any) => {
    //   this.dataList = res;
    //   console.log(this.dataList);
    // });
    let link = `ProductionFinisheds/searchData?`;
    if ( this.finish.profinishedorderid) link += '&workorderno=' + encodeURIComponent( this.finish.profinishedorderid);
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
      this.api.getdata('ProductionFinisheds/jobReceiveInFinish?printid=' + item.JobCardID +
          '&userid=' + sessionStorage.getItem('empid') + '&comment=' + 0).subscribe((res: any) => {
        this.jobreceived = res;
        console.log(this.jobreceived);
        this.selectedCards = [];
        this.getData();
      });
    });
  }
  deleteRecord(id: number, id2: number) {
    const link = 'ProductionFinisheds/deleteRecordFromFinish?finid=' + id +
        '&userid=' + sessionStorage.getItem('empid') + '&labid=' + id2;
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
  completeData() {
    this.selectedCards.forEach(item => {
      const link = 'ProductionFinisheds/updateFinishForPflPlanning?finid=' +
         item.FIN_Id + '&printwastageqty=' + item.printwastageqty + '&cuttingwastageqty=' + item.cuttingwastageqty
          + '&finishqty=' + item.finishqty + '&settingwastageqty=' + item.settingwastageqty
          + '&finishername=' + item.finishername;
      this.api.getdata(link).subscribe( (res: any) => {
        console.log(res);
        this.api.showSuccessToast('success');
        this.selectedCards = [];
        this.getData();
      });
    });
  }



  // scroll() {
  //   console.log('scrol kr')
  //   const buttonRight = document.getElementById('slideRight');
  //   const buttonLeft = document.getElementById('slideLeft');
  //
  //   buttonRight.onclick = function () {
  //     document.getElementById('scrol').scrollLeft += 20;
  //   };
  //   buttonLeft.onclick = function () {
  //     document.getElementById('scrol').scrollLeft -= 20;
  //   };
  // }
}
