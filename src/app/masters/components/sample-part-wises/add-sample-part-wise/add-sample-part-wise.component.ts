import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {SampleColor} from '../../sample-colors/add-sample-color/add-sample-color.component';
import {NgForm} from '@angular/forms';
import {ApiService} from '../../../../api.service';
import {Sample} from '../../../../woven/models/sample';
export class SamplePartWise {
 partsid:any;
  sampleid: any;
  length: any;
  width: any;
  partnoid: any;
  creationdate: any;
  createdby: number;
   constructor() {
     this.sampleid = 0;
     this.length = 0;
     this.width = 0;
     this.partnoid = 0;
     this.createdby = 0;
     this.creationdate = new Date();
   }
}
@Component({
  selector: 'app-add-sample-part-wise',
  templateUrl: './add-sample-part-wise.component.html',
  styleUrls: ['./add-sample-part-wise.component.css']
})
export class AddSamplePartWiseComponent implements OnInit {

  partsNo: any;
  color: any;
  samples: any;
  mysamplelength: any;
  MySampleLengthIS: any;
  response: any;
  currentRoute: any;
  lovPartNo: any;
  @Output() added = new EventEmitter<boolean>();
  @Input() id: number;
   PARTSID: any;
   partsNoValue: any;
   selectSample: any;
  constructor(public api: ApiService , private route: ActivatedRoute, private router: Router) {
    this.color = new SamplePartWise();
    this.selectSample = new Sample();
    this.route.params.subscribe( params => {
      if (params.id) {
        this.getSamplepartWise(params.id);
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
  getSamplepartWise(id) {
    this.api.getdata('SampleWisePartsLengths/' + id).subscribe(res => {
      this.color = res;
      console.log(res);
      // this.added.emit(true);
    }, err => {
      console.log(err);
    });
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
    this.api.getdata('lovData?filter[where][id]=' + this.color.partnoid).subscribe((res: any) => {
      this.lovPartNo = res[0].listitem;
      this.api.getdata('SampleGeneralSpecs?filter[where][sampleid]=' + this.color.sampleid).subscribe((data: any ) => {
        this.MySampleLengthIS = data[0].length;
      }, error1 => {
        console.log(error1);
      });
      setTimeout( () => {
        this.color.length = (this.MySampleLengthIS * this.lovPartNo);
      }, 500);
      }, err => {
        console.log(err);
      });
  }
  optionsLookupSamples(query) {
    const filter: any = {};
    filter['where'] = {};
    filter['order'] = 'sampleid DESC';
    filter['limit'] = 10;
    filter['where']['samplename'] = {};
    filter['where']['samplename']['like'] = '%25' + query + '%25';
    this.api.getdata('SampleGeneralSpecs?filter=' + JSON.stringify(filter)).subscribe( (res: any) => {
      this.samples = res;
    }, error1 => {
      console.log('error1 ', error1);
    });
  }
  getLengthWidth() {
    this.api.getdata('SampleGeneralSpecs?filter[where][sampleid]=' + this.color.sampleid).subscribe((res: any) => {
      this.color.length = res[0].length;
      this.color.width = res[0].width;
      this.mysamplelength = res[0].length;
      this.Mylength();
    }, error2 => {
      console.log(error2);
    });
  }
  getParts() {
    this.api.getdata('SampleWisePartsLengths?filter[where][sampleid]=' + this.selectSample.sampleid).subscribe((res: any) => {
      this.partsNo = res[0].partnoid;
      this.api.getdata('lovData?filter[where][id]=' + this.partsNo).subscribe( (res1: any) => {
        this.partsNoValue = res1;
        this.PARTSID = res1[0].listitem;
      }, error1 => {
        // console.log(error1);
      });
      console.log(res);
    }, error2 => {
      // console.log(error2);
    });
  }
  patch(form: NgForm) {
    if (!this.color.sampleid) {
      this.api.showWarningToast('Sample Name must be selected', '');
      return ;
    } else if (!this.color.length) {
      this.api.showWarningToast('Length required', '');
      return;
    } else if (!this.color.width) {
      this.api.showWarningToast('Width required', '');
      return;
    } else if (!this.color.partnoid) {
      this.api.showWarningToast('Part No must be selected', '');
      return;
    }
    this.api.getdata(`SampleWisePartsLengths?filter[where][sampleid]=${this.color.sampleid}&filter[where][partnoid]=${this.color.partnoid}`).subscribe((res1: any) => {
      if (res1.length < 1) {
        this.api.patchdata('SampleWisePartsLengths', this.color).subscribe(res => {
          this.response = res;
          this.api.showSuccessToast('Success', this.response.message);
          this.added.emit(true);
        }, err => {
          this.api.showFailureToast('Error', err.message);
          console.log(err);
        });
      }
      else {
        this.api.showWarningToast('Already exists', ' Part No. already exists on this sample name');
      }
    }, err => {
      console.log(err);
    });
  }
  Update(form: NgForm) {

        this.api.patchdata('SampleWisePartsLengths', this.color).subscribe(res => {
          this.response = res;
          this.api.showSuccessToast('Success', this.response.message);
          this.added.emit(true);
        }, err => {
          this.api.showFailureToast('Error', err.message);
          console.log(err);
        });
  }
  ngOnInit() {
    if (this.id) {
      this.getSamplepartWise(this.id);
    }
    if (this.color.partnoid) {
      this.getPartNo();
    }
    this.getPartNo();
    this.optionsLookupSamples('a');
  }

}
