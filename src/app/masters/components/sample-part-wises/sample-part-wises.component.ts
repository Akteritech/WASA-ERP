import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ApiService} from '../../../api.service';
import {SuiModalService} from 'ng2-semantic-ui';
import {EditDetail} from '../../../templates/edit-detail/edit-detail.component';
import {ConfirmModal} from '../../../templates/confirm-modal/confirm-modal.component';
import {SamplePartWise} from './add-sample-part-wise/add-sample-part-wise.component';

@Component({
  selector: 'app-sample-part-wises',
  templateUrl: './sample-part-wises.component.html',
  styleUrls: ['./sample-part-wises.component.css']
})
export class SamplePartWisesComponent implements OnInit {

  collapse = true;
  samplepartwises: any;
  selectedSamplePartWiseLength: any;
  selectAllSampleParts: any;
  userFilter: any;
  color: any;
  samplepart: any;
  fromPage: any;
  toPage: any;
  collectionSize: any;
  pageSize: any;
  selectedPage: any;
  goToPage: any;
  currentRoute: any;
  response: any;
  samples: any;
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
    this.color = new SamplePartWise();
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = this.router.url;
        }
      }
    );
  }
  selectAll() {
    this.selectedSamplePartWiseLength = [];
    if (this.selectAllSampleParts) {
      this.samplepartwises.forEach(item => {
        item.selected = true;
        this.selectedSamplePartWiseLength.push(item);
      });
    } else {
      this.samplepartwises.forEach(item => {
        item.selected = false;
      });
      this.selectedSamplePartWiseLength = [];
    }
  }
  selectSamplePartWise(item, i) {
    if (item.selected) {
      this.selectedSamplePartWiseLength.push(item);
    } else {
      this.selectedSamplePartWiseLength.splice(i, 1);
      this.selectAllSampleParts = false;
    }
  }
  optionsLookupSample(query) {
    const filter: any = {};
    filter['where'] = {};
    filter['order'] = 'sampleid DESC';
    filter['limit'] = 10;
    filter['where']['samplename'] = {};
    filter['where']['samplename']['like'] = '%25' + query + '%25';
    this.api.getdata('SampleGeneralSpecs?filter=' + JSON.stringify(filter)).subscribe( (res: any) => {
      this.samples = res;
      // console.log(this.samples);
    }, error1 => {
      console.log('error1 ', error1);
    });
  }
  getFilterUrl() {
    const filter: any = {};
    filter['where'] = {};
    filter['include'] = ['sample' , 'lov'];
    filter['order'] = 'partsid DESC';
    if (this.color.sampleid) {
      filter['where']['sampleid'] = this.color.sampleid ;
    }
    return filter;
  }
  get(search?: boolean) {
    if (search) {
      this.meta.currentPage = 1;
    }
    this.api.getdata('SampleWisePartsLengths?page=' + this.meta.currentPage + '&filter=' + JSON.stringify(this.getFilterUrl())).subscribe((res: any) => {
      this.samplepartwises = res.data;
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
        this.api.deletedata('SampleWisePartsLengths', id).subscribe((res: any) => {
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
  edit(id) {
    console.log(id);
    this.modalService
      .open(new EditDetail('Edit Sample Part Wise Length', 'samplepart', id))
      .onApprove(() => {
        this.get();
      })
      .onDeny(() => {
        this.get();
        console.log();
        this.get();
      });
  }
  mapData(prog) {
    return {
      sampleno : prog.sample ? prog.sample.sampleno : '',
      samplename : prog.sample ? prog.sample.samplename : '',
      length : prog.length,
      width : prog.width,
      partno :  prog.lov ? prog.lov.listitem : '',
    };
  }
  exporttoExcel(pageRange?: boolean): void {
    const fileName = 'Sample Color';
    const columns = [
      { header: 'Sample No', key: 'sampleno', width: 35 },
      { header: 'Sample Name', key: 'samplename', width: 35 },
      { header: 'Length', key: 'length', width: 30 },
      { header: 'Width', key: 'width', width: 30 },
      { header: 'Part No', key: 'partno', width: 30 },
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
      this.api.exportToExcel(columns, this.selectedSamplePartWiseLength.map(this.mapData), fileName);
    }
  }
  exporttoCsv(pageRange?: boolean): void {
    const fileName = 'Sample Color';
    const columns = [
      { header: 'Sample No', key: 'sampleno', width: 35 },
      { header: 'Sample Name', key: 'samplename', width: 35 },
      { header: 'Length', key: 'length', width: 30 },
      { header: 'Width', key: 'width', width: 30 },
      { header: 'Part No', key: 'partno', width: 30 },
    ];

    if (pageRange) {
      if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
        return;
      }
      const url = this.getFilterUrl();
      url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
      url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
      this.api.getdata('SampleWisePartsLengths?filter=' + JSON.stringify(url)).subscribe((res: any) => {
        this.api.exportToCsv(columns, res.map(this.mapData), fileName);
      }, error1 => {
        console.log('Class: , Line:  error1 ', error1);
      });
    } else {
      this.api.exportToCsv(columns, this.selectedSamplePartWiseLength.map(this.mapData), fileName);
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
      this.api.getdata('SampleWisePartsLengths?filter=' + JSON.stringify(url)).subscribe((res: any) => {
        this.api.savePdf(this.getDataForPDF(res), 'A4', 'landscape', 'Sample Part Wise', ['auto', '*' , '*', '*', '*', '*']);
      }, error1 => {
        console.log('here');
        console.log('Class: , Line:  error1 ', error1);
      });
    } else {
      this.api.savePdf(this.getDataForPDF(this.selectedSamplePartWiseLength), 'A4', 'landscape', 'Sample Part Wise' , ['auto', '*' , '*', '*', '*', '*']);
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
      this.api.getdata('SampleWisePartsLengths?filter=' + JSON.stringify(url)).subscribe((res: any) => {
        this.api.OpenPrint(this.getDataForPDF(res), 'A4', 'landscape', 'Sample Part Wise', ['auto', '*' , '*', '*', '*', '*']);
      }, error1 => {
        console.log('here');
        console.log('Class: , Line:  error1 ', error1);
      });``
    } else {
      this.api.OpenPrint(this.getDataForPDF(this.selectedSamplePartWiseLength), 'A4', 'landscape', 'Sample Part Wise', ['auto', '*' , '*', '*', '*', '*']);
    }
  }
  getDataForPDF(data) {
    const Data = [[
      'S.No.',
      'Sample No.',
      'Sample Name',
      'Length',
      'Width',
      'Part No'
    ]];
    const exportData = data.map(this.mapData);
    exportData.forEach((element, i) => {
      Data.push([
        i + 1,
        element.sampleno,
        element.samplename,
        element.length,
        element.width,
        element.partno,
      ]);
    });
    return Data;
  }
  ngOnInit() {
    this.samplepart = [];
    this.selectedSamplePartWiseLength = [];
    this.meta.currentPage = 1;
    this.get();
    this.optionsLookupSample('a');
  }

}
