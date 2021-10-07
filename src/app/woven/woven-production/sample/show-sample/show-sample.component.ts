import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from '../../../../api.service';
import {ActivatedRoute} from '@angular/router';
import {ShowDetailComponent} from '../../../../templates/show-detail/show-detail.component';
import * as fs from 'file-saver';


@Component({
  selector: 'app-show-sample',
  templateUrl: './show-sample.component.html',
  styleUrls: ['./show-sample.component.css'],
  providers: [ShowDetailComponent],
})
export class ShowSampleComponent implements OnInit {
  sample: any;
  wovenDetail: any;
  wovenDetails: any;
  yarnDetails: any;
  entryfield: any;
  sampleid = 0;
  work: any;
  colors: any;
  @Input() id: number;
  @Output() printJs = new EventEmitter<boolean>();
   MyDataFile: any;
   sales: any;
   executive: any;
   designer: any;
   colordetails: any;
  constructor(public api: ApiService, private route: ActivatedRoute , public showDetail: ShowDetailComponent) {
  }
  get(id) {
    this.api.getdata(`SampleGeneralSpecs/${id}?filter[include]=brand&filter[include]=client&filter[include]=company&filter[include]=productCategory&filter[include]=productSubCategory&filter[include]=salesPerson&filter[include]=NPDExecutive&filter[include]=designer&filter[include]=status&filter[include]=program`).subscribe((res: any) => {
      this.sample = res;
      if (res.submissiondate.includes('1900')) { res.submissiondate = ''; }
      if (res.submissiondate2.includes('1900')) { res.submissiondate2 = ''; }
      if (res.submissiondate3.includes('1900')) { res.submissiondate3 = ''; }
      if (res.submissiondate4.includes('1900')) { res.submissiondate4 = ''; }
      if (res.rejectiondate.includes('1900')) { res.rejectiondate = ''; }
      if (res.rejectiondate2.includes('1900')) { res.rejectiondate2 = ''; }
      if (res.rejectiondate3.includes('1900')) { res.rejectiondate3 = ''; }
      if (res.rejectiondate4.includes('1900')) { res.rejectiondate4 = ''; }
      console.log(res);
      setTimeout(() => {
        this.api.getdata('EmployeeOfficialInfos/getSalesPersonList').subscribe((res1: any) => {
          this.sales = res1.find(({Emp_ID}) => Emp_ID === this.sample.salesid)
          console.log(this.sales)
          // console.log(res1);'
        });
        this.api.getdata('EmployeeOfficialInfos/getExecutiveList').subscribe((res2: any) => {
          this.executive = res2.find(({Emp_ID}) => Emp_ID === this.sample.executiveid)
          console.log(this.executive)
          // console.log(res1);'
        });
        this.api.getdata('EmployeeOfficialInfos/getDesignerList').subscribe((res3: any) => {
          this.designer =res3.find(({Emp_ID}) => Emp_ID === this.sample.designerid)
          console.log(this.designer)
          // console.log(res1);'
        });
      }, 500);

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
  // getwovenCommonDetails(id) {
  //   this.api.getdata('WovenCommonDetails/' + id + '&filter[include]=weavingtypeinfo').subscribe(res => {
  //     this.wovenDetails = res;
  //     console.log(res);
  //   }, error => {
  //     console.log(error);
  //   });
  // }
  getWovenYarnDetails(id) {
    this.api.getdata('WovenYarnDetails?filter[where][sampleid]=' + id + '&filter[include]=supplierid&filter[include]=item').subscribe(res => {
      this.yarnDetails = res;
      console.log(res);

    }, error => {
      console.log(error); this.get(this.id);
    });
  }
  getSampleColor(id) {
this.api.getdata('samplecolors?filter[where][sampleid]=' + id + '&filter[include]=sample').subscribe((res: any) => {
  this.colordetails = res;
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
  // getKeyEntry(id) {
  //   this.api.getdata('SampleWiseKeyEntryFields?filter[where][sampleid]=' + id ).subscribe(res => {
  //     this.entryfield = res;
  //     // console.log(res);
  //   }, err => {
  //     console.log(err);
  //   });
  // }
  ngOnInit() {
    this.get(this.id);
    this.getWovenCommonDetails(this.id);
    this.getWovenYarnDetails(this.id);
    // this.getKeyEntry(this.id);
    this.getSampleColor(this.id);
  }

}
