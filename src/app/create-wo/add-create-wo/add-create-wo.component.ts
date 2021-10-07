import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from '../../api.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Location} from '@angular/common';
import {SuiModalService} from 'ng2-semantic-ui';
import {
  WorkOrderBreakdownDetail,
  WorkOrderDetail,
  WorkOrderMaster
} from '../../woven/models/work-order';
import {Sample} from '../../woven/models/sample';
import {PopDetails} from '../../templates/pop-compo/pop-compo.component';
import {NgForm} from '@angular/forms';
import {ConfirmModal} from '../../templates/confirm-modal/confirm-modal.component';
import {read, utils} from 'xlsx';
import { Observable } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-add-create-wo',
  templateUrl: './add-create-wo.component.html',
  styleUrls: ['./add-create-wo.component.css']
})
export class AddCreateWoComponent implements OnInit {
  Dozen: Boolean;
  collapseSalutation = false;
  collapseTable = false;
  master: any;
  detail: WorkOrderDetail;
  partsDATA: any;
  PARTSID: any;
  newRows = 1;
  breakdownDetails: WorkOrderBreakdownDetail[] ;
  selectedbreahdowndetails2 = [];
  FabricCompositions: any;
  orderTypes: any;
  finishTypes: any;
  partsNo: any;
  partsNoValue: any;
  mastercompanyname: any;
  masterclientname: any;
  item: any;
  parts: any;
  brands: any;
  customers: any;
  deleveryParty: any[];
  companies: any;
  DataCompanies: any[];
  salesPersons: any;
  employees2: any;
  items: any;
  clients: any;
  editId: any;
  company: any;
  response: any;
  currentRoute: any;
  sampleColors: any;
  samplePrice: any;
  samples: any;
  selectSample: any;
  @Input() id: number;
  sampleFinishTypes: any;
  mydata = false;
  @Output() added = new EventEmitter<number>();
  myComp: any;
  mycustName: any;
  custAdd: any;
  buyerName: any;
  salesName: any;
  custService: any;
  deleveryPartyName: any;
  myFinishType: any;
  myColor: any;
  MyFabric: any;
  myPrice: any;
  file: any;
  subBrand: any;
  minDateEst: any;
  minDateRcv: any;
  minDateEstPar: any;
  selectAllbreahdowndetails: any;
  priceRqt: boolean;
  partRqt: boolean;
  colorRqt: boolean;
  selectSampleColor: any;
   orders: any;
   listitems: any[];
   price: any[];
   customer: any[];
   executive: any;

  constructor(public api: ApiService, public router: Router ,
              private route: ActivatedRoute,
              private _location: Location, public modalService: SuiModalService) {
    this.master = new WorkOrderMaster();
    this.detail = new WorkOrderDetail();
    this.breakdownDetails = [new WorkOrderBreakdownDetail()];
    this.minDateRcv = new Date();
    this.minDateEstPar = new Date();
    this.minDateEst = new Date(this.minDateRcv.getFullYear(), this.minDateRcv.getMonth(), this.minDateRcv.getDate() );
    this.selectSample = new Sample();
    this.master.orderreceivedate = new Date();
    this.customers = [];
    this.companies = [];

    this.route.params.subscribe(param => {
      if (param.id) {
        this.editId = param.id;
        this.getBreakDownDetails(param.id);
      }
    });

    // edit router
    this.router.events.subscribe(
        (event: any) => {
          if (event instanceof NavigationEnd) {
            this.currentRoute = this.router.url;
          }
        }
    );
  }

  // trnsition() {
  //   $('.autumn').transition('scale');
  // }

  partialDeleveryData() {
    if(!this.master.estdeliverdate) return;
    console.log(this.master.estdeliverdate);
    this.minDateEstPar = this.master.estdeliverdate;
  }
  
  fileChanged(e) {
    this.file = e.target.files[0];
  }

