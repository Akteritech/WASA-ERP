import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {SuiModalService} from 'ng2-semantic-ui';
import {DatePipe, Location} from '@angular/common';
import {ngxCsv} from 'ngx-csv';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-challan-tracking',
  templateUrl: './challan-tracking.component.html',
  styleUrls: ['./challan-tracking.component.css']
})
export class ChallanTrackingComponent implements OnInit {
   clients: any;
   companies: any;
  customerid: any;
  challanno: any;
  companyid: any;
  fromDate: any;
  toDate: any;
  selectAllChallan: any;
  deliveryChallans: any;
  meta: any;
   // challanTracking: ChallanTracking;
  deliverystatus: any;
   empid = sessionStorage.getItem('empid');
   currentRoute: any;
   tableData: any;
   searchedData: any;
  selectALlRecord: any;
   record: any[];
    options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'Woven Sample Details',
        useBom: true,
        noDownload: false,
        headers: [
            'ChallanNo', 'WorkOrderNo', 'SampleName', 'CHALQTY', 'ClientName', 'ChallanDate', 'DeliverydDate', 'ChalanReciptDate',
            'IsDelivered', 'IsChallanRecieptFound']
    };
  constructor(public api: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              private _location: Location) {
    // this.challanTracking = new ChallanTracking();
          this.challanno = '';
          this.deliverystatus = 1;
          this.fromDate = '';
          this.toDate = '';
          this.companyid = 0;
          this.customerid = 0;
    this.router.events.subscribe(
        (event: any) => {
          if (event instanceof NavigationEnd) {
            this.currentRoute = this.router.url;
          }
        }
    );
  }

  ngOnInit() {
      this.record = [];
      this.tableData = [];
    this.optionsLookupClient('a');
    this.getCompanies('a');
    // if (this.currentRoute.toString().includes('status1')) {
    //     this.challanno = 0;
    //     this.deliverystatus = 1;
    //     this.fromDate = '2020-01-01T00:00:00.000Z';
    //     this.toDate = '2020-04-28T00:00:00.000Z';
    //     this.companyid = 1;
    //     this.customerid = 0;
    //     this.getTableData();
    // } else if (this.currentRoute.toString().includes('status2')) {
    //     this.challanno = 0;
    //     this.deliverystatus = 2;
    //     this.fromDate = '2020-01-01T00:00:00.000Z';
    //     this.toDate = '2020-04-28T00:00:00.000Z';
    //     this.companyid = 1;
    //     this.customerid = 0;
    //     this.getTableData();
    // }
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
  getCompanies(query) {
    this.api.getdata('comp?filter={"limit":10,"where":{"companyname":{"like":"%25' + query + '%25"}}}').subscribe( (res: any) => {
      this.companies = res;
      // console.log(this.samples);
    }, error1 => {
      console.log('error1 ', error1);
    });
  }
getTableData() {
    const url = 'challan-trackings/deliveryChallanTrackingTableData?challanno=' + this.challanno +  '&deliverystatus=' + this.deliverystatus +
        '&fromdate=' + this.fromDate + '&todate=' + this.toDate + '&companyid=' + this.companyid + '&empid=' + this.empid;
    this.api.getdata(url).subscribe((resp: any) => { this.tableData = resp;
console.log(resp);
    });

}
  search() {
      if (this.currentRoute.toString().includes('status1')) {
          // if (this.fromDate !== '') { this.fromDate = JSON.stringify(this.fromDate); }
          // if (this.toDate !== '') { this.toDate = JSON.stringify(this.toDate); }
          const url = 'challan-trackings/deliveryChallanTrackingByClientID?challanno=' + this.challanno +  '&deliverystatus=1' +
              '&fromdate=' + this.fromDate + '&todate=' + this.toDate + '&companyid=' + this.companyid + '&customerid=' + this.customerid;
          this.api.getdata(url).subscribe((resp: any) => { this.tableData = resp;
              console.log(resp);
          });
      } else if (this.currentRoute.toString().includes('status2')) {
          const url = 'challan-trackings/deliveryChallanTrackingByClientID?challanno=' + this.challanno +  '&deliverystatus=2' +
              '&fromdate=' + this.fromDate + '&todate=' + this.toDate + '&companyid=' + this.companyid + '&customerid=' + this.customerid;
          this.api.getdata(url).subscribe((resp: any) => { this.tableData = resp;
              console.log(resp);
          });
      } else {
          const url = 'challan-trackings/deliveryChallanTrackingByClientID?challanno=' + this.challanno +  '&deliverystatus=3' +
              '&fromdate=' + this.fromDate + '&todate=' + this.toDate + '&companyid=' + this.companyid + '&customerid=' + this.customerid;
          this.api.getdata(url).subscribe((resp: any) => { this.tableData = resp;
              console.log(resp);
          });
      }

  }
  selectAll() {
      this.record = [];
    if (this.selectALlRecord) {
      this.tableData.forEach(item => {
          item.selected = true;
          item.ChalanReciptDate =  '01-01-1900';
          item.DeliverydDate = new Date();
          this.record.push(item);
      });
    } else {
        this.tableData.forEach(item => {item.selected = false;
            this.record = [];
        }); }
  }
  select(item, i) {
      if (item.selected === true) {
          // item.ChalanReciptDate =  '01-01-1900';
          // item.DeliverydDate = new Date();
          this.record.push(item);
          console.log(this.record);

      } else {
          const index = this.record.indexOf(item);
          if (index !== -1) {
              this.record.splice(index, 1);
          }
          this.selectALlRecord = false;
          console.log(this.record);

      }
  }
    exportCsv() {
      if (this.selectALlRecord) {
          new ngxCsv(this.record.map(this.mapData), 'Undelivered Challan Tracking Details', this.options);
      } else if (this.tableData) {
            new ngxCsv(this.record.map(this.mapData), 'Undelivered Challan Tracking Details', this.options);
        } else {
          console.log(this.record);
          new ngxCsv(this.record.map(this.mapData), 'Undelivered Challan Tracking Details', this.options);
      }
       }
    mapData(item) {
        return {
            ChallanNo : item.ChallanNo,
            WorkOrderNo : item.WorkOrderNo,
            SampleName : item.SampleName,
            CHALQTY : item.CHALQTY,
            ClientName : item.ClientName,
            ChallanDate  : item.ChallanDate,
            DeliverydDate : item.DeliverydDate,
            ChalanReciptDate : item.ChalanReciptDate,
            IsDelivered : item.IsDelivered,
            IsChallanRecieptFound : item.IsChallanRecieptFound
        };
    }
  updateStatus() {
        const data = {
          'data': {'record': this.record
          }};
        this.api.postdata('challan-trackings/updateStatus', data).subscribe((res: any) => { console.log(res);
          this.api.showSuccessToast(' Status Updated', '');
        }, err => {
          this.api.showFailureToast('Error', err.message);
          console.log(err);
        });
        this.getTableData();
    }

    reset() {
        this.customerid = 0;
        this.companyid = 0;
        this.fromDate = '';
        this.toDate = '';
        this.deliverystatus = 1;
        this.challanno = 0;
    }
}
