import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {SuiModalService} from 'ng2-semantic-ui';
import {ApiService} from '../../../../api.service';
import {NgForm} from '@angular/forms';
import {MaterialDetails} from '../../../models/material-details';
import {Yarn} from '../../../../woven/models/woven-details';
import {ConfirmModal} from '../../../../templates/confirm-modal/confirm-modal.component';
import {AddHeattransferSampleComponent} from '../../heattransfer-sample/add-heattransfer-sample/add-heattransfer-sample.component';
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
  collapse = false;
  collapse1 = false;
  currentRoute: any;
  @Output() added = new EventEmitter<boolean>();
  @Input() id: number;
  quiredqtyper: any;
  materialData: any;
  sampleMaterial: any;
  sampleColorData: any;
  response: any;
  itemcode: any;
  colorName: any;
  samplenodata: any;
   index: any;
   colorId: any;
  constructor(public api: ApiService , public modalService: SuiModalService , private route: ActivatedRoute, private router: Router) {
    this.material = new MaterialDetails();
    // this.color = new AddHeattransferSampleComponent();
    this.materialData = [];
    this.route.params.subscribe(param => {
      if (param.id) {
        this.editId = param.id;
        this.getSamplecolor(param.id);
        // this.getMaterialDetails(param.id);
        this.getSampleMAterial(param.id);
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
  optionslookupSampleNo(query) {
    const filter: any = {};
    filter['where'] = {};
    filter['order'] = 'sampleid DESC';
    filter['limit'] = 20;
    filter['where']['productcategoryid'] = 3;
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
  getSamplecolorData() {
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
      this.colorId = res[0].samplecolorid;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  getSampleMAterial(id) {
    if (!id) { return; }
    this.api.getdata('SampleWiseMaterialDetails?filter[where][sampleid]=' + id + '&filter[include]=color&filter[include]=item&filter[include]=sample').subscribe((res: any) => {
      this.sampleMaterial = res;
    }, err => {
      console.log(err);
    });
  }
  getSampleMAterialData() {
    this.api.getdata('SampleWiseMaterialDetails?filter[where][sampleid]=' + this.sampleid + '&filter[include]=color&filter[include]=item&filter[include]=sample').subscribe((res: any) => {
      this.sampleMaterial = res;
    }, err => {
      console.log(err);
    });
  }
  addSampleMaterialDetails() {
    if (!this.material.itemid) {
      this.api.showWarningToast('Material Name required', '');
      return;
    } else if (!this.material.colorid) {
      this.api.showWarningToast('Color required', '');
      return;
    }

    this.material.sampleid = this.sampleid;
    this.sampleMaterial.push(this.material);
    if (this.quiredqtyper !== 0) {
      this.material = new MaterialDetails();
      this.material.requiredqty = 1000 / this.quiredqtyper;
      console.log(this.material.requiredqty.toFixed(2) + ' no of oops');
    } else {
      this.material = new MaterialDetails();
      this.material.requiredqty = 0;
    }
    console.log(this.sampleMaterial);
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
  optionsLookupSample() {
    if (!this.editId) {
      this.api.getdata('SampleGeneralSpecs?filter[order]=sampleid DESC&filter[where][productcategoryid]=3&filter[limit]=1').subscribe((res: any) => {
        this.samples = res;
        this.sampleid = res[0].sampleid;
        // this.color.getSamplecolor(this.sampleid);
        // this.color.samplecolorname = this.color.sampleColorData[0].samplecolorname;
        // this.color.printcolor = this.color.sampleColorData[0].printcolor;
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
        // this.color.getSamplecolor(this.sampleid);
        // this.color.samplecolorname = this.color.sampleColorData[0].samplecolorname;
        // this.color.printcolor = this.color.sampleColorData[0].printcolor;
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
      this.material.itemid = this.sampleMaterial[this.index].itemid;
      this.material.fullsheetlength = this.sampleMaterial[this.index].fullsheetlength;
      this.material.fullsheetwidth = this.sampleMaterial[this.index].fullsheetwidth;
      // this.material.length = this.sampleMaterial[this.index].length;
      this.material.noofups = this.sampleMaterial[this.index].noofups;
      this.material.requiredqty = this.sampleMaterial[this.index].requiredqty;
      this.material.createddate = this.sampleMaterial[this.index].createddate;
    }
    console.log(this.sampleMaterial);
  }
  updateMaterial() {
    if (!this.sampleid) {
      this.api.showWarningToast('Sample No  required', '');
      return ;
    }  else if (!this.material.itemid) {
      this.api.showWarningToast('material name required', '');
      return ;
    } else if (!this.material.fullsheetlength) {
      this.api.showWarningToast(' fullsheetlength required', '');
      return ;
    } else if (!this.material.fullsheetwidth) {
      this.api.showWarningToast(' fullsheetwidth required', '');
      return ;
    } else if (!this.material.requiredqty) {
      this.api.showWarningToast('Required Qty required', '');
      return;
    }
    this.api.getdata('SampleWiseMaterialDetails?filter[where][sampleid]=' + this.sampleid  + '&filter[where][itemid]=' + this.material.itemid + '&filter[where][fullsheetlength]=' + this.material.fullsheetlength + '&filter[where][fullsheetwidth]=' + this.material.fullsheetlength   + '&filter[where][requiredqty]=' + this.material.requiredqty + '&filter[where][noofups]=' + this.material.noofups).subscribe((resp: any) => {
      console.log(resp);
      if (resp.length < 1) {
        this.sampleMaterial[this.index].id  =  this.material.id;
        this.sampleMaterial[this.index].sampleid  =  this.material.sampleid;
        this.sampleMaterial[this.index].itemid  =  this.material.itemid;
        this.sampleMaterial[this.index].fullsheetlength  =  this.material.fullsheetlength;
        this.sampleMaterial[this.index].fullsheetwidth  =  this.material.fullsheetwidth;
        // this.sampleMaterial[this.index].length  =  this.material.length;
        this.sampleMaterial[this.index].noofups  =  this.material.noofups;
        this.sampleMaterial[this.index].requiredqty  =  this.material.requiredqty;
        this.sampleMaterial[this.index].createddate  =  this.material.createddate;
        this.api.putdata('SampleWiseMaterialDetails', this.mapDataMaterial(this.material)).subscribe(res => {
          this.response = res;
          console.log(res);
          this.api.showSuccessToast('Heat transfer Material Details Updated Successfully ', this.response.message);
          this.material.colorid = '';
          this.material.itemid = '';
          this.material.fullsheetlength = '';
          this.material.fullsheetwidth = '';
          this.material.requiredqty = '';
          this.material.noofups = '';
          // this.getMaterialDetailsData();
          this.router.navigateByUrl('/heat-transfer-technical-details');
        }, err => {
          this.api.showFailureToast('Error', err.message);
          console.log(err);
        });
      } else {
        this.api.showWarningToast('Heat transfer Sample Material Details Already Exist  ');
      }
    });
  }
  mapDataMaterial(item) {
    return {
      id : item.id,
      sampleid : item.sampleid,
      itemid : item.itemid,
      fullsheetlength : item.fullsheetlength,
      fullsheetwidth : item.fullsheetwidth,
      noofups : item.noofups,
      requiredqty : item.requiredqty,
      createddate : item.createddate
    };
  }
  patch() {
    if (!this.sampleid) {
      this.api.showWarningToast('Sample No. required', '');
      return;
    } else if (!this.material.itemid) {
      this.api.showWarningToast('Material Name required', '');
      return;
    } else if (!this.material.fullsheetlength) {
      this.api.showWarningToast('fullsheet length required', '');
      return;
    } else if (!this.material.fullsheetwidth) {
      this.api.showWarningToast('fullsheet width required', '');
      return;
    } else if (!this.material.noofups) {
      this.api.showWarningToast('no of ups required', '');
      return;
    } else if (!this.material.requiredqty) {
      this.api.showWarningToast('Required Qty required', '');
      return;
    }
    this.api.getdata('SampleWiseMaterialDetails?filter[where][sampleid]=' + this.sampleid + '&filter[where][itemid]=' + this.material.itemid + '&filter[where][fullsheetlength]=' + this.material.fullsheetlength + '&filter[where][fullsheetwidth]=' + this.material.fullsheetlength  + '&filter[where][requiredqty]=' + this.material.requiredqty + '&filter[where][noofups]=' + this.material.noofups).subscribe((resp: any) => {
      console.log(resp);
      if (resp.length < 1) {
        this.material.sampleid = this.sampleid;
        this.material.colorid = this.colorId;
        this.material.createdby = sessionStorage.getItem('empid');
        this.api.patchdata('SampleWiseMaterialDetails', this.material).subscribe(res => {
          this.response = res;
          console.log(res);
          this.api.showSuccessToast('Heat Transfer Sample Material Details Added Successfully ', this.response.message);
          this.material.itemid = '';
          this.material.fullsheetlength = '';
          this.material.fullsheetwidth = '';
          this.material.noofups = '';
          this.material.requiredqty = '';
          this.getSampleMAterialData();
        }, err => {
          this.api.showFailureToast('Error', err.message);
          console.log(err);
        });
      } else {
        this.api.showWarningToast('Heat Transfer Sample Material Detail already exist ');

      }
    });
    // this.api.getdata('SampleWiseMaterialDetails')

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
  // formValidation() {
  //   $('.ui.form')
  //     .form({
  //       length: {
  //         identifier: 'length',
  //         rules: [
  //           {
  //             type: 'decimal[0...]',
  //             prompt: 'please enter a valid value'
  //           }
  //         ]
  //       },
  //       width: {
  //         identifier: 'width',
  //         rules: [
  //           {
  //             type: 'decimal[0...]',
  //             prompt: 'please enter a valid value'
  //           }
  //         ]
  //       },
  //       qty: {
  //         identifier: 'qty',
  //         rules: [
  //           {
  //             type: 'decimal[0...]',
  //             prompt: 'please enter a valid value'
  //           }
  //         ]
  //       },
  //     }, {
  //       on: 'blur',
  //       inline: 'true'
  //     });
  // }
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

  }
  toggleCollapse1() {
    this.collapse1 = !this.collapse1;

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
    this.optionsLookupItem('a');
    this.optionslookupSampleNo('h');
    this.optionsLookupColor('a');
    this.optionsLookupSample();
    // this.getMaterialDetails(this.editId);
  }

}
