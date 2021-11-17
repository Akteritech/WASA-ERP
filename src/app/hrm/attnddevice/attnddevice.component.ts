import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import {NavigationEnd, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-attnddevice',
  templateUrl: './attnddevice.component.html',
  styleUrls: ['./attnddevice.component.css']
})
export class AttnddeviceComponent implements OnInit {
  devicestatus:string;
  area:string;
  devname:string;
  devuser:string;
  lastactivity:string;
  devicestatusActive:boolean;

  devicestatus1:string;
  area1:string;
  devname1:string;
  devuser1:string;
  lastactivity1:string;
  devicestatusActive1:boolean;

  devicestatus2:string;
  area2:string;
  devname2:string;
  devuser2:string;
  lastactivity2:string;
  devicestatusActive2:boolean;

  devicestatus3:string;
  area3:string;
  devname3:string;
  devuser3:string;
  lastactivity3:string;
  devicestatusActive3:boolean;

  devicestatus4:string;
  area4:string;
  devname4:string;
  devuser4:string;
  lastactivity4:string;
  devicestatusActive4:boolean;
  machineno:string;

  // devicestatus5:string;
  // area5:string;
  // devname5:string;
  // devuser5:string;
  // lastactivity5:string;
  // devicestatusActive5:boolean;
  attendenceReportData: any[];
  allAttendenceReportData: any[]
  
  myclass:string;
  myclassactive: string;
  
  fromDate: Date;
  toDate: Date;

  devicedata: any;
  alldevicedata: any;

  meta: {
    totalItemCount: number, totalPageCount: number, itemsPerPage: number, currentPage: number,
  };
  // devicestatusphase2Active:boolean;
  // devicestatusmtrActive:boolean;
  // meta: {
  //   totalItemCount: number,
  //   itemsPerPage: number,
  //   currentPage: number,
  // };
  currentRoute: string;
  allData = [];
  constructor(public api: ApiService, public route: Router) { 
    this.route.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = this.route.url;
        }
      }
    );


  }

  ngOnInit() {





   this.get();
  // this.machineAttendance('M-3');
  //  this.getTableData();
    // this.devicestatusActive=true;;
    // this.devicestatusActive1=true;
    // this.devicestatusActive2=true;
    // this.devicestatusActive3=true;
    // this.devicestatusActive4=true;

    // this.api.getdata('employee-attendences/attenddevicestate?zone=').subscribe((res: any) => {
       


    //     this.area="Area:" + res[0].area_name + ", " + res[0].Device + ", SN:" + res[0].SerailNo  ;
    //     this.devuser="Total Users:" + res[0].user_count + ", IP:" + res[0].ip_address;
    //     this.lastactivity=res[0].last_activity;
    //     this.devicestatus=res[0].States;

    //     this.area1="Area:" + res[1].area_name + ", " + res[1].Device + ", SN:" + res[1].SerailNo  ;
    //     this.devuser1="Total Users:" + res[1].user_count + ", IP:" + res[1].ip_address;
    //     this.lastactivity1=res[1].last_activity;
    //     this.devicestatus1=res[1].States;


    //     this.area4="Area:" + res[2].area_name + ", " + res[2].Device + ", SN:" + res[2].SerailNo  ;
    //     this.devuser4="Total Users:" + res[2].user_count + ", IP:" + res[2].ip_address;
    //     this.lastactivity4=res[2].last_activity;
    //     this.devicestatus4=res[2].States;



    //     this.area2="Area:" + res[3].area_name + ", " + res[3].Device + ", SN:" + res[3].SerailNo  ;
    //     this.devuser2="Total Users:" + res[3].user_count + ", IP:" + res[3].ip_address;
    //     this.lastactivity2=res[3].last_activity;
    //     this.devicestatus2=res[3].States;



    //     this.area3="Area:" + res[4].area_name + ", " + res[4].Device + ", SN:" + res[4].SerailNo  ;
    //     this.devuser3="Total Users:" + res[4].user_count + ", IP:" + res[4].ip_address;
    //     this.lastactivity3=res[4].last_activity;
    //     this.devicestatus3=res[4].States;

       

    //     if (this.devicestatus=="Online")
    //     {
    //      this.devicestatusActive=false;
    //     }
       
    //     if (this.devicestatus1=="Online")
    //     {
    //      this.devicestatusActive1=false;
    //     }
        
   
    //     if (this.devicestatus2=="Online")
    //       {
    //      this.devicestatusActive2=false;
    //     }
       
    //     if (this.devicestatus3=="Online")
    //     {
    //      this.devicestatusActive3=false;
    //     }
    //     if (this.devicestatus4=="Online")
    //     {
    //      this.devicestatusActive4=false;
    //     }


    //   });

//stop her layout



    // this.myclass="blink_me";

    //  if (this.devicestatus4=="Not connected")
    //  {
    //   this.devicestatusActive4=true;
    //  }
    // this.devicestatusphase1="Not conntected..";

    // this.devicestatusmtrActive=false;
    // this.devicestatusmtr="Connected.";

    // this.devicestatusphase2Active=false;
    // this.devicestatusphase2="Connected.";
   
    // this.devicestatusgen="Not conntected..";
    // this.devicestatusqcr="Not conntected..";
    // this.devicestatusfcd="Not conntected..";


    
 
    // this.api.getdata('http://103.134.255.250:8091/iclock/api/terminals/').subscribe((res: any) => {
    //   if (res[0].msg == -1) {

    //     this.api.showInfoToast('Invalid zone access');
       
    //     return;
    //   };
    
  }

  get() {

    // this.meta.currentPage = 1
    // const link = this.api.getdata('employee-attendences/wasadevices?zone=') + '';
   
    
    this.api.getdata('employee-attendences/wasadevices?zone=' + sessionStorage.getItem('zoneaccess')).subscribe((res: any[]) => {
      this.attendenceReportData = res.slice(0);
      this.allAttendenceReportData = res;
      // this.meta.totalItemCount = res.length;
    });
  }
  machineAttendance(machineno) {
    this.api.getdata('employee-attendences/zonedeviceattend?zone=' + sessionStorage.getItem('zoneaccess') + '&device=' + machineno + '&date1=' + '28-08-2021' + '&date2=' + '29-08-2021' ).subscribe((res: any[]) => {
      this.devicedata = res.slice(0);
      this.alldevicedata = res;
      //  this.meta.totalItemCount = res.length;
    });
  }
  // pageChange() {
  //   const start = (this.meta.currentPage - 1) * this.meta.itemsPerPage;
  //   const end = start + this.meta.itemsPerPage
  //   this.devicedata = this.alldevicedata.slice(start, end);
  // }
  // getTableData = () => {
  //   this.api.getdata('icg-departments/getTableData').subscribe((res: any) => {
  //     this.departmenttabledata = res.slice(0, 10);
  //     this.alldepartmenttabledata = res;
  //     this.meta.totalItemCount = res.length;
  //   });
  // }

  // pageChange() {
  //   const start = (this.meta.currentPage - 1) * this.meta.itemsPerPage;
  //   const end = start + this.meta.itemsPerPage
  //   this.departmenttabledata = this.alldepartmenttabledata.slice(start, end);
  // }
}
