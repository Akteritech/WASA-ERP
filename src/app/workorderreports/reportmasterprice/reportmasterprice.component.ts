import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-reportmasterprice',
  templateUrl: './reportmasterprice.component.html',
  styleUrls: ['./reportmasterprice.component.css']
})
export class ReportmasterpriceComponent implements OnInit {
  npdBrands: any;
  customers: any;
  brandname: any;
  customer: any;
  samples: any;
  searchFrom: Date;
  searchTo: Date;
  companyname: any;
  samplename: any;
  userid: any;
  masterpriceData: any;
  empid: any;
  masterPriceDetails: any;
  pdfMasterpriceData: any;
  StockRateDate: Date;

  constructor(public api: ApiService) { }

  ngOnInit() {
    const fromDate = this.api.formatDate(this.searchFrom);
    const toDate = this.api.formatDate(this.searchTo);
    //this.userid = sessionStorage.getItem('userid');
    this.empid = sessionStorage.getItem('empid');
    this.getNPDBrand();
    this.getCustomers();
    this.getSample();
  }

  getNPDBrand() {
    this.api.getdata('Brands/getBrands').subscribe(res => {
      this.npdBrands = res;
    }, error1 => {
      console.log('error1 ', error1);
    });
  }

  getCustomers(search: string = null) {
    let link = `Customers?filter[limit]=50`;
    if (search) {
      link += `&clientname=` + search;
      this.customers = [];
    }
    this.api.getdata(link).subscribe((res: any) => {
      this.customers = res;
      console.log(this.customers);
    }, err => {
      console.log(err);
    });
  }

  getSample(search: string = null) {
    let link = `SampleGeneralSpecs?filter[limit]=50&filter[where][status][neq]=255`;
    if (search) {
      link += `&samplename=` + search;
      this.samples = [];
    }
    this.api.getdata(link).subscribe((res: any) => {
      this.samples = res;
      console.log(this.samples);
    });
  }

