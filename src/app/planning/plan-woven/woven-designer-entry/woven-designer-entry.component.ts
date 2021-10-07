import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from "../../../api.service";
import {SuiModalService} from "ng2-semantic-ui";
import {NgForm} from "@angular/forms";
import * as XLSX from "xlsx";
import * as pdfmake from 'pdfmake-lite/build/pdfmake';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {el} from "@angular/platform-browser/testing/src/browser_util";
export class DesignerEntry {
  ERPNo: any;
  Party: any;
  LableName: any;
  RecieveDate: any;
  DeliveryDate: any;
  RecieveFrom: any;
  Designer: any;
  Remark: any;
  CreationDate: any;
  constructor() {
    this.CreationDate = Date.now();
  }

}

@Component({
  selector: 'app-woven-designer-entry',
  templateUrl: './woven-designer-entry.component.html',
  styleUrls: ['./woven-designer-entry.component.css']
})
export class WovenDesignerEntryComponent implements OnInit {
  @Input() id: any;
  section: any;
  departments: any;
  companyname: any;

  @Output() added = new EventEmitter<boolean>();
  companies: any;
  response: any;
   design: DesignerEntry;

  meta: {
    totalItemCount: number, totalPageCount: number, itemsPerPage: number, currentPage: number,
  };
  customersamplename: any;
  toDate: any;
   goToPage: number;
   collectionSize: number;
   designerentry: any[];
   data: any;
   editId: any;
   currentRoute: string;
   brands: any;
   alldesignerentry: any[];
   fromDate: any;
   reportData: any;
   allRecord: any;
   designers: any;
  constructor(public api: ApiService, public modalService: SuiModalService, public route: ActivatedRoute,
              public tost: ApiService,
              public router: Router) {
    this.design = new DesignerEntry();
    this.goToPage = 1;
    this.collectionSize = 0;
    this.meta = {
      totalItemCount: 0,
      totalPageCount: 0,
      itemsPerPage: 10,
      currentPage: 1,
    };
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
getTabledata() {
  this.api.getdata('woven-designer-entries?filter[order]=DesignTrackID desc')
      .subscribe((res: any[]) => {
        // res.map(item => {
          // if (res.RecieveDate == /1-0/) {
          //  this.api.formatDate1(new Date(Math.round((parseInt(item.RecieveDate) - 25569)*86400*1000)))
          // console.log(this.api.formatDate1(new Date(Math.round((parseInt(item.RecieveDate) - 25569)*86400*1000))) )
          //   this.api.formatDate1(new Date(Math.round((parseInt(item.DeliveryDate) - 25569)*86400*1000)))
          // }
        // })
        this.designerentry = res.slice(0,10);
        console.log(this.designerentry)
        this.alldesignerentry = res;
        this.meta.totalItemCount = res.length;
      });
}
  ngOnInit() {
this.getTabledata();
    this.optionsLookupBrand('');
    this.optionsLookupDesigner();
  }
  getDataById(id: any) {
    this.api.getdataByid('woven-designer-entries',  id).subscribe((res: any) => {
      res.RecieveDate = new Date(res.RecieveDate)
      res.DeliveryDate = new Date(res.DeliveryDate)
      this.design = res;
      console.log(this.design);
    });
  }
  pageChange(){
    const start = (this.meta.currentPage - 1) * this.meta.itemsPerPage;
    const end = start + this.meta.itemsPerPage
    this.designerentry = this.alldesignerentry.slice(start, end);
  }

  patch(form: NgForm) {
    if (!form.valid) {
      this.api.showWarningToast('Warning', 'please fill required fields first.');
      return;
    }
    this.design.RecieveDate = this.api.formatDate1(new Date(this.design.RecieveDate.getTime() + 6 * 3600 * 1000));
    this.design.DeliveryDate = this.api.formatDate1(new Date(this.design.DeliveryDate.getTime() + 6 * 3600 * 1000));
      this.api.patchdata('woven-designer-entries', this.design).subscribe(res1 => {
        this.response = res1;
        this.api.showSuccessToast('Success', this.response.message);
       this.design.DeliveryDate =null;
       this.design.RecieveDate =null;
        this.getTabledata();
      }, err => {
        this.api.showFailureToast('Error', err.message);
        console.log(err);
      });
  }
  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary'});
      console.log(wb)
      const wsname: string = wb.SheetNames[0];
      console.log(wsname)
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      console.log(ws)
      this.data = (XLSX.utils.sheet_to_json(ws, { raw: false}));
      console.log(this.data);
    };
    reader.readAsBinaryString(target.files[0]);
  }
  async upload() {
   await this.data.forEach((item: any) => {
//      if (typeof (item[4]) == "number") {
// const numdate = new DateTransform(Math.round((item[4] - 25569)*86400*1000))
// const numdate1 = new DateTransform(Math.round((item[5] - 25569)*86400*1000))
//      } else {
//       const stringDate =  this.api.formatDate(item[4]);
//       const stringDate1 =  this.api.formatDate(item[4]);
//
//      }
      let data = {
        'ERPNo': item.__EMPTY,
        'Party': item.__EMPTY_1,
        'LableName': item.__EMPTY_2,
        'RecieveDate': item.__EMPTY_3,
        'DeliveryDate':item.__EMPTY_4,
        'RecieveFrom': item.__EMPTY_5,
        'Designer': item.__EMPTY_6,
        'Remark': item.__EMPTY_7,
        'CreationDate': Date.now()
      }
// if (typeof(item[1]) == "number") {
   this.api.patchdata('woven-designer-entries', data).subscribe((res: any) => {
    console.log(res);
  },error => {
    console.log(error);
  });
// }
   });
    this.api.showSuccessToast(`${this.data.length-1} record inserted`);
    // this.getTabledata();
  }
  optionsLookupBrand(query) {
    this.api.getdata('Brands?filter={"where":{"brandname":{"like":"%25' + query + '%25"}}}').subscribe((res: any) => {
      this.brands = res;
      // console.log(this.samples);
    }, error1 => {
      console.log('error1 ', error1);
    });
  }
  getDataByDate() {
    let link = `woven-designer-entries/getSampleDataByDate?`;
    if (this.fromDate) link += '&fromdate='+this.fromDate.toJSON();
    if (this.toDate) link += '&todate='+this.toDate.toJSON();
    if (this.customersamplename) link += '&samplename='+this.customersamplename;
    this.api.getdata(link).subscribe((res: any) => {
      this.designerentry = res;
      this.meta.totalItemCount = this.designerentry.length;
      this.alldesignerentry = this.designerentry.slice(0, this.meta.itemsPerPage);
      console.log(this.designerentry);
    }, error2 => {
      console.log(error2);
    });
  }

  // pageChange() {
  //   const start = (this.meta.currentPage - 1) * this.meta.itemsPerPage;
  //   const end = start + this.meta.itemsPerPage
  //   this.allRecord = this.reportData.slice(start, end);
  // }

  generateExcelOfSearchedData() {
    const data = this.designerentry.map((element: any) => {
      return {
        'ERP No': element['ERPNo'], 'Party Name': element['Party'], 'Label Name': element['LableName'],
        'Receive Date': element['RecieveDate'],
        'Delivery Date': element['DeliveryDate'], 'Receive From':element['RecieveFrom'],
        'Designer': element['Designer'], 'Remarks': element['Remark']
      };
    });
    const lengths = [22, 10, 30, 30, 11, 15, 25, 20, 20, 8, 13, 10, 10, 10, 18];
    this.api.exportExcel(data, [['Development tracker-woven'], []], 'Development tracker-woven',  lengths);
  }

  pdf() {
    this.api.pdf('tabledata','Development tracker-woven');
  }
  optionsLookupDesigner() {
    this.api.getdata('DesignerLists').subscribe((res: any) => {
      this.designers = res;
    }, err => {
      console.log(err);
    });
  }
  pdf1() {
    const data = [[ 'ERP No',
      'Party Name',
      'Label Name',
      'Receive Date',
      'Delivery Date',
      'Receive From',
      'Designer'
      , 'Remarks']];
    const title = 'Development tracker-woven'

    this.designerentry.forEach((element: any) => {
      data.push([
        element['ERPNo'],
        element['Party'],
        element['LableName'],
        element['RecieveDate'].substring(0,10),
        element['DeliveryDate'].substring(0,10),
        element['RecieveFrom'],
        element['Designer'],
        element['Remark'],
      ]);
    });
    this.api.pdfReport(data, title, 'portrait', '');
  }
}
