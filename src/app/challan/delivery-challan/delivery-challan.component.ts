import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {SuiModalService} from 'ng2-semantic-ui';
import {DatePipe, Location} from '@angular/common';
import {ConfirmModal} from '../../templates/confirm-modal/confirm-modal.component';
import {ApiService} from '../../api.service';
import {DeliveryChallanMaster} from '../models/delivery-challan';
import {ShowDetail} from '../../templates/show-detail/show-detail.component';

@Component({
  selector: 'app-delivery-challan',
  templateUrl: './delivery-challan.component.html',
  styleUrls: ['./delivery-challan.component.css']
})
export class DeliveryChallanComponent implements OnInit {

  deliveryChallans: any;
  deliveryChallan: any;
  myDel: any;
  clients: any;
  companies: any;
  OrderQty = 0;
  AlreadyChallanedQty = 0;
  fromDate: DatePipe;
  toDate: DatePipe;
  selectAllChallan: any;
  selectedChallans: any;
  collapse = false;
  private id: any ;
  currentRoute: any;
  url = 'ChallanMasters';
  response: any;
  goToPage: any;
  fromPage: any;
  toPage: any;
  meta: {
    totalItemCount: number,
    totalPageCount: number,
    itemsPerPage: number,
    currentPage: number,
    nextPage: number,
  };
  pdfExcelHeaders = ['S.No', 'Challan No', 'Challan Date', 'Work Order No', 'Delivery Date', 'Approve Date', 'Is Delivered', 'Client', 'Company'];
  addNewChallan: boolean;
  editChallan: boolean;
  addNewCompany: any;
   editByChallanDate: boolean;
   todayDate: boolean;
   challanDate: string;
   today_date: number;
   details: any;
   challanqty =0;
   item: any;
   workOrders: Object;

  constructor(public api: ApiService,
              private route: ActivatedRoute,
              public modalService: SuiModalService,
              private router: Router,
              private _location: Location) {
    // console.log(this.pdfExcelHeaders[1]);

    this.meta = {
      totalItemCount: 0,
      totalPageCount: 0,
      itemsPerPage: 10,
      currentPage: 1,
      nextPage: 0,
    };
    this.deliveryChallan = new DeliveryChallanMaster();

    this.router.events.subscribe(
        (event: any) => {
          if (event instanceof NavigationEnd) {
            this.currentRoute = this.router.url;
          }
        }
    );

  }
  selectAll() {
    this.selectedChallans = [];
    if (this.selectAllChallan) {
      this.deliveryChallans.forEach(item => {
        item.selected = true;
        this.selectedChallans.push(item);
      });
    } else {
      this.deliveryChallans.forEach(item => {
        item.selected = false;
      });
      this.selectedChallans = [];
    }
  }
  selectChallans(item, i) {
    if (item.selected) {
      this.selectedChallans.push(item);
    } else {
      this.selectedChallans.splice(i, 1);
      this.selectAllChallan = false;
    }

  }

  ngOnInit() {
    if(!this.api.checkPermission('Delivery Challan', 'viewList'))  this.router.navigateByUrl('/home');
    this.addNewChallan = this.api.checkPermission('Delivery Challan', 'addList');
    this.editChallan = this.api.checkPermission('Delivery Challan', 'editList');
    this.collapse = !this.addNewCompany;

    this.optionsLookupClient('a');
    this.optionsLookupWorkOrder('a');
    this.getCompanies('a');
    this.get();
    this.deliveryChallans = [];
    this.selectedChallans = [];
  }

