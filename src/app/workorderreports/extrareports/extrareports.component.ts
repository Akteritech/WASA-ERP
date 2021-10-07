import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-extrareports',
  templateUrl: './extrareports.component.html',
  styleUrls: ['./extrareports.component.css']
})
export class ExtrareportsComponent implements OnInit {
  companies: any;
  companyname: any;
  searchFrom: Date;
  searchTo: Date;
  paymentStatus: any;
  lcStatus: any;
  daySales: any;
  monthSales: any;

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.searchFrom = new Date;
    this.searchTo = new Date;
    this.getCompanies();
  }

  getCompanies() {
    this.api.getdata('comp').subscribe(res => {
      this.companies = res;
    }, error1 => {
      console.log('error1 ', error1);
    });
  }

  reset() {
    this.companyname = null;
    this.searchFrom = null;
    this.searchTo = null;
  }

  getPaymentStatus() {
    if (!this.searchFrom) {
      this.api.showWarningToast("Please select From Date");
      return;
    }
    if (!this.searchTo) {
      this.api.showWarningToast("Please select To Date");
      return;
    }
    if (!this.companyname) {
      this.companyname = 0;
    }
    this.api.getdata(`WorkOrderMasters/getPaymentStatus?company=` + this.companyname + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo)).subscribe((res: any) => {
      this.paymentStatus = res;
      console.log(this.paymentStatus);
    });
  }

  pdfPaymentStatus() {
    const fromDate = this.api.formatDate(this.searchFrom);
    const toDate = this.api.formatDate(this.searchTo);
    const data = [['ClientName', 'WorkOrderNo', 'OrderReceiveDate', 'OrderValue', 'NormalPINO', 'PI Date', 'MasterPINO', 'Master Date', 'LC', 'Cash', 'Cheque', 'TT', 'PIValue', 'TotalPartial', 'PartialRemaining']];
    this.paymentStatus.forEach((element) => data.push([element['ClientName'], element['WorkOrderNo'], element['OrderReceiveDate'], element['OrderValue'], element['NormalPINO'], element['PI Date'], element['MasterPINO'], element['Master Date'], element['LC'], element['Cash'], element['Cheque'], element['TT'], element['PIValue'], element['TotalPartial'], element['PartialRemaining']]));
    this.api.pdfReport(data, 'Payment Status Report', 'portrait', 'From: ' + fromDate + ' to: ' + toDate);
  }

  excelPaymentStatus() {
    if (!this.searchFrom) {
      this.api.showWarningToast("Please select From Date");
      return;
    }
    if (!this.searchTo) {
      this.api.showWarningToast("Please select To Date");
      return;
    }
    if (!this.companyname) {
      this.companyname = 0;
    }
    this.api.getdata(`WorkOrderMasters/getPaymentStatus?company=` + this.companyname + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo)).subscribe((res: any) => {
      this.paymentStatus = res;

      // const data = [['ClientName', 'WorkOrderNo', 'OrderReceiveDate', 'OrderValue', 'NormalPINO', 'PI Date', 'MasterPINO', 'Master Date', 'LC', 'Cash', 'Cheque', 'TT', 'PIValue', 'TotalPartial', 'PartialRemaining']];
      // this.paymentStatus.forEach((element) => data.push([element['ClientName'], element['WorkOrderNo'], element['OrderReceiveDate'], 
      //element['OrderValue'], element['NormalPINO'], element['PI Date'], element['MasterPINO'], element['Master Date'], element['LC'], 
      //element['Cash'], element['Cheque'], element['TT'], element['PIValue'], element['TotalPartial'], element['PartialRemaining']]));
      // this.api.exportCsv(data, 'Payment Status Report', data);

      const data = res.map((element: any) => {
        return {
          'ClientName': element['ClientName'], 'WorkOrderNo': element['WorkOrderNo'], 
          'OrderReceiveDate': this.api.formatDate(element['OrderReceiveDate']),
          'OrderValue': element['OrderValue'], 'NormalPINO': element['NormalPINO'],
          'PI Date': element['PI Date'], 'MasterPINO': element['MasterPINO'],
          'Master Date': element['Master Date'],
          'LC': element['LC'], 'Cash': element['Cash'], 'Cheque': element['Cheque'], 'TT': element['TT'],
          'PIValue': element['PIValue'], 'TotalPartial': element['TotalPartial'], 'PartialRemaining': element['PartialRemaining']
        };
      });
      const lengths = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
      this.api.exportExcel(data, [['Payment Status Report'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Payment Status Report', lengths);

    });
  }

  excelLcStatus() {
    this.api.getdata(`WorkOrderMasters/lcStatus`).subscribe((res: any) => {
      this.lcStatus = res;

      // const data = [['PiType', 'LCNo', 'LCDate', 'AmndNo', 'AmndDate', 'LCAmount', 'MasterPINo', 'MasterPIDate', 'MasterPIValue', 'PINo', 'PIDate', 'PIValue', 'WorkOrderNo', 'OrderReceiveDate', 'OrderValue']];
      // this.lcStatus.forEach((element) => data.push([element['PiType'], element['LCNo'], element['LCDate'], element['AmndNo'], element['AmndDate'], 
      //element['LCAmount'], element['MasterPINo'], element['MasterPIDate'], element['MasterPIValue'], element['PINo'], element['PIDate'], 
      //element['PIValue'], element['WorkOrderNo'], element['OrderReceiveDate'], element['OrderValue']]));
      // this.api.exportCsv(data, 'LC Status Report', data);

      const data = res.map((element: any) => {
        return {
          'PiType': element['PiType'], 'LCNo': element['LCNo'], 
          'LCDate': this.api.formatDate(element['LCDate']),
          'AmndNo': element['AmndNo'], 'AmndDate': this.api.formatDate(element['AmndDate']),
          'LCAmount': element['LCAmount'], 'MasterPINO': element['MasterPINO'],
          'MasterPIDate': this.api.formatDate(element['MasterPIDate']),
          'MasterPIValue': element['MasterPIValue'], 'PINo': element['PINo'], 'PIDate': this.api.formatDate(element['PIDate']), 'TT': element['TT'],
          'PIValue': element['PIValue'], 'WorkOrderNo': element['WorkOrderNo'], 'OrderReceiveDate': this.api.formatDate(element['OrderReceiveDate']), 'OrderValue': element['OrderValue']
        };
      });
      const lengths = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
      this.api.exportExcel(data, [['LC Status Report'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'LC Status Report', lengths);

    });
  }

  excelMonthWiseSales() {
    this.api.getdata(`WorkOrderMasters/monthWiseSales`).subscribe((res: any) => {
      this.monthSales = res;

      // const data = [['MonthName', 'Qty']];
      // this.monthSales.forEach((element) => data.push([element['MonthName'], element['Qty']]));
      // this.api.exportCsv(data, 'Month wise Sales Report', data);

      const data = res.map((element: any) => {
        return {
          'MonthName': element['MonthName'], 'Qty': element['Qty']
        };
      });
      const lengths = [20, 20];
      this.api.exportExcel(data, [['Month wise Sales Report'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Month wise Sales Report', lengths);

    });
  }

  excelDayWiseSales() {
    this.api.getdata(`WorkOrderMasters/dayWiseSales?fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo)).subscribe((res: any) => {
      this.daySales = res;

      // const data = [['OrderValue', 'ChallanValue', 'LCAmount', 'TTAmount', 'AdjAmount']];
      // this.daySales.forEach((element) => data.push([element['OrderValue'], element['ChallanValue'], element['LCAmount'], element['TTAmount'], 
      //element['AdjAmount']]));
      // this.api.exportCsv(data, 'Day wise Payment Status', data);

      const data = res.map((element: any) => {
        return {
          'OrderValue': element['OrderValue'], 'ChallanValue': element['ChallanValue'], 
          'LCAmount': element['LCAmount'],
          'TTAmount': element['TTAmount'], 'AdjAmount': element['AdjAmount']
        };
      });
      const lengths = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
      this.api.exportExcel(data, [['Day wise Payment Status'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Day wise Payment Status', lengths);

    });
  }
  

}
