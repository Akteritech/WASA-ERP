import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ngxCsv } from 'ngx-csv';

@Component({
  selector: 'app-productioncapecityreport',
  templateUrl: './productioncapecityreport.component.html',
  styleUrls: ['./productioncapecityreport.component.css']
})
export class ProductioncapecityreportComponent implements OnInit {
  searchFrom: Date;
  searchTo: Date;
  orderAnalize: any;
  productionCapacity: any;
  constructor(public api: ApiService) { }

  ngOnInit() {
  }

  getOrderAnalyze() {
    if (!this.searchFrom) {
      this.api.showWarningToast('Please select From Date');
      return;
    }
    if (!this.searchTo) {
      this.api.showWarningToast('Please select To Date');
      return;
    }
    this.api.getdata(`WorkOrderMasters/getOrderAnalyze?fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo)).subscribe((res: any) => {
      this.orderAnalize = res;
      console.log(this.orderAnalize);
    });
  }

  getProductionCapacity() {
    if (!this.searchFrom) {
      this.api.showWarningToast('Please select From Date');
      return;
    }
    if (!this.searchTo) {
      this.api.showWarningToast('Please select To Date');
      return;
    }

    this.api.getdata(`WorkOrderMasters/getProductionCapacity?fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo)).subscribe((res: any) => {
      this.productionCapacity = res;
      console.log(this.productionCapacity);
    });
  }

  reset() {
    this.searchFrom = null;
    this.searchTo = null;
  }

  pdfOrderAnalize() {
    const fromDate = this.api.formatDate(this.searchFrom);
    const toDate = this.api.formatDate(this.searchTo);
    const data = [['Department', 'Buyer', 'Month', 'Sample Name', 'Quantity', 'Value', 'Color']];
    this.orderAnalize.forEach((element) => data.push([element['Dept'], element['Buyer'], element['Month'], element['Sample Name'], element['Qty'], element['Value'], element['Color']]));
    this.api.pdfReport(data, 'Order Analyze Report', 'portrait', 'From: ' + fromDate + ' to: ' + toDate);
  }

  generateExcel() {
    this.api.getdata(`WorkOrderMasters/getOrderAnalyze?fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo)).subscribe((res: any) => {
      this.orderAnalize = res;
      console.log(this.orderAnalize);
      // const data = [['Department', 'Buyer', 'Month', 'Sample Name', 'Quantity', 'Value', 'Color']];
      // this.orderAnalize.forEach((element) => data.push([element['Dept'], element['Buyer'], element['Month'], element['Sample Name'], element['Qty'], element['Value'], element['Color']]));
      // this.api.exportCsv(data, 'Order Analyze Report', data);

      const data = res.map((element: any) => {
        return {
          'Department': element['Dept'], 'Buyer': element['Buyer'], 'Month': element['Month'],
          'Sample Name': element['Sample Name'], 'Qty': element['Qty'], 
          'Value': element['Value'], 
          'Color': element['Color']
        };
      });
      const lengths = [25, 30, 10, 35, 20, 20, 20];
      this.api.exportExcel(data, [['Order Analyze Report'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Order Analyze Report', lengths);


    });
  }
  pdfProductionCapacity() {
    const fromDate = this.api.formatDate(this.searchFrom);
    const toDate = this.api.formatDate(this.searchTo);
    const data = [['Department', 'No of Shift', 'Capacity (PCS)', 'Carried/Forward Qty', 'Carried/Forward Value', 'Challan Qty Without Set', 'Challan Qty With Set', 'Average Rate', 'Value', 'Acheivement Against Capacity %', 'FinishStockQty', 'HMQty', 'HMQtyWithPart', 'HMAmt', 'NexgenQty', 'NexgenAmt', 'BywaysQty', 'BywaysAmt', 'COQty', 'COAmt', 'CRQty', 'CRAmt', 'BCQty', 'BCAmt', 'OthersQty', 'OthersAmt', 'TotalQty', 'TotalAmt']];
    this.productionCapacity.forEach((element) => data.push([element['Dept'], element['No of Shift'], element['Capacity (PCS)'], element['Carried/Forward Qty'], element['Carried/Forward Value'], element['Challan Qty Without Set'], element['Challan Qty With Set'], element['Average Rate'], element['Value'], element['Acheivement Against Capacity %'], element['FinishStockQty'], element['HMQty'], element['HMQtyWithPart'], element['HMAmt'], element['NexgenQty'], element['NexgenAmt'], element['BywaysQty'], element['BywaysAmt'], element['COQty'], element['COAmt'], element['CRQty'], element['CRAmt'], element['BCQty'], element['BCAmt'], element['OthersQty'], element['OthersAmt'], element['TotalQty'], element['TotalAmt']]));
    this.api.pdfReportProduction(data, 'Production Capacity Report', 'portrait', 'From: ' + fromDate + ' to: ' + toDate);
  }

  excelProductionCapacity() {
    this.api.getdata(`WorkOrderMasters/getProductionCapacity?fromDate=` + this.api.formatDate(this.searchFrom) + `&toDate=` + this.api.formatDate(this.searchTo)).subscribe((res: any) => {
      this.productionCapacity = res;
      // console.log(this.productionCapacity);
      // const data = [['Department', 'No of Shift', 'Capacity (PCS)', 'Carried/Forward Qty', 'Carried/Forward Value', 'Challan Qty Without Set', 'Challan Qty With Set', 'Average Rate', 'Value', 'Acheivement Against Capacity %', 'FinishStockQty', 'HMQty', 'HMQtyWithPart', 'HMAmt', 'NexgenQty', 'NexgenAmt', 'BywaysQty', 'BywaysAmt', 'COQty', 'COAmt', 'CRQty', 'CRAmt', 'BCQty', 'BCAmt', 'OthersQty', 'OthersAmt', 'TotalQty', 'TotalAmt']];
      // this.productionCapacity.forEach((element) => data.push([element['Dept'], element['No of Shift'], element['Capacity (PCS)'], element['Carried/Forward Qty'], element['Carried/Forward Value'], element['Challan Qty Without Set'], element['Challan Qty With Set'], element['Average Rate'], element['Value'], element['Acheivement Against Capacity %'], element['FinishStockQty'], element['HMQty'], element['HMQtyWithPart'], element['HMAmt'], element['NexgenQty'], element['NexgenAmt'], element['BywaysQty'], element['BywaysAmt'], element['COQty'], element['COAmt'], element['CRQty'], element['CRAmt'], element['BCQty'], element['BCAmt'], element['OthersQty'], element['OthersAmt'], element['TotalQty'], element['TotalAmt']]));
      // this.api.exportCsv(data, 'Production Capacity Report', data);

      const data = res.map((element: any) => {
        return {
          'Department': element['Dept'], 'No of Shift': element['No of Shift'], 'Capacity (PCS)': element['Capacity (PCS)'],
          'Carried/Forward Qty': element['Carried/Forward Qty'], 'Carried/Forward Value': element['Carried/Forward Value'], 
          'Challan Qty Without Set': element['Challan Qty Without Set'], 
          'Challan Qty With Set': element['Challan Qty With Set'], 'Average Rate':element['Average Rate'], 'Value':element['Value'], 
          'Acheivement Against Capacity %':element['Acheivement Against Capacity %'], 'FinishStockQty':element['FinishStockQty'], 'Description':element['Description'],
           'HMQty':element['HMQty'], 'HMQtyWithPart':element['HMQtyWithPart'], 'HMAmt':element['HMAmt'], 
           'NexgenQty':element['NexgenQty'], 'NexgenAmt':element['NexgenAmt'], 'BywaysQty':element['BywaysQty'], 
           'BywaysAmt':element['BywaysAmt'], 'COQty':element['COQty'], 'COAmt':element['COAmt'],
           'CRQty':element['CRQty'], 'CRAmt':element['CRAmt'], 'BCQty':element['BCQty'],
           'BCAmt':element['BCAmt'], 'OthersQty':element['OthersQty'], 'OthersAmt':element['OthersAmt'], 
           'TotalQty':element['TotalQty'], 'TotalAmt':element['TotalAmt']
        };
      });
      const lengths = [15, 15, 13, 15, 20, 10, 10, 10, 15, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12];
      this.api.exportExcel(data, [['Production Capacity Report'], ['From ' + this.api.formatDate(this.searchFrom) + ' To ' + this.api.formatDate(this.searchTo)]], 'Production Capacity', lengths);


    });
  }

}
