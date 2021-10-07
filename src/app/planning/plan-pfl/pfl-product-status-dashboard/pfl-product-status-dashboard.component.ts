import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SuiModalService} from 'ng2-semantic-ui';
import {element} from 'protractor';

@Component({
  selector: 'app-pfl-product-status-dashboard',
  templateUrl: './pfl-product-status-dashboard.component.html',
  styleUrls: ['./pfl-product-status-dashboard.component.css']
})
export class PflProductStatusDashboardComponent implements OnInit {
  fromDate: Date;
  toDate: Date;
  workOrdernumber: string;
    history: any;
   tabledata: any;
   selectedCards: any[];
   selectAllCard: any;
   pflDesigns: any;
     printdata: any;
     cuttingdata: any;
     finishdata: any;
     dataList: any;
    meta: {
        totalItemCount: number,
        totalPageCount: number,
        itemsPerPage: number,
        currentPage: number,
        nextPage: number,
    };
     dataForExcel: any;
  constructor(
      public api: ApiService,
      public route: ActivatedRoute,
      public tost: ApiService,
      public router: Router,
      public modalService: SuiModalService
  ) {
      this.meta = {
          totalItemCount: 0,
          totalPageCount: 0,
          itemsPerPage: 10,
          currentPage: 1,
          nextPage: 0,
      };
  }

