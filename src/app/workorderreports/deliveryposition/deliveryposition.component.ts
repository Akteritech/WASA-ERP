import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-deliveryposition',
  templateUrl: './deliveryposition.component.html',
  styleUrls: ['./deliveryposition.component.css']
})
export class DeliverypositionComponent implements OnInit {
  companies: any;
  npdBrands: any;
  productcategories: any;
  customers: any;
  executives: any;
  searchFrom: Date;
  searchTo: Date;
  companyname: any;
  customer: any;
  executive: any;
  brandname: any;
  productcategory: any;
  workorderno: any;
  sample: any;
  deliveryPositionsData: any;
  challanRegisterData: any;
  orderBookDetailsData: any;
  PIDiscountData: any;
  ExportDeliveryPositionData: any;
  empid: any;
  jobcardDate: any;

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.getCompanies();
    this.getCustomers();
    this.getExecutive('');
    this.getNPDBrand();
    this.getproductcategories();
    this.empid = sessionStorage.getItem('empid');
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

  getExecutive(query: string) {
    // this.api.getdata(`WorkOrderMasters/salesExecutive`).subscribe((res: any) => {
    //   this.executives = res;
    //   console.log(this.executives);
    // }, err => {
    //   console.log(err);
    // });
    this.api.getdata('SalesPersonLists?filter[where][SalesPeron][like]=%' + query + '%&filter[limit]=10').subscribe((res: any[]) => {
      this.executives = res;
    });
  }

  reset() {
    this.companyname = null;
    this.customer = null;
    this.executive = null;
    this.brandname = null;
    this.productcategory = null;
    this.sample = null;
    this.workorderno = null;
    this.searchFrom = null;
    this.searchTo = null;
  }

