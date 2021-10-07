import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-show-letter-draft',
  templateUrl: './show-letter-draft.component.html',
  styleUrls: ['./show-letter-draft.component.css']
})
export class ShowLetterDraftComponent implements OnInit {
  company: any;
  department: any;
  card: string;
  date: string;
  bankDatas: any[];

  constructor(public api: ApiService, route: ActivatedRoute,) {
    route.queryParamMap.subscribe((param: Params) => {
			this.date = param.params.date;
			// const currentDate = new Date(this.date);
			// if (param.params.card) this.card = param.params.card;
			// if (param.params.department) this.department = param.params.department;
		});
   }

  ngOnInit() {
    let link = `employee-payrolls/bankData?date=` + this.api.formatDate(this.date);

    if (this.company) link += `&company=` + encodeURIComponent(this.company);
    if (this.department) link += `&department=` + encodeURIComponent(this.department);
    if (this.card) link += `&card=` + this.card;
    this.api.getdata(link).subscribe((res: any[]) => {
      this.bankDatas = res;
    });
    console.log(this.bankDatas);
    

  }

  // bankStatement() {
  //   const link = this.generateLink(`employee-payrolls/bankData?date=` + this.api.formatDate(this.date));

  //   this.api.getdata(link).subscribe((res: any[]) => {
  //     const data = res.map((e: any, index: number) => {
  //       return {
  //         Si: index + 1, Card: e.CardNo, Employee: e.EmployeeName, Account: e.AccountNNumber, Amount: e.BankAmount
  //       }
  //     });

  //     this.api.exportExcel(data, [['Bank Statement']], 'Bank Statement', [5, 10, 30, 20, 15]);
  //   });
  // }

  // generateLink(link: string): string {
  //   if (this.company) link += `&company=` + encodeURIComponent(this.company);
  //   if (this.department) link += `&department=` + encodeURIComponent(this.department);
  //   if (this.card) link += `&card=` + this.card;
  //   return link
  // }

}
