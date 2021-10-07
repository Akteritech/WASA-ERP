import {AfterViewInit, Component, OnInit} from '@angular/core';
import { ApiService } from 'src/app/api.service';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-masterpricereport',
  templateUrl: './masterpricereport.component.html',
  styleUrls: ['./masterpricereport.component.css']
})
export class MasterpricereportComponent implements OnInit, AfterViewInit {
  npdBrands: any;
  customers: any;
  brandname: any;
  customer: any;
  samples: any;
  searchFrom: Date;
  searchTo: Date;
  companyname: any;
  samplename: any;
  userid: string;
  masterpriceData: any;
   latestprice: any;
   latestprice1: any;

  constructor(public api: ApiService) { }

  ngOnInit() {
    const fromDate = this.api.formatDate(this.searchFrom);
    const toDate = this.api.formatDate(this.searchTo);
    this.userid = sessionStorage.getItem('userid');
    this.optionsLookupBrands('');
    this.optionsLookupSamples('');
    this.optionsLookupCustomers('');
  }

  // getNPDBrand() {
  //   this.api.getdata('Brands/getBrands').subscribe(res => {
  //     this.npdBrands = res;
  //   }, error1 => {
  //     console.log('error1 ', error1);
  //   });
  // }
  optionsLookupSamples(query) {
    const filter: any = {};
    filter['where'] = {};
    filter['order'] = 'sampleid DESC';
    filter['limit'] = 20;
    filter['where']['samplename'] = {};
    filter['where']['samplename']['like'] = '%25' + query + '%25';
    this.api.getdata('SampleGeneralSpecs?filter=' + JSON.stringify(filter)).subscribe( (res: any) => {
      this.samples = res;
      console.log(res[0]);
    }, error1 => {
      console.log('error1 ', error1);
    });
  }
  optionsLookupCustomers(query) {
    this.api.getdata(`customers?filter={"limit":10,"where":{"clientname":{"like":"%25${query}%25"}}}`).subscribe( (res: any) => {
      this.customers = res;
    }, error1 => {
      console.log('error1 ', error1);
    });
  }
  optionsLookupBrands(query) {
    this.api.getdata(`Brands?filter={"limit":10,"where":{"brandname":{"like":"%25${query}%25"}}}`).subscribe( (res: any) => {
      this.npdBrands = res;
    }, error1 => {
      console.log('error1 ', error1);
    });
  }
  // getCustomers(search: string = null) {
  //   let link = `Customers?filter[limit]=50`;
  //   if (search) {
  //     link += `&clientname=` + search;
  //     this.customers = [];
  //   }
  //   this.api.getdata(link).subscribe((res: any) => {
  //     this.customers = res;
  //     console.log(this.customers);
  //   }, err => {
  //     console.log(err);
  //   });
  // }
  //
  // getSample(search: string = null) {
  //   let link = `SampleGeneralSpecs?filter[limit]=50&filter[where][status][neq]=255`;
  //   if (search) {
  //     link += `&samplename=` + search;
  //     this.samples = [];
  //   }
  //   this.api.getdata(link).subscribe((res: any) => {
  //     this.samples = res;
  //     console.log(this.samples);
  //   });
  // }

  getMasterPrice(){
    // if(!this.brandname){
    //   this.api.showWarningToast("Please select brand name");
    //   return;
    // }
    // if(!this.customer){
    //   this.api.showWarningToast("Please select customer name");
    //   return;
    // }
    // if(!this.searchFrom){
    //   this.api.showWarningToast("Please select From Date");
    //   return;
    // }
    // if(!this.searchTo){
    //   this.api.showWarningToast("Please select To Date");
    //   return;
    // }
    let link = `ItemPriceBuyerWises/getMasterPrice?`;
    if (this.brandname) link += '&buyer='+this.brandname;
    if (this.customer) link += '&client='+this.customer;
    if (this.samplename) link += '&sample='+this.samplename;
    if (this.searchFrom) link += '&fromDate='+this.api.formatDate(this.searchFrom);
    if (this.searchTo) link += '&toDate='+this.api.formatDate(this.searchTo);
    this.api.getdata(link).subscribe((res: any) => {
      this.masterpriceData = res;
      console.log(this.masterpriceData);
    });
  }

  reset(){
    this.brandname = null;
    this.customer = null;
    this.samplename = null;
    this.searchFrom = null;
    this.searchTo = null;
  }


