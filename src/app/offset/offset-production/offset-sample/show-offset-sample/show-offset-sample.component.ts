import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../../../api.service';
import * as fs from 'file-saver';
import {ngxCsv} from 'ngx-csv';

@Component({
  selector: 'app-show-offset-sample',
  templateUrl: './show-offset-sample.component.html',
  styleUrls: ['./show-offset-sample.component.css']
})
export class ShowOffsetSampleComponent implements OnInit {
  offsetsample: any;
  sampleid = 0;
  material: any;
  work: any;
  @Input() id: number;
  technical: any;
   MyDataFile: any;
   sales: any;
   executive: any;
   designer: any;
   columns = [
    {header: 'Sample No', key: 'sampleno', width: 15},
    {header: 'material color', key: 'materialcolor', width: 25},
    {header: 'material name', key: 'materialname', width: 25},
    {header: 'length', key: 'length', width: 10},
    {header: 'width', key: 'width', width: 10},
    {header: 'quantity per thousand', key: 'quantityperthousand', width: 30},
  ];
   options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Offset Technical Details',
    useBom: true,
    noDownload: false,
    headers: ['Sample No', 'Material Color', 'Material Name', 'Full Sheet Length',	'Full Sheet Width',	'Quantity Per Thousand']
  };
   colordetails: any;
   OffsetTechnicalDetails: any;
   TechnicalDetails: any;
  constructor(public api: ApiService, private route: ActivatedRoute) {
  }

  get(id) {
    this.api.getdata('SampleGeneralSpecs/' + id +
        '?filter[include]=brand&filter[include]' +
        '=client&filter[include]=company&filter[include]=productCategory&filter[include]' +
        '=productSubCategory&filter[include]=salesPerson&filter[include]=NPDExecutive&filter' +
        '[include]=designer&filter[include]=program&filter[include]=status&filter[include]=material').subscribe((res: any) => {
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
        this.api.getdata('SalesPersonLists?filter[where][Emp_ID]=' + this.offsetsample.salesid).subscribe((res1: any) => {
          this.sales = res1[0];
          // console.log(res1);
        });
        this.api.getdata('ExecutiveLists?filter[where][Emp_ID]=' + this.offsetsample.executiveid).subscribe((res2: any) => {
          this.executive = res2[0];
          // console.log(res2);
        });
        this.api.getdata('DesignerLists?filter[where][Emp_ID]=' + this.offsetsample.designerid).subscribe((res3: any) => {
          this.designer = res3[0];
          // console.log(res3);
        });
      }, 200);
    }, error => {
      console.log(error);
    });
  }
  // getOffsetTechnicalDetails(id) {
  //   this.api.getdata('offset-technical-details?filter[where][sampleid]=' + id +  this.sampleid).subscribe(res => {
  //     this.TechnicalDetails = res;
  //     console.log(res);
  //   }, err => {
  //     console.log(err);
  //   });
  // }
  getOffsetTechnicalDetail(id) {
    if (!id) { return; }
    this.api.getdata('offset-technical-details?filter[where][sampleid]=' + id + '&filter[include]=sample').subscribe((res: any[]) => {
      if (res.length !== 0) {
        this.TechnicalDetails = res;
      }
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  getSampleTechnical(id) {
    this.api.getdata('WovenCommonDetails?filter[where][sampleid]=' + id + '&filter[include]=sample').subscribe(res => {
      this.technical = res;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

  getMatrial(id) {
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
    this.getOffsetTechnicalDetail(this.id);
    this.getSampleTechnical(this.id);
    this.getSampleColor(this.id);
  }
  getSampleColor(id) {
    this.api.getdata('samplecolors?filter[where][sampleid]=' + id + '&filter[include]=sample').subscribe((res: any) => {
      this.colordetails = res;
    });
  }
  // exporttoExcel() {
  //   const columns = [
  //     { header: 'Length', key: 'length', width: 8 },
  //     { header: 'Width', key: 'width', width: 8 },
  //     { header: 'Quoted Price', key: 'quotedprice', width: 8 },
  //     { header: 'Pcsyard', key: 'pcsyard', width: 8 },
  //     { header: 'Order Date', key: 'orderdate', width: 15 },
  //     { header: 'Est Delivery Date', key: 'estdeliverydate', width: 15 },
  //     { header: 'Filename', key: 'filename', width: 20 },
  //     { header: 'Total No of color', key: 'totalnoofcolor', width: 8 },
  //     { header: 'No of ups', key: 'noofups', width: 8 },
  //     { header: 'Paper gsm', key: 'papergsm', width: 8 },
  //   ];
  //   this.api.getdata('SampleGeneralSpecs?filter=' + JSON.stringify(url)).subscribe((res: any) => {
  //     this.api.exportToExcel(columns, res.map(this.mapData), fileName);
  //   }, error1 => {
  //     console.log('Class: , Line:  error1 ', error1);
  //   });
  // }

  downloadPDF() {
    this.api.getdata('FileUp').subscribe( (data: any) => {
      this.MyDataFile = data.name ;
      const blob = new Blob([this.MyDataFile], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      fs(blob);
      console.log(blob + ' mydata');
    },  error1 => console.log( error1));
  }
  exporttoExcel(): void {
    const fileName = 'sample material details';
    const columns = [
      {header: 'Sample No', key: 'sampleno', width: 15},
      {header: 'material color', key: 'materialcolor', width: 25},
      {header: 'material name', key: 'materialname', width: 25},
      {header: 'length', key: 'length', width: 10},
      {header: 'width', key: 'width', width: 10},
      {header: 'quantity per thousand', key: 'quantityperthousand', width: 30},
    ];
    this.api.exportToExcel(columns, this.material.map(this.mapData), fileName);
  }

  mapData(items) {
    return {
      sampleno: items.sample ? items.sample.sampleno : '',
      materialcolor: items.color ? items.color.samplecolorname : '',
      materialname: items.item ? items.item.itemcode : '',
      fullsheetlength: items.fullsheetlength,
      fullsheetwidth: items.fullsheetwidth,
      quantityperthousand: items.requiredqty,
    };
  }
  exportCsv() {
    new ngxCsv(this.material.map(this.mapData), 'myreport', this.options);
  }
}
