import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hrm',
  templateUrl: './hrm.component.html',
  styleUrls: ['./hrm.component.css']
})
export class HrmComponent implements OnInit {
  zonename:string;
  todayattend:string;
  sumattend:string;
  api: any;
  companies: string[];
  devicestatus:string;
  constructor() { 

    this.todayattend=sessionStorage.getItem('todayattend');
    this.sumattend=sessionStorage.getItem('sumattend');
      
    
  }

  ngOnInit() {
    this.devicestatus="Some device(s) not connected..";
    this.todayattend=sessionStorage.getItem('todayattend');
    this.sumattend=sessionStorage.getItem('sumattend');
    // this.todayattend =this.zonename;
    // const link = 'employee-attendences/zonetodayattend?zone=' + this.zonename;

    // this.api.getdata(link).subscribe((res: string) => {
    //   this.todayattend = res;
     
    // });
 
  }

}