  // getCompanies(query) {
  //   this.api.fetchData('comp').subscribe( res => {
  //     this.companies = res;
  //     console.log(this.companies);
  //   }, error1 => {
  //     console.log('error1 ', error1);
  //   });
  // // }
  optionsLookupWorkOrder(query) {
    this.api.getdata('WorkOrderMasters?filter={"limit":10,"where":{"workorderno":{"like":"%25' + query + '%25"}}}').subscribe( res => {
      this.workOrders = res;
      // console.log(this.workOrders);
    }, error1 => {
      console.log('error1 ', error1);
    });
  }
  getCompanies(query) {
    this.api.getdata('comp?filter={"limit":10,"where":{"companyname":{"like":"%25' + query + '%25"}}}').subscribe( (res: any) => {
      this.companies = res;
      // console.log(this.samples);
    }, error1 => {
      console.log('error1 ', error1);
    });
  }
  goToPageNo() {
    this.deliveryChallans.forEach(item => {
      item.selected = false;
    });
    this.meta.currentPage = this.goToPage;
    this.get();
  }
  getFilterUrl() {
    const filter: any = {};
    filter['where'] = {};
    filter['include'] = ['workorder', 'client', 'company', 'details', 'breakdownDetails'];
    filter['order'] = 'deliverychallanid DESC';

    if (this.deliveryChallan.customerid) {
      filter['where']['customerid'] = this.deliveryChallan.customerid;
    }
    if (this.deliveryChallan.challanno) {
      filter['where']['challanno'] = this.deliveryChallan.challanno;
    }
    if (this.deliveryChallan.workorderid) {
      filter['where']['workorderid'] = this.deliveryChallan.workorderid;
    }
    if (this.deliveryChallan.companyid) {
      filter['where']['companyid'] = this.deliveryChallan.companyid;
    }
    if (this.fromDate && this.toDate) {
      filter['where']['challandate'] = {};
      filter['where']['challandate']['between'] = [this.api.formatDate(this.fromDate), this.api.formatDate(this.toDate)];
    }
    // if (this.sample.customersamplename) {
    //   filter['where']['customersamplename'] = {};
    //   filter['where']['customersamplename']['like'] = '%25' + this.sample.customersamplename + '%25';
    // }
    return filter;
  }
  get(search?: boolean) {
    if (search) {
      this.meta.currentPage = 1;
    }
    this.api.getdata(this.url + '?page=' + this.meta.currentPage + '&filter=' + JSON.stringify(this.getFilterUrl())).subscribe((res: any) => {
      // res.data.forEach(item => {
      //   if ( item.challandate.slice(0, 10) === new Date().toJSON().slice(0, 10)) {
      //     this.today_date = 1;
      //   } else {
      //     this.today_date = 0;
      //   }
      //   // this.today_date = item.challandate.slice(0, 10) === new Date().toJSON().slice(0, 10);
      //   console.log(item.challandate.slice(0, 10));
      //   console.log(new Date().toJSON().slice(0, 10));
      //   console.log(this.today_date);
      // });
      this.deliveryChallans = res.data;
      // this.getTodayData();
      this.meta = res.meta;
      console.log(this.deliveryChallans);
    }, error2 => {
      console.log(error2);
    });
  }
getTodayData() {
    this.api.getdata('ChallanMasters/getTodayData').subscribe((resp: any) => {
      this.today_date = resp;
      console.log(this.today_date);
    });
}
  optionsLookupClient(query) {
    this.api.getdata('Customers?filter={"limit":10,"where":{"clientname":{"like":"%25' + query + '%25"}}}').subscribe( (res: any) => {
      this.clients = res;
      // console.log(this.samples);
    }, error1 => {
      console.log('error1 ', error1);
    });
  }
  backClicked() {
    this._location.back();
  }
  getDelivery() {
    this.api.getdata(this.url).subscribe((res: any) => {
      this.myDel = res[0].isdelivered;
      console.log(res);
    }, error2 => {
      console.log(error2);
    });
  }
  mapData(item) {
    return {
      challanno : item.challanno,
      challandate : item.challandate ? new Date(item.challandate).toLocaleDateString() : '',
      workorderno : item.workorder ? item.workorder.workorderno : '',
      deliverydate : item.deliverydate ? new Date(item.deliverydate).toLocaleDateString('en-US') : '',
      approvedate : item.approvedate ? new Date(item.approvedate).toLocaleDateString('en-US') : '',
      isdelivered: item.isdelivered,
      client : item.client ? item.client.clientname : '',
      company : item.company ? item.company.companyname : '',
    };
  }
  exporttoExcel(pageRange?: boolean): void {
    const fileName = 'DeliveryChallans';

    const columns = [
      { header: this.pdfExcelHeaders[1], key: 'challanno', width: 15 },
      { header: this.pdfExcelHeaders[2], key: 'challandate', width: 15 },
      { header: this.pdfExcelHeaders[3], key: 'workorderno', width: 25 },
      { header: this.pdfExcelHeaders[4], key: 'deliverydate', width: 15 },
      { header: this.pdfExcelHeaders[5], key: 'approvedate', width: 15 },
      { header: this.pdfExcelHeaders[6], key: 'isdelivered', width: 10 },
      { header: this.pdfExcelHeaders[7], key: 'client', width: 30 },
      { header: this.pdfExcelHeaders[8], key: 'company', width: 30 },
    ];
    if (pageRange) {
      if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
        return;
      }
      const url = this.getFilterUrl();
      url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
      url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
      this.api.getdata(this.url + '?filter=' + JSON.stringify(url)).subscribe((res: any) => {
        this.api.exportToExcel(columns, res.map(this.mapData), fileName);
      }, error1 => {
        console.log('Class: , Line:  error1 ', error1);
      });
    } else {
      this.api.exportToExcel(columns, this.selectedChallans.map(this.mapData), fileName);
    }
  }
