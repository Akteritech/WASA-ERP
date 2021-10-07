import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { element } from 'protractor';

@Component({
  selector: 'app-monthwisesalereport',
  templateUrl: './monthwisesalereport.component.html',
  styleUrls: ['./monthwisesalereport.component.css']
})
export class MonthwisesalereportComponent implements OnInit {
  companies: any;
  productcategories: any;
  productcategory: number;

  companyname: any;

  searchFromCompany: Date;
  searchToCompany: Date;
  salesbyCompany: any;
  npdBrands: any;
  searchFromBuyer: Date;
  searchToBuyer: Date;
  brandname: any;
  searchFromClient: Date;
  searchToClient: Date;
  customers: any;
  customer: any;
  salesbyClient: any;
  searchFromExecutive: Date;
  searchToExecutive: Date;
  salesbyExecutive: any;
  executives: any;
  executive: any;
  searchFromCategory: Date;
  searchToCategory: Date;
  salesbyCategory: any;

  //reportData: any[];
  allColumns: any[];
  columns: any[];
  totals = {};

  constructor(public api: ApiService) {

  }

  ngOnInit() {
    this.getCompanies();
    this.getproductcategories();
    this.getNPDBrand();
    this.getCustomers();
    this.getExecutive();
  }

  getCompanies() {
    this.api.getdata('comp').subscribe(res => {
      this.companies = res;
    }, error1 => {
      console.log('error1 ', error1);
    });
  }

  getNPDBrand() {
    this.api.getdata('Brands/getBrands').subscribe(res => {
      this.npdBrands = res;
    }, error1 => {
      console.log('error1 ', error1);
    });
  }

  getproductcategories() {
    this.api.getdata('productcategories').subscribe((res: any) => {
      this.productcategories = res;
    }, err => {
      console.log(err);
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

  getExecutive() {
    this.api.getdata(`WorkOrderMasters/salesExecutive`).subscribe((res: any) => {
      this.executives = res;
      console.log(this.executives);
    }, err => {
      console.log(err);
    });
  }

  getSalesReportByCompany() {
    if (!this.searchFromCompany) {
      this.api.showWarningToast("Please select From Date");
      return;
    }
    if (!this.searchToCompany) {
      this.api.showWarningToast("Please select To Date");
      return;
    }
    this.api.getdata(`WorkOrderMasters/getSalesReportByCompany?company=` + this.companyname + `&fromDate=` + this.api.formatDate(this.searchFromCompany) + `&toDate=` + this.api.formatDate(this.searchToCompany)).subscribe((res: any) => {
      this.salesbyCompany = res[0];
      // this.allColumns.push(res[0][0]);
      // this.columns.push(res[0][1]);
      //this.setData(res)
      console.log(this.allColumns);
      console.log(this.columns);
    });
  }

  excelSalesReportByCompany() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.searchFromCompany) {
      this.api.showWarningToast("Please select From Date");
      return;
    }
    if (!this.searchToCompany) {
      this.api.showWarningToast("Please select To Date");
      return;
    }

    this.api.getdata(`WorkOrderMasters/getSalesReportByCompany?company=` + this.companyname + `&fromDate=` + this.api.formatDate(this.searchFromCompany) + `&toDate=` + this.api.formatDate(this.searchToCompany))
      .subscribe((res: any[]) => {
        this.salesbyCompany = res[0];
        //key
        const keyList = Object.keys(this.salesbyCompany);
        const data = keyList;
        //console.log(data);
        
          let exelList = {};
          keyList.forEach(column => {
            //value
            exelList = this.salesbyCompany[column];
            console.log(data.push(column['exelList']))
          })
        
        //this.api.exportCsv(data, 'Sales by Company', data);

        //this.api.exportCsv(keyList, 'Sales By Company',  [this.salesbyCompany]);

      });
  }



  // createExcel() {
  //   const columns = [{header: 'Item', key: 'Item', width: 25}];
  //   const keyList = Object.keys(this.reportData[1]);
  //   keyList.slice(1, keyList.length).forEach((key: string) => columns.push({header: key, key: key, width: 10}));
  //   this.api.exportToExcel(columns, this.reportData, 'Item-Report');
  // }



  getSalesReportByBuyer() {
    if (!this.searchFromBuyer) {
      this.api.showWarningToast("Please select From Date");
      return;
    }
    if (!this.searchToBuyer) {
      this.api.showWarningToast("Please select To Date");
      return;
    }
    // this.api.getdata(`WorkOrderMasters/getSalesReportByCompany?company=` + this.companyname + `&fromDate=` + this.api.formatDate(this.searchFromBuyer) + `&toDate=` + this.api.formatDate(this.searchToBuyer)).subscribe((res: any) => {
    //   this.salesbyCompany = res;
    //   console.log(this.salesbyCompany);
    // });
  }

  getSalesReportByClient() {
    if (!this.searchFromClient) {
      this.api.showWarningToast("Please select From Date");
      return;
    }
    if (!this.searchToClient) {
      this.api.showWarningToast("Please select To Date");
      return;
    }
    if (!this.companyname) {
      this.companyname = 0;
    }
    this.api.getdata(`WorkOrderMasters/getSalesReportByClient?company=` + this.companyname + `&client=` + this.customer + `&fromDate=` + this.api.formatDate(this.searchFromClient) + `&toDate=` + this.api.formatDate(this.searchToClient)).subscribe((res: any) => {
      this.salesbyClient = res;
      console.log(this.salesbyClient);
    });
  }

  getSalesReportByExecutive() {
    if (!this.searchFromExecutive) {
      this.api.showWarningToast("Please select From Date");
      return;
    }
    if (!this.searchToExecutive) {
      this.api.showWarningToast("Please select To Date");
      return;
    }
    if (!this.executive) {
      this.executive = 0;
    }
    this.api.getdata(`WorkOrderMasters/getSalesReportByExecutive?company=` + this.companyname + `&executive=` + this.executive + `&fromDate=` + this.api.formatDate(this.searchFromExecutive) + `&toDate=` + this.api.formatDate(this.searchToExecutive)).subscribe((res: any) => {
      this.salesbyExecutive = res;
      console.log(this.salesbyExecutive);
    });
  }

  getSalesReportByCategory() {
    if (!this.searchFromCategory) {
      this.api.showWarningToast("Please select From Date");
      return;
    }
    if (!this.searchToCategory) {
      this.api.showWarningToast("Please select To Date");
      return;
    }
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.productcategory) {
      this.productcategory = 0;
    }
    this.api.getdata(`WorkOrderMasters/getSalesReportByCategory?company=` + this.companyname + `&category=` + this.productcategory + `&fromDate=` + this.api.formatDate(this.searchFromCategory) + `&toDate=` + this.api.formatDate(this.searchToCategory)).subscribe((res: any) => {
      this.salesbyCategory = res;
      console.log(this.salesbyCategory);
    });
  }

