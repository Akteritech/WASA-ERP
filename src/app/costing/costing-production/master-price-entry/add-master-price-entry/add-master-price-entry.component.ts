import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ApiService} from '../../../../api.service';
import {NgForm, NgModel} from '@angular/forms';
import {Price} from '../../../model/masterpriceentry';
import {Sample} from '../../../../woven/models/sample';
import {Location} from '@angular/common';
import {OffsetSample} from '../../../../offset/models/offsetSample';
import {PflSample} from '../../../../pfl/models/pfl-sample';
import {ThermalSample} from '../../../../thermal/models/thermal-sample';
import {ScreenPrintSample} from '../../../../screenPrint/models/screen-print-sample';
import {HeatTransferSample} from '../../../../HeatTransfer/models/HeatTransferSample';
declare var $: any;
@Component({
  selector: 'app-add-master-price-entry',
  templateUrl: './add-master-price-entry.component.html',
  styleUrls: ['./add-master-price-entry.component.css']
})
export class AddMasterPriceEntryComponent implements OnInit {
  dropdownSettings = {};
  partsNoValue: any;
  partsNo: any;
  searching: any;
  response: any;
  allclient: boolean;
  HandM: boolean;
  selectAllClients: any;
  masterPrice: any;
  departments: any;
  currentRoute: any;
  @Output() added = new EventEmitter<boolean>();
  @Input() id: number;
  prods: any;
  samples: any;
  selectedSample: any;
  salespersons: any;
  brands: any;
  finishtypes: any;
  clients: any;
  commissionpercent: any;
  rebatepercent: any;
  extrarebatepercent: any;
  merchandisercommpercent: any;
  hmpercentage: any;
  editId: any;
  dropdownSettingsForSales: {};
  yarnDetails: any;
  allSalesExecutive: Boolean;
  customers = [];
  clientDataArray = [];
  salespersonsData = [];
  clientsMy: any;
  selectedClients: any;
  salePersons: any;
  subbrands: any;
  CustomerData: any;
  salespersonArray1: any;
   subBrand: any;
  customer: any;
  Brand: any;
   subBrands: any;
   offsetmaterialdetails: any;
   offsetSelectedSample: any;
   pflmaterialdetails: any;
   thermalmaterialdetails: any;
   heattransfermaterialdetails: any;
   screenprintmaterialdetails: any;
   resp: any;
   salesexecutive: any;
   data: any;
  parts: any;
   s: any;
   part: void[];
   p: { partno: any }[];
   item: any;
   listitems: any[];
   buyer: any;
   subbuyer: any;
   section: any;
   parttabledata: any;
   partno: any;
  constructor(private _location: Location, public api: ApiService, private route: ActivatedRoute, private router: Router) {
    this.selectedClients = [];
    this.salePersons = [];
    this.salespersonArray1 = [];
    this.CustomerData = [];
    this.masterPrice = new Price();
    this.selectedSample = new Sample();
    this.selectedSample = new OffsetSample();
    this.selectedSample = new PflSample();
    this.selectedSample = new ThermalSample();
    this.selectedSample = new ScreenPrintSample();
    this.selectedSample = new HeatTransferSample();
    if (!this.masterPrice.partnoid) { this.masterPrice.partnoid = 1216; }
    if (this.masterPrice.price) {
      this.masterPrice.minordervalue = (this.masterPrice.minorderqty / this.masterPrice.perquantity) * this.masterPrice.price;
    }
    if (this.masterPrice.sizewiseqty && this.masterPrice.price && this.masterPrice.perquantity) {
      this.masterPrice.sizewisevalue = (this.masterPrice.sizewiseqty * this.masterPrice.price) / this.masterPrice.perquantity;
    }
    this.route.params.subscribe(params => {
      if (params.id) {
        this.editId = params.id;
        this.getItemMasterEntry(params.id);
        // this.getDataOnEdit(params.id);
        this.optionsLookupUpdateClient('a');
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
  getSearchedClient() {
    this.api.getdata('Customers?filter={"where":{"clientname":{"like":"%25' + this.searching + '%25"}}}').subscribe((res: any) => {
          this.clients = res;
    });
  }
  resetForm() {
    this.selectedClients = [];
    this.salePersons = [];
    this.salespersonArray1 = [];
    this.CustomerData = [];
    this.masterPrice = new Price();
    this.selectedSample = new Sample();
  }
  ngOnInit() {
    // document.getElementById('allcustomers').checked = true;
    this.getfinishType();
    // this.getProductCategorytype();
    this.clients = [];
    this.selectedClients = [];
    this.optionsLookupSalePerson();
    this.HMclients();
// this.optionsLookupClient();
    if (this.editId) {
      setTimeout(() => {
        if (this.selectedSample) {
          this.updateSelection('Sample_name', this.masterPrice.sample.samplename);
          this.selectedSample = this.masterPrice.sample.sampleid;
        }
        // if (this.masterPrice.partnoid) {
        //   this.updateSelection('partnoid', this.masterPrice.partNo.listitem);
        //   this.masterPrice.partnoid = this.masterPrice.partNo.id;
        // }

        console.log('timeout called at 1000');
      }, 1000);
    }

    this.optionsLookupSampleItems('a');
  }

  updateSelection (domName, selectionText) {
    document.getElementsByName(domName)[0].firstChild['value'] = selectionText;
    document.getElementsByName(domName)[0].childNodes[2]['innerHTML'] = '';
  }

  clearSalesPerson() {
    this.masterPrice.salespersonid = '';
  }
//   isDisable(istrue?: boolean) {
// if (this.editId) {
//   this.istrue = true;
// } else {
//   this.istrue = false;
//   this.
// }
//   }
  getDataOnEdit(id) {
    this.api.getdataByid('ItemPriceBuyerWises' + '?filter[include]=' +
        'sample&filter[include]=partNo&filter[include]=customer&filter' +
        '[include]=brand&filter[include]=productCategory&filter[include]=salesPerson&filter[include]=lov', id).subscribe((res: any) => {
      this.masterPrice = res;
      // this.section = res.productCategory.productcategoryname;
      // this.buyer = res.brand.brandname;
      // this.subbuyer = res.program.programname;
      console.log(res);
      setTimeout( () => {
        if (res.salespersonid === -1) {
          this.allSalesExecutive = true;
        } if (res.customerid === -1) {
          this.s.selected = true;
        }
      }, 500);
    });
  }
getPartNos() {
    this.api.getdata('SampleWisePartsLengths?filter[where][partsid]=' + this.masterPrice.partnoid).subscribe((resp: any) => {
this.parttabledata = resp;
console.log(this.parttabledata);
      this.api.getdata('Lovs?filter[where][id]=' + resp[0].partnoid).subscribe((respo: any) => {
        this.partno = respo;
        this.masterPrice.partnoid = this.partno[0].id;
        console.log(this.partno);
      });
    });
}
  getItemMasterEntry(id) {
    this.api.getdata('ItemPriceBuyerWises/' + id + '?filter[include]=' +
        'sample&filter[include]=partNo&filter[include]=customer&filter' +
        '[include]=brand&filter[include]=productCategory&filter[include]=salesPerson&filter[include]=lov&filter[include]=program').subscribe((res: any) => {
      this.masterPrice = res;
      console.log(res);
      this.section = res.productCategory.productcategoryname;
      this.buyer = res.brand.brandname;
      this.subbuyer = res.program.programname;
      this.api.getdata('Customers?filter[where][clientid]=' + this.masterPrice.customerid).subscribe((resp: any) => {
        this.customer = resp;
        console.log(resp);
        this.getPartNos();
        setTimeout( () => {
          if (res.salespersonid === -1) {
            this.allSalesExecutive = true;
          } if (res.customerid === -1) {
            this.s.selected = true;
          }
        }, 500);
      }, err => {
        console.log(err);
      });
      this.masterPrice.sampleid = res.sample.sampleid;
    }, err => {
      console.log(err);
    });
  }
  backClicked() {
    this._location.back();
  }
  optionsLookupSalePerson() {
    this.api.getdata('SalesPersonLists').subscribe((res: any) => {
      this.salespersons = res;
    }, err => {
      console.log(err);
    });
  }
getSalesExecutive() {
  this.api.getdata('SampleGeneralSpecs?filter[where][sampleid]=' + this.selectedSample.sampleid).subscribe((res: any) => {
    this.salesexecutive = res;
    // this.masterPrice.salespersonid = res[0].salesid;
  });
}
  getfinishType() {
    this.api.getdata('lovs?filter[limit]=100&filter[where][lovtype]=Finish Type').subscribe(res => {
      console.log(res);
      this.finishtypes = res;
      return res;
    }, error1 => {
      console.log(error1);
    });
  }
  HMclients() {
    // if (this.masterPrice.hmpercentage === true) {
      this.selectedClients = [];
      this.api.getdata('Customers?filter[where][hmallocated]=1').subscribe((res: any) => {
        this.clients = res;
        // console.log(this.samples);
      }, error1 => {
        console.log('error1 ', error1);
      });
  }
  optionsLookupUpdateClient(query) {
    this.api.getdata('Customers?filter={"limit":40,"where":{"clientname":{"like":"%25' + query + '%25"}}}').subscribe((res: any) => {
      this.clientsMy = res;
      // console.log(this.samples);
    }, error1 => {
      console.log('error1 ', error1);
    });
  }
  optionsLookupClient() {
    // if (this.allclient === true) {
      this.api.getdata('Customers').subscribe((res: any) => {
        this.clients = res;
        // console.log(this.samples);
      }, error1 => {
        console.log('error1 ', error1);
      });
  }
  selectAll() {
    this.selectedClients = [];
    console.log(this.selectedClients);
    if (this.selectAllClients === true) {
      this.masterPrice.customerid = !this.masterPrice.customerid;
      this.clients.forEach(item => {
        item.selected = true;
        this.selectedClients.push(item);
      });
      console.log(this.selectedClients);
    } else {
      this.clients.forEach(item => {
        item.selected = false;
        this.selectedClients.splice(item);
      });
      console.log(this.selectedClients);
      this.selectedClients = [];
    }
  }
   selectClients( item, i) {
    if (item.selected === true) {
      this.masterPrice.customerid = !this.masterPrice.customerid;
      this.selectedClients.push(item);
      console.log(this.selectedClients);
    } else {
      const index = this.selectedClients.indexOf(item);
      if (index !== -1) {
        this.selectedClients.splice(index, 1);
      }
      console.log(this.selectedClients);
      this.selectAllClients = false;
    }
  }
  optionsLookupSampleItems(query) {
    const filter: any = {};
    filter['where'] = {};
    filter['order'] = 'sampleid DESC';
    filter['limit'] = 20;
    filter['where']['samplename'] = {};
    filter['where']['samplename']['like'] = '%25' + query + '%25';
    this.yarnDetails = '';
    this.offsetmaterialdetails = '';
    this.pflmaterialdetails = '';
    this.thermalmaterialdetails = '';
    this.heattransfermaterialdetails = '';
    this.screenprintmaterialdetails = '';
    this.api.getdata('SampleGeneralSpecs?filter=' + JSON.stringify(filter)).subscribe( (res: any) => {
      this.samples = res;
      if (this.masterPrice.productcategoryid === 7) {
        this.masterPrice.perquantity = 100;
      } else {
        this.masterPrice.perquantity = 1000;
      }
      console.log(res);
    }, error1 => {
      console.log('error1 ', error1);
    });
  }
  getPartBySample() {
    this.api.getdata('ItemPriceBuyerWises/getPartNo?Sampleid=' + this.selectedSample.sampleid).subscribe((resp: any[]) => {
      this.listitems = resp;
      console.log(resp); });
  }
  getLengthWidth() {
    this.api.getdata('SampleWisePartsLengths?filter[where][partsid]=' + this.masterPrice.partnoid).subscribe((res: any) => {
      this.masterPrice.length = res[0].length;
      this.masterPrice.width = res[0].width;
      console.log(res);
    }, error2 => {
      console.log(error2);
    });
  }
  getDataFromSample() {
this.api.getdata('SampleGeneralSpecs?filter[where][sampleid]=' + this.selectedSample.sampleid).subscribe((res: any) => {
  this.masterPrice.length = res[0].length;
  this.masterPrice.width = res[0].width;
  this.buyer = res[0].brand.brandname;
  this.masterPrice.buyer = res[0].brandid;
  this.masterPrice.productcategoryid = res[0].productcategoryid;
  this.section = res[0].productCategory.productcategoryname;
  this.subbuyer = res[0].program.programname;
  this.masterPrice.subbuyer = res[0].programid;
  console.log( this.masterPrice.buyer);

});
  }

  getWovenYarnDetails() {
      this.api.getdata('WovenYarnDetails?filter[where][sampleid]=' + this.selectedSample.sampleid).subscribe((res: any) => {
        // this.materialname = res[0].
        this.yarnDetails = res;
        console.log(res);
      }, error => {
        console.log(error);
      });
  }
getOffsetMaterialDetails() {
    this.api.getdata('SampleWiseMaterialDetails?filter[where]' +
        '[sampleid]=' + this.selectedSample.sampleid + '&filter[include]=item').subscribe((res: any) => {
      this.offsetmaterialdetails = res;
      console.log(this.offsetmaterialdetails);
    });

}
// getPflMaterialDetails() {
//       this.api.getdata('SampleWiseMaterialDetails?filter[where]' +
//           '[sampleid]=' + this.selectedSample.sampleid + '&filter[include]=item').subscribe((res: any) => {
//         this.pflmaterialdetails = res;
//         console.log(this.pflmaterialdetails);
//       });
// }
// getThermalMaterialDetails() {
//       this.api.getdata('SampleWiseMaterialDetails?filter[where]' +
//           '[sampleid]=' + this.selectedSample.sampleid + '&filter[include]=item').subscribe((res: any) => {
//         this.thermalmaterialdetails = res;
//         console.log(this.thermalmaterialdetails);
//       });    }
// getHeattransferMaterialDetails() {
//     this.api.getdata('SampleWiseMaterialDetails?filter[where]' +
//         '[sampleid]=' + this.selectedSample.sampleid + '&filter[include]=item').subscribe((res: any) => {
//       this.heattransfermaterialdetails = res;
//       console.log(this.heattransfermaterialdetails);
//     });
// }
// getScreenPrintMaterialDetails() {
//     this.api.getdata('SampleWiseMaterialDetails?filter[where]' +
//         '[sampleid]=' + this.selectedSample.sampleid + '&filter[include]=item').subscribe((res: any) => {
//       this.screenprintmaterialdetails = res;
//       console.log(this.screenprintmaterialdetails);
//     }); }

  patch(form: NgForm) {
    if (!this.masterPrice.productcategoryid) {
      this.api.showWarningToast(' section is required', '');
      return;
    } else if (!this.masterPrice.salespersonid && this.allSalesExecutive !== true) {
      this.api.showWarningToast(' Sales Person  required', '');
      return;
    } else if (!this.masterPrice.buyer) {
      this.api.showWarningToast('buyer name is required', '');
      return;
    } else if (!this.masterPrice.price) {
      this.api.showWarningToast('price is required', '');
      return;
    }  else if (!this.masterPrice.partnoid) {
      this.api.showWarningToast('partno.  is required', '');
      return;
    } else if (this.selectedClients.length < 1) {
      this.api.showWarningToast('customer is required', '');
      return;
    } else if (this.masterPrice.width < 0) {
      this.api.showWarningToast('any field should not be negative', '');
      return;
    }
    if (this.allSalesExecutive === true) {
      this.masterPrice.salespersonid = -1;
    }
    this.masterPrice.sampleid = this.selectedSample.sampleid;
    this.masterPrice.minordervalue = (this.masterPrice.minorderqty / this.masterPrice.perquantity) * this.masterPrice.price;
    this.masterPrice.sizewisevalue = (this.masterPrice.sizewiseqty * this.masterPrice.price) / this.masterPrice.perquantity;
    this.api.getdata('ItemPriceBuyerWises?filter[where][sampleid]=' + this.selectedSample.sampleid + '&filter[where][customerid]=' + this.selectedClients[0].clientid + '&filter[where][partnoid]=' + this.masterPrice.partnoid + '&filter[where][salespersonid]=' + this.masterPrice.salespersonid).subscribe((res1: any) => {
      console.log(res1);
      if (res1.length < 1) {
        if (((this.selectedClients.length >= 1 && this.selectedClients.length <= 1574 )  && this.masterPrice.salespersonid )) {
          console.log('if first');
          this.selectedClients.forEach(item => {
            this.masterPrice.customerid = item.clientid;
            this.masterPrice.sampleid = this.selectedSample.sampleid;
            // ItemPriceBuyerWises/addItemPrice
            this.api.patchdata('ItemPriceBuyerWises/addItemPrice', this.masterPrice).subscribe(res => {
              this.response = res;
              console.log(res);
              this.added.emit(true);
            }, err => {
              this.api.showFailureToast('Error', err.message);
              console.log(err);
            });
          });
          this.api.showSuccessToast('Master Entry Price  Added Successfully');
        } else if ((this.selectedClients.length >= 1574 && this.masterPrice.salespersonid)) {
          console.log(' else if 2');
          this.masterPrice.customerid = -1;
          this.masterPrice.sampleid = this.selectedSample.sampleid;
          this.api.patchdata('ItemPriceBuyerWises/addItemPrice', this.masterPrice).subscribe(res => {
            this.response = res;
            console.log(res);
            this.api.showSuccessToast('Master Entry Price  Added Successfully');
            this.added.emit(true);
          }, err => {
            this.api.showFailureToast('Error', err.message);
            console.log(err);
          });
        } else if (this.selectedClients.length >= 1574 && this.allSalesExecutive === true) {
          console.log(' else if 3');
          this.masterPrice.customerid = -1;
          this.masterPrice.salespersonid = -1;
          this.masterPrice.sampleid = this.selectedSample.sampleid;
          this.api.patchdata('ItemPriceBuyerWises/addItemPrice', this.masterPrice).subscribe(res => {
            this.response = res;
            this.api.showSuccessToast('Master Entry Price  Added Successfully');
            this.added.emit(true);
          }, err => {
            this.api.showFailureToast('Error', err.message);
            console.log(err);
          });
        } else if (this.allSalesExecutive === true) {
          this.selectedClients.forEach(item => {
            this.masterPrice.customerid = item.clientid;
            this.masterPrice.salespersonid = -1;
            this.masterPrice.sampleid = this.selectedSample.sampleid;
            this.api.patchdata('ItemPriceBuyerWises/addItemPrice', this.masterPrice).subscribe(res => {
              this.response = res;
              console.log(res);
              this.added.emit(true);
            }, err => {
              this.api.showFailureToast('Error', err.message);
              console.log(err);
            });
          });
          this.api.showSuccessToast('Master Entry Price  Added Successfully');
        }
      } else {
        this.api.showWarningToast(  'Price already exist on this Sample', '');
      }
      }, err => {
      console.log('  4');
      this.api.showFailureToast(`Master Price ${this.masterPrice.itempriceid} not added. Please try again`, '');
      console.log(err);
    });
  }

  update(form: NgForm) {
    if (!this.masterPrice.productcategoryid) {
      this.api.showWarningToast(' section is required', '');
      return;
    } else if (!this.masterPrice.partnoid) {
      this.api.showWarningToast('partno.  is required', '');
      return;
    } else if (!this.masterPrice.buyer) {
      this.api.showWarningToast('buyer name required', '');
      return;
    } else if (this.masterPrice.width < 0) {
      this.api.showWarningToast('field should not be negative', '');
      return;

    }
      // setTimeout(() => {
        if (((this.selectedClients.length >= 1 && this.selectedClients.length < 30 )  && this.masterPrice.salespersonid )) {
          console.log('if first');
          this.selectedClients.forEach(item => {
            this.masterPrice.customerid = item.clientid;
            this.masterPrice.sampleid = this.masterPrice.sample.sampleid;
            // ItemPriceBuyerWises/addItemPrice
            this.api.patchdata('ItemPriceBuyerWises/addItemPrice', this.masterPrice).subscribe(res => {
              this.response = res;
              console.log(res);
              this.added.emit(true);
              this.router.navigateByUrl('costing/masterprice/add');
            }, err => {
              this.api.showFailureToast('Error', err.message);
              console.log(err);
            });
          });
          this.api.showSuccessToast('Master Entry Price  Added Successfully');
        } else if ((this.selectedClients.length > 30 && this.masterPrice.salespersonid)) {
          console.log(' else if 2');
          this.masterPrice.customerid = -1;
          this.masterPrice.sampleid = this.masterPrice.sample.sampleid;
          this.api.patchdata('ItemPriceBuyerWises/addItemPrice', this.masterPrice).subscribe(res => {
            this.response = res;
            console.log(res);
            this.api.showSuccessToast('Master Entry Price  Added Successfully');
            this.added.emit(true);
            this.router.navigateByUrl('costing/masterprice/add');
          }, err => {
            this.api.showFailureToast('Error', err.message);
            console.log(err);
          });
        } else if (this.selectedClients.length > 30 && this.allSalesExecutive === true) {
          console.log(' else if 3');
          this.masterPrice.customerid = -1;
          this.masterPrice.salespersonid = -1;
          this.masterPrice.sampleid = this.masterPrice.sample.sampleid;
          this.api.patchdata('ItemPriceBuyerWises/addItemPrice', this.masterPrice).subscribe(res => {
            this.response = res;
            this.api.showSuccessToast('Master Entry Price  Added Successfully');
            this.added.emit(true);
            this.router.navigateByUrl('costing/masterprice/add');
          }, err => {
            this.api.showFailureToast('Error', err.message);
            console.log(err);
          });
        } else if (this.allSalesExecutive === true) {
          this.selectedClients.forEach(item => {
            this.masterPrice.customerid = item.clientid;
            this.masterPrice.salespersonid = -1;
            this.masterPrice.sampleid = this.masterPrice.sample.sampleid;
            this.api.patchdata('ItemPriceBuyerWises/addItemPrice', this.masterPrice).subscribe(res => {
              this.response = res;
              console.log(res);
              this.added.emit(true);
              this.router.navigateByUrl('costing/masterprice/add');
            }, err => {
              this.api.showFailureToast('Error', err.message);
              console.log(err);
            });
          });
          this.api.showSuccessToast('Master Entry Price  Added Successfully');
        } else {
          console.log('sds');
          this.selectedClients = this.masterPrice.customer.clientid;
          this.masterPrice.sampleid = this.masterPrice.sample.sampleid;
          this.api.patchdata('ItemPriceBuyerWises/addItemPrice', this.masterPrice).subscribe(res => {
            this.response = res;
            this.api.showSuccessToast('Master Entry Price  Added Successfully');
            this.added.emit(true);
            this.router.navigateByUrl('costing/masterprice/add');
          }, err => {
            this.api.showFailureToast('Error', err.message);
            console.log(err);
          });
        }
  }
}
