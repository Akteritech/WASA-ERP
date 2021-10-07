import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../api.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {ActualWastageEntry} from "../models/actual-wastage-entry";

@Component({
  selector: 'app-woven-actual-wastage-entry',
  templateUrl: './woven-actual-wastage-entry.component.html',
  styleUrls: ['./woven-actual-wastage-entry.component.css']
})
export class WovenActualWastageEntryComponent implements OnInit {
    workOrdernumber: any;
  fromDate: any;
  toDate: any;
  wastagedate: any;
  orderqty: any;
  Remarks: any;
  TotalWastageQty: any;
  TotalOrderQty: any;
  WastageDate: any;
  WorkOrderID: any;
  showSearchForm = false ;
   workOrders: any;
   wastage: any;
  meta: {
    totalItemCount: number,
    totalPageCount: number,
    itemsPerPage: number,
    currentPage: number,
    nextPage: number,
  };
   wastageEntry: any;
   goToPage: any;
   collectionSize: any;
  workorder: string;
   editId: any;
   currentRoute: string;
   selectedSamples: any[];
   selectAllSamples: any;
   orderQty: any;
  constructor(
      public api: ApiService,
      public route: ActivatedRoute,
      public tost: ApiService,
      public router: Router
  ) {
    this.wastage = new ActualWastageEntry();
    this.meta = {
      totalItemCount: 0,
      totalPageCount: 0,
      itemsPerPage: 10,
      currentPage: 1,
      nextPage: 0,
    };
    this.workorder = '';
    this.toDate = '2500-01-01';
    this.fromDate = '1901-01-01';
    this.route.params.subscribe(param => {
      if (param.id) {
        this.editId = param.id;
        this.getDataById(param.id);
      }
    });
    this.router.events.subscribe(
        (event: any) => {
          if (event instanceof NavigationEnd) {
            this.currentRoute = this.router.url;
          }
        }
    );
  }
  getItemCount() {
    let filter: any = {};
    filter['WastageID'] = this.wastage.WastageID;
    filter = JSON.stringify(filter);
    this.api.getdata('actual-wastage-quantities/count?where=' + filter ).subscribe( (res: any) => {
      this.collectionSize = res.count;
      this.meta.currentPage = 1;
      this.get();
    }, err => {
      console.log(err);
    });
  }
  optionsLookupWorkOrder(query) {
    this.api.getdata('WorkOrderMasters?filter={"limit":10,"where":{"workorderno":{"like":"%25' + query + '%25"}}}').subscribe( (res: any) => {
      this.workOrders = res;
      console.log(this.workOrders);
    }, error1 => {
      console.log('error1 ', error1);
    });
  }
  ngOnInit() {
    if (!this.editId) {
      this.optionsLookupWorkOrder('a');
    }
    this.wastageEntry = [];
  }

  save() {
    if (this.currentRoute.toString().includes('woven')) {
      this.api.patchdata('actual-wastage-quantities/insertActualWastage' , this.wastage).subscribe( (res: any) => {
        console.log(res);
        this.api.showSuccessToast(' Record added successfully');
      });
    } else if (this.currentRoute.toString().includes('screen-print')) {
      this.api.patchdata('actual-wastage-quantities/insertActualWastageFormScreenPrint' , this.wastage).subscribe( (res: any) => {
        console.log(res);
        this.api.showSuccessToast(' Record added successfully');
      });
    }

  }
  update() {
    if (this.currentRoute.toString().includes('woven')) {
      this.api.patchdata('actual-wastage-quantities/updateActualWastage' , this.wastage).subscribe( (res: any) => {
        console.log(res);
        this.api.showSuccessToast(' Record added successfully');
      });
    } else if (this.currentRoute.toString().includes('screen-print')) {
      this.api.patchdata('actual-wastage-quantities/updateActualWastageForScreenPrint' , this.wastage).subscribe( (res: any) => {
        console.log(res);
        this.api.showSuccessToast(' Record added successfully');
      });
    }
  }
  goToPageNo() {
    this.wastageEntry.forEach(item => {
      item.selected = false;
    });
    this.meta.currentPage = this.goToPage;
    this.get();
  }
  getFilterUrl() {
    const filter: any = {};
    filter['where'] = {};
    filter['order'] = 'WastageID DESC';
    return filter;
  }
  get() {

    this.api.getdata('actual-wastage-quantities').subscribe((res: any) => {
      this.wastageEntry = res;
      // this.meta = res.meta;
      console.log(res);
    }, error2 => {
      console.log(error2);
    });
  }
  getOrderQty() {
    this.api.getdata(`actual-wastage-quantities/searchData?workorderno=` + this.wastage.WorkOrderID+ `&fromdate=''` +
        `&todate=''`).subscribe((res: any) => {
      this.orderQty = res;
      this.wastage.TotalOrderQty = res[0]['Order Qty'];
      console.log(this.orderQty);
    });
  }

