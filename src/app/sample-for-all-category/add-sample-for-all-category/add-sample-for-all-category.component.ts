import { Component, OnInit } from '@angular/core';
import {Sample, SampleWiseKeyEntryField} from '../../woven/models/sample';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ApiService} from '../../api.service';
import {Location} from '@angular/common';
import {NgForm} from '@angular/forms';
import {WovenDetails, Yarn} from '../../woven/models/woven-details';
import {ConfirmModal} from '../../templates/confirm-modal/confirm-modal.component';
import {SuiModalService} from 'ng2-semantic-ui';

declare var $: any;
@Component({
  selector: 'app-add-sample-for-all-category',
  templateUrl: './add-sample-for-all-category.component.html',
  styleUrls: ['./add-sample-for-all-category.component.css']
})
export class AddSampleForAllCategoryComponent implements OnInit {
  collapse = false;
  addsample: any;
  companyid: any;
  sampleid = 0;
  file: any;
  units: any;
  editId: any;
  samplecolorid: any;
  workorderno: any;
  brands: any;
  subbrands: any;
  imageSrc: any;
  clients: any;
  companies: any;
  statuses: any;
  salespersons: any;
  executives: any;
  designers: any;
  orders: any;
  productcategories: any;
  productsubcategories: any;
  response: any;
  Company: any;
  samples: any;
  minDateRcv: any;
  minDateEst: any;
  minDateApproval: any;
  currentRoute: any;
  approveldate: string;
  url = 'SampleGeneralSpecs';
  meta: {
    totalItemCount: number,
    totalPageCount: number,
    itemsPerPage: number,
    currentPage: number,
    nextPage: number,
  };
  progress = true;
  precision = 0;
  maximun = 100;
  value = 0;
  myProgressDATApdf: any;
  myProgressDATAimage: any;
  value2 = 0;
  allItems: any[];
  wovenDetail: any;
  suppliers: any;
  items: any;
  SampleWiseKeyEntryField: any;
  colors: any;
  WovenYarnDetails: any;
  keyEntryFields: any;
  yarn: any;
  collapse1 = true;
  suppliername: any;
  form: any;
   cutfoldinfos: any;
   genspcStatus: any;
  collapse2= true;
  constructor(public api: ApiService, private route: ActivatedRoute,
              private router: Router, private _location: Location, public modalService: SuiModalService) {
    this.addsample = new Sample();
    this.wovenDetail = new WovenDetails();
    this.SampleWiseKeyEntryField = new SampleWiseKeyEntryField();
    // this.sampleid = new Sample();
    this.keyEntryFields = [];
    this.allItems = [];
    this.yarn = new Yarn();
    this.route.params.subscribe(param => {
      if (param.id) {
        this.editId = param.id;
        this.getWoven(param.id);
        this.getYarn(param.id);
        this.getKeyEntry(param.id);
      }
    });
    this.addsample.productcategoryid = 1;
    this.addsample.genspcStatus =  this.api.getdata('ModuleStatuses?filter[where][moduleid]=3').subscribe((res: any) => {
      this.addsample.genspcStatus = res[0].id;
      this.statuses = res;
      console.log(res);
    });
    this.minDateRcv = new Date();
    this.minDateEst = new Date(this.minDateRcv.getFullYear(), this.minDateRcv.getMonth(), this.minDateRcv.getDate() );
    this.minDateApproval = new Date();

    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = this.router.url;
        }
      }
    );
  }
  ngOnInit() {
    $('.menu .item')
      .tab();
    this.formValidation();
    this.getWoven(this.editId);
    this.getYarn(this.editId);
    this.getKeyEntry(this.editId);
    if (this.editId) {
      this.optionsLookupSample();
    }
    this.formValidation();
    this.optionsLookupBrand('a');
    this.optionsLookupClient('a');
    this.optionsLookupSalePerson();
    this.getproductcategories();
    this.getproductsubcategories();
    this.getcompanies();
    this.getExecutives();
    this.getDesigners();
    this.formValidation();
    this.getSampleStatus();
    if (this.editId) {
      this.getSamples(this.editId);
      setTimeout(() => {
        if (this.addsample.NPDExecutive) {
          this.updateSelection('npdexecutiveid', this.addsample.NPDExecutive.firstname);
          this.addsample.npdexecutiveid = this.addsample.NPDExecutive.empId;
        }

        if (this.addsample.designer) {
          this.updateSelection('designer', this.addsample.designer.firstname);
          this.addsample.designerid = this.addsample.designer.empId;
        }

        if (this.addsample.salesPerson) {
          this.updateSelection('salesperson', this.addsample.salesPerson.firstname);
          this.addsample.salespersonid = this.addsample.salesPerson.empId;
        }
        if (this.addsample.program) {
          this.updateSelection('subbrand', this.addsample.program.programname);
          this.addsample.programid = this.addsample.program.programid;
        }

        console.log('timeout called at 1000');
      }, 1000);
    }
  }

  getSamples(id) {
    if (id) {
      this.api.getdata(this.url + '/' + id + '?filter[include]=brand&filter' +
        '[include]=client&filter[include]=company&filter[include]=productCategory&filter[include]' +
        '=productSubCategory&filter[include]=salesPerson&filter[include]' +
        '=NPDExecutive&filter[include]=designer&filter[include]=program').subscribe((res: any) => {
        this.addsample = res;
        if (this.addsample.approveldate === '1900-01-01T00:00:00.000Z') {
          delete (this.addsample.approveldate);
        }
        console.log(res);
      }, err => {
        console.log(err);
      });
    }
  }
  getSampleStatus() {
    this.api.getdata('ModuleStatuses?filter[where][moduleid]=3').subscribe((res: any) => {
      this.statuses = res;
      this.addsample.genspcStatus = res[0].genspcStatus;
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
  getSubBrand(id) {
    if (id) {
      this.api.getdata('programs?filter[where][brandid]=' + id).subscribe((res: any) => {
        this.subbrands = res;
      }, err => {
        // console.log(err);
      });
    }

  }
  getproductcategories() {
    this.api.getdata('productcategories').subscribe((res: any) => {
      this.productcategories = res;
      console.log(res);
    }, err => {
      // console.log(err);
    });
  }
  getproductsubcategories() {
    this.api.getdata('productsubcategories?filter[where][productcategoryid]=1').subscribe((res: any) => {
      this.productsubcategories = res;
    }, err => {
      console.log(err);
    });
  }
  getcompanies() {
    this.api.getdata('comp').subscribe((res: any) => {
      this.companies = res;
    }, err => {
      console.log(err);
    });
  }
  optionsLookupSalePerson() {
    this.api.getdata('EmployeeOfficialInfos/getSalesPersonList').subscribe((res: any) => {
      this.salespersons = res;
    }, err => {
      // console.log(err);
    });
  }
  getExecutives() {
    this.api.getdata('EmployeeOfficialInfos/getExecutiveList').subscribe((res: any) => {
      this.executives = res;
    }, err => {
      console.log(err);
    });
  }
  getDesigners() {
    this.api.getdata('EmployeeOfficialInfos/getDesignerList').subscribe((res: any) => {
      this.designers = res;
      this.designers.forEach(item => {
        if (item.SalesPeron === null) {
          item.SalesPeron = 'N/A';
        }
      });
      // console.log(this.designers);
    }, err => {
      console.log(err);
    });
  }
  back() {
    this._location.back();
  }
  patch(form: NgForm) {
    if (!this.addsample.samplename) {
      this.formValidation();
      this.api.showWarningToast('sample name is required', '');
      return;
    } else if (!this.addsample.imagepath) {
      this.formValidation();
      this.api.showWarningToast('sample image is required', '');
      return;
    } else if (!this.addsample.brandid) {
      this.formValidation();
      this.api.showWarningToast('brand name required', '');
      return;
    } else if (!this.addsample.productcategoryid) {
      this.formValidation();
      this.api.showWarningToast('product category required', '');
      return;

    } else if (!this.addsample.productsubcategoryid) {
      this.formValidation();
      this.api.showWarningToast('product sub-category required', '');
      return;

    } else if (!this.addsample.estdeliverydate) {
      this.formValidation();
      this.api.showWarningToast('estimate delivery date required', '');
      return;

    } else if (this.addsample.length <= 0) {
      this.formValidation();
      this.api.showWarningToast('length should not be negative', '');
      return;

    } else if (this.addsample.width <= 0) {
      this.formValidation();
      this.api.showWarningToast('width should not be negative', '');
      return;

    } else if (!this.addsample.length) {
      this.formValidation();
      this.api.showWarningToast('length required', '');
      return;

    } else if (!this.addsample.width) {
      this.formValidation();
      this.api.showWarningToast('width required', '');
      return;

    } else if (!this.addsample.pcsyard) {
      this.formValidation();
      this.api.showWarningToast('pcsyard required', '');
      return;

    } else if (!this.addsample.genspcStatus) {
      this.formValidation();
      this.api.showWarningToast('Status required', '');
      return;
    } else if (!this.addsample.artworklocation || this.addsample.filename) {
      this.formValidation();
      this.api.showWarningToast('Pdf or Image required', '');
      return;
    }

    this.api.getdata(`SampleGeneralSpecs?filter[where][customersamplename]=${this.addsample.samplename}`).subscribe((res1: any) => {
      console.log(res1);
      if (res1.length < 1) {
        // this.addsample.imagepath = !this.imageSrc;
        this.api.patchdata('SampleGeneralSpecs/addSampleForAll', this.addsample).subscribe((res: any) => {
          this.response = res;
          this.sampleid = res.sampleid;
          this.api.showSuccessToast(`Sample ${this.addsample.samplename} added Successfully.`, '');
          this.addsample = new Sample();
        }, err => {
          this.api.showFailureToast('Error', err.message);
          console.log(err);
        });
      } else {
        this.api.showWarningToast('Sample already exists', '');
      }
    }, err => {
      this.api.showSuccessToast(`Sample ${this.addsample.samplename} not added. Please try again`, '');
      console.log(err);
    });
  }
  update(form: NgForm) {

    delete (this.addsample.brand);
    delete (this.addsample.client);
    delete (this.addsample.company);
    delete (this.addsample.productCategory);
    delete (this.addsample.productSubCategory);
    delete (this.addsample.program);
    this.api.patchdata('SampleGeneralSpecs/updateSampleForAll', this.addsample).subscribe((res: any) => {
      this.response = res;
      this.api.showSuccessToast(`Sample ${this.addsample.samplename} Updated Successfully.`, '');
      this.addsample = new Sample();
    }, err => {
      this.api.showFailureToast('Error', err.message);
      console.log(err);
    });
  }
  // mapData(item) {
  //   return {
  //     sampleid : item.sampleid,
  //     samplename : item.samplename,
  //     sampleno : item.sampleno,
  //     brandid : item.brandid,
  //     programid : item.programid,
  //     productcategoryid : item.productcategoryid,
  //     productsubcategoryid : item.productsubcategoryid,
  //     clientid : item.clientid,
  //     companyid : item.companyid,
  //     salespersonid : item.salespersonid,
  //     npdexecutiveid : item.npdexecutiveid,
  //     designerid : item.designerid,
  //     length : item.length,
  //     width : item.width,
  //     imagepath : item.imagepath,
  //     pcsyard : item.pcsyard,
  //     orderdate : item.orderdate,
  //     estdeliverydate : item.estdeliverydate,
  //     approveldate : item.approveldate,
  //     genspcStatus : item.genspcStatus,
  //     groundcolor : item.groundcolor,
  //     textcolor : item.textcolor,
  //     remark1 : item.remark1,
  //   };
  // }
  handleFileInput(files: FileList) {
    const file = files.item(0);
    const folder = 'samples';
    console.log(file);
    if (file.name.length > 20) {
      this.api.showWarningToast('Image name length must be between 0-20 characters', 'Choose Another image with proper length');
    } else {
      console.log(file);
      this.api.uploadFile(folder, file).subscribe(res => {
        this.addsample.imagepath = 'fileuploads/' + folder + '/download/' + file.name;

      }, err => {
        console.log(err);
      });
    }
  }
  progressBAR() {
    if ( this.addsample.artworklocation) {
      for (this.value = 0; this.value <= 10 ; this.value++ ) {}
      setTimeout( () => {
        for (this.value = 11; this.value <= 30 ; this.value++ ) {}
      }, 500);
      setTimeout( () => {
        for (this.value = 31; this.value <= 70 ; this.value++ ) {}
      }, 600);
      setTimeout( () => {
        for (this.value = 71; this.value <= 90 ; this.value++ ) {}
      }, 700);
      setTimeout( () => {
        for (this.value = 91; this.value <= 100 ; this.value++ ) {}
      }, 1000);
    }
    if (this.addsample.filename) {
      for (this.value2 = 0; this.value2 <= 10 ; this.value2++ ) {}
      setTimeout( () => {
        for (this.value2 = 11; this.value2 <= 30 ; this.value2++ ) {}
      }, 500);
      setTimeout( () => {
        for (this.value2 = 31; this.value2 <= 70 ; this.value2++ ) {}
      }, 600);
      setTimeout( () => {
        for (this.value2 = 71; this.value2 <= 90 ; this.value2++ ) {}
      }, 700);
      setTimeout( () => {
        for (this.value2 = 91; this.value2 <= 100 ; this.value2++ ) {}
      }, 1000);
    }
    setTimeout( () => {
      if ( this.addsample.artworklocation) {
        this.myProgressDATApdf = 500;
      }
      if (this.addsample.filename) {
        this.myProgressDATAimage = 500;
      }
    }, 1900);
  }

  uploadPDFfile(files: FileList) {
    const file = files.item(0);
    const folder = 'pdfFile';
    if (file.name.length > 20 ) {
      this.api.showWarningToast('File name must be between 0-20 characters', 'Choose Another file with proper length');
    } else {
      console.log(file);
      this.api.uploadFile(folder, file).subscribe(data => {
        this.addsample.artworklocation = 'fileuploads/' + folder +  '/download/'  + file.name;
        this.progressBAR();
      }, err => {
        console.log(err);
      }); }
  }
  uploadImagefile(files: FileList) {
    const file = files.item(0);
    const folder = 'DOC_image';
    if (file.name.length > 20 ) {
      this.api.showWarningToast('Image name length must be between 0-20 characters', 'Choose Another image with proper name');
    } else {
      console.log(file);
      this.api.uploadFile(folder, file).subscribe(data => {
        this.addsample.filename = 'fileuploads/' + folder +  '/download/'  + file.name;
        this.progressBAR();
      }, err => {
        console.log(err);
      }); }
  }
  // formValidation() {
  //   $('.ui.form')
  //     .form({
  //       samplename: {
  //         identifier: 'samplename',
  //         rules: [
  //           {
  //             type: 'empty',
  //             prompt: 'must have a value'
  //           }
  //         ]
  //       },
  //       rcvdate: {
  //         identifier: 'rcvdate',
  //         rules: [
  //           {
  //             type: 'empty',
  //             prompt: 'must have a value'
  //           }
  //         ]
  //       },
  //       estdate: {
  //         identifier: 'estdate',
  //         rules: [
  //           {
  //             type: 'empty',
  //             prompt: 'must have a value'
  //           }
  //         ]
  //       },
  //       length: {
  //         identifier: 'length',
  //         rules: [
  //           {
  //             type: 'decimal[0...]',
  //             prompt: 'please enter a valid length'
  //           }
  //         ]
  //       },
  //       width: {
  //         identifier: 'width',
  //         rules: [
  //           {
  //             type: 'decimal[0...]',
  //             prompt: 'please enter a valid width'
  //           }
  //         ]
  //       },
  //       artworklocation: {
  //         identifier: 'artworklocation',
  //         rules: [
  //           {
  //             type: 'empty',
  //             prompt: 'Please upload Pdf if you do not want ignore this field'
  //           }
  //         ]
  //       },
  //       filename: {
  //         identifier: 'filename',
  //         rules: [
  //           {
  //             type: 'empty',
  //             prompt: 'Please upload image if you do not want ignore this field'
  //           }
  //         ]
  //       }
  //     }, {
  //       on: 'blur',
  //       inline: 'true',
  //       revalidate: 'true'
  //     });
  // }
  updateSelection (domName, selectionText) {
    document.getElementsByName(domName)[0].firstChild['value'] = selectionText;
    document.getElementsByName(domName)[0].childNodes[2]['innerHTML'] = '';
  }
  // resetform() {
  //   this.master = new WorkOrderMaster();
  //   this.detail = new WorkOrderDetail();
  //   this.breakdownDetail = new WorkOrderBreakdownDetail();
  //   this.selectSample = new Sample();
  //   this.selectMasterPrice = new Price();
  //   // this.company = new Company();
  //   this.master.orderreceivedate = new Date();
  //   this.brands = [];
  //   this.customers = [];
  //   this.breakdownDetails = [];
  //   this.companies = [];
  //   // this.employees2 = [];
  //   this.data = [];
  //   this.mastercompanyname = '';
  //   this.masterclientname = '';
  //   this.item = '';
  //   this.PARTSID = '';
  //   this.master.customerserviceid =  '';
  // }
  resetform(form: NgForm) {
    form.reset();
  }
  getWoven(id) {
    if (!id) { return; }
    this.api.getdata('WovenCommonDetails?filter[where][sampleid]=' + id + '&filter[include]=sample').subscribe((res: any[]) => {
      if (res.length !== 0) {
        this.wovenDetail = res[0];
      }
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  getYarn(id) {
    if (!id) { return; }
    this.api.getdata('WovenYarnDetails?filter[where][sampleid]=' + id + '&filter[include]=supplier&filter[include]=item').subscribe(res => {
      this.WovenYarnDetails = res;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  getYarnDetail() {
    this.api.getdata('WovenYarnDetails?filter[where][sampleid]=' + this.sampleid + '&filter[include]=supplier&filter' +
      '[include]=item').subscribe(res => {
      this.WovenYarnDetails = res;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  getKeyEntry(id) {
    if (!id) { return; }
    this.api.getdata('SampleWiseKeyEntryFields?filter[where][sampleid]=' + id).subscribe(res => {
      this.keyEntryFields = res;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

  getColor() {
    this.api.getdata('lovs?filter[where][lovtype]=Color').subscribe( res => {
      console.log(res);
      this.colors = res;
      return res;
    }, error1 => {
      console.log(error1);
    });
  }
  getCutFold() {
    this.api.getdata('lovs?filter[where][lovtype]=CutFoldType').subscribe( res => {
      console.log(res);
      this.cutfoldinfos = res;
      return res;
    }, error1 => {
      console.log(error1);
    });
  }
  optionsLookupSample() {
    if (!this.editId) {
      this.api.getdata('SampleGeneralSpecs?filter[order]=sampleid DESC&filter[limit]=1').subscribe((res: any) => {
        this.samples = res;
        this.sampleid = res[0].sampleid;
      });
    } else {
      this.api.getdata('SampleGeneralSpecs/' + this.editId).subscribe((res: any) => {
        this.samples = [res];
        this.sampleid = res.sampleid;
      });
    }
  }
  optionsLookupSupplier(query) {
    this.api.getdata('Suppliers?filter={"limit":10,"where":{"suppliername":{"like":"%25' + query + '%25"}}}').subscribe( res => {
      this.suppliers = res;
      // console.log(this.samples);
    }, error1 => {
      console.log('error1 ', error1);
    });
  }
  optionsLookupItem() {
    this.api.getdata('ItemGroups/getSubGroups?groupId=9').subscribe( (res: any[]) => {
      this.allItems = res.map((element: any) => {
        return {itemcode: element.ItemCode, itemid: element.ItemID};
      });
      this.items = this.allItems.slice(0, 20);
    }, error1 => {
      console.log(error1);
    });
  }
  searchItem(query: string) {
    this.items = [];
    const length: number = this.allItems.length;
    let found = 0;

    for (let i = 0; i < length; i++) {
      if (this.allItems[i].itemcode.includes(query)) {
        this.items.push(this.allItems[i]);
        found++;
        if (found === 20) { break; }
      }
    }
  }
  deleteAllKeyEntry() {
    this.modalService
      .open(new ConfirmModal('Delete All', 'Are you sure to delete all ?', 'mini'))
      .onApprove(() => {
        // this.offer.offertermDetails = [];
        this.keyEntryFields = [];
        this.api.showDeleteToast('Deleted All', '');
        // console.log('Empty :- ', this.offer.offertermDetails);
      })
      .onDeny(() => {
        console.log('Deny');
      });
  }
  deleteAllYarn() {
    this.modalService
      .open(new ConfirmModal('Delete All', 'Are you sure to delete all ?', 'mini'))
      .onApprove(() => {
        // this.offer.offertermDetails = [];
        this.WovenYarnDetails = [];
        this.api.showDeleteToast('Deleted All', '');
        // console.log('Empty :- ', this.offer.offertermDetails);
      })
      .onDeny(() => {
        console.log('Deny');
      });
  }
  deleteYarn(id, i) {
    if (id) {
      this.modalService
        .open(new ConfirmModal('Delete this Key', 'Are you sure to delete ?', 'mini'))
        .onApprove(() => {
          this.api.deletedata('WovenYarnDetails', id).subscribe((res: any) => {
            this.response = res;
            this.api.showDeleteToast('Deleted', this.response.message);
            this.WovenYarnDetails.splice(i, 1);
          }, err => {
            console.log(err);
          });
        })
        .onDeny(() => {
          console.log('Deny');
        });
    } else {
      this.WovenYarnDetails.splice(i, 1);
    }
  }
  deleteKeyEntry(id, i) {
    if (id) {
      this.modalService
        .open(new ConfirmModal('Delete this yarn', 'Are you sure to delete ?', 'mini'))
        .onApprove(() => {
          this.api.deletedata('SampleWiseKeyEntryFields', id).subscribe((res: any) => {
            this.response = res;
            this.api.showDeleteToast('Deleted', this.response.message);
            this.keyEntryFields.splice(i, 1);
          }, err => {
            console.log(err);
          });
        })
        .onDeny(() => {
          console.log('Deny');
        });
    } else {
      this.keyEntryFields.splice(i, 1);
    }
  }
  patch1(form: NgForm) {
    if (!this.sampleid ) {
      this.formValidation();
      this.api.showWarningToast('Sample No. required', '');
      return;
    } else if (this.wovenDetail.damasklength < 0 ) {
      this.formValidation();
      this.api.showWarningToast('damask length should not be negative', '');
      return ;
    } else if (!this.wovenDetail.damasklength) {
      this.formValidation();
      this.api.showWarningToast('damask length required', '');
      return ;
    } else if (this.wovenDetail.beamtension < 0) {
      this.formValidation();
      this.api.showWarningToast('beam tension should not be negative', '');
      return ;
    } else if (!this.wovenDetail.beamtension) {
      this.formValidation();
      this.api.showWarningToast('beam tension required', '');
      return ;

    } else if (this.wovenDetail.warpdenier < 0) {
      this.formValidation();
      this.api.showWarningToast('warp denier should not be negative', '');
      return ;
    } else if (!this.wovenDetail.warpdenier) {
      this.formValidation();
      this.api.showWarningToast('warp denier required', '');
      return ;
    } else if (!this.wovenDetail.pickwheel) {
      this.formValidation();
      this.api.showWarningToast('pick wheel required', '');
      return ;
    } else if (this.wovenDetail.pickwheel < 0) {
      this.formValidation();
      this.api.showWarningToast('pick wheel should not be negative', '');
      return ;
    }
    this.wovenDetail.sampleid = this.sampleid;
    this.api.patchdata('WovenCommonDetails', this.wovenDetail).subscribe(res => {
      this.response = res;
      this.api.showSuccessToast('Woven Details Successfully Added', this.response.message);
    }, err => {
      this.api.showFailureToast('Error', err.message);
      console.log(err);
    });
  }
  Updatepatch(form: NgForm) {
    this.wovenDetail.sampleid = this.sampleid;
    delete (this.wovenDetail.sample);
    this.api.patchdata('WovenCommonDetails' , this.mapData(this.wovenDetail)).subscribe(res => {
      this.response = res;
      this.api.showSuccessToast('Woven Details Updated Successfully ', this.response.message);
      this.wovenDetail.sampleid = this.sampleid;
    }, err => {
      this.api.showFailureToast('Error', err.message);
      console.log(err);
    });
  }
  addKeyDetails(form: NgForm) {
    if (!this.sampleid) {
      this.api.showWarningToast('Sample Not Selected', 'Please select the sample first.');
      return;
    }
    if (this.SampleWiseKeyEntryField.keyentry1) {
      this.SampleWiseKeyEntryField.sampleid = this.sampleid;
      this.keyEntryFields.push(this.SampleWiseKeyEntryField);
      this.SampleWiseKeyEntryField = new SampleWiseKeyEntryField();
      form.resetForm();
      console.log(this.keyEntryFields);
    }  else if (!this.SampleWiseKeyEntryField) {
      this.api.showWarningToast('Form Empty', 'Fill all details first');
      console.log(this.SampleWiseKeyEntryField);
    } else if (this.SampleWiseKeyEntryField.keyentry10  <= 0) {
      this.formValidation();
      this.api.showWarningToast('Quantity should not be negative', '');
      return;
    }

    // this.disabled = true;
  }
  mapData(add) {
    return {
      wovencommondetailsid: add.wovencommondetailsid,
      sampleid: add.sampleid,
      color: add.color,
      weavingtype: add.weavingtype,
      filename: add.filename,
      pick: add.pick,
      cutter: add.cutter,
      pslengthctoc: add.pslengthctoc,
      damasklength: add.damasklength,
      psfoldtofold: add.psfoldtofold,
      pswidth: add.pswidth,
      samplehuk: add.samplehuk,
      stracinginfo: add.stracinginfo,
      beamtension: add.beamtension,
      warpdenier: add.warpdenier,
      ironicinfo: add.ironicinfo,
      ultrasoniccutting: add.ultrasoniccutting,
      lasercutting: add.lasercutting,
      cutfoldinfo: add.cutfoldinfo,
      productioncapacity: add.productioncapacity,
      washstarcirontime: add.washstarcirontime,
      ultrasoniccutcapacity: add.ultrasoniccutcapacity,
      cutfoldcapacity: add.cutfoldcapacity,
      finishinginfo: add.finishinginfo,
      pickwheel: add.pickwheel,
      remarks: add.remarks,
      antidying: add.antidying,
    };
  }
  formValidation() {
    $('.ui.form')
      .form({
        Beam_Tension: {
          identifier: 'Beam_Tension',
          rules: [
            {
              type: 'decimal[0...]',
              prompt: 'please enter a valid value'
            }
          ]
        },
        Wrap_Denier: {
          identifier: 'Wrap_Denier',
          rules: [
            {
              type: 'decimal[0...]',
              prompt: 'please enter a valid value'
            }
          ]
        },
        Pick: {
          identifier: 'Pick',
          rules: [
            {
              type: 'decimal[0...]',
              prompt: 'please enter a valid value'
            }
          ]
        },
        Cutter: {
          identifier: 'Cutter',
          rules: [
            {
              type: 'decimal[0...]',
              prompt: 'please enter a valid value'
            }
          ]
        },
        Cut_to_Cut: {
          identifier: 'Cut_to_Cut',
          rules: [
            {
              type: 'decimal[0...]',
              prompt: 'please enter a valid value'
            }
          ]
        },
        Damask_Length: {
          identifier: 'Damask_Length',
          rules: [
            {
              type: 'decimal[0...]',
              prompt: 'please enter a valid value'
            }
          ]
        },
        Finish_Length: {
          identifier: 'Finish_Length',
          rules: [
            {
              type: 'decimal[0...]',
              prompt: 'please enter a valid length'
            }
          ]
        },
        Width: {
          identifier: 'Width',
          rules: [
            {
              type: 'decimal[0...]',
              prompt: 'please enter a valid Width'
            }
          ]
        },
        Hook: {
          identifier: 'Hook',
          rules: [
            {
              type: 'decimal[0...]',
              prompt: 'please enter a valid value'
            }
          ]
        },
        Production_Capacity: {
          identifier: 'Production_Capacity',
          rules: [
            {
              type: 'decimal[0...]',
              prompt: 'please enter a valid value'
            }
          ]
        },
        Wash: {
          identifier: 'Wash',
          rules: [
            {
              type: 'decimal[0...]',
              prompt: 'please enter a valid value'
            }
          ]
        },
        Ultrasonic_Cut_Capacity: {
          identifier: 'Ultrasonic_Cut_Capacity',
          rules: [
            {
              type: 'decimal[0...]',
              prompt: 'please enter a valid value'
            }
          ]
        },
        Cut_Fold_Capacity: {
          identifier: 'Cut_Fold_Capacity',
          rules: [
            {
              type: 'decimal[0...]',
              prompt: 'please enter a valid value'
            }
          ]
        },
        Finishing_Info: {
          identifier: 'Finishing_Info',
          rules: [
            {
              type: 'decimal[0...]',
              prompt: 'please enter a valid value'
            }
          ]
        },
        Pick_Wheel: {
          identifier: 'Pick_Wheel',
          rules: [
            {
              type: 'decimal[0...]',
              prompt: 'please enter a valid value'
            }
          ]
        },
        Quantity: {
          identifier: 'Quantity',
          rules: [
            {
              type: 'decimal[0...]',
              prompt: 'please enter a valid value'
            }
          ]
        },
        Required_Qty: {
          identifier: 'Required_Qty',
          rules: [
            {
              type: 'decimal[0...]',
              prompt: 'please enter a valid value'
            }
          ]
        },
        Sequence_ID: {
          identifier: 'Sequence_ID',
          rules: [
            {
              type: 'decimal[0...]',
              prompt: 'please enter a valid value'
            }
          ]
        },
        Pickno: {
          identifier: 'Pickno',
          rules: [
            {
              type: 'decimal[0...]',
              prompt: 'please enter a valid value'
            }
          ]
        },

      }, {
        on: 'blur',
        inline: 'true'
      });
  }
  saveYarn(form: NgForm) {
    if (!this.sampleid) {
      this.api.showWarningToast('Sample Not Selected', 'Please select the sample first.');
      return;
    }
    // if (this.WovenYarnDetails.length < 1) {
    //   this.api.showWarningToast('Yarn Details not added', 'Please add atleast one row.');
    //   return;
    // }
    this.yarn.sampleid = this.sampleid;
    this.api.patchdata('WovenYarnDetails', this.yarn).subscribe(res => {
      this.response = res;
      console.log(res);
      this.api.showSuccessToast('Woven Yarn Details Successfully Added', this.response.message);
      this.getYarnDetail();
    }, err => {
      this.api.showFailureToast('Error', err.message);
      console.log(err);
    });
  }
  updateYarn(form: NgForm) {
    if (!this.sampleid) {
      this.api.showWarningToast('Sample Not Selected', 'Please select the sample first.');
      return;
    }
    if (this.WovenYarnDetails.length < 1) {
      this.api.showWarningToast('Yarn Details not added', 'Please add atleast one row.');
      return;
    }
    this.WovenYarnDetails.forEach( item => {
      this.api.putdata('WovenYarnDetails', item).subscribe(res => {
        this.response = res;
        console.log(res);
        this.api.showSuccessToast('Woven Yarn Details Updated Successfully ', this.response.message);
        this.WovenYarnDetails = [];
      }, err => {
        this.api.showFailureToast('Error', err.message);
        console.log(err);
      });
    });
  }

  saveKeyEntryFields(form: NgForm) {
    if (!this.sampleid) {
      this.api.showWarningToast('Sample Not Selected', 'Please select the sample first.');
      return;
    }
    if (this.keyEntryFields.length < 1) {
      this.api.showWarningToast('Key Entry Fields not added', 'Please add atleast one row.');
      return;
    }
    this.keyEntryFields.forEach( item => {
      this.api.patchdata('SampleWiseKeyEntryFields', item).subscribe(res => {
        this.response = res;
        console.log(res);
        this.api.showSuccessToast('Woven Key Entry Details Successfully Added', this.response.message);
        this.keyEntryFields = [];
      }, err => {
        this.api.showFailureToast('Error', err.message);
        console.log(err);
      });

    });
  }
  updateKeyEntryFields() {
    if (!this.sampleid) {
      this.api.showWarningToast('Sample Not Selected', 'Please select the sample first.');
      return;
    }
    if (this.keyEntryFields.length < 1) {
      this.api.showWarningToast('Key Entry Fields not added', 'Please add atleast one row.');
      return;
    }
    this.keyEntryFields.forEach( item => {
      this.api.patchdata('SampleWiseKeyEntryFields', item).subscribe(res => {
        this.response = res;
        console.log(res);
        this.api.showSuccessToast('Woven Key Entry Details Updated Successfully ', this.response.message);
        this.keyEntryFields = [];
      }, err => {
        this.api.showFailureToast('Error', err.message);
        console.log(err);
      });

    });
  }
  toggleCollapse() {
    this.collapse = !this.collapse;
    if (!this.editId) {
      this.optionsLookupSample();
    }
    if (!this.collapse) {
      this.getColor();
      this.getCutFold();
      //   this.optionsLookupSample();
      // if (this.editId) {
      //   this.optionsLookupSample();
      //   setTimeout(() => {
      //     this.updateSelection('sampleno', this.wovenDetail.sample.sampleno);
      //     this.sampleid = this.wovenDetail.sampleid;
      //     console.log('timeout called at 1000 woven');
      //   }, 1000);
      // }
    }
  }
  toggleCollapse1() {
    this.collapse1 = !this.collapse1;
    if (!this.collapse1) {
      this.optionsLookupSupplier('a');
      this.optionsLookupItem();

      // this.optionsLookupSample();
//       if (this.editId) {
//         this.optionsLookupSample();
// setTimeout(() => {
//   this.updateSelection('yarnsampleno', this.wovenDetail.sample.sampleno);
//   this.sampleid = this.yarn.sampleid;
// }, 1000);
//       }
    }
  }
}
