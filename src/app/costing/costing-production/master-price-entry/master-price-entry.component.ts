import {Component, OnInit, ViewChild} from '@angular/core';
import {DatePipe, Location} from '@angular/common';
import {ApiService} from '../../../api.service';
import {SuiModalService} from 'ng2-semantic-ui';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {EditDetail} from '../../../templates/edit-detail/edit-detail.component';
import {ShowDetail} from '../../../templates/show-detail/show-detail.component';
import {ConfirmModal} from '../../../templates/confirm-modal/confirm-modal.component';
import {Price} from '../../model/masterpriceentry';
import {ngxCsv} from 'ngx-csv';
@Component({
  selector: 'app-master-price-entry',
  templateUrl: './master-price-entry.component.html',
  // styleUrls: ['./master-price-entry.component.css']
})
export class MasterPriceEntryComponent implements OnInit {
  collapse = false;
  designations: any;
  response: any;
  collectionSize: any;
  pageSize: any;
  selectPrices: any;
  selectAllPrice: any;
  showSearchForm: boolean;
  userFilter: any;
  fromPage: any;
  masterPrice: any;
  toPage: any;
  selectedPage: any;
  samples: any;
  customers: any;
  goToPage: any;
  currentRoute: any;
  designation: any;
  fromDate: DatePipe;
  toDate: DatePipe;
  url = 'ItemPriceBuyerWises';
  meta: {
    totalItemCount: number,
    totalPageCount: number,
    itemsPerPage: number,
    currentPage: number,
    nextPage: number,
  };
  @ViewChild('searchBox') searchBox;
   prices: any;
   price: any;
  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Master Price Details',
    useBom: true,
    noDownload: false,
    headers: ['Section',
      'Sample Name',
      'Buyer',
      'Sales Person',
      'Finish Type',
      'Customer',
      'Part No',
      'Length',
      'Width',
      'Per Qty',
      'Cost',
      'Min Order',
      'Rebate',
      'Rebate %',
      'Commission',
      'Commission %',
      'Extra Rebate',
      'Extra Rebate',
      'Price',
      'Min Order',
      'Merchandiser',
      'Merchandiser %']
  };
   tabledata: ngxCsv;
   table: any;
  addNewPrice: boolean;
  editPrice: boolean;
   parttabledata: any;
   partno: any;
  constructor(private _location: Location , public api: ApiService,
              public modalService: SuiModalService, private route: ActivatedRoute , private router: Router) {
    this.masterPrice = new Price();
    this.meta = {
      totalItemCount: 0,
      totalPageCount: 0,
      itemsPerPage: 10,
      currentPage: 1,
      nextPage: 0,
    };
    this.route.params.subscribe( params => {
      if (params.id) {

        this.collapse = false;
      }
    });
    this.price = new Price();
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = this.router.url;
        }
      }
    );
  }


  ngOnInit() {
    if(!this.api.checkPermission('Master Price Entry', 'viewList'))  this.router.navigateByUrl('/home');
    this.addNewPrice = this.api.checkPermission('Master Price Entry', 'addList');
    this.editPrice = this.api.checkPermission('Master Price Entry', 'editList');
    this.collapse = !this.addNewPrice;
    this.selectPrices = [];
    this.meta.currentPage = 1;
    // this.getItemCount();
    this.get();
    this.optionsLookupCustomers('a');
    this.optionsLookupSamples('a');
  }
  edit(id) {
    console.log(id);
    this.modalService
      .open(new EditDetail('Edit Price', 'price', id))
      .onApprove(() => {

      })
      .onDeny(() => {
        console.log();
      });
  }
  getItemCount() {
    let filter: any = {};
    filter['itempriceid'] = this.price.itempriceid;
    filter = JSON.stringify(filter);
    this.api.getdata('ItemPriceBuyerWises/count?where=' + filter ).subscribe( (res: any) => {
      this.collectionSize = res.count;
      this.meta.currentPage = 1;
      this.get();
    }, err => {
      console.log(err);
    });
  }

  goToPageNo() {
    this.meta.currentPage = this.goToPage;
    this.get();
  }
  getFilterUrl() {
    const filter: any = {};
    filter['where'] = {};
    filter['include'] = ['brand', 'sample', 'program', 'salesPerson', 'customer', 'productCategory', 'salesPerson', 'lov' , 'partNo' , 'customer'];
    filter['order'] = 'itempriceid DESC';
    if (this.masterPrice.customerid) {
      filter['where']['customerid'] = this.masterPrice.customerid;
    }
    if (this.masterPrice.sampleid) {
      filter['where']['sampleid'] = this.masterPrice.sampleid;
    }
    if (this.fromDate && this.toDate) {
      filter['where']['stockratedate'] = {};
      filter['where']['stockratedate']['between'] = [this.api.formatDate(this.fromDate), this.api.formatDate(this.toDate)];
    }
    return filter;
    // console.log(this.filter);
  }
  selectAll() {
    this.selectPrices = [];
    if (this.selectAllPrice === true) {
      this.prices.forEach(item => {
        item.selected = true;
        this.selectPrices.push(item);
      });
      console.log(this.selectPrices);
    } else {
      this.prices.forEach(item => {
        item.selected = false;
        this.selectPrices.splice(item);
      });
      console.log(this.selectPrices);
    }
  }
  selectSamples(item, i) {
    if (item.selected === true) {
      this.selectPrices.push(item);
      console.log(this.selectPrices);

    } else {
      const index = this.selectPrices.indexOf(item);
      if (index !== -1) {
        this.selectPrices.splice(index, 1);
      }
      this.selectAllPrice = false;
      console.log(this.selectPrices);

    }
  }
  get(search?: boolean) {
    this.selectAllPrice = false;
    if (search) {
      this.meta.currentPage = 1;
    }
    this.api.getdata('ItemPriceBuyerWises?page=' + this.meta.currentPage + '&filter=' +
      JSON.stringify(this.getFilterUrl())).subscribe((res: any) => {
      this.prices = res.data;
      console.log(this.prices);
      this.meta = res.meta;
      console.log(res);
      this.api.getdata('SampleWisePartsLengths?filter[where][partsid]=' + this.prices.partnoid).subscribe((resp: any) => {
        this.parttabledata = resp;
        console.log(this.parttabledata);
        this.api.getdata('Lovs?filter[where][id]=' + resp[0].partnoid).subscribe((respo: any) => {
          this.partno = respo;
          // this.masterPrice.partnoid = this.partno[0].id;
          console.log(this.partno);
        });
      });
    }, error2 => {
      console.log(error2);
    });
  }
  getdata() {
    const filter: any = {};
    filter['where'] = {};
    filter['order'] = 'itempriceid DESC';
    filter['where']['stockratedate'] = {};
    filter['where']['stockratedate']['between'] = [this.api.formatDate(this.fromDate), this.api.formatDate(this.toDate)];
    return filter;
  }
  gets() {
    const link = 'ItemPriceBuyerWises/getTodaysPrices';
    this.api.getdata(link).subscribe((res: any) => {
      this.prices = res;
      console.log(res);
      setTimeout(() => {
        this.tabledata = new ngxCsv(this.prices.map(this.mapData), 'myreport', this.options);
        console.log(this.tabledata);
      }, 1000);
    }, error2 => {
      console.log(error2);
    });
  }
  optionsLookupSamples(query) {
    const filter: any = {};
    filter['where'] = {};
    filter['include'] = ['brand', 'client', 'company', 'productCategory', 'productSubCategory', 'salesPerson',
      'NPDExecutive', 'designer', 'status' , 'sampleColors' , 'parts'];
    filter['order'] = 'sampleid DESC';
    filter['limit'] = 20;
    filter['where']['samplename'] = {};
    filter['where']['samplename']['like'] = '%25' + query + '%25';
    this.api.getdata('SampleGeneralSpecs?filter=' + JSON.stringify(filter)).subscribe( (res: any) => {
      this.samples = res;
      console.log(res[0]);
    }, error1 => {
      console.log('error1 ', error1);
    });
  }
  optionsLookupCustomers(query) {
    this.api.getdata(`customers?filter={"limit":10,"where":{"clientname":{"like":"%25${query}%25"}}}`).subscribe( (res: any) => {
      this.customers = res;
    }, error1 => {
      console.log('error1 ', error1);
    });
  }

  viewDetail(id) {
    console.log(id);
    this.modalService
      .open(new ShowDetail('Price Details', 'masterprice', id))
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
        this.api.deletedata('ItemPriceBuyerWises', id).subscribe((res: any) => {
          this.get();
          this.response = res;
          this.api.showDeleteToast('Deleted', this.response.message);
        }, err => {
          console.log(err);
        });
      })
      .onDeny(() => {
        console.log('Class: LeaveTypeComponent, Line: 39  ');
      });

  }
  alert(id): void {
    console.log(id);
    this.modalService
      .open(new ShowDetail('Price Details', 'Price', id))
      .onApprove(() => {

      })
      .onDeny(() => {
        console.log();
      });
  }

  // optionsSearch = (query) => {
  //   this.searchBox.dropdownService.setOpenState(true);
  //   return this.api.getdata('ItemPriceBuyerWises?filter={ "where":{"Price":{"like":"%25' + query + '%25"}}}').toPromise();
  // };


  backClicked() {
    this._location.back();
  }
  optionsLookupSampleItems(query) {

    const filter: any = {};
    filter['where'] = {};
    filter['order'] = 'sampleid DESC';
    filter['limit'] = 10;
    filter['where']['productcategoryid'] = this.masterPrice.productcategoryid;
    filter['where']['samplename'] = {};
    filter['where']['samplename']['like'] = '%25' + query + '%25';
    this.api.getdata('SampleGeneralSpecs?filter=' + JSON.stringify(filter)).subscribe( (res: any) => {
      this.samples = res;
      if (this.masterPrice.productcategoryid === 7) {
        this.masterPrice.perquantity = 100;
      } else {
        this.masterPrice.perquantity = 1000;
      }
      console.log(res + 'items');
    }, error1 => {
      console.log('error1 ', error1);
    });
  }
  mapData(mapPrice) {
    return {
      productcategoryid: mapPrice.productCategory ? mapPrice.productCategory.productcategoryname : '',
      samplename: mapPrice.sample ? mapPrice.sample.samplename : '',
      buyer: mapPrice.brand ? mapPrice.brand.brandname : '',
      salespersonid: mapPrice.salesPerson ? mapPrice.salesPerson.firstname : '',
      finishtype: mapPrice.lov ? mapPrice.lov.listitem : '',
      customerid: mapPrice.customer ? mapPrice.customer.clientname : '',
      partnoid: mapPrice.partNo ? mapPrice.partNo.listitem : '',
      length: mapPrice.sample ? mapPrice.sample.length : '',
      width:  mapPrice.sample ? mapPrice.sample.width : '',
      perquantity: mapPrice.perquantity,
      cost: mapPrice.cost,
      minorderqty: mapPrice.minorderqty,
      rebate: mapPrice.rebate,
      rebatepercent: mapPrice.rebatepercent,
      commission: mapPrice.commission,
      commissionpercent: mapPrice.commissionpercent,
      extrarebate: mapPrice.extrarebate,
      extrarebatepercent: mapPrice.extrarebatepercent,
      price: mapPrice.price,
      minordervalue: mapPrice.minordervalue,
      cvrate: mapPrice.cvrate,
      merchandisercommission: mapPrice.merchandisercommission,
      merchandisercommpercent: mapPrice.merchandisercommpercent,
    };
  }
  generateReport() {
    this.api.getdata('ItemPriceBuyerWises?filter[where][stockratedate][gt]=' + JSON.stringify(this.fromDate) + '&filter[where][stockratedate][lt]=' + JSON.stringify(this.toDate)).subscribe((res: any) => {
    this.table = res;
    console.log(this.table);
    });
    // this.api.getdata('ItemPriceBuyerWises?filter=' +
    //     JSON.stringify(this.getFilterUrl())).subscribe((res: any) => {
    //   this.prices = res;
    //   console.log(this.prices);
    // }, error2 => {
    //   console.log(error2);
    // });
    setTimeout(() => {
      this.tabledata = new ngxCsv(this.prices.map(this.mapData), 'myreport', this.options);
      console.log(this.tabledata);
    }, 1000);
  }
  exportCsv(PageRange?: boolean): void {
this.get(true);
    console.log('sfsff');
    if (PageRange) {
      if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
        return;
      }
      const url = {};
      url['order'] = 'itempriceid DESC';
      url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
      url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
      this.api.getdata('ItemPriceBuyerWises?filter=' + JSON.stringify(url)).subscribe((res: any) => {
        console.log(res);
        // this.api.exportToExcel(columns, res.map(this.mapData), fileName);
        new ngxCsv( res.map(this.mapData), 'myreport', this.options);

      }, error1 => {
        console.log('Class: , Line:  error1 ', error1);
      });
    } else {
      new ngxCsv(this.selectPrices.map(this.mapData), 'myreport', this.options);
      console.log(this.selectPrices);
      // this.api.exportToExcel(columns, this.selectPrices.map(this.mapData), fileName);
    }
  }

  exporttoExcel(pageRange?: boolean): void {
    const fileName = 'Price';
    const columns = [
      { header : 'Section' , key : 'productcategoryid', width: 15 },
      { header : 'Sample Name' , key : 'samplename', width: 15 },
      { header : 'Buyer' , key : 'buyer', width: 15 },
      { header : 'Sales Person' , key : 'salespersonid', width: 15 },
      { header : 'Finish Type' , key : 'finishtype', width: 15 },
      { header : 'Customer' , key : 'customerid', width: 15 },
      { header : 'Part No.' , key : 'partnoid', width: 15 },
      { header : 'Length' , key : 'length', width: 15 },
      { header : 'Width' , key : 'width', width: 15 },
      { header : 'Per Qty' , key : 'perquantity', width: 15 },
      { header : 'Cost' , key : 'cost', width: 15 },
      { header : 'Min Order Qty' , key : 'minorderqty', width: 15 },
      { header : 'Rebate' , key : 'rebate', width: 15 },
      { header : 'Rebate %' , key : 'rebate', width: 15 },
      { header : 'Commission' , key : 'commission', width: 15 },
      { header : 'Commission %' , key : 'commission', width: 15 },
      { header : 'Extra Rebate' , key : 'extrarebate', width: 15 },
      { header : 'Extra Rebate %' , key : 'extrarebate', width: 15 },
      { header : 'Price' , key : 'price', width: 15 },
      { header : 'Min Order Value' , key : 'minordervalue', width: 15 },
      { header : 'Merchandiser' , key : 'merchandisercommission', width: 15 },
      { header : 'Merchandiser %' , key : 'merchandisercommission', width: 15 },
    ];
    if (pageRange) {
      if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
        return;
      }
      const url = {};
      url['order'] = 'itempriceid DESC';
      url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
      url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
      this.api.getdata('ItemPriceBuyerWises?filter=' + JSON.stringify(url)).subscribe((res: any) => {
        this.api.exportToExcel(columns, res.map(this.mapData), fileName);
      }, error1 => {
        console.log('Class: , Line:  error1 ', error1);
      });
    } else {
      this.api.exportToExcel(columns, this.selectPrices.map(this.mapData), fileName);
    }
  }
  exporttoCsv(pageRange?: boolean): void {
    const fileName = 'Designation';
    const columns = [
      { header : 'Section' , key : 'productcategoryid', width: 15 },
      { header : 'Sample Name' , key : 'samplename', width: 15 },
      { header : 'Buyer' , key : 'buyer', width: 15 },
      { header : 'Sales Person' , key : 'salespersonid', width: 15 },
      { header : 'Finish Type' , key : 'finishtype', width: 15 },
      { header : 'Customer' , key : 'customerid', width: 15 },
      { header : 'Part No.' , key : 'partnoid', width: 15 },
      { header : 'Length' , key : 'length', width: 15 },
      { header : 'Width' , key : 'width', width: 15 },
      { header : 'Per Qty' , key : 'perquantity', width: 15 },
      { header : 'Cost' , key : 'cost', width: 15 },
      { header : 'Min Order Qty' , key : 'minorderqty', width: 15 },
      { header : 'Rebate' , key : 'rebate', width: 15 },
      { header : 'Rebate %' , key : 'rebate', width: 15 },
      { header : 'Commission' , key : 'commission', width: 15 },
      { header : 'Commission %' , key : 'commission', width: 15 },
      { header : 'Extra Rebate' , key : 'extrarebate', width: 15 },
      { header : 'Extra Rebate %' , key : 'extrarebate', width: 15 },
      { header : 'Price' , key : 'price', width: 15 },
      { header : 'Min Order Value' , key : 'minordervalue', width: 15 },
      { header : 'Merchandiser' , key : 'merchandisercommission', width: 15 },
      { header : 'Merchandiser %' , key : 'merchandisercommission', width: 15 },
    ];
    if (pageRange) {
      if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
        return;
      }
      const url = {};
      url['order'] = 'itempriceid DESC';
      url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
      url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
      this.api.getdata('ItemPriceBuyerWises?filter=' + JSON.stringify(url)).subscribe((res: any) => {
        this.api.exportToCsv(columns, res.map(this.mapData), fileName);
      }, error1 => {
        console.log('Class: , Line:  error1 ', error1);
      });
    } else {
      this.api.exportToCsv(columns, this.selectPrices.map(this.mapData), fileName);
    }
  }
  exportToPDF(pageRange?: boolean) {
    if (pageRange) {
      if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
        return;
      }
      const url = {};
      url['order'] = 'itempriceid DESC';
      url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
      url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
      this.api.getdata('ItemPriceBuyerWises?filter=' + JSON.stringify(url)).subscribe((res: any) => {
        this.api.savePdf(this.getDataForPDF(res), 'A2', 'landscape', 'Price', 'auto');
      }, error1 => {
        console.log('here');
        console.log('Class: , Line:  error1 ', error1);
      });
    } else {
      this.api.savePdf(this.getDataForPDF(this.selectPrices), 'A2', 'landscape', 'Price' , 'auto');
      console.log(this.selectPrices);
    }
  }
  printOpen(pageRange?: boolean) {
    if (pageRange) {
      if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
        return;
      }
      const url = {};
      url['order'] = 'itempriceid DESC';
      url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
      url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
      this.api.getdata('ItemPriceBuyerWises?filter=' + JSON.stringify(url)).subscribe((res: any) => {
        this.api.OpenPrint(this.getDataForPDF(res), 'A2', 'landscape', 'Price', 'auto');
      }, error1 => {
        console.log('here');
        console.log('Class: , Line:  error1 ', error1);
      });
    } else {
      this.api.OpenPrint(this.getDataForPDF(this.selectPrices), 'A2', 'landscape', 'Price' , 'auto');
    console.log(this.selectPrices);
    }
  }
  getDataForPDF(data) {
    const Data = [[
      'S.No',
      'Section' ,
      'Sample Name',
      'Customer Sample Name',
      'Part No.',
      'Buyer',
      'Sub Buyer',
      'Sales Person',
      'Length',
      'Width',
      'Per Qty',
      'Finish Type',
      'Cost',
      'Price',
      'Min Order Qty',
      'Min Order Value',
      'Rebate',
      'Rebate %',
      'Commission',
      'Commission %',
      'Extra Rebate',
      'Extra Rebate',
      'Merchandiser',
      'Merchandiser %',
      'Size Wise Qty',
      'Size Wise Value',
      'Customer',

    ]];
    const exportData = data.map(this.mapData1);
    exportData.forEach((element, i) => {
      Data.push([
        i + 1,
         element.productcategoryid,
         element.samplename,
         element.customersamplename,
         element.partno,
         element.buyer,
         element.subbuyer,
        element.salespersonid,
        element.length,
        element.width,
         element.perquantity,
       element.finishtype,
       element.cost,
       element.price,
       element.minorderqty,
       element.minordervalue,
       element.rebate,
       element.rebatepercent,
       element.commission,
       element.commissionpercent,
       element.extrarebate,
       element.extrarebatepercent,
       element.merchandisercommission,
       element.merchandisercommpercent,
       element.sizewiseqty,
       element.sizewisevalue,
       element.customerid
      ]);
    });
    return Data;
  }
  mapData1(mapPrice) {
    return {
      productcategoryid: mapPrice.productCategory ? mapPrice.productCategory.productcategoryname : '',
      samplename: mapPrice.sample ? mapPrice.sample.samplename : '',
      customersamplename: mapPrice.sample ? mapPrice.sample.customersamplename : '',
      partno: mapPrice.partNo ? mapPrice.partNo.listitem : '',
      buyer: mapPrice.brand ? mapPrice.brand.brandname : '',
      subbuyer: mapPrice.program ? mapPrice.program.programname : '',
      salespersonid: mapPrice.salesPerson ? mapPrice.salesPerson.firstname : '',
      length: mapPrice.sample ? mapPrice.sample.length : '',
      width:  mapPrice.sample ? mapPrice.sample.width : '',
      perquantity: mapPrice.perquantity,
      finishtype: mapPrice.lov ? mapPrice.lov.listitem : '',
      cost: mapPrice.cost,
      price: mapPrice.price,
      minorderqty: mapPrice.minorderqty,
      minordervalue: mapPrice.minordervalue,
      rebate: mapPrice.rebate,
      rebatepercent: mapPrice.rebatepercent,
      commission: mapPrice.commission,
      commissionpercent: mapPrice.commissionpercent,
      extrarebate: mapPrice.extrarebate,
      extrarebatepercent: mapPrice.extrarebatepercent,
      merchandisercommission: mapPrice.merchandisercommission,
      merchandisercommpercent: mapPrice.merchandisercommpercent,
      sizewiseqty: mapPrice.sizewiseqty,
      sizewisevalue: mapPrice.sizewisevalue,
      customerid: mapPrice.customer ? mapPrice.customer.clientname : '',
    };
  }

}
