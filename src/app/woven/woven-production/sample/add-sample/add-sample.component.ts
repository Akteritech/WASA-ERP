import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ApiService} from '../../../../api.service';
import {Location} from '@angular/common';
import {Sample, SampleWiseKeyEntryField,} from '../../../models/sample';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
declare var $: any;
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
import {ConfirmModal} from '../../../../templates/confirm-modal/confirm-modal.component';
import {SuiModalService} from 'ng2-semantic-ui';
import {SampleColor} from '../../../../masters/components/sample-colors/add-sample-color/add-sample-color.component';
import {SamplePartWise} from '../../../../masters/components/sample-part-wises/add-sample-part-wise/add-sample-part-wise.component';
@Component({
  selector: 'app-add-sample',
  templateUrl: './add-sample.component.html',
  styleUrls: ['./add-sample.component.css']
})
export class AddSampleComponent implements OnInit {
  status: any;
  collapse = false;
  addsample: any;
  public companyid: any;
  sampleid: any;
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
  colorArray: any;
  public statuses: any;
  salespersons: any;
  executives: any;
  designers: any;
  orders: any;
  @Output() added = new EventEmitter<boolean>();
  @Input() id: number;
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
  similarSample: string;
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

 public checked: any;
  myProgressDATApdf: any;
  myProgressDATAimage: any;
  value2 = 0;
  color: any;
  minSubmissionDate: any;
  minRejectionDate: any;
  condition = false;
  minSubmissionDate2: any;
  minSubmissionDate3: any;
  minSubmissionDate4: any;
  width: any;
  length: any;
  productcategory: any;
  colors: any;
  cutfoldinfos: any;
  minExpireDate: any;
  minDateDelivery: any;
  minDateComplete: any;
  finishlength: any;
   public  sampleColorData: any;
   collapse1 = false;
  minrejectionDate2: any;
  minRejectionDate3: any;
  minRejectionDate4: any;
date: any;
   sample: any;
   public index: any;
   public AvailableSample: any;
  similarColor: any;
   part: any;
   brand: any;
   SampleWiseKeyEntryField: SampleWiseKeyEntryField;
   unit: any;
   salespersonss: any;
   designerss: any;
  constructor(public api: ApiService, public modalService: SuiModalService,
              private route: ActivatedRoute, private router: Router, private _location: Location) {
    this.addsample = new Sample();
    this.color = new SampleColor();
    this.part = new SamplePartWise();
    this.SampleWiseKeyEntryField = new SampleWiseKeyEntryField();
    this.route.params.subscribe(param => {
      if (param.id) {
        this.editId = param.id;
        this.getSamples(param.id);
        this.getSubBrand(this.addsample.brandid);
        this.optionsLookupSample();
        this.getSamplecolor(param.id);
      }
    });
    this.addsample.productcategoryid = 1;
    this.part.partnoid = 1216;
    this.addsample.orderdate = new Date();
    this.minDateRcv = new Date();
    this.addsample.estdeliverydate = new Date(this.minDateRcv.getFullYear(), this.minDateRcv.getMonth(), this.minDateRcv.getDate() + 7);
    this.minDateEst = new Date(this.minDateRcv.getFullYear(), this.minDateRcv.getMonth(), this.minDateRcv.getDate());
    this.router.events.subscribe(
        (event: any) => {
          if (event instanceof NavigationEnd) {
            this.currentRoute = this.router.url;
          }
        }
    );
  }
  getUnit() {
    this.api.getdata('LOVs?filter[where][lovtype]=SampleUnit').subscribe((resp: any) => {
      this.unit = resp;
      // this.weavingtype = resp;
      // this.wovenDetail.weavingtype = resp[2].id;
      // console.log(resp);
      // console.log(this.wovenDetail.weavingtype);
    });
  }
  similarSamples(input: string) {
    const address = 'SampleGeneralSpecs/getSimilarSampleName?samplename=';
    this.api.getdata(address + input).subscribe((res: any) => {
this.similarSample = res.map(data => data.SampleName);
if (this.addsample.samplename === '') {
  this.similarSample = '';
}}); }
  getBackgroundColor(input: string) {
    const link = 'SampleColors/getColor?samplecolorname=';
    this.api.getdata(link + input).subscribe((res: any) => {
      console.log(res);
      // this.similarColor = res.result.map(data => data.SampleName);
this.similarColor = res.map(data => data.SampleColorName);
// this.similarColor = res[0].SampleColorName;
console.log(this.similarColor);
if (this.color.samplecolorname === '') {
  this.similarColor = '';
}}); }
getSamples(id) {
  if (id) {
    this.addsample = [];
    this.api.getdata(this.url + '/' + id + '?filter[include]=brand&filter[include]=program&filter' +
        '[include]=client&filter[include]=company&filter[include]=productCategory&filter[include]' +
        '=productSubCategory&filter[include]=salesPerson&filter[include]' +
        '=NPDExecutive&filter[include]=designer').subscribe((res: any) => {
      this.brands = [{brandid: res.brandid, brandname:res.brand.brandname}];
      if(res.clientid) {
        this.clients = [{clientid: res.clientid, clientname: res.client.clientname}];
      }
      res.estdeliverydate = new Date(res.estdeliverydate);
      res.orderdate = new Date(res.orderdate);
      res.approveldate = new Date(res.approveldate);
      res.expireDate = new Date(res.expireDate);
      res.deliverydate = new Date(res.deliverydate);
      res.completeDate = new Date(res.completeDate);
      res.rejectiondate = new Date(res.rejectiondate);
      res.submissiondate = new Date(res.submissiondate);
      res.submissiondate2 = new Date(res.submissiondate2);
      res.submissiondate3 = new Date(res.submissiondate3);
      res.submissiondate4 = new Date(res.submissiondate4);
      res.rejectiondate2 = new Date(res.rejectiondate2);
      res.rejectiondate3 = new Date(res.rejectiondate3);
      res.rejectiondate4 = new Date(res.rejectiondate4);
      this.addsample = res;
      this.api.getdata('programs?filter[where][programid]=' + this.addsample.programid).subscribe((resp: any) => {
        this.subbrands = resp;
        this.addsample.programid = resp[0].programid;
      }, err => {
        console.log(err);
      });
      if (res.approveldate.getFullYear() == 1900) {res.approveldate = null; }
      if (res.expireDate.getFullYear() == 1900) { res.expireDate = null; }
      if (res.deliverydate.getFullYear() == 1900) { res.deliverydate = null; }
      if (res.completeDate.getFullYear() == 1900) { res.completeDate = null; }
      if (res.submissiondate.getFullYear() == 1900 ) {res.submissiondate = null;}
      if (res.submissiondate2.getFullYear() == 1900) { res.submissiondate2 = null; }
      if (res.submissiondate3.getFullYear() == 1900) { res.submissiondate3 = null; }
      if (res.submissiondate4.getFullYear() == 1900) { res.submissiondate4 = null; }
      if (res.rejectiondate.getFullYear() == 1900) { res.rejectiondate = null; }
      if (res.rejectiondate2.getFullYear() == 1900) { res.rejectiondate2 = null; }
      if (res.rejectiondate3.getFullYear() == 1900) { res.rejectiondate3 = null; }
      if (res.rejectiondate4.getFullYear() == 1900) { res.rejectiondate4 = null; }
      // if (this.addsample.approveldate === '1900-01-01T00:00:00.000Z') {
      //   this.addsample.approveldate = '';
      // }
      //   if (this.addsample.expireDate === '1900-01-01T00:00:00.000Z') {
      //     this.addsample.expireDate = '';
      //   } if (this.addsample.deliverydate === '1900-01-01T00:00:00.000Z') {
      //     this.addsample.deliverydate = '';
      //   } if (this.addsample.completeDate === '1900-01-01T00:00:00.000Z') {
      //     this.addsample.completeDate = '';
      // } if (this.addsample.rejectiondate === '1900-01-01T00:00:00.000Z') {
      //   this.addsample.rejectiondate = '';
      // } if (this.addsample.submissiondate === '1900-01-01T00:00:00.000Z') {
      //   this.addsample.submissiondate = '';
      // } if (this.addsample.submissiondate2 === '1900-01-01T00:00:00.000Z') {
      //   this.addsample.submissiondate2 = '';
      // } if (this.addsample.submissiondate3 === '1900-01-01T00:00:00.000Z') {
      //   this.addsample.submissiondate3 = '';
      // } if (this.addsample.submissiondate4 === '1900-01-01T00:00:00.000Z') {
      //   this.addsample.submissiondate4 = '';
      // }
      // if (this.addsample.rejectiondate2 === '1900-01-01T00:00:00.000Z') {
      //   this.addsample.rejectiondate2 = '';
      // }
      // if (this.addsample.rejectiondate3 === '1900-01-01T00:00:00.000Z') {
      //   this.addsample.rejectiondate3 = '';
      // }
      // if (this.addsample.rejectiondate4 === '1900-01-01T00:00:00.000Z') {
      //   this.addsample.rejectiondate4 = '';
      // }
      if (this.addsample.imagepath === !this.api.noImagePath) {
        delete (this.addsample.imagepath);
      }
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
}

  getSample() {
    this.api.getdata('SampleGeneralSpecs?filter[where][customersamplename]=' + this.addsample.samplename + '&filter[where][length]='
        + this.addsample.length + '&filter[where][width]=' + this.addsample.width + '&filter[where][productcategoryid]=' + this.addsample.productcategoryid).subscribe((res1: any) => {
      console.log(res1);
      if (res1.length < 1) {
        this.AvailableSample = res1;
        console.log( this.AvailableSample);
      } else {
        this.api.showWarningToast('Sample already exists', '');
      }
    });
  }
  getcompanies() {
    this.api.getdata('comp').subscribe((res: any) => {
      this.companies = res;
    }, err => {
      console.log(err);
    });
  }
  optionsLookupBrand(query) {
    this.api.getdata('Brands?filter={"where":{"brandname":{"like":"%25' + query + '%25"}}}').subscribe((res: any) => {
      this.brands = res;
      // console.log(this.samples);
    }, error1 => {
      console.log('error1 ', error1);
    });
  }
  getSubBrand(id) {
    if (id) {
      this.api.getdata('programs?filter[where][brandid]=' + id).subscribe((res: any) => {this.subbrands = res; }, err => {
        console.log(err); }); }
  }
  getproductcategories() {
    this.api.getdata('productcategories').subscribe((res: any) => {this.productcategories = res; }, err => {
      console.log(err); });
  }
  getproductsubcategories() {
    this.api.getdata('productsubcategories?filter[where][productcategoryid]=1').subscribe((res: any) => {this.productsubcategories = res; }, err => {
      console.log(err); });
  }
  optionsLookupClient(query) {
    this.api.getdata('Customers?filter={"limit":10,"where":{"clientname":{"like":"%25' + query + '%25"}}}').subscribe((res: any) => {this.clients = res;
    }, error1 => {console.log('error1 ', error1);
    });
  }
  // optionsLookupSalesPerson() {
  //   this.api.getdata('SalesPersonLists').subscribe((res: any) => {
  //     this.salespersons = res;
  //   }, err => {
  //     console.log(err);
  //   });
  // }
  optionsLookupSalesPerson1() {
      this.api.getdata('EmployeeOfficialInfos/getSalesPersonList').subscribe((res: any) => {
      this.salespersonss = res;
    }, err => {
      console.log(err);
    });
  }
  getExecutives() {
    this.api.getdata('EmployeeOfficialInfos/getExecutiveList').subscribe((res: any) => {
      this.executives = res;
    }, err => {
      console.log(err);
    });
  }
  // optionsLookupDesigner() {
  //   this.api.getdata('DesignerLists').subscribe((res: any) => {
  //     this.designers = res;
  //   }, err => {
  //     console.log(err);
  //   });
  // }
  optionsLookupDesigner1() {
    this.api.getdata('EmployeeOfficialInfos/getDesignerList').subscribe((res: any) => {
      this.designers = res;
    }, err => {
      console.log(err);
    });
  }
  getSampleStatus() {
    this.api.getdata('ModuleStatuses?filter[where][moduleid]=3').subscribe((res: any) => {this.statuses = res;
    this.addsample.genspcStatus = res[0].id; }, err => {console.log(err); });
  }
  optionsLookupSample() {
    setTimeout(() => {if (!this.editId) {
        this.api.getdata('SampleGeneralSpecs?filter[order]=sampleid DESC&filter[where]' +
            '[productcategoryid]=1&filter[limit]=1').subscribe((res: any) => {this.samples = res;
          this.sampleid = res[0].sampleid; }); } else {
        this.api.getdata('SampleGeneralSpecs/' + this.editId).subscribe((res: any) => {this.samples = [res];
          this.sampleid = res.sampleid; }); }
    }, 500);
  }
  back() {
    this._location.back();
  }
  estdeliveryDate() {if (!this.addsample.estdeliverydate) {
      this.addsample.estdeliverydate = ''; }
  }
  orderDate() {if (!this.addsample.orderdate) {
      this.addsample.orderdate = ''; }
  }
  expiredate() {if (!this.addsample.expireDate) {
      this.addsample.expireDate = ''; }
  }
  rejectionDate4() {if (!this.addsample.rejectiondate4) {
      this.addsample.rejectiondate4 = ''; }
  }
  rejectionDate3() {if (!this.addsample.rejectiondate3) {
      this.addsample.rejectiondate3 = ''; }
  }
  rejectionDate2() {if (!this.addsample.rejectiondate3) {
      this.addsample.rejectiondate3 = ''; }
  }rejectionDate() {if (!this.addsample.rejectiondate) {
      this.addsample.rejectiondate = ''; }
  }submissionDate2() {if (!this.addsample.submissiondate2) {
      this.addsample.submissiondate2 = ''; }
  }submissionDate3() {if (!this.addsample.submissiondate3) {
      this.addsample.submissiondate3 = ''; }
  }submissionDate4() {if (!this.addsample.submissiondate4) {
      this.addsample.submissiondate4 = ''; }
  }submissionDate() {if (!this.addsample.submissiondate) {
      this.addsample.submissiondate = ''; }
  }approvelDate() {if (!this.addsample.approveldate) {
      this.addsample.approveldate = ''; }
  }completedate() {if (!this.addsample.completeDate) {
      this.addsample.completeDate = ''; }
  }deliveryDate() {if (!this.addsample.deliverydate) {
      this.addsample.deliverydate = ''; }
  }
  patch(form: NgForm) {
    this.api.getdata('SampleGeneralSpecs?filter[where][customersamplename]=' + this.addsample.samplename +
        '&filter[where][length]=' + this.addsample.length + '&filter[where][width]=' + this.addsample.width).subscribe((res1: any) => {
      console.log(res1);
      if (res1.length < 1) {this.addsample.createdby = sessionStorage.getItem('empid');
         if (!this.addsample.estdeliverydate) {
          this.addsample.estdeliverydate = new Date( this.addsample.estdeliverydate.getTime() + 6 * 3600 * 1000); }

         if (!this.addsample.orderdate) {
          this.addsample.orderdate = '';
         }

         if (!this.addsample.expireDate) {
          this.addsample.expireDate = ''; }

         if (!this.addsample.rejectiondate4) {
          this.addsample.rejectiondate4 = ''; }

         if (!this.addsample.rejectiondate3) {
          this.addsample.rejectiondate3 = ''; }

         if (!this.addsample.rejectiondate3) {
          this.addsample.rejectiondate3 = ''; }
         if (!this.addsample.rejectiondate) {
          this.addsample.rejectiondate = ''; }
        if (!this.addsample.submissiondate2) {
          this.addsample.submissiondate2 = ''; }
        if (!this.addsample.submissiondate3) {
          this.addsample.submissiondate3 = ''; }
        if (!this.addsample.submissiondate4) {
          this.addsample.submissiondate4 = ''; }
        if (!this.addsample.submissiondate) {
          this.addsample.submissiondate = ''; }
        if (!this.addsample.approveldate) {
          this.addsample.approveldate = ''; }
        if (!this.addsample.completeDate) {
          this.addsample.completeDate = ''; }
        if (!this.addsample.deliverydate) {
          this.addsample.deliverydate = ''; }

        // this.emp.BUYER_JOINING = new Date(this.emp.BUYER_JOINING.getTime() + 6 * 3600 * 1000);
        // this.emp.SHIFT_START_DATE = new Date(this.emp.SHIFT_START_DATE.getTime() + 6 * 3600 * 1000);
        // this.emp.JOINING_DATE = new Date(this.emp.JOINING_DATE.getTime() + 6 * 3600 * 1000);
        // if (this.emp.PF_DATE) {
        //   this.emp.PF_DATE = new Date(this.emp.PF_DATE.getTime() + 6 * 3600 * 1000);
        // } else {
        //   this.emp.PF_DATE = '';
        // }
        // if (this.emp.EL_START_DATE) {
        //   this.emp.EL_START_DATE = new Date(this.emp.EL_START_DATE.getTime() + 6 * 3600 * 1000);
        // } else {
        //   this.emp.EL_START_DATE = '';
        // }
        this.api.patchdata('SampleGeneralSpecs/addSample', this.addsample).subscribe((res: any) => {this.response = res;
        console.log(res);
        // this.sampleid = res.data[0].SampleID;
          this.api.showSuccessToast(`Sample ${this.addsample.samplename} added Successfully.`, '');
          form.resetForm(); this.addsample.imagepath = '';
          if (this.addsample.artworklocation) {document.getElementById('label').style.display = 'none'; }
          if (this.addsample.filename) {document.getElementById('label2').style.display = 'none'; }
          this.added.emit(true);
          setTimeout(() => {
            this.api.getdata('SampleGeneralSpecs?filter[order]=sampleid DESC&filter[where]' +
                '[productcategoryid]=1&filter[limit]=1').subscribe((resp: any) => {
              this.samples = resp; this.sampleid = resp[0].sampleid; this.part.sampleid = resp[0].sampleid; this.part.length = resp[0].length; this.part.width = resp[0].width;
              this.part.partnoid = 1216;
              console.log(this.sampleid);
              this.part.createdby = sessionStorage.getItem('empid');
              this.api.postdata('SampleWisePartsLengths', this.part).subscribe(respo => {
                this.response = respo;
                this.SampleWiseKeyEntryField.sampleid = this.sampleid;
                console.log(this.sampleid);
                this.SampleWiseKeyEntryField.keyentry1 = 'color';
                this.SampleWiseKeyEntryField.keyentry2 = 'size' ;
                this.SampleWiseKeyEntryField.keyentry3 = 'style';
                this.SampleWiseKeyEntryField.keyentry10 = 'quantity';
                this.SampleWiseKeyEntryField.statusid = 0;
                this.SampleWiseKeyEntryField.createdby = sessionStorage.getItem('empid');
                this.SampleWiseKeyEntryField.creationdate = Date.now();
                this.api.patchdata('SampleWiseKeyEntryFields', this.SampleWiseKeyEntryField).subscribe(res => {
                  this.response = res;
                  console.log(res);
                  // this.api.showSuccessToast('Key Entry Details Added Successfully ', this.response.message);
                }, err => {
                  this.api.showFailureToast('Error', err.message);
                  console.log(err);
                });
              }, err => {this.api.showFailureToast(`Error ${err.error.error.message}`, err.error.error.message);
                console.log(err); }); });
            console.log(this.sampleid);
          }, 1000);
        }, err => {this.api.showFailureToast(`Error ${err.error.error.message}`, err.error.error.message);
          console.log(err); });
      } else {this.api.showWarningToast('Sample already exists with same samplename , length and width', ''); }
    }, err => {this.api.showFailureToast(`Sample ${this.addsample.samplename} not added. Please try again`, '');
      console.log(err); });
  }
  update(form: NgForm) {
    this.api.patchdata('SampleGeneralSpecs/updateSample', this.addsample).subscribe((res: any) => {
      this.response = res;
      this.api.showSuccessToast(`Sample ${this.addsample.samplename} Updated Successfully.`, '');
      form.resetForm(); this.addsample.imagepath = '';
      if (this.addsample.artworklocation) {document.getElementById('uploadedpdfpath').style.display = 'none'; }
      if (this.myProgressDATApdf) {document.getElementById('label').style.display = 'none'; }
      if (this.addsample.filename) {document.getElementById('uploadedimagepath').style.display = 'none'; }
      if (this.myProgressDATAimage) {document.getElementById('label2').style.display = 'none'; }
      this.added.emit(true);
      this.router.navigateByUrl('woven/samples');
    }, err => {this.api.showFailureToast('Error', err.message); console.log(err); });
  }

  uploadFile(files: FileList) {
    const file = files.item(0);
    const folder = 'samples';
    console.log(file);
    this.api.uploadFile(folder, file).subscribe( res => {
      this.addsample.imagepath = 'fileuploads/' + folder + '/download/' + file.name;

    }, err => {
      console.log(err);
    });
  }

  progressBAR() {if (this.addsample.artworklocation) {
      for (this.value = 0; this.value <= 10; this.value++) {}
      setTimeout( () => {for (this.value = 11; this.value <= 30 ; this.value++ ) {}}, 500);
      setTimeout( () => {for (this.value = 31; this.value <= 70 ; this.value++ ) {}}, 600);
      setTimeout(() => {for (this.value = 91; this.value <= 100; this.value++) {}}, 1000);
    }
    if (this.addsample.filename) {for (this.value2 = 0; this.value2 <= 10; this.value2++) {}
      setTimeout( () => {for (this.value = 11; this.value <= 30 ; this.value++ ) {}}, 500);
      setTimeout( () => {for (this.value = 31; this.value <= 70 ; this.value++ ) {}}, 600);
      setTimeout(() => {for (this.value2 = 91; this.value2 <= 100; this.value2++) {}}, 1000);
    }
    setTimeout(() => {if (this.addsample.artworklocation) {this.myProgressDATApdf = 500; }
      if (this.addsample.filename) {this.myProgressDATAimage = 500; }}, 1900);
  }

  uploadPDFfile(files: FileList) {
    const file = files.item(0);
    const folder = 'pdfFile';
    console.log(file);
    this.api.uploadFile(folder, file).subscribe(data => {this.addsample.artworklocation = 'fileuploads/' + folder + '/download/' + file.name;
      this.progressBAR();
    }, err => {console.log(err); });
  }
  uploadImagefile(files: FileList) {
    const file = files.item(0);
    const folder = 'DOC_image';
    this.api.uploadFile(folder, file).subscribe(data => {this.addsample.filename = 'fileuploads/' + folder + '/download/' + file.name;
      this.progressBAR();
    }, err => {console.log(err); });
  }
  formValidation() {
    $('.ui.form')
        .form({
          samplename: {
            identifier: 'samplename',
            rules: [
              {
                type: 'empty',
                prompt: 'must have a value'
              }
            ]
          },
          rcvdate: {
            identifier: 'rcvdate',
            rules: [
              {
                type: 'empty',
                prompt: 'must have a value'
              }
            ]
          },
          length: {
            identifier: 'length',
            rules: [
              {
                type: 'decimal[0...]',
                prompt: 'please enter a valid length'
              }
            ]
          },
          width: {
            identifier: 'width',
            rules: [
              {
                type: 'decimal[0...]',
                prompt: 'please enter a valid width'
              }
            ]
          },
        }, {
          on: 'blur',
          inline: 'true',
          revalidate: 'true'
        });
  }


  ngOnInit() {
    this.optionsLookupSalesPerson1()
    this.optionsLookupDesigner1()
    $('.menu .item')
        .tab();
    if (!this.editId) {
      this.optionsLookupBrand('a');
      this.optionsLookupClient('a');
    }
    this.getproductcategories();
    this.getproductsubcategories();
    this.getcompanies();
    this.getUnit();
    this.getExecutives();
    this.getSubBrand(this.addsample.brandid);
    // this.optionsLookupDesigner();
    this.formValidation();
    this.getSampleStatus();
    if (this.editId) {
      // this.getSamples(this.editId);
      // this.getSubBrand(this.editId);
      this.optionsLookupSample();
    }
  }
  toggleCollapse1() {
    this.collapse1 = !this.collapse1;
  }
  saveSampleColor() {
    if ( !this.sampleid) {this.api.showWarningToast('Sample No. required', ''); return; }
    if ( !this.color.printcolor) {this.api.showWarningToast(' text color required', ''); return; }
    this.api.getdata('SampleColors?filter[where][sampleid]=' + this.sampleid + '&filter[where][printcolor]='
        + this.color.printcolor ).subscribe((resp: any) => {
      if (resp.length < 1) {this.color.sampleid = this.sampleid;
        this.color.createdby = sessionStorage.getItem('empid');
        this.api.patchdata('SampleColors', this.color).subscribe(res => {this.response = res;
          this.api.showSuccessToast('Sample Color Added Successfully', this.response.message);
          this.color.printcolor = '';
          this.api.getdata('samplecolors?filter[where][sampleid]=' + this.sampleid + '&filter[include]=sample').subscribe(res => {
            this.sampleColorData = res;
            this.color.samplecolorname = res[0].samplecolorname;
            console.log(res); }, err => {console.log(err); });
        }, err => {this.api.showFailureToast('Error', err.message);
          console.log(err); });
      } else {this.api.showWarningToast('Text Color already exist on this Sample'); }});
  }
  updateSampleColor() {
    if ( !this.sampleid) {this.api.showWarningToast('Sample No. required', ''); return; }
    if ( !this.color.printcolor) {this.api.showWarningToast(' text color required', ''); return; }
    this.api.getdata('SampleColors?filter[where][sampleid]=' + this.sampleid + '&filter[where][printcolor]='
        + this.color.printcolor ).subscribe((resp: any) => {
      if (resp.length < 1) {
         this.sampleColorData[this.index].samplecolorid = this.color.samplecolorid;
         this.sampleColorData[this.index].sampleid = this.color.sampleid;
         this.sampleColorData[this.index].samplecolorname =  this.color.samplecolorname;
         this.sampleColorData[this.index].printcolor =  this.color.printcolor;
          this.sampleColorData[this.index].createddate = this.color.createddate;
        this.api.patchdata('SampleColors', this.mapdata(this.color)).subscribe(res => {
          this.response = res;
          this.api.showSuccessToast('Sample Color Updated Successfully', this.response.message);
          this.color.printcolor = '';
        }, err => {this.api.showFailureToast('Error', err.message); console.log(err); });
      } else {this.api.showWarningToast('Text Color already exist on this Sample'); }});
  }
  mapdata(item) {
    return {
      samplecolorid : item.samplecolorid,
      sampleid : item.sampleid,
      samplecolorname : item.samplecolorname,
      printcolor : item.printcolor,
      createddate : item.createddate,
    };
  }
  getSamplecolorData() {
    this.api.getdata('samplecolors?filter[where][sampleid]=' + this.sampleid + '&filter[include]=sample').subscribe(res => {this.sampleColorData = res; console.log(res);
    }, err => {console.log(err); });
  }
  getSamplecolor(id) {
    this.api.getdata('samplecolors?filter[where][sampleid]=' + id + '&filter[include]=sample').subscribe(res => {this.sampleColorData = res;
      this.color.samplecolorname = res[0].samplecolorname; console.log(res);
    }, err => {console.log(err); });
  }
  deleteColorData(id, i) {
    if (id) {this.modalService.open(new ConfirmModal('Delete this color', 'Are you sure to delete ?', 'mini'))
        .onApprove(() => {this.api.deletedata('SampleColors', id).subscribe((res: any) => {
              this.response = res;
              this.api.showDeleteToast('Deleted', this.response.message);
              this.sampleColorData.splice(i, 1);
            }, err => {console.log(err); }); }).onDeny(() => {console.log('Deny'); });
    } else {this.sampleColorData.splice(i, 1); }
  }
  public selectColor( item, i) {this.index = this.sampleColorData.indexOf(item);
      console.log(this.index);
      if (this.index !== -1) {
        this.color.samplecolorid = this.sampleColorData[this.index].samplecolorid;
        this.color.sampleid = this.sampleColorData[this.index].sampleid;
        this.color.samplecolorname = this.sampleColorData[this.index].samplecolorname;
        this.color.printcolor = this.sampleColorData[this.index].printcolor;
        this.color.createddate = this.sampleColorData[this.index].createddate; }console.log(this.sampleColorData); }
}
