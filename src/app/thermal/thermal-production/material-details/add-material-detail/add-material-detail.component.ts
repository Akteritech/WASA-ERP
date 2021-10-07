import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {SuiModalService} from 'ng2-semantic-ui';
import {ApiService} from '../../../../api.service';
import {ConfirmModal} from '../../../../templates/confirm-modal/confirm-modal.component';
import {MaterialDetails} from '../../../models/material-details';
import {NgForm} from '@angular/forms';
import {SampleWiseKeyEntryField} from '../../../../woven/models/sample';
import {InkDetails} from '../../../models/ink-details';
import {PrintMachineDetails} from '../../../models/print-machine-details';
declare var $: any;


@Component({
  selector: 'app-add-material-detail',
  templateUrl: './add-material-detail.component.html',
  styleUrls: ['./add-material-detail.component.css']
})
export class AddMaterialDetailComponent implements OnInit {
  samplename: any;
  Mysampleno: any;
  array1: any;
  colorid: any;
  samples: any;
  suppliers: any;
  items: any;
  @Output() added = new EventEmitter<boolean>();
  @Input() id: number;
  sampleid = 0;
  colors: any;
  editId: any;
  material: any;
  collapse = false;
  currentRoute: any;
  quiredqtyper: any;
  materialData: any;
  sampleMaterial: any;
  sampleInkDetails: any;
  response: any;
  itemcode: any;
  colorName: any;
  // collapse2: true;
   keyEntryFields: any;
   SampleWiseKeyEntryField: any;
   allItems: any[];
  collapse3 = false;
  collapse4 = true;
  collapse2 = false;
  inks: any;
  collapse5 = true;
  collapse1 = false;
  inksides: any;
   inkDetails: any;
   pmd: any;
   colorsss: any;
  samplenodata: any;
  printMachineDetails: any;
  public index: any;
  Colordata: any;
   samplePrintMachineDetails: any;
   machinenos: any;
   finishtype: any;
  constructor(public api: ApiService , public modalService: SuiModalService , private route: ActivatedRoute, private router: Router ) {
    this.material = new MaterialDetails();
    this.inkDetails = new InkDetails();
    this.pmd = new PrintMachineDetails();
    this.materialData = [];
    this.SampleWiseKeyEntryField = new SampleWiseKeyEntryField();
    this.keyEntryFields = [];
    this.allItems = [];

    this.route.params.subscribe(param => {
      if (param.id) {
        this.editId = param.id;
        // this.getMaterialDetails(param.id);
        this.getSampleMAterial(param.id);
        this.getKeyEntry(param.id);
        this.getSampleInk(param.id);
        this.getSamplePrintMachine(param.id);

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

  getKeyEntry(id) {
    if (!id) { return; }
    this.api.getdata('SampleWiseKeyEntryFields?filter[where][sampleid]=' + id).subscribe(res => {
      this.keyEntryFields = res;
      console.log(res);
    }, err => {
      console.log(err);
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
  optionslookupSampleNo(query) {
    const filter: any = {};
    filter['where'] = {};
    filter['order'] = 'sampleid DESC';
    filter['limit'] = 20;
    filter['where']['productcategoryid'] = 4;
    // filter['where']['samplename'] = {};
    // filter['where']['samplename']['like'] = '%25' + query + '%25';
     filter['where']['sampleno'] = {};
    filter['where']['sampleno']['like'] = '%25' + query + '%25';
    this.api.getdata('SampleGeneralSpecs?filter=' + JSON.stringify(filter)).subscribe( (res: any) => {
      this.samplenodata = res;
      // console.log(res);
    }, error1 => {
      // console.log('error1 ', error1);
    });
    // this.api.getdata('SampleGeneralSpecs?filter={"limit":10,"where":{"productcategoryid": 1,"sampleno":{"like":"%25' + query + '%25"}}}').subscribe( res => {
    //   this.samplenodata = res;
    //   // this.sampleid =
    //   console.log(res);
    // }, error1 => {
    //   console.log('error1 ', error1);
    // });
  }
  public selectMaterial( item, i) {
    // if (item.selected === true) {
    // item.selected.fill(false);
    // item.selected = true;
    // this.checked = item.selected.booleanValue;
    // console.log(item.selected);
    this.index = this.sampleMaterial.indexOf(item);
    console.log(this.index);
    if (this.index !== -1) {
      this.material.id = this.sampleMaterial[this.index].id;
      this.material.sampleid = this.sampleMaterial[this.index].sampleid;
      this.material.colorid = this.sampleMaterial[this.index].colorid;
      this.material.itemid = this.sampleMaterial[this.index].itemid;
      this.material.sideprint = this.sampleMaterial[this.index].sideprint;
      this.material.fullsheetlength = this.sampleMaterial[this.index].fullsheetlength;
      this.material.fullsheetwidth = this.sampleMaterial[this.index].fullsheetwidth;
      this.material.requiredqty = this.sampleMaterial[this.index].requiredqty;
      this.material.createddate = this.sampleMaterial[this.index].createddate;
    }
    console.log(this.sampleMaterial);
  }
  selectPrintMachine(item , i) {
    this.index = this.printMachineDetails.indexOf(item);
    console.log(this.index);
    if (this.index !== -1) {
      this.pmd.printmachinedetailsid = this.printMachineDetails[this.index].printmachinedetailsid;
      this.pmd.sampleid = this.printMachineDetails[this.index].sampleid;
      this.pmd.machineid = this.printMachineDetails[this.index].machineid;
      this.pmd.machinedpi = this.printMachineDetails[this.index].machinedpi;
      this.pmd.machinespeed = this.printMachineDetails[this.index].machinespeed;
      this.pmd.machinedarkness = this.printMachineDetails[this.index].machinedarkness;
      this.pmd.mpw = this.printMachineDetails[this.index].mpw;
      this.pmd.ct = this.printMachineDetails[this.index].ct;
      this.pmd.ft = this.printMachineDetails[this.index].ft;
      this.pmd.ctm = this.printMachineDetails[this.index].ctm;
      this.pmd.createddate = this.printMachineDetails[this.index].createddate;
    }
    console.log(this.printMachineDetails);
  }
  selectInk(item , i) {
    this.index = this.sampleInkDetails.indexOf(item);
    console.log(this.index);
    if (this.index !== -1) {
      this.inkDetails.inkribbondetaildid = this.sampleInkDetails[this.index].inkribbondetaildid;
      this.inkDetails.sampleid = this.sampleInkDetails[this.index].sampleid;
      this.inkDetails.colorid = this.sampleInkDetails[this.index].colorid;
      this.inkDetails.itemid = this.sampleInkDetails[this.index].itemid;
      this.inkDetails.inkside = this.sampleInkDetails[this.index].inkside;
      this.inkDetails.inktype = this.sampleInkDetails[this.index].inktype;
      this.inkDetails.requiredqty = this.sampleInkDetails[this.index].requiredqty;
      this.inkDetails.supplierid = this.sampleInkDetails[this.index].supplierid;
      this.inkDetails.suppliermaterialcode = this.sampleInkDetails[this.index].suppliermaterialcode;
      this.inkDetails.createddate = this.sampleInkDetails[this.index].createddate;
    }
    console.log(this.sampleInkDetails);
  }
  updateMaterial() {
    if (!this.material.colorid) {
      this.api.showWarningToast('material color  required', '');
      return ;
    }
    this.api.getdata('SampleWiseMaterialDetails?filter[where][sampleid]=' + this.sampleid + '&filter[where][samplecolorname]=' + this.material.samplecolorname + '&filter[where][itemid]=' + this.material.itemid + '&filter[where][fullsheetlength]=' + this.material.fullsheetlength + '&filter[where][fullsheetwidth]=' + this.material.fullsheetwidth + '&filter[where][requiredqty]=' + this.material.requiredqty + '&filter[where][printside]=' + this.material.printside).subscribe((resp: any) => {
      console.log(resp);
      if (resp.length < 1) {
        this.sampleMaterial[this.index].id  =  this.material.id;
        this.sampleMaterial[this.index].sampleid  =  this.material.sampleid;
        this.sampleMaterial[this.index].colorid  =  this.material.colorid;
        this.sampleMaterial[this.index].sideprint  =  this.material.sideprint;
        this.sampleMaterial[this.index].itemid  =  this.material.itemid;
        this.sampleMaterial[this.index].fullsheetlength  =  this.material.fullsheetlength;
        this.sampleMaterial[this.index].fullsheetwidth  =  this.material.fullsheetwidth;
        this.sampleMaterial[this.index].requiredqty  =  this.material.requiredqty;
        this.sampleMaterial[this.index].createddate  =  this.material.createddate;
        this.api.putdata('SampleWiseMaterialDetails', this.mapDataMaterial(this.material)).subscribe(res => {
          this.response = res;
          console.log(res);
          this.api.showSuccessToast('Offset Sample Material Details Added Successfully ', this.response.message);
          this.material.colorid = '';
          this.material.itemid = '';
          this.material.fullsheetlength = '';
          this.material.fullsheetwidth = '';
          this.material.requiredqty = '';
          // this.getMaterialDetailsData();
        }, err => {
          this.api.showFailureToast('Error', err.message);
          console.log(err);
        });
      } else {
        this.api.showWarningToast('Offset Sample Material Details Already Exist  ');
      }
    });
  }
  mapDataMaterial(item) {
    return {
      id : item.id,
      sampleid : item.sampleid,
      samplecolorname : item.samplecolorname,
      printside : item.printside,
      itemid : item.itemid,
      fullsheetlength : item.fullsheetlength,
      fullsheetwidth : item.fullsheetwidth,
      requiredqty : item.requiredqty,
      createddate : item.createddate
    };
  }
  getSampleMAterial(id) {
    if (!id) { return; }
    this.api.getdata('SampleWiseMaterialDetails?filter[where][sampleid]=' + id + '&filter[include]=color&filter[include]=item&filter[include]=sample').subscribe((res: any) => {
      this.sampleMaterial = res;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  getSampleMAterialData() {
    this.api.getdata('SampleWiseMaterialDetails?filter[where][sampleid]=' + this.sampleid + '&filter[include]=color&filter[include]=item&filter[include]=sample').subscribe((res: any) => {
      this.sampleMaterial = res;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  getSampleInkData() {
    this.api.getdata('InkRibbonDetails?filter[where][sampleid]=' + this.sampleid).subscribe((res: any) => {
      this.sampleInkDetails = res;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  getSamplePrintMachineData() {
    this.api.getdata('ThermalPrintMachineDetails?filter[where][sampleid]=' + this.sampleid).subscribe((res: any) => {
      this.printMachineDetails = res;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  getSampleInk(id) {
    if (!id) { return; }
    this.api.getdata('InkRibbonDetails?filter[where][sampleid]=' + id + '&filter[include]=color&filter[include]=item&filter[include]=sample&filter[include]=supplier').subscribe((res: any) => {
      this.sampleInkDetails = res;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  getSamplePrintMachine(id) {
    if (!id) { return; }
    this.api.getdata('ThermalPrintMachineDetails?filter[where][sampleid]=' + id).subscribe((res: any) => {
      this.printMachineDetails = res;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  deleteYarn(id, i) {
    if (id) {
      this.modalService
          .open(new ConfirmModal('Delete this Material', 'Are you sure to delete ?', 'mini'))
          .onApprove(() => {
            this.api.deletedata('SampleWiseMaterialDetails', id).subscribe((res: any) => {
              this.response = res;
              this.api.showDeleteToast('Deleted', this.response.message);
              this.sampleMaterial.splice(i, 1);
            }, err => {
              console.log(err);
            });
          })
          .onDeny(() => {
            console.log('Deny');
          });
    } else {
      this.sampleMaterial.splice(i, 1);
    }
  }
  deleteInk(id, i) {
    if (id) {
      this.modalService
          .open(new ConfirmModal('Delete this Ink', 'Are you sure to delete ?', 'mini'))
          .onApprove(() => {
            this.api.deletedata('InkRibbonDetails', id).subscribe((res: any) => {
              this.response = res;
              this.api.showDeleteToast('Deleted', this.response.message);
              this.sampleInkDetails.splice(i, 1);
            }, err => {
              console.log(err);
            });
          })
          .onDeny(() => {
            console.log('Deny');
          });
    } else {
      this.sampleInkDetails.splice(i, 1);
    }
  }
  deletePrintMachine(id, i) {
    if (id) {
      this.modalService
          .open(new ConfirmModal('Delete this Print Machine', 'Are you sure to delete ?', 'mini'))
          .onApprove(() => {
            this.api.deletedata('ThermalPrintMachineDetails', id).subscribe((res: any) => {
              this.response = res;
              this.api.showDeleteToast('Deleted', this.response.message);
              this.printMachineDetails.splice(i, 1);
            }, err => {
              console.log(err);
            });
          })
          .onDeny(() => {
            console.log('Deny');
          });
    } else {
      this.printMachineDetails.splice(i, 1);
    }
  }
  optionsLookupSample() {
    if (!this.editId) {
      // tslint:disable-next-line:max-line-length
      this.api.getdata('SampleGeneralSpecs?filter[order]=sampleid DESC&filter[where][productcategoryid]=4&filter[limit]=1').subscribe((res: any) => {
        this.samples = res;
        this.sampleid = res[0].sampleid;
        this.quiredqtyper = res[0].noofups;
        if (this.quiredqtyper !== 0) {
          this.material.requiredqty = 1000 / this.quiredqtyper;
          console.log(this.material.requiredqty.toFixed(2) + ' no of oops');
        } else {
          this.material.requiredqty = 0;
        }
      });
    } else {
      this.api.getdata('SampleGeneralSpecs/' + this.editId).subscribe((res: any) => {
        this.samples = [res];
        this.sampleid = res.sampleid;
        this.quiredqtyper = res.noofups;
        if (this.quiredqtyper !== 0) {
          this.material.requiredqty = 1000 / this.quiredqtyper;
          console.log(this.material.requiredqty.toFixed(2) + ' no of oops');
        } else {
          this.material.requiredqty = 0;
        }
      });
    }
  }

  patch() {
    if (!this.sampleid) {
      this.api.showWarningToast('Sample No. Required', '');
    }
    else if (!this.material.colorid) {
      this.api.showWarningToast('Material Color  required', '');
      return;
    }
    this.api.getdata('SampleWiseMaterialDetails?filter[where][sampleid]=' + this.sampleid + '&filter[where][samplecolorname]=' + this.material.samplecolorname + '&filter[where][itemid]=' + this.material.itemid + '&filter[where][fullsheetlength]=' + this.material.fullsheetlength + '&filter[where][fullsheetwidth]=' + this.material.fullsheetwidth + '&filter[where][requiredqty]=' + this.material.requiredqty + '&filter[where][printside]=' + this.material.printside).subscribe((resp: any) => {
      console.log(resp);
      if (resp.length < 1) {
      this.material.sampleid = this.sampleid;
        this.material.createdby = sessionStorage.getItem('empid');
        this.api.patchdata('SampleWiseMaterialDetails', this.material).subscribe(res => {
        this.response = res;
        console.log(res);
        this.api.showSuccessToast('Thermal Material Details Added Successfully', this.response.message);
       this.getSampleMAterialData();
      }, err => {
        this.api.showFailureToast('Error', err.message);
        console.log(err);
    });
      } else {
        this.api.showWarningToast('Thermal Sample Material Details Already Exist  ');
      }
    });
    // this.api.patchdata('SampleWiseMaterialDetails', this.material).subscribe((res: any) => {
    //   this.response = res;
    //   this.sampleid = res.sampleid;
    //   this.api.showSuccessToast('Material DetailS Added Successfully ', this.response.message);
    //   this.material.sampleid = this.sampleid;
    //   this.material = new MaterialDetails();
    // }, err => {
    //   this.api.showFailureToast('Error', err.message);
    //   console.log(err);
    // });
  }
  patchInkDetails() {
    if (!this.inkDetails.colorid) {
      this.formValidation();
      this.api.showWarningToast(' Color  required', '');
      return;
    }
    // this.api.getdata('InkRibbonDetails?filter[where][sampleid]=' + this.sampleid + '&filter[where][colorid]=' + this.inkDetails.colorid + '&filter[where][itemid]=' + this.inkDetails.itemid + '&filter[where][inkside]=' + this.inkDetails.inkside + '&filter[where][inktype]=' + this.inkDetails.inktype + '&filter[where][supplierid]=' +
    //     this.inkDetails.supplierid + '&filter[where][requiredqty]=' + this.inkDetails.requiredqty +
    //     '&filter[where][suppliermaterialcode]=' + this.inkDetails.suppliermaterialcode).subscribe((resp: any) => {
    //   console.log(resp);
    //   if (resp.length < 1) {
      this.inkDetails.sampleid = this.sampleid;
        this.inkDetails.createdby = sessionStorage.getItem('empid');
        this.api.patchdata('InkRibbonDetails', this.inkDetails).subscribe(res => {
        this.response = res;
        console.log(res);
        this.api.showSuccessToast('Thermal InkRibbon Details Added Successfully ', this.response.message);
       this.getSampleInkData();
      }, err => {
        this.api.showFailureToast('Error', err.message);
        console.log(err);
    });
      // } else {
      //   this.api.showWarningToast('Thermal InkRibbon Details Already Exist On This Sample ');
      // }
    // });
  }
  patchPrintMachineDetails() {
    if (!this.sampleid) {
      this.api.showWarningToast(' Sample No  required', '');
      return;
    }if (!this.pmd.machineid) {
      this.api.showWarningToast(' Machine Name  required', '');
      return;
    }if (!this.pmd.ft) {
      this.api.showWarningToast('Finish Type  required', '');
      return;
    }
    this.api.getdata('ThermalPrintMachineDetails?filter[where][sampleid]=' + this.sampleid +
        '&filter[where][machineid]=' + this.pmd.machineid + '&filter[where][machinedpi]=' +
        this.pmd.machinedpi + '&filter[where][machinespeed]=' + this.pmd.machinespeed +
        '&filter[where][machinedarkness]=' + this.pmd.machinedarkness + '&filter[where][mpw]=' +
        this.pmd.mpw + '&filter[where][ct]=' + this.pmd.ct +
        '&filter[where][ft]=' + this.pmd.ft + '&filter[where][ctm]=' + this.pmd.ctm).subscribe((resp: any) => {
      console.log(resp);
      if (resp.length < 1) {
      this.pmd.sampleid = this.sampleid;
        this.pmd.createdby = sessionStorage.getItem('empid');
        this.api.patchdata('ThermalPrintMachineDetails', this.pmd).subscribe(res => {
        this.response = res;
        console.log(res);
        this.api.showSuccessToast('Thermal Print Machine Details Added Successfully ', this.response.message);
       this.getSamplePrintMachineData();
      }, err => {
        this.api.showFailureToast('Error', err.message);
        console.log(err);
    });
      } else {
        this.api.showWarningToast('Thermal Print Machine Details Already Exist On This Sample ');
      }
    });
  }
  updatePrintMachineDetails() {
    if (!this.sampleid) {
      this.api.showWarningToast(' Sample No  required', '');
      return;
    }if (!this.pmd.machineid) {
      this.api.showWarningToast(' Machine Name  required', '');
      return;
    }if (!this.pmd.ft) {
      this.api.showWarningToast('Finish Type  required', '');
      return;
    }
    this.api.getdata('ThermalPrintMachineDetails?filter[where][sampleid]=' + this.sampleid +
        '&filter[where][machineid]=' + this.pmd.machineid + '&filter[where][machinedpi]=' +
        this.pmd.machinedpi + '&filter[where][machinespeed]=' + this.pmd.machinespeed +
        '&filter[where][machinedarkness]=' + this.pmd.machinedarkness + '&filter[where][mpw]=' +
        this.pmd.mpw + '&filter[where][ct]=' + this.pmd.ct +
        '&filter[where][ft]=' + this.pmd.ft + '&filter[where][ctm]=' + this.pmd.ctm).subscribe((resp: any) => {
      console.log(resp);
      if (resp.length < 1) {
    this.printMachineDetails[this.index].printmachinedetailsid = this.pmd.printmachinedetailsid;
    this.printMachineDetails[this.index].sampleid = this.pmd.sampleid;
    this.printMachineDetails[this.index].machineid = this.pmd.machineid;
    this.printMachineDetails[this.index].machinedpi = this.pmd.machinedpi;
    this.printMachineDetails[this.index].machinespeed = this.pmd.machinespeed;
    this.printMachineDetails[this.index].machinedarkness = this.pmd.machinedarkness;
    this.printMachineDetails[this.index].mpw = this.pmd.mpw;
    this.printMachineDetails[this.index].ct = this.pmd.ct;
    this.printMachineDetails[this.index].ft = this.pmd.ft;
    this.printMachineDetails[this.index].ctm = this.pmd.ctm;
    this.printMachineDetails[this.index].createddate = this.pmd.createddate;
      this.api.patchdata('ThermalPrintMachineDetails', this.mapDataPrintMachine(this.pmd)).subscribe(res => {
        this.response = res;
        console.log(res);
        this.api.showSuccessToast('Thermal Print Machine Details Updated Successfully ', this.response.message);
       this.getSamplePrintMachineData();
      }, err => {
        this.api.showFailureToast('Error', err.message);
        console.log(err);
    });
      } else {
        this.api.showWarningToast('Thermal Print Machine Details Already Exist On This Sample ');
      }
    });
  }
  mapDataPrintMachine(element) {
    return {
      printmachinedetailsid : element.printmachinedetailsid,
      sampleid : element.sampleid,
      machineid : element.machineid,
      machinedpi : element.machinedpi,
      machinespeed : element.machinespeed,
      machinedarkness : element.machinedarkness,
      mpw : element.mpw,
      ct : element.ct,
      ft : element.ft,
      ctm : element.ctm,
      createddate : element.createddate
    };
  }
  updateInkDetails() {
    if (!this.inkDetails.colorid) {
      this.formValidation();
      this.api.showWarningToast(' Color  required', '');
      return;
    }
    this.api.getdata('InkRibbonDetails?filter[where][sampleid]=' + this.sampleid + '&filter[where][colorid]=' + this.inkDetails.colorid + '&filter[where][itemid]=' + this.inkDetails.itemid + '&filter[where][inkside]=' + this.inkDetails.inkside + '&filter[where][inktype]=' + this.inkDetails.inktype + '&filter[where][supplierid]=' + this.inkDetails.supplierid + '&filter[where][requiredqty]=' + this.inkDetails.requiredqty + '&filter[where][suppliermaterialcode]=' + this.inkDetails.suppliermaterialcode).subscribe((resp: any) => {
      console.log(resp);
      if (resp.length < 1) {
   this.sampleInkDetails[this.index].inkribbondetaildid = this.inkDetails.inkribbondetaildid;
   this.sampleInkDetails[this.index].sampleid = this.inkDetails.sampleid;
   this.sampleInkDetails[this.index].colorid = this.inkDetails.colorid;
   this.sampleInkDetails[this.index].itemid = this.inkDetails.itemid;
   this.sampleInkDetails[this.index].inkside = this.inkDetails.inkside;
   this.sampleInkDetails[this.index].inktype = this.inkDetails.inktype;
   this.sampleInkDetails[this.index].supplierid = this.inkDetails.supplierid;
   this.sampleInkDetails[this.index].suppliermaterialcode = this.inkDetails.suppliermaterialcode;
   this.sampleInkDetails[this.index].requiredqty = this.inkDetails.requiredqty;
   this.sampleInkDetails[this.index].createddate = this.inkDetails.createddate;
      this.api.patchdata('InkRibbonDetails', this.mapdata(this.inkDetails)).subscribe(res => {
        this.response = res;
        console.log(res);
        this.api.showSuccessToast('Thermal InkRibbon Details Updated Successfully ', this.response.message);
       this.getSampleInkData();
      }, err => {
        this.api.showFailureToast('Error', err.message);
        console.log(err);
    });
      } else {
        this.api.showWarningToast('Thermal InkRibbon Details Already Exist On This Sample ');
      }
    });
  }
  mapdata(item) {
    return {
      inkribbondetaildid : item.inkribbondetaildid,
      sampleid : item.sampleid,
      colorid : item.colorid,
      itemid : item.itemid,
      inkside : item.inkside,
      inktype : item.inktype,
      supplierid : item.supplierid,
      suppliermaterialcode : item.suppliermaterialcode,
      requiredqty : item.requiredqty,
      createddate : item.createddate
    };
  }
  formValidation() {
    $('.ui.form')
      .form({
        length: {
          identifier: 'length',
          rules: [
            {
              type: 'decimal[0...]',
              prompt: 'please enter a valid value'
            }
          ]
        },
        width: {
          identifier: 'width',
          rules: [
            {
              type: 'decimal[0...]',
              prompt: 'please enter a valid value'
            }
          ]
        },
        qty: {
          identifier: 'qty',
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
  Updatepatch() {
    this.sampleMaterial.forEach( item => {
      this.material.sampleid = this.sampleid;
      this.api.patchdata('SampleWiseMaterialDetails', item).subscribe(res => {
        this.response = res;
        console.log(res);
        this.sampleMaterial = [];
        this.api.showSuccessToast('Heat Transfer Sample Material Details Successfully Updated', this.response.message);
      }, err => {
        this.api.showFailureToast('Error', err.message);
        console.log(err);
      });
    });
  }
  toggleCollapse() {
    if (!this.editId) {
      this.optionsLookupSample();
    }
    this.collapse = !this.collapse;
    this.collapse1 = !this.collapse1;
  }
  toggleCollapse1() {
    this.collapse1 = !this.collapse1;
  }
  toggleCollapse2() {
    this.collapse3 = !this.collapse3;
  }
  mapData(add) {
    return {
      id: add.id,
      sampleid: add.sampleid,
      sequenceid: add.sequenceid,
      itemid: add.itemid,
      requiredqty: add.requiredqty,
      colorid: add.colorid,
      length: add.length,
      width: add.width,
    };
  }
  optionsLookupColor1() {
    this.api.getdata('lovData?filter[where][lovtype]=Color').subscribe( res => {
      this.Colordata = res;
      this.inkDetails.colorid = res[4].id;
    }, error1 => {
      console.log('error1 ', error1);
    });
  }
  optionsLookupColor(query) {
    this.api.getdata('SampleColors?filter={"limit":10,"where":{"samplecolorname":{"like":"%25' + query + '%25"}}}').subscribe( res => {
      this.colors = res;
    }, error1 => {
      console.log('error1 ', error1);
    });
  }
  getMachineName(query) {
    this.api.getdata('PlanMachineMasters?filter={"limit":10,"where":{"machineno":{"like":"%25' + query + '%25"}}}').subscribe( res => {
      this.machinenos = res;
      console.log(res);
    }, error1 => {
      console.log('error1 ', error1);
    });
  }
  getFinishType() {
    this.api.getdata('lovData?filter[where][lovtype]=FinishType').subscribe( res => {
      this.finishtype = res;
      // this.inkDetails.inktype = res[0].id;
      console.log(res);
    }, error1 => {
      console.log('error1 ', error1);
    });
  }
  optionsLookupInkSide() {
    this.api.getdata('lovData?filter[where][lovtype]=InkSide').subscribe( res => {
      this.inksides = res;
      this.inkDetails.inkside = res[0].id;
      console.log(res);
    }, error1 => {
      console.log('error1 ', error1);
    });
  }
  getInk() {
    this.api.getdata('lovData?filter[where][lovtype]=InkType').subscribe( res => {
      this.inks = res;
      this.inkDetails.inktype = res[0].id;
      console.log(res);
    }, error1 => {
      console.log('error1 ', error1);
    });
  }
  optionsLookupSupplier(query) {
    this.api.getdata('Suppliers?filter={"limit":10,"where":{"suppliername":{"like":"%25' + query + '%25"}}}').subscribe( res => {
      this.suppliers = res;
      // console.log(this.samples);
    }, error1 => {
      console.log('error1 ', error1);
    });
  }
  optionsLookupItem(query) {
    this.api.getdata('ItemMasters?filter={"limit":10,"where":{"itemcode":{"like":"%25' + query + '%25"}}}').subscribe( res => {
      this.items = res;
    }, error1 => {
      console.log('error1 ', error1);
    });
  }

  // addMaterialDetails(){
  //   // if (!this.sampleid) {
  //   //   this.api.showWarningToast('Sample Not Selected', 'Please select the sample first.');
  //   //   return;
  //   // }  else if (!this.material.itemid) {
  //   //   this.formValidation();
  //   //   this.api.showWarningToast('Select item first', '');
  //   //   return;
  //   // } else if (!this.material.requiredqty) {
  //   //   this.formValidation();
  //   //   this.api.showWarningToast('quantity is required', '');
  //   //   return;
  //   // }  else if (!this.material.colorid) {
  //   //   this.formValidation();
  //   //   this.api.showWarningToast('Select color first', '');
  //   //   return;
  //   // } else if (this.material.length< 0) {
  //   //   this.formValidation();
  //   //   this.api.showWarningToast('required length should not be negative', '');
  //   //   return;
  //   // } else if (this.material.width< 0) {
  //   //   this.formValidation();
  //   //   this.api.showWarningToast('required width should not be negative', '');
  //   //   return;
  //   // }
  //   // this.api.getdata('SampleWiseMaterialDetails?filter[include]=color&filter[include]=item&filter[include]=sample').subscribe((res: any) => {
  //   //   this.materialData = res;
  //   // }, error1 => {
  //   //   console.log(error1);
  //   // });
  //   this.material.sampleid = this.sampleid;
  //   this.materialData.push(this.material);
  //   this.material = new MaterialDetails();
  //   console.log(this.materialData);
  //   this.api.getdata('SampleWiseMaterialDetails?filter[where][sampleid]=' + this.sampleid + '&filter[include]=color&filter[include]=item&filter[include]=sample').subscribe((res: any) => {
  //     this.materialData = res;
  //     this.materialData.sample = res[0].sampleid;
  //     console.log(this.materialData);
  //   }, error1 => {
  //     console.log(error1);
  //   });
  // }
  // deleteMaterial(id, i) {
  //   if (id) {
  //     this.modalService
  //       .open(new ConfirmModal('Delete this yarn', 'Are you sure to delete ?', 'mini'))
  //       .onApprove(() => {
  //         this.api.deletedata('SampleWiseMaterialDetails', id).subscribe((res: any) => {
  //           this.response = res;
  //           this.api.showDeleteToast('Deleted', this.response.message);
  //           this.materialData.splice(i, 1);
  //         }, err => {
  //           console.log(err);
  //         });
  //       })
  //       .onDeny(() => {
  //         console.log('Deny');
  //       });
  //   } else {
  //     this.materialData.splice(i, 1);
  //   }
  // }
  ngOnInit() {
    this.optionsLookupSample();
    this.getFinishType();
    this.getMachineName('s');
    this.optionslookupSampleNo('t');
    this.getInk();
    this.optionsLookupInkSide();
    this.optionsLookupItem('a');
    this.optionsLookupSupplier('a');
    this.optionsLookupColor1();
    this.optionsLookupColor('b');
    // this.getMaterialDetails(this.editId);
  }
}
