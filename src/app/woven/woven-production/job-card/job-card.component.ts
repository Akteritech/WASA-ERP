import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../../api.service';
import {JobCard} from '../../models/jobcard';
import {ShowDetail} from '../../../templates/show-detail/show-detail.component';
import {SuiModalService} from 'ng2-semantic-ui';
import {DatePipe, Location} from '@angular/common';
import {ConfirmModal} from '../../../templates/confirm-modal/confirm-modal.component';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css']
})
export class JobCardComponent implements OnInit {
  showSearchForm = false;
  fromDate: DatePipe;
  toDate: DatePipe;
  jobCards: any;
  brands: any;
  clients: any;
  @Input() id: number;
  companies: any;
  productCategories: any;
  productcategoryid: any;
  selectedCards: any;
  selectAllCard: any;
  companyid: any;
  workOrders: any;
  jobcard: any;
  response: any;
  collapse = false;
  goToPage: any;
  fromPage: any;
  toPage: any;
  samples: any;
  meta: {
    totalItemCount: number,
    totalPageCount: number,
    itemsPerPage: number,
    currentPage: number,
    nextPage: number,
  };
  currentRoute: any;
   tabledata: any;
   searchJobCard: any;
   searchWorkOrder: any;
  constructor(public api: ApiService, private router: Router, public modalService: SuiModalService, private _location: Location) {
    this.meta = {
      totalItemCount: 0,
      totalPageCount: 0,
      itemsPerPage: 10,
      currentPage: 1,
      nextPage: 0,
    };

    this.jobcard = new JobCard();
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = this.router.url;
        }
      }
    );
  }
  back() {
    this._location.back();
  }
  ngOnInit() {
    if(!this.api.checkPermission('Job Card', 'viewList'))  this.router.navigateByUrl('/home');
    this.get(false, false);

    // this.getTableData();
    this.getBrands('a');
    this.getClients('a');
    this.optionsLookupSample('a');
    this.optionsLookupWorkOrder('2019');
    this.jobCards = [];
    this.selectedCards = [];
  }
  getBrands(query) {
    this.api.getdata('Brands?filter={"limit":10,"where":{"brandname":{"like":"%25' + query + '%25"}}}').subscribe( (res: any) => {
      this.brands = res;
      // console.log(this.samples);
    }, error1 => {
      console.log('error1 ', error1);
    });
  }
  DeleAllSelectedSample() {
    this.modalService
      .open(new ConfirmModal('Are you sure?', 'Are you sure to delete selected row?', 'mini' ))
      .onApprove(() => {
        this.selectedCards.forEach(item => {
          this.api.deletedata('jobcardmasters/' , item.jobcardid).subscribe( (res: any) => {
            this.response = res;
            this.api.showDeleteToast('Deleted', this.response.message);
            this.get(false, false);
          }, error1 => {
            console.log(error1);
          });
        });
      })
      .onDeny(() => {
        console.log('Class: LeaveTypeComponent, Line: 39  ');
      });
  }
  getClients(query) {
    this.api.getdata('Customers?filter={"limit":10,"where":{"clientname":{"like":"%25' + query + '%25"}}}').subscribe((res: any) => {
      this.clients = res;

    }, err => {
      console.log(err);
    });
  }
  goToPageNo() {
    this.jobCards.forEach(item => {
      item.selected = false;
    });
    this.meta.currentPage = this.goToPage;
    this.get(false, false);
  }
  getJobCards() {
    this.jobcard.workorderno = '';
    this.api.getdata('JobCardMasters/jobCardDashBoardDetail?brandid='
      + this.jobcard.brandid + '&workorderno=' + this.jobcard.workorderno
    ).subscribe((res: any) => {
      this.jobCards = res;
      console.log(res);
    }, error2 => {
      console.log(error2);
    });
  }
  // getFilterUrl() {
  //   const filter: any = {};
  //   filter['where'] = {};
  //   filter['include'] = [{'sample': ['productCategory']}, {'workorder': ['brand', 'customer']}];
  //   filter['order'] = 'jobcardid DESC';
  //   if (this.jobcard.sampleid) {
  //     filter['where']['sampleid'] = this.jobcard.sampleid;
  //     this.collapse=true;
  //
  //   }
  //   if (this.jobcard.workorderid) {
  //     filter['where']['workorderid'] = this.jobcard.workorderid;
  //     this.collapse=true;
  //
  //   }
  //   if (this.jobcard.brandid) {
  //     filter['where']['brandname'] = this.jobcard.brandid;
  //     this.collapse=true;
  //
  //   }
  //   if (this.fromDate && this.toDate) {
  //     filter['where']['jobcarddate'] = {};
  //     filter['where']['jobcarddate']['between'] = [this.api.formatDate(this.fromDate), this.api.formatDate(this.toDate)];
  //     this.collapse=true;
  //
  //   }
  //   if (this.jobcard.jobcardno) {
  //     filter['where']['jobcardno'] = {};
  //     filter['where']['jobcardno']['like'] = '%25' + this.jobcard.jobcardno + '%25';
  //     this.collapse=true;
  //   }
  //     return filter;
  // }
  selectAll() {
    this.selectedCards = [];
    if (this.selectAllCard) {
      this.jobCards.forEach(item => {
        item.selected = true;
        this.selectedCards.push(item);
      });
    } else {
      this.jobCards.forEach(item => {
        item.selected = false;
      });
      this.selectedCards = [];
    }
  }
  selectCards(item, i) {
    if (item.selected) {
      this.selectedCards.push(item);
    } else {
      this.selectedCards.splice(i, 1);
      this.selectAllCard = false;
    }
  }
  getFilterUrl(): string {
    const start = this.meta.itemsPerPage * (this.meta.currentPage - 1);
    let link = 'JobCardMasters/jobcardtable/?category=' + 1 + '&start=' + start + '&size=' + this.meta.itemsPerPage;
    if (this.searchJobCard) { link += '&jobcardno=' + this.searchJobCard; }
    if (this.searchWorkOrder) { link += '&workorderno=' + this.searchWorkOrder; }
    if (this.fromDate) { link += '&from=' + this.api.formatDate(this.fromDate); }
    if (this.toDate) { link += '&to=' + this.api.formatDate(this.toDate); }
    if (this.searchJobCard) { link += '&jobcardno=' + this.searchJobCard; }

    return link;
  }
  get(search: boolean, view: boolean) {
    if (search) {
      this.meta.currentPage = 1;
      this.collapse = true;
    }
    this.api.getdata(this.getFilterUrl()).subscribe((res: any) => {
      this.jobCards = res.data;
      console.log(this.jobCards);
      this.meta.totalItemCount = res.size;

      if (view) { this.viewDetail(this.jobCards[0].JobCardID); }
    });
  }
  // get(search?: boolean) {
  //   if (search) {
  //     this.meta.currentPage = 1;
  //
  //   }
  //   this.api.getdata('JobCardMasters?page=' + this.meta.currentPage +
  //     '&filter=' + JSON.stringify(this.getFilterUrl())).subscribe((res: any) => {
  //     this.jobCards = res.data;
  //     this.meta = res.meta;
  //     console.log(this.jobCards);
  //   }, error2 => {
  //     console.log(error2);
  //   });
  // }
  getTableData() {
    this.api.getdata('JobCardMasters/getTableData').subscribe((res: any) => {
      this.tabledata = res;
      console.log(res);

    });
  }
  viewDetail(id) {
    this.modalService
      .open(new ShowDetail('Job Card Details', 'showjobcard', id))
      .onApprove(() => {
      })
      .onDeny(() => {
        console.log();
      });
  }
  optionsLookupSample(query) {
    const filter: any = {};
    filter['where'] = {};
    filter['order'] = 'sampleid DESC';
    filter['where']['productcategoryid'] = 1;
    filter['limit'] = 10;
    filter['where']['samplename'] = {};
    filter['where']['samplename']['like'] = '%25' + query + '%25';
    this.api.getdata('SampleGeneralSpecs?filter=' + JSON.stringify(filter)).subscribe( (res: any) => {
      this.samples = res;
      console.log(this.samples);
    }, error1 => {
      console.log('error1 ', error1);
    });
  }
  getproductCategories() {
    this.api.getdata('productcategories').subscribe((res: any) => {
      this.productCategories = res;
      console.log(res);
    }, error2 => {
      console.log(error2);
    });
  }
  getCompanies() {
    this.api.getdata('comp').subscribe( (res: any) => {
      this.companies = res;
      console.log(this.companies);
    }, error1 => {
      console.log('error1 ', error1);
    });
  }
  optionsLookupWorkOrder(query) {
    this.api.getdata('WorkOrderMasters?filter={"limit":10,"where":{"workorderno":{"like":"%25' + query + '%25"}}}').subscribe( (res: any) => {
      this.workOrders = res;
      console.log(this.workOrders);
    }, error1 => {
      console.log('error1 ', error1);
    });
  }

  mapData(item) {
    return {
      jobcardno : item.jobcardno,
      jobcarddate : new Date(item.jobcarddate).toLocaleDateString('en-US'),
      workorderno : item.workorder ? item.workorder.workorderno : '',
      workorderdate : item.workorder ? new Date(item.workorder.orderreceivedate).toLocaleDateString('en-US') : '',
      sampleno : item.sample ? item.sample.sampleno : '',
      samplename : item.sample ? item.sample.samplename : '',
      samplelength : item.sample ? item.sample.length : '',
      brand : item.workorder ? item.workorder.brand.brandname : '',
      client : item.workorder ? item.workorder.customer.clientname : '',
      planstartdate : new Date(item.planstartdate).toLocaleDateString('en-US'),
      isproductiondone : item.isproductiondone,
      totaljobcard : item.totaljobcard,
      isneedle : item.isneedle,
      istaffata : item.istaffata,
      remarks : item.remarks,
      priority : item.priority,
    };
  }
  exporttoExcel(pageRange?: boolean): void {
    const fileName = 'job_cards';
    const columns = [
      { header: 'Job Card No', key: 'jobcardno', width: 20 },
      { header: 'Job Card Date', key: 'jobcarddate', width: 15 },
      { header: 'Work Order No', key: 'workorderno', width: 25 },
      { header: 'Work Order Date', key: 'workorderdate', width: 15 },
      { header: 'Sample No', key: 'sampleno', width: 20 },
      { header: 'Sample Name', key: 'samplename', width: 30 },
      { header: 'Sample Length', key: 'samplelength', width: 10 },
      { header: 'Brand', key: 'brand', width: 20 },
      { header: 'Client', key: 'client', width: 30 },
      { header: 'Plan Start Date', key: 'planstartdate', width: 15 },
      { header: 'Is Production Done', key: 'isproductiondone', width: 5 },
      { header: 'Total Job Card', key: 'totaljobcard', width: 5 },
      { header: 'IsNeedle', key: 'isneedle', width: 5 },
      { header: 'IsTaffata', key: 'istaffata', width: 5 },
      { header: 'Remarks', key: 'remarks', width: 10 },
      { header: 'Priority', key: 'priority', width: 5 },
    ];
    if (pageRange) {
      if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
        return;
      }
      const url = this.getFilterUrl();
      url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
      url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
      this.api.getdata('JobCardMasters?filter=' + JSON.stringify(url)).subscribe((res: any) => {
        this.api.exportToExcel(columns, res.map(this.mapData), fileName);
      }, error1 => {
        console.log('Class: , Line:  error1 ', error1);
      });
    } else {
      this.api.exportToExcel(columns, this.selectedCards.map(this.mapData), fileName);
    }
  }
  exporttoCsv(pageRange?: boolean): void {
    const fileName = 'job_cards';
    const columns = [
      { header: 'Job Card No', key: 'jobcardno', width: 20 },
      { header: 'Job Card Date', key: 'jobcarddate', width: 15 },
      { header: 'Work Order No', key: 'workorderno', width: 25 },
      { header: 'Work Order Date', key: 'workorderdate', width: 15 },
      { header: 'Sample No', key: 'sampleno', width: 20 },
      { header: 'Sample Name', key: 'samplename', width: 30 },
      { header: 'Sample Length', key: 'samplelength', width: 10 },
      { header: 'Brand', key: 'brand', width: 20 },
      { header: 'Client', key: 'client', width: 30 },
      { header: 'Plan Start Date', key: 'planstartdate', width: 15 },
      { header: 'Is Production Done', key: 'isproductiondone', width: 5 },
      { header: 'Total Job Card', key: 'totaljobcard', width: 5 },
      { header: 'IsNeedle', key: 'isneedle', width: 5 },
      { header: 'IsTaffata', key: 'istaffata', width: 5 },
      { header: 'Remarks', key: 'remarks', width: 10 },
      { header: 'Priority', key: 'priority', width: 5 },
    ];
    if (pageRange) {
      if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
        return;
      }
      const url = this.getFilterUrl();
      url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
      url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
      this.api.getdata('JobCardMasters?filter=' + JSON.stringify(url)).subscribe((res: any) => {
        this.api.exportToCsv(columns, res.map(this.mapData), fileName);
      }, error1 => {
        console.log('Class: , Line:  error1 ', error1);
      });
    } else {
      this.api.exportToCsv(columns, this.selectedCards.map(this.mapData), fileName);
    }
  }



  exportToPDF(pageRange?: boolean) {
    const fileName = 'Job Card';
    if (pageRange) {
      if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
        return;
      }
      const url = this.getFilterUrl();
      url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
      url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
      this.api.getdata('JobCardMasters?filter=' + JSON.stringify(url)).subscribe((res: any) => {
        this.api.savePdf(this.getDataForPDF(res), 'A2', 'landscape', fileName , 'auto');
      }, error1 => {
        console.log('here');
        console.log('Class: , Line:  error1 ', error1);
      });
    } else {
      this.api.savePdf(this.getDataForPDF(this.selectedCards), 'A2', 'landscape', fileName , 'auto');

    }
  }
  printOpen(pageRange?: boolean) {
    const fileName = 'Job Card';
    if (pageRange) {
      if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
        return;
      }
      const url = this.getFilterUrl();
      url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
      url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
      this.api.getdata('JobCardMasters?filter=' + JSON.stringify(url)).subscribe((res: any) => {
        this.api.OpenPrint(this.getDataForPDF(res), 'A2', 'landscape', fileName , 'auto');
      }, error1 => {
        console.log('here');
        console.log('Class: , Line:  error1 ', error1);
      });
    } else {
      this.api.OpenPrint(this.getDataForPDF(this.selectedCards), 'A2', 'landscape', fileName , 'auto');

    }
  }

  getDataForPDF(data) {
    const Data = [[
      'S.No',
      'Job Card No',
      'Job Card Date',
      'Work Order No',
      'Work Order Date',
      'Sample No',
      'Sample Name',
      'Sample Length',
      'Brand',
      'Client',
      'Plan Start Date',
      'Is Production Done',
      'Total Job Card',
      'IsNeedle',
      'IsTaffata',
      'Remarks',
      'Priority',
    ]];
    const sampleData = data.map(this.mapData);
    sampleData.forEach((element, i) => {
      Data.push([
        i + 1,
        element.jobcardno,
        element.jobcarddate,
        element.workorderno,
        element.workorderdate,
        element.sampleno,
        element.samplename,
        element.samplelength,
        element.brand,
        element.client,
        element.planstartdate,
        element.isproductiondone,
        element.totaljobcard,
        element.isneedle,
        element.istaffata,
        element.remarks,
        element.priority,
      ]);
    });
    return Data;
  }
}
