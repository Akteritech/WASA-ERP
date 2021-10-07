import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Sample, SampleWiseKeyEntryField} from '../../../models/sample';
import {ApiService} from '../../../../api.service';
import {SuiModalService} from 'ng2-semantic-ui';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {WovenDetails, Yarn} from '../../../models/woven-details';
import {SamplePartWise} from '../../../../masters/components/sample-part-wises/add-sample-part-wise/add-sample-part-wise.component';
import {SampleColor} from '../../../../masters/components/sample-colors/add-sample-color/add-sample-color.component';
import {NgForm} from '@angular/forms';
import {ConfirmModal} from '../../../../templates/confirm-modal/confirm-modal.component';
declare var $: any;
@Component({
  selector: 'app-add-woven-common-details',
  templateUrl: './add-woven-common-details.component.html',
  styleUrls: ['./add-woven-common-details.component.css']
})
export class AddWovenCommonDetailsComponent implements OnInit {

  allItems: any[];
  wovenDetail: any;
  samples: any;
  editWovenId: any;
  suppliers: any;
  editId: any;
  items: any;
  sampleid: any;
  response: any;
  SampleWiseKeyEntryField: any;
  @Output() added = new EventEmitter<boolean>();
  @Output() tabs = new EventEmitter<boolean>();
  colors: any;
  WovenYarnDetails: any;
  keyEntryFields: any;
  yarn: any;
  collapse = false;
  collapse1 = false;
  collapse2 = true;
  cutfoldinfos: any;
  currentRoute: any;
  suppliername: any;
  form: any;
  color: any;
  WovenTechnicalDetails: any;
  samplecolor: any;
  yarninfoid: any;
  weavingtype: any;
  public weavingtypedata: any;
  public index: any;
  samplenodata: any;
  addsample: Sample;
   technicaldetails: any;
  constructor(public api: ApiService , public modalService: SuiModalService ,
              private route: ActivatedRoute, private router: Router) {
    this.wovenDetail = new WovenDetails();
    this.SampleWiseKeyEntryField = new SampleWiseKeyEntryField();
    // this.addsample = new Sample();
    this.sampleid = new Sample();
    this.addsample = new Sample();
    this.color = new SamplePartWise();
    this.samplecolor = new SampleColor();
    this.keyEntryFields = [];
    this.allItems = [];
    this.yarn = new Yarn();
    this.wovenDetail.antidying = this.api.options[1].value;
    this.wovenDetail.stracinginfo = this.api.options[1].value;
    this.wovenDetail.ironicinfo = this.api.options[1].value;
    this.wovenDetail.ultrasoniccutting = this.api.options[1].value;
    this.wovenDetail.antidying = this.api.options[1].value;
    this.wovenDetail.antidying = this.api.options[1].value;
    this.wovenDetail.pick = '';
    this.wovenDetail.cutter = '';
    this.wovenDetail.pslengthctoc = '';
    this.wovenDetail.damasklength = '';
    this.wovenDetail.psfoldtofold = '';
    this.wovenDetail.pswidth = '';
    this.wovenDetail.samplehuk = '';
    this.wovenDetail.beamtension = '';
    this.wovenDetail.washstarcirontime = '';
    this.wovenDetail.productioncapacity = '';
    this.wovenDetail.ultrasoniccutcapacity = '';
    this.wovenDetail.cutfoldcapacity = '';
    this.wovenDetail.finishinginfo = '';
    this.wovenDetail.pickwheel = '';
    this.wovenDetail.remarks = '';
    this.wovenDetail.weavingtype = this.weavingtypedata;
    this.route.params.subscribe(param => {
      if (param.id) {
        this.editId = param.id;
        this.getYarn(param.id);
        this.getYarnn(param.id);
        this.getWoven(param.id);
        this.getKeyEntry(param.id);

      }
    });
    this.router.events.subscribe(
        (event: any) => {
          if (event instanceof NavigationEnd) {
            this.currentRoute = this.router.url;
          }
        }
    );
    this.color.partnoid = 1216;
  }
  getWoven(id) {
    if (!id) { return; }
    this.api.getdata('WovenCommonDetails?filter[where][sampleid]=' + id + '&filter[include]=sample').subscribe((res: any[]) => {
      if (res.length !== 0) {
        this.wovenDetail = res[0];
      } else {
        this.wovenDetail = {};
      }
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  // getCommanDetails(id) {
  //   if (!id) { return; }
  //   this.api.getdata('WovenCommonDetails?filter[where][sampleid]' + id).subscribe(res => {
  //     this.wovenDetail = res;
  //     console.log(res);
  //   }, err => {
  //     console.log(err);
  //   });
  // }
  getRequiredQty(id) {
      this.api.getdata('WovenCommonDetails?filter[where][sampleid]=' + id).subscribe((data: any ) => {
         // this.technicaldetails = data;
        const cutters = data[0].cutter;
       // const warpdeniers = Number(deniers);
       //  console.log(technicaldetails);
       this.yarn.requiredqty = ((1000 * this.yarn.pick  * 77 * this.yarn.denier) / (cutters * 9000 * 1000));
       // console.log(((1000 * data[0].pick  * 77 * warpdeniers) / (data[0].cutter * 9000 * 1000)));
      }, error1 => {
        console.log(error1);
      });
  }
  optionslookupSampleNo(query) {
    const filter: any = {};
    filter['where'] = {};
    filter['order'] = 'sampleid DESC';
    filter['limit'] = 20;
    filter['where']['productcategoryid'] = 1;
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
  getWeavingType() {
    this.api.getdata('LOVs?filter[where][lovtype]=WovevingStyle').subscribe((resp: any) => {
      this.weavingtype = resp;
      this.wovenDetail.weavingtype = resp[2].id;
      console.log(resp);
      console.log(this.wovenDetail.weavingtype);
    });
  }
  getTechnicalDetails() {
    this.api.getdata('WovenCommonDetails?filter[where][sampleid]=' + this.sampleid).subscribe(res => {
      this.WovenTechnicalDetails = res;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  patch(form: NgForm) {
    if (!this.sampleid ) {
      this.api.showWarningToast('Sample No. required', '');
      return;
    }   else if (!this.wovenDetail.filename) {
      this.api.showWarningToast('filename required', '');
      return ;
    } else if (!this.wovenDetail.pick) {
      this.api.showWarningToast('pick required', '');
      return ;
    } else if (!this.wovenDetail.cutter) {
      this.api.showWarningToast('cutter required', '');
      return ;
    } else if (!this.wovenDetail.pslengthctoc) {
      this.api.showWarningToast('length  required', '');
      return ;
    } else if (!this.wovenDetail.psfoldtofold) {
      this.api.showWarningToast('finish length  required', '');
      return ;
    } else if (!this.wovenDetail.pswidth) {
      this.api.showWarningToast('width  required', '');
      return ;
    } else if (!this.wovenDetail.samplehuk) {
      this.api.showWarningToast('hook required', '');
      return ;
    }  else if (!this.wovenDetail.beamtension) {
      this.api.showWarningToast('beam tension required', '');
      return ;
    } else if (!this.wovenDetail.warpdenier) {
      this.api.showWarningToast('warp denier required', '');
      return ;
    } else if (!this.wovenDetail.pickwheel) {
      this.api.showWarningToast('pickwheel required', '');
      return ;
    } else if (!this.wovenDetail.cutfoldinfo) {
      this.api.showWarningToast('cut fold info required', '');
      return ;
    }
    this.api.getdata('WovenCommonDetails?filter[where][sampleid]=' + this.sampleid).subscribe((resp: any) => {
      console.log(resp);
      if (resp.length < 1 ) {
        this.wovenDetail.sampleid = this.sampleid;
        this.wovenDetail.createdby = sessionStorage.getItem('empid');
        // console.log(this.sampleid);
        this.api.patchdata('WovenCommonDetails', this.wovenDetail).subscribe(res => {
          this.response = res;
          this.api.showSuccessToast('Woven Details Added Successfully ', this.response.message);
          form.resetForm();
          this.getTechnicalDetails();
        }, err => {
          this.api.showFailureToast('Error', err.message);
          console.log(err);
        });
      } else {
        this.api.showWarningToast('Woven Details Already Exist on this sample');
      }
    });
  }
  Updatepatch(form: NgForm) {
    if (!this.sampleid ) {
      this.api.showWarningToast('Sample No. required', '');
      return;
    } else if (!this.wovenDetail.beamtension) {
      this.api.showWarningToast('beam tension required', '');
      return ;

    }  else if (!this.wovenDetail.warpdenier) {
      this.api.showWarningToast('warp denier required', '');
      return ;
    } else if (!this.wovenDetail.pickwheel) {
      this.api.showWarningToast('pick wheel required', '');
      return ;
    } else if (!this.wovenDetail.pslengthctoc) {
      this.api.showWarningToast('length  required', '');
      return ;
    } else if (!this.wovenDetail.psfoldtofold) {
      this.api.showWarningToast('finish length  required', '');
      return ;
    } else if (!this.wovenDetail.pswidth) {
      this.api.showWarningToast('width  required', '');
      return ;
    }
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
  getYarn(id) {
    if (!id) { return; }
    this.api.getdata('WovenYarnDetails?filter[where][sampleid]=' + id + '&filter[include]=supplierid&filter[include]=item').subscribe((res: any) => {
      if (res.length !== 0) {
        this.WovenYarnDetails = res;
      } else {
        this.WovenYarnDetails = null;
      }
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  getYarnn(id) {
    if (!id) { return; }
    this.api.getdata('WovenYarnDetails?filter[where][sampleid]=' + id + '&filter[include]=supplierid&filter[include]=item').subscribe(res => {
      this.yarn = res;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  getYarnDetail() {
    this.api.getdata('WovenYarnDetails?filter[where][sampleid]=' + this.sampleid + '&filter[include]=supplierid&filter' +
        '[include]=item').subscribe(res => {
      this.WovenYarnDetails = res;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  selectYarn(item , i) {
    this.index = this.WovenYarnDetails.indexOf(item);
    console.log(this.index);
    if (this.index !== -1) {
      this.yarn.yarninfoid = this.WovenYarnDetails[this.index].yarninfoid;
      this.yarn.sampleid = this.WovenYarnDetails[this.index].sampleid;
      this.yarn.colordescription = this.WovenYarnDetails[this.index].colordescription;
      this.yarn.color = this.WovenYarnDetails[this.index].color;
      this.yarn.itemid = this.WovenYarnDetails[this.index].itemid;
      this.yarn.requiredqty = this.WovenYarnDetails[this.index].requiredqty;
      this.yarn.maheencode = this.WovenYarnDetails[this.index].maheencode;
      this.yarn.denier = this.WovenYarnDetails[this.index].denier;
      this.yarn.pick = this.WovenYarnDetails[this.index].pick;
      this.yarn.supplierid = this.WovenYarnDetails[this.index].supplierid;
      this.yarn.sequenceid = this.WovenYarnDetails[this.index].sequenceid;
      this.yarn.createddate = this.WovenYarnDetails[this.index].createddate;
    }
    console.log(this.WovenYarnDetails);
  }
  updateYarnOnEdit() {
    if (!this.sampleid) {
      this.api.showWarningToast('Sample Not Selected', 'Please select the sample first.');
      return;
    } else if (!this.yarn.color) {
      this.api.showWarningToast('color   required', '');
      return;
    } else if (!this.yarn.itemid) {
      this.api.showWarningToast('item name   required', '');
      return;
    } else if (!this.yarn.maheencode) {
      this.api.showWarningToast('maheencode   required', '');
      return;
    } else if (!this.yarn.denier) {
      this.api.showWarningToast('denier   required', '');
      return;
    } else if (!this.yarn.pick) {
      this.api.showWarningToast('pick   required', '');
      return;
    }
    this.api.getdata('WovenYarnDetails?filter[where][sampleid]=' + this.sampleid + '&filter[where][colordescription]=' + this.yarn.colordescription + '&filter[where][color]=' + this.yarn.color + '&filter[where][denier]=' + this.yarn.denier + '&filter[where][itemid]=' + this.yarn.itemid + '&filter[where][maheencode]=' + this.yarn.maheencode + '&filter[where][pick]=' + this.yarn.pick ).subscribe((resp: any) => {
      console.log(resp);
      if (resp.length < 1) {
        this.WovenYarnDetails[this.index].yarninfoid  = this.yarn.yarninfoid ;
        this.WovenYarnDetails[this.index].sampleid  = this.yarn.sampleid ;
        this.WovenYarnDetails[this.index].colordescription  = this.yarn.colordescription ;
        this.WovenYarnDetails[this.index].color  = this.yarn.color ;
        this.WovenYarnDetails[this.index].itemid  = this.yarn.itemid ;
        this.WovenYarnDetails[this.index].requiredqty  = this.yarn.requiredqty ;
        this.WovenYarnDetails[this.index].maheencode  = this.yarn.maheencode ;
        this.WovenYarnDetails[this.index].denier  = this.yarn.denier ;
        this.WovenYarnDetails[this.index].pick  = this.yarn.pick ;
        this.WovenYarnDetails[this.index].supplierid  = this.yarn.supplierid ;
        this.WovenYarnDetails[this.index].sequenceid  = this.yarn.sequenceid ;
        this.WovenYarnDetails[this.index].createddate  = this.yarn.createddate ;
        this.api.patchdata('WovenYarnDetails', this.mapdata(this.yarn)).subscribe(res => {
          this.response = res;
          console.log(res);
          this.api.showSuccessToast('Woven Yarn Details Updated Successfully ', this.response.message);
          this.yarn.color = '';
          this.yarn.colordescription = '';
          this.yarn.itemid = '';
          this.yarn.requiredqty = '';
          this.yarn.maheencode = '';
          this.yarn.denier = '';
          this.yarn.pick = '';
          this.yarn.supplierid = '';
          this.yarn.sequenceid = '';
          // form.resetForm();
          this.getYarnDetail();
          this.router.navigateByUrl('/woven-technical-details');
        }, err => {
          this.api.showFailureToast('Error', err.message);
          console.log(err);
        });
      } else {
        this.api.showWarningToast('Duplicate Entry Not Allow ');
      }
    });
  }
  mapdata(item) {
    return {
      yarninfoid : item.yarninfoid,
      sampleid : item.sampleid,
      colordescription : item.colordescription,
      color : item.color,
      itemid : item.itemid,
      requiredqty : item.requiredqty,
      maheencode : item.maheencode,
      denier : item.denier,
      pick : item.pick,
      supplierid : item.supplierid,
      sequenceid : item.sequenceid,
      createddate : item.createddate
    };
  }
  saveYarn() {
    if (!this.sampleid) {
      this.api.showWarningToast('Sample Not Selected', 'Please select the sample first.');
      return;
    } else if (!this.yarn.color) {
      this.api.showWarningToast('color   required', '');
      return;
    } else if (!this.yarn.itemid) {
      this.api.showWarningToast('item name   required', '');
      return;
    } else if (!this.yarn.maheencode) {
      this.api.showWarningToast('maheencode   required', '');
      return;
    } else if (!this.yarn.denier) {
      this.api.showWarningToast('denier   required', '');
      return;
    } else if (!this.yarn.pick) {
      this.api.showWarningToast('pick   required', '');
      return;
    }
    this.api.getdata('WovenYarnDetails?filter[where][sampleid]=' + this.sampleid  + '&filter[where][color]=' + this.yarn.color + '&filter[where][denier]=' + this.yarn.denier + '&filter[where][itemid]=' + this.yarn.itemid + '&filter[where][maheencode]=' + this.yarn.maheencode + '&filter[where][pick]=' + this.yarn.pick).subscribe((resp: any) => {
      console.log(resp);
      if (resp.length < 1) {
        this.yarn.sampleid = this.sampleid;
        this.yarn.createdby = sessionStorage.getItem('empid');
        this.yarn.createddate = new Date();
        this.api.patchdata('WovenYarnDetails', this.yarn).subscribe(res => {
          this.response = res;
          console.log(res);
          this.api.showSuccessToast('Woven Yarn Details Added Successfully ', this.response.message);
          this.yarn.color = '';
          this.yarn.colordescription = '';
          this.yarn.itemid = '';
          this.yarn.requiredqty = '';
          this.yarn.maheencode = '';
          this.yarn.denier = '';
          this.yarn.pick = '';
          this.yarn.supplierid = '';
          this.yarn.sequenceid = '';
          // form.resetForm();
          this.getYarnDetail();
        }, err => {
          this.api.showFailureToast('Error', err.message);
          console.log(err);
        });
      } else {
        this.api.showWarningToast('Woven Yarn Details Already Exist On This Sample ');
      }
    });
  }
  updateYarn() {
    if (!this.sampleid) {
      this.api.showWarningToast('Sample Not Selected', 'Please select the sample first.');
      return;
    } else if (!this.yarn.color) {
      this.api.showWarningToast('color   required', '');
      return;
    } else if (!this.yarn.itemid) {
      this.api.showWarningToast('item name   required', '');
      return;
    } else if (!this.yarn.maheencode) {
      this.api.showWarningToast('maheen code   required', '');
      return;
    } else if (!this.yarn.denier) {
      this.api.showWarningToast('denier   required', '');
      return;
    } else if (!this.yarn.pick) {
      this.api.showWarningToast('pick   required', '');
      return;
    }
    this.yarn.sampleid = this.sampleid;
    this.api.patchdata('WovenYarnDetails', this.mapDataYarn(this.yarn)).subscribe(res => {
      this.response = res;
      console.log(res);
      this.api.showSuccessToast('Woven Yarn Details Added Successfully ', this.response.message);
      this.yarn.color = '';
      this.yarn.colordescription = '';
      this.yarn.itemid = '';
      this.yarn.requiredqty = '';
      this.yarn.maheencode = '';
      this.yarn.denier = '';
      this.yarn.pick = '';
      this.yarn.supplierid = '';
      this.yarn.sequenceid = '';
      this.getYarnDetail();
    }, err => {
      this.api.showFailureToast('Error', err.message);
      console.log(err);
    });
  }
  mapDataYarn(data) {
    return{
      sampleid: data.sampleid,
      colordescription: data.colordescription,
      color: data.color,
      itemid: data.itemid,
      requiredqty: data.requiredqty,
      maheencode: data.maheencode,
      denier: data.denier,
      pick: data.pick,
      supplierid: data.supplierid,
      suppliercode: data.suppliercode,
      sequenceid: data.sequenceid
    };
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
  getKeyEntry(id) {
    if (!id) { return; }
    this.api.getdata('SampleWiseKeyEntryFields?filter[where][sampleid]=' + id).subscribe(res => {
      this.keyEntryFields = res;
      console.log(res);
    }, err => {
      console.log(err);
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
          Hook: {
            identifier: 'Hook',
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
        this.api.showSuccessToast('Woven Key Entry Details Added Successfully ', this.response.message);
        form.resetForm();
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
  getColor() {
    this.api.getdata('lovs?filter[where][lovtype]=Color').subscribe( res => {
      console.log(res);
      this.colors = res;
      this.wovenDetail.color = res[4].id;
      console.log(this.wovenDetail.color);
      return res;
    }, error1 => {
      console.log(error1);
    });
  }
  getCutFold() {
    this.api.getdata('lovs?filter[where][lovtype]=CutFoldType').subscribe( res => {
      console.log(res);
      this.cutfoldinfos = res;
      this.wovenDetail.cutfoldinfo = res[0].id;
      return res;
    }, error1 => {
      console.log(error1);
    });
  }
  optionsLookupSample() {
    if (!this.editId) {
      this.api.getdata('SampleGeneralSpecs?filter[order]=sampleid DESC&filter[where]' +
          '[productcategoryid]=1&filter[limit]=1').subscribe((res: any) => {
        this.samples = res;
        console.log(this.samples);
        this.sampleid = res[0].sampleid;
        // this.addsample.length = res[0].length;
        // this.addsample.width = res[0].width;
        // this.addsample.finishlength = res[0].finishlength;
        // this.yarn.requiredqty = res[0].length;
      });
    } else {
      this.api.getdata('SampleGeneralSpecs/' + this.editId).subscribe((res: any) => {
        this.samples = [res];
        console.log([res]);
        this.sampleid = res.sampleid;
        // this.addsample.length = res[0].length;
        // this.addsample.width = res[0].width;
        // this.addsample.finishlength = res[0].finishlength;
        // this.yarn.requiredqty = res[0].length;
      });
    }
  }
  // SampleNoLookup() {
  //   if (this.editId) {
  //     this.api.getdata('')
  //   }
  // }
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
  toggleCollapse() {
    // if (!this.editId) {
    //   this.optionsLookupSample();
    // }
    this.collapse = !this.collapse;
    this.collapse1 = !this.collapse1;
    this.collapse2 = !this.collapse2;

  }
  toggleCollapse1() {
    this.collapse1 = !this.collapse1;
    this.collapse2 = !this.collapse2;
  }
  toggleCollapse2() {
    this.collapse2 = !this.collapse2;
  }

  updateSelection (domName, selectionText) {
    document.getElementsByName(domName)[0].firstChild['value'] = selectionText;
    document.getElementsByName(domName)[0].childNodes[2]['innerHTML'] = '';
  }
  ngOnInit() {
    this.getColor();
    this.getWeavingType();
    this.getCutFold();
    this.optionsLookupSupplier('a');
    this.optionsLookupItem();
    // this.formValidation();
    // this.getWoven(this.editId);
    // this.getYarn(this.editId);
    // this.getWoven(this.editId);
    // this.getKeyEntry(this.editId);
    this.optionsLookupSample();
    this.optionslookupSampleNo('w');
  }


}
