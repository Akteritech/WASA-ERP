import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../../api.service';

@Component({
  selector: 'app-show-delivery-challan',
  templateUrl: './show-delivery-challan.component.html',
  styleUrls: ['./show-delivery-challan.component.css']
})
export class ShowDeliveryChallanComponent implements OnInit {
  challanDetails: any;
  @Input() id: number;
   details: any;
   showpagedata: any;
   showpagedata1: any;
   showpagedata2: any;
  showpagedata3: any;
  orderTotal = 0;
  prevChallanTotal = 0;
  challanqty = 0;
  remQty = 0;
   qtyTotal = 0;
  constructor(public api: ApiService, private route: ActivatedRoute) { }
  get(id) {
    let filter: any = {};
    filter['where'] = {};
    filter['include'] = ['workorder', 'client', 'company', 'details', 'breakdownDetails'];
    filter = JSON.stringify(filter);
    this.api.getdata('ChallanMasters/' + id + '?filter=' + filter).subscribe(res => {
      this.challanDetails = res;
      console.log(res);
     this.getShowPageDataByChallanNo();
     this.getShowPageDataByChallanNo1();
     this.getShowPageDataByChallanNo2();
    }, error => {
      console.log(error);
    });
  }
  getBreakDOwnDetails(id) {
    this.api.fetchDataById('ChallanBreakDowns', id).subscribe((resp: any) => {
      this.details = resp;
      console.log(this.details);
    }
  );
  }
  getShowPageDataByChallanNo() {
    this.api.fetchData('ChallanDetails/challanReport1?challanid=' +
        this.challanDetails.deliverychallanid + '&partsid=' + this.challanDetails.details[0].partsid +
        '&workorderid=' + this.challanDetails.workorderid).subscribe((resp: any) => {
this.showpagedata = resp;
this.showpagedata3 = resp[0];
      this.showpagedata.forEach((elements: any) => {
        this.orderTotal += elements.BreakDownQTY;
        this.prevChallanTotal += elements.PreviousChallanQty;
        this.challanqty += elements.ChallanBreakDownQty;
        this.remQty += (elements.BreakDownQTY - (elements.PreviousChallanQty  + elements.ChallanBreakDownQty));
           });
          console.log(this.showpagedata);
    }, err => {
      console.log(' error', err);
    });
  }
  getShowPageDataByChallanNo1() {
    this.api.fetchData('ChallanDetails/challanReport2?deliverychallanid=' +
        this.challanDetails.deliverychallanid + '&partsid=' + this.challanDetails.details[0].partsid +
        '&challandate=' + this.challanDetails.challandate.substring(0, 10) + '&workorderid=' +
        this.challanDetails.workorderid).subscribe((resp: any) => {
      this.showpagedata1 = resp;
      this.showpagedata1.forEach(elements => {
        this.qtyTotal += elements.Qty;
      });
      console.log(this.showpagedata1);
    });
  }
  getShowPageDataByChallanNo2() {
    this.api.fetchData('ChallanDetails/challanReport3?deliverychallanid=' +
        this.challanDetails.deliverychallanid + '&partsid=' + this.challanDetails.details[0].partsid +
        '&challandate=' + this.challanDetails.challandate.substring(0, 10) + '&workorderid=' +
        this.challanDetails.workorderid).subscribe((resp: any) => {
      this.showpagedata2 = resp[0];
      console.log(this.showpagedata2);
    });
  }
  ngOnInit() {
    this.get(this.id);
    this.getBreakDOwnDetails(this.id);
  }

}