  uploadDocumentForCottonon(cartonSticker: boolean) {
    const reader = new FileReader();
    let workbookkk;
    let XL_row_object;
    let json_object;
    return new Promise((resolve, reject) => {
      console.log('starts reading');
      reader.onload = (e) => {
        const data = reader.result;
        workbookkk = read(data, {type: 'binary'});
        workbookkk.SheetNames.forEach( (sheetName) => {
          XL_row_object = utils.sheet_to_json(workbookkk.Sheets[sheetName]);
          json_object = JSON.stringify(XL_row_object);
          const obj: any[] = XL_row_object;

          this.breakdownDetails = obj.map((element: any) => {
            const currentBreakdown = new WorkOrderBreakdownDetail();
            currentBreakdown.breakdownqty = element['QTY Labels'];
            currentBreakdown.keyentry1 = element['STYLE COLOUR'];
            currentBreakdown.keyentry2 = element['SIZE'];
            currentBreakdown.keyentry3 = element['BARCODE'];
            currentBreakdown.keyentry4 = element['Destination'];
            if(!currentBreakdown.keyentry3) currentBreakdown.keyentry3 = '';

            if(cartonSticker) {
              const qty: number = currentBreakdown.breakdownqty;
              if(qty <= 40) currentBreakdown.breakdownqty = 2;
              else currentBreakdown.breakdownqty = Math.round((qty / 40) * 2);
            }

            return currentBreakdown;
          });
          this.updateQuantity(0);
        });
      };
      reader.readAsBinaryString(this.file);
    });
  }

  async previewDetails() {
    this.api.getdata('comp?filter[where][companyid]=' + this.mastercompanyname).subscribe( (res: any) => {
      this.myComp = res[0].companyname;
      this.api.getdata('customers?filter[where][clientid]=' + this.masterclientname).subscribe( (res1: any) => {
        this.mycustName = res1[0].clientname;
        this.custAdd = res1[0].currentaddress;

      });
      console.log(this.myComp);
    });
    await this.api.getdata('brands?filter[where][brandid]=' + this.master.brandid).subscribe( (res2: any) => {
      this.buyerName = res2[0].brandname;
    });
    await this.api.getdata('customers?filter[where][clientid]=' + this.master.dalivaryid).subscribe( (res3: any) => {
      this.deleveryPartyName = res3[0].clientname;
      console.log(this.deleveryParty + ' deleveryParty');
    });
    await this.api.getdata('EmployeePersonalInfos?filter[where][empId]=' + this.master.customerserviceid).subscribe( (res4: any) => {
      this.custService = res4[0].firstname;
      console.log(this.custService + ' custService');
    });
    await this.api.getdata('EmployeePersonalInfos?filter[where][empId]=' + this.master.salespersonid).subscribe( (res5: any) => {
      this.salesName = res5[0].firstname;
      console.log(this.salesName + ' salesName');
    });
    await this.api.getdata('samplecolors?filter[where][samplecolorid]=' + this.detail.samplecolorid).subscribe( (res7: any) => {
      this.myColor = res7[0].samplecolorname;
      console.log(this.myColor + ' myColor');
    });
    await this.api.getdata('lovData?filter[where][id]=' + this.detail.finishtype).subscribe( (res8: any) => {
      this.myFinishType = res8[0].listitem;
    });
    await this.api.getdata('lovData?filter[where][id]=' + this.master.fabriccomposition).subscribe( (res9: any) => {
      this.MyFabric = res9[0].listitem;
    });
    await $('.woven').modal('setting', 'closable', false).modal({centered: false,  onDeny    : function() {
        return false;
      }}).modal('toggle');
  }

  resetform(hardReset: boolean = false) {
    if(hardReset) {
      this.master = new WorkOrderMaster();
      this.selectSample = new Sample();
      this.master.orderreceivedate = new Date();
      this.customers = [];
      this.mastercompanyname = '';
      this.masterclientname = '';
      this.companies = [];
      this.master.customerserviceid =  '';
    }

    // this.detail = new WorkOrderDetail();
    this.detail.finishtype = null;
    this.detail.samplecolorid = null;
    this.PARTSID = '';
    this.detail.price = null;
    this.detail.orderqty = null;
    this.detail.adjamount = 0;

    this.breakdownDetails = [new WorkOrderBreakdownDetail()];
    // this.item = '';
    
  }

  AddNewFabrib() {
    this.modalService
        .open(new PopDetails('Add New Fabric Composition ', 'lov'))
        .onApprove(() => {
        })
        .onDeny(() => {
          this.optionsFabricComposition('a');
          this.api.showInfoToast('Search Added New Fabric Composition');
          // console.log('added');
        });
  }

