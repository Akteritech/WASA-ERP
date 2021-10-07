import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../api.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {SuiModalService} from 'ng2-semantic-ui';
import {SampleColor} from './add-sample-color/add-sample-color.component';
import {ConfirmModal} from '../../../templates/confirm-modal/confirm-modal.component';
import {Location} from '@angular/common';
import {EditDetail} from '../../../templates/edit-detail/edit-detail.component';

@Component({
  selector: 'app-sample-colors',
  templateUrl: './sample-colors.component.html',
  styleUrls: ['./sample-colors.component.css']
})
export class SampleColorsComponent implements OnInit {
  collapse = true;
  samplecolors: any;
  samples: any;
  selectedSampleColors: any;
  selectAllSampleColors: any;
  userFilter: any;
  color: any;
  samplecol: any;
  fromPage: any;
  toPage: any;
  collectionSize: any;
  pageSize: any;
  selectedPage: any;
  goToPage: any;
  currentRoute: any;
  response: any;
  program: any;
  meta: {
    totalItemCount: number,
    totalPageCount: number,
    itemsPerPage: number,
    currentPage: number,
    nextPage: number,
  };
  constructor(private _location: Location, public api: ApiService , public modalService: SuiModalService, private route: ActivatedRoute, private router: Router) {
    this.meta = {
      totalItemCount: 0,
      totalPageCount: 0,
      itemsPerPage: 10,
      currentPage: 1,
      nextPage: 0,
    };
    this.route.params.subscribe( params => {
      if (params.id) {
        this.collapse = false;
      }
    });
    this.color = new SampleColor();
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = this.router.url;
        }
      }
    );
  }
  selectAll() {
    this.selectedSampleColors = [];
    if (this.selectAllSampleColors) {
      this.samplecolors.forEach(item => {
        item.selected = true;
        this.selectedSampleColors.push(item);
      });
    } else {
      this.samplecolors.forEach(item => {
        item.selected = false;
      });
      this.selectedSampleColors = [];
    }
  }
  selectSampleColor(item, i) {
    if (item.selected) {
      this.selectedSampleColors.push(item);
    } else {
      this.selectedSampleColors.splice(i, 1);
      this.selectAllSampleColors = false;
    }
  }
  optionsLookupSample(query){
      this.api.getdata('SampleGeneralSpecs?filter={"limit":10,"where":{"samplename":{"like":"%25' + query + '%25"}}}').subscribe( (res: any) => {
        this.samples = res;
        // console.log(this.samples);
      }, error1 => {
        console.log('error1 ', error1);
      });
  }
  getFilterUrl() {
    const filter: any = {};
    filter['where'] = {};
    filter['include'] = ['sample'];
    filter['order'] = 'samplecolorid DESC';
    if (this.color.sampleid) {
      filter['where']['sampleid'] = this.color.sampleid ;
      // filter['where']['sampleid']['like'] = '%25' + this.color.sampleid + '%25';

    }
    return filter;
  }
  get(search?: boolean) {
    if (search) {
      this.meta.currentPage = 1;
    }
    this.api.getdata('SampleColors?page=' + this.meta.currentPage + '&filter=' + JSON.stringify(this.getFilterUrl())).subscribe((res: any) => {
      this.samplecolors = res.data;
      this.meta = res.meta;
      console.log(res);
    }, error1 => {
      console.log('Class: , Line:  error1 ', error1);
    });
  }
  goToPageNo() {
    this.meta.currentPage = this.goToPage;
    this.get();
  }
  delete(id) {
    this.modalService
      .open(new ConfirmModal('Are you sure?', 'Are you sure to delete this?', 'mini'))
      .onApprove(() => {
        this.api.deletedata('SampleColors', id).subscribe((res: any) => {
          this.get();
          this.response = res;
          this.api.showDeleteToast('Deleted', this.response.message);
        }, err => {
          console.log(err);
        });
      })
      .onDeny(() => {
        console.log('Class: LeaveTypeComponent, Line: 39  ');
      });

  }
  backClicked() {
    this._location.back();
  }
  // edit(id){
  //   console.log(id);
  //   this.modalService
  //     .open(new EditDetail('Edit Sample Color', 'samplecolor', id))
  //     .onApprove(() => {
  //        this.get();
  //     })
  //     .onDeny(() => {
  //       this.get();
  //       console.log();
  //       this.get();
  //     });
  // }
  mapData(prog) {
    return {
      sampleno : prog.sample ? prog.sample.sampleno : '',
      samplename : prog.sample ? prog.sample.samplename : '',
      samplecolorname : prog.samplecolorname,
      printcolor : prog.printcolor,
    };
  }
  exporttoExcel(pageRange?: boolean): void {
    const fileName = 'Sample Color';
    const columns = [
      { header: 'Sample No', key: 'sampleno', width: 35 },
      { header: 'Sample Name', key: 'samplename', width: 35 },
      { header: 'Color Name', key: 'samplecolorname', width: 30 },
      { header: 'Print Color Name', key: 'printcolor', width: 30 },
    ];

    if (pageRange) {
      if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
        return;
      }
      const url = this.getFilterUrl();
      url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
      url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
      this.api.getdata('SampleColors?filter=' + JSON.stringify(url)).subscribe((res: any) => {
        this.api.exportToExcel(columns, res.map(this.mapData), fileName);
      }, error1 => {
        console.log('Class: , Line:  error1 ', error1);
      });
    } else {
      this.api.exportToExcel(columns, this.selectedSampleColors.map(this.mapData), fileName);
    }
  }
  exporttoCsv(pageRange?: boolean): void {
    const fileName = 'Sample Color';
    const columns = [
      { header: 'Sample No', key: 'sampleno', width: 35 },
      { header: 'Sample Name', key: 'samplename', width: 35 },
      { header: 'Color Name', key: 'samplecolorname', width: 30 },
      { header: 'Print Color Name', key: 'printcolor', width: 30 },
    ];

    if (pageRange) {
      if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
        return;
      }
      const url = this.getFilterUrl();
      url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
      url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
      this.api.getdata('SampleColors?filter=' + JSON.stringify(url)).subscribe((res: any) => {
        this.api.exportToCsv(columns, res.map(this.mapData), fileName);
      }, error1 => {
        console.log('Class: , Line:  error1 ', error1);
      });
    } else {
      this.api.exportToCsv(columns, this.selectedSampleColors.map(this.mapData), fileName);
    }
  }
  exportToPDF(pageRange?: boolean) {
    if (pageRange) {
      if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
        return;
      }
      const url = this.getFilterUrl();
      url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
      url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
      this.api.getdata('SampleColors?filter=' + JSON.stringify(url)).subscribe((res: any) => {
        this.api.savePdf(this.getDataForPDF(res), 'A4', 'landscape', 'Sample Color', ['auto', '*' , '*', '*', '*']);
      }, error1 => {
        console.log('here');
        console.log('Class: , Line:  error1 ', error1);
      });
    } else {
      this.api.savePdf(this.getDataForPDF(this.selectedSampleColors), 'A4', 'landscape', 'Sample Color' , ['auto', '*' , '*', '*', '*']);
    }
  }
  printOpen(pageRange?: boolean) {
    if (pageRange) {
      if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
        return;
      }
      const url = this.getFilterUrl();
      url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
      url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
      this.api.getdata('SampleColors?filter=' + JSON.stringify(url)).subscribe((res: any) => {
        this.api.OpenPrint(this.getDataForPDF(res), 'A4', 'landscape', 'Sample Color', ['auto', '*' , '*', '*', '*']);
      }, error1 => {
        console.log('here');
        console.log('Class: , Line:  error1 ', error1);
      });``
    } else {
      this.api.OpenPrint(this.getDataForPDF(this.selectedSampleColors), 'A4', 'landscape', 'Sample Color', ['auto', '*' , '*', '*', '*']);
    }
  }
  getDataForPDF(data) {
    const Data = [[
      'S.No.',
      'Sample No.',
      'Sample Name',
      'Color Name',
      'Print Color Name'
    ]];
    const exportData = data.map(this.mapData);
    exportData.forEach((element, i) => {
      Data.push([
        i + 1,
        element.sampleno,
        element.samplename,
        element.samplecolorname,
        element.printcolor,
      ]);
    });
    return Data;
  }
  ngOnInit() {
    this.samplecol = [];
    this.selectedSampleColors = [];
    this.meta.currentPage = 1;
    this.get();
    this.optionsLookupSample('a');
  }

}
