import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'app-draft-letter',
  templateUrl: './draft-letter.component.html',
  styleUrls: ['./draft-letter.component.css']
})
export class DraftLetterComponent implements OnInit {
  date: any;
  company: string;
  bankDatas: any;
  dateString: string;
  newDate: string;

  department: any;
  card: string;
  bankDatas1: any[];
  AdviseType: any;
  bankDatasRocket: any[];
  totalBankAmount: any;
  TotalAmount: any;

  constructor(public api: ApiService, route: ActivatedRoute, private _location: Location) { 
    route.queryParamMap.subscribe((param: Params) => {
      this.date = param.params.Date;
      const currentDate = new Date(this.date);
      this.dateString = currentDate.toLocaleString('default', {month: 'long'}) + ' - ' + currentDate.getFullYear();
      this.company = param.params.UnitID;
      this.AdviseType = param.params.AdviseType;
		});
  }

  ngOnInit() {
    if(this.AdviseType==1){
    this.newDate = new Date().toISOString().substr(0,10);
    let link = `psn-employees/getBankAdviseWithDraft?UnitID=` + encodeURIComponent(this.company) + `&Date=` + this.api.formatDate(this.date)+ `&AdviseType=1` ;
		
		this.api.getdata(link).subscribe((res: any) => {
      this.bankDatas = res;
      //console.log(this.bankDatas);
    });

    let link1 = `employee-payrolls/bankData?date=` + this.api.formatDate(this.date);

    if (this.company) link1 += `&company=` + encodeURIComponent(this.company);
    if (this.department) link1 += `&department=` + encodeURIComponent(this.department);
    if (this.card) link1 += `&card=` + this.card;
    this.api.getdata(link1).subscribe((res: any[]) => {
      this.bankDatas1 = res;
      this.totalBankAmount = res[0].totalBankAmount;
    });
    //console.log(this.bankDatas1);

  }
  else if(this.AdviseType==2){
    this.newDate = new Date().toISOString().substr(0,10);
    let link = `psn-employees/getBankAdviseWithDraft?UnitID=` + encodeURIComponent(this.company) + `&Date=` + this.api.formatDate(this.date)+ `&AdviseType=2` ;
		
		this.api.getdata(link).subscribe((res: any) => {
      this.bankDatas = res;
    });

    let link1 = `employee-payrolls/rocketList?date=` + this.api.formatDate(this.date);

    if (this.company) link1 += `&company=` + encodeURIComponent(this.company);
    if (this.department) link1 += `&department=` + encodeURIComponent(this.department);
    if (this.card) link1 += `&card=` + this.card;
    this.api.getdata(link1).subscribe((res: any[]) => {
      this.bankDatasRocket = res;
      this.TotalAmount = res[0].TotalAmount
      console.log(this.TotalAmount);
    });
    //console.log(this.bankDatasRocket);
  }



    // let link1 = `employee-payrolls/bankData?date=` + this.api.formatDate(this.date);

    // if (this.company) link1 += `&company=` + encodeURIComponent(this.company);
    // if (this.department) link1 += `&department=` + encodeURIComponent(this.department);
    // if (this.card) link1 += `&card=` + this.card;
    // this.api.getdata(link1).subscribe((res: any[]) => {
    //   this.bankDatas1 = res;
    // });
    // console.log(this.bankDatas1);
  }

  backClicked() {
    this._location.back();
  }

}