  searchRecord() {
    setTimeout(() => {
        this.api.getdata('actual-wastage-quantities/searchData?workorderno=' + this.workorder+ '&fromdate=' + this.fromDate.toJSON()+
            '&todate=' +this.toDate.toJSON()).subscribe((res: any) => {
          this.wastageEntry = res;
          console.log(this.wastageEntry);
        });
    }, 500);
  }

   getDataById(id: any) {
     this.api.getdataByid('actual-wastage-quantities',  id).subscribe((res: any) => {
       this.workOrders = [{workorderid: res.WorkOrderID, workorderno:res.workorder.workorderno}];
       // this.wastage.WorkOrderID = res.workorder.workorderno;
       this.wastage = res;
       console.log(this.wastage);
     });
  }
  selectAll() {
    this.selectedSamples = [];
    if (this.selectAllSamples) {
      this.wastageEntry.forEach(item => {
        item.selected = true;
        this.selectedSamples.push(item);
      });
    } else {
      this.wastageEntry.forEach(item => {
        item.selected = false;
      });
      this.selectedSamples = [];
    }
  }
  selectSamples(item, i) {
    if (item.selected === true) {
      this.selectedSamples.push(item);
      console.log(this.selectedSamples);

    } else {
      const index = this.selectedSamples.indexOf(item);
      if (index !== -1) {
        this.selectedSamples.splice(index, 1);
      }
      this.selectAllSamples = false;
      console.log(this.selectedSamples);

    }
    // if (item.selected) {
    //   this.selectedSamples.push(item);
    // } else {
    //   this.selectedSamples.splice(i, 1);
    //   this.selectAllSamples = false;
    // }
  }

   generateExcelOfSearchedData() {
    if (this.selectedSamples) {
      const data = this.selectedSamples.map(( element: any) => {
        return {
          'Category' : element['Category'],
          'Order No' : element['Order No'],
          'Wastage Date' : element['Wastage Date'],
          'Order Qty' : element['Order Qty'],
          'Wastage Qty' : element['Wastage Qty'],
          'Remarks' : element['Remarks']

        };
      });
      const lengths = [22, 10, 30, 30, 11, 15, 25, 20, 20, 8, 13, 10, 10, 10, 18];
      this.api.exportExcel(data, [['wastage Report'], []], ' wastage Report',  lengths);
    } else {
      const data = this.wastageEntry.map(( element: any) => {
        return {
          'Category' : element['Category'],
          'Order No' : element['Order No'],
          'Wastage Date' : element['Wastage Date'],
          'Order Qty' : element['Order Qty'],
          'Wastage Qty' : element['Wastage Qty'],
          'Remarks' : element['Remarks']

        };
      });
      const lengths = [22, 10, 30, 30, 11, 15, 25, 20, 20, 8, 13, 10, 10, 10, 18];
      this.api.exportExcel(data, [['wastage Report'], []], ' wastage Report',  lengths);
    }
  }
  exportToPDF() {
    if (this.selectedSamples) {
      this.api.savePdf(this.getDataForPDF(this.selectedSamples), 'A2', 'landscape', 'planningstatus', 'auto');
    } else {
      this.api.savePdf(this.getDataForPDF(this.wastageEntry), 'A2', 'landscape', 'planningstatus', 'auto');
    }
  }
  getDataForPDF(data) {
    const Data = [[
      'S No.',
      'Category',
      'Order No',
      'Wastage Date',
      'Order Qty',
      'Wastage Qty',
      'Remarks'
     ]];
    const sampleData = data.map(this.mapData);
    sampleData.forEach((elements, i) => {
      Data.push([
        i + 1,
        elements.Category,
        elements.Workorderno,
        elements.wastagedate ,
        elements.Orderqty ,
        elements.wastageqty ,
        elements.Remarks
      ]);
    });
    return Data;
  }
  mapData(item) {
    return {
      Category : item['Category'],
      Workorderno : item['Order No'],
      wastagedate : item['Wastage Date'],
      Orderqty : item['Order Qty'],
      wastageqty : item['Wastage Qty'],
      Remarks : item['Remarks']
    };
  }
}