  getWorkOrderMaster(id) {
    if (id) {
      this.api.getdata('WorkOrderMasters/' + id +
          '?filter[include]=sample&filter[include]=customer&filter[include]=company&filter[include]' +
          '=salesExecutive&filter[include]=myORTP&filter[include]=deliveryParty&filter[include]=' +
          'customerService&filter[include]=details&filter[include]=breakdownDetails&filter[include]=brand')
          .subscribe( (res: any) => {
            res.partialdeldate = new Date(res.partialdeldate);
            res.estdeliverdate = new Date(res.estdeliverdate);
            this.master = res;
            this.detail = res.details[0];
            this.PARTSID = this.detail.partsid;
            this.getPartNos();
            setTimeout( () => {
              if (this.master.ordertype === 1) {
                this.updateSelection('ordertype', this.master.ordertype = 'Projection');
                this.master.ordertype = 1;
              }
              if (this.master.ordertype === 0) {
                this.updateSelection('ordertype', this.master.ordertype = 'Confirm');
                this.master.ordertype = 0;
              }
              if (this.master.ordertype === 2) {
                this.updateSelection('ordertype', this.master.ordertype = 'Sub Contact');
                this.master.ordertype = 2;
              }
              if (this.master.ordertype === 3) {
                this.updateSelection('ordertype', this.master.ordertype = 'pp Sample Order');
                this.master.ordertype = 3;
              }
              if (res.isfoc === true) {
                this.updateSelection('isfoc', this.master.isfoc = 'Yes');
                this.master.isfoc = 1;
              }
              if (res.isfoc === false) {
                this.updateSelection('isfoc', this.master.isfoc = 'No');
                this.master.isfoc = 0;
              }

              this.api.getdata('lovData/' + this.detail.finishtype).subscribe((res: any[]) => this.finishTypes = [res]);

              this.api.getdata('samplecolors?filter[where][sampleid]=' + this.master.sampleid ).subscribe( (colors: any) => {
                this.sampleColors = colors;
              });

              this.api.getdata('SampleGeneralSpecs/' + res.sampleid ).subscribe( (res1: any) => {
                this.updateSelection('samplename', res1.samplename);
                this.selectSample = res1;
                this.getPriceByPartNo();
                this.item = res1.samplename;
                this.api.getdata('ProductCategories/' + res1.productcategoryid  ).subscribe( (res2: any) => {
                  this.selectSample.productcategoryname = res2.productcategoryname;
                });
                this.api.getdata('ProductSubCategories/' + res1.productsubcategoryid  ).subscribe( (res3: any) => {
                  this.selectSample.productsubcategoryname = res3.productsubcategoryname;
                });
                this.api.getdata('comp/' + res.companyid ).subscribe( (res3: any) => {
                  this.mastercompanyname = res3.companyid;
                });
                this.api.getdata('programs?filter[where][programid]=' + res1.programid ).subscribe( (res5: any) => {
                  this.subBrand = res5[0].programname;
                });
                setTimeout( () => {
                  if(res.fabriccomposition == 0) return;
                  this.api.getdata('lovData?filter[where][id]=' + res.fabriccomposition ).subscribe( (fab: any) => {
                    this.FabricCompositions = fab;
                    this.master.fabriccomposition = fab[0].id;
                  });
                },1000);
                this.api.getdata('customers?filter[where][clientid]=' + res.clientid).subscribe( (cus: any[]) => {
                  this.customer = [{ClientName: cus[0].clientname, ClientID: cus[0].clientid}];
                  this.masterclientname = cus[0].clientid;
                  this.getPartNos();
                  this.getPriceByPartNo();
                });
                this.api.getdata('customers?filter[where][clientid]=' + res.dalivaryid).subscribe( (cus: any[]) => {
                  this.deleveryParty = [{ClientName: cus[0].clientname, ClientID: cus[0].clientid}];
                  this.master.dalivaryid = cus[0].clientid;
                });
                this.api.getdata('SalesPersonLists?filter[where][Emp_ID]=' + res.salespersonid).subscribe( (sales: any) => {
                  this.executive = sales;
                  this.master.salespersonid = res.salespersonid;
                  this.getPartNos();
                  this.getPriceByPartNo();
                });
                this.api.getdata('EmployeePersonalInfos?filter[where][empId]=' + res.customerserviceid).subscribe( (cuss: any) => {
                  this.employees2 = cuss;
                  this.master.customerserviceid = cuss[0].empId;
                  console.log( this.master.customerserviceid + ' customer id is');
                });

              });
            }, 1000);

            
          }, err => {
            // console.log('Line: 312 err ' + err + this.master);
          });
    }
  }

  companyChanged() {
    if(!this.master.workorderno) return;
    const year = new Date().getFullYear();
    const shortname: string = this.DataCompanies.find(
      (element: any) => element.companyid === this.mastercompanyname).shortname;
    const link = 'WorkOrderMasters?filter[limit]=1&filter[where][companyid]=' + this.mastercompanyname + '&filter[where][workorderno][like]=%/' + year + '%&filter[order]=workorderid%20desc';
    
    this.api.getdata(link).subscribe((res: any) => {
      let orderNoString: string;

      if(res.length == 0) {
        orderNoString = '1';
      }
      else {
        const currentOrder: string = res[0].workorderno;
        const currentSerial = Number.parseInt(currentOrder.substring(8, 14)) + 1;
        orderNoString = currentSerial + '';
      }

      const length = 6 - orderNoString.length;
      for(let i = 0; i < length; i++) {
        orderNoString = '0' + orderNoString;
      }
      this.master.workorderno = shortname + '-ORD-' + orderNoString + '/' + year; 
    });
  }

