import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../../api.service';

@Component({
  selector: 'app-show-master-challan',
  templateUrl: './show-master-challan.component.html',
  styleUrls: ['./show-master-challan.component.css']
})
export class ShowMasterChallanComponent implements OnInit {
   report: any;
  @Input() id: number;
   reports: any;
   orderTotal = 0;
   prevChallanTotal = 0;
   record: any;
  constructor(public api: ApiService) { }

  ngOnInit() {
    this.getShowPageData(this.id);
  }
  getShowPageData(id) {
    this.api.getdata('master-challans/masterChallanReport?masterchallanid=' + id + '&empid=109').subscribe((resp: any) => {
      this.report = resp[0];
      this.reports = resp;
      console.log(this.report);
      this.reports.forEach((elements: any) => {
        this.orderTotal += elements.Qty;
        this.prevChallanTotal += elements.Amount;
      });
      this.api.getdata('details-master-challans?filter[where][masterchallanid]=' + id).subscribe((res: any) => {
        this.record = res;
        console.log(this.record.length);
      });
    });
  }

}
