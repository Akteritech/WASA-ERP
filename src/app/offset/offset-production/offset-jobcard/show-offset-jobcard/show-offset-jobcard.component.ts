import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../../../api.service';
import {ActivatedRoute} from '@angular/router';
import * as html2pdf from 'html2pdf.js';
@Component({
  selector: 'app-show-offset-jobcard',
  templateUrl: './show-offset-jobcard.component.html',
  styleUrls: ['./show-offset-jobcard.component.css']
})
export class ShowOffsetJobcardComponent implements OnInit {
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
  upsData: any;

  constructor(public api: ApiService , private route: ActivatedRoute) {  }

  ngOnInit() {
    this.api.getdata('JobCardDetails/offsetJobCard?jobcard=' + this.id).subscribe((res:{jobDetials: any[], materialDetails: any[], upsData: any[]}) => {
      this.jobCardDetails = res.jobDetials[0];
      this.upsData = res.upsData[0];
      this.breakdownDetails = res.jobDetials;
      this.breakdownDetails.forEach((element: any) => {
        this.orderTotal += element.TotalOrdQty;
        this.planTotal += element.PlanQTY;
        this.productionTotal += element.ProductionQty;
        this.workorderId = element.WorkOrderID;
      });
      console.log(this.orderTotal);
      this.api.getdata('JobCardMasters/getjobcardSize?WONO=' + this.workorderId).subscribe((res: any) => {
        this.jobCardSize = res.length;
      });

      this.api.getdata('JobCardMasters/getProductCategory?categoryId=' + this.workorderId).subscribe((res: any) => {
        this.jobCardSize = res.length;
      });
      this.materialDetails = res.materialDetails;
      this.materialDetails.forEach((element: any) => this.materialTotal += element.TotalQty);
    });
    this.lastLine = 'Printed By ' + sessionStorage.getItem('username') + ' On ' + new Date();
  }

}
