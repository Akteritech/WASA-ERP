import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-orderexport',
  templateUrl: './orderexport.component.html',
  styleUrls: ['./orderexport.component.css']
})
export class OrderexportComponent implements OnInit {
  companies: any;
  productcategories: any;
  productcategory: number;
  samples: any;
  searchFrom: Date;
  searchTo: Date;
  companyname: any;
  samplename: any;
  workorderData: any;
  userid: any;
  empid: any;
  totalChallanCategoryData: any;
  salesReportData: any;
  orderWithJobQtyData: any;
  customerListData: any;
  itemListData: any;
  ExportChallanWithJobQtyData: any;
  ExecutiveWiseSalesWithPartyData: any;
  ExportShortOrderWithJobQtyData: any;

  constructor(public api: ApiService) { }

  ngOnInit() {
    //this.userid = sessionStorage.getItem('userid');
    this.empid = sessionStorage.getItem('empid');
    this.getCompanies();
    this.getproductcategories();
  }

  getCompanies() {
    this.api.getdata('comp').subscribe(res => {
      this.companies = res;
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

  getSample(search: string = null) {
    let link = `WorkOrderMasters/samplebyCategory?category=` + this.productcategory;
    if (search) {
      link += `&SampleName=` + search;
      this.samples = [];
    }
    this.api.getdata(link).subscribe((res: any) => {
      this.samples = res;
      console.log(this.samples);
    });
  }

  getWOData() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.productcategory) {
      this.productcategory = 0;
    }
    if (!this.searchFrom) {
      this.api.showWarningToast('Please select From Date');
      return;
    }
    if (!this.searchTo) {
      this.api.showWarningToast('Please select To Date');
      return;
    }
    if (!this.samplename) {
      this.samplename = 0;
    }
    this.api.getdata(`WorkOrderMasters/getWOforExcel?company=` + this.companyname + `&category=` + this.productcategory + `&sample=` + this.samplename + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo) + `&employee=` + this.empid).subscribe((res: any) => {
      this.workorderData = res;
      console.log(this.workorderData);
    });
  }

  reset() {
    this.companyname = null;
    this.productcategory = null;
    this.samplename = null;
    this.searchFrom = null;
    this.searchTo = null;
  }

  pdfReport() {
    const fromDate = this.api.formatDate(this.searchFrom);
    const toDate = this.api.formatDate(this.searchTo);
    const data = [['Order No', 'Order Date', 'Party Name', 'PO No', 'URN No', 'MC Style', 'Buyer Name', 'CS', 'Item Name', 'Color', 'Style', 'Total Qty', 'Rate/ 1000', 'Total Amount', 'Category Name']];
    this.workorderData.forEach((element) => data.push([element['Order No'], this.api.formatDate(element['Order Date']), element['Party Name'], element['PO No'], element['URN No'], element['MC Style'], element['Buyer Name'], element['CS'], element['Item Name'], element['Style'], element['Color'], element['Total Qty'], element['Rate/1000'], element['Total Amount'], element['ProductCategoryName']]));
    this.api.pdfReportWorkOrder(data, 'Work Order Report', 'portrait', 'From: ' + fromDate + ' to: ' + toDate);
  }