  Updatepatchforall(form: NgForm) {
    delete (this.master.customer);
    delete (this.master.company);
    delete (this.master.salesExecutive);
    delete (this.master.brand);
    delete (this.master.deliveryParty);
    delete (this.master.customerService);
    delete (this.master.details);
    delete (this.master.breakdownDetai);
    delete (this.master.sampleid);
    this.master.sampleid = this.selectSample.sampleid;
    this.master.companyid = this.mastercompanyname;
    this.master.clientid = this.masterclientname;
    this.master.productcategoryid = this.selectSample.productcategoryid;
    this.master.productsubcategoryid = this.selectSample.productsubcategoryid;
    this.detail.width = this.selectSample.width;
    if (!this.mastercompanyname) {
      this.api.showWarningToast('Company Name Required', '');
      return ;
    } else if (!this.masterclientname) {
      this.api.showWarningToast('Customer Name Required', '');
      return ;
    } else if (!this.master.brandid) {
      this.api.showWarningToast('Buyer Name must be selected', '');
      return ;
    }   else if (!this.master.estdeliverdate) {
      this.api.showWarningToast('Delivery date required', '');
      return;
    }   else if (!this.master.partialdeldate) {
      this.api.showWarningToast('Partial date required', '');
      return;
    }   else if (!this.master.customerpono) {
      this.api.showWarningToast('PO Reference No required', '');
      return;
    }   else if (!this.master.customerserviceid) {
      this.api.showWarningToast('Customer Service is required', '');
      return;
    } else if (!this.detail.price) {
      this.api.showWarningToast('Price is required', '');
      return;
    }   else if (!this.PARTSID) {
      this.api.showWarningToast('Part No is required', '');
      return;

    }
    this.api.patchdata('WorkOrderMasters', this.mapDataWorkOrder(this.master)).subscribe((res: any) => {
      this.response = res;
      console.log(this.response);
      if (this.response.workorderid !== 0) {
        this.detail.workorderid = this.response.workorderid;
        
        setTimeout( () => {
          this.detail.customerpono = this.master.customerpono;
          this.detail.brandid = this.master.brandid;
          this.detail.partsid = this.PARTSID ;
          this.api.patchdata('WorkOrderDetails', this.mapDataWorkOrderDetails(this.detail)).subscribe
          ((res1: any) => {
            this.breakdownDetails.forEach(item => {
              item.workorderid = res1.workorderid;
              item.partsid = this.PARTSID ;
              // item.breakdownqty = item.breakdownqty + this.detail.orderqty;
              this.api.patchdata('WorkOrderWiseBreakDownDetails', item).subscribe(res2 => {
                this.response = res2;
                this.added.emit(0);
                this.resetform();

              }, err => {
                this.api.showFailureToast('Error', err.message);
                console.log(err);
              });
            });
            this.api.showSuccessToast('Work Order Updated successfully', this.response.message);
            this._location.back();
          }, err => {
            this.api.showFailureToast('Error', err.message);
            console.log(err);
          });
        }, 1000);
      }
    }, err => {
      this.api.showFailureToast('Error', err.message);
      console.log(err);
    });
  }

  add(form: NgForm) {
    let validBreakdown = true;
    this.breakdownDetails.forEach((element: WorkOrderBreakdownDetail) => {
      if(!element.breakdownqty || element.breakdownqty <= 0) {
        this.api.showWarningToast('Enter Valid Breakdown Quantity');
        validBreakdown = false
      }
    });
    if(!validBreakdown) return;

    const sizes: Set<string> = new Set(this.breakdownDetails.map((breakdown: WorkOrderBreakdownDetail) => breakdown.keyentry2));
    sizes.forEach((size: string) => {
      let iteration = 0;
      const length = this.breakdownDetails.length;

      for (let i = 0; i < length; i++) {
        if(this.breakdownDetails[i].keyentry2 == size) iteration++;
        if(iteration == 2) {
          this.api.showWarningToast(size + ' Apeears More Than Once');
          validBreakdown = false;
          break;
        }
      }
    });
    if(!validBreakdown) return;

    if(this.mastercompanyname === 4 || this.mastercompanyname === 6) {
      if(!this.master.extracolumn1) {
        this.api.showWarningToast('Enter URN/ECOM No.');
        return;
      }

      this.api.getdata('WorkOrderMasters/?filter[where][extracolumn1]=' + this.master.extracolumn1).subscribe((res: any[]) => {
        if(res.length > 0) {
          this.api.showWarningToast('Ecom/URN Number Already Exists');
        }
        else {
          this.modalService.open(new ConfirmModal('Save Workorder?', '', 'mini')).onApprove(() => this.save(form));
        }
      });
    }
    else {
      this.modalService.open(new ConfirmModal('Save Workorder?', '', 'mini')).onApprove(() => this.save(form));
    }
  }

