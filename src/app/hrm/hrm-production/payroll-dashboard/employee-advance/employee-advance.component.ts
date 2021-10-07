import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { NgForm } from '@angular/forms';
import { Location } from "@angular/common";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-advance',
  templateUrl: './employee-advance.component.html',
  styleUrls: ['./employee-advance.component.css']
})
export class EmployeeAdvanceComponent implements OnInit {
  cardnos: any[];
  advance: any;
  name: any;
  monthdata: any;
  datas: any;
  response: any;
  cardNo: string;
  typeoftran:any;
  searchDatas: any;
  showDetails: string;
  showCollapse: boolean;
  ADVANCE_KEY: any;
  @Input() id: number;
  editId: any;
   r:any;
   M:any;
   d:any;
  constructor(public api: ApiService, private _location: Location, private route: ActivatedRoute) {
    this.advance = {};
    this.datas = [];
    this.showCollapse = true;
    this.route.params.subscribe(params => {
      if (params.id) {
        this.editId = params.id;
        this.getEmployeeAdvance(params.id);
        //console.log(this.editId);

      }
    })
  }

  getEmployeeAdvance(id) {
    this.api.getdata('psn-employee-adv-loan-masters/getEmployeeAdvanceEditData?advancekey=' + encodeURIComponent(id)).subscribe((res: any) => {
      if (res.length > 0) {
        this.advance = res[0];
        this.cardnos = [
         {EMP_CARD_NO:this.advance.EMP_CARD_NO}
        ];

        this.name = res[0].Name;
        this.advance.ADVANCE_START_MONTH = new Date(res[0].ADVANCE_START_DATE);
        //console.log(this.advance.ADVANCE_START_MONTH);

      } else {
        this.api.showInfoToast('No data on List');
      }
    })
  }

  ngOnInit() {
    if (!this.editId) this.getCards();
   // this.AdvanceType();
    this.api.getdata('psn-employee-adv-loan-masters/AdvanceType').subscribe((res: any[]) => this.typeoftran = res);
  }

  getCards(search: string = null) {
    let link = 'psn-employees?filter[limit]=50&filter[where][EMP_ACTIVITY]=1&filter[where][EMP_CARD_NO][isnot]=null';
    if (search) link += '&filter[where][EMP_CARD_NO][like]=%' + search + '%';
    this.api.getdata(link).subscribe((res: any[]) => this.cardnos = res);
    console.log(this.cardnos);

  }

  cardSelected() {
    if (!this.advance.EMP_CARD_NO) return;
    const employee = this.cardnos.find((element: any) => element.EMP_CARD_NO = this.advance.EMP_CARD_NO);
    this.name = employee.EMP_NAME_ENG;
    this.advance.EMP_ID = employee.EMP_ID;
  }

  getNoOfInstallment() {
    if (this.advance.ADVANCE_AMOUNT % this.advance.MONTH_ADVANCE_AMOUNT===0)
    {
      this.advance.NO_OF_INSTALLMENT = this.advance.ADVANCE_AMOUNT / this.advance.MONTH_ADVANCE_AMOUNT
    }
    else
    {
      this.advance.NO_OF_INSTALLMENT=0;
      this.api.showInfoToast('Installs of Month not allowed.');
    }
  }

  getInstallmentPayment() {

    if (this.advance.INTEREST_RATE>0)
    {
      this.r=this.advance.INTEREST_RATE/100/this.advance.NO_OF_INSTALLMENT;
      this.M=1-1/Math.pow((1+this.r),this.advance.NO_OF_INSTALLMENT);//1-1/(1+this.r).Math.sqrt(this.advance.NO_OF_INSTALLMENT);
      this.d=this.M/this.r;
      this.advance.MONTH_ADVANCE_AMOUNT =this.advance.ADVANCE_AMOUNT/this.d;// this.advance.ADVANCE_AMOUNT / this.advance.NO_OF_INSTALLMENT;
  
    }
    else
    {
      this.advance.MONTH_ADVANCE_AMOUNT = this.advance.ADVANCE_AMOUNT / this.advance.NO_OF_INSTALLMENT;
    }
   // this.advance.MONTH_ADVANCE_AMOUNT = this.advance.ADVANCE_AMOUNT / this.advance.NO_OF_INSTALLMENT;
  }