  generateExcel() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.productcategory) {
      this.productcategory = 0;
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
    this.api.getdata(`WorkOrderMasters/getWOforExcel?company=` + this.companyname + `&category=` + this.productcategory + `&sample=` + this.samplename + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo) + `&employee=` + this.empid).subscribe((res: any) => {
      this.workorderData = res;
      // console.log(this.workorderData);
      // const data = [['Order No', 'Order Date', 'Party Name', 'PO No', 'URN No', 'MC Style', 'Buyer Name', 'CS', 'Item Name', 'Color', 'Style', 'Total Qty', 'Rate/ 1000', 'Total Amount', 'Category Name']];
      // this.workorderData.forEach((element) => data.push([element['Order No'], element['Order Date'], 
      //element['Party Name'], element['PO No'], element['URN No'], element['MC Style'], element['Buyer Name'],
      // element['CS'], element['Item Name'], element['Style'], element['Color'], element['Total Qty'], 
      //element['Rate/1000'], element['Total Amount'], element['ProductCategoryName']]));
      // this.api.exportCsv(data, 'Work Order Exports Report', data);

      const data = res.map((element: any) => {
        return {
          'Order No': element['Order No'], 'Order Date': element['Order Date'], 'Party Name': element['Party Name'],
          'PO No': element['PO No'], 'URN No': element['URN No'], 'MC Style': element['MC Style'], 
          'Buyer Name': element['Buyer Name'],'CS': element.CS,'Item Name': element['Item Name'], 
          'Style': element['Style'],'Color': element['Color'], 'Total Qty': element['Total Qty'], 
          'Rate/1000': element['Rate/1000'], 'Total Amount': element['Total Amount'], 
          'Product Category Name': element.ProductCategoryName
        };
      });
      const lengths = [22, 10, 30, 30, 11, 15, 25, 20, 20, 8, 13, 10, 10, 10,18];
      this.api.exportExcel(data, [['Work Order Exports Report'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Work Order', lengths);

    });
  }

  excelChallan() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.productcategory) {
      this.productcategory = 0;
    }
    if (!this.searchFrom) {
      this.api.showWarningToast("Please select From Date");
      return;
    }
    if (!this.searchTo) {
      this.api.showWarningToast("Please select To Date");
      return;
    }
    this.api.getdata(`WorkOrderMasters/getChallanforExcel?company=` + this.companyname + `&category=` + this.productcategory + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo) + `&employee=` + this.empid).subscribe((res: any) => {
      this.workorderData = res;
      // console.log(this.workorderData);
      // const data = [['Order No', 'Order Date', 'Challan No', 'Challan Date', 'Party Name', 'Brand Name', 'Sales Person', 'PO No.', 'URN No', 'msstyle', 'Item Name', 'Color', 'Description', 'Type', 'Sub Type', 'Cutting Label', 'Garment Color', 'Size', 'Style No', 'ChallanQty', 'Rate', 'Amount', 'SizeID']];
      // this.workorderData.forEach((element) => data.push([element['Order No'], 
      //this.api.formatDate(element['Order Date']), element['Challan No'], 
      //this.api.formatDate(element['Challan Date']), element['Party Name'], element['Brand Name'], element['Sales Person'], element['PO No.'], element['URN No'], element['msstyle'], element['Item Name'], element['Color'], element['Description'], element['Type'], element['Sub Type'], element['Cutting Label'], element['Garment Color'], element['Size'], element['Style No'], element['ChallanQty'], element['Rate'], element['Amount'], element['SizeID']]));
      // this.api.exportCsv(data, 'Challan Report', data);

      const data = res.map((element: any) => {
        return {
          'Order No': element['Order No'], 'Order Date': this.api.formatDate(element['Order Date']), 'Challan No': element['Challan No'],
          'Challan Date': this.api.formatDate(element['Challan Date']), 'Party Name': element['Party Name'], 'Brand Name': element['Brand Name'], 
          'Sales Person': element['Sales Person']
        };
      });
      const lengths = [22, 15, 20, 15, 25, 30, 10, 10, 15];
      this.api.exportExcel(data, [['Challan Report'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Challan', lengths);

    });
  }

  excelTotalChallan() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.productcategory) {
      this.productcategory = 0;
    }
    if (!this.searchFrom) {
      this.api.showWarningToast("Please select From Date");
      return;
    }
    if (!this.searchTo) {
      this.api.showWarningToast("Please select To Date");
      return;
    }
    this.api.getdata(`WorkOrderMasters/getTotalChallan?company=` + this.companyname + `&category=` + this.productcategory + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo) + `&employee=` + this.empid).subscribe((res: any) => {
      this.workorderData = res;
      // console.log(this.workorderData);
      // const data = [['Order No', 'Order Date', 'Challan No', 'Challan Date', 'Party Name', 'Brand Name', 'Sales Person', 'PO No.', 'URN No', 'Item Name', 'Color', 'Description', 'Type', 'Sub Type', 'Cutting Label', 'Garment Color', 'Size', 'Style No', 'ChallanQty', 'Rate', 'Amount']];
      // this.workorderData.forEach((element) => data.push([element['Order No'], 
      //this.api.formatDate(element['Order Date']), element['Challan No'], 
      //this.api.formatDate(element['Challan Date']), element['Party Name'], element['Brand Name'],
      // element['Sales Person'], element['PO No.'], element['URN No'], element['Item Name'], element['Color'], 
      //element['Description'], element['Type'], element['Sub Type'], element['Cutting Label'], 
      //element['Garment Color'], element['Size'], element['Style No'], element['ChallanQty'], element['Rate'], 
      //element['Amount']]));
      // this.api.exportCsv(data, 'Total Challan Report', data);

      const data = res.map((element: any) => {
        return {
          'Order No': element['Order No'], 'Order Date': this.api.formatDate(element['Order Date']), 'Challan No': element['Challan No'],
          'Challan Date': this.api.formatDate(element['Challan Date']), 'Party Name': element['Party Name'], 'Brand Name': element['Brand Name'], 
          'Sales Person': element['Sales Person'], 'PO No.':element['PO No.'], 'URN No':element['URN No'], 
          'Item Name':element['Item Name'], 'Color':element['Color'], 'Description':element['Description'],
           'Type':element['Type'], 'Sub Type':element['Sub Type'], 'Cutting Label':element['Cutting Label'], 
           'Garment Color':element['Garment Color'], 'Size':element['Size'], 'Style No':element['Style No'], 
           'ChallanQty':element['ChallanQty'], 'Rate':element['Rate'], 'Amount':element['Amount']
        };
      });
      const lengths = [22, 15, 20, 15, 25, 30, 10, 10, 15, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12];
      this.api.exportExcel(data, [['Total Challan Report'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Total Challan', lengths);

    });
  }

  excelAllCategoryChallan() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.productcategory) {
      this.productcategory = 0;
    }
    if (!this.searchFrom) {
      this.api.showWarningToast("Please select From Date");
      return;
    }
    if (!this.searchTo) {
      this.api.showWarningToast("Please select To Date");
      return;
    }
    this.api.getdata(`WorkOrderMasters/getTotalChallanCategory?company=` + this.companyname + `&category=` + this.productcategory + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo)).subscribe((res: any) => {
      this.totalChallanCategoryData = res;
     // console.log(this.workorderData);
      // const data = [['Challan Date', 'Woven', 'PFL', 'HT', 'Thermal', 'Offset', 'ScreenPrint', 'Ribbon', 'BUTTONLABEL']];
      // this.totalChallanCategoryData.forEach((element) => data.push([this.api.formatDate(element['ChallanDate']), element['Woven'], element['PFL'], element['HT'], 
      //element['Thermal'], element['Offset'], element['ScreenPrint'], element['Ribbon'], element['BUTTONLABEL']]));
      // this.api.exportCsv(data, 'Total Challan Category', data);

      const data = res.map((element: any) => {
        return {
          'Challan Date': element['ChallanDate'], 'Woven': element['Woven'], 'PFL': element['PFL'],
          'HT': element['HT'], 'Thermal': element['Thermal'], 'Offset': element['Offset'], 
          'ScreenPrint': element['ScreenPrint'], 'Ribbon':element['Ribbon'], 'BUTTONLABEL':element['BUTTONLABEL']
        };
      });
      const lengths = [18, 15, 15, 15, 15, 15, 15, 15, 15];
      this.api.exportExcel(data, [['Total Challan Category Report'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Total Challan Category', lengths);

    });
  }

  excelAllCatagoryChallanMonthlySummary() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.productcategory) {
      this.productcategory = 0;
    }
    if (!this.searchFrom) {
      this.api.showWarningToast("Please select From Date");
      return;
    }
    if (!this.searchTo) {
      this.api.showWarningToast("Please select To Date");
      return;
    }
    this.api.getdata(`WorkOrderMasters/getAllCatagoryChallanMonthlySummary?company=` + this.companyname + `&category=` + this.productcategory + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo)).subscribe((res: any) => {
      this.totalChallanCategoryData = res;
     // console.log(this.workorderData);
      // const data = [['ProductCategoryName', 'jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']];
      // this.totalChallanCategoryData.forEach((element) => data.push([element['ProductCategoryName'], element['jan'], element['Feb'], element['Mar'], element['Apr'], 
      //element['May'], element['Jun'], element['Jul'], element['Aug'], element['Sep'], element['Oct'], element['Nov'], element['Dec']]));
      // this.api.exportCsv(data, 'Catagory Total Challan Report', data);

      const data = res.map((element: any) => {
        return {
          'ProductCategoryName': element['ProductCategoryName'], 'jan': element['jan'], 'Feb': element['Feb'],
          'Mar': element['Mar'], 'Apr': element['Apr'], 'May': element['May'], 
          'Jun': element['Jun'], 'Jul':element['Jul'], 'Aug':element['Aug'], 'Sep':element['Sep'], 'Oct':element['Oct'], 'Nov':element['Nov'], 'Dec':element['Dec']
        };
      });
      const lengths = [22, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15];
      this.api.exportExcel(data, [['Total Category Challan Monthly Summery Report'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Total Category Challan Monthly Summery', lengths);

    });
  }

  excelEntryStatus() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.productcategory) {
      this.productcategory = 0;
    }
    if (!this.searchFrom) {
      this.api.showWarningToast("Please select From Date");
      return;
    }
    if (!this.searchTo) {
      this.api.showWarningToast("Please select To Date");
      return;
    }
    this.api.getdata(`WorkOrderMasters/getEntryStatus?fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo)).subscribe((res: any) => {
      this.totalChallanCategoryData = res;
     // console.log(this.workorderData);

      // const data = [['Dept', 'UserName', 'Complain Entry', 'Delivery Challan Entry', 'Floor Requition Entry', 'Indent Entry', 'Issue Note Entry', 'Item Master Entry', 'Item Price Entry', 'Job Card Entry', 'Material Entry', 'Material Requisition Entry', 'PI Entry', 'Plan Entry', 'Production Update Entry', 'Received Note Entry', 'Requirement Entry', 'Requirement Entry', 'Requisition Entry', 'Returned Note Entry', 'Sample Entry', 'Transfer Entry', 'Work Order', 'Work Order Entry']];
      // this.totalChallanCategoryData.forEach((element) => data.push([element['Dept'], element['UserName'], element['Complain Entry'], element['Delivery Challan Entry'], 
      //element['Floor Requition Entry'], element['Indent Entry'], element['Issue Note Entry'], element['Item Master Entry'], element['Item Price Entry'], 
      //element['Job Card Entry'], element['Material Entry'], element['Material Requisition Entry'], element['PI Entry'], element['Plan Entry'], 
      //element['Production Update Entry'], element['Received Note Entry'], element['Requirement Entry'], element['Requisition Entry'], element['Returned Note Entry'], 
      //element['Sample Entry'], element['Transfer Entry'], element['Work Order'], element['Work Order Entry']]));
      // this.api.exportCsv(data, 'Entry Status Report', data);

      const data = res.map((element: any) => {
        return {
          'Dept': element['Dept'], 'UserName': element['UserName'], 'Complain Entry': element['Complain Entry'],
          'Delivery Challan Entry': element['Delivery Challan Entry'], 'Floor Requition Entry': element['Floor Requition Entry'], 'Indent Entry': element['Indent Entry'], 
          'Issue Note Entry': element['Issue Note Entry'], 'Item Master Entry':element['Item Master Entry'], 'Item Price Entry':element['Item Price Entry'], 
          'Job Card Entry':element['Job Card Entry'], 'Material Entry':element['Material Entry'], 'Material Requisition Entry':element['Material Requisition Entry'],
          'PI Entry':element['PI Entry'], 'Plan Entry':element['Plan Entry'], 'Production Update Entry':element['Production Update Entry'], 'Received Note Entry':element['Received Note Entry'], 
          'Requirement Entry':element['Requirement Entry'], 'Requisition Entry':element['Requisition Entry'], 'Returned Note Entry':element['Returned Note Entry'],
          'Sample Entry':element['Sample Entry'], 'Transfer Entry':element['Transfer Entry'], 'PWork OrderI':element['Work Order'], 'Work Order Entry':element['Work Order Entry']
        };
      });
      const lengths = [18, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15];
      this.api.exportExcel(data, [['Entry Status Report'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Entry Status', lengths);

    });
  }

  pdfSalesReport() {
    if (!this.companyname) {
      this.api.showWarningToast("Please select Company Name");
      return;
    }
    if (!this.productcategory) {
      this.productcategory = 0;
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
    this.api.getdata(`WorkOrderMasters/getSalesReport?company=` + this.companyname + `&category=` + this.productcategory + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo) + `&empid=` + this.empid).subscribe((res: any) => {
      this.salesReportData = res;
      const data = [['Party Name', 'Order No' , 'Order Date', 'Challan No', 'Challan Date', 'Brand Name', 'Item Name', 'Color', 'Cutting Label', 'Size', 'ChallanQty', 'Rate', 'Amount']];
      this.salesReportData.forEach((element) => data.push([element['Party Name'], element['Order No'], element['Order Date'], element['Challan No'], element['Challan Date'], element['Brand Name'], element['Item Name'], element['Color'], element['Cutting Label'], element['Size'], element['ChallanQty'], element['Rate'], element['Amount']]));
      this.api.pdfReport(data, 'Sales Report', 'portrait', 'From: ' + fromDate + ' to: ' + toDate);
    });
  }

  excelOrderWithJobQty() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.productcategory) {
      this.productcategory = 0;
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
    this.api.getdata(`WorkOrderMasters/getOrderWithJobQty?company=` + this.companyname + `&category=` + this.productcategory + `&sample=` + this.samplename + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo) + `&employee=` + this.empid).subscribe((res: any) => {
      this.orderWithJobQtyData = res;
      //console.log(this.orderWithJobQtyData);
      // const data = [['Order No', 'Order Date', 'Product Category Name', 'Party Name', 'PO No', 'URN No', 'MC Style', 'Buyer Name', 'Department', 'Item Name', 'Color', 'Size', 'Style', 'Order Qty', 'ProductionQty', 'ChallanQty', 'Cost' , 'Rate/1000', 'Maheen Rate', 'Total Amount']];
      // this.orderWithJobQtyData.forEach((element) => data.push([element['Order No'], element['Order Date'], element['Product Category Name'], element['Party Name'], 
      //element['PO No'], element['URN No'], element['MC Style'], element['Buyer Name'], element['Department'], element['Item Name'], element['Color'], element['Size'], 
      //element['Style'], element['Order Qty'], element['ProductionQty'], element['ChallanQty'], element[''], element['Rate/1000'], element[''], element['Total Amount'],]));
      // this.api.exportCsv(data, 'Work Order Exports Report with Job Qty', data);

      const data = res.map((element: any) => {
        return {
          'Order No': element['Order No'], 'Order Date': element['Order Date'], 'Product Category Name': element['Product Category Name'],
          'Party Name': element['Party Name'], 'PO No': element['PO No'], 'URN No': element['URN No'], 
          'MC Style': element['MC Style'], 'Buyer Name':element['Buyer Name'], 'Department':element['Department'], 
          'Item Name':element['Item Name'], 'Color':element['Color'], 'Size':element['Size'],
          'Style':element['Style'], 'Order Qty':element['Order Qty'], 'ProductionQty':element['ProductionQty'], 'ChallanQty':element['ChallanQty'], 
          'Cost':element[''], 'Rate/1000':element['Rate/1000'], 'Maheen Rate':element[''],
          'Total Amount':element['Total Amount']
        };
      });
      const lengths = [18, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15];
      this.api.exportExcel(data, [['Work Order Exports Report with Job Qty'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Work Order Exports Report with Job Qty', lengths);

    });
  }

  excelCustomerList() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    this.api.getdata(`WorkOrderMasters/getCustomerListExcel?company=` + this.companyname).subscribe((res: any) => {
      this.customerListData = res;
      // const data = [['Client Name', 'Current Address', 'Contact Person', 'Telephone']];
      // this.customerListData.forEach((element) => data.push([element['ClientName'], element['CurrentAddress'], element['ContactPerson'], element['Telephone']]));
      // this.api.exportCsv(data, 'Customer List for Excel', data);

      const data = res.map((element: any) => {
        return {
          'ClientName': element['ClientName'], 'CurrentAddress': element['CurrentAddress'], 'ContactPerson': element['ContactPerson'],
          'Telephone': element['Telephone']
        };
      });
      const lengths = [30, 40, 25, 25];
      this.api.exportExcel(data, [['Customer List'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Customer List', lengths);

    });
  }

  excelBuyerList() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    this.api.getdata(`WorkOrderMasters/getBuyerListExcel?company=` + this.companyname).subscribe((res: any) => {
      this.itemListData = res;
      // const data = [['Company Name', 'Brand Name']];
      // this.itemListData.forEach((element) => data.push([element['CompanyName'], element['BrandName']]));
      // this.api.exportCsv(data, 'Buyer List for Excel', data);

      const data = res.map((element: any) => {
        return {
          'Company Name': element['CompanyName'], 'Brand Name': element['BrandName']
        };
      });
      const lengths = [30, 30];
      this.api.exportExcel(data, [['Buyer List'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Buyer List', lengths);

    });
  }

  excelItemList() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    this.api.getdata(`WorkOrderMasters/getItemListExcel?company=` + this.companyname).subscribe((res: any) => {
      this.customerListData = res;
      // const data = [['Company Name', 'SampleName']];
      // this.customerListData.forEach((element) => data.push([element['CompanyName'], element['SampleName']]));
      // this.api.exportCsv(data, 'Item List', data);

      const data = res.map((element: any) => {
        return {
          'Company Name': element['CompanyName'], 'Sample Name': element['SampleName']
        };
      });
      const lengths = [30, 30];
      this.api.exportExcel(data, [['Sample List'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Sample List', lengths);

    });
  }

  excelSalesPersonWiseCustomer() {
    this.api.getdata(`WorkOrderMasters/getSalesPersonWiseCustomerExcel`).subscribe((res: any) => {
      this.customerListData = res;
      // const data = [['First Name', 'Client Name', 'Month Name']];
      // this.customerListData.forEach((element) => data.push([element['FirstName'], element['ClientName'], element['MonthName']]));
      // this.api.exportCsv(data, 'Sales Person Wise Customer', data);

      const data = res.map((element: any) => {
        return {
          'First Name': element['FirstName'], 'Client Name': element['ClientName'], 'Month Name': element['MonthName']
        };
      });
      const lengths = [22, 30, 25];
      this.api.exportExcel(data, [['Sales Person Wise Customer'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Sales Person Wise Customer', lengths);

    });
  }

  excelBuyerWiseCustomer() {
    this.api.getdata(`WorkOrderMasters/getBuyerWiseCustomerExcel`).subscribe((res: any) => {
      this.customerListData = res;
      // const data = [['BrandName', 'Client Name', 'Current Address', 'ContactPerson', 'Telephone']];
      // this.customerListData.forEach((element) => data.push([element['BrandName'], element['ClientName'], element['CurrentAddress'], 
      //element['ContactPerson'], element['Telephone']]));
      // this.api.exportCsv(data, 'Buyer Wise Customer', data);

      const data = res.map((element: any) => {
        return {
          'Brand Name': element['BrandName'], 'Client Name': element['ClientName'], 'CurrentAddress': element['CurrentAddress'], 
          'ContactPerson': element['ContactPerson'], 'Telephone': element['Telephone']
        };
      });
      const lengths = [22, 30, 25, 25, 25];
      this.api.exportExcel(data, [['Buyer Wise Customer'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Buyer Wise Customer', lengths);

    });
  }

  excelWorkOrderDetails() {
    this.api.getdata(`WorkOrderMasters/getWorkOrderDetailsExcel`).subscribe((res: any) => {
      this.customerListData = res;

      // const data = [['Company', 'Work Order No', 'Order Date', 'Customer' , 'Buyer', 'Delivery Party', 'PO No', 'Delivery Date', 'Sales Person', 'CS', 'Fabric Composition', 'Narration', 'URN/ECOM/DEPT No', 'MC PO', 'MC Style', 'SampleName', 'Length', 'Width', 'OrderQty', 'Price', 'OrderValue', 'Color', 'Size', 'Style', 'Breakdown Qty']];
      // this.customerListData.forEach((element) => data.push([element['Company'], element['Work Order No'], element['Order Date'], element['Customer'],
      // element['Buyer'], element['Delivery Party'], element['PO No'], element['Delivery Date'], element['Sales Person'], element['CS'], element['Fabric Composition'], 
      //element['Narration'], element['URN/ECOM/DEPT No'], element['MC PO'], element['MC Style'], element['SampleName'], element['Length'], element['Width'], 
      //element['OrderQty'], element['Price'], element['OrderValue'], element['Color'], element['Size'], element['Style'], element['Breakdown Qty']]));
      // this.api.exportCsv(data, 'Work Order Details', data);

      const data = res.map((element: any) => {
        return {
          'Company': element['Company'], 'Work Order No': element['Work Order No'], 'Order Date': element['Order Date'], 'Customer': element['Customer'], 
          'Buyer': element['Buyer'], 'Delivery Party': element['Delivery Party'], 'PO No': element['PO No'], 'Delivery Date': element['Delivery Date'], 'Sales Person': element['Sales Person'], 
          'CS': element['CS'], 'Fabric Composition': element['Fabric Composition'], 'Narration': element['Narration'], 'URN/ECOM/DEPT No': element['URN/ECOM/DEPT No'], 
          'MC PO': element['MC PO'], 'MC Style': element['MC Style'], 
          'SampleName': element['SampleName'], 'Length': element['Length'], 'Width': element['Width'], 'OrderQty': element['OrderQty'], 'Price': element['Price'], 
          'OrderValue': element['OrderValue'], 
          'Color': element['Color'], 'Size': element['Size'], 'Style': element['Style'], 'Breakdown Qty': element['Breakdown Qty']
        };
      });
      const lengths = [22, 30, 25, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
      this.api.exportExcel(data, [['Work Order Details'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Work Order Details', lengths);

    });
  }

  excelExportChallanWithJobQty() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.productcategory) {
      this.productcategory = 0;
    }
    if (!this.searchFrom) {
      this.api.showWarningToast('Please select From Date');
      return;
    }
    if (!this.searchTo) {
      this.api.showWarningToast('Please select To Date');
      return;
    }
    this.api.getdata(`WorkOrderMasters/getExportChallanWithJobQty?company=` + this.companyname + `&category=` + this.productcategory + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo) + `&empid=` + this.empid).subscribe((res: any) => {
      this.ExportChallanWithJobQtyData = res;
      // const data = [['Order No', 'Order Date', 'Party Name', 'CompanyName', 'Brand Name', 'Sales Person', 'PO No.', 'URN No', 'msstyle', 'Item Name', 'Length', 'Width', 'Part', 'Color', 'Description', 'Type', 'Sub Type', 'Cutting Label', 'Garment Color', 'Size', 'Style No', 'OrderQty', 'JobQty', 'ChallanQty', 'ItemCode', 'AdjRate', 'ItemType' ]];
      // this.ExportChallanWithJobQtyData.forEach((element) => data.push([element['Order No'], this.api.formatDate(element['Order Date']), element['Party Name'], 
      //element['CompanyName'], element['Brand Name'], element['Sales Person'], element['PO No.'], element['URN No'], element['msstyle'], element['Item Name'], element['Length'], 
      //element['Width'], element['Part'], element['Color'], element['Description'], element['Type'], element['Sub Type'], element['Cutting Label'], element['Garment Color'], 
      //element['Size'], element['Style No'], element['OrderQty'], element['JobQty'], element['ChallanQty'], element['ItemCode'], element['AdjRate'], element['ItemType']]));
      // this.api.exportCsv(data, 'Export Challan With Job Qty', data);

      const data = res.map((element: any) => {
        return {
          'Order No': element['Order No'], 'Order Date': this.api.formatDate(element['Order Date']), 'Party Name': element['Party Name'], 'CompanyName': element['CompanyName'], 
          'Brand Name': element['Brand Name'], 'Sales Person': element['Sales Person'], 'PO No.': element['PO No.'], 'URN No': element['URN No'], 'msstyle': element['msstyle'], 
          'Item Name': element['Item Name'], 'Length': element['Length'], 'Width': element['Width'], 'Part': element['Part'], 
          'Color': element['Color'], 'Description': element['Description'], 
          'Type': element['Type'], 'Sub Type': element['Sub Type'], 'Cutting Label': element['Cutting Label'], 'Garment Color': element['Garment Color'], 'Size': element['Size'], 
          'Style No': element['Style No'], 
          'OrderQty': element['OrderQty'], 'JobQty': element['JobQty'], 'ChallanQty': element['ChallanQty'], 'ItemCode': element['ItemCode'], 'AdjRate': element['AdjRate'], 'ItemType': element['ItemType']
        };
      });
      const lengths = [22, 30, 25, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
      this.api.exportExcel(data, [['Export Challan With Job Qty'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Export Challan With Job Qty', lengths);

    });
  }

  excelExecutiveWiseSalesWithParty() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.productcategory) {
      this.productcategory = 0;
    }
    if (!this.searchFrom) {
      this.api.showWarningToast('Please select From Date');
      return;
    }
    if (!this.searchTo) {
      this.api.showWarningToast('Please select To Date');
      return;
    }
    this.api.getdata(`WorkOrderMasters/getExecutiveWiseSalesWithParty?company=` + this.companyname + `&category=` + this.productcategory + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo) + `&empid=` + this.empid).subscribe((res: any) => {
      this.ExecutiveWiseSalesWithPartyData = res;
      // const data = [['SalesPerson', 'Customer', 'Amount']];
      // this.ExecutiveWiseSalesWithPartyData.forEach((element) => data.push([element['SalesPerson'], element['Customer'], element['Amount']]));
      // this.api.exportCsv(data, 'Executive Wise Sales With Party', data);
      const data = res.map((element: any) => {
        return {
          'Sales Person': element['SalesPerson'], 'Customer': element['Customer'], 'Amount': element['Amount']
        };
      });
      const lengths = [22, 30, 25];
      this.api.exportExcel(data, [['Executive Wise Sales With Party'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Executive Wise Sales With Party', lengths);

    });
  }

  excelExportShortOrderWithJobQty() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.productcategory) {
      this.productcategory = 0;
    }
    if (!this.searchFrom) {
      this.api.showWarningToast('Please select From Date');
      return;
    }
    if (!this.searchTo) {
      this.api.showWarningToast('Please select To Date');
      return;
    }
    this.api.getdata(`WorkOrderMasters/getExportShortOrderWithJobQty?company=` + this.companyname + `&category=` + this.productcategory + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo) + `&empid=` + this.empid).subscribe((res: any) => {
      this.ExportShortOrderWithJobQtyData = res;

      // const data = [['WorkOrderNo', 'OrderReceiveDate', 'ClientName', 'BrandName', 'FirstName', 'CustomerPONo', 'URN No', 'Msstyle', 'ProductCategoryName', 'SampleName', 'Length', 'Width', 'ListItem', 'MainOrderqty', 'CountSize', 'ChallanQty', 'ProductionQTY', 'MaterialName', 'JobReqMaterial', 'AdjRate', 'Roll', 'MaterialAmount', 'TotalShortOrder', 'Shortorderqty', 'SortProductionQTY', 'SortJobReqMaterial', 'TotalOrderQty', 'TotalProductionQty', 'TotalJobReqMaterial', 'Sales amount', 'PnL']];
      // this.ExportShortOrderWithJobQtyData.forEach((element) => data.push([element['WorkOrderNo'], element['OrderReceiveDate'], element['ClientName'], element['BrandName'], element['FirstName'], 
      //element['CustomerPONo'], element['URN No'], element['Msstyle'], element['ProductCategoryName'], element['SampleName'], element['Length'], element['Width'], element['ListItem'], 
      //element['MainOrderqty'], element['CountSize'], element['ChallanQty'], element['ProductionQTY'], element['MaterialName'], element['JobReqMaterial'], element['AdjRate'], element['Roll'], 
      //element['MaterialAmount'], element['TotalShortOrder'], element['Shortorderqty'], element['SortProductionQTY'], element['SortJobReqMaterial'], element['TotalOrderQty'],
      // element['TotalProductionQty'], element['TotalJobReqMaterial'], element['Sales amount'], element['PnL']]));
      // this.api.exportCsv(data, 'Export Short Order With Job Qty', data);
      const data = res.map((element: any) => {
        return {
          'Work Order No': element['WorkOrderNo'], 'Order Receive Date': element['OrderReceiveDate'], 'Client Name': element['ClientName'], 'Brand Name': element['BrandName'], 
          'First Name': element['FirstName'], 'Customer PO No': element['CustomerPONo'], 'URN No': element['URN No'], 'Msstyle': element['Msstyle'], 'Product Category Name': element['ProductCategoryName'], 
          'SampleName': element['SampleName'], 'Length': element['Length'], 'Width': element['Width'], 'ListItem': element['ListItem'], 
          'MainOrderqty': element['MainOrderqty'], 'CountSize': element['CountSize'], 
          'ChallanQty': element['ChallanQty'], 'ProductionQTY': element['ProductionQTY'], 'MaterialName': element['MaterialName'], 'JobReqMaterial': element['JobReqMaterial'], 'AdjRate': element['AdjRate'], 
          'Roll': element['Roll'], 
          'MaterialAmount': element['MaterialAmount'], 'TotalShortOrder': element['TotalShortOrder'], 'Shortorderqty': element['Shortorderqty'], 'SortProductionQTY': element['SortProductionQTY'], 
          'SortJobReqMaterial': element['SortJobReqMaterial'], 'TotalOrderQty': element['TotalOrderQty'], 'TotalProductionQty': element['TotalProductionQty'], 'TotalJobReqMaterial': element['TotalJobReqMaterial']
          , 'Sales amount': element['Sales amount'], 'PnL': element['PnL']
        };
      });
      const lengths = [22, 30, 25, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
      this.api.exportExcel(data, [['Export Short Order With Job Qty'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Export Short Order With Job Qty', lengths);

    });
  }

}