  save(form: NgForm) {
    this.master.sampleid = this.selectSample.sampleid;
    this.master.companyid = this.mastercompanyname;
    this.master.clientid = this.masterclientname;
    this.master.productcategoryid = this.selectSample.productcategoryid;
    this.master.productsubcategoryid = this.selectSample.productsubcategoryid;
    this.detail.length = this.selectSample.length; //* this.listitems.find((element => element.ID === this.PARTSID)).ListItem;
    this.detail.width = this.selectSample.width;

    if (!this.master.sampleid) {
      this.api.showWarningToast('Sample Name must be selected', '');
      return;

    } else if (!this.master.ordertype) {
      this.api.showWarningToast('Order type must be selected', '');
      return ;
    } else if (!this.mastercompanyname) {
      this.api.showWarningToast('Company Name Required', '');
      return ;
    } else if (!this.masterclientname) {
      this.api.showWarningToast('Customer Name Required', '');
      return ;
    } else if (!this.master.brandid) {
      this.api.showWarningToast('Buyer Name must be selected', '');
      return ;
    }   else if (!this.master.estdeliverdate) {
      this.api.showWarningToast('Delivery date required', '');
      return;
    }   else if (!this.master.partialdeldate) {
      this.api.showWarningToast('Partial date required', '');
      return;
    }   else if (!this.master.customerpono) {
      this.api.showWarningToast('PO Reference No required', '');
      return;
    }   else if (!this.master.customerserviceid) {
      this.api.showWarningToast('Customer Service is required', '');
      return;
    } else if (!this.detail.price) {
      this.api.showWarningToast('Price is required', '');
      return;
    } else if (!this.detail.samplecolorid) {
      this.api.showWarningToast('Sample color is required', '');
      return;
    }   else if (!this.PARTSID) {
      this.api.showWarningToast('Part No is required', '');
      return;

    }
    this.api.postdata('WorkOrderMasters/addWorkOrder', {data: this.master}).subscribe((res: any) => {
      this.response = res;
      if (this.response.workorderid !== 0) {
        this.detail.workorderid = this.response.workorderid;
        
        setTimeout( () => {
          this.detail.customerpono = this.master.customerpono;
          this.detail.brandid = this.master.brandid;
          this.detail.partsid = this.PARTSID ;
          this.detail.unitid = this.selectSample.unit;
          this.detail.totalbreakdown = this.breakdownDetails.length;
          this.detail.createddate = Date.now();

          this.api.postdata('WorkOrderDetails', this.detail).subscribe((res1: any) => {
            if (this.breakdownDetails.length > 0) {
              this.breakdownDetails.forEach((element: WorkOrderBreakdownDetail) => {
                element.workorderid = res1.workorderid;
                
                element.partsid = this.PARTSID ;
                this.api.postdata('WorkOrderMasters/createBreakdown', {data: element}).subscribe(res2 => {
                  this.response = res2;
                  this.resetform();
                }, err => {
                  this.api.showFailureToast('Error', err.message);
                  console.log(err);
                });
              });
            } 

            this.api.getdata('WorkOrderMasters/' + res.workorderid).subscribe((wo: any) => {
              this.api.showSuccessToast(wo.workorderno + ' added successfully');
              this.added.emit(wo.workorderid);
            });

          }, err => {
            this.api.showFailureToast('Error', err.message);
            console.log(err);
          });
        }, 1000);
      }
    }, err => {
      this.api.showFailureToast('Error', err.message);
      console.log(err);
    });
  }