  getTotalMonth() {
    this.datas = [];
    var convertMonthNo = (this.advance.ADVANCE_START_MONTH.getMonth());

    var date = new Date(this.advance.ADVANCE_START_MONTH);
    //var monthNameList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    for (let i = 0; i < this.advance.NO_OF_INSTALLMENT; i++) {
      // this.monthdata = new Date(year, convertMonthNo, 1).toLocaleString('default', { month: 'long' }).substring(0,3) + year;

      const year = this.advance.ADVANCE_START_MONTH.getFullYear().toString().substr(-2);

      this.monthdata = new Date(year, convertMonthNo, 1).toLocaleString('default', { month: 'long' }).substring(0, 3)
        + date.getFullYear().toString().substr(-2);

      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      this.datas.push([this.monthdata, this.advance.MONTH_ADVANCE_AMOUNT, firstDay]);
      convertMonthNo += 1;
      date.setMonth(date.getMonth() + 1);
    }
    //console.log(this.datas);
    console.log(firstDay);
  }
  salaryAdvanceHisory(index: number) {
    let link = 'psn-employee-adv-loan-masters/advancehistory';
    if (this.ADVANCE_KEY) link += `?SLno=` + encodeURIComponent(this.ADVANCE_KEY);


    this.api.getdata(link).subscribe((res: any[]) => {
      const data = [['Month', 'MonthlyPayment']];

      res.forEach((e: any) => {
        data.push([
          e.MONTH_NAME, e.INSTALLMENT_AMOUNT]);
      });

      this.api.pdfReport(data, 'Advance Report', 'portrait', 'Card No - ' + this.cardNo)
    });
  }
  
  //   getMonths(){
  //     var resultList = [];
  //     var date = new Date();
  //     var monthNameList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  //     for (let i = 0; i < this.advance.NO_OF_INSTALLMENT; i++) {
  //         var stringDate = monthNameList[date.getMonth()] + " " + date.getFullYear().toString().substr(-2);

  //         var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  //         var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  //         resultList.push({
  //           str:stringDate,
  //           first:firstDay,
  //           last:lastDay,
  //         });
  //         date.setMonth(date.getMonth() + 1);
  //     }
  //     console.log(resultList);
  // };

  patch(form: NgForm) {
    const senddata = {
      "EMP_ID": this.advance.EMP_ID,
      "ADVANCE_AMOUNT": this.advance.ADVANCE_AMOUNT,
      //"ADVANCE_START_MONTH": this.advance.ADVANCE_START_MONTH[0],
      "ADVANCE_START_MONTH": this.monthdata,
      "ADVANCE_START_DATE": this.api.formatDate(this.advance.ADVANCE_START_MONTH),
      "ENTRY_DATE": this.api.formatDate(this.advance.ENTRY_DATE),
      "NO_OF_INSTALLMENT": this.advance.NO_OF_INSTALLMENT,
      "TYPE_OF_TRAN": this.advance.TYPE_OF_TRAN,
      "REMARK": this.advance.REMARK,
      "MONTH_ADVANCE_AMOUNT": this.advance.MONTH_ADVANCE_AMOUNT,
      "CREATED_BY": sessionStorage.getItem('userid'),
      "ON_OFF": 1,
      "INTEREST_RATE": this.advance.INTEREST_RATE,
    };
    console.log(senddata);

    this.api.postdata('psn-employee-adv-loan-masters/insertPSNEmployeeLoanMaster', senddata).subscribe(res => {
      this.response = res;
      this.datas.forEach((element: any) => {
        const sendloanDetails = {
          "MONTH_NAME": element[0],
          "MONTH_START_DATE": this.api.formatDate(element[2]),
          "INSTALLMENT_AMOUNT": this.advance.MONTH_ADVANCE_AMOUNT,
          "INSTALLMENT_STATUS": 1,
          "ADVANCE_ACTIVITY": 1
        };
        this.api.postdata('psn-employee-adv-loan-masters/insertPSNEmployeeLoanMasterDetails', sendloanDetails).subscribe(res => {
          this.api.showSuccessToast('Success', this.response.message);
          form.resetForm();
        });
      });

    });

  }


  reset() {
    this.advance = [];
    this.datas = [];
  }

  backClicked() {
    this._location.back();
  }

  search() {
    this.api.getdata('psn-employee-adv-loan-masters/searchSalaryAdvance?cardno=' + this.cardNo).subscribe((res: any) => {
      this.searchDatas = res.result;
      this.ADVANCE_KEY = res.result[0].ADVANCE_KEY;
      //console.log(this.ADVANCE_KEY);
    });
  }
 
  viewDetail(index: number) {
    // this.showDetails = JSON.stringify(this.searchDatas[index]);
    this.api.getdata('psn-employee-adv-loan-masters/searchSalaryAdvanceDetails?AdKeyIDNo=' + encodeURIComponent(this.ADVANCE_KEY)).subscribe((res: any) => {
      this.showDetails = res.result;
     // this.salaryAdvanceHisory();
    });
    this.showCollapse = false;
 
  }


}
