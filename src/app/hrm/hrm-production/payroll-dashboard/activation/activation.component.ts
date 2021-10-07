import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Location } from "@angular/common";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit {
  cardnos: any[];
  card: string;
  name: string;
  date: Date;
  checks = [false, false, false, false];
  searchDatas: any;
  Salary: any;

  constructor(public api: ApiService, private _location: Location, private route: ActivatedRoute) {
    this.date = new Date();
  }


  ngOnInit() {
    this.getCards();
  }

  getCards(search: string = null) {
    let link = 'psn-employees?filter[limit]=50&filter[where][EMP_ACTIVITY]=1&filter[where][EMP_CARD_NO][isnot]=null';
    if (search) link += '&filter[where][EMP_CARD_NO][like]=%' + search + '%';
    this.api.getdata(link).subscribe((res: any[]) => {
      this.cardnos = res;
      console.log(this.cardnos);
    });
  }

  cardSelected() {
    this.name = this.cardnos.find((element: any) => element.EMP_CARD_NO === this.card).EMP_NAME_ENG;
  }

  reset() {
    this.card = null;
    this.searchDatas = [];
  }

  backClicked() {
    this._location.back();
  }

  patch(ActvationType: string, index: number) {
    if(!this.card) {
      this.api.showWarningToast('Enter Card');
      return;
    }

    let OnOff = 1;
    let message = ActvationType + ' Turned On'
    if(this.checks[index]) {
      OnOff = 0;
      message = ActvationType + ' Turned Off';
    }

    const senddata = {ActvationType, OnOff, "CardNo": this.card, "Date": this.api.formatDate(this.date)};

    this.api.postdata('employee-payrolls/updatePayrollElementActivation', senddata).subscribe(res => {
      if(res) this.api.showSuccessToast(message);
    });

    this.search();
  }

  patchReduceSalary() {
    if(!this.card) {
      this.api.showWarningToast('Enter Card');
      return;
    }


    const senddata = {"CardNo": this.card, "Date": this.api.formatDate(this.date), "Salary": this.Salary, "User": sessionStorage.getItem('username')};

    this.api.postdata('employee-payrolls/updateReduceSalary', senddata).subscribe(res => {
      if(res) this.api.showSuccessToast("Success");
    });

    this.search();
  }

  search() {
    this.api.getdata('employee-payrolls/searchActivation?cardno=' + this.card).subscribe((res: any) => {
      this.searchDatas = res.result;
    });
  }
}