  async getBreakDownDetails(id) {
    this.api.getdata('WorkOrderWiseBreakDownDetails?filter[where][workorderid]=' + id).subscribe( (res: any) => {
      this.breakdownDetails = res;
      //this.breakdownDetails2 = res;
    }, err => {
      // console.log('Line: 323 err ', err);
    });
  }
  selectedSampleDate() {
    this.mastercompanyname = this.selectSample.companyid;

    this.master.brandid = this.selectSample.brandid;
    this.item = this.selectSample.samplename;
    this.detail.length = this.selectSample.length
    this.selectSample.productcategoryname = this.selectSample.productCategory.productcategoryname;
    if (this.selectSample.programid) {
      this.subBrand = this.selectSample.program.programname;
    } else if (this.selectSample.productsubcategoryid) {
      this.selectSample.productsubcategoryname = this.selectSample.productSubCategory.productsubcategoryname;
    }
    this.priceRqt = true;
  }
  getPrintColor() {
    this.api.getdata('samplecolors?filter[where][samplecolorid]=' + this.detail.samplecolorid).subscribe( (res: any) => {
      if (!res[0].samplecolorid) {
        console.log('error');
      } else if (res[0].samplecolorid) {
        this.selectSampleColor = res[0].printcolor;

        this.colorRqt = true;
        // console.log(res);
      }
    }, error1 => {
      // console.log('error1 ', error1);
    });
  }
  getSampleColor() {
    setTimeout( () => {
      this.colorRqt = false;
      this.detail.samplecolorid = '';
      this.api.getdata('samplecolors?filter[where][sampleid]=' + this.selectSample.sampleid).subscribe( (res: any) => {
        if (!res[0].samplecolorid) {
          console.log('error');
        } else if (res[0].samplecolorid) {
          this.sampleColors = res;
          this.detail.samplecolorid = res[0].samplecolorid;
          this.selectSampleColor = res[0].printcolor;

          this.colorRqt = true;
          // console.log(res);
        }
      }, error1 => {
        // console.log('error1 ', error1);
      });
    }, 1500);
  }
  optionsLookupWorkOrder(query) {
    this.api.getdata('WorkOrderMasters?filter={"order":"workorderid DESC","limit":20,"where":{"workorderno":{"like":"%25'
        + query + '%25"}}}').subscribe( (res: any) => {
      this.orders = res;

    }, error1 => {
      console.log('error1 ', error1);
    });
  }

  searchCustomers(query: string): Observable<any> {
    return this.api.getdata(`customers?filter[limit]=10&filter[where][clientname][like]=%` + query + `%`);
  }

  optionsLookupCustomer(query: string) {
    this.searchCustomers(query).subscribe((res: any[]) => {
      this.customer = res.map((element: any) => {
        return {ClientName: element.clientname, ClientID: element.clientid}
      });
    });
  }

  optionsLookupDelivery(query: string) {
    this.searchCustomers(query).subscribe((res: any[]) => {
      this.deleveryParty = res.map((element: any) => {
        return {ClientName: element.clientname, ClientID: element.clientid}
      });
    });
  }

  getCustomeBySampleid() {
    this.api.getdata('WorkOrderMasters/getCustomerBySampleid?Sampleid=' + this.selectSample.sampleid).subscribe((resp: any[]) => {
      if(resp[0].ClientID == -1) this.optionsLookupCustomer('a');
      else if(resp[0].ClientID == -2) this.priceRqt = false;
      else this.customer = resp;
    });
    this.customer = [];
    this.priceRqt = true;
  }

  getExecutiveBySampleid() {
    this.api.getdata('WorkOrderMasters/getExecutiveBySampleid?Sampleid=' + this.selectSample.sampleid  + '&customer=' + this.masterclientname).subscribe((resp: any) => {
      
      if(resp[0].SalesPeron == -1) this.optionsLookupSalesPerson('a');
      else {
        this.executive = resp;
      }
    });
  }

  optionsLookupEmployee(query: string) {
    let link = 'EmployeeOfficialInfos/getCustomerServices';
    if(query) link += '?name=' + query;
    this.api.getdata(link).subscribe((res: any[]) => this.employees2 = res)
    //this.searchEmployee(query).subscribe((res: any) => this.employees2 = res);
  }

  optionsLookupSalesPerson(query: string) {
    this.api.getdata('SalesPersonLists?filter[where][SalesPeron][like]=%' + query + '%&filter[limit]=10').subscribe((res: any[]) => {
      this.executive = res;
    });
  }

  getPartNos() {
    if(!this.selectSample.sampleid || !this.master.salespersonid) return;
    const link = 'WorkOrderMasters/getPartNoByPrice?Sampleid=' + this.selectSample.sampleid + '&salesPerson=' + this.master.salespersonid + '&customer=' + this.masterclientname; 
    this.api.getdata(link).subscribe((resp: any[]) => {
      this.listitems = resp;
      if(this.PARTSID) this.getPriceByPartNo()
    });
  }

