import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from '../../../../api.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {DatePipe, Location} from '@angular/common';
export class SampleColor {
  samplecolorid: any;
  sampleid: any;
  samplecolorname: any;
  printcolor: any;
  statusid: any;
  createddate: any;
   createdby: number;
  constructor() {
    this.sampleid = 0;
    this.statusid = 0;
    this.samplecolorname = '';
    this.printcolor = '';
    this.createddate = Date.now() + 6 * 3600 * 1000;
    this.createdby = 0;
  }

}
@Component({
  selector: 'app-add-sample-color',
  templateUrl: './add-sample-color.component.html',
  styleUrls: ['./add-sample-color.component.css'],
  providers: [DatePipe]
})
export class AddSampleColorComponent implements OnInit {
  color: any;
  samples: any;
  response: any;
  currentRoute: any;
  @Output() added = new EventEmitter<boolean>();
  @Input() id: number;
  constructor(private _location: Location, public api: ApiService , private route: ActivatedRoute, private router: Router , public datepipe: DatePipe) {
    this.color = new SampleColor();
    this.route.params.subscribe( params => {
      if (params.id) {
        this.getSamplecolor(params.id);
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
  getSamplecolor(id) {
    this.api.getdata('samplecolors/' + id).subscribe(res => {
      this.color = res;
      // this.added.emit(true);
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
  patch(form: NgForm) {
    if (!this.color.sampleid) {
      this.api.showWarningToast('Sample Name must be selected', '');
      return ;
    } else if (!this.color.samplecolorname) {
      this.api.showWarningToast('Sample Color required', '');
      return;
    }
    // this.api.getdata(`SampleColors?filter[where][sampleid]=${this.color.sampleid}&filter[where][partnoid]=${this.color.partnoid}`).subscribe((res1: any) => {
    //   if (res1.length < 1) {
    this.color.statusid =0;
        this.api.patchdata('SampleColors', this.color).subscribe(res => {
          this.response = res;
          this.api.showSuccessToast('Success', this.response.message);
          this.added.emit(true);
        }, err => {
          this.api.showFailureToast('Error', err.message);
          console.log(err);
        });
      // }
      // else {
      //     this.api.showWarningToast('Already exists', ' Sample color already exists on this sample name');
      //   }
      // }, err => {
      //   console.log(err);
      // });
  }
  UpdateDaTa(form: NgForm) {
    this.color.statusid =0;
    this.api.patchdata('SampleColors', this.color).subscribe(res => {
      this.response = res;
      this.api.showSuccessToast('Success', this.response.message);
      this.added.emit(true);
    }, err => {
      this.api.showFailureToast('Error', err.message);
      console.log(err);
    });
  }
  backClicked() {
    this._location.back();
  }
  ngOnInit() {
    if (this.id) {
      this.getSamplecolor(this.id);
    }
    this.optionsLookupSamples('a')
  }

}