  ngOnInit() {
    this.getTableData();
  }
  getTableData() {let link = `PflPlannings/getPflDashboardTableData?`;
      if (this.workOrdernumber) link += '&workorderno='+this.workOrdernumber;

    // this.api.showInfoToast('there is lots of record please wait to load the data');
    this.api.getdata(link).subscribe((res: any) => {
        this.dataForExcel = res;
        this.tabledata = res;
        this.meta.totalItemCount = this.tabledata.length;
        this.dataList = this.tabledata.slice(0, this.meta.itemsPerPage);
      console.log(this.tabledata);
    });
  }
pageChange() {
    const start = (this.meta.currentPage - 1) * this.meta.itemsPerPage;
    const end = start + this.meta.itemsPerPage
    this.dataList = this.tabledata.slice(start, end);
}
  // searchstatus() {
  //   this.api.getdata(`PflPlannings/getPflDashboardTableData?workorderno=` + this.workOrdernumber).subscribe((res: any) => {
  //       this.dataForExcel = res;
  //       this.dataList = res;
  //     console.log(this.dataList);
  //   });
  // }
  selectAll() {
    this.selectedCards = [];
    if (this.selectAllCard) {
      this.pflDesigns.forEach(item => {
        item.selected = true;
        this.selectedCards.push(item);
        console.log(this.selectedCards);
      });
    } else {
      this.pflDesigns.forEach(item => {
        item.selected = false;
        console.log(this.selectedCards);

      });
      this.selectedCards = [];
    }
  }
  selectCards(item, i) {
    if (item.selected === true) {
      this.selectedCards.push(item);
      console.log(this.selectedCards);
    } else {
      const index = this.selectedCards.indexOf(item);
      if (index !== -1) {
        this.selectedCards.splice(index, 1);
      }
      console.log(this.selectedCards);
      // this.selectedCards = false;
    }
  }
  excelstatus() {

  }
   public generateExcelOfSearchedData() {
    const data = this.dataForExcel.map(( element: any) => {
      return {
               'Work Order No' : element['Work Order No'],
                'Order Date' : element['Order Date'],
           'Delivery Date' : element['Delivery Date'],
       'Order Qty' : element['Order Qty'],
       'Job Qty' : element['Job Qty'],
       'Item Name' : element['Item Name'],
       'Planning Status' : element['Planning Status'],
       'Plan Date Time' : element['Plan Date Time'],
       'Designer Status' : element['Designer Status'],
       'Design Date Time' : element['Design Date Time'],
       'Designer' : element['Designer'],
       'Prof Reading Status' : element['Prof Reading Status'],
       'Prof Reading Date Time' : element['Prof Reading Date Time'],
       'Prof Reader Name' : element['Prof Reader Name'],
       'Printing Status' : element['Printing Status'],
       'Printing Date Time' : element['Printing Date Time'],
       'Printing Operator' : element['Printing Operator'],
       'Cutting Status': element['Cutting Status'],
       'Cutting Date Time' : element['Cutting Date Time'],
       'Cutting Operator' : element['Cutting Operator'],
       'Curring Status' : element['Curring Status'],
       'Curring Date Time' : element['Curring Date Time'],
       'Curring User' : element['Curring User'],
       'Lab Test Status' : element['Lab Test Status'],
       'Lab Date Time' : element['Lab Date Time'],
       'Lab Tester' : element['Lab Tester'],
       'Finishing Status'  : element['Finishing Status'],
       'Finishing Date Time' : element['Finishing Date Time'],
       'Finisher Name': element['Finisher Name'],
       'AQL Status' : element['AQL Status'],
       'AQL Date Time' : element['AQL Date Time'],
       'AQL User' : element['AQL User']
      };
    });
    const lengths = [22, 10, 30, 30, 11, 15, 25, 20, 20, 8, 13, 10, 10, 10, 18];
    this.api.exportExcel(data, [[' Pfl Planning Status Report'], []], ' Pfl Planning Status Report',  lengths);
  }
    exportToPDF() {
                this.api.savePdf(this.getDataForPDF(this.dataForExcel), 'A2', 'landscape', 'planningstatus', 'auto');
    }
    getDataForPDF(data) {
        const Data = [[
            'S No.',
            'Work Order No' ,
            'Order Date' ,
            'Delivery Date' ,
            'Order Qty' ,
            'Job Qty' ,
            'Item Name' ,
            'Planning Status' ,
            'Plan Date Time' ,
            'Designer Status' ,
            'Design Date Time' ,
            'Designer'  ,
            'Prof Reading Status' ,
            'Prof Reading Date Time',
            'Prof Reader Name' ,
            'Printing Status' ,
            'Printing Date Time' ,
            'Printing Operator' ,
            'Cutting Status',
            'Cutting Date Time' ,
            'Cutting Operator' ,
            'Curring Status' ,
            'Curring Date Time' ,
            'Curring User' ,
            'Lab Test Status' ,
            'Lab Date Time' ,
            'Lab Tester' ,
            'Finishing Status'  ,
            'Finishing Date Time' ,
            'Finisher Name',
            'AQL Status' ,
            'AQL Date Time' ,
            'AQL User' ]];
        const sampleData = data.map(this.mapData);
        sampleData.forEach((elements, i) => {
            Data.push([
                i + 1,
                elements.Workorderno,
                elements.Orderdate ,
                elements.Delivery ,
                elements.Orderqty ,
                elements.Jobqty ,
                elements.Itemname ,
                elements.Planning ,
                elements.Plandate ,
                elements.Designerstatus ,
                elements.Designdate ,
                elements.Designer ,
                elements.Profstatus,
                elements.Profdate ,
                elements.Profreader,
                elements.Printingstatus ,
                elements.Printingdate ,
                elements.Printingoperator ,
                elements.Cutting ,
                elements.Cuttingdate,
                elements.Cuttingoperator ,
                elements.Curringstatus ,
                elements.Curringdate ,
                elements.Curringuser ,
                elements.Labstatus ,
                elements.Labdate,
                elements.Labtester ,
                elements.Finishingstatus ,
                elements.Finishingdate  ,
                elements.Finishername,
                elements.AQLstatus,
                elements.AQLdate ,
                elements.AQLuser
            ]);
        });
        return Data;
    }
    mapData(item) {
        return {
            Workorderno : item['Work Order No'],
            Orderdate : item['Order Date'],
            Delivery : item['Delivery Date'],
            Orderqty : item['Order Qty'],
            Jobqty : item['Job Qty'],
            Itemname : item['Item Name'],
            Planning : item['Planning Status'],
            Plandate : item['Plan Date Time'],
            Designerstatus : item['Designer Status'],
            Designdate : item['Design Date Time'],
            Designer: item['Designer'],
            Profstatus : item['Prof Reading Status'],
            Profdate : item['Prof Reading Date Time'],
            Profreader : item['Prof Reader Name'],
            Printingstatus : item['Printing Status'],
            Printingdate : item['Printing Date Time'],
            Printingoperator : item['Printing Operator'],
            Cutting: item['Cutting Status'],
            Cuttingdate : item['Cutting Date Time'],
            Cuttingoperator : item['Cutting Operator'],
            Curringstatus : item['Curring Status'],
            Curringdate : item['Curring Date Time'],
            Curringuser : item['Curring User'],
            Labstatus : item['Lab Test Status'],
            Labdate : item['Lab Date Time'],
            Labtester : item['Lab Tester'],
            Finishingstatus  : item['Finishing Status'],
            Finishingdate : item['Finishing Date Time'],
            Finishername : item['Finisher Name'],
            AQLstatus : item['AQL Status'],
            AQLdate : item['AQL Date Time'],
            AQLuser : item['AQL User']
        };
    }