  pdfReport() {
   this.api.pdf('pdfdata', 'Label Pricing Chart (Label-Wise)')
    const element = document.getElementById('pdfdata');
    let margin = 15;
    let format = 'a5';
    let orientation = 'landscape';
    const opt = {
      margin: margin,
      filename: this.toExportFileName('Label Pricing Chart (Label-Wise)', 'pdf'),
      image: { type: 'jpeg', quality: 0.95 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: format, orientation: orientation }
    };
    html2pdf().from(element).set(opt).save();
   // setTimeout(() => {
   //   const fromDate = this.api.formatDate(this.searchFrom);
   //   const toDate = this.api.formatDate(this.searchTo);
   //   const data =[['Party Name', 'Length(mm)', 'Width(mm)', 'Finish Type', 'Price in(USD/K)', 'Buyer', 'Rebate in %', 'Rebate in(USD/K)', 'B Com.in % ', 'B Com.in(USD/K)', 'M.Com . in %', 'M Com. in (USD/K)', 'Ex. Rebate in %', 'Ex. Rebate in (USD/K)', 'Entry Date', 'User']];
   //   this.masterpriceData.forEach((element) => data.push([element.ClientName, element.SampleLength, element.Width, element.FinishType, element.Price, element.Brand, element.RebatePercent, element.CommissionPercent, element.Commission, element.MerchandiserCommPercent, element.MerchandiserCommission, element.ExtraRebatePercent, element.ExtraRebate, element.StockRateDate, element.EntryBy]));
   //   this.api.pdfReport(data, 'Label Pricing Chart (Label-Wise)', 'portrait', 'From: '+fromDate+' to: '+toDate);
   // },2000);
  }
  toExportFileName(fileName: string, type: string): string {
    return `${fileName}_${new Date().toLocaleDateString()}.${type}`;
  }
 async generateExcelOfSearchedData() {
   let link = `ItemPriceBuyerWises/getMasterPrice?`;
   if (this.brandname) link += '&buyer='+this.brandname;
   if (this.customer) link += '&client='+this.customer;
   if (this.samplename) link += '&sample='+this.samplename;
   if (this.searchFrom) link += '&fromDate='+this.api.formatDate(this.searchFrom);
   if (this.searchTo) link += '&toDate='+this.api.formatDate(this.searchTo);
   await this.api.getdata(link).subscribe((res: any) => {
     this.masterpriceData = res;
     console.log(this.masterpriceData);
   });
    setTimeout(() => {
      const data = this.masterpriceData.map((element: any) => {
        return {
          'Party Name': element['ClientName'], 'Length(mm)': element['SampleLength'], 'Width(mm)': element['Width'],
          'Finish Type': element['FinishType'],
          'Price in(USD/K)': element['Price'], 'Buyer': element['Brand'],
          'Rebate in %': element['RebatePercent'],
          'Rebate in(USD/K)': element['Rebate'], 'B Com.in %': element['CommissionPercent'], 'B Com.in(USD/K)': element['Commission'],
          'M.Com . in %': element['MerchandiserCommPercent'], 'M Com. in (USD/K)': element['MerchandiserCommission'], 'Ex. Rebate in %': element['ExtraRebatePercent'],
          'Ex. Rebate in (USD/K)': element['ExtraRebate'], 'Entry Date' : element['StockRateDate'], 'User': element['EntryBy'],
          'Remarks': element['SubmissionComment']
        };
      });
      const lengths = [22, 10, 30, 30, 11, 15, 25, 20, 20, 8, 13, 10, 10, 10, 18];
      this.api.exportExcel(data, [[' Label Pricing Chart (Label-Wise)'], []], 'PricingReport',  lengths);
    },3000);

  }
  ngAfterViewInit() {

  }

  getTop2LatestPrice() {
    let link = `ItemPriceBuyerWises/LatestPrice?`;
    if (this.samplename) link += '&sampleid='+this.samplename;
    if (this.searchFrom) link += '&fromdate='+this.api.formatDate(this.searchFrom);
    if (this.searchTo) link += '&todate='+this.api.formatDate(this.searchTo);
    this.api.getdata(link).subscribe((Response:any) => {
      this.latestprice = Response;
      console.log(this.latestprice);
      setTimeout(() => {
        const data = this.latestprice.map((element: any) => {
          return {
            'Sample Name': element['SampleName'], 'Price': element['Price']
          };
        });
        const lengths = [22, 10, 30, 30, 11, 15, 25, 20, 20, 8, 13, 10, 10, 10, 18];
        this.api.exportExcel(data, [[' Latest Pricing Chart (Label-Wise)'], []], 'PricingReport',  lengths);
      },2000);


    });
  }
  getTop1LatestPrice() {
    let link = `ItemPriceBuyerWises/LatestPrice1?`;
    if (this.samplename) link += '&sampleid='+this.samplename;
    if (this.searchFrom) link += '&fromdate='+this.api.formatDate(this.searchFrom);
    if (this.searchTo) link += '&todate='+this.api.formatDate(this.searchTo);
    this.api.getdata(link).subscribe((Response:any) => {
      this.latestprice1 = Response;
      console.log(this.latestprice1);
      setTimeout(() => {
        const data = this.latestprice1.map((element: any) => {
          return {
            'Sample Name': element['SampleName'], 'Price': element['Price']
          };
        });
        const lengths = [22, 10, 30, 30, 11, 15, 25, 20, 20, 8, 13, 10, 10, 10, 18];
        this.api.exportExcel(data, [[' Latest Pricing Chart (Label-Wise)'], []], 'PricingReport',  lengths);
      },2000);
    });
  }
  getHistoryLog() {

  }
}
