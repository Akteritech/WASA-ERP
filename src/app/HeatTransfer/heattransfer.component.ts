import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-heattranfer',
  templateUrl: './heattransfer.component.html',
  styleUrls: ['./heattranfer.component.css']
})
export class HeattransferComponent implements OnInit {
  sidebar = false;
  samples = {
    'totalSamples': 0,
    'todaySamples': 0,
    'todayDelivery': 0
  };
  workorders = {
    'totalOrders': 0,
    'todayOrders': 0,
    'todayDelivery': 0
  };
  jobcards = {
    'totalJobCards': 0,
    'todayJobCards': 0,
    // "todayDelivery": 0
  };
  // challans = 0;
  constructor(public api: ApiService) { }
  getSampleCount() {
    this.api.getdata('SampleGeneralSpecs/getSampleDashboardData?pcid=5').subscribe((res: any) => {
      this.samples = res;
    }, error1 => {
      console.log(error1);
    });
  }
  getWorkOrderCount() {
    this.api.getdata('WorkOrderMasters/getWorkOrderDashboardData?pcid=5').subscribe((res: any) => {
      this.workorders = res;
    }, error1 => {
      console.log(error1);
    });
  }
  getJobCardCount() {
    this.api.getdata('JobCardMasters/getWovenDashboardData').subscribe((res: any) => {
      this.jobcards = res;
    }, error1 => {
      console.log(error1);
    });
  }
  // getChallanCount() {
  //   this.api.getdata('ChallanMasters/count').subscribe((res: any) => {
  //     this.challans = res.count;
  //   }, error1 => {
  //     console.log(error1);
  //   });
  // }
  ngOnInit() {
    this.getSampleCount();
    this.getWorkOrderCount();
    this.getJobCardCount();
    // this.getChallanCount();
  }

}
