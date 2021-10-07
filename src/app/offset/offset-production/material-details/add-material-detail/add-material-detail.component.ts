import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {SuiModalService} from 'ng2-semantic-ui';
import {ApiService} from '../../../../api.service';
import {NgForm} from '@angular/forms';
import {MaterialDetails} from '../../../models/material-details';
import {WovenDetails, Yarn} from '../../../../woven/models/woven-details';
import {ConfirmModal} from '../../../../templates/confirm-modal/confirm-modal.component';
import {AddOffsetSampleComponent} from '../../offset-sample/add-offset-sample/add-offset-sample.component';
import {OffsetTechnicalDetails} from '../../../models/offset-technical-details';
import {ShowDetail} from '../../../../templates/show-detail/show-detail.component';
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
  sampleid = 0;
  colors: any;
  editId: any;
  material: any;
  url = 'SampleWiseMaterialDetails';
  collapse = true;
  collapse1 = true;
  currentRoute: any;
  quiredqtyper: any;
  materialData: any;
  sampleMaterial: any;
  response: any;
  itemcode: any;
  colorName: any;
  materialDetails: any;
   wovenDetail: any;
   cutfoldinfos: any;
   sampleTechnicalData: any;
    varnishes: any;
    uves: any;
    eyeletes: any;
   offsettechnicaldata: any;
   sampletechnical: any;
   OffsetTechnicalDetails: any;
  public offsetid: any;
  public offsetMaterialArray: any;
  public index: any;
   samplenodata: any;
  constructor(public api: ApiService , public modalService: SuiModalService ,
              private route: ActivatedRoute, private router: Router, public addsample: AddOffsetSampleComponent) {
    this.material = new MaterialDetails();
    this.materialData = [];
    this.offsettechnicaldata = new OffsetTechnicalDetails();
    // this.addsample = new OffsetSample();
    // this.sampleid = new Sample();
    this.wovenDetail = new WovenDetails();
    if (this.offsettechnicaldata.noofups) {
      this.material.requiredqty = (this.offsettechnicaldata.noofups / 1000);
    }
    this.route.params.subscribe(param => {
      if (param.id) {
        this.editId = param.id;
        this.getSamples(param.id);
        // this.getMaterialDetails(param.id);
        this.getMaterialDetails(param.id);
        // this.getSampleTechnical(param.id);
        this.getTechnicalDetails(param.id);
        this.getOffsetTechnicalDetail(param.id);
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
  getSamples(id) {
    if (id) {
      this.api.getdata(this.url + '/' + id + '&filter[include]=color&filter[include]=item&filter[include]=sample').subscribe((res: any) => {
        this.addsample = res;
        console.log(res);
      }, err => {
        console.log(err);
      });
    }
  }

  getMaterialDetails(id) {
    if (!id) { return; }
    // tslint:disable-next-line:max-line-length
    this.api.getdata('SampleWiseMaterialDetails?filter[where][sampleid]=' + id + '&filter[include]=color&filter[include]=item&filter[include]=sample').subscribe((res: any) => {
      this.sampleMaterial = res;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

  getMaterialDetailsData() {
    this.api.getdata('SampleWiseMaterialDetails?filter[where][sampleid]='
        + this.sampleid + '&filter[include]=color&filter[include]=item&filter[include]=sample')
        .subscribe((res: any) => {
      this.sampleMaterial = res;
    }, err => {
      console.log(err);
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
  getSampleTechnical(id) {
    this.api.getdata('WovenCommonDetails?filter[where][sampleid]=' + id + '&filter[include]=sample').subscribe(res => {
      this.sampleTechnicalData = res;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  getSampleTechnicalData() {
    this.api.getdata('WovenCommonDetails?filter[where][sampleid]=' + this.sampleid + '&filter[include]=sample').subscribe(res => {
      this.sampleTechnicalData = res;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  saveSampleTechnical() {
    this.wovenDetail.sampleid = this.sampleid;
    this.api.patchdata('WovenCommonDetails', this.wovenDetail).subscribe(res => {
      this.response = res;
      this.api.showSuccessToast('Sample Technical Details Successfully Added', this.response.message);
      this.getSampleTechnicalData();
    }, err => {
      this.api.showFailureToast('Error', err.message);
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
  deletetarn(id, i) {
    if (id) {
      this.modalService
        .open(new ConfirmModal('Delete this technical Details', 'Are you sure to delete ?', 'mini'))
        .onApprove(() => {
          this.api.deletedata('offset-technical-details', id).subscribe((res: any) => {
            this.response = res;
            this.api.showDeleteToast('Deleted', this.response.message);
            this.OffsetTechnicalDetails.splice(i, 1);
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

  optionsLookupSample() {
    if (!this.editId) {
      this.api.getdata('SampleGeneralSpecs?filter[order]=sampleid DESC&filter[where][productcategoryid]=5&filter[limit]=1')
          .subscribe((res: any) => {
        this.samples = res;
        this.sampleid = res[0].sampleid;
        // this.sampleid = res[0].sampleno;
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

  getTechnicalDetails(id) {
    if (!id) { return; }
    this.api.getdata('offset-technical-details?filter[where][sampleid]=' + id + '&filter[include]=sample').subscribe((res: any) => {
      if (res.length !== 0) {
        this.offsettechnicaldata = res[0];
      }
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  getOffsetTechnicalDetails() {
    this.api.getdata('offset-technical-details?filter[where][sampleid]=' + this.sampleid).subscribe(res => {
      this.OffsetTechnicalDetails = res;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  getOffsetTechnicalDetail(id) {
    if (!id) { return; }
    this.api.getdata('offset-technical-details?filter[where][sampleid]=' + id + '&filter[include]=sample').subscribe((res: any[]) => {
      if (res.length !== 0) {
        this.OffsetTechnicalDetails = res[0];
        this.offsetid = res[0].offsettechnicalid;
      }
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  patchTechnicalData(form: NgForm) {
    if (!this.sampleid ) {
      this.api.showWarningToast('Sample No. required', '');
      return;
    } else if (!this.offsettechnicaldata.noofups) {
      this.api.showWarningToast('noofups  Required', '');
      return ;
    } else if (this.offsettechnicaldata.screenprintid === 1) {
      if (!this.offsettechnicaldata.description1) {
        this.api.showWarningToast(' Screen Print Description Required', '');
        return ;
      }
    } else if (this.offsettechnicaldata.laminationid === 1) {
      if (!this.offsettechnicaldata.thermal) {
        this.api.showWarningToast('  Hot Required', '');
        return ;
      }
    } else if (this.offsettechnicaldata.laminationid === 2) {
      if (!this.offsettechnicaldata.coldglue) {
        this.api.showWarningToast('  coldglue Required', '');
        return ;
      }
    } else if (this.offsettechnicaldata.eyeletid === 1) {
      if (!this.offsettechnicaldata.description2) {
        this.api.showWarningToast('Eyelet Description Required', '');
        return ;
      }
    } else if (this.offsettechnicaldata.stringid === 1) {
      if (!this.offsettechnicaldata.description3) {
        this.api.showWarningToast('String Description Required', '');
        return ;
      }
    } else if (this.offsettechnicaldata.tagpinid === 1) {
      if (!this.offsettechnicaldata.description4) {
        this.api.showWarningToast('tagpin Description Required', '');
        return ;
      }
    } else if (this.offsettechnicaldata.cuttingid === 1) {
      if (!this.offsettechnicaldata.description5) {
        this.api.showWarningToast('cutting Description Required', '');
        return ;
      }
    } else if (this.offsettechnicaldata.embossid === 1) {
      if (!this.offsettechnicaldata.description6) {
        this.api.showWarningToast('Emboss  Description Required', '');
        return ;
      }
    } else if (this.offsettechnicaldata.debossid === 1) {
      if (!this.offsettechnicaldata.description7) {
        this.api.showWarningToast('Deboss Description Required', '');
        return ;
      }
    } else if (this.offsettechnicaldata.foilingid === 1) {
      if (!this.offsettechnicaldata.description8) {
        this.api.showWarningToast(' foiling Description Required', '');
        return ;
      }
    } else if (this.offsettechnicaldata.boardpasting === 1) {
      if (!this.offsettechnicaldata.description9) {

        this.api.showWarningToast('Boardpasting Description Required', '');
        return ;
      }
    } else if (this.offsettechnicaldata.windowid === 1) {
      if (!this.offsettechnicaldata.description10) {

        this.api.showWarningToast('Window Description Required', '');
        return ;
      }
    } else if (this.offsettechnicaldata.windowwithpetid === 1) {
      if (!this.offsettechnicaldata.description11) {

        this.api.showWarningToast('Window With Pet Description Required', '');
        return ;
      }
    } else if (this.offsettechnicaldata.hangerid === 1) {
      if (!this.offsettechnicaldata.description12) {

        this.api.showWarningToast('Hanger Description Required', '');
        return ;
      }
    } else if (this.offsettechnicaldata.hookid === 1) {
      if (!this.offsettechnicaldata.description13) {

        this.api.showWarningToast('Hook Description Required', '');
        return ;
      }
    } else if (this.offsettechnicaldata.holeid === 1) {
      if (!this.offsettechnicaldata.description14) {

        this.api.showWarningToast('Hole Description Required', '');
        return ;
      }
    } else if (this.offsettechnicaldata.perforationid === 1) {
      if (!this.offsettechnicaldata.description15) {

        this.api.showWarningToast('Perforation Description Required', '');
        return ;
      }
    } else if (this.offsettechnicaldata.bothsidetapeid === 1) {
      if (!this.offsettechnicaldata.description16) {

        this.api.showWarningToast('BothSideTape Description Required', '');
        return ;
      }
    } else if (this.offsettechnicaldata.magnetid === 1) {
      if (!this.offsettechnicaldata.description17) {

        this.api.showWarningToast('Magnet Description Required', '');
        return ;
      }
    } else if (this.offsettechnicaldata.stickerattachingid === 1) {
      if (!this.offsettechnicaldata.description18) {

        this.api.showWarningToast('stickerattaching Description Required', '');
        return ;
      }
    } else if (this.offsettechnicaldata.rfidattachingid === 1) {
      if (!this.offsettechnicaldata.description19) {

        this.api.showWarningToast('rfiddattaching Description Required', '');
        return ;
      }
    } else if (!this.offsettechnicaldata.folderglueingid) {
      this.api.showWarningToast('folderglueing  Required', '');
      return ;
    } else if (this.offsettechnicaldata.creezing === 1) {
      if (!this.offsettechnicaldata.description20) {

        this.api.showWarningToast('creezing Description Required', '');
        return ;
      }
    } else if (this.offsettechnicaldata.uv === 1) {
      if (!this.offsettechnicaldata.description20) {

        this.api.showWarningToast('uv Description Required', '');
        return ;
      }
    }
    this.api.getdata('offset-technical-details?filter[where][sampleid]=' + this.sampleid).subscribe((res1: any) => {
      console.log(res1);
      if (res1.length < 1) {
        this.offsettechnicaldata.sampleid = this.sampleid;
        console.log(this.sampleid);
        this.api.patchdata('offset-technical-details', this.offsettechnicaldata).subscribe(res => {
          this.response = res;
          this.api.showSuccessToast('offset Details Added Successfully ', this.response.message);
          this.getOffsetTechnicalDetails();
          // form.resetForm();
        }, err => {
          this.api.showFailureToast('Error', err.message);
          console.log(err);
        });
      } else {
        this.api.showWarningToast('offset Details already exists', '');
      }
    });

  }
  updateTechnicalData() {
    this.api.getdata('offset-technical-details?filter[where][sampleid]=' + this.sampleid).subscribe((res1: any) => {
      console.log(res1);
      if (res1.length < 1) {
        this.offsettechnicaldata.sampleid = this.sampleid;
        this.offsettechnicaldata.offsettechnicalid = this.offsetid;
        console.log(this.sampleid);
        this.api.patchdata('offset-technical-details', this.offsettechnicaldata).subscribe(res => {
          this.response = res;
          this.api.showSuccessToast('offset Details Added Successfully ', this.response.message);
          this.getOffsetTechnicalDetails();
          // form.resetForm();
        }, err => {
          this.api.showFailureToast('Error', err.message);
          console.log(err);
        });
      } else {
        this.api.showWarningToast('offset Details already exists', '');
      }
    });
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
      this.material.samplecolorname = this.sampleMaterial[this.index].samplecolorname;
      this.material.colorid = this.sampleMaterial[this.index].colorid;
      this.material.itemid = this.sampleMaterial[this.index].itemid;
      this.material.fullsheetlength = this.sampleMaterial[this.index].fullsheetlength;
      this.material.fullsheetwidth = this.sampleMaterial[this.index].fullsheetwidth;
      this.material.requiredqty = this.sampleMaterial[this.index].requiredqty;
      this.material.createddate = this.sampleMaterial[this.index].createddate;
    }
    console.log(this.sampleMaterial);
  }
  patch() {
       if (!this.material.colorid) {
        this.api.showWarningToast('material color  required', '');
        return ;
      }  else if (!this.material.itemid) {
        this.api.showWarningToast('material name required', '');
        return ;
      } else if (!this.material.fullsheetlength) {
        this.api.showWarningToast('fullsheet length required', '');
        return ;
      } else if (!this.material.fullsheetwidth) {
        this.api.showWarningToast('fullsheet width required', '');
        return ;
      }
       this.api.getdata('SampleWiseMaterialDetails?filter[where][sampleid]=' + this.sampleid + '&filter[where][colorid]=' + this.material.colorid + '&filter[where][itemid]=' + this.material.itemid + '&filter[where][fullsheetlength]=' + this.material.fullsheetlength + '&filter[where][fullsheetwidth]=' + this.material.fullsheetwidth + '&filter[where][requiredqty]=' + this.material.requiredqty).subscribe((resp: any) => {
         console.log(resp);
         if (resp.length < 1) {
           this.material.sampleid = this.sampleid;
           this.api.postdata('SampleWiseMaterialDetails', this.material).subscribe(res => {
             this.response = res;
             console.log(res);
             this.api.showSuccessToast('Offset Sample Material Details Added Successfully ', this.response.message);
             this.material.colorid = '';
             this.material.itemid = '';
             this.material.fullsheetlength = '';
             this.material.fullsheetwidth = '';
             this.material.requiredqty = '';
             this.getMaterialDetailsData();
             this.viewDetail(this.sampleid);
           }, err => {
             this.api.showFailureToast('Error', err.message);
             console.log(err);
           });
         } else {
           this.api.showWarningToast('Offset Sample Material Details Already Exist  ');
         }
       });
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
  updateMaterial() {
    if (!this.material.colorid) {
      this.api.showWarningToast('material color  required', '');
      return ;
    }  else if (!this.material.itemid) {
      this.api.showWarningToast('material name required', '');
      return ;
    } else if (!this.material.fullsheetlength) {
      this.api.showWarningToast('fullsheet length required', '');
      return ;
    } else if (!this.material.fullsheetwidth) {
      this.api.showWarningToast('fullsheet width required', '');
      return ;
    }
    this.api.getdata('SampleWiseMaterialDetails?filter[where][sampleid]=' + this.sampleid + '&filter[where][colorid]=' + this.material.colorid + '&filter[where][itemid]=' + this.material.itemid + '&filter[where][fullsheetlength]=' + this.material.fullsheetlength + '&filter[where][fullsheetwidth]=' + this.material.fullsheetwidth + '&filter[where][requiredqty]=' + this.material.requiredqty).subscribe((resp: any) => {
      console.log(resp);
      if (resp.length < 1) {
        this.sampleMaterial[this.index].id  =  this.material.id;
        this.sampleMaterial[this.index].sampleid  =  this.material.sampleid;
        this.sampleMaterial[this.index].samplecolorname  =  this.material.samplecolorname;
        this.sampleMaterial[this.index].colorid  =  this.material.colorid;
        this.sampleMaterial[this.index].itemid  =  this.material.itemid;
        this.sampleMaterial[this.index].fullsheetlength  =  this.material.fullsheetlength;
        this.sampleMaterial[this.index].fullsheetwidth  =  this.material.fullsheetwidth;
        this.sampleMaterial[this.index].requiredqty  =  this.material.requiredqty;
        this.sampleMaterial[this.index].createddate  =  this.material.createddate;
        this.api.putdata('SampleWiseMaterialDetails', this.mapdata(this.material)).subscribe(res => {
          this.response = res;
          console.log(res);
          this.api.showSuccessToast('Offset Sample Material Details Added Successfully ', this.response.message);
          this.material.colorid = '';
          this.material.itemid = '';
          this.material.fullsheetlength = '';
          this.material.fullsheetwidth = '';
          this.material.requiredqty = '';
          this.getMaterialDetailsData();
        }, err => {
          this.api.showFailureToast('Error', err.message);
          console.log(err);
        });
      } else {
        this.api.showWarningToast('Offset Sample Material Details Already Exist  ');
      }
    });
  }
  mapdata(item) {
    return {
     id : item.id,
     sampleid : item.sampleid,
     samplecolorname : item.samplecolorname,
     colorid : item.colorid,
     itemid : item.itemid,
      fullsheetlength : item.fullsheetlength,
      fullsheetwidth : item.fullsheetwidth,
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
        this.api.showSuccessToast('Offset Sample Material Details Successfully Updated', this.response.message);
      }, err => {
        this.api.showFailureToast('Error', err.message);
        console.log(err);
      });
    });
  }
  toggleCollapse() {
    this.collapse = !this.collapse;
    this.collapse1 = !this.collapse1;
    // if (this.editId) {
      this.optionsLookupSample();
    // }
  }
  toggleCollapse1() {
    this.collapse1 = !this.collapse1;
    if (this.editId) {
      this.optionsLookupSample();
    }
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
  optionsLookupColor(query) {
    this.api.getdata('SampleColors?filter={"limit":10,"where":{"samplecolorname":{"like":"%25' + query + '%25"}}}').subscribe( res => {
      this.colors = res;
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
  optionslookupSampleNo(query) {
    this.api.getdata('SampleGeneralSpecs?filter[where][productcategoryid]=5&filter={"limit":10,"where":{"sampleno":{"like":"%25' + query + '%25"}}}').subscribe( res => {
      this.samplenodata = res;
    }, error1 => {
      console.log('error1 ', error1);
    });
  }
  deleteTechnicalData(id, i) {
    if (id) {
      this.modalService
          .open(new ConfirmModal('Delete this Technical Details', 'Are you sure to delete ?', 'mini'))
          .onApprove(() => {
            this.api.deletedata('WovenCommonDetails', id).subscribe((res: any) => {
              this.response = res;
              this.api.showDeleteToast('Deleted', this.response.message);
              this.sampleTechnicalData.splice(i, 1);
            }, err => {
              console.log(err);
            });
          })
          .onDeny(() => {
            console.log('Deny');
          });
    } else {
      this.sampleTechnicalData.splice(i, 1);
    }
  }
  ngOnInit() {
    this.optionsLookupItem('a');
    this.optionsLookupColor('a');
    this.getCutFold();
    this.optionsLookupSample();
    this.optionslookupSampleNo('o');
  }

}
