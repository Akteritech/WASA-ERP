import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { SamplePartWise } from 'src/app/masters/components/sample-part-wises/add-sample-part-wise/add-sample-part-wise.component';
import { SampleColor } from 'src/app/masters/components/sample-colors/add-sample-color/add-sample-color.component';
import { ConfirmModal } from 'src/app/templates/confirm-modal/confirm-modal.component';
import { NgForm } from '@angular/forms';
import { SampleWiseKeyEntryField, Sample } from 'src/app/woven/models/sample';
import { NavigationEnd, ActivatedRoute, Router } from '@angular/router';
import { MaterialDetails } from 'src/app/offset/models/material-details';
import { WovenDetails } from 'src/app/woven/models/woven-details';
import { ApiService } from 'src/app/api.service';
import { SuiModalService } from 'ng2-semantic-ui';
declare var $: any;
@Component({
  selector: 'app-add-pfl-technical-details',
  templateUrl: './add-pfl-technical-details.component.html',
  styleUrls: ['./add-pfl-technical-details.component.css']
})
export class AddPflTechnicalDetailsComponent implements OnInit {

  allItems: any;
  wovenDetail: any;
  samples: any;
  editWovenId: any;
  suppliers: any;
  editId: any;
  @Output() added = new EventEmitter<boolean>();
  @Input() id: number;
  items: any;
  sampleid: any;
  response: any;
  SampleWiseKeyEntryField: any;
  colors: any;
  yarn: any;
  collapse = false;
  collapse1 = false;
  collapse2 = false;
  collapse3 = false;
  collapse4 = false;
  sampleColorData: any;
  currentRoute: any;
  color: any;
  lovPartNo: any;
  partsNo: any;
  Mysampleno: any;
  part: any;
  material: any;
  materialData: any;
  SamplePartWiseData: any;
  MySampleLengthIS: any;
  keyEntryFields: any;
  sampleMaterial: any;
  partID1: any;
  response1: any;
  itemcode: any;
  cutfoldinfo: any;
  colorName: any;
  form: NgForm;
   technical: any;
  sampleTechnicalData: any;
   cutfoldinfos: any;
  samplenodata: any;
   materialid: any;
   wovenid: any;
  colore: any;
  materialcolor: any;
   samplecolor: any;
  constructor(public api: ApiService , public modalService: SuiModalService , private route: ActivatedRoute, private router: Router) {
    this.wovenDetail = {};
    this.SampleWiseKeyEntryField = new SampleWiseKeyEntryField();
    this.sampleid = new Sample();
    this.allItems = [];
    this.part = new SamplePartWise();
    this.color = new SampleColor();
    this.material = new MaterialDetails();
    this.materialData = [];
    this.keyEntryFields = [];
this.wovenDetail.cutfold = this.api.foldtype[0].value;
    this.route.params.subscribe(param => {
      if (param.id) {
        this.editId = param.id;
        // this.getSampleMAterial(param.id);
        this.getSampleMAterials(param.id);
        // this.getSamplepartWise(param.id);
        // this.getSamplecolor(param.id);
        // this.getSampleTechnical(param.id);
        this.getSampleTechnicals(param.id);
        this.getMaterialColor(param.id);
        this.getRequiredQty(param.id);
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
    filter['where']['productcategoryid'] = 2;
    // filter['where']['samplename'] = {};
    // filter['where']['samplename']['like'] = '%25' + query + '%25';
     filter['where']['sampleno'] = {};
    filter['where']['sampleno']['like'] = '%25' + query + '%25';
    this.api.getdata('SampleGeneralSpecs?filter=' + JSON.stringify(filter)).subscribe( (res: any) => {
      this.samplenodata = res;
      console.log(res);
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
  getRequiredQty(id) {
    if (!id) { return; }
    this.api.getdata('SampleGeneralSpecs?filter[where][sampleid]=' + id).subscribe((res: any) => {
      if (res.length !== 0) {
      this.material.requiredqty = res[0].length;
      this.material.width = res[0].width;
      }
      // console.log(this.material.colorid);
          });
  }
  optionsLookupColor(query) {
    this.api.getdata('SampleColors?filter={"limit":10,"where":{"samplecolorname":{"like":"%25' + query + '%25"}}}').subscribe( res => {
      this.colors = res;
      this.material.colorid = res[0].samplecolorid;
    }, error1 => {
      console.log('error1 ', error1);
    });
  }
  optionsLookupItem() {
    this.api.getdata('SampleWiseMaterialDetails/getRawMaterialForPFL').subscribe( res => {
      this.items = res;
      console.log(res);
    }, error1 => {
      console.log('error1 ', error1);
    });
  }

  // updateKeyEntryFields() {
  //   if (!this.sampleid) {
  //     this.api.showWarningToast('Sample Not Selected', 'Please select the sample first.');
  //     return;
  //   }
  //   if (this.keyEntryFields.length < 1) {
  //     this.api.showWarningToast('Key Entry Fields not added', 'Please add atleast one row.');
  //     return;
  //   }
  //   this.keyEntryFields.forEach( item => {
  //     this.api.patchdata('SampleWiseKeyEntryFields', item).subscribe(res => {
  //       this.response = res;
  //       this.api.showSuccessToast('Key Entry Details Updated Successfully ', this.response.message);
  //       this.keyEntryFields = [];
  //     }, err => {
  //       this.api.showFailureToast('Error', err.message);
  //       console.log(err);
  //     });

  //   });
  // }
  // deleteKeyEntry(id, i) {
  //   if (id) {
  //     this.modalService
  //       .open(new ConfirmModal('Delete this yarn', 'Are you sure to delete ?', 'mini'))
  //       .onApprove(() => {
  //         this.api.deletedata('SampleWiseKeyEntryFields', id).subscribe((res: any) => {
  //           this.response = res;
  //           this.api.showDeleteToast('Deleted', this.response.message);
  //           this.keyEntryFields.splice(i, 1);
  //         }, err => {
  //           console.log(err);
  //         });
  //       })
  //       .onDeny(() => {
  //         console.log('Deny');
  //       });
  //   } else {
  //     this.keyEntryFields.splice(i, 1);
  //   }
  // }
  // deleteAllKeyEntry() {
  //   this.modalService
  //     .open(new ConfirmModal('Delete All', 'Are you sure to delete all ?', 'mini'))
  //     .onApprove(() => {
  //       // this.offer.offertermDetails = [];
  //       this.keyEntryFields = [];
  //       this.api.showDeleteToast('Deleted All', '');
  //       // console.log('Empty :- ', this.offer.offertermDetails);
  //     })
  //     .onDeny(() => {
  //       console.log('Deny');
  //     });
  // }
  // addKeyDetails() {
  //   if (!this.sampleid) {
  //     this.api.showWarningToast('Sample Not Selected', 'Please select the sample first.');
  //     return;
  //   }
  //   if (this.SampleWiseKeyEntryField.keyentry1) {
  //     this.SampleWiseKeyEntryField.sampleid = this.sampleid;
  //     this.keyEntryFields.push(this.SampleWiseKeyEntryField);
  //     this.SampleWiseKeyEntryField = new SampleWiseKeyEntryField();
  //     console.log(this.keyEntryFields);
  //   }  else if (!this.SampleWiseKeyEntryField) {
  //     this.api.showWarningToast('Form Empty', 'Fill all details first');
  //     console.log(this.SampleWiseKeyEntryField);
  //   } else if (this.SampleWiseKeyEntryField.keyentry10  <= 0) {
  //     this.formValidation();
  //     this.api.showWarningToast('Quantity should not be negative', '');
  //     return;
  //   }

  //   // this.disabled = true;
  // }
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
getSampleTechnicals(id) {
  if (!id) { return; }
  this.api.getdata('WovenCommonDetails?filter[where][sampleid]=' + id + '&filter[include]=sample').subscribe((res: any) => {
    if (res.length !== 0) {
      this.wovenDetail = res[0];
      this.wovenid = res[0].wovencommondetailsid;
    }
    console.log(res);
  }, err => {
    console.log(err);
  });
}
getMaterialColor(id) {
  if (!id) { return; }
  this.api.getdata('SampleColors?filter[where][sampleid]=' + id + '&filter[include]=sample').subscribe((res: any) => {
    if (res.length !== 0) {
this.material.colorid = res[0].samplecolorid;
 this.samplecolor = res[0].samplecolorname;
console.log(res[0].samplecolorid);
    this.materialcolor = res;
    console.log(this.materialcolor);
    }
// console.log(this.material.colorid);
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
  // optionsLookupColor(query) {
  //   this.api.getdata('SampleColors?filter={"limit":10,"where":{"samplecolorname":{"like":"%25' + query + '%25"}}}').subscribe( res => {
  //     this.colors = res;
  //   }, error1 => {
  //     console.log('error1 ', error1);
  //   });
  // }
saveSampleTechnical() {
  if (!this.sampleid) {
    this.api.showWarningToast('Sample No. is required', '');
    return;
  }
    this.api.getdata('WovenCommonDetails?filter[where][sampleid]=' + this.sampleid).subscribe((resp: any) =>{
      console.log(resp);
      if (resp.length < 1) {
        this.wovenDetail.sampleid = this.sampleid;
        this.wovenDetail.createdby = sessionStorage.getItem('empid');
        this.api.patchdata('WovenCommonDetails' , this.wovenDetail).subscribe(res => {
          this.response = res;
          this.api.showSuccessToast('Sample Technical Details Added Successfully ', this.response.message);
          this.wovenDetail.cutfoldinfo = '';
          this.getSampleTechnicalData();
        }, err => {
          this.api.showFailureToast('Error', err.message);
          console.log(err);
        });

      } else {
        this.api.showWarningToast('Sample Technical Details Already Exist ');

      }
    });
}
updateSampleTechnical() {
  if (!this.sampleid) {
    this.api.showWarningToast('Sample No. is required', '');
    return;
  }
  this.wovenDetail.sampleid = this.sampleid;
  this.wovenDetail.wovencommondetailsid = this.wovenid;
  // console.log(this.wovenid);
  this.api.patchdata('WovenCommonDetails', this.mapdata(this.wovenDetail)).subscribe(res => {
    this.response = res;
    this.api.showSuccessToast('Sample Technical Details Updated Successfully ', this.response.message);
    this.wovenDetail.cutfoldinfo = '';
    this.getSampleTechnicalData();
  }, err => {
    this.api.showFailureToast('Error', err.message);
    console.log(err);
  });
}
  mapdata(item) {
    return {
      wovencommondetailsid : item.wovencommondetailsid,
      sampleid : item.sampleid,
      cutfoldinfo : item.cutfoldinfo,
    };
  }
  getSamplecolor(id) {
    this.api.getdata('samplecolors?filter[where][sampleid]=' + id + '&filter[include]=sample').subscribe(res => {
      this.sampleColorData = res;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  getSamplecolorData() {
    this.api.getdata('samplecolors?filter[where][sampleid]=' + this.sampleid + '&filter[include]=sample').subscribe(res => {
      this.sampleColorData = res;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  saveSampleColor() {
    this.color.sampleid = this.sampleid;
    this.api.patchdata('SampleColors', this.color).subscribe(res => {
      this.response = res;
      this.api.showSuccessToast('Sample Color Successfully Added', this.response.message);
      this.getSamplecolorData();
    }, err => {
      this.api.showFailureToast('Error', err.message);
      console.log(err);
    });
  }
  getSamplepartWise(id) {
    this.api.getdata('SampleWisePartsLengths?filter[where][sampleid]=' + id + '&filter[include]=sample&filter[include]=lov').subscribe(res => {
      this.SamplePartWiseData = res;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  getSamplepartWiseData() {
    this.api.getdata('SampleWisePartsLengths?filter[where][sampleid]=' + this.sampleid + '&filter[include]=sample&filter[include]=lov').subscribe(res => {
      this.SamplePartWiseData = res;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  saveSamplePArtWise() {
    this.part.sampleid = this.sampleid;
    this.api.patchdata('SampleWisePartsLengths', this.part).subscribe(res => {
      this.response = res;
      console.log(res);
      this.api.showSuccessToast('Sample Part Wise Successfully Added', this.response.message);
      this.getSamplepartWiseData();
    }, err => {
      this.api.showFailureToast('Error', err.message);
      console.log(err);
    });
  }
  getSampleMAterial(id) {
    if (!id) { return; }
    this.api.getdata('SampleWiseMaterialDetails?filter[where][sampleid]=' + id +
        '&filter[include]=color&filter[include]=item&filter[include]=sample').subscribe((res: any) => {
      this.sampleMaterial = res;
          console.log(res);
        }, err => {
      console.log(err);
    });
  }
  getSampleMAterials(id) {
    if (!id) { return; }
    this.api.getdata('SampleWiseMaterialDetails?filter[where][sampleid]=' + id +
        '&filter[include]=color&filter[include]=item&filter[include]=sample').subscribe((res: any) => {
      if (res.length !== 0) {
        this.material = res[0];
        this.materialid = res[0].id;
        // this.material.colorid = res[0].color.samplecolorname;

      }
          console.log(res);
        }, err => {
      console.log(err);
    });
  }
    getSampleMAterialData() {
    this.api.getdata('SampleWiseMaterialDetails?filter[where][sampleid]=' + this.sampleid +
        '&filter[include]=color&filter[include]=item&filter[include]=sample').subscribe((res: any) => {
      this.sampleMaterial = res;
          console.log(res);
        }, err => {
      console.log(err);
    });
  }
  // getKeyEntry(id) {
  //   if (!id) { return; }
  //   this.api.getdata('SampleWiseKeyEntryFields?filter[where][sampleid]=' + id).subscribe(res => {
  //     this.keyEntryFields = res;
  //     // console.log(this.keyEntryFields[0].sampleid + 'KEY DATA');
  //   }, err => {
  //     console.log(err);
  //   });
  // }
  // getKeyEntryData() {
  //   this.api.getdata('SampleWiseKeyEntryFields?filter[where][sampleid]=' + this.sampleid).subscribe(res => {
  //     this.keyEntryFields = res;
  //     console.log(res);
  //   }, err => {
  //     console.log(err);
  //   });
  // }
  // saveKeyEntryFields(form: NgForm) {
  //   this.SampleWiseKeyEntryField.sampleid = this.sampleid;
  //   this.api.patchdata('SampleWiseKeyEntryFields', this.SampleWiseKeyEntryField).subscribe(res => {
  //     this.response = res;
  //     console.log(res);
  //     this.api.showSuccessToast('Key Entry Details Successfully Added', this.response.message);
  //     this.getKeyEntryData();
  //   }, err => {
  //     this.api.showFailureToast('Error', err.message);
  //     console.log(err);
  //   });
  // }
  updateYarn() {
    if (!this.sampleid) {
      this.api.showWarningToast('Sample Not Selected', 'Please select the sample first.');
      return;
    }
    if (this.sampleColorData.length < 1) {
      this.api.showWarningToast('Sample Color not added', 'Please add atleast one row.');
      return;
    }
    this.sampleColorData.forEach( item => {
      this.color.sampleid = this.sampleid;
      this.api.putdata('sampleColors', item).subscribe(res => {
        this.response = res;
        console.log(res);
        this.api.showSuccessToast('Sample Colors Details Updated Successfully ', this.response.message);
        this.sampleColorData = [];
      }, err => {
        this.api.showFailureToast('Error', err.message);
        console.log(err);
      });
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
  deletePartData(id, i) {
    if (id) {
      this.modalService
        .open(new ConfirmModal('Delete this Part No.', 'Are you sure to delete ?', 'mini'))
        .onApprove(() => {
          this.api.deletedata('SampleWisePartsLengths', id).subscribe((res: any) => {
            this.response = res;
            this.api.showDeleteToast('Deleted', this.response.message);
            this.SamplePartWiseData.splice(i, 1);
          }, err => {
            console.log(err);
          });
        })
        .onDeny(() => {
          console.log('Deny');
        });
    } else {
      this.SamplePartWiseData.splice(i, 1);
    }
  }
  deleteMaterialData(id, i) {
    if (id) {
      this.modalService
          .open(new ConfirmModal('Delete this yarn', 'Are you sure to delete ?', 'mini'))
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
  // deleteYarn(id, i) {
  //   if (id) {
  //     this.modalService
  //         .open(new ConfirmModal('Delete this yarn', 'Are you sure to delete ?', 'mini'))
  //         .onApprove(() => {
  //           this.api.deletedata('WovenYarnDetails', id).subscribe((res: any) => {
  //             this.response = res;
  //             this.api.showDeleteToast('Deleted', this.response.message);
  //             this.WovenYarnDetails.splice(i, 1);
  //           }, err => {
  //             console.log(err);
  //           });
  //         })
  //         .onDeny(() => {
  //           console.log('Deny');
  //         });
  //   } else {
  //     this.WovenYarnDetails.splice(i, 1);
  //   }
  // }
  Updatepatch() {
    this.sampleMaterial.forEach( item => {
      this.material.sampleid = this.sampleid;
      this.api.patchdata('SampleWiseMaterialDetails', item).subscribe(res => {
        this.response = res;
        console.log(res);
        this.sampleMaterial = [];
        this.api.showSuccessToast('Sample Part Wise Successfully Updated', this.response.message);
      }, err => {
        this.api.showFailureToast('Error', err.message);
        console.log(err);
      });
    });
  }
  saveSampleMAterial() {
    if (!this.sampleid) {
      this.api.showWarningToast('Sample No. is required', '');
      return;
    }
    if (!this.material.itemid) {
      this.formValidation();
      this.api.showWarningToast('material name is required', '');
      return;
    }
    if (!this.material.requiredqty) {
      this.formValidation();
      this.api.showWarningToast('required qty is required', '');
      return;
    }
    this.api.getdata('SampleWiseMaterialDetails?filter[where][sampleid]=' +  this.sampleid).subscribe((resp: any) => {
      console.log(resp);
      if (resp.length < 1) {
        this.material.sampleid = this.sampleid;
        // this.material.colorid = this.materialcolor.samplecolorid;
        this.material.createdby = sessionStorage.getItem('empid');
        this.api.patchdata('SampleWiseMaterialDetails', this.material).subscribe(res => {
          this.response = res;
          console.log(res);
          this.api.showSuccessToast('Sample Material Details Added Successfully', this.response.message);
          this.material.colorid = '';
          this.material.itemid = '';
          this.material.requiredqty = '';
          this.material.curingtime = '';
          this.material.curingtemperature = '';
          this.getSampleMAterialData();
        }, err => {
          this.api.showFailureToast('Error', err.message);
          console.log(err);
        });
      } else  {
        this.api.showWarningToast('Sample Material Details Already Exist');
      }
    });

  }
  updateSampleMAterial() {
    if (!this.sampleid) {
      this.api.showWarningToast('Sample No. is required', '');
      return;
    }
    if (!this.material.itemid) {
      this.formValidation();
      this.api.showWarningToast('material name is required', '');
      return;
    }
    if (!this.material.requiredqty) {
      this.formValidation();
      this.api.showWarningToast('required qty is required', '');
      return;
    }
    // this.api.getdata('SampleWiseMaterialDetails?filter[where][sampleid]=' +  this.sampleid).subscribe((resp: any) => {
    //   console.log(resp);
      // if (resp.length < 1) {
        this.material.id = this.materialid;
        this.material.sampleid = this.sampleid;
        this.api.patchdata('SampleWiseMaterialDetails', this.mapDataMaterial(this.material)).subscribe(res => {
          this.response = res;
          console.log(res);
          this.api.showSuccessToast('Sample Material Details Updated Successfully', this.response.message);
          this.material.colorid = '';
          this.material.itemid = '';
          this.material.requiredqty = '';
          this.material.curingtime = '';
          this.material.curingtemperature = '';
          this.getSampleMAterialData();
          this.router.navigateByUrl('/pfl-technical-details');
        }, err => {
          this.api.showFailureToast('Error', err.message);
          console.log(err);
        });
      // } else  {
      //   this.api.showWarningToast('Sample Material Details Already Exist');
      // }
    // });

  }
  mapDataMaterial(element) {
    return {
      id : element.id,
      sampleid : element.sampleid,
      colorid : element.colorid,
      itemid : element.itemid,
      requiredqty : element.requiredqty,
      curingtime : element.curingtime,
      curingtemperature : element.curingtemperature
    };
  }
  addSamplePartWiseDetails() {
    this.part.sampleid = this.sampleid;
    this.Mylength();
    this.SamplePartWiseData.push(this.part);
    this.part = new SamplePartWise();
    this.part.length = this.samples[0].length;
    this.part.width = this.samples[0].width;
    setTimeout( () => {
      this.api.getdata('SampleGeneralSpecs?filter[where][sampleid]=' + this.sampleid).subscribe((res: any) => {
        this.Mysampleno = res[0];
      }, err => {
        console.log(err);
      });
    }, 1000);
  }

  addSampleColorDetails() {
    this.color.sampleid = this.sampleid;
    this.sampleColorData.push(this.color);
    console.log(this.sampleColorData);
    setTimeout( () => {
      this.api.getdata('SampleGeneralSpecs?filter[where][sampleid]=' + this.sampleid).subscribe((res: any) => {
        this.Mysampleno = res[0];
      }, err => {
        console.log(err);
      });
    }, 1000);
    this.color = new SampleColor();
  }


  getPartNo() {

    this.api.getdata('lovData?filter[where][lovtype]=samplePartNo').subscribe(res => {
      this.partsNo = res;

      // this.added.emit(true);
    }, err => {
      console.log(err);
    });
  }
  Mylength() {
    this.api.getdata('lovData?filter[where][id]=' + this.part.partnoid).subscribe((res: any) => {
      this.lovPartNo = res[0].listitem;
      this.api.getdata('SampleGeneralSpecs?filter[where][sampleid]=' + this.sampleid).subscribe((data: any ) => {
        this.MySampleLengthIS = data[0].length;
      }, error1 => {
        console.log(error1);
      });
      setTimeout( () => {
        this.part.length = (this.MySampleLengthIS * this.lovPartNo);
      }, 500);
    }, err => {
      console.log(err);
    });
  }
  optionsLookupSample() {
    if (!this.editId) {
      this.api.getdata('SampleGeneralSpecs?filter[order]=sampleid ' +
          'DESC&filter[where][productcategoryid]=2&filter[limit]=1').subscribe((res: any) => {
        this.samples = res;
        this.sampleid = res[0].sampleid;
        this.part.length = res[0].length;
        this.part.width = res[0].width;
        // this.material.requiredqty = res[0].length;
        console.log(this.part.length + '' + this.part.width);
      });
    } else {
      this.api.getdata('SampleGeneralSpecs/' + this.editId).subscribe((res: any) => {
        this.samples = [res];
        this.sampleid = res.sampleid;

      });
    }
  }
  toggleCollapse() {
    this.collapse = !this.collapse;
    this.collapse1 = !this.collapse1;
    this.collapse3 = !this.collapse3;
    this.collapse4 = !this.collapse4;


  }
  toggleCollapse1() {
    this.collapse1 = !this.collapse1;

  } toggleCollapse2() {
    this.collapse2 = !this.collapse2;

  }
  toggleCollapse3() {
    this.collapse3 = !this.collapse3;

  }
  toggleCollapse4() {
    this.collapse4 = !this.collapse4;
  }

  updateSelection (domName, selectionText) {
    document.getElementsByName(domName)[0].firstChild['value'] = selectionText;
    document.getElementsByName(domName)[0].childNodes[2]['innerHTML'] = '';
  }
  ngOnInit() {
    this.getPartNo();
    this.optionsLookupSample();
    this.getCutFold();
    this.optionsLookupColor('w');
    this.optionsLookupItem();
    this.optionslookupSampleNo('p');
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

}