  getPriceByPartNo() {
    const link = 'ItemPriceBuyerWises/getLatestPrice?sampleid=' + this.selectSample.sampleid + '&partnoid=' + this.PARTSID + '&cutomer=' + this.masterclientname + '&salesPerson=' + this.master.salespersonid;

    if(!this.selectSample.sampleid || !this.PARTSID || !this.masterclientname || !this.master.salespersonid) return;
    this.api.getdata(link).subscribe((resp: any) => {
      this.price = resp;
      this.detail.price = resp[0].Price;
    });
    const itemSearch = this.listitems.find((element => element.ID === this.PARTSID));
    if(itemSearch)  this.detail.length = this.selectSample.length * itemSearch.ListItem;
  }

  getFinishTypes() {
    this.detail.finishtype = '';
    this.api.getdata('WovenCommonDetails?filter[where][sampleid]=' + this.selectSample.sampleid).subscribe( (res: any) => {
      this.sampleFinishTypes = res;
      this.detail.finishtype = res[0].cutfoldinfo;
      // this.detail.price = res[0].price;
      // console.log(res );
    }, error1 => {
      // console.log('error1 ', error1);
    });
  }

  getCompany() {
    this.api.getdata('comp' ).subscribe( (res: any) => {
      this.DataCompanies = res;
    }, err => {
      // console.log('Line: 364 error ', err);
    });
  }

  optionsLookupBrand() {
    const filter: any = {};
    filter['where'] = {};
    this.api.getdata('brands?filter=' + JSON.stringify(filter)).subscribe( (res: any) => {
      this.brands = res;
    }, error1 => {
      // console.log('error1 ', error1);
    });
  }

 
  optionsLookupSampleItems(query) {
    const filter: any = {};
    filter['where'] = {};
    filter['include'] = ['brand', 'client', 'company', 'productCategory', 'productSubCategory', 'salesPerson',
      'NPDExecutive', 'designer', 'status' , 'sampleColors' , 'parts', 'program'];
    filter['order'] = 'sampleid DESC';
    filter['limit'] = 20;
    // filter['where']['brandid'] = 3;
    filter['where']['samplename'] = {};
    filter['where']['samplename']['like'] = '%25' + query + '%25';
    this.api.getdata('SampleGeneralSpecs?filter=' + JSON.stringify(filter)).subscribe( (res: any) => {
      this.items = res;
      // console.log(res);
    }, error1 => {
      // console.log('error1 ', error1);
    });
  }
  back() {
    this._location.back();
  }

  updateSelection (domName, selectionText) {
    document.getElementsByName(domName)[0].firstChild['value'] = selectionText;
    document.getElementsByName(domName)[0].childNodes[2]['innerHTML'] = '';
  }
  mapDataWorkOrder(item) {
    return {
      workorderno: item.workorderno,
      workorderid: item.workorderid,
      sampleid: item.sampleid,
      ordertype: item.ordertype,
      companyid: item.companyid,
      clientid: item.clientid,
      productcategoryid: item.productcategoryid,
      productsubcategoryid: item.productsubcategoryid,
      isfoc: item.isfoc,
      focreasonid: item.focreasonid,
      focworkorderid: item.focworkorderid,
      complainno: item.complainno,
      brandid: item.brandid,
      dalivaryid: item.dalivaryid,
      partialdeldate: item.partialdeldate,
      estdeliverdate: item.estdeliverdate,
      fabriccomposition: item.fabriccomposition,
      merchandisername: item.merchandisername,
      salespersonid: item.salespersonid,
      productcodeno: item.productcodeno,
      jobcartstatus: item.jobcartstatus,
      customerserviceid: item.customerserviceid,
      customerpono: item.customerpono,
      narration: item.narration,
      extracolumn1: item.extracolumn1,
      extracolumn2: item.extracolumn2,
      extracolumn3: item.extracolumn3,
      extracolumn4: item.extracolumn4,
    };
  }
  mapDataWorkOrderDetails(item) {
    return {
      wodetailid: item.wodetailid,
      workorderid: item.workorderid,
      finishtype: item.finishtype,
      samplecolorid: item.samplecolorid,
      partsid: item.partsid,
      price: item.price,
      adjamount: item.adjamount,
      wastagepercentage: item.wastagepercentage,
      orderqty: item.orderqty
    };
  }

