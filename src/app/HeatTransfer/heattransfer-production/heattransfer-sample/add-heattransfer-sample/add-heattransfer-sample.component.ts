import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {SuiModalService} from 'ng2-semantic-ui';
import {ApiService} from '../../../../api.service';
import {NgForm} from '@angular/forms';
import {Sample, SampleWiseKeyEntryField} from '../../../../woven/models/sample';
import {AddMaterialDetailComponent} from '../../material-details/add-material-detail/add-material-detail.component';
import {MaterialDetails} from '../../../models/material-details';
import {HeatTransferSample} from '../../../models/HeatTransferSample';
import {ConfirmModal} from '../../../../templates/confirm-modal/confirm-modal.component';
import {SamplePartWise} from '../../../../masters/components/sample-part-wises/add-sample-part-wise/add-sample-part-wise.component';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {SampleColor} from '../../../../masters/components/sample-colors/add-sample-color/add-sample-color.component';
declare var $: any;
@Component({
  selector: 'app-add-heattransfer-sample',
  templateUrl: './add-heattransfer-sample.component.html',
  styleUrls: ['./add-heattransfer-sample.component.css']
})
export class AddHeattransferSampleComponent implements OnInit {
  collapse = false;
  collapse1 = false;
  addsample: any;
  companyid: any;
  sampleid = 0;
  file: any;
  editId: any;
  samplecolorid: any;
  workorderno: any;
  brands: any;
  subbrands: any;
  imageSrc: any;
  clients: any;
  companies: any;
  salespersons: any;
  executives: any;
  designers: any;
  orders: any;
  productcategories: any;
  productsubcategories: any;
  response: any;
  response1: any;
  @Output() added = new EventEmitter<boolean>();
  @Input() id: number;
  Company: any;
  samples: any;
  material: any;
  status: any;
  minDateRcv: any;
  minDateEst: any;
  currentRoute: any;
  collapseCompanies = false;
  url = 'SampleGeneralSpecs';
  meta: {
    totalItemCount: number,
    totalPageCount: number,
    itemsPerPage: number,
    currentPage: number,
    nextPage: number,
  };
  minDateApproval: any;
  // pet: 'Pet Film';
   value = 0;
  value2 = 1;
  precision = 0;
  maximun = 100;
  myProgressDATApdf: any;
  myProgressDATAimage: any;
  color: any;
  condition = false;
  minSubmissionDate2: any;
  minSubmissionDate3: any;
  minSubmissionDate4: any;
  minExpireDate: any;
  minDateDelivery: any;
  minDateComplete: any;
   sampleColorData: any;
  minrejectionDate2: any;
  minRejectionDate3: any;
  minRejectionDate4: any;
  public index: any;
    samplecolorname: any;
  printcolor: any;
  similarSample: string;
  similarColor: any;
   part: any;
   SampleWiseKeyEntryField: SampleWiseKeyEntryField;
  unit: any;
   salespersonss: any;
  constructor(public api: ApiService, private route: ActivatedRoute,
              private router: Router, private _location: Location , public modalService: SuiModalService ,
              ) {
    this.addsample = new HeatTransferSample();
    this.color = new SampleColor();
    this.part = new SamplePartWise();
    this.material = new MaterialDetails();
    this.SampleWiseKeyEntryField = new SampleWiseKeyEntryField();
    this.meta = {
      totalItemCount: 0,
      totalPageCount: 0,
      itemsPerPage: 10,
      currentPage: 1,
      nextPage: 0,
    };
    this.route.params.subscribe(param => {
      if (param.id) {
        this.editId = param.id;
        this.getSamples(param.id);
        // this.getSamplecolor(param.id);
      }
    });
    this.addsample.orderdate = new Date();
    this.addsample.productcategoryid = 3;
    this.part.partnoid = 1216;
    this.minDateRcv = new Date();
    this.addsample.estdeliverydate = new Date(this.minDateRcv.getFullYear(), this.minDateRcv.getMonth(), this.minDateRcv.getDate()+7);
    this.minDateEst = new Date(this.minDateRcv.getFullYear(), this.minDateRcv.getMonth(), this.minDateRcv.getDate() + 6);

    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = this.router.url;
        }
      }
    );
  }
  similarSamples(input: string) {
    const address = 'SampleGeneralSpecs/getSimilarSampleName?samplename=';
    this.api.getdata(address + input).subscribe((res: any) => {
      // this.similarSample = res.result.map(data => data.SampleName));
this.similarSample = res.map(data => data.SampleName);
if (this.addsample.samplename === '') {
  this.similarSample = '';
}
    });
  }
  getBackgroundColor(input: string) {
    const link = 'SampleColors/getColor?samplecolorname=';
    this.api.getdata(link + input).subscribe((res: any) => {
      console.log(res);
      // this.similarSample = res.result.map(data => data.SampleName));
// this.similarColor = res[0].map(data => data.SampleColorName);
this.similarColor = res[0].SampleColorName;
console.log(this.similarColor);
if (this.color.samplecolorname === '') {
  this.similarColor = '';
}
    });
  }
  getSamples(id) {
    if (id) {
      this.addsample = [];
      this.api.getdata(this.url + '/' + id + '?filter[include]=brand&filter' + '[include]=client&filter[include]' +
        '=company&filter[include]=productCategory&filter[include]' +
        '=productSubCategory&filter[include]=salesPerson&filter' +
        '[include]=NPDExecutive&filter[include]=designer&filter[include]=program&filter[include]=program').subscribe((res: any) => {
        this.brands = [{brandid: res.brandid, brandname:res.brand.brandname}];
        if(this.addsample.clientid) {
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
        // }if (this.addsample.expireDate === '1900-01-01T00:00:00.000Z') {
        //   this.addsample.expireDate = '';
        // }if (this.addsample.completeDate === '1900-01-01T00:00:00.000Z') {
        //   this.addsample.completeDate = '';
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
        // } if (this.addsample.deliverydate === '1900-01-01T00:00:00.000Z') {
        //   this.addsample.deliverydate = '';
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
    setTimeout(() => {
      this.api.getdata('SampleGeneralSpecs?filter[where][customersamplename]=' + this.addsample.samplename + '&filter[where][length]=' + this.addsample.length + '&filter[where][width]=' + this.addsample.width + '&filter[where][productcategoryid]=' + this.addsample.productcategoryid).subscribe((res1: any) => {
        console.log(res1);
        if (res1.length < 1) {
          console.log();
        } else {
          this.api.showWarningToast('Sample already exists', '');
        }
      });
    }, 1000);
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
        console.log(err);
      });
    }

  }
  getproductcategories() {
    this.api.getdata('productcategories?filter[where][productcategoryid]=3').subscribe((res: any) => {
      this.productcategories = res;
    }, err => {
      console.log(err);
    });
  }
  getproductsubcategories() {
    this.api.getdata('productsubcategories?filter[where][productcategoryid]=3').subscribe((res: any) => {
      this.productsubcategories = res;
    }, err => {
      console.log(err);
    });

  }
  getcompanies() {
    this.api.getdata('comp' ).subscribe((res: any) => {
      this.companies = res;
    }, err => {
      console.log(err);
    });
  }

  getStatus() {
    this.api.getdata('ModuleStatuses?filter[where][moduleid]=3').subscribe((res: any) => {
      this.addsample.genspcStatus = res[0].id;
      this.status = res;
    }, err => {
      console.log(err);
    });
  }
  getOrder() {
    this.api.getdata('orders').subscribe((res: any) => {
      this.orders = res;
    }, err => {
      console.log(err);
    });
  }
  back() {
    this._location.back();
  }
  estdeliveryDate() {
    if (!this.addsample.estdeliverydate) {
      this.addsample.estdeliverydate = '';
    }
  }
  orderDate() {
    if (!this.addsample.orderdate) {
      this.addsample.orderdate = '';
    }
  }
  expiredate() {
    if (!this.addsample.expireDate) {
      this.addsample.expireDate = '';
    }
  }
  rejectionDate4() {
    if (!this.addsample.rejectiondate4) {
      this.addsample.rejectiondate4 = '';
    }
  }
   rejectionDate3() {
    if (!this.addsample.rejectiondate3) {
      this.addsample.rejectiondate3 = '';
    }
  }
  rejectionDate2() {
    if (!this.addsample.rejectiondate3) {
      this.addsample.rejectiondate3 = '';
    }
  }
  rejectionDate() {
    if (!this.addsample.rejectiondate) {
      this.addsample.rejectiondate = '';
    }
  }submissionDate2() {
    if (!this.addsample.submissiondate2) {
      this.addsample.submissiondate2 = '';
    }
  }submissionDate3() {
    if (!this.addsample.submissiondate3) {
      this.addsample.submissiondate3 = '';
    }
  }submissionDate4() {
    if (!this.addsample.submissiondate4) {
      this.addsample.submissiondate4 = '';
    }
  }submissionDate() {
    if (!this.addsample.submissiondate) {
      this.addsample.submissiondate = '';
    }
  }approvelDate() {
    if (!this.addsample.approveldate) {
      this.addsample.approveldate = '';
    }
  }completedate() {
    if (!this.addsample.completeDate) {
      this.addsample.completeDate = '';
    }
  }deliveryDate() {
    if (!this.addsample.deliverydate) {
      this.addsample.deliverydate = '';
    }
  }
  patch(form: NgForm) {
    // if (!this.addsample.samplename) {
    //   this.formValidation();
    //   this.api.showWarningToast('sample name is required', '');
    //   return;
    // } else if (!this.addsample.brandid) {
    //   this.formValidation();
    //   this.api.showWarningToast('brand name required', '');
    //   return;
    // } else if (!this.addsample.productsubcategoryid) {
    //   this.formValidation();
    //   this.api.showWarningToast('product sub-category required', '');
    //   return;
    //
    // } else if (!this.addsample.orderdate) {
    //   this.formValidation();
    //   this.api.showWarningToast('receive date required', '');
    //   return;
    //
    // }  else if (!this.addsample.length) {
    //   this.formValidation();
    //   this.api.showWarningToast('length required', '');
    //   return;
    //
    // } else if (!this.addsample.width) {
    //   this.formValidation();
    //   this.api.showWarningToast('width required', '');
    //   return;
    //
    // } else if (!this.addsample.genspcStatus) {
    //   this.formValidation();
    //   this.api.showWarningToast('Status required', '');
    //   return;
    // }
    this.api.getdata('SampleGeneralSpecs?filter[where][customersamplename]=' + this.addsample.samplename + '&filter[where][length]=' + this.addsample.length + '&filter[where][width]=' + this.addsample.width + '&filter[where][productcategoryid]=' + this.addsample.productcategoryid).subscribe((res1: any) => {
      console.log(res1);
      if (res1.length < 1) {
    //     if (this.addsample.issubcontact = false) {
    //       this.addsample.issubcontact = 0;
    //  } else if (this.addsample.issubcontact = true) {
    //    this.addsample.issubcontact = 1;
    //  }
        // this.addsample.imagepath = !this.imageSrc;
        this.addsample.createdby = sessionStorage.getItem('empid');
        this.api.patchdata('SampleGeneralSpecs/addSample', this.addsample).subscribe((res: any) => {
          this.response = res;
          this.sampleid = res.sampleid;
          this.material.sampleid = this.sampleid;
          this.api.showSuccessToast(`Sample ${this.addsample.samplename} added Successfully.`, '');
          form.resetForm();
          this.addsample.imagepath = '';
          if (this.addsample.artworklocation) {
            document.getElementById('label').style.display = 'none';
          }
          if (this.addsample.filename) {
            document.getElementById('label2').style.display = 'none';
          }
          this.added.emit(true);
        }, err => {
          this.api.showFailureToast('Error', err.message);
          console.log(err);
        });
        setTimeout(() => {
          this.api.getdata('SampleGeneralSpecs?filter[order]=sampleid DESC&filter[where]' +
              '[productcategoryid]=3&filter[limit]=1').subscribe((res: any) => {
            this.samples = res;
            console.log(res);
            this.sampleid = res[0].sampleid;
            this.part.sampleid = res[0].sampleid;
            this.part.length = res[0].length;
            this.part.width = res[0].width;
            // console.log(this.sampleid);
            this.part.createdby = sessionStorage.getItem('empid');
            this.api.patchdata('SampleWisePartsLengths', this.part).subscribe(res => {
              this.response = res;
            }, err => {
              this.api.showFailureToast('Error', err.message);
              console.log(err);
            });
          });
          this.SampleWiseKeyEntryField.sampleid = this.sampleid;
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
        }, 1000);
      } else {
        this.api.showWarningToast('Sample already exists', '');
      }
    }, err => {
      this.api.showSuccessToast(`Sample ${this.addsample.samplename} not added. Please try again`, '');
      console.log(err);
    });
  }
  uploadPDFfile(files: FileList) {
    const file = files.item(0);
    const folder = 'pdfFile';
      this.api.uploadFile(folder, file).subscribe(data => {
        this.addsample.artworklocation = 'fileuploads/' + folder +  '/download/'  + file.name;
        this.progressBAR();
      }, err => {
        console.log(err);
      });
  }
  uploadImagefile(files: FileList) {
    const file = files.item(0);
    const folder = 'DOC_image';
      this.api.uploadFile(folder, file).subscribe(data => {
        this.addsample.filename = 'fileuploads/' + folder +  '/download/'  + file.name;
        this.progressBAR();
      }, err => {
        console.log(err);
      });
  }

  Updatepatch(form: NgForm) {
    // if (!this.addsample.samplename) {
    //   this.formValidation();
    //   this.api.showWarningToast('sample name  required', '');
    //   return;
    // } else if (!this.addsample.brandid) {
    //   this.formValidation();
    //   this.api.showWarningToast('brand name required', '');
    //   return;
    // } else if (!this.addsample.productcategoryid) {
    //   this.formValidation();
    //   this.api.showWarningToast('product category required', '');
    //   return;
    //
    // } else if (!this.addsample.productsubcategoryid) {
    //   this.formValidation();
    //   this.api.showWarningToast('product sub-category required', '');
    //   return;
    //
    // } else if (!this.addsample.orderdate) {
    //   this.formValidation();
    //   this.api.showWarningToast('Receive  date required', '');
    //   return;
    //
    // }  else if (!this.addsample.length) {
    //   this.formValidation();
    //   this.api.showWarningToast('length required', '');
    //   return;
    //
    // } else if (!this.addsample.width) {
    //   this.formValidation();
    //   this.api.showWarningToast('width required', '');
    //   return;
    //
    // } else if (!this.addsample.genspcStatus) {
    //   this.formValidation();
    //   this.api.showWarningToast('Status required', '');
    //   return;
    // }
    // delete (this.addsample.brand);
    // delete (this.addsample.client);
    // delete (this.addsample.company);
    // delete (this.addsample.productCategory);
    // delete (this.addsample.productSubCategory);
    // delete (this.addsample.program);
//     if (this.addsample.issubcontact = false) {
//       this.addsample.issubcontact = 0;
//  } else if (this.addsample.issubcontact = true) {
//    this.addsample.issubcontact = 1;
//  }
    this.api.patchdata('SampleGeneralSpecs/updateSample', this.addsample).subscribe((res: any) => {
      this.response = res;
      this.api.showSuccessToast(`Sample ${this.addsample.samplename} Updated Successfully.`, '');
      form.resetForm();
      this.addsample.imagepath = '';
      if (this.addsample.artworklocation) {
        document.getElementById('label4').style.display = 'none';
      }
      if (this.myProgressDATApdf) {
        document.getElementById('label').style.display = 'none';
      }
      if (this.addsample.filename) {
        document.getElementById('label3').style.display = 'none';
      }
      if (this.myProgressDATAimage) {
        document.getElementById('label2').style.display = 'none';
      }
      this.router.navigateByUrl('heat-transfer/samples');
    }, err => {
      this.api.showFailureToast('Error', err.message);
      console.log(err);
    });
  }
  SampleImageUpload(files: FileList) {
    // this.file = files.item(0);
    // const reader = new FileReader();
    // reader.onload = e => this.imageSrc = reader.result;
    // reader.readAsDataURL(this.file);

    const file = files.item(0);
    const folder = 'samples';
    console.log(file);
    // this.emp.imagePath = file.name;
    this.api.uploadFile(folder, file).subscribe(res => {
      this.addsample.imagepath = 'fileuploads/' + folder +  '/download/'  + file.name;

    }, err => {
      console.log(err);
    });
  }
  public progressBAR() {
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
        estdate: {
          identifier: 'estdate',
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
        totalnoofcolor: {
          identifier: 'totalnoofcolor',
          rules: [
            {
              type: 'decimal[0...]',
              prompt: 'please enter a valid value'
            }
          ]
        },
        noofups: {
          identifier: 'noofups',
          rules: [
            {
              type: 'decimal[0...]',
              prompt: 'please enter a valid value'
            }
          ]
        },
        papergsm: {
          identifier: 'papergsm',
          rules: [
            {
              type: 'decimal[0...]',
              prompt: 'please enter a valid value'
            }
          ]
        }
      }, {
        on: 'blur',
        inline: 'true'
      });
  }
  toggleSampleCollapse() {
    this.collapse = !this.collapse;
  }

  updateSelection (domName, selectionText) {
    document.getElementsByName(domName)[0].firstChild['value'] = selectionText;
    document.getElementsByName(domName)[0].childNodes[2]['innerHTML'] = '';
  }
  getUnit() {
    this.api.getdata('LOVs?filter[where][lovtype]=SampleUnit').subscribe((resp: any) => {
      this.unit = resp;
    });
  }
  optionsLookupSalesPerson() {
    this.api.getdata('SalesPersonLists').subscribe((res: any) => {
      this.salespersons = res;
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
  optionsLookupSalesPerson1() {
    this.api.getdata('EmployeeOfficialInfos/getSalesPersonList').subscribe((res: any) => {
      this.salespersonss = res;
    }, err => {
      console.log(err);
    });
  }
  optionsLookupDesigner() {
    this.api.getdata('EmployeeOfficialInfos/getDesignerList').subscribe((res: any) => {
      this.designers = res;
    }, err => {
      console.log(err);
    });
  }
  ngOnInit() {
    if (!this.editId) {
      this.optionsLookupBrand('a');
    }
    this.getUnit();
    this.optionsLookupSalesPerson1();
    this.optionsLookupClient('a');
    this.getproductcategories();
    this.getproductsubcategories();
    this.getcompanies();
    this.getExecutives();
    this.optionsLookupSalesPerson();
    this.optionsLookupDesigner();
    this.formValidation();
    this.getStatus();
    if (this.editId) {
      this.getSamples(this.editId);
      this.optionsLookupSample();
      // setTimeout(() => {
      //   if (this.addsample.NPDExecutive) {
      //     this.updateSelection('npdexecutiveid', this.addsample.NPDExecutive.firstname);
      //     this.addsample.npdexecutiveid = this.addsample.NPDExecutive.empId;
      //   }
      //   if (this.addsample.designer) {
      //     this.updateSelection('designer', this.addsample.designer.firstname);
      //     this.addsample.designerid = this.addsample.designer.empId;
      //   }
      //   if (this.addsample.salesPerson) {
      //     this.updateSelection('salesperson', this.addsample.salesPerson.firstname);
      //     this.addsample.salespersonid = this.addsample.salesPerson.empId;
      //   }
      //   if (this.addsample.program) {
      //     this.updateSelection('subbrand', this.addsample.program.programname);
      //     this.addsample.programid = this.addsample.program.programid;
      //   }
      //   console.log('timeout called at 1000');
      // }, 1000);
    }
  }

  optionsLookupSample() {
    setTimeout(() => {
      if (!this.editId) {
        this.api.getdata('SampleGeneralSpecs?filter[order]=sampleid ' +
            'DESC&filter[where][productcategoryid]=3&filter[limit]=1').subscribe((res: any) => {
          this.samples = res;
          this.sampleid = res[0].sampleid;
          // this.part.length = res[0].length;
          // this.part.width = res[0].width;
          // this.material.requiredqty = res[0].length;
          // console.log(this.part.length + '' + this.part.width);
        });
      } else {
        this.api.getdata('SampleGeneralSpecs/' + this.editId).subscribe((res: any) => {
          this.samples = [res];
          this.sampleid = res.sampleid;

        });
      }
    }, 500);
  }
  toggleCollapse1() {
    if (!this.editId) {
    }
    this.collapse1 = !this.collapse1;

  }
  saveSampleColor() {
    if ( !this.sampleid) {
      this.api.showWarningToast('Sample No. required', '');
      return;
    }
    if ( !this.color.printcolor) {
      // this.formValidation();
      this.api.showWarningToast(' print color required', '');
      return;
    }
    // if (!this.color.samplecolorname) {
    //   this.formValidation();
    //   this.api.showWarningToast('background color required', '');
    //   return;
    // }
    this.api.getdata('SampleColors?filter[where][sampleid]=' + this.sampleid + '&filter[where][printcolor]=' + this.color.printcolor ).subscribe((resp: any) => {
      if (resp.length < 1) {
        this.color.sampleid = this.sampleid;
        this.color.createdby = sessionStorage.getItem('empid');
        this.api.patchdata('SampleColors', this.color).subscribe(res => {
          this.response = res;
          this.api.showSuccessToast('Sample Color Successfully Added', this.response.message);
          this.color.printcolor = '';
          this.api.getdata('samplecolors?filter[where][sampleid]=' + this.sampleid + '&filter[include]=sample').subscribe(res => {
            this.sampleColorData = res;
            this.color.samplecolorname = res[0].samplecolorname;
            console.log(res);
          }, err => {
            console.log(err);
          });
        }, err => {
          this.api.showFailureToast('Error', err.message);
          console.log(err);
        });
      } else {
        this.api.showWarningToast('print color already exist');
      }
    });
  }  getSamplecolorData() {
    this.api.getdata('samplecolors?filter[where][sampleid]=' + this.sampleid + '&filter[include]=sample').subscribe(res => {
      this.sampleColorData = res;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  getSamplecolor(id) {
    if (!id) { return;
    }
    this.api.getdata('samplecolors?filter[where][sampleid]=' + id + '&filter[include]=sample').subscribe(res => {
      this.sampleColorData = res;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  deleteColorData(id, i) {
    if (id) {
      this.modalService
          .open(new ConfirmModal('Delete this color', 'Are you sure to delete ?', 'mini'))
          .onApprove(() => {
            this.api.deletedata('SampleColors', id).subscribe((res: any) => {
              this.response = res;
              this.api.showDeleteToast('Deleted', this.response.message);
              this.sampleColorData.splice(i, 1);
            }, err => {
              console.log(err);
            });
          })
          .onDeny(() => {
            console.log('Deny');
          });
    } else {
      this.sampleColorData.splice(i, 1);
    }
  }
  updateSampleColor() {
    if ( !this.sampleid) {
      this.api.showWarningToast('Sample No. required', '');
      return;
    }
    if ( !this.color.printcolor) {
      // this.formValidation();
      this.api.showWarningToast(' print color required', '');
      return;
    }
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
          // form.resetform();
          // this.api.getdata('SampleColors?filter[where][sampleid]=' + this.sampleid + '&filter[include]=sample').subscribe(res => {
          //   this.sampleColorData = res;
          //   this.color.samplecolorname = res[0].samplecolorname;
          //   console.log(res);
          // }, err => {
          //   console.log(err);
          // });
        }, err => {
          this.api.showFailureToast('Error', err.message);
          console.log(err);
        });
      } else {
        this.api.showWarningToast('Print color already exist');
      }
    });
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
  public selectColor( item, i) {
    // if (item.selected === true) {
    //   item.selected = true;
    //   console.log(item.selected);
      this.index = this.sampleColorData.indexOf(item);
      console.log(this.index);
      if (this.index !== -1) {
        this.color.samplecolorid = this.sampleColorData[this.index].samplecolorid;
        this.color.sampleid = this.sampleColorData[this.index].sampleid;
        this.color.samplecolorname = this.sampleColorData[this.index].samplecolorname;
        this.color.printcolor = this.sampleColorData[this.index].printcolor;
        this.color.createddate = this.sampleColorData[this.index].createddate;
      }
      console.log(this.sampleColorData);
    // }
  }
}
