import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-reportpanel',
  templateUrl: './reportpanel.component.html',
  styleUrls: ['./reportpanel.component.css']
})
export class ReportpanelComponent implements OnInit {
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
  departments: any;
  customers: any;
  executives: any;
  npdBrands: any;
  supliers: any;
  items: any;
  RoleID: any;
  reports: any;
  hmOrderPositionData: any;
  calltype: any;
  brandname: any;
  ItemCode: any;
  RebateCommissionData: any[];

  constructor(public api: ApiService) { }

  ngOnInit() {
    //this.userid = sessionStorage.getItem('userid');
    this.empid = sessionStorage.getItem('empid');
    this.RoleID = sessionStorage.getItem('rollid');
    this.getCompanies();
    this.getDepartment();
    this.getproductcategories();
    this.getCustomers();
    this.getNPDBrand();
    this.getExecutive();
    this.getSuppliers();
    this.getItems('a');
    this.getReports();
    console.log(this.RoleID);
  }

  getCompanies() {
    this.api.getdata('comp').subscribe(res => {
      this.companies = res;
    }, error1 => {
      console.log('error1 ', error1);
    });
  }

  getDepartment() {
    this.api.getdata('dept/').subscribe(res => {
      this.departments = res;
    }, err => {
      console.log(err);
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

  // getExecutive() {
  //   this.api.getdata(`WorkOrderMasters/salesExecutive`).subscribe((res: any) => {
  //     this.executives = res;
  //     console.log(this.executives);
  //   }, err => {
  //     console.log(err);
  //   });
  // }

  getExecutive(search: string = null) {
    let link = 'WorkOrderMasters/salesExecutive?pageNumber=1&pageSize=50';
    if (search) link += '&SalesPeron=' + search;
    this.api.getdata(link).subscribe((res: any) => {
      this.executives = res.result;
    });

    // this.api.getdata(`WorkOrderMasters/salesExecutive`).subscribe((res: any) => {
    //   this.executives = res;
    //   console.log(this.executives);
    // });
  }

  getItems(search: string = null) {
    let link = 'ItemMasters/itemTable?pageNumber=1&pageSize=60';
    if (search) link += '&itemName=' + search;
    this.api.getdata(link).subscribe((res: any) => {
      this.items = res.result;
      console.log(this.items);
    });
  }

  getNPDBrand() {
    this.api.getdata('Brands/getBrands').subscribe(res => {
      this.npdBrands = res;
    }, error1 => {
      console.log('error1 ', error1);
    });
  }

  getReports() {
    this.api.getdata(`WorkOrderMasters/reportManagement?role=` + this.RoleID).subscribe((res: any) => {
      this.reports = res;
      console.log(this.reports);
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
    this.workorderData.forEach((element) => data.push([element['Order No'], element['Order Date'], element['Party Name'], element['PO No'], element['URN No'], element['MC Style'], element['Buyer Name'], element['CS'], element['Item Name'], element['Style'], element['Color'], element['Total Qty'], element['Rate/1000'], element['Total Amount'], element['ProductCategoryName']]));
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

      // const data = [['Order No', 'Order Date', 'Party Name', 'PO No', 'URN No', 'MC Style', 'Buyer Name', 'CS', 'Item Name', 'Color', 'Style', 'Total Qty', 'Rate/ 1000', 'Total Amount', 'Category Name']];
      // this.workorderData.forEach((element) => data.push([element['Order No'], element['Order Date'], element['Party Name'], element['PO No'], element['URN No'], 
      //element['MC Style'], element['Buyer Name'], element['CS'], element['Item Name'], element['Style'], element['Color'], element['Total Qty'], element['Rate/1000'], 
      //element['Total Amount'], element['ProductCategoryName']]));
      // this.api.exportCsv(data, 'Work Order Exports Report', data);

      const data = res.map((element: any) => {
        return {
          'Order No': element['Order No'], 'Order Date': element['Order Date'],
          'Party Name': element['Party Name'],
          'PO No': element['PO No'], 'URN No': element['URN No'],
          'MC Style': element['MC Style'], 'Buyer Name': element['Buyer Name'],
          'CS': element['CS'],
          'Style': element['Style'], 'Color': element['Color'], 'Total Qty': element['Total Qty'], 'Rate/1000': element['Rate/1000'],
          'Total Amount': element['Total Amount'], 'ProductCategoryName': element['ProductCategoryName']
        };
      });
      const lengths = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
      this.api.exportExcel(data, [['Work Order Exports Report'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Work Order Exports Report', lengths);

    });
  }

  getSuppliers(search: string = null) {
    let link = 'Suppliers?filter[limit]=100';
    if (search) link += '&filter[where][suppliername][like]=%' + search + '%';
    this.api.getdata(link).subscribe((res: any[]) => {
      this.supliers = res;
    });
  }

  pdfHMOrderPosition() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.calltype) {
      this.calltype = 0;
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
    this.api.getdata(`WorkOrderMasters/getHMOrderPosition?company=` + this.companyname + `&calltype=` + this.calltype + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo) + `&employee=` + this.empid).subscribe((res: any) => {
      this.hmOrderPositionData = res;
      console.log(this.hmOrderPositionData);
      const data = [['Label Suppliers Name (Select From Drop Down List)', 'Garments Suppliers Name(Select From Drop Down List', 'Report Month(Select From Drop Down List', 'Brand (Select From Drop Down List)', 'H&M product Code Number', 'Label Color way', 'Item Price per 1000pcs', 'Product attributes (Select From Drop Down List)', 'Product type (Select From Drop Down List)', 'Graphic item order placement date', 'Graphic Item delivery date', 'Del Lead time', 'H&M Order number', 'Order Quantity', 'Booking Quantity', 'Delivery Quantity', 'umber of parts i.e-Single =1, double = 2, half = 0.5', 'Total Quantity (column OxP)', 'H&M Dept Number', 'remarks']];
      this.hmOrderPositionData.forEach((element) => data.push([element['Label Suppliers Name (Select From Drop Down List)'], element['Garments Suppliers Name(Select From Drop Down List)'], element['Report Month(Select From Drop Down List)'], element['Brand (Select From Drop Down List)'], element['H&M product Code Number'], element['Label Color way'], element['Item Price per 1000pcs'], element['Product attributes (Select From Drop Down List)'], element['Product type (Select From Drop Down List)'], element['Graphic item order placement date'], element['Graphic Item delivery date'], element['Del Lead time'], element['H&M Order number'], element['Order Quantity'], element['Booking Quantity'], element['Delivery Quantity'], element['Number of parts i.e-Single =1, double = 2, half = 0.5'], element['Total Quantity (column OxP)'], element['H&M Dept Number'], element['remarks']]));
      this.api.pdfReportWorkOrder(data, 'H&M Order Position', 'portrait', 'From: ' + fromDate + ' to: ' + toDate);
    });
  }

  excelHMOrderPosition() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.calltype) {
      this.calltype = 0;
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
    this.api.getdata(`WorkOrderMasters/getHMOrderPosition?company=` + this.companyname + `&calltype=` + this.calltype + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo) + `&employee=` + this.empid).subscribe((res: any) => {
      this.hmOrderPositionData = res;

      // const data = [['Label Suppliers Name (Select From Drop Down List)', 'Garments Suppliers Name(Select From Drop Down List', 'Report Month(Select From Drop Down List', 'Brand (Select From Drop Down List)', 'H&M product Code Number', 'Label Color way', 'Item Price per 1000pcs', 'Product attributes (Select From Drop Down List)', 'Product type (Select From Drop Down List)', 'Graphic item order placement date', 'Graphic Item delivery date', 'Del Lead time', 'H&M Order number', 'Order Quantity', 'Booking Quantity', 'Delivery Quantity', 'umber of parts i.e-Single =1, double = 2, half = 0.5', 'Total Quantity (column OxP)', 'H&M Dept Number', 'remarks']];
      // this.hmOrderPositionData.forEach((element) => data.push([element['Label Suppliers Name (Select From Drop Down List)'], 
      //element['Garments Suppliers Name(Select From Drop Down List)'], element['Report Month(Select From Drop Down List)'], element['Brand (Select From Drop Down List)'], 
      //element['H&M product Code Number'], element['Label Color way'], element['Item Price per 1000pcs'], element['Product attributes (Select From Drop Down List)'], 
      //element['Product type (Select From Drop Down List)'], element['Graphic item order placement date'], element['Graphic Item delivery date'], element['Del Lead time'], 
      //element['H&M Order number'], element['Order Quantity'], element['Booking Quantity'], element['Delivery Quantity'], 
      //element['Number of parts i.e-Single =1, double = 2, half = 0.5'], element['Total Quantity (column OxP)'], element['H&M Dept Number'], element['remarks']]));
      // this.api.exportCsv(data, 'H&M Order Position', data);

      const data = res.map((element: any) => {
        return {
          'Label Suppliers Name (Select From Drop Down List)': element['Label Suppliers Name (Select From Drop Down List)'], 'Garments Suppliers Name(Select From Drop Down List)': element['Garments Suppliers Name(Select From Drop Down List)'],
          'Report Month(Select From Drop Down List)': element['Report Month(Select From Drop Down List)'],
          'Brand (Select From Drop Down List)': element['Brand (Select From Drop Down List)'], 'H&M product Code Number': element['H&M product Code Number'],
          'Label Color way': element['Label Color way'], 'Item Price per 1000pcs': element['Item Price per 1000pcs'],
          'Product attributes (Select From Drop Down List)': element['Product attributes (Select From Drop Down List)'],
          'Product type (Select From Drop Down List)': element['Product type (Select From Drop Down List)'], 'Graphic item order placement date': element['Graphic item order placement date'],
          'Graphic Item delivery date': element['Graphic Item delivery date'], 'Del Lead time': element['Del Lead time'],
          'H&M Order number': element['H&M Order number'], 'Order Quantity': element['Order Quantity'], 'Booking Quantity': element['Booking Quantity'],
          'Delivery Quantity': element['Delivery Quantity'],
          'Number of parts i.e-Single =1, double = 2, half = 0.5': element['Number of parts i.e-Single =1, double = 2, half = 0.5'],
          'Total Quantity (column OxP)': element['Total Quantity (column OxP)'], 'H&M Dept Number': element['H&M Dept Number'], 'remarks': element['remarks']
        };
      });
      const lengths = [30, 30, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
      this.api.exportExcel(data, [['H&M Order Position'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'H&M Order Position', lengths);

    });
  }

  pdfRebateCommission() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.brandname) {
      this.brandname = 0;
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
    this.api.getdata(`WorkOrderMasters/getSalesCommissionReport?company=` + this.companyname + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo) + `&brand=` + this.brandname + `&category=` + this.productcategory + `&employee=` + this.empid).subscribe((res: any) => {
      this.hmOrderPositionData = res;
      console.log(this.hmOrderPositionData);
      const data = [['Order No', 'Challan No', 'Challan Date', 'Party Name', 'Sales Person', 'CS', 'PO No.', 'BrandName', 'Type', 'Sub Type', 'Cutting Label', 'Item Name', 'Color', 'Size', 'Style No', 'ChallanQty', 'Rate', 'Amount', 'Commission', 'ComAmt', 'netsales', 'PI']];
      this.hmOrderPositionData.forEach((element) => data.push([element['Order No'], element['Challan No'], this.api.formatDate(element['Challan Date']), element['Party Name'], element['Sales Person'], element['CS'], element['PO No.'], element['BrandName'], element['Type'], element['Sub Type'], element['Cutting Label'], element['Item Name'], element['Color'], element['Size'], element['Style No'], element['ChallanQty'], element['Rate'], element['Amount'], element['Commission'], element['ComAmt'], element['netsales'], element['PI']]));
      this.api.pdfReportWorkOrder(data, 'Rebate and Commission', 'portrait', 'From: ' + fromDate + ' to: ' + toDate);
    });
  }

  excelRebateCommission() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.brandname) {
      this.brandname = 0;
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

    this.api.getdata(`WorkOrderMasters/getSalesCommissionReport?company=` + this.companyname + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo) + `&brand=` + this.brandname + `&category=` + this.productcategory + `&employee=` + this.empid)
      .subscribe((res: any[]) => {
        this.RebateCommissionData = res;
        console.log(this.RebateCommissionData);

        const data = res.map((element: any) => {
          return {
            'Order No': element['Order No'], 'Challan No': element['Challan No'], 'Challan Date': this.api.formatDate(element['Challan Date']),
            'Party Name': element['Party Name'], 'Sales Person': element['Sales Person'], 'CS': element.CS, 'PO No.': element['PO No.'],
            'BrandName': element.BrandName, 'Type': element.Type, 'Cutting Label': element['Cutting Label'],
            'Item Name': element['Item Name'], 'Color': element.Color, 'Size': element.Size,
            'Style No': element['Style No'], 'ChallanQty': element.ChallanQty, 'Rate': element.Rate,
            'Amount': element.Amount, 'Commission': element.Commission, 'ComAmt': element.ComAmt, 'netsales': element.netsales,
            'PI': element.PI
          };
        });
        const lengths = [23, 13, 11, 20, 20, 20, 20, 15, 15, 8, 13, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
        this.api.exportExcel(data, [['Rebate and Commission Report'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Rebate and Commission', lengths);
      });
  }

  pdfPurchasePending() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.ItemCode) {
      this.ItemCode = 0;
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
    this.api.getdata(`WorkOrderMasters/getPurchasePending?company=` + this.companyname + `&item=` + this.ItemCode + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo)).subscribe((res: any) => {
      this.hmOrderPositionData = res;
      console.log(this.hmOrderPositionData);
      const data = [['CompanyName', 'Prepareby', 'RequisitionNo', 'ReqStatus', 'Remarks', 'RequisitionNoDate', 'E.D Date', 'IndentNo', 'Stock Item Name', 'Qty', 'Unit', 'Rate', 'Amount']];
      this.hmOrderPositionData.forEach((element) => data.push([element['CompanyName'], element['Prepareby'], element['RequisitionNo'], element['ReqStatus'], element['Remarks'], this.api.formatDate(element['RequisitionNoDate']), this.api.formatDate(element['E.D Date']), element['IndentNo'], element['Stock Item Name'], element['Qty'], element['Unit'], element['Rate'], element['Amount']]));
      this.api.pdfReportWorkOrder(data, 'Purchase Pending', 'portrait', 'From: ' + fromDate + ' to: ' + toDate);
    });
  }

  excelPurchasePending() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.ItemCode) {
      this.ItemCode = 0;
    }
    if (!this.searchFrom) {
      this.api.showWarningToast("Please select From Date");
      return;
    }
    if (!this.searchTo) {
      this.api.showWarningToast("Please select To Date");
      return;
    }

    this.api.getdata(`WorkOrderMasters/getPurchasePending?company=` + this.companyname + `&item=` + this.ItemCode + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo))
      .subscribe((res: any[]) => {
        const data = res.map((element: any) => {
          return {
            'CompanyName': element['CompanyName'], 'Prepareby': element['Prepareby'], 'RequisitionNo': element['RequisitionNo'],
            'ReqStatus': element['ReqStatus'], 'Remarks': element['Remarks'], 'RequisitionNoDate': this.api.formatDate(element.RequisitionNoDate), 
            'E.D Date': this.api.formatDate(element['E.D Date']),
            'BrandName': element.BrandName, 'Type': element.Type, 'Cutting Label': element['Cutting Label'],
            'IndentNo': element['IndentNo'], 'Stock Item Name': element['Stock Item Name'], 'Qty': element.Qty,
            'Unit': element['Unit'], 'Rate': element.Rate, 'Amount': element.Amount
          };
        });
        const lengths = [30, 20, 22, 20, 30, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
        this.api.exportExcel(data, [['Purchase Pending Report'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Purchase Pending', lengths);
      });
  }


}
