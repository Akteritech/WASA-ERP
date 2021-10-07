import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-officer-payslip',
  templateUrl: './officer-payslip.component.html',
  styleUrls: ['./officer-payslip.component.css']
})
export class OfficerPayslipComponent implements OnInit {
  link: string;
  data: any[];

  constructor(private route: ActivatedRoute, private api: ApiService) {
    route.queryParamMap.subscribe((param: Params) => this.link = param.params.link);
  }

  ngOnInit() {
    this.api.getdata(this.link).subscribe((res: any[]) => this.data = res.map((e: any) => {
      e.totalDeduction = e.TaxAmount + e.CDAmountDeposit + e.AdvanceAmount + e.AbsentAmount + e.adjustmentAmount; 
      e.totalGrossEarning = e.PresentSalary + e['Allow-Incr-Arear'] + e.PerformanceBonus + e.FestivalBonus + e.OTAmount;
      e.NetSalary = e.totalGrossEarning - e.totalDeduction;
       
      return e;
    }));
  }
}
