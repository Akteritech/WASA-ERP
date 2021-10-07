import {Component, OnInit, ViewChild} from '@angular/core';
import {DatePipe, Location} from '@angular/common';
import {SuiModalService} from 'ng2-semantic-ui';
import {ApiService} from '../../../api.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ConfirmModal} from '../../../templates/confirm-modal/confirm-modal.component';
import {ShowDetail} from '../../../templates/show-detail/show-detail.component';
import {OffsetSample} from '../../models/offsetSample';

@Component({
  selector: 'app-offset-sample',
  templateUrl: './offset-sample.component.html',
  styleUrls: ['./offset-sample.component.css']
})
export class OffsetSampleComponent implements OnInit {
  showSearchForm = false;
  OffsetSamples: any;
  selectedOffsetSamples: any;
  sample: any;
  clients: any;
  brands: any;
  selectAllSamples: any;
  statuses: any;
  productSubCategories: any;
  collapse = false;
  private id: any ;
  url = 'SampleGeneralSpecs';
  currentRoute: any;
  response: any;
  goToPage: any;
  fromPage: any;
  toPage: any;
  fromDate: DatePipe;
  toDate: DatePipe;
  meta: {
    totalItemCount: number,
    totalPageCount: number,
    itemsPerPage: number,
    currentPage: number,
    nextPage: number,
  };
   collectionSize: number | (() => number) | ((key?: (IDBKeyRange | IDBValidKey)) => IDBRequest) | ((countTitle?: string) => void);
  // @ViewChild('searchBox') searchBox;
   sampleColorData: any[];
  addNewSample: boolean;
  editSample: boolean;
  constructor(public api: ApiService,
              private route: ActivatedRoute,
              public modalService: SuiModalService,
              private router: Router,
              private _location: Location) {
    this.meta = {
      totalItemCount: 0,
      totalPageCount: 0,
      itemsPerPage: 10,
      currentPage: 1,
      nextPage: 0,
    };
    this.sample = new OffsetSample();
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = this.router.url;
        }
      }
    );

  }
  getSamplecolor(id) {
    this.api.getdata('samplecolors?filter[where][sampleid]=' + id + '&filter[include]=sample').subscribe((res: any[]) => {
      this.sampleColorData = res;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  
  ngOnInit() {
    if(!this.api.checkPermission('Sample Register', 'viewList'))  this.router.navigateByUrl('/home');
    this.addNewSample = this.api.checkPermission('Sample Register', 'addList');
    this.editSample = this.api.checkPermission('Sample Register', 'editList');
    this.collapse = !this.addNewSample;
    
    this.getProductSubCategories();
    this.optionsLookupBrand('a');
    this.optionsLookupClient('a');
    this.getSampleStatus();
    this.get();
    this.OffsetSamples = [];
    this.selectedOffsetSamples = [];
  }
  getItemCount() {
    let filter: any = {};
    filter['sampleid'] = this.sample.sampleid;
    filter = JSON.stringify(filter);
    this.api.getdata('SampleGeneralSpecs/count?where=' + filter ).subscribe( (res: any) => {
      this.collectionSize = res.count;
      this.meta.currentPage = 1;
      this.get();
    }, err => {
      console.log(err);
    });
  }
  DeleAllSelectedSample(){
    this.modalService
      .open(new ConfirmModal('Are you sure?', 'Are you sure to delete selected row?', 'mini' ))
      .onApprove(() => {
        this.selectedOffsetSamples.forEach(item => {
          this.api.deletedata('SampleGeneralSpecs/' , item.sampleid).subscribe( (res: any) =>{
            this.response = res;
            this.api.showDeleteToast('Deleted', this.response.message);
            this.get();
          }, error1 => {
            console.log(error1);
          })
        })
      })
      .onDeny(() => {
        console.log('Class: LeaveTypeComponent, Line: 39  ');
      });
  }
  goToPageNo() {
    this.OffsetSamples.forEach(item => {
      item.selected = false;
    });
    this.meta.currentPage = this.goToPage;
    this.get();
  }

  getFilterUrl() {
    const filter: any = {};
    filter['where'] = {};
    filter['include'] = ['brand', 'client', 'company', 'productCategory',
      'productSubCategory', 'salesPerson', 'NPDExecutive', 'designer', 'status', [{'material': ['sample', 'color', 'item']}]];
    filter['order'] = 'sampleid DESC';
    filter['where']['productcategoryid'] = 5;
    if (this.sample.brandid) {
      filter['where']['brandid'] = this.sample.brandid;
    }
    if (this.sample.clientid) {
      filter['where']['clientid'] = this.sample.clientid;
    }
    if (this.sample.productsubcategoryid) {
      filter['where']['productsubcategoryid'] = this.sample.productsubcategoryid;
    }
    if (this.sample.genspcStatus) {
      filter['where']['genspcStatus'] = this.sample.genspcStatus;
    }
    if (this.sample.sampleno) {
      filter['where']['sampleno'] = {};
      filter['where']['sampleno']['like'] = '%25' + this.sample.sampleno + '%25';
    }
    if (this.fromDate && this.toDate) {
      filter['where']['orderdate'] = {};
      filter['where']['orderdate']['between'] = [this.api.formatDate(this.fromDate), this.api.formatDate(this.toDate)];
    }
    if (this.sample.samplename) {
      filter['where']['samplename'] = {};
      filter['where']['samplename']['like'] = '%25' + this.sample.samplename + '%25';
    }
    return filter;
  }

  selectAll() {
    this.selectedOffsetSamples = [];
    if (this.selectAllSamples) {
      this.OffsetSamples.forEach(item => {
        item.selected = true;
        this.selectedOffsetSamples.push(item);
      });
    } else {
      this.OffsetSamples.forEach(item => {
        item.selected = false;
      });
      this.selectedOffsetSamples = [];
    }
  }
  selectSamples(item, i) {
    if (item.selected === true) {
      this.selectedOffsetSamples.push(item);
      console.log(this.selectedOffsetSamples);

    } else {
      const index = this.selectedOffsetSamples.indexOf(item);
      if (index !== -1) {
        this.selectedOffsetSamples.splice(index, 1);
      }
      this.selectAllSamples = false;
      console.log(this.selectedOffsetSamples);

    }

  }
  get(search?: boolean) {
    this.selectAllSamples = false;
    if (search) {
      this.meta.currentPage = 1;
    }
    this.api.getdata('SampleGeneralSpecs?page=' + this.meta.currentPage + '&filter=' + JSON.stringify(this.getFilterUrl())).subscribe((res: any) => {
      this.OffsetSamples = res.data;
      this.meta = res.meta;
      console.log(res);
    }, error2 => {
      console.log(error2);
    });
  }

  getProductSubCategories() {
    this.api.getdata('ProductSubCategories?filter[where][productcategoryid]=5').subscribe((res: any) => {
      this.productSubCategories = res;
    }, err => {
      console.log(err);
    });
  }
  getSampleStatus() {
    this.api.getdata('ModuleStatuses?filter[where][moduleid]=3').subscribe((res: any) => {
      this.statuses = res;
    }, err => {
      console.log(err);
    });
  }
  optionsLookupBrand(query) {
    this.api.getdata('Brands?filter={"limit":10,"where":{"brandname":{"like":"%25' + query + '%25"}}}').subscribe( (res: any) => {
      this.brands = res;
      // console.log(this.samples);
    }, error1 => {
      console.log('error1 ', error1);
    });
  }
  optionsLookupClient(query) {
    this.api.getdata('Customers?filter={"limit":10,"where":{"clientname":{"like":"%25' + query + '%25"}}}').subscribe( (res: any) => {
      this.clients = res;
      // console.log(this.samples);
    }, error1 => {
      console.log('error1 ', error1);
    });
  }
  backClicked() {
    this._location.back();
  }
  mapData(item) {
    return {
      sampleno : item.sampleno,
      samplename : item.samplename,
      brand : item.brand ? item.brand.brandname : '',
      company : item.company ? item.company.companyname : '',
      client : item.client ? item.client.clientname : '',
      productCategory : item.productCategory ? item.productCategory.productcategoryname : '',
      productSubCategory : item.productSubCategory ? item.productSubCategory.productsubcategoryname : '',
      salesPerson : item.salesPerson ? item.salesPerson.firstname : '',
      NPDExecutive : item.NPDExecutive ? item.NPDExecutive.firstname : '',
      designer : item.designer ? item.designer.SalesPeron : '',
      status : item.status ? item.status.statusdescription : '',
      unit : item.unit,
      length : item.length,
      width : item.width,
      quotedprice : item.quotedprice,
      pcsyard : item.pcsyard,
      orderdate : new Date(item.orderdate).toLocaleDateString('en-US'),
      estdeliverydate : new Date(item.estdeliverydate).toLocaleDateString('en-US'),
      deliverydate : new Date(item.deliverydate).toLocaleDateString('en-US'),
      approveldate : new Date(item.approveldate).toLocaleDateString('en-US'),
      filename : item.filename,
      totalnoofcolor : item.totalnoofcolor,
      noofups : item.noofups,
      papergsm : item.papergsm,
    };
  }
  exporttoExcel(pageRange?: boolean): void {
    const fileName = 'samples';
    const columns = [
      { header: 'Sample No', key: 'sampleno', width: 15 },
      { header: 'Sample Name', key: 'samplename', width: 25 },
      { header: 'Brand', key: 'brand', width: 10 },
      { header: 'Company', key: 'company', width: 30 },
      { header: 'Product Category', key: 'productCategory', width: 10 },
      { header: 'Product Sub Category', key: 'productSubCategory', width: 20 },
      { header: 'Client', key: 'client', width: 30 },
      { header: 'Sales Person', key: 'salesPerson', width: 20 },
      { header: 'Executive', key: 'NPDExecutive', width: 20 },
      { header: 'Designer', key: 'designer', width: 20 },
      { header: 'Status', key: 'status', width: 20 },
      { header: 'Unit', key: 'unit', width: 8 },
      { header: 'Length', key: 'length', width: 8 },
      { header: 'Width', key: 'width', width: 8 },
      { header: 'Quoted Price', key: 'quotedprice', width: 8 },
      { header: 'Pcsyard', key: 'pcsyard', width: 8 },
      { header: 'Order Date', key: 'orderdate', width: 15 },
      { header: 'Est Delivery Date', key: 'estdeliverydate', width: 15 },
      { header: 'Filename', key: 'filename', width: 20 },
      { header: 'Total No of color', key: 'totalnoofcolor', width: 8 },
      { header: 'No of ups', key: 'noofups', width: 8 },
      { header: 'Paper gsm', key: 'papergsm', width: 8 },
    ];
    if (pageRange) {
      if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
        return;
      }
      const url = this.getFilterUrl();
      url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
      url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
      this.api.getdata('SampleGeneralSpecs?filter=' + JSON.stringify(url)).subscribe((res: any) => {
        this.api.exportToExcel(columns, res.map(this.mapData), fileName);
      }, error1 => {
        console.log('Class: , Line:  error1 ', error1);
      });
    } else {
      this.api.exportToExcel(columns, this.selectedOffsetSamples.map(this.mapData), fileName);
      console.log(this.selectedOffsetSamples);
    }
  }
  exporttoCsv(pageRange?: boolean): void {
    const fileName = 'samples';
    const columns = [
      { header: 'Sample No', key: 'sampleno', width: 15 },
      { header: 'Sample Name', key: 'samplename', width: 25 },
      { header: 'Brand', key: 'brand', width: 10 },
      { header: 'Company', key: 'company', width: 30 },
      { header: 'Product Category', key: 'productCategory', width: 10 },
      { header: 'Product Sub Category', key: 'productSubCategory', width: 20 },
      { header: 'Client', key: 'client', width: 30 },
      { header: 'Sales Person', key: 'salesPerson', width: 20 },
      { header: 'Executive', key: 'NPDExecutive', width: 20 },
      { header: 'Designer', key: 'designer', width: 20 },
      { header: 'Status', key: 'status', width: 20 },
      { header: 'Unit', key: 'unit', width: 8 },
      { header: 'Length', key: 'length', width: 8 },
      { header: 'Width', key: 'width', width: 8 },
      { header: 'Quoted Price', key: 'quotedprice', width: 8 },
      { header: 'Pcsyard', key: 'pcsyard', width: 8 },
      { header: 'Order Date', key: 'orderdate', width: 15 },
      { header: 'Est Delivery Date', key: 'estdeliverydate', width: 15 },
      { header: 'Filename', key: 'filename', width: 20 },
      { header: 'Total No of color', key: 'totalnoofcolor', width: 8 },
      { header: 'No of ups', key: 'noofups', width: 8 },
      { header: 'Paper gsm', key: 'papergsm', width: 8 },
    ];
    if (pageRange) {
      if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
        return;
      }
      const url = this.getFilterUrl();
      url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
      url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
      this.api.getdata('SampleGeneralSpecs?filter=' + JSON.stringify(url)).subscribe((res: any) => {
        this.api.exportToCsv(columns, res.map(this.mapData), fileName);
      }, error1 => {
        console.log('Class: , Line:  error1 ', error1);
      });
    } else {
      this.api.exportToCsv(columns, this.selectedOffsetSamples.map(this.mapData), fileName);
    }
  }
  viewDetail(id) {
    console.log(id);
    this.modalService
      .open(new ShowDetail('Offset Sample Details', 'offsetsample', id))
      .onApprove(() => {

      })
      .onDeny(() => {
        console.log();
      });
  }
  delete(id) {
    this.modalService
      .open(new ConfirmModal('Are you sure?', 'Are you sure to delete this?', 'mini' ))
      .onApprove(() => {
        this.api.deletedata(this.url, id).subscribe((res: any) => {
          this.response = res;
          this.api.showDeleteToast('Deleted', this.response.message);
          this.get();
        }, err => {
          console.log(err);
        });
      })
      .onDeny(() => {
        console.log('Class: LeaveTypeComponent, Line: 39  ');
      });
  }
  exportToPDF(pageRange?: boolean) {
    if (pageRange) {
      if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
        return;
      }
      const url = this.getFilterUrl();
      url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
      url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
      this.api.getdata('SampleGeneralSpecs?filter=' + JSON.stringify(url)).subscribe((res: any) => {
        this.api.savePdf(this.getDataForPDF(res), 'A2', 'landscape', 'Sample', 'auto');
      }, error1 => {
        console.log('here');
        console.log('Class: , Line:  error1 ', error1);
      });
    } else {
      this.api.savePdf(this.getDataForPDF(this.selectedOffsetSamples), 'A2', 'landscape', 'Sample' , 'auto');

    }
  }
  openToPrint(pageRange?: boolean) {
    if (pageRange) {
      if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
        return;
      }
      const url = this.getFilterUrl();
      url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
      url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
      this.api.getdata('SampleGeneralSpecs?filter=' + JSON.stringify(url)).subscribe((res: any) => {
        this.api.OpenPrint(this.getDataForPDF(res), 'A2', 'landscape', 'Sample', 'auto');
      }, error1 => {
        console.log('here');
        console.log('Class: , Line:  error1 ', error1);
      });
    } else {
      this.api.OpenPrint(this.getDataForPDF(this.selectedOffsetSamples), 'A2', 'landscape', 'Sample' , 'auto');

    }
  }
  getDataForPDF(data) {
    const Data = [[
      'S.No',
      'Sample No',
      'Sample Name',
      'Brand',
      'Company',
      'Product Category',
      'Product Sub Category',
      'Client',
      'Sales Person',
      'Executive',
      'Designer',
      'Status',
      'Unit',
      'Length',
      'Width',
      'Quoted Price',
      'Pcsyard',
      'Order Date',
      'Est Delivery Date',
      'Filename',
      'Total No of color',
      'No of ups',
      'Paper gsm',
    ]];
    const sampleData = data.map(this.mapData);
    sampleData.forEach((element, i) => {
      Data.push([
        i + 1,
        element.sampleno,
        element.samplename,
        element.brand,
        element.company,
        element.client,
        element.productCategory,
        element.productSubCategory,
        element.salesPerson,
        element.NPDExecutive,
        element.designer,
        element.status,
        element.unit,
        element.length,
        element.width,
        element.quotedprice,
        element.pcsyard,
        element.orderdate,
        element.estdeliverydate,
        element.filename,
        element.totalnoofcolor,
        element.noofups,
        element.papergsm,
      ]);
    });
    return Data;
  }

}