    PrintStatusReport() {
      if (!this.fromDate && !this.toDate && !this.selectedCards) {
          this.api.showWarningToast('please select date or check record from table');
      }
        this.api.getdata('ProductionCuttings/getExcelReportForPrintStatus?fromDate=' +
            this.fromDate.toJSON() + '&toDate=' + this.toDate.toJSON()).subscribe((res: any) => {
            this.printdata = res;
            console.log(this.printdata);
        });
        setTimeout(() => {
            const data = this.printdata.map(( element: any) => {
                return {
                    'Work Order No' : element['WorkOrderNo'], 'Order Date' : element['OrderDate'], 'Delivery Date' : element['DeliveryDate'],
                    'Print Qty' : element['Print Qty'], 'Job Qty' : element['JobQty'], 'Order Qty' : element['OrderQty'],
                    'Item Name' : element['ItemName'], 'Printing End Date Time' : element['Printing End Date Time'],
                    'Printing Start Date Time' : element['Printing Start Date Time'], 'Item Length' : element['ItemLength'], 'MachineNo' : element['MachineNo'],
                    'Part' : element['Part'], 'Print Date' : element['Print Date'], 'Ribbon' : element['Ribbon'],
                    'Total Time' : element['Total Time'], 'EntryBy' : element['EntryBy']
                };
            });
            const lengths = [22, 10, 30, 30, 11, 15, 25, 20, 20, 8, 13, 10, 10, 10, 18];
            this.api.exportExcel(data, [[' Pfl Printing Status Report'], []], ' Pfl Printing Status Report',  lengths);
        }, 1500);
    }

    cuttingStatusReport() {
        if (!this.fromDate && !this.toDate && !this.selectedCards) {
            this.api.showWarningToast('please select date or check record from table');
        }
        this.api.getdata('ProductionCuttings/getExcelReportForCuttingStatus?fromDate=' +
            this.fromDate.toJSON() + '&toDate=' + this.toDate.toJSON()).subscribe((res: any) => {
            this.cuttingdata = res;
            console.log(this.cuttingdata);
        });
        setTimeout(() => {
            const data = this.cuttingdata.map(( element: any) => {
                return {
                    'Work Order No' : element['WorkOrderNo'], 'Order Date' : element['OrderDate'], 'Delivery Date' : element['DeliveryDate'],
                    'Cutting Qty' : element['Cutting Qty'], 'Job Qty' : element['JobQty'], 'Order Qty' : element['OrderQty'],
                    'Item Name' : element['ItemName'], 'Cutting End Date Time' : element['Cutting End Date Time'],
                    'Cutting Start Date Time' : element['Cutting Start Date Time'], 'MachineNo' : element['MachineNo'],
                    'Part' : element['Part'], 'Cutting Date' : element['Cutting Date'],
                    'Total Time' : element['Total Time'], 'EntryBy' : element['EntryBy']
                };
            });
            const lengths = [22, 10, 30, 30, 11, 15, 25, 20, 20, 8, 13, 10, 10, 10, 18];
            this.api.exportExcel(data, [[' Pfl Cutting Status Report'], []], ' Pfl Cutting Status Report',  lengths);
        }, 1500);
    }

    finishStatusReport() {
        let link = `ProductionCuttings/getExcelReportForFinishStatus?`;
        if (this.workOrdernumber) link += '&workorderno='+this.workOrdernumber;
        if (this.fromDate) link += '&fromdate='+encodeURIComponent(this.fromDate.toJSON());
        if (this.toDate) link += '&todate='+encodeURIComponent(this.toDate.toJSON());
            this.api.getdata(link).subscribe((res: any) => {
                this.finishdata = res;
                console.log(this.finishdata);
            });
        setTimeout(() => {
            const data = this.finishdata.map(( element: any) => {
                return {
                    'Work Order No' : element['WorkOrderNo'], 'Order Date' : element['OrderDate'], 'Delivery Date' : element['DeliveryDate'],
                    'Print Qty' : element['Print Qty'], 'Job Qty' : element['JobQty'], 'Order Qty' : element['OrderQty'],
                    'Item Name' : element['ItemName'], 'Printing End Date Time' : element['Printing End Date Time'],
                    'Printing Start Date Time' : element['Printing Start Date Time'], 'Item Length' : element['ItemLength'], 'MachineNo' : element['MachineNo'],
                    'Part' : element['Part'], 'Print Date' : element['Print Date'], 'Ribbon' : element['Ribbon'],
                    'Total Time' : element['Total Time'], 'EntryBy' : element['EntryBy']
                };
            });
            const lengths = [22, 10, 30, 30, 11, 15, 25, 20, 20, 8, 13, 10, 10, 10, 18];
            this.api.exportExcel(data, [[' Pfl Finishing Status Report'], []], ' Pfl Finishing Status Report',  lengths);
        }, 1500);
    }
}