  resetCompany() {
    this.companyname = null;
    this.searchFromCompany = null;
    this.searchToCompany = null;
  }

  resetBuyer() {
    this.brandname = null;
    this.searchFromBuyer = null;
    this.searchToBuyer = null;
  }

  resetClient() {
    this.customer = null;
    this.searchFromClient = null;
    this.searchToClient = null;
  }

  resetExecutive() {
    this.executive = null;
    this.searchFromExecutive = null;
    this.searchToExecutive = null;
  }

  resetCategory() {
    this.productcategory = null;
    this.searchFromCategory = null;
    this.searchToCategory = null;
  }

  // pdfReportCompany() {
  //   const fromDate = this.api.formatDate(this.searchFromCompany);
  //   const toDate = this.api.formatDate(this.searchToCompany);
  //   const data = [['Company', 'Month']];
  //   this.salesbyCompany.forEach((element) => data.push([element['CompanyName'], element['Date']]));
  //   this.api.pdfReport(data, 'Monthly Sales Report by Company', 'portrait', 'From: ' + fromDate + ' to: ' + toDate);
  // }

  pdfReportClient() {
    const fromDate = this.api.formatDate(this.searchFromClient);
    const toDate = this.api.formatDate(this.searchToClient);
    const data = [['Company', 'Client', 'Month']];
    this.salesbyClient.forEach((element) => data.push([element['CompanyName'], element['ClientName'], element['Month']]));
    this.api.pdfReport(data, 'Monthly Sales Report by Client', 'portrait', 'From: ' + fromDate + ' to: ' + toDate);
  }

  pdfReportExecutive() {
    const fromDate = this.api.formatDate(this.searchFromExecutive);
    const toDate = this.api.formatDate(this.searchToExecutive);
    const data = [['Company', 'Executive', 'Month']];
    this.salesbyExecutive.forEach((element) => data.push([element['CompanyName'], element['FirstName'], element['Month']]));
    this.api.pdfReport(data, 'Monthly Sales Report by Executive', 'portrait', 'From: ' + fromDate + ' to: ' + toDate);
  }

  pdfReportCategory() {
    const fromDate = this.api.formatDate(this.searchFromCategory);
    const toDate = this.api.formatDate(this.searchToCategory);
    const data = [['Company', 'Category', 'Month']];
    this.salesbyCategory.forEach((element) => data.push([element['CompanyName'], element['ProductCategoryName'], element['Month']]));
    this.api.pdfReport(data, 'Monthly Sales Report by Product Category', 'portrait', 'From: ' + fromDate + ' to: ' + toDate);
  }

}
