import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ReportProcessor } from '../reportProcessor';

@Component({
  selector: 'app-show-byways-pi',
  templateUrl: './show-byways-pi.component.html',
  styleUrls: ['./show-byways-pi.component.css']
})
export class ShowBywaysPiComponent implements OnInit {
  public mylogo: any = 'assets/byways_logo.png';
  public mysign: any = 'assets/sign.jpg';
  terms: any[];
  data: any;
  workorders: any[];
  totalQt: number;
  totalAmount: string;
  amountInWords: string;
  @Input() id: string;
  lastline: string;
  discount: number;
  discountAmount: string;
  finalAmount: string;

  constructor(private api: ApiService) {   }

  ngOnInit() {
    this.api.getdata('Buyerwisepidetails/maheenReport?piNo=' + this.id).subscribe((res: any) => {
      this.terms = res.terms;
      this.data = res.terms[0];
      this.workorders = res.workorders;
      const reportProcessor = new ReportProcessor(this.workorders);
      this.totalQt = reportProcessor.totalQt;
      this.totalAmount = reportProcessor.totalAmount.toFixed(2);
      this.discount = reportProcessor.discount;
      this.discountAmount = reportProcessor.discountAmount.toFixed(2);
      this.finalAmount = reportProcessor.finalAmount.toFixed(2);
      this.amountInWords = reportProcessor.getAmountInWords();
    });
    this.lastline = 'Printed on ' + new Date().toString() + ' by ' + sessionStorage.getItem('username');
  }

}