exporttoCsv(pageRange?: boolean): void {
    const fileName = 'DeliveryChallans';

    const columns = [
      { header: this.pdfExcelHeaders[1], key: 'challanno', width: 15 },
      { header: this.pdfExcelHeaders[2], key: 'challandate', width: 15 },
      { header: this.pdfExcelHeaders[3], key: 'workorderno', width: 25 },
      { header: this.pdfExcelHeaders[4], key: 'deliverydate', width: 15 },
      { header: this.pdfExcelHeaders[5], key: 'approvedate', width: 15 },
      { header: this.pdfExcelHeaders[6], key: 'isdelivered', width: 10 },
      { header: this.pdfExcelHeaders[7], key: 'client', width: 30 },
      { header: this.pdfExcelHeaders[8], key: 'company', width: 30 },
    ];
    if (pageRange) {
      if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
        return;
      }
      const url = this.getFilterUrl();
      url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
      url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
      this.api.getdata(this.url + '?filter=' + JSON.stringify(url)).subscribe((res: any) => {
        this.api.exportToCsv(columns, res.map(this.mapData), fileName);
      }, error1 => {
        console.log('Class: , Line:  error1 ', error1);
      });
    } else {
      this.api.exportToCsv(columns, this.selectedChallans.map(this.mapData), fileName);
    }
  }

  viewDetail(id) {
    console.log(id);
    this.modalService
        .open(new ShowDetail('Delivery Challan Details', 'challan', id))
        .onApprove(() => {

        })
        .onDeny(() => {
          console.log();
        });
  }
  viewDetail1(id) {
    console.log(id);
    this.modalService
        .open(new ShowDetail('Gate Pass Details', 'gatepass', id))
        .onApprove(() => {

        })
        .onDeny(() => {
          console.log();
        });
  }
  delete(id) {
    this.modalService
        .open(new ConfirmModal('Are you sure?', 'Are you sure to delete this?', 'mini'))
        .onApprove(() => {
          this.api.deletedata(this.url, id).subscribe((res: any) => {
            this.response = res;
            this.api.showDeleteToast('Deleted', this.response.message);
          }, err => {
            console.log(err);
          });
        })
        .onDeny(() => {
          console.log('Class: LeaveTypeComponent, Line: 39  ');
        });

  }

  exportToPDF(pageRange?: boolean) {
    if (pageRange) {
      if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
        return;
      }
      const url = this.getFilterUrl();
      url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
      url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
      this.api.getdata(this.url + '?filter=' + JSON.stringify(url)).subscribe((res: any) => {
        this.api.savePdf(this.getDataForPDF(res), 'A3', 'landscape', 'DeliveryChallans', 'auto');
      }, error1 => {
        console.log('here');
        console.log('Class: , Line:  error1 ', error1);
      });
    } else {
      this.api.savePdf(this.getDataForPDF(this.selectedChallans), 'A3', 'landscape', 'DeliveryChallans' , 'auto');

    }
  }
    printOpen(pageRange?: boolean) {
    if (pageRange) {
      if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
        return;
      }
      const url = this.getFilterUrl();
      url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
      url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
      this.api.getdata(this.url + '?filter=' + JSON.stringify(url)).subscribe((res: any) => {
        this.api.OpenPrint(this.getDataForPDF(res), 'A3', 'landscape', 'DeliveryChallans', 'auto');
      }, error1 => {
        console.log('here');
        console.log('Class: , Line:  error1 ', error1);
      });
    } else {
      this.api.OpenPrint(this.getDataForPDF(this.selectedChallans), 'A3', 'landscape', 'DeliveryChallans' , 'auto');

    }
  }
  getDataForPDF(data) {
    const Data = [this.pdfExcelHeaders];
    const pdfData = data.map(this.mapData);
    pdfData.forEach((element, i) => {
      Data.push([
        i + 1,
        element.challanno,
        element.challandate,
        element.workorderno,
        element.deliverydate,
        element.approvedate,
        element.isdelivered,
        element.client,
        element.company,
      ]);
    });
    console.log(Data);
    return Data;
  }


}