  mapDataWorkOrderBreakdownDetail2(item) {
    return {
      orderbreakdownid: item.orderbreakdownid,
      workorderid: item.workorderid,
      partsid: item.partsid,
      keyentry1: item['STYLE COLOUR'],
      keyentry2: item.SIZE,
      keyentry3: item.Destination,
      keyentry4: item.dozen,
      keyentry5: item.key5,
      keyentry6: item.key6,
      keyentry7: item.key7,
      keyentry8: item.key8,
      keyentry9: item.key9,
      breakdownqty: item['QTY Labels'],
      statusid: item.statusid
    };
  }



  deleteKeys(id: number, i: number) {
    if (id) {
      this.modalService.open(new ConfirmModal('Delete this Workorder Breakdown Details?', 'Are you sure to delete ?', 'mini'))
      .onApprove(() => {
        this.api.deletedata('WorkOrderWiseBreakDownDetails', id).subscribe((res: any) => {
              this.response = res;
              this.api.showDeleteToast('Deleted', this.response.message);
              
              this.detail.orderqty = this.detail.orderqty -  this.breakdownDetails[i].breakdownqty;
              this.breakdownDetails.splice(i, 1);
              setTimeout( () => {
                this.detail.adjamount = this.detail.orderqty * this.detail.price / 1000;
              }, 300);

            }, err => {
              console.log(err);
            });
          });
    } else {
      this.detail.orderqty = this.detail.orderqty -  this.breakdownDetails[i].breakdownqty;
      this.detail.adjamount = this.detail.orderqty * this.detail.price / 1000;
      this.breakdownDetails.splice(i, 1);
      if(this.breakdownDetails.length === 0) this.breakdownDetails = [new WorkOrderBreakdownDetail()];
    }
  }

  updateQuantity(index: number) {
    let total = 0;
    this.breakdownDetails.forEach((element: WorkOrderBreakdownDetail) => total += element.breakdownqty);
    this.detail.orderqty = total;
    this.detail.adjamount = this.detail.orderqty * this.detail.price / 1000;
  }

  addBreakdownDetail() {
    for(let i=0; i < this.newRows; i++) {
      const newBreakDownDetails = new WorkOrderBreakdownDetail()
      newBreakDownDetails.keyentry1 = this.breakdownDetails[0].keyentry1;
      newBreakDownDetails.keyentry3 = this.breakdownDetails[0].keyentry3;
      this.breakdownDetails.push(newBreakDownDetails)
    }
  }

  getMasterData(workorderid) {
    this.api.getdata('WorkOrderMasters?filter[where][workorderid]=' + workorderid).subscribe( (res: any) => {
      if (res.length === 0 ) {
        this.master = {};
        this.master.workorderid = workorderid;
      } else {
        this.master = res[0];
        this.api.getdata('brands?filter=[where][brandid]=' + res[0].brandid).subscribe((res1: any) => {
          this.brands = res1;
        }, error1 => {
          // console.log('error1 ', error1);
        });
        this.api.getdata('customers?filter=[where][clientid]=' + res[0].brandid).subscribe((res1: any) => {
          this.customers = res1;
        }, error1 => {
          // console.log('error1 ', error1);
        });
        console.log('res ', res);
      }
    }, error1 => {
      // console.log('error1 ', error1);
    });
  }

  isFOC() {
    if (this.master.isfoc === 1) {
      this.master.ordertype = '1';
    }
  }

  deleveryName() {
    this.master.dalivaryid = this.masterclientname;
    this.deleveryParty.push(this.customer.find((element: any) => element.ClientID === this.masterclientname));
  }
 
  optionsFabricComposition(query: string = null) {
    const data = {name: query};
    this.api.postdata('config-lovs/getFabric', data).subscribe((res: any[]) => this.FabricCompositions = res);
  }

  getOrderType() {
    this.api.getdata('lovData?filter[where][lovtype]=Order Type').subscribe( (res: any) => {
      this.orderTypes = res;
      this.master.ordertype = this.orderTypes[1].listvalue;
      // console.log(res);
    }, error1 => {
      // console.log('error1 ', error1);
    });
  }
  getFinishType() {
    this.api.getdata('lovData?filter[where][lovtype]=CutFoldType').subscribe( (res: any) => {
      this.finishTypes = res;
    }, error1 => {
      // console.log('error1 ', error1);
    });
  }

  ngOnInit() {
    this.optionsLookupWorkOrder('2019');
    this.optionsLookupDelivery('a');
    this.getCompany();
    this.getFinishType();
    this.optionsLookupBrand();
    this.optionsLookupSampleItems('a');
    this.optionsLookupEmployee('a');
    this.optionsFabricComposition('a');
    this.getOrderType();

    if (this.editId) this.getWorkOrderMaster(this.editId);
  }

    addnewbuyer() {

    }

  addnewDelivery() {

  }
}
