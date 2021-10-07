import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from '../../api.service';
import {ActivatedRoute} from '@angular/router';
import {ShowDetailComponent} from '../../templates/show-detail/show-detail.component';
import * as fs from 'file-saver';

@Component({
  selector: 'app-show-sample-for-all-category',
  templateUrl: './show-sample-for-all-category.component.html',
  styleUrls: ['./show-sample-for-all-category.component.css']
})
export class ShowSampleForAllCategoryComponent implements OnInit {
  sample: any;
  wovenDetail: any;
  yarnDetails: any;
  entryfield: any;
  sampleid = 0;
  work: any;
  colors: any;
  @Input() id: number;
  @Output() printJs = new EventEmitter<boolean>();
  MyDataFile: any;
  constructor(public api: ApiService, private route: ActivatedRoute , public showDetail: ShowDetailComponent) { }

  get(id) {
    this.api.getdata(`SampleGeneralSpecs/${id}?filter[include]=brand&filter[include]=client&filter` +
    `[include]=company&filter[include]=productCategory&filter[include]=productSubCategory&filter` +
    `[include]=salesPerson&filter[include]=NPDExecutive&filter[include]=designer&filter` +
    `[include]=status&filter[include]=program`).subscribe((res: any) => {
      // if(res.approveldate.includes('1900')) res.approveldate = '';
      this.sample = res;
      console.log(res);

    }, error => {
      console.log(error);
    });
  }
  getWovenCommonDetails(id) {
    this.api.getdata('WovenCommonDetails?filter[where][sampleid]=' + id).subscribe(res => {
      this.wovenDetail = res[0];
      console.log(res);
    }, error => {
      console.log(error);
    });
  }
  downloadPDF() {
    this.api.getdata('FileUp').subscribe( (data: any) => {
      this.MyDataFile = data.name ;
      const blob = new Blob([this.MyDataFile], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      fs(blob);
      console.log(blob + ' mydata');
    },  error1 => console.log( error1));
  }
  getWovenYarnDetails(id) {
    this.api.getdata('WovenYarnDetails?filter[where][sampleid]=' + id + '&filter[include]=supplier&filter[include]=item').subscribe(res => {
      this.yarnDetails = res;
      console.log(res);

    }, error => {
      console.log(error); this.get(this.id);
    });
  }
  getKeyEntry(id) {
    this.api.getdata('SampleWiseKeyEntryFields?filter[where][sampleid]=' + id ).subscribe(res => {
      this.entryfield = res;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  ngOnInit() {
    this.get(this.id);
    this.getWovenCommonDetails(this.id);
    this.getWovenYarnDetails(this.id);
    this.getKeyEntry(this.id);
  }
}
