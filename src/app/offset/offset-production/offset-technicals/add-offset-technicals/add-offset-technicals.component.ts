import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from '../../../../api.service';
import {SuiModalService} from 'ng2-semantic-ui';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AddOffsetSampleComponent} from '../../offset-sample/add-offset-sample/add-offset-sample.component';
import {MaterialDetails} from '../../../models/material-details';
import {WovenDetails} from '../../../../woven/models/woven-details';
import {ConfirmModal} from '../../../../templates/confirm-modal/confirm-modal.component';
import {NgForm} from '@angular/forms';
import {ShowDetail} from '../../../../templates/show-detail/show-detail.component';
import {OffsetTechnicalDetails} from '../../../models/offset-technical-details';
declare var $: any;
@Component({
  selector: 'app-add-offset-technicals',
  templateUrl: './add-offset-technicals.component.html',
  styleUrls: ['./add-offset-technicals.component.css']
})
export class AddOffsetTechnicalsComponent implements OnInit {
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
  @Output() added = new EventEmitter<boolean>();
  @Input() id: number;
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
  offsetsamplename: any;
   addsample: any;
  public indexForTechnical: any;
  constructor(public api: ApiService , public modalService: SuiModalService ,
              private route: ActivatedRoute, private router: Router) {
    this.material = new MaterialDetails();
    this.materialData = [];
    this.offsettechnicaldata = new OffsetTechnicalDetails();
    if (this.material.noofups) {
      this.material.requiredqty = 1000 / this.material.noofups;
    }
    // if (this.offsettechnicaldata.noofups) {
    //   this.material.requiredqty = (this.offsettechnicaldata.noofups / 1000);
    // }
    this.route.params.subscribe(param => {
      if (param.id) {
        this.editId = param.id;
        this.getSamples(param.id);
        this.getMaterialDetails(param.id);
        // this.getMaterialDetails(param.id);
        // this.getSampleTechnical(param.id);
        // this.getTechnicalDetails(param.id);
        this.getOffsetTechnicalDetail(param.id);
        this.getOffsetTechnicalDetailss(param.id);
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
  optionsLookupSample() {
    if (!this.editId) {
      this.api.getdata('SampleGeneralSpecs?filter[order]=sampleid DESC&filter[where][productcategoryid]=5&filter[limit]=1')
          .subscribe((res: any) => {
            this.samples = res;
            this.sampleid = res[0].sampleid;
            // this.sampleid = res[0].sampleno;
            // this.quiredqtyper = res[0].noofups;
            // if (this.quiredqtyper !== 0) {
            //   this.material.requiredqty = 1000 / this.quiredqtyper;
            //   console.log(this.material.requiredqty.toFixed(2) + ' no of oops');
            // } else {
            //   this.material.requiredqty = 0;
            // }
          });
    } else {
      this.api.getdata('SampleGeneralSpecs/' + this.editId).subscribe((res: any) => {
        this.samples = [res];
        this.sampleid = res.sampleid;
        // this.quiredqtyper = res.noofups;
        // if (this.quiredqtyper !== 0) {
        //   this.material.requiredqty = 1000 / this.quiredqtyper;
        //   console.log(this.material.requiredqty.toFixed(2) + ' no of oops');
        // } else {
        //   this.material.requiredqty = 0;
        // }
      });
    }
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
  // getSampleTechnical(id) {
  //   this.api.getdata('WovenCommonDetails?filter[where][sampleid]=' + id + '&filter[include]=sample').subscribe(res => {
  //     this.sampleTechnicalData = res;
  //     console.log(res);
  //   }, err => {
  //     console.log(err);
  //   });
  // }
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
  getOffsetTechnicalDetail(id) {
    if (!id) { return; }
    this.api.getdata('offset-technical-details?filter[where][sampleid]=' + id + '&filter[include]=sample').subscribe((res: any[]) => {
      if (res.length !== 0) {
        this.offsettechnicaldata = res[0];
        this.offsetid = res[0].offsettechnicalid;
      }
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  getOffsetTechnicalDetailss(id) {
    if (!id) { return; }
    this.api.getdata('offset-technical-details?filter[where][sampleid]=' + id + '&filter[include]=sample').subscribe((res: any[]) => {
      if (res.length !== 0) {
        this.OffsetTechnicalDetails = res;
        this.offsetid = res[0].offsettechnicalid;
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
  updateTechnicalData(form: NgForm) {
    if (!this.sampleid ) {
      this.api.showWarningToast('Sample No. required', '');
      return;
    }  if (this.offsettechnicaldata.screenprintid === 1) {
      if (!this.offsettechnicaldata.description1) {
        this.api.showWarningToast(' Screen Print Description Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.laminationid === 1) {
      if (!this.offsettechnicaldata.thermal) {
        this.api.showWarningToast('  Hot Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.laminationid === 2) {
      if (!this.offsettechnicaldata.coldglue) {
        this.api.showWarningToast('  coldglue Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.eyeletid === 1) {
      if (!this.offsettechnicaldata.description2) {
        this.api.showWarningToast('Eyelet Description Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.stringid === 1) {
      if (!this.offsettechnicaldata.description3) {
        this.api.showWarningToast('String Description Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.tagpinid === 1) {
      if (!this.offsettechnicaldata.description4) {
        this.api.showWarningToast('tagpin Description Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.cuttingid === 1) {
      if (!this.offsettechnicaldata.description5) {
        this.api.showWarningToast('cutting Description Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.embossid === 1) {
      if (!this.offsettechnicaldata.description6) {
        this.api.showWarningToast('Emboss  Description Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.debossid === 1) {
      if (!this.offsettechnicaldata.description7) {
        this.api.showWarningToast('Deboss Description Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.foilingid === 1) {
      if (!this.offsettechnicaldata.description8) {
        this.api.showWarningToast(' foiling Description Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.boardpasting === 1) {
      if (!this.offsettechnicaldata.description9) {
        this.api.showWarningToast('Boardpasting Description Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.windowid === 1) {
      if (!this.offsettechnicaldata.description10) {

        this.api.showWarningToast('Window Description Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.windowwithpetid === 1) {
      if (!this.offsettechnicaldata.description11) {

        this.api.showWarningToast('Window With Pet Description Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.hangerid === 1) {
      if (!this.offsettechnicaldata.description12) {

        this.api.showWarningToast('Hanger Description Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.hookid === 1) {
      if (!this.offsettechnicaldata.description13) {

        this.api.showWarningToast('Hook Description Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.holeid === 1) {
      if (!this.offsettechnicaldata.description14) {

        this.api.showWarningToast('Hole Description Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.perforationid === 1) {
      if (!this.offsettechnicaldata.description15) {

        this.api.showWarningToast('Perforation Description Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.bothsidetapeid === 1) {
      if (!this.offsettechnicaldata.description16) {

        this.api.showWarningToast('BothSideTape Description Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.magnetid === 1) {
      if (!this.offsettechnicaldata.description17) {

        this.api.showWarningToast('Magnet Description Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.stickerattachingid === 1) {
      if (!this.offsettechnicaldata.description18) {

        this.api.showWarningToast('stickerattaching Description Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.rfidattachingid === 1) {
      if (!this.offsettechnicaldata.description19) {

        this.api.showWarningToast('rfiddattaching Description Required', '');
        return ;
      }
    }  if (this.offsettechnicaldata.creezing === 1) {
      if (!this.offsettechnicaldata.description20) {

        this.api.showWarningToast('creezing Description Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.uv === 1) {
      if (!this.offsettechnicaldata.description21) {

        this.api.showWarningToast('uv Description Required', '');
        return ;
      }
    }
    this.api.getdata('offset-technical-details' +
        '?filter[where][sampleid]=' + this.sampleid
        + '&filter[where][screenprintid]=' + this.offsettechnicaldata.screenprintid
        + '&filter[where][thermal]=' + this.offsettechnicaldata.thermal
        + '&filter[where][coldglue]=' + this.offsettechnicaldata.coldglue
        + '&filter[where][eyeletid]=' + this.offsettechnicaldata.eyeletid
        + '&filter[where][stringid]=' + this.offsettechnicaldata.stringid
        + '&filter[where][tagpinid]=' + this.offsettechnicaldata.tagpinid
        + '&filter[where][cuttingid]=' + this.offsettechnicaldata.cuttingid
        + '&filter[where][embossid]=' + this.offsettechnicaldata.embossid
        + '&filter[where][debossid]=' + this.offsettechnicaldata.debossid
        + '&filter[where][foilingid]=' + this.offsettechnicaldata.foilingid
        + '&filter[where][boardpasting]=' + this.offsettechnicaldata.boardpasting
        + '&filter[where][windowid]=' + this.offsettechnicaldata.windowid
        + '&filter[where][windowwithpetid]=' + this.offsettechnicaldata.windowwithpetid
        + '&filter[where][hangerid]=' + this.offsettechnicaldata.hangerid
        + '&filter[where][hookid]=' + this.offsettechnicaldata.hookid
        + '&filter[where][holeid]=' + this.offsettechnicaldata.holeid
        + '&filter[where][perforationid]=' + this.offsettechnicaldata.perforationid
        + '&filter[where][bothsidetapeid]=' + this.offsettechnicaldata.bothsidetapeid
        + '&filter[where][magnetid]=' + this.offsettechnicaldata.magnetid
        + '&filter[where][stickerattachingid]=' + this.offsettechnicaldata.stickerattachingid
        + '&filter[where][rfidattachingid]=' + this.offsettechnicaldata.rfidattachingid
        + '&filter[where][folderglueingid]=' + this.offsettechnicaldata.folderglueingid
        + '&filter[where][creezing]=' + this.offsettechnicaldata.creezing
        + '&filter[where][uv]=' + this.offsettechnicaldata.uv
        + '&filter[where][description1]=' + this.offsettechnicaldata.description1
        + '&filter[where][description2]=' + this.offsettechnicaldata.description2
        + '&filter[where][description3]=' + this.offsettechnicaldata.description3
        + '&filter[where][description4]=' + this.offsettechnicaldata.description4
        + '&filter[where][description5]=' + this.offsettechnicaldata.description5
        + '&filter[where][description6]=' + this.offsettechnicaldata.description6
        + '&filter[where][description7]=' + this.offsettechnicaldata.description7
        + '&filter[where][description7]=' + this.offsettechnicaldata.description7
        + '&filter[where][description8]=' + this.offsettechnicaldata.description8
        + '&filter[where][description9]=' + this.offsettechnicaldata.description9
        + '&filter[where][description10]=' + this.offsettechnicaldata.description10
        + '&filter[where][description11]=' + this.offsettechnicaldata.description11
        + '&filter[where][description12]=' + this.offsettechnicaldata.description12
        + '&filter[where][description13]=' + this.offsettechnicaldata.description13
        + '&filter[where][description14]=' + this.offsettechnicaldata.description14
        + '&filter[where][description15]=' + this.offsettechnicaldata.description15
        + '&filter[where][description16]=' + this.offsettechnicaldata.description16
        + '&filter[where][description17]=' + this.offsettechnicaldata.description17
        + '&filter[where][description18]=' + this.offsettechnicaldata.description18
        + '&filter[where][description19]=' + this.offsettechnicaldata.description19
        + '&filter[where][description20]=' + this.offsettechnicaldata.description20
        + '&filter[where][description21]=' + this.offsettechnicaldata.description21).subscribe((res1: any) => {
      console.log(res1);
      if (res1.length < 1) {
        this.OffsetTechnicalDetails[this.indexForTechnical].offsettechnicalid = this.offsettechnicaldata.offsettechnicalid;
        this.OffsetTechnicalDetails[this.indexForTechnical].sampleid = this.offsettechnicaldata.sampleid;
        this.OffsetTechnicalDetails[this.indexForTechnical].screenprintid = this.offsettechnicaldata.screenprintid;
        this.OffsetTechnicalDetails[this.indexForTechnical].description1 = this.offsettechnicaldata.description1;
        this.OffsetTechnicalDetails[this.indexForTechnical].laminationid = this.offsettechnicaldata.laminationid;
        this.OffsetTechnicalDetails[this.indexForTechnical].thermal = this.offsettechnicaldata.thermal;
        this.OffsetTechnicalDetails[this.indexForTechnical].coldglue = this.offsettechnicaldata.coldglue;
        this.OffsetTechnicalDetails[this.indexForTechnical].eyeletid = this.offsettechnicaldata.eyeletid;
        this.OffsetTechnicalDetails[this.indexForTechnical].stringid = this.offsettechnicaldata.stringid;
        this.OffsetTechnicalDetails[this.indexForTechnical].tagpinid = this.offsettechnicaldata.tagpinid;
        this.OffsetTechnicalDetails[this.indexForTechnical].cuttingid = this.offsettechnicaldata.cuttingid;
        this.OffsetTechnicalDetails[this.indexForTechnical].embossid = this.offsettechnicaldata.embossid;
        this.OffsetTechnicalDetails[this.indexForTechnical].debossid = this.offsettechnicaldata.debossid;
        this.OffsetTechnicalDetails[this.indexForTechnical].foilingid = this.offsettechnicaldata.foilingid;
        this.OffsetTechnicalDetails[this.indexForTechnical].boardpasting = this.offsettechnicaldata.boardpasting;
        this.OffsetTechnicalDetails[this.indexForTechnical].windowid = this.offsettechnicaldata.windowid;
        this.OffsetTechnicalDetails[this.indexForTechnical].windowwithpetid = this.offsettechnicaldata.windowwithpetid;
        this.OffsetTechnicalDetails[this.indexForTechnical].hangerid = this.offsettechnicaldata.hangerid;
        this.OffsetTechnicalDetails[this.indexForTechnical].hookid = this.offsettechnicaldata.hookid;
        this.OffsetTechnicalDetails[this.indexForTechnical].holeid = this.offsettechnicaldata.holeid;
        this.OffsetTechnicalDetails[this.indexForTechnical].perforationid = this.offsettechnicaldata.perforationid;
        this.OffsetTechnicalDetails[this.indexForTechnical].bothsidetapeid = this.offsettechnicaldata.bothsidetapeid;
        this.OffsetTechnicalDetails[this.indexForTechnical].magnetid = this.offsettechnicaldata.magnetid;
        this.OffsetTechnicalDetails[this.indexForTechnical].stickerattachingid = this.offsettechnicaldata.stickerattachingid;
        this.OffsetTechnicalDetails[this.indexForTechnical].rfidattachingid = this.offsettechnicaldata.rfidattachingid;
        this.OffsetTechnicalDetails[this.indexForTechnical].folderglueingid = this.offsettechnicaldata.folderglueingid;
        this.OffsetTechnicalDetails[this.indexForTechnical].creezing = this.offsettechnicaldata.creezing;
        this.OffsetTechnicalDetails[this.indexForTechnical].uv = this.offsettechnicaldata.uv;
        this.OffsetTechnicalDetails[this.indexForTechnical].description2 = this.offsettechnicaldata.description2;
        this.OffsetTechnicalDetails[this.indexForTechnical].description3 = this.offsettechnicaldata.description3;
        this.OffsetTechnicalDetails[this.indexForTechnical].description4 = this.offsettechnicaldata.description4;
        this.OffsetTechnicalDetails[this.indexForTechnical].description5 = this.offsettechnicaldata.description5;
        this.OffsetTechnicalDetails[this.indexForTechnical].description6 = this.offsettechnicaldata.description6;
        this.OffsetTechnicalDetails[this.indexForTechnical].description7 = this.offsettechnicaldata.description7;
        this.OffsetTechnicalDetails[this.indexForTechnical].description8 = this.offsettechnicaldata.description8;
        this.OffsetTechnicalDetails[this.indexForTechnical].description9 = this.offsettechnicaldata.description9;
        this.OffsetTechnicalDetails[this.indexForTechnical].description10 = this.offsettechnicaldata.description10;
        this.OffsetTechnicalDetails[this.indexForTechnical].description11 = this.offsettechnicaldata.description11;
        this.OffsetTechnicalDetails[this.indexForTechnical].description12 = this.offsettechnicaldata.description12;
        this.OffsetTechnicalDetails[this.indexForTechnical].description13 = this.offsettechnicaldata.description13;
        this.OffsetTechnicalDetails[this.indexForTechnical].description14 = this.offsettechnicaldata.description14;
        this.OffsetTechnicalDetails[this.indexForTechnical].description15 = this.offsettechnicaldata.description15;
        this.OffsetTechnicalDetails[this.indexForTechnical].description16 = this.offsettechnicaldata.description16;
        this.OffsetTechnicalDetails[this.indexForTechnical].description17 = this.offsettechnicaldata.description17;
        this.OffsetTechnicalDetails[this.indexForTechnical].description18 = this.offsettechnicaldata.description18;
        this.OffsetTechnicalDetails[this.indexForTechnical].description19 = this.offsettechnicaldata.description19;
        this.OffsetTechnicalDetails[this.indexForTechnical].description20 = this.offsettechnicaldata.description20;
        this.OffsetTechnicalDetails[this.indexForTechnical].description21 = this.offsettechnicaldata.description21;
        console.log(this.sampleid);
        this.api.patchdata('offset-technical-details', this.mapTechnicalData(this.offsettechnicaldata)).subscribe(res => {
          this.response = res;
          this.api.showSuccessToast('Offset Details Updated Successfully ', this.response.message);
          this.added.emit(true);
          this.getOffsetTechnicalDetails();
          form.resetForm();
        }, err => {
          this.api.showFailureToast('Error', err.message);
          console.log(err);
        });
      } else {
        this.api.showWarningToast('Duplicate Data Not Allowed', '');
      }
    });
  }
  mapTechnicalData(element) {
    return {
      offsettechnicalid : element.offsettechnicalid,
      sampleid : element.sampleid,
      noofups : element.noofups,
      screenprintid : element.screenprintid,
      description1 : element.description1,
      laminationid : element.laminationid,
      thermal : element.thermal,
      coldglue : element.coldglue,
      eyeletid : element.eyeletid,
      stringid : element.stringid,
      tagpinid : element.tagpinid,
      cuttingid : element.cuttingid,
      embossid : element.embossid,
      debossid : element.debossid,
      foilingid : element.foilingid,
      boardpasting : element.boardpasting,
      windowid : element.windowid,
      windowwithpetid : element.windowwithpetid,
      hangerid : element.hangerid,
      hookid : element.hookid,
      holeid : element.holeid,
      perforationid : element.perforationid,
      bothsidetapeid : element.bothsidetapeid,
      magnetid : element.magnetid,
      stickerattachingid : element.stickerattachingid,
      rfidattachingid : element.rfidattachingid,
      folderglueingid : element.folderglueingid,
      creezing : element.creezing,
      uv : element.uv,
      description2 : element.description2,
      description3 : element.description3,
      description4 : element.description4,
      description5 : element.description5,
      description6 : element.description6,
      description7 : element.description7,
      description8 : element.description8,
      description9 : element.description9,
      description10 : element.description10,
      description11 : element.description11,
      description12 : element.description12,
      description13 : element.description13,
      description14 : element.description14,
      description15 : element.description15,
      description16 : element.description16,
      description17 : element.description17,
      description18 : element.description18,
      description19 : element.description19,
      description20 : element.description20,
      description21 : element.description21
    };
  }
  patchTechnicalData(form: NgForm) {
    if (!this.sampleid ) {
       this.api.showWarningToast('Sample No. required', '');
      return;
    } if (this.offsettechnicaldata.screenprintid === 1) {
      if (!this.offsettechnicaldata.description1) {
         this.api.showWarningToast(' Screen Print Description Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.laminationid === 1) {
      if (!this.offsettechnicaldata.thermal) {
        this.api.showWarningToast('  Hot Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.laminationid === 2) {
      if (!this.offsettechnicaldata.coldglue) {
        this.api.showWarningToast('  coldglue Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.eyeletid === 1) {
      if (!this.offsettechnicaldata.description2) {
        this.api.showWarningToast('Eyelet Description Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.stringid === 1) {
      if (!this.offsettechnicaldata.description3) {
        this.api.showWarningToast('String Description Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.tagpinid === 1) {
      if (!this.offsettechnicaldata.description4) {
        this.api.showWarningToast('tagpin Description Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.cuttingid === 1) {
      if (!this.offsettechnicaldata.description5) {
        this.api.showWarningToast('cutting Description Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.embossid === 1) {
      if (!this.offsettechnicaldata.description6) {
        this.api.showWarningToast('Emboss  Description Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.debossid === 1) {
      if (!this.offsettechnicaldata.description7) {
        this.api.showWarningToast('Deboss Description Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.foilingid === 1) {
      if (!this.offsettechnicaldata.description8) {
        this.api.showWarningToast(' foiling Description Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.boardpasting === 1) {
      if (!this.offsettechnicaldata.description9) {
        this.api.showWarningToast('Boardpasting Description Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.windowid === 1) {
      if (!this.offsettechnicaldata.description10) {

        this.api.showWarningToast('Window Description Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.windowwithpetid === 1) {
      if (!this.offsettechnicaldata.description11) {

        this.api.showWarningToast('Window With Pet Description Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.hangerid === 1) {
      if (!this.offsettechnicaldata.description12) {

        this.api.showWarningToast('Hanger Description Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.hookid === 1) {
      if (!this.offsettechnicaldata.description13) {

        this.api.showWarningToast('Hook Description Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.holeid === 1) {
      if (!this.offsettechnicaldata.description14) {

        this.api.showWarningToast('Hole Description Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.perforationid === 1) {
      if (!this.offsettechnicaldata.description15) {

        this.api.showWarningToast('Perforation Description Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.bothsidetapeid === 1) {
      if (!this.offsettechnicaldata.description16) {

        this.api.showWarningToast('BothSideTape Description Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.magnetid === 1) {
      if (!this.offsettechnicaldata.description17) {

        this.api.showWarningToast('Magnet Description Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.stickerattachingid === 1) {
      if (!this.offsettechnicaldata.description18) {

        this.api.showWarningToast('stickerattaching Description Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.rfidattachingid === 1) {
      if (!this.offsettechnicaldata.description19) {

        this.api.showWarningToast('RFID Attaching Description Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.creezing === 1) {
      if (!this.offsettechnicaldata.description20) {

        this.api.showWarningToast('creezing Description Required', '');
        return ;
      }
    } if (this.offsettechnicaldata.uv === 1) {
      if (!this.offsettechnicaldata.description21) {

        this.api.showWarningToast('uv Description Required', '');
        return;
      }
    }
      this.api.getdata('offset-technical-details' +
          '?filter[where][sampleid]=' + this.sampleid
          + '&filter[where][screenprintid]=' + this.offsettechnicaldata.screenprintid
          + '&filter[where][thermal]=' + this.offsettechnicaldata.thermal
          + '&filter[where][coldglue]=' + this.offsettechnicaldata.coldglue
          + '&filter[where][eyeletid]=' + this.offsettechnicaldata.eyeletid
          + '&filter[where][stringid]=' + this.offsettechnicaldata.stringid
          + '&filter[where][tagpinid]=' + this.offsettechnicaldata.tagpinid
          + '&filter[where][cuttingid]=' + this.offsettechnicaldata.cuttingid
          + '&filter[where][embossid]=' + this.offsettechnicaldata.embossid
          + '&filter[where][debossid]=' + this.offsettechnicaldata.debossid
          + '&filter[where][foilingid]=' + this.offsettechnicaldata.foilingid
          + '&filter[where][boardpasting]=' + this.offsettechnicaldata.boardpasting
          + '&filter[where][windowid]=' + this.offsettechnicaldata.windowid
          + '&filter[where][windowwithpetid]=' + this.offsettechnicaldata.windowwithpetid
          + '&filter[where][hangerid]=' + this.offsettechnicaldata.hangerid
          + '&filter[where][hookid]=' + this.offsettechnicaldata.hookid
          + '&filter[where][holeid]=' + this.offsettechnicaldata.holeid
          + '&filter[where][perforationid]=' + this.offsettechnicaldata.perforationid
          + '&filter[where][bothsidetapeid]=' + this.offsettechnicaldata.bothsidetapeid
          + '&filter[where][magnetid]=' + this.offsettechnicaldata.magnetid
          + '&filter[where][stickerattachingid]=' + this.offsettechnicaldata.stickerattachingid
          + '&filter[where][rfidattachingid]=' + this.offsettechnicaldata.rfidattachingid
          + '&filter[where][folderglueingid]=' + this.offsettechnicaldata.folderglueingid
          + '&filter[where][creezing]=' + this.offsettechnicaldata.creezing
          + '&filter[where][uv]=' + this.offsettechnicaldata.uv
          + '&filter[where][description1]=' + this.offsettechnicaldata.description1
          + '&filter[where][description2]=' + this.offsettechnicaldata.description2
          + '&filter[where][description3]=' + this.offsettechnicaldata.description3
          + '&filter[where][description4]=' + this.offsettechnicaldata.description4
          + '&filter[where][description5]=' + this.offsettechnicaldata.description5
          + '&filter[where][description6]=' + this.offsettechnicaldata.description6
          + '&filter[where][description7]=' + this.offsettechnicaldata.description7
          + '&filter[where][description7]=' + this.offsettechnicaldata.description7
          + '&filter[where][description8]=' + this.offsettechnicaldata.description8
          + '&filter[where][description9]=' + this.offsettechnicaldata.description9
          + '&filter[where][description10]=' + this.offsettechnicaldata.description10
          + '&filter[where][description11]=' + this.offsettechnicaldata.description11
          + '&filter[where][description12]=' + this.offsettechnicaldata.description12
          + '&filter[where][description13]=' + this.offsettechnicaldata.description13
          + '&filter[where][description14]=' + this.offsettechnicaldata.description14
          + '&filter[where][description15]=' + this.offsettechnicaldata.description15
          + '&filter[where][description16]=' + this.offsettechnicaldata.description16
          + '&filter[where][description17]=' + this.offsettechnicaldata.description17
          + '&filter[where][description18]=' + this.offsettechnicaldata.description18
          + '&filter[where][description19]=' + this.offsettechnicaldata.description19
          + '&filter[where][description20]=' + this.offsettechnicaldata.description20
          + '&filter[where][description21]=' + this.offsettechnicaldata.description21).subscribe((res1: any) => {
        console.log(res1);
        if (res1.length < 1) {
            this.offsettechnicaldata.sampleid = this.sampleid;
            this.offsettechnicaldata.createdby = sessionStorage.getItem('empid');
          this.api.patchdata('offset-technical-details', this.offsettechnicaldata).subscribe(res => {
              this.response = res;
              this.api.showSuccessToast('Offset Details Added Successfully ', this.response.message);
              this.added.emit(true);
              this.getOffsetTechnicalDetails();
              form.resetForm();
            }, err => {
              this.api.showFailureToast('Error', err.message);
              console.log(err);
            });
        } else {
          this.api.showWarningToast('Duplicate Data Not Allowed', '');
        }
      });
  }
  deleteMaterial(id, i) {
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

  deleteTechnical(id, i) {
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
  selectTechnical(TechnicalDetails, i) {
    this.indexForTechnical = this.OffsetTechnicalDetails.indexOf(TechnicalDetails);
    console.log(this.indexForTechnical);
    if (this.indexForTechnical !== -1) {
      this.offsettechnicaldata.offsettechnicalid = this.OffsetTechnicalDetails[this.indexForTechnical].offsettechnicalid;
      this.offsettechnicaldata.sampleid = this.OffsetTechnicalDetails[this.indexForTechnical].sampleid;
      this.offsettechnicaldata.screenprintid = this.OffsetTechnicalDetails[this.indexForTechnical].screenprintid;
      this.offsettechnicaldata.description1 = this.OffsetTechnicalDetails[this.indexForTechnical].description1;
      this.offsettechnicaldata.laminationid = this.OffsetTechnicalDetails[this.indexForTechnical].laminationid;
      this.offsettechnicaldata.thermal = this.OffsetTechnicalDetails[this.indexForTechnical].thermal;
      this.offsettechnicaldata.coldglue = this.OffsetTechnicalDetails[this.indexForTechnical].coldglue;
      this.offsettechnicaldata.eyeletid = this.OffsetTechnicalDetails[this.indexForTechnical].eyeletid;
      this.offsettechnicaldata.stringid = this.OffsetTechnicalDetails[this.indexForTechnical].stringid;
      this.offsettechnicaldata.tagpinid = this.OffsetTechnicalDetails[this.indexForTechnical].tagpinid;
      this.offsettechnicaldata.cuttingid = this.OffsetTechnicalDetails[this.indexForTechnical].cuttingid;
      this.offsettechnicaldata.embossid = this.OffsetTechnicalDetails[this.indexForTechnical].embossid;
      this.offsettechnicaldata.embossid = this.OffsetTechnicalDetails[this.indexForTechnical].embossid;
      this.offsettechnicaldata.debossid = this.OffsetTechnicalDetails[this.indexForTechnical].debossid;
      this.offsettechnicaldata.foilingid = this.OffsetTechnicalDetails[this.indexForTechnical].foilingid;
      this.offsettechnicaldata.boardpasting = this.OffsetTechnicalDetails[this.indexForTechnical].boardpasting;
      this.offsettechnicaldata.windowid = this.OffsetTechnicalDetails[this.indexForTechnical].windowid;
      this.offsettechnicaldata.windowwithpetid = this.OffsetTechnicalDetails[this.indexForTechnical].windowwithpetid;
      this.offsettechnicaldata.hangerid = this.OffsetTechnicalDetails[this.indexForTechnical].hangerid;
      this.offsettechnicaldata.hookid = this.OffsetTechnicalDetails[this.indexForTechnical].hookid;
      this.offsettechnicaldata.holeid = this.OffsetTechnicalDetails[this.indexForTechnical].holeid;
      this.offsettechnicaldata.perforationid = this.OffsetTechnicalDetails[this.indexForTechnical].perforationid;
      this.offsettechnicaldata.bothsidetapeid = this.OffsetTechnicalDetails[this.indexForTechnical].bothsidetapeid;
      this.offsettechnicaldata.magnetid = this.OffsetTechnicalDetails[this.indexForTechnical].magnetid;
      this.offsettechnicaldata.stickerattachingid = this.OffsetTechnicalDetails[this.indexForTechnical].stickerattachingid;
      this.offsettechnicaldata.rfidattachingid = this.OffsetTechnicalDetails[this.indexForTechnical].rfidattachingid;
      this.offsettechnicaldata.folderglueingid = this.OffsetTechnicalDetails[this.indexForTechnical].folderglueingid;
      this.offsettechnicaldata.creezing = this.OffsetTechnicalDetails[this.indexForTechnical].creezing;
      this.offsettechnicaldata.uv = this.OffsetTechnicalDetails[this.indexForTechnical].uv;
      this.offsettechnicaldata.description2 = this.OffsetTechnicalDetails[this.indexForTechnical].description2;
      this.offsettechnicaldata.description3 = this.OffsetTechnicalDetails[this.indexForTechnical].description3;
      this.offsettechnicaldata.description4 = this.OffsetTechnicalDetails[this.indexForTechnical].description4;
      this.offsettechnicaldata.description5 = this.OffsetTechnicalDetails[this.indexForTechnical].description5;
      this.offsettechnicaldata.description6 = this.OffsetTechnicalDetails[this.indexForTechnical].description6;
      this.offsettechnicaldata.description7 = this.OffsetTechnicalDetails[this.indexForTechnical].description7;
      this.offsettechnicaldata.description8 = this.OffsetTechnicalDetails[this.indexForTechnical].description8;
      this.offsettechnicaldata.description9 = this.OffsetTechnicalDetails[this.indexForTechnical].description9;
      this.offsettechnicaldata.description10 = this.OffsetTechnicalDetails[this.indexForTechnical].description10;
      this.offsettechnicaldata.description11 = this.OffsetTechnicalDetails[this.indexForTechnical].description11;
      this.offsettechnicaldata.description12 = this.OffsetTechnicalDetails[this.indexForTechnical].description12;
      this.offsettechnicaldata.description13 = this.OffsetTechnicalDetails[this.indexForTechnical].description13;
      this.offsettechnicaldata.description14 = this.OffsetTechnicalDetails[this.indexForTechnical].description14;
      this.offsettechnicaldata.description15 = this.OffsetTechnicalDetails[this.indexForTechnical].description15;
      this.offsettechnicaldata.description16 = this.OffsetTechnicalDetails[this.indexForTechnical].description16;
      this.offsettechnicaldata.description17 = this.OffsetTechnicalDetails[this.indexForTechnical].description17;
      this.offsettechnicaldata.description18 = this.OffsetTechnicalDetails[this.indexForTechnical].description18;
      this.offsettechnicaldata.description19 = this.OffsetTechnicalDetails[this.indexForTechnical].description19;
      this.offsettechnicaldata.description20 = this.OffsetTechnicalDetails[this.indexForTechnical].description20;
      this.offsettechnicaldata.description21 = this.OffsetTechnicalDetails[this.indexForTechnical].description21;
      // this.offsettechnicaldata.requiredqty = this.OffsetTechnicalDetails[this.index].requiredqty;
      // this.offsettechnicaldata.createddate = this.OffsetTechnicalDetails[this.index].createddate;
    }
    console.log(this.OffsetTechnicalDetails);
  }
  public selectMaterial( item, i) {
    this.index = this.sampleMaterial.indexOf(item);
    console.log(this.index);
    if (this.index !== -1) {
      this.material.id = this.sampleMaterial[this.index].id;
      this.material.sampleid = this.sampleMaterial[this.index].sampleid;
      this.material.samplecolorname = this.sampleMaterial[this.index].samplecolorname;
      this.material.colorid = this.sampleMaterial[this.index].colorid;
      this.material.itemid = this.sampleMaterial[this.index].itemid;
      this.material.noofups = this.sampleMaterial[this.index].noofups;
      this.material.fullsheetlength = this.sampleMaterial[this.index].fullsheetlength;
      this.material.fullsheetwidth = this.sampleMaterial[this.index].fullsheetwidth;
      this.material.requiredqty = this.sampleMaterial[this.index].requiredqty;
      this.material.createddate = this.sampleMaterial[this.index].createddate;
    }
    console.log(this.sampleMaterial);
  }
  patch() {
    if (!this.sampleid) {
      this.api.showWarningToast(' Sample No.  required', '');
      return ;
    } else if (!this.material.colorid) {
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
    } else if (!this.material.noofups) {
      this.api.showWarningToast('No of Ups  required', '');
      return ;
    }
    this.api.getdata('SampleWiseMaterialDetails?filter[where][sampleid]=' + this.sampleid + '&filter[where][colorid]=' + this.material.colorid + '&filter[where][itemid]=' + this.material.itemid + '&filter[where][fullsheetlength]=' + this.material.fullsheetlength + '&filter[where][fullsheetwidth]=' + this.material.fullsheetwidth + '&filter[where][noofups]=' + this.material.noofups).subscribe((resp: any) => {
      console.log(resp);
      if (resp.length < 1) {
        this.material.sampleid = this.sampleid;
        this.material.createdby = sessionStorage.getItem('empid');
        this.material.requiredqty = 1000 / this.material.noofups;
        this.api.postdata('SampleWiseMaterialDetails', this.material).subscribe(res => {
          this.response = res;
          console.log(res);
          this.api.showSuccessToast('Offset Sample Material Details Added Successfully ', this.response.message);
          this.material.colorid = '';
          this.material.itemid = '';
          this.material.fullsheetlength = '';
          this.material.fullsheetwidth = '';
          this.material.requiredqty = '';
          this.material.noofups = '';
          this.getMaterialDetailsData();
          this.viewDetail(this.sampleid);
        }, err => {
          this.api.showFailureToast('Error', err.error.message);
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
        .open(new ShowDetail('Offset Sample Technical Details', 'offsetsample', id))
        .onApprove(() => {

        })
        .onDeny(() => {
          console.log();
        });
  }
  updateMaterial() {
    if (!this.sampleid) {
      this.api.showWarningToast(' Sample No.  required', '');
      return ;
    } else if (!this.material.colorid) {
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
    }  else if (!this.material.noofups) {
      this.api.showWarningToast('No of Ups  required', '');
      return ;
    }
    this.api.getdata('SampleWiseMaterialDetails?filter[where][sampleid]=' + this.sampleid + '&filter[where][colorid]=' + this.material.colorid + '&filter[where][itemid]=' + this.material.itemid + '&filter[where][fullsheetlength]=' + this.material.fullsheetlength + '&filter[where][fullsheetwidth]=' + this.material.fullsheetwidth + '&filter[where][noofups]=' + this.material.noofups).subscribe((resp: any) => {
      console.log(resp);
      if (resp.length < 1) {
        this.material.requiredqty = 1000 / this.material.noofups;
        this.sampleMaterial[this.index].id  =  this.material.id;
        this.sampleMaterial[this.index].sampleid  =  this.material.sampleid;
        this.sampleMaterial[this.index].samplecolorname  =  this.material.samplecolorname;
        this.sampleMaterial[this.index].colorid  =  this.material.colorid;
        this.sampleMaterial[this.index].itemid  =  this.material.itemid;
        this.sampleMaterial[this.index].noofups  =  this.material.noofups;
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
          this.material.noofups = '';
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
  mapdata(item) {
    return {
      id : item.id,
      sampleid : item.sampleid,
      samplecolorname : item.samplecolorname,
      colorid : item.colorid,
      itemid : item.itemid,
      noofups : item.noofups,
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
  optionsLookupColor() {
    this.api.getdata('SampleColors?filter[where][sampleid]=' + this.sampleid).subscribe( res => {
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
  // getQuantity() {
  //   this.material.requiredqty = 1000 / this.material.noofups;
  // }
  optionslookupSampleNo(query) {
    const filter: any = {};
    filter['where'] = {};
    filter['order'] = 'sampleid DESC';
    filter['limit'] = 20;
    filter['where']['productcategoryid'] = 5;
    // filter['where']['samplename'] = {};
    // filter['where']['samplename']['like'] = '%25' + query + '%25';
    filter['where']['sampleno'] = {};
    filter['where']['sampleno']['like'] = '%25' + query + '%25';
    this.api.getdata('SampleGeneralSpecs?filter=' + JSON.stringify(filter)).subscribe( (res: any) => {
      this.samplenodata = res;
      // this.offsetsamplename = res.samplename;
      console.log(res);
    }, error1 => {
      // console.log('error1 ', error1);
    });
  }
  optionslookupSampleName(query) {
    const filter: any = {};
    filter['where'] = {};
    filter['order'] = 'sampleid DESC';
    filter['limit'] = 20;
    filter['where']['productcategoryid'] = 5;
    // filter['where']['samplename'] = {};
    // filter['where']['samplename']['like'] = '%25' + query + '%25';
    filter['where']['samplename'] = {};
    filter['where']['samplename']['like'] = '%25' + query + '%25';
    this.api.getdata('SampleGeneralSpecs?filter=' + JSON.stringify(filter)).subscribe( (res: any) => {
      this.samplenodata = res;
      // this.offsetsamplename = res.samplename;
      console.log(res);
    }, error1 => {
      // console.log('error1 ', error1);
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
    // this.getCutFold();
    this.optionsLookupSample();
    this.optionslookupSampleNo('o');
  }

}
