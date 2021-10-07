import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../../../api.service';
import {ActivatedRoute} from '@angular/router';
import * as html2pdf from 'html2pdf.js';

@Component({
    selector: 'app-print-thermal-job-card',
    templateUrl: './print-thermal-job-card.component.html',
    styleUrls: ['./print-thermal-job-card.component.css']
})
export class PrintThermalJobCardComponent implements OnInit {

  jobCardDetails: any;
  breakdownDetails: any[];
  materialDetails: any[];
  @Input() id: number;
  lastLine: string;
  orderTotal: number = 0;
  planTotal: number = 0;
  productionTotal: number = 0;
  materialTotal: number = 0;
  workorderId: number;
  jobCardSize: number;

  constructor(public api: ApiService , private route: ActivatedRoute) {    }

  ngOnInit() {
    this.api.getdata('JobCardDetails/jobCardGeneral?jobcard=' + this.id + '&userId=109').subscribe((res:{jobDetials: any[], materialDetails: any[]}) => {
      this.jobCardDetails = res.jobDetials[0];

      this.api.getdata('JobCardDetails/thermalBreakdown?jobcard=' + this.id).subscribe((res: any[]) => {
        this.breakdownDetails = res;
        this.breakdownDetails.forEach((element: any) => {
          this.orderTotal += element.OrderQty;
          this.planTotal += element.PlanQTY;
          this.productionTotal += element.ProductionQty;
          this.workorderId = element.WorkOrderID;
        });
      })
      //this.breakdownDetails = res.jobDetials;
      // this.breakdownDetails.forEach((element: any) => {
      //   this.orderTotal += element.OrderQty;
      //   this.planTotal += element.PlanQTY;
      //   this.productionTotal += element.ProductionQty;
      //   this.workorderId = element.WorkOrderID;
      // });
      //console.log(this.workorderId);
      this.api.getdata('JobCardMasters/getjobcardSize?WONO=' + this.workorderId).subscribe((res: any) => {
        this.jobCardSize = res.length;
        //console.log(this.jobCardSize);
      });

      this.api.getdata('JobCardMasters/getProductCategory?categoryId=' + this.workorderId).subscribe((res: any) => {
        this.jobCardSize = res.length;
        //console.log(this.jobCardSize);
      });
      this.materialDetails = res.materialDetails;
      console.log(this.jobCardDetails);
      console.log(this.jobCardDetails.TotalJobCard);
       console.log(this.breakdownDetails);
       console.log(this.materialDetails);
      this.materialDetails.forEach((element: any) => this.materialTotal += element.TotalQty);
    });
    this.lastLine = 'Printed By ' + sessionStorage.getItem('username') + ' On ' + new Date();
  }

}