  getMasterPrice() {
    if (!this.brandname) {
      this.brandname = 0;
    }
    if (!this.customer) {
      this.customer = 0;
    }
    if (!this.samplename) {
      this.samplename = 0;
    }
    if (!this.searchFrom) {
      this.api.showWarningToast("Please select From Date");
      return;
    }
    if (!this.searchTo) {
      this.api.showWarningToast("Please select To Date");
      return;
    }
    this.api.getdata(`ItemPriceBuyerWises/getMasterPrice?buyer=` + this.brandname + `&client=` + this.customer + `&sample=` + this.samplename + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo) + `&employee=` + this.empid).subscribe((res: any) => {
      this.masterpriceData = res;
      this.StockRateDate = res[0].StockRateDate;
      console.log(this.masterpriceData);
      console.log(this.StockRateDate);
    });
  }

  excelMasterPrice() {
    if (!this.brandname) {
      this.brandname = 0;
    }
    if (!this.customer) {
      this.customer = 0;
    }
    if (!this.samplename) {
      this.samplename = 0;
    }
    if (!this.searchFrom) {
      this.api.showWarningToast("Please select From Date");
      return;
    }
    if (!this.searchTo) {
      this.api.showWarningToast("Please select To Date");
      return;
    }
    this.api.getdata(`ItemPriceBuyerWises/getMasterPrice?buyer=` + this.brandname + `&client=` + this.customer + `&sample=` + this.samplename + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo) + `&employee=` + this.empid)
    .subscribe((res: any) => {
      this.masterPriceDetails = res;
      this.StockRateDate = res[0].StockRateDate;

      // const data = [['Party Name', 'Length(mm)', 'Width(mm)', 'Finish Type', 'Price in(USD/K)', 'Finish Type',
      // 'Rebate in %', 'Rebate in %', 'Rebate in(USD/K)', 'B Com.in %', 'B Com.in(USD/K)', 'M Com. in (USD/K)', 
      //'M Com. in (USD/K)', 'Ex. Rebate in (USD/K)', 'Entry Date', 'User', 'Remarks']];
      // this.masterPriceDetails.forEach((element) => data.push([element['ClientName'], element['SampleLength'],
      // element['Width'], element['FinishType'], element['Price'], element['Brand'], element['RebatePercent'], 
      //element['Rebate'], element['CommissionPercent'], element['Commission'], element['MerchandiserCommPercent'],
      // element['MerchandiserCommission'], element['ExtraRebatePercent'], element['ExtraRebate'], 
      //this.api.formatDate(element['StockRateDate']), element['EntryBy'], '']));
      // this.api.exportCsv(data, 'Label Pricing Chart (Label-Wise)', data);

      const data = res.map((element: any) => {
        return {
          'Party Name': element['ClientName'], 'Length(mm)': element['SampleLength'], 'Width(mm)': element['Width'],
          'Finish Type': element['FinishType'], 'Price in(USD/K)': element['Price'], 'Brand': element.Brand, 
          'Rebate in %': element['RebatePercent'],
          'Rebate in%': element.Rebate, 'Rebate in(USD/K)': element.CommissionPercent, 'B Com.in %': element['Commission'],
          'M Com. in (USD/K)': element['MerchandiserCommPercent'], 'M Com. in(USD/K)': element['MerchandiserCommission'], 'Ex. Rebate in (USD/K)': element.ExtraRebatePercent,
          'Ex. Rebate in(USD/K)': element['ExtraRebate'], 'Entry Date': this.api.formatDate(element.StockRateDate), 'User': element.EntryBy, 'Remarks': element['']
        };
      });
      const lengths = [22, 10, 10, 15, 11, 30, 10, 15, 15, 8, 13, 10, 10, 10,18, 18, 10];
      this.api.exportExcel(data, [['Label Pricing Chart (Label-Wise)'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Master Price', lengths);

    });
  }

  reset() {
    this.brandname = null;
    this.customer = null;
    this.samplename = null;
    this.searchFrom = null;
    this.searchTo = null;
  }

  pdfMasterPrice() {
    if (!this.brandname) {
      this.brandname = 0;
    }
    if (!this.customer) {
      this.customer = 0;
    }
    if (!this.samplename) {
      this.samplename = 0;
    }
    if (!this.searchFrom) {
      this.api.showWarningToast("Please select From Date");
      return;
    }
    if (!this.searchTo) {
      this.api.showWarningToast("Please select To Date");
      return;
    }
    const fromDate = this.api.formatDate(this.searchFrom);
    const toDate = this.api.formatDate(this.searchTo);
    this.api.getdata(`ItemPriceBuyerWises/getMasterPrice?buyer=` + this.brandname + `&client=` + this.customer + `&sample=` + this.samplename + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo) + `&employee=` + this.empid).subscribe((res: any) => {
      this.pdfMasterpriceData = res;
      const data = [['Party Name', 'Length(mm)', 'Width(mm)', 'Finish Type', 'Price in(USD/K)', 'Finish Type', 'Rebate in %', 'Rebate in %', 'Rebate in(USD/K)', 'B Com.in %', 'B Com.in(USD/K)', 'M Com. in (USD/K)', 'M Com. in (USD/K)', 'Ex. Rebate in (USD/K)', 'Entry Date', 'User', 'Remarks']];
      this.pdfMasterpriceData.forEach((element) => data.push([element['ClientName'], element['SampleLength'], element['Width'], element['FinishType'], element['Price'], element['Brand'], element['RebatePercent'], element['Rebate'], element['CommissionPercent'], element['Commission'], element['MerchandiserCommPercent'], element['MerchandiserCommission'], element['ExtraRebatePercent'], element['ExtraRebate'], this.api.formatDate(element['StockRateDate']), element['EntryBy'], '']));
      this.api.pdfReport(data, 'Label Pricing Chart (Label-Wise)', 'portrait', 'From: ' + fromDate + ' to: ' + toDate);
    });
  }

}
