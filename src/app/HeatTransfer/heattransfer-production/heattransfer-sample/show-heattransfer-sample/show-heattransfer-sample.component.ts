import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../../../api.service';
import * as fs from 'file-saver';

@Component({
  selector: 'app-show-heattransfer-sample',
  templateUrl: './show-heattransfer-sample.component.html',
  styleUrls: ['./show-heattransfer-sample.component.css']
})
export class ShowHeattransferSampleComponent implements OnInit {
  offsetsample: any;
  sampleid = 0;
  material: any;
  work: any;
  @Input() id: number;
   MyDataFile: any;
   sales: any;
   executive: any;
   designer: any;
   colordetails: any;
  constructor(public api: ApiService, private route: ActivatedRoute) {
  }
  get(id) {
    this.api.getdata('SampleGeneralSpecs/' + id +
      '?filter[include]=brand&filter[include]' +
      '=client&filter[include]=company&filter[include]=productCategory&filter[include]' +
      '=productSubCategory&filter[include]=salesPerson&filter[include]=NPDExecutive&filter[include]=designer&filter[include]=program&filter[include]=status&filter[include]=material').subscribe((res: any) => {
      this.offsetsample = res;
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
          this.sales = res1.find(({Emp_ID}) => Emp_ID === this.offsetsample.salesid)
          console.log(this.sales)
          // console.log(res1);'
        });
        this.api.getdata('EmployeeOfficialInfos/getExecutiveList').subscribe((res2: any) => {
          this.executive = res2.find(({Emp_ID}) => Emp_ID === this.offsetsample.executiveid)
          console.log(this.executive)
          // console.log(res1);'
        });
        this.api.getdata('EmployeeOfficialInfos/getDesignerList').subscribe((res3: any) => {
          this.designer =res3.find(({Emp_ID}) => Emp_ID === this.offsetsample.designerid)
          console.log(this.designer)
          // console.log(res1);'
        });
      }, 500);

    }, error => {
      console.log(error);
    });
  }
  getMatrial(id){
    this.api.getdata('SampleWiseMaterialDetails?filter[where][sampleid]=' + id +
      '&filter[include]=item&filter[include]=sample&filter[include]=color').subscribe((res: any) => {
      this.material = res;
      console.log(res);

    }, error => {
      console.log(error);
    });
  }
  ngOnInit() {
    this.get(this.id);
    this.getMatrial(this.id);
    this.getSampleColor(this.id);
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
}
