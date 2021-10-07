import {Component, OnInit} from '@angular/core';
import {DatePipe, Location} from '@angular/common';
import {ApiService} from '../api.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {SuiModalService} from 'ng2-semantic-ui';
@Component({
  selector: 'app-sample-tracking',
  templateUrl: './sample-tracking.component.html',
  styleUrls: ['./sample-tracking.component.css']
})
export class SampleTrackingComponent implements OnInit {
  status: any;
  showSearchForm = false;
  samples: any;
  selectedSamples: any;
  sample: any;
  clients: any;
  brands: any;
  selectAllSamples: any;
  statuses: any;
  customersamplename: any;
  productSubCategories: any;
  collapse = false;
  url = 'SampleGeneralSpecs';
  currentRoute: any;
  response: any;
  goToPage: any;
  fromPage: any;
  toPage: any;
  fromDate: any;
  toDate: any;
  meta: {
    totalItemCount: number,
    totalPageCount: number,
    itemsPerPage: number,
    currentPage: number,
    nextPage: number,
  };
  addsample: any;
  file: any;
  price: any;
   items: any;
  selectSample: any;
  sampleno: any;
   samplename: any;
   samplenodata: any;
   wovenreportdata: any;
   tabledata: any;
  reportData: any;
   allRecord: any[];
  customersampleno: string;
  constructor(public api: ApiService,
              private route: ActivatedRoute,
              public modalService: SuiModalService,
              private router: Router,
              private _location: Location
              ) {
    this.meta = {
      totalItemCount: 0,
      totalPageCount: 0,
      itemsPerPage: 30,
      currentPage: 1,
      nextPage: 0,
    };
    this.router.events.subscribe(
        (event: any) => {
          if (event instanceof NavigationEnd) {
            this.currentRoute = this.router.url;
          }
        }
    );
    this.route.params.subscribe( params => {
      if (params.id) {

        this.collapse = false;
      }
    });
  }
  getDataByData() {
    if(this.fromDate || this.toDate) {
      this.api.getdata('SampleGeneralSpecs/getSampleDataByDate?fromdate=' + this.fromDate.toJSON() + '&todate=' + this.toDate.toJSON()).subscribe((resp: any) => {
        this.reportData = resp;
              this.meta.totalItemCount = this.reportData.length;
              this.allRecord = this.reportData.slice(0, this.meta.itemsPerPage);
              console.log(this.reportData);
        
            });
    } else if(this.customersamplename) {
      this.api.getdata('SampleGeneralSpecs/samplenameSearch?samplename=' + this.customersamplename).subscribe((resp: any) => {
        this.reportData = resp;
        this.meta.totalItemCount = this.reportData.length;
        this.allRecord = this.reportData.slice(0, this.meta.itemsPerPage);
        console.log(this.reportData);
        
            });
    } else if(this.customersampleno) {
      this.api.getdata('SampleGeneralSpecs/searchbySampleno?sampleno=' + this.customersampleno).subscribe((resp: any) => {
        this.reportData = resp;
        this.meta.totalItemCount = this.reportData.length;
        this.allRecord = this.reportData.slice(0, this.meta.itemsPerPage);
        console.log(this.reportData);
        
            });
    }
  }
    
  pageChange() {
    const start = (this.meta.currentPage - 1) * this.meta.itemsPerPage;
    const end = start + this.meta.itemsPerPage
    this.allRecord = this.reportData.slice(start, end);
  }
  generateExcelOfSearchedData() {
const data = this.reportData.map((element: any) => {
  return {
    'SampleName': element['SampleName'], 'SampleNo': element['SampleNo'], 'Company': element['CompanyName'],
    'Product Category': element['ProductCategoryName'],
    'Product Sub Category': element['ProductSubCategoryName'], 'Created By': element['LoginID'],
    'Creation Date': element['CreationDate'],
    'Brand Name': element['BrandName'], 'Program Name': element['ProgramName'], 'Length': element['Length'],
    'Width': element['Width'], 'Status': element['GenSpc_Status'], 'Expiry Status': element['ExpiryStatus'],
     'Received from production': element['CompleteDate'], 'Approvel Date' : element['ApprovelDate'], 'Submission Date1': element['SubmissionDate'],
    'Submission Comment1': element['SubmissionComment'], 'Rejection Date1': element['Rejectiondate'],
    'Rejection Comment1': element['RejectionComment'],
    'Rejection Date2': element['Rejectiondate2'], 'Rejection Comment2': element['RejectionComment2'],
    'Rejection Date3': element['Rejectiondate3'], 'Rejection Comment3': element['RejectionComment3'],
    'Submission Comment4': element['SubmissionComment4'],   'Rejection Date4': element['Rejectiondate4'],
    'Rejection Comment4': element['RejectionComment4']
  };
});
const lengths = [22, 10, 30, 30, 11, 15, 25, 20, 20, 8, 13, 10, 10, 10, 18];
this.api.exportExcel(data, [[' Sample Development Report'], []], ' Sample Development Report',  lengths);
  }

  ngOnInit() {
    this.samples = [];
    this.selectedSamples = [];
  }
  selectAll() {
    this.selectedSamples = [];
    if (this.selectAllSamples) {
      this.samples.forEach(item => {
        item.selected = true;
        this.selectedSamples.push(item);
      });
    } else {
      this.samples.forEach(item => {
        item.selected = false;
      });
      this.selectedSamples = [];
    }
  }
  selectSamples(item, i) {
    if (item.selected) {
      this.selectedSamples.push(item);
    } else {
      this.selectedSamples.splice(i, 1);
      this.selectAllSamples = false;
    }
  }
  backClicked() {
    this._location.back();
  }

}
