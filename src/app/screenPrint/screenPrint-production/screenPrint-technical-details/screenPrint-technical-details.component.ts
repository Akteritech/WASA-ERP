import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ApiService} from '../../../api.service';
import {ConfirmModal} from '../../../templates/confirm-modal/confirm-modal.component';
import {SuiModalService} from 'ng2-semantic-ui';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Sample, SampleWiseKeyEntryField} from '../../../woven/models/sample';
import {WovenDetails, Yarn} from '../../../woven/models/woven-details';
import {SampleColor} from '../../../masters/components/sample-colors/add-sample-color/add-sample-color.component';
import {SamplePartWise} from '../../../masters/components/sample-part-wises/add-sample-part-wise/add-sample-part-wise.component';
import {MaterialDetails} from '../../../offset/models/material-details';
import {AddScreenPrintSampleComponent} from '../screen-print-sample/add-screen-print-sample/add-screen-print-sample.component';
import {ScreenPrintSample} from '../../models/screen-print-sample';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {DatePipe, Location} from '@angular/common';
import {ShowDetail} from '../../../templates/show-detail/show-detail.component';
declare var $: any;
@Component({
  selector: 'app-pfl-technical-details',
  templateUrl: './screenPrint-technical-details.component.html',
  styleUrls: ['./screenPrint-technical-details.component.css']
})
export class ScreenPrintTechnicalDetailsComponent implements OnInit {
  showSearchForm = false;
  samples: any;
  selectedSamples: any;
  sample: any;
  clients: any;
  brands: any;
  selectAllSamples: any;
  statuses: any;
  productSubCategories: any;
  collapse = false;
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
  addsample: any;
  file: any;
  collectionSize: number | (() => number) | ((key?: (IDBKeyRange | IDBValidKey)) => IDBRequest) | ((countTitle?: string) => void);
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
    this.addsample = new Sample();
    this.sample = new Sample();
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
          this.selectedSamples.forEach(item => {
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
  ngOnInit() {
    if(!this.api.checkPermission('Sample Register', 'viewList'))  this.router.navigateByUrl('/home');
    this.editSample = this.api.checkPermission('Sample Register', 'editList');
    this.collapse = !this.editSample;
    
    this.getProductSubCategories();
    this.optionsLookupBrand('a');
    this.optionsLookupClient('a');
    this.getSampleStatus();
    this.get();
    this.samples = [];
    this.selectedSamples = [];
  }
  // getImage() {
  //   this.api.uploadFile('samples', this.file).subscribe((res2: any) => {
  //     // this.api.showSuccessToast('Sample Uploaded Successfully', '');
  //     this.addsample.imagepath = 'fileuploads/samples/download/' + this.file.name;
  //   }  , err => {
  //     this.api.showWarningToast('Image could not be uploaded. Please try again', '');
  //     console.log(err);
  //   });
  // }
  goToPageNo() {
    this.samples.forEach(item => {
      item.selected = false;
    });
    this.meta.currentPage = this.goToPage;
    this.get();
  }
  getFilterUrl() {
    const filter: any = {};
    filter['where'] = {};
    filter['include'] = ['brand', 'client', 'company', 'productCategory', 'productSubCategory', 'salesPerson',
      'NPDExecutive', 'designer', 'program' , 'status'];
    filter['order'] = 'sampleid DESC';
    filter['where']['productcategoryid'] = 6;
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
    if (this.fromDate && this.toDate) {
      filter['where']['orderdate'] = {};
      filter['where']['orderdate']['between'] = [this.api.formatDate(this.fromDate), this.api.formatDate(this.toDate)];
    }
    if (this.sample.sampleno) {
      filter['where']['sampleno'] = {};
      filter['where']['sampleno']['like'] = '%25' + this.sample.sampleno + '%25';
    }
    if (this.sample.customersamplename) {
      filter['where']['customersamplename'] = {};
      filter['where']['customersamplename']['like'] = '%25' + this.sample.customersamplename + '%25';
    }
    return filter;
  }
  selectAll() {
    this.selectedSamples = [];
    if (this.selectAllSamples) {
      this.samples.forEach(item => {
        item.selected = true;
        this.selectedSamples.push(item);
      });
    } else {
      this.samples.forEach(item => {
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
  }
  get(search?: boolean) {
    this.selectAllSamples = false;
    if (search) {
      this.meta.currentPage = 1;
    }
    this.api.getdata('SampleGeneralSpecs?page=' + this.meta.currentPage + '&filter=' +
        JSON.stringify(this.getFilterUrl())).subscribe((res: any) => {
      this.samples = res.data;
      this.meta = res.meta;
      console.log(res);
    }, error2 => {
      console.log(error2);
    });
  }

  getProductSubCategories() {
    this.api.getdata('ProductSubCategories?filter[where][productcategoryid]=6').subscribe((res: any) => {
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
      designer : item.designer ? item.designer.firstname : '',
      length : item.length,
      width : item.width,
      orderdate : new Date(item.orderdate).toLocaleDateString('en-US'),
      estdeliverydate : new Date(item.estdeliverydate).toLocaleDateString('en-US'),
      deliverydate : new Date(item.deliverydate).toLocaleDateString('en-US'),
      filename : item.filename,
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
      { header: 'Length', key: 'length', width: 8 },
      { header: 'Width', key: 'width', width: 8 },
      { header: 'Order Date', key: 'orderdate', width: 15 },
      { header: 'Est Delivery Date', key: 'estdeliverydate', width: 15 },
      { header: 'Filename', key: 'filename', width: 20 },
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
      this.api.exportToExcel(columns, this.selectedSamples.map(this.mapData), fileName);
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
      { header: 'Length', key: 'length', width: 8 },
      { header: 'Width', key: 'width', width: 8 },
      { header: 'Order Date', key: 'orderdate', width: 15 },
      { header: 'Est Delivery Date', key: 'estdeliverydate', width: 15 },
      { header: 'Filename', key: 'filename', width: 20 },
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
      this.api.exportToCsv(columns, this.selectedSamples.map(this.mapData), fileName);
    }
  }

  viewDetail(id) {
    console.log(id);
    this.modalService
        .open(new ShowDetail('Screen Print Sample Details', 'screenprint', id))
        .onApprove(() => {

        })
        .onDeny(() => {
          console.log();
        });
  }

  delete(id) {
    this.modalService
        .open(new ConfirmModal('Are you sure?', 'Are you sure to delete this?', 'mini'))
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
      this.api.savePdf(this.getDataForPDF(this.selectedSamples), 'A2', 'landscape', 'Sample' , 'auto');

    }
  }
  printOpen(pageRange?: boolean) {
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
      this.api.OpenPrint(this.getDataForPDF(this.selectedSamples), 'A2', 'landscape', 'Sample' , 'auto');

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
      'Length',
      'Width',
      'Order Date',
      'Est Delivery Date',
      'Filename'
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
        element.length,
        element.width,
        element.orderdate,
        element.estdeliverydate,
        element.filename,
      ]);
    });
    return Data;
  }


}