  getDeliveryPosition() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.productcategory) {
      this.productcategory = 0;
    }
    if (!this.customer) {
      this.customer = 0;
    }
    if (!this.executive) {
      this.executive = 0;
    }
    if (!this.sample) {
      this.sample = 0;
    }
    if (!this.workorderno) {
      this.workorderno = 0;
    }
    if (!this.brandname) {
      this.brandname = 0;
    }
    if (!this.searchFrom) {
      this.api.showWarningToast("Please select From Date");
      return;
    }
    if (!this.searchTo) {
      this.api.showWarningToast("Please select To Date");
      return;
    }

    this.api.getdata(`WorkOrderMasters/getDeliveryPosition?category=` + this.productcategory + `&woid=` + this.workorderno + `&client=` + this.customer + `&sample=` + this.sample + `&brand=` + this.brandname + `&company=` + this.companyname + `&salesperson=` + this.executive + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo)).subscribe((res: any) => {
      this.deliveryPositionsData = res;
      console.log(this.deliveryPositionsData);
    });
  }

  pdfDeliveryPosition() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.productcategory) {
      this.productcategory = 0;
    }
    if (!this.customer) {
      this.customer = 0;
    }
    if (!this.executive) {
      this.executive = 0;
    }
    if (!this.sample) {
      this.sample = 0;
    }
    if (!this.workorderno) {
      this.workorderno = 0;
    }
    if (!this.brandname) {
      this.brandname = 0;
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

    this.api.getdata(`WorkOrderMasters/getDeliveryPosition?category=` + this.productcategory + `&woid=` + this.workorderno + `&client=` + this.customer + `&sample=` + this.sample + `&brand=` + this.brandname + `&company=` + this.companyname + `&salesperson=` + this.executive + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo)).subscribe((res: any) => {
      this.deliveryPositionsData = res;
      const data = [['Work Order No', 'Order Date', 'Delivery Date', 'PO', 'Label Name', 'Client Name', 'Brand Name', 'Challan No', 'ChallanDate', 'Order Qty', 'Delivery Qty']];
      this.deliveryPositionsData.forEach((element) => data.push([element['WorkOrderNo'], element['OrderReceiveDate'], element['EstDeliverDate'], element['CustomerPONo'], element['SampleName'], element['ClientName'], element['BrandName'], element['ChallanNo'], element['ChallanDate'], element['OrderQty'], element['CHALQTY']]));
      this.api.pdfReportProduction(data, 'Delivery Position Report', 'portrait', 'From: ' + fromDate + ' to: ' + toDate);
    });

  }

  // excelDeliveryPosition() {
  //   this.api.getdata(`WorkOrderMasters/getDeliveryPosition?category=` + this.productcategory + `&woid=` + this.workorderno + `&client=` + this.customer + `&sample=` + this.sample + `&brand=` + this.brandname + `&company=` + this.companyname + `&salesperson=` + this.executive + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo)).subscribe((res: any[]) => {
  //     this.deliveryPositionsData = res;
  //     const data = [['Work Order No', 'Order Date', 'Delivery Date', 'PO', 'Label Name', 'Client Name', 'Brand Name', 'Challan No', 'ChallanDate', 'Order Qty', 'Delivery Qty']];
  //     this.deliveryPositionsData.forEach((element) => data.push([element['WorkOrderNo'], element['OrderReceiveDate'], element['EstDeliverDate'], element['CustomerPONo'], element['SampleName'], element['ClientName'], element['BrandName'], element['ChallanNo'], element['ChallanDate'], element['OrderQty'], element['CHALQTY']]));
  //     this.api.exportCsv(data, 'Delivery Position Report', data);

  //   });
  // }

  excelDeliveryPosition() {
    this.api.getdata(`WorkOrderMasters/getDeliveryPosition?category=` + this.productcategory + `&woid=` + this.workorderno + `&client=` + this.customer + `&sample=` + this.sample + `&brand=` + this.brandname + `&company=` + this.companyname + `&salesperson=` + this.executive + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo))
      .subscribe((res: any[]) => {
        const data = res.map((element: any) => {
          return {
            'Work Order No': element.WorkOrderNo, 'Order Date': element.OrderReceiveDate, 'Delivery Date': element.EstDeliverDate,
            'PO': element.CustomerPONo, 'Label Name': element.SampleName, 'Client Name': element.ClientName, 'Brand Name': element.BrandName,
            'Challan No': element.ChallanNo, 'ChallanDate': element.ChallanDate, 'Order Qty': element.OrderQty,
            'Delivery Qty': element.CHALQTY
          };
        });
        const lengths = [5, 10, 15, 5, 10, 15, 5, 10, 15, 8, 13];
        //this.api.exportExcel(data, ['Delivery Position Report', 'From Here to Here'], 'Delivery Position Report', lengths);
      })
  }

  pdfChallanRegister() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.productcategory) {
      this.productcategory = 0;
    }
    if (!this.customer) {
      this.customer = 0;
    }
    if (!this.executive) {
      this.executive = 0;
    }
    if (!this.sample) {
      this.sample = 0;
    }
    if (!this.workorderno) {
      this.workorderno = 0;
    }
    if (!this.brandname) {
      this.brandname = 0;
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
    this.api.getdata(`WorkOrderMasters/getChallanRegister?category=` + this.productcategory + `&woid=` + this.workorderno + `&client=` + this.customer + `&sample=` + this.sample + `&brand=` + this.brandname + `&company=` + this.companyname + `&salesperson=` + this.executive + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo)).subscribe((res: any) => {
      this.challanRegisterData = res;
      const data = [['WorkOrderNo', 'Order Date', 'Delivery Date', 'Party Name', 'Buyer', 'PO', 'Label Name', 'Challan No', 'Challan Date', 'Order Qty', 'Delivery Qty']];
      this.challanRegisterData.forEach((element) => data.push([element['WorkOrderNo'], this.api.formatDate(element['OrderReceiveDate']), this.api.formatDate(element['EstDeliverDate']), element['ClientName'], element['BrandName'], element['CustomerPONo'], element['SampleName'], element['ChallanNo'], this.api.formatDate(element['ChallanDate']), element['OrderQty'], element['CHALQTY']]));
      this.api.pdfReportWorkOrder(data, 'Challan Register Report', 'portrait', 'From: ' + fromDate + ' to: ' + toDate);
    });
  }

  pdfBookList() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.productcategory) {
      this.productcategory = 0;
    }
    if (!this.customer) {
      this.customer = 0;
    }
    if (!this.executive) {
      this.executive = 0;
    }
    if (!this.sample) {
      this.sample = 0;
    }
    if (!this.workorderno) {
      this.workorderno = 0;
    }
    if (!this.brandname) {
      this.brandname = 0;
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
    this.api.getdata(`WorkOrderMasters/getBookList?category=` + this.productcategory + `&woid=` + this.workorderno + `&client=` + this.customer + `&sample=` + this.sample + `&brand=` + this.brandname + `&company=` + this.companyname + `&salesperson=` + this.executive + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo)).subscribe((res: any) => {
      this.challanRegisterData = res;
      const data = [['Work Order No', 'Order Date', 'Party Name', 'Buyer', 'PO', 'Label Name', 'Color', 'Size', 'Style', 'Other', 'Order Qty', 'Price', 'Delivery Qty']];
      this.challanRegisterData.forEach((element) => data.push([element['WorkOrderNo'], element['OrderReceiveDate'], element['ClientName'], element['BrandName'], element['CustomerPONo'], element['SampleName'], element[''], element[''], element[''], element[''], element['OrderQty'], element['Price'], element['CHALQTY']]));
      this.api.pdfReport(data, 'Order Book Report', 'portrait', 'From: ' + fromDate + ' to: ' + toDate);
    });
  }

  excelOrderBookDetails() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.productcategory) {
      this.productcategory = 0;
    }
    if (!this.customer) {
      this.customer = 0;
    }
    if (!this.sample) {
      this.sample = 0;
    }
    if (!this.workorderno) {
      this.workorderno = 0;
    }
    if (!this.brandname) {
      this.brandname = 0;
    }
    if (!this.searchFrom) {
      this.api.showWarningToast("Please select From Date");
      return;
    }
    if (!this.searchTo) {
      this.api.showWarningToast("Please select To Date");
      return;
    }
    this.api.getdata(`WorkOrderMasters/getOrderBookDetails?category=` + this.productcategory + `&woid=` + this.workorderno + `&client=` + this.customer + `&sample=` + this.sample + `&brand=` + this.brandname + `&company=` + this.companyname + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo)).subscribe((res: any) => {
      this.orderBookDetailsData = res;
      //console.log(this.deliveryPositionsData);

      // const data = [['Client Name', 'Order Receive Date', 'Delivery Date', 'StyleNo', 'Color', 'CustomerPONo', 'WorkOrderNo', 'ProductCategoryName', 'SampleName', 'OrderQty', 'ChallanQty', 'BalanceQty', 'WorkOrderMasterID', 'ChallanNo']];
      // this.orderBookDetailsData.forEach((element) => data.push([element['ClientName'], element['OrderReceiveDate'], element['EstDeliverDate'], element['StyleNo'], 
      //element['Color'], element['CustomerPONo'], element['WorkOrderNo'], element['ProductCategoryName'], element['SampleName'], element['OrderQty'], element['ChallanQty'], 
      //element['BalanceQty'], element['WorkOrderMasterID'], element['ChallanNo']]));
      // this.api.exportCsv(data, 'Order Book Details Report', data);

      const data = res.map((element: any) => {
        return {
          'Client Name': element['ClientName'], 'Order Receive Date': this.api.formatDate(element['OrderReceiveDate']), 'EstDeliverDate': this.api.formatDate(element['EstDeliverDate']), 'Style No': element['StyleNo'], 
          'Color': element['Color'], 'Customer PO No': element['CustomerPONo'], 'WorkOrderNo': element['WorkOrderNo'], 'ProductCategoryName': element['ProductCategoryName'], 
          'Sample Name': element['SampleName'], 
          'OrderQty': element['OrderQty'], 'Challan Qty': element['ChallanQty'], 'BalanceQty': element['BalanceQty'], 'WorkOrderMasterID': element['WorkOrderMasterID'], 
          'ChallanNo': element['ChallanNo']
        };
      });
      const lengths = [22, 30, 25, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
      this.api.exportExcel(data, [['Order Book Details Report'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Order Book Details Report', lengths);

    });
  }

  pdfOrderSummery() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.productcategory) {
      this.productcategory = 0;
    }
    if (!this.customer) {
      this.customer = 0;
    }
    if (!this.executive) {
      this.executive = 0;
    }
    if (!this.sample) {
      this.sample = 0;
    }
    if (!this.workorderno) {
      this.workorderno = 0;
    }
    if (!this.brandname) {
      this.brandname = 0;
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
    this.api.getdata(`WorkOrderMasters/getOrderSummery?category=` + this.productcategory + `&woid=` + this.workorderno + `&client=` + this.customer + `&sample=` + this.sample + `&brand=` + this.brandname + `&company=` + this.companyname + `&salesperson=` + this.executive + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo)).subscribe((res: any) => {
      this.challanRegisterData = res;
      const data = [['Party Name', 'Order Value']];
      this.challanRegisterData.forEach((element) => data.push([element['ClientName'], element['OrderValue']]));
      this.api.pdfReport(data, 'Order Summery Report', 'portrait', 'From: ' + fromDate + ' to: ' + toDate);
    });
  }

  pdfItemwiseSales() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.productcategory) {
      this.productcategory = 0;
    }
    if (!this.sample) {
      this.sample = 0;
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
    this.api.getdata(`WorkOrderMasters/getItemwiseSales?category=` + this.productcategory + `&sample=` + this.sample + `&company=` + this.companyname + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo)).subscribe((res: any) => {
      this.challanRegisterData = res;
      const data = [['Item Name', 'Challan No', 'Challan Date', 'Party Name', 'Qty', 'Rate', 'Total Amount']];
      this.challanRegisterData.forEach((element) => data.push([element['SampleName'], element['ChallanNo'], this.api.formatDate(element['ChallanDate']), element['ClientName'], element['CHALQTY'], element['Price'], element['TotalAmount']]));
      this.api.pdfReport(data, 'Item wise Sales', 'portrait', 'From: ' + fromDate + ' to: ' + toDate);
    });
  }

  pdfDueList() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.productcategory) {
      this.productcategory = 0;
    }
    if (!this.customer) {
      this.customer = 0;
    }
    if (!this.executive) {
      this.executive = 0;
    }
    if (!this.sample) {
      this.sample = 0;
    }
    if (!this.workorderno) {
      this.workorderno = 0;
    }
    if (!this.brandname) {
      this.brandname = 0;
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
    this.api.getdata(`WorkOrderMasters/getDueList?category=` + this.productcategory + `&woid=` + this.workorderno + `&client=` + this.customer + `&sample=` + this.sample + `&brand=` + this.brandname + `&company=` + this.companyname + `&salesperson=` + this.executive + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo)).subscribe((res: any) => {
      this.challanRegisterData = res;
      const data = [['Work Order No', 'Order Date', 'Job Card Date', 'Delivery Date', 'Party Name', 'Buyer', 'PO', 'Label Name', 'Color', 'Order qty', 'Delivery Qty', 'Due Qt']];
      this.challanRegisterData.forEach((element) => data.push([element['WorkOrderNo'], element[''], this.api.formatDate(element['JobCardDate']), this.api.formatDate(element['EstDeliverDate']), element['ClientName'], element['BrandName'], element[''], element[''], element['SampleColorName'], element['OrderQty'], element['DeliveryQty'], element['dueQty']]));
      this.api.pdfReport(data, 'Due List', 'portrait', 'From: ' + fromDate + ' to: ' + toDate);
    });
  }

  pdfRebateOrCommission() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.productcategory) {
      this.productcategory = 0;
    }
    if (!this.customer) {
      this.customer = 0;
    }
    if (!this.executive) {
      this.executive = 0;
    }
    if (!this.sample) {
      this.sample = 0;
    }
    if (!this.workorderno) {
      this.workorderno = 0;
    }
    if (!this.brandname) {
      this.brandname = 0;
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
    this.api.getdata(`WorkOrderMasters/getRebateOrCommission?category=` + this.productcategory + `&woid=` + this.workorderno + `&client=` + this.customer + `&sample=` + this.sample + `&brand=` + this.brandname + `&company=` + this.companyname + `&salesperson=` + this.executive + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo)).subscribe((res: any) => {
      this.challanRegisterData = res;
      const data = [['Order No', 'Challan No', 'Challan Date', 'Party Name', 'Sales Person', 'PO NO', 'Buyer', 'Type', 'Sub Type', 'Item Name', 'Color', 'Size', 'Style', 'Key4', 'Chall Qty', 'Rate/1000', 'Gross Sales(S) US $', 'CommissionRate( M )%', 'Commission AmountCA=(S xM)/100', 'Over Invoice Rate/1000( R )', 'Over Invoice Amount(ER=Q xR)/1000US $', 'Net SalesS-(ER+CA)US $']];
      this.challanRegisterData.forEach((element) => data.push([element['WorkOrderNo'], element['ChallanNo'], this.api.formatDate(element['ChallanDate']), element['ClientName'], element['SalesPerson'], element['CustomerPONo'], element['BrandName'], element['ProductCategoryName'], element['ProductSubCategoryName'], element['SampleName'], element['KeyEntry1'], element['KeyEntry2'], element['KeyEntry3'], element['KeyEntry4'], element['ChallanQty'], element['Price'], element['GrossSales'], element['CommissionPercent'], element['CommissionPercentAMOUNT'], element['ExtraRebate'], element['ExtraRebatePercent'], element['']]));
      this.api.pdfReportWorkOrder(data, 'Rebate Or Commission', 'portrait', 'From: ' + fromDate + ' to: ' + toDate);
    });
  }

  pdfPIDiscount() {
    if (!this.companyname) {
      this.companyname = 0;
    }

    if (!this.customer) {
      this.customer = 0;
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
    this.api.getdata(`WorkOrderMasters/getPIDiscount?company=` + this.companyname + `&client=` + this.customer + `&sample=` + this.sample + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo)).subscribe((res: any) => {
      this.PIDiscountData = res;
      const data = [['PI No', 'PI Date', 'Party', 'PI Amount', 'Discount %', 'Discount Amount', 'Actual PI Amount']];
      this.PIDiscountData.forEach((element) => data.push([element['PINo'], this.api.formatDate(element['PIDate']), element['ClientName'], element['PIValue'], element['Pi_Discount'], element[''], element['']]));
      this.api.pdfReport(data, 'PI Discount', 'portrait', 'From: ' + fromDate + ' to: ' + toDate);
    });
  }

  excelExportReport() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.productcategory) {
      this.productcategory = 0;
    }
    if (!this.customer) {
      this.customer = 0;
    }
    if (!this.executive) {
      this.executive = 0;
    }
    if (!this.sample) {
      this.sample = 0;
    }
    if (!this.workorderno) {
      this.workorderno = 0;
    }
    if (!this.brandname) {
      this.brandname = 0;
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
    this.api.getdata(`WorkOrderMasters/getExportDeliveryPositionToExcel?category=` + this.productcategory + `&woid=` + this.workorderno + `&client=` + this.customer + `&sample=` + this.sample + `&brand=` + this.brandname + `&company=` + this.companyname + `&salesperson=` + this.executive + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo)).subscribe((res: any) => {
      this.ExportDeliveryPositionData = res;
      // const data = [['Order No', 'Order Date', 'Delivery Date', 'Party Name', 'Buyer', 'PO', 'Label', 'Color', 'Size', 'Style', 'Order Qty', 'Delivery Qty', 'Qty Balance', 'Rate', 'Due Value']];
      // this.ExportDeliveryPositionData.forEach((element) => data.push([element['Order No'], element['Order Date'], element['Delivery Date'], element['Party Name'], 
      //element['Buyer'], element['PO'], element['Label'], element['Color'], element['Size'], element['Style'], element['Order Qty'], element['Delivery Qty'], 
      //element['Qty Balance'], element['Rate'], element['Due Value']]));
      // this.api.exportCsv(data, 'Export Delivery Position', data);

      const data = res.map((element: any) => {
        return {
          'Order No': element['Order No'], 'Order Date': element['Order Date'], 'Delivery Date': element['Delivery Date'], 
          'Party Name': element['Party Name'], 
          'Buyer': element['Buyer'], 'PO': element['PO'], 'Label': element['Label'], 'Color': element['Color'], 
          'Size': element['Size'], 
          'Style': element['Style'], 'Order Qty': element['Order Qty'], 'Delivery Qty': element['Delivery Qty'], 'Qty Balance': element['Qty Balance'], 
          'Rate': element['Rate'], 'Due Value': element['Due Value']
        };
      });
      const lengths = [22, 30, 25, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
      this.api.exportExcel(data, [['Export Report'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Export Report', lengths);

    });
  }

  excelDeliveryPositionReport() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.productcategory) {
      this.productcategory = 0;
    }
    if (!this.customer) {
      this.customer = 0;
    }
    if (!this.executive) {
      this.executive = 0;
    }
    if (!this.sample) {
      this.sample = 0;
    }
    if (!this.workorderno) {
      this.workorderno = 0;
    }
    if (!this.brandname) {
      this.brandname = 0;
    }
    if (!this.searchFrom) {
      this.api.showWarningToast("Please select From Date");
      return;
    }
    if (!this.searchTo) {
      this.api.showWarningToast("Please select To Date");
      return;
    }
    //const fromDate = this.api.formatDate(this.searchFrom);
    //const toDate = this.api.formatDate(this.searchTo);
    // this.api.getdata(`WorkOrderMasters/getDeliveryPositionforexcel?category=` + this.productcategory + `&woid=` + this.workorderno + `&client=` + this.customer + `&sample=` + this.sample + `&brand=` + this.brandname + `&company=` + this.companyname + `&salesperson=` + this.executive + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo)).subscribe((res: any) => {
    //   this.ExportDeliveryPositionData = res;
    //   const data = [['Order No', 'OrderReceiveDate', 'JobCardDate', 'EstDeliverDate', 'ClientName', 'CS', 'BrandName', 'MerchandiserName', 'CustomerPONo', 'MC PO', 'Actual PO', 'Ecom', 'SampleName', 'SampleColorName', 'Part', 'Rate', 'Order Qty', 'Order Value', 'ChallanNo', 'ChallanDate', 'CHALQTY', 'MC Style', 'PI No', 'Narration', 'Diff', 'ProductCategoryName']];
    //   this.ExportDeliveryPositionData.forEach((element) => data.push([element['WorkOrderNo'], this.api.formatDate(element['OrderReceiveDate']), this.api.formatDate(element['JobCardDate']), this.api.formatDate(element['EstDeliverDate']), element['ClientName'], element['CS'], element['BrandName'], element['MerchandiserName'], element['CustomerPONo'], element['MC PO'], element['Actual PO'], element['Ecom'], element['SampleName'], element['SampleColorName'], element['Part'], element['Rate'], element['Order Qty'], element['Order Value'], element['ChallanNo'], element['ChallanDate'], element['CHALQTY'], element['MC Style'], element['PI No'], element['Narration'], element['Diff'], element['ProductCategoryName']]));
    //   this.api.exportCsv(data, 'Delivery Position', data);
    // });

    this.api.getdata(`WorkOrderMasters/getDeliveryPositionforexcel?category=` + this.productcategory + `&woid=` + this.workorderno + `&client=` + this.customer + `&sample=` + this.sample + `&brand=` + this.brandname + `&company=` + this.companyname + `&salesperson=` + this.executive + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo))
      .subscribe((res: any[]) => {
        const data = res.map((element: any) => {
          return {
            'Work Order No': element.WorkOrderNo, 'Order Date': this.api.formatDate(element.OrderReceiveDate), 'Jobcard Date': this.api.formatDate(element.JobCardDate),
            'Delivery Date': this.api.formatDate(element.EstDeliverDate), 'Client Name': element.ClientName, 'CS': element.CS, 'Brand Name': element.BrandName,
            'Merchandiser Name': element.MerchandiserName, 'Customer PO No': element.CustomerPONo, 'MC PO': element['MC PO'],
            'Actual Po': element['Actual PO'], 'Ecom': element.Ecom, 'SampleName': element.SampleName,
            'SampleColorName': element.SampleColorName, 'Part': element.Part, 'Rate': element.Rate,
            'Order Qty': element['Order Qty'], 'Order Value': element['Order Value'], 'ChallanNo': element.ChallanNo, 'ChallanDate': element.ChallanDate,
            'CHALQTY': element.CHALQTY, 'MC Style': element['MC Style'], 'PI NO': element['PI No'], 'Narration': element.Narration, 'Diff': element.Diff, 'ProductCategoryName': element.ProductCategoryName,
          };
        });
        const lengths = [20, 11, 11, 15, 28, 15, 15, 15, 15, 8, 13, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
        this.api.exportExcel(data, [['Delivery Position Report'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Excel Delivery Position', lengths);
      
      });
  }

  excelDueListReport() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.productcategory) {
      this.productcategory = 0;
    }
    if (!this.customer) {
      this.customer = 0;
    }
    if (!this.executive) {
      this.executive = 0;
    }
    if (!this.sample) {
      this.sample = 0;
    }
    if (!this.workorderno) {
      this.workorderno = 0;
    }
    if (!this.brandname) {
      this.brandname = 0;
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
    this.api.getdata(`WorkOrderMasters/getChallanRegisterSearchexcel?category=` + this.productcategory + `&woid=` + this.workorderno + `&client=` + this.customer + `&sample=` + this.sample + `&brand=` + this.brandname + `&company=` + this.companyname + `&salesperson=` + this.executive + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo)).subscribe((res: any) => {
      this.ExportDeliveryPositionData = res;
      // const data = [['Order No', 'Product Category', 'Order Date', 'Release Date', 'Release By', 'Receive Date', 'Job Card Date', 'Delivery Date', 'Partial Delivery Date', 'Party Name', 'Brand Name', 'CS', 'PO', 'Item No', 'Color', 'Part No', 'Order Qty', 'Del Qty', 'Due Qty', 'Price', 'OrderValue', 'Order Type', 'Company', 'Comments from Production', 'Hold Reason', 'Release Reason', 'Comments from CS', 'RefWorkOrderNo', 'Job Qty', 'Production Qty']];
      // this.ExportDeliveryPositionData.forEach((element) => data.push([element['Work Order No'], element['Product Category'], 
      //this.api.formatDate(element['Order Date']), this.api.formatDate(element['Release Date']), element['Release By'], element['Receive Date'], 
      //element['Job Card Date'], this.api.formatDate(element['Delivery Date']), this.api.formatDate(element['Partial Delivery Date']), element['Party Name'], 
      //element['Brand Name'], element['CS'], element['PO'], element['Item No'], element['Color'], element['Part No'], element['Order Qty'], element['Del Qty'], 
      //element['Due Qty'], element['Price'], element['OrderValue'], element['Order Type'], element['Company'], element['Comments from Production'], 
      //element['Hold Reason'], element['Release Reason'], element['Comments from CS'], element['RefWorkOrderNo'], element['Job Qty'], element['Production Qty']]));
      // this.api.exportCsv(data, 'Due List', data);

      const data = res.map((element: any) => {
        return {
          'Work Order No': element['Work Order No'], 'Product Category': element['Product Category'], 'Order Date': this.api.formatDate(element['Order Date']),
          'Release Date': this.api.formatDate(element['Release Date']), 'Release By': element['Release By'], 'Receive Date': this.api.formatDate(element['Receive Date']), 
          'Job Card Date': this.api.formatDate(element['Job Card Date']),
          'Delivery Date': this.api.formatDate(element['Delivery Date']), 'Partial Delivery Date': this.api.formatDate(element['Partial Delivery Date']), 'Party Name': element['Party Name'],
          'Brand Name': element['Brand Name'], 'CS': element.CS, 'PO': element.PO,
          'Item No': element['Item No'], 'Color': element.Color, 'Part No': element['Part No'],
          'Order Qty': element['Order Qty'], 'Del Qty': element['Del Qty'], 'Due Qty': element['Due Qty'], 'Price': element['Price'],
          'OrderValue': element.OrderValue, 'Order Type': element['Order Type'], 'Company': element['Company'], 
          'Comments from Production': element['Comments from Production'], 'Hold Reason': element['Hold Reason'], 'Release Reason': element['Release Reason'],
          'Comments from CS': element['Comments from CS'], 'RefWorkOrderNo': element['RefWorkOrderNo'], 'Job Qty': element['Job Qty'], 'Production Qty': element['Production Qty'] 
        };
      });
      const lengths = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
      this.api.exportExcel(data, [['Due List Report'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Excel Due List', lengths);
    
    });
  }

  excelChallanRegisterAndPINoReport() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.productcategory) {
      this.productcategory = 0;
    }
    if (!this.customer) {
      this.customer = 0;
    }
    if (!this.executive) {
      this.executive = 0;
    }
    if (!this.sample) {
      this.sample = 0;
    }
    if (!this.workorderno) {
      this.workorderno = 0;
    }
    if (!this.brandname) {
      this.brandname = 0;
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
    this.api.getdata(`WorkOrderMasters/getChallanRegisteraddpiNo?category=` + this.productcategory + `&woid=` + this.workorderno + `&client=` + this.customer + `&sample=` + this.sample + `&brand=` + this.brandname + `&company=` + this.companyname + `&salesperson=` + this.executive + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo)).subscribe((res: any) => {
      this.ExportDeliveryPositionData = res;
      this.jobcardDate = res.JobCardDate;
      console.log(this.ExportDeliveryPositionData);
      console.log(this.jobcardDate);
      // const data = [['ProductCategoryName', 'WorkOrderNo', 'OrderReceiveDate', 'EstDeliverDate', 'JobCardDate', 'ClientName', 'BrandName', 'CustomerPONo', 'McPO', 'McStyle', 'EcomNo', 'SampleName', 'OrderQty', 'ChallanNo', 'ChallanDate', 'CHALQTY', 'OrderValue', 'Price', 'PINo', 'ChallanValue', 'Challan Qty With Set', 'Part']];
      // this.ExportDeliveryPositionData.forEach((element) => data.push([element['ProductCategoryName'], element['WorkOrderNo'], 
      //this.api.formatDate(element['OrderReceiveDate']), this.api.formatDate(element['EstDeliverDate']), this.api.formatDate(element['JobCardDate']), 
      //element['ClientName'], element['BrandName'], element['CustomerPONo'], element['McPO'], element['McStyle'], element['EcomNo'], element['SampleName'], 
      //element['OrderQty'], element['ChallanNo'], this.api.formatDate(element['ChallanDate']), element['CHALQTY'], element['OrderValue'], element['Price'], 
      //element['PINo'], element['ChallanValue'], element['Challan Qty With Set'], element['Part']]));
      // this.api.exportCsv(data, 'Challan Register and PI No', data);
      const data = res.map((element: any) => {
        return {
          'ProductCategoryName': element['ProductCategoryName'], 'WorkOrderNo': element['WorkOrderNo'], 'OrderReceiveDate': this.api.formatDate(element['OrderReceiveDate']),
          'EstDeliverDate': this.api.formatDate(element['EstDeliverDate']), 'JobCardDate':this.api.formatDate(element['JobCardDate']), 'ClientName': element['ClientName'], 
          'BrandName': element['BrandName'],
          'CustomerPONo': element['CustomerPONo'], 'McPO': element['McPO'], 'McStyle': element['McStyle'],
          'EcomNo': element['EcomNo'], 'SampleName': element.SampleName, 'OrderQty': element.OrderQty,
          'ChallanNo': element['ChallanNo'], 'ChallanDate': this.api.formatDate(element.ChallanDate), 'CHALQTY': element['CHALQTY'],
          'OrderValue': element['OrderValue'], 'Price': element['Price'], 'PINo': element['PINo'], 'ChallanValue': element['ChallanValue'],
          'Challan Qty With Set': element['Challan Qty With Set'], 'Part': element['Part']
        };
      });
      const lengths = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
      this.api.exportExcel(data, [['Challan Register and PI No Report'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Challan Register and PI No', lengths);
    
    });
  }

  excelItemWiseSample() {
    if (!this.productcategory) {
      this.api.showWarningToast("Please select Category");
      return;
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
    this.api.getdata(`WorkOrderMasters/getItemWiseSampleInExcel?category=` + this.productcategory + `&woid=` + this.workorderno + `&client=` + this.customer + `&sample=` + this.sample + `&brand=` + this.brandname + `&company=` + this.companyname + `&salesperson=` + this.executive + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo)).subscribe((res: any[]) => {
      // this.ExportDeliveryPositionData = res;
      // const data = [['Item Name', 'WorkOrderNo', 'OrderReceiveDate', 'BrandName', 'PO NO', 'SampleColorName', 'OrderQty', 'ChallanQty', 'Due Qty', 'OrderType']];
      // this.ExportDeliveryPositionData.forEach((element) => data.push([element['Item Name'], element['WorkOrderNo'], element['OrderReceiveDate'], element['BrandName'], element['PO NO'], element['SampleColorName'], element['OrderQty'], element['ChallanQty'], element['Due Qty'], element['OrderType']]));
      // this.api.exportCsv(data, 'Item Wise Sample', data);
      const data = res.map((element: any) => {
        return {
          'Item Name': element['Item Name'], 'WorkOrderNo': element.WorkOrderNo, 'OrderReceiveDate': element.OrderReceiveDate,
          'BrandName': element.BrandName, 'PO NO': element['PO NO'], 'SampleColorName': element.SampleColorName,
          'OrderQty': element.OrderQty, 'ChallanQty': element.ChallanQty, 'Due Qty': element['Due Qty'],
          'OrderType': element.OrderType
        }
      });
      const lengths = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
      const titles = [['Item Wise Sample'], ['From ' + this.api.formatDate(this.searchFrom) + ' to ' + this.api.formatDate(this.searchTo)]];
      this.api.exportExcel(data, titles, 'Item Wise Sample', lengths);
    });
  }

  pdfItemWiseSample() {
    if (!this.productcategory) {
      this.api.showWarningToast("Please select Category");
      return;
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
    this.api.getdata(`WorkOrderMasters/getItemWiseSampleInExcel?category=` + this.productcategory + `&woid=` + this.workorderno + `&client=` + this.customer + `&sample=` + this.sample + `&brand=` + this.brandname + `&company=` + this.companyname + `&salesperson=` + this.executive + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo)).subscribe((res: any) => {
      this.ExportDeliveryPositionData = res;
      const data = [['Item Name', 'WorkOrderNo', 'OrderReceiveDate', 'BrandName', 'PO NO', 'SampleColorName', 'OrderQty', 'ChallanQty', 'Due Qty', 'OrderType']];
      this.ExportDeliveryPositionData.forEach((element) => data.push([element['Item Name'], element['WorkOrderNo'], element['OrderReceiveDate'], element['BrandName'], element['PO NO'], element['SampleColorName'], element['OrderQty'], element['ChallanQty'], element['Due Qty'], element['OrderType']]));
      this.api.pdfReport(data, 'Item Wise Sample', 'portrait', 'From: ' + fromDate + ' to: ' + toDate);
    });
  }

  pdfPartyWiseDueValue() {
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
    const fromDate = this.api.formatDate(this.searchFrom);
    const toDate = this.api.formatDate(this.searchTo);
    this.api.getdata(`WorkOrderMasters/getPartyWiseDueValue?category=` + this.productcategory + `&woid=` + this.workorderno + `&client=` + this.customer + `&sample=` + this.sample + `&brand=` + this.brandname + `&company=` + this.companyname + `&salesperson=` + this.executive + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo)).subscribe((res: any) => {
      this.ExportDeliveryPositionData = res;
      const data = [['Client Name', 'Due Value']];
      this.ExportDeliveryPositionData.forEach((element) => data.push([element['ClientName'], element['dueValue']]));
      this.api.pdfReport(data, 'Party Wise Due Value', 'portrait', 'From: ' + fromDate + ' to: ' + toDate);
    });
  }

  excelHoldList() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.productcategory) {
      this.productcategory = 0;
    }
    if (!this.customer) {
      this.customer = 0;
    }
    if (!this.executive) {
      this.executive = 0;
    }
    if (!this.sample) {
      this.sample = 0;
    }
    if (!this.workorderno) {
      this.workorderno = 0;
    }
    if (!this.brandname) {
      this.brandname = 0;
    }
    if (!this.executive) {
      this.executive = 0;
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
    this.api.getdata(`WorkOrderMasters/getHoldList?company=` + this.companyname + `&brand=` + this.brandname + `&client=` + this.customer + `&salesperson=` + this.executive + `&category=` + this.productcategory + `&sample=` + this.sample + `&workorder=` + this.workorderno + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo) + `&employee=` + this.empid).subscribe((res: any) => {
      this.ExportDeliveryPositionData = res;
      //console.log(this.ExportDeliveryPositionData);

      // const data = [['Company', 'Work Order No', 'Order Date', 'PONo', 'Hold Date', 'Customer', 'Buyer', 'Sales Person', 'Category', 'Item', 'Qty', 'Price', 'Value']];
      // this.ExportDeliveryPositionData.forEach((element) => data.push([element['Company'], element['Work Order No'], element['Order Date'], element['PONo'], 
      //element['Hold Date'], element['Customer'], element['Buyer'], element['Sales Person'], element['Category'], element['Item'], element['Qty'], 
      //element['Price'], element['Value']]));
      // this.api.exportCsv(data, 'Order Hold List', data);
      const data = res.map((element: any) => {
        return {
          'Company': element['Company'], 'Work Order No': element['Work Order No'], 'Order Date': element['Order Date'],
          'PONo': element['PONo'], 'Hold Date':element['Hold Date'], 'Customer': element['Customer'], 
          'Buyer': element['Buyer'],
          'Sales Person': element['Sales Person'], 'Category': element['Category'], 'Item': element['Item'],
          'Qty': element['Qty'], 'Price': element.Price, 'Value': element.Value
        };
      });
      const lengths = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
      this.api.exportExcel(data, [['Order Hold List'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Order Hold List', lengths);
    
    });
  }

  excelShortOrderList() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.productcategory) {
      this.productcategory = 0;
    }
    if (!this.customer) {
      this.customer = 0;
    }
    if (!this.executive) {
      this.executive = 0;
    }
    if (!this.sample) {
      this.sample = 0;
    }
    if (!this.workorderno) {
      this.workorderno = 0;
    }
    if (!this.brandname) {
      this.brandname = 0;
    }
    if (!this.executive) {
      this.executive = 0;
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
    this.api.getdata(`WorkOrderMasters/getShortOrderList?company=` + this.companyname + `&brand=` + this.brandname + `&client=` + this.customer + `&salesperson=` + this.executive + `&category=` + this.productcategory + `&sample=` + this.sample + `&workorder=` + this.workorderno + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo) + `&employee=` + this.empid).subscribe((res: any) => {
      this.ExportDeliveryPositionData = res;
      //console.log(this.ExportDeliveryPositionData);
      // const data = [['Company', 'Short Work Order No', 'Short Order Reason', 'Responsible Person', 'Order Date', 'Against Work Order', 'Customer', 'Buyer', 'Sales Person', 'Category', 'Item', 'OrderQty', 'Qty', 'ChallanQty', 'DueQty', 'Price', 'Value', 'OrderType', 'CreatedBy']];
      // this.ExportDeliveryPositionData.forEach((element) => data.push([element['Company'], element['Short Work Order No'], element['Short Order Reason'], 
      //element['Responsible Person'], element['Order Date'], element['Against Work Order'], element['Customer'], element['Buyer'], element['Sales Person'], 
      //element['Category'], element['Item'], element['OrderQty'], element['Qty'], element['ChallanQty'], element['DueQty'], element['Price'], element['Value'],
      // element['OrderType'], element['CreatedBy']]));
      // this.api.exportCsv(data, 'Short Order List', data);
      const data = res.map((element: any) => {
        return {
          'Company': element['Company'], 'Work Order No': element['Short Work Order No'], 'Short Order Reason': element['Short Order Reason'],
          'Responsible Person': element['Responsible Person'], 'Order Date': element['Order Date'],
          'Against Work Order': element['Against Work Order'], 'Customer':element['Customer'],
          'Buyer': element['Buyer'],
          'Sales Person': element['Sales Person'], 'Category': element['Category'], 'Item': element['Item'], 'OrderQty': element['OrderQty'],
          'Qty': element['Qty'], 'Challan Qty': element['ChallanQty'], 'Due Qty': element['DueQty'], 'Price': element.Price, 'Value': element.Value, 'Order Type': element['OrderType'],
          'Created By': element['CreatedBy']
        };
      });
      const lengths = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
      this.api.exportExcel(data, [['Short Order List'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Short Order List', lengths);
    
    });
  }

  excelItemwiseSales() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.productcategory) {
      this.productcategory = 0;
    }
    if (!this.customer) {
      this.customer = 0;
    }
    if (!this.sample) {
      this.sample = 0;
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
    this.api.getdata(`WorkOrderMasters/getItemwiseSales?company=` + this.companyname + `&category=` + this.productcategory + `&sample=` + this.sample + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo)).subscribe((res: any) => {
      this.ExportDeliveryPositionData = res;
      // const data = [['SampleName', 'ChallanNo', 'ChallanDate', 'ClientName', 'CHALQTY', 'Price', 'TotalAmount', 'FromDate', 'ToDate']];
      // this.ExportDeliveryPositionData.forEach((element) => data.push([element['SampleName'], element['ChallanNo'], this.api.formatDate(element['ChallanDate']), 
      //element['ClientName'], element['CHALQTY'], element['Price'], element['TotalAmount'], this.api.formatDate(element['FromDate']), 
      //this.api.formatDate(element['ToDate'])]));
      // this.api.exportCsv(data, 'Item wise sales', data);

      const data = res.map((element: any) => {
        return {
          'SampleName': element['SampleName'], 'ChallanNo': element['ChallanNo'], 'ChallanDate': this.api.formatDate(element['ChallanDate']),
          'ClientName': element['ClientName'], 'CHALQTY': element['CHALQTY'],
          'Price': element['Price'], 'TotalAmount':element['TotalAmount'],
          'FromDate': this.api.formatDate(element['FromDate']),
          'ToDate': this.api.formatDate(element['ToDate'])
        };
      });
      const lengths = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
      this.api.exportExcel(data, [['Item wise sales Report'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Item wise sales', lengths);
    
    });
  }

  excelNexgenShippingInfo() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.workorderno) {
      this.workorderno = 0;
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
    this.api.getdata(`WorkOrderMasters/getNexgenShippingInfo?company=` + this.companyname + `&workorder=` + this.workorderno + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo)).subscribe((res: any) => {
      this.ExportDeliveryPositionData = res;
      // const data = [['Order Detail ID', 'Order submission date', 'Actual Ship Date', 'Invoice No', 'Override Price', 'Qty to ship', 'Collection Date', 'Collection Amount', 'Shipper Name', 'Tracking No.']];
      // this.ExportDeliveryPositionData.forEach((element) => data.push([element['Order Detail ID'], this.api.formatDate(element['Order submission date']), 
      //this.api.formatDate(element['Actual Ship Date']), element['Invoice No'], element['Override Price'], element['Qty to ship'], element['Collection Date'], 
      //element['Collection Amount'], element['Shipper Name'], element['Tracking No.']]));
      // this.api.exportCsv(data, 'Nexgen Shipping Info', data);

      const data = res.map((element: any) => {
        return {
          'Order Detail ID': element['Order Detail ID'], 'Order submission date': this.api.formatDate(element['Order submission date']), 
          'Actual Ship Date': this.api.formatDate(element['Actual Ship Date']),
          'Invoice No': element['Invoice No'], 'Override Price': element['Override Price'],
          'Against Work Order': element['Against Work Order'], 'Customer':element['Customer'],
          'Qty to ship': element['Qty to ship'],
          'Collection Date': element['Collection Date'], 'Collection Amount': element['Collection Amount'], 'Shipper Name': element['Shipper Name'], 
          'Tracking No.': element['Tracking No.']
        };
      });
      const lengths = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
      this.api.exportExcel(data, [['Nexgen Shipping Info'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Nexgen Shipping Info', lengths);
    
    });
  }

  excelProjectionList() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.productcategory) {
      this.productcategory = 0;
    }
    if (!this.customer) {
      this.customer = 0;
    }
    if (!this.executive) {
      this.executive = 0;
    }
    if (!this.sample) {
      this.sample = 0;
    }
    if (!this.workorderno) {
      this.workorderno = 0;
    }
    if (!this.brandname) {
      this.brandname = 0;
    }
    if (!this.executive) {
      this.executive = 0;
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
    this.api.getdata(`WorkOrderMasters/getProjectionList?company=` + this.companyname + `&brand=` + this.brandname + `&client=` + this.customer + `&salesperson=` + this.executive + `&category=` + this.productcategory + `&sample=` + this.sample + `&workorder=` + this.workorderno + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo) + `&employee=` + this.empid).subscribe((res: any) => {
      this.ExportDeliveryPositionData = res;

      // const data = [['Company', 'Work Order No', 'Order Date', 'Hold Date', 'Customer', 'Buyer', 'Sales Person', 'Category', 'Item', 'Qty', 'Price', 'Value']];
      // this.ExportDeliveryPositionData.forEach((element) => data.push([element['Company'], element['Work Order No'], element['Order Date'], 
      //element['Hold Date'], element['Customer'], element['Buyer'], element['Sales Person'], element['Category'], element['Item'], element['Qty'], element['Price'],
      // element['Value']]));
      // this.api.exportCsv(data, 'Projection List', data);

      const data = res.map((element: any) => {
        return {
          'Company': element['Company'], 'Work Order No': element['Work Order No'], 
          'Order Date': element['Order Date'],
          'Hold Date': element['Hold Date'], 'Customer': element['Customer'],
          'Buyer': element['Buyer'], 'Sales Person':element['Sales Person'],
          'Category': element['Category'],
          'Item': element['Item'], 'Qty': element['Qty'], 'Price': element['Price'], 
          'Value': element['Value']
        };
      });
      const lengths = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
      this.api.exportExcel(data, [['Projection Order List'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Projection Order List', lengths);
    
    });
  }

  excelPPSampleList() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.productcategory) {
      this.productcategory = 0;
    }
    if (!this.customer) {
      this.customer = 0;
    }
    if (!this.executive) {
      this.executive = 0;
    }
    if (!this.sample) {
      this.sample = 0;
    }
    if (!this.workorderno) {
      this.workorderno = 0;
    }
    if (!this.brandname) {
      this.brandname = 0;
    }
    if (!this.executive) {
      this.executive = 0;
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
    this.api.getdata(`WorkOrderMasters/getPPSampleList?company=` + this.companyname + `&brand=` + this.brandname + `&client=` + this.customer + `&salesperson=` + this.executive + `&category=` + this.productcategory + `&sample=` + this.sample + `&workorder=` + this.workorderno + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo) + `&employee=` + this.empid).subscribe((res: any) => {
      this.ExportDeliveryPositionData = res;

      // const data = [['Company', 'Work Order No', 'Order Date', 'Hold Date', 'Customer', 'Buyer', 'Sales Person', 'Category', 'Item', 'Qty', 'Price', 'Value', 'JobCardStatus']];
      // this.ExportDeliveryPositionData.forEach((element) => data.push([element['Company'], element['Work Order No'], element['Order Date'], element['Hold Date'], 
      //element['Customer'], element['Buyer'], element['Sales Person'], element['Category'], element['Item'], element['Qty'], element['Price'], element['Value'], 
      //element['JobCardStatus']]));
      // this.api.exportCsv(data, 'PP Sample List', data);

      const data = res.map((element: any) => {
        return {
          'Company': element['Company'], 'Work Order No': element['Work Order No'], 
          'Order Date': element['Order Date'],
          'Hold Date': element['Hold Date'], 'Customer': element['Customer'],
          'Buyer': element['Buyer'], 'Sales Person':element['Sales Person'],
          'Category': element['Category'],
          'Item': element['Item'], 'Qty': element['Qty'], 'Price': element['Price'], 
          'Value': element['Value'], 'JobCardStatus': element['JobCardStatus']
        };
      });
      const lengths = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
      this.api.exportExcel(data, [['PP Sample List'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'PP Sample List', lengths);
    
    });
  }

  excelSubContactList() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.productcategory) {
      this.productcategory = 0;
    }
    if (!this.customer) {
      this.customer = 0;
    }
    if (!this.executive) {
      this.executive = 0;
    }
    if (!this.sample) {
      this.sample = 0;
    }
    if (!this.workorderno) {
      this.workorderno = 0;
    }
    if (!this.brandname) {
      this.brandname = 0;
    }
    if (!this.executive) {
      this.executive = 0;
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
    this.api.getdata(`WorkOrderMasters/getSubContactList?company=` + this.companyname + `&brand=` + this.brandname + `&client=` + this.customer + `&salesperson=` + this.executive + `&category=` + this.productcategory + `&sample=` + this.sample + `&workorder=` + this.workorderno + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo) + `&employee=` + this.empid).subscribe((res: any) => {
      this.ExportDeliveryPositionData = res;

      // const data = [['Company', 'Work Order No', 'Order Date', 'Hold Date', 'Customer', 'Buyer', 'Sales Person', 'Category', 'Item', 'Qty', 'Price', 'Value', 'CHALQTY', 'ChallanValue', 'DueQty']];
      // this.ExportDeliveryPositionData.forEach((element) => data.push([element['Company'], element['Work Order No'], element['Order Date'], element['Hold Date'], 
      //element['Customer'], element['Buyer'], element['Sales Person'], element['Category'], element['Item'], element['Qty'], element['Price'], element['Value'], 
      //element['CHALQTY'], element['ChallanValue'], element['DueQty']]));
      // this.api.exportCsv(data, 'Sub Contact List', data);

      const data = res.map((element: any) => {
        return {
          'Company': element['Company'], 'Work Order No': element['Work Order No'], 
          'Order Date': element['Order Date'],
          'Hold Date': element['Hold Date'], 'Customer': element['Customer'],
          'Buyer': element['Buyer'], 'Sales Person':element['Sales Person'],
          'Category': element['Category'],
          'Item': element['Item'], 'Qty': element['Qty'], 'Price': element['Price'], 
          'Value': element['Value'], 'CHALQTY': element['CHALQTY'], 'ChallanValue': element['ChallanValue'], 'DueQty': element['DueQty']
        };
      });
      const lengths = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
      this.api.exportExcel(data, [['Sub Contact List'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Sub Contact List', lengths);
    
    });
  }

  excelSubContractReceiveRegister() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.productcategory) {
      this.productcategory = 0;
    }
    if (!this.customer) {
      this.customer = 0;
    }
    if (!this.executive) {
      this.executive = 0;
    }
    if (!this.sample) {
      this.sample = 0;
    }
    if (!this.workorderno) {
      this.workorderno = 0;
    }
    if (!this.brandname) {
      this.brandname = 0;
    }
    if (!this.executive) {
      this.executive = 0;
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
    this.api.getdata(`WorkOrderMasters/getSubContractReceiveRegister?company=` + this.companyname + `&brand=` + this.brandname + `&client=` + this.customer + `&salesperson=` + this.executive + `&category=` + this.productcategory + `&sample=` + this.sample + `&workorder=` + this.workorderno + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo) + `&employee=` + this.empid).subscribe((res: any) => {
      this.ExportDeliveryPositionData = res;
      // const data = [['WorkOrderNo', 'OrderReceiveDate', 'EstDeliverDate', 'ClientName', 'BrandName', 'CustomerPONo', 'SampleName', 'OrderQty', 'ChallanNo', 'ChallanDate', 'CHALQTY', 'FromDate', 'ToDate']];
      // this.ExportDeliveryPositionData.forEach((element) => data.push([element['WorkOrderNo'], this.api.formatDate(element['OrderReceiveDate']), 
      //this.api.formatDate(element['EstDeliverDate']), element['ClientName'], element['BrandName'], element['CustomerPONo'], element['SampleName'], 
      //element['OrderQty'], element['ChallanNo'], this.api.formatDate(element['ChallanDate']), element['CHALQTY'], this.api.formatDate(element['FromDate']), 
      //this.api.formatDate(element['ToDate'])]));
      // this.api.exportCsv(data, 'Sub Contract Receive Register', data);

      const data = res.map((element: any) => {
        return {
          'WorkOrderNo': element['WorkOrderNo'], 'OrderReceiveDate': this.api.formatDate(element['OrderReceiveDate']), 
          'EstDeliverDate': this.api.formatDate(element['EstDeliverDate']),
          'ClientName': element['ClientName'], 'BrandName': element['BrandName'],
          'CustomerPONo': element['CustomerPONo'], 'SampleName':element['SampleName'],
          'OrderQty': element['OrderQty'],
          'ChallanNo': element['ChallanNo'], 'ChallanDate': this.api.formatDate(element['ChallanDate']), 'CHALQTY': element['CHALQTY'], 
          'FromDate': element['FromDate'], 'ToDate': element['ToDate']
        };
      });
      const lengths = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
      this.api.exportExcel(data, [['Sub Contract Receive Register'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Sub Contract Receive Register', lengths);
    
    });
  }

  excelSubContractReceivePosition() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.productcategory) {
      this.productcategory = 0;
    }
    if (!this.customer) {
      this.customer = 0;
    }
    if (!this.executive) {
      this.executive = 0;
    }
    if (!this.sample) {
      this.sample = 0;
    }
    if (!this.workorderno) {
      this.workorderno = 0;
    }
    if (!this.brandname) {
      this.brandname = 0;
    }
    if (!this.executive) {
      this.executive = 0;
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
    this.api.getdata(`WorkOrderMasters/getSubContractReceivePosition?company=` + this.companyname + `&brand=` + this.brandname + `&client=` + this.customer + `&salesperson=` + this.executive + `&category=` + this.productcategory + `&sample=` + this.sample + `&workorder=` + this.workorderno + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo) + `&employee=` + this.empid).subscribe((res: any) => {
      this.ExportDeliveryPositionData = res;
      // const data = [['WorkOrderNo', 'OrderReceiveDate', 'EstDeliverDate', 'ClientName', 'BrandName', 'CustomerPONo', 'SampleName', 'OrderQty', 'CHALQTY', 'Due']];
      // this.ExportDeliveryPositionData.forEach((element) => data.push([element['WorkOrderNo'], this.api.formatDate(element['OrderReceiveDate']), 
      //this.api.formatDate(element['EstDeliverDate']), element['ClientName'], element['BrandName'], element['CustomerPONo'], element['SampleName'], 
      //element['OrderQty'], element['CHALQTY'], element['Due']]));
      // this.api.exportCsv(data, 'Sub Contract Receive Position', data);

      const data = res.map((element: any) => {
        return {
          'WorkOrderNo': element['WorkOrderNo'], 'OrderReceiveDate': this.api.formatDate(element['OrderReceiveDate']), 
          'EstDeliverDate': this.api.formatDate(element['EstDeliverDate']),
          'ClientName': element['ClientName'], 'BrandName': element['BrandName'],
          'CustomerPONo': element['CustomerPONo'], 'SampleName':element['SampleName'],
          'OrderQty': element['OrderQty'],
          'CHALQTY': element['CHALQTY'], 'Due': element['Due']
        };
      });
      const lengths = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
      this.api.exportExcel(data, [['Sub Contract Receive Position'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Sub Contract Receive Position', lengths);
    
    });
  }

  excelTotalOrderStatusReport() {
    if (!this.companyname) {
      this.companyname = 0;
    }
    if (!this.productcategory) {
      this.productcategory = 0;
    }
    if (!this.customer) {
      this.customer = 0;
    }
    if (!this.executive) {
      this.executive = 0;
    }
    if (!this.sample) {
      this.sample = 0;
    }
    if (!this.workorderno) {
      this.workorderno = 0;
    }
    if (!this.brandname) {
      this.brandname = 0;
    }
    if (!this.executive) {
      this.executive = 0;
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
    this.api.getdata(`WorkOrderMasters/getTotalOrderStatusReport?company=` + this.companyname + `&brand=` + this.brandname + `&client=` + this.customer + `&salesperson=` + this.executive + `&category=` + this.productcategory + `&sample=` + this.sample + `&workorder=` + this.workorderno + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo) + `&employee=` + this.empid).subscribe((res: any) => {
      this.ExportDeliveryPositionData = res;
      // const data = [['Type', 'Sub Type', 'Work Order No', 'Order Date', 'Release Date', 'Receive Date', 'Job Card Date', 'Challan No', 'Challan Date', 'Party Name', 'Brand Name', 'Company Name', 'Item Name', 'Order Qty', 'Challan Qty', 'Due Qty', 'Rate', 'Amount']];
      // this.ExportDeliveryPositionData.forEach((element) => data.push([element['Type'], element['Sub Type'], element['Work Order No'], 
      //this.api.formatDate(element['Order Date']), this.api.formatDate(element['Release Date']), this.api.formatDate(element['Receive Date']), 
      //this.api.formatDate(element['Job Card Date']), element['Challan No'], this.api.formatDate(element['Challan Date']), element['Party Name'], 
      //element['Brand Name'], element['Company Name'], element['Item Name'], element['Order Qty'], element['Challan Qty'], element['Due Qty'], element['Rate'], 
      //element['Amount']]));
      // this.api.exportCsv(data, 'Total Order Status Report', data);

      const data = res.map((element: any) => {
        return {
          'Type': element['Type'], 'Sub Type': element['Sub Type'], 
          'Work Order No': element['Work Order No'],
          'Order Date': this.api.formatDate(element['Order Date']), 'Release Date': this.api.formatDate(element['Release Date']),
          'Receive Date': this.api.formatDate(element['Receive Date']), 'Job Card Date': this.api.formatDate(element['Job Card Date']),
          'Challan No': element['Challan No'],
          'Challan Date': this.api.formatDate(element['Challan Date']), 'Party Name': element['Party Name'], 'Brand Name': element['Brand Name'], 'Company Name': element['Company Name'],
          'Item Name': element['Item Name'], 'Order Qty': element['Order Qty'], 'Challan Qty': element['Challan Qty'], 'Due Qty': element['Due Qty'], 
          'Rate': element['Rate'], 'Amount': element['Amount']
        };
      });
      const lengths = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
      this.api.exportExcel(data, [['Total Order Status Report'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Total Order Status Report', lengths);
    
    });
  }

  excelCategorywisePlanSheet() {
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
    this.api.getdata(`WorkOrderMasters/getCategorywisePlanSheet?fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo)).subscribe((res: any) => {
      this.ExportDeliveryPositionData = res;

      // const data = [['Category', 'Item', 'Size', 'Challan Qty', 'Order Qty', 'Stock Qty']];
      // this.ExportDeliveryPositionData.forEach((element) => data.push([element['Category'], element['Item'], element['Size'], element['Challan Qty'], 
      //element['Order Qty'], element['Stock Qty']]));
      // this.api.exportCsv(data, 'Category wise Plan Sheet', data);

      const data = res.map((element: any) => {
        return {
          'Category': element['Category'], 'Item': element['Item'], 
          'Size': element['Size'],
          'Challan Qty': element['Challan Qty'], 'Order Qty': element['Order Qty'],
          'Stock Qty': element['Stock Qty']
        };
      });
      const lengths = [20, 20, 20, 20, 20, 20];
      this.api.exportExcel(data, [['Category wise Plan Sheet'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Category wise Plan Sheet', lengths);

    });
  }

  excelWovenPlanwiseReport() {
    const fromDate = this.api.formatDate(this.searchFrom);
    const toDate = this.api.formatDate(this.searchTo);
    this.api.getdata(`WorkOrderMasters/getWovenPlanwiseReport`).subscribe((res: any) => {
      this.ExportDeliveryPositionData = res;

      // const data = [['SLNo', 'MachineNo', 'WorkOrderNo', 'SampleName', 'PlanQty', 'Cutter', 'Pick', 'RPM', 'Minutes', 'ProductionHour']];
      // this.ExportDeliveryPositionData.forEach((element) => data.push([element['SLNo'], element['MachineNo'], element['WorkOrderNo'], element['SampleName'], 
      //element['PlanQty'], element['Cutter'], element['Pick'], element['RPM'], element['Minutes'], element['ProductionHour']]));
      // this.api.exportCsv(data, 'Woven Plan wise Report', data);

      const data = res.map((element: any) => {
        return {
          'SLNo': element['SLNo'], 'MachineNo': element['MachineNo'], 
          'WorkOrderNo': element['WorkOrderNo'],
          'SampleName': element['SampleName'], 'PlanQty': element['PlanQty'],
          'Cutter': element['Cutter'], 'Pick': element['Pick'], 'RPM': element['RPM'], 'Minutes': element['Minutes'], 'ProductionHour': element['ProductionHour']
        };
      });
      const lengths = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
      this.api.exportExcel(data, [['Woven Plan wise Report'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Woven Plan wise Report', lengths);

    });
  }

  excelExportOrderwithPart() {
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
    const fromDate = this.api.formatDate(this.searchFrom);
    const toDate = this.api.formatDate(this.searchTo);
    this.api.getdata(`WorkOrderMasters/getExportOrderwithPart?company=` + this.companyname + `&category=` + this.productcategory + `&fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo)).subscribe((res: any) => {
      this.ExportDeliveryPositionData = res;

      // const data = [['Order No', 'Order Date', 'Party Name', 'PO No', 'URN No', 'MC Style', 'Buyer Name', 'CS', 'ProductCategoryName', 'Item Name', 'Part', 'Color', 'Style', 'Total Qty', 'Qty With Part', 'Rate/1000', 'Total Amount']];
      // this.ExportDeliveryPositionData.forEach((element) => data.push([element['Order No'], element['Order Date'], element['Party Name'], element['PO No'], 
      //element['URN No'], element['MC Style'], element['Buyer Name'], element['CS'], element['ProductCategoryName'], element['Item Name'], element['Part'], 
      //element['Color'], element['Style'], element['Total Qty'], element['Qty With Part'], element['Rate/1000'], element['Total Amount']]));
      // this.api.exportCsv(data, 'Export Order with Part', data);

      const data = res.map((element: any) => {
        return {
          'Order No': element['Order No'], 'Order Date': element['Order Date'], 
          'Party Name': element['Party Name'],
          'PO No': element['PO No'], 'URN No': element['URN No'],
          'MC Style': element['MC Style'], 'Buyer Name': element['Buyer Name'], 'CS': element['CS'], 'ProductCategoryName': element['ProductCategoryName'],
          'Item Name': element['Item Name'], 'Color': element['Color'], 'Style': element['Style'], 'Total Qty': element['Total Qty'], 
          'Qty With Part': element['Qty With Part'], 'Rate/1000': element['Rate/1000'], 'Total Amount': element['Total Amount']
        };
      });
      const lengths = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
      this.api.exportExcel(data, [['Export Order with Part'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Export Order with Part', lengths);


    });
  }



}
