import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../api.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {SuiModalService} from 'ng2-semantic-ui';
import {ConfirmModal} from '../../../templates/confirm-modal/confirm-modal.component';
import {Location} from '@angular/common';
import {EditDetail} from '../../../templates/edit-detail/edit-detail.component';
import {LOV} from './add-lov/add-lov.component';

@Component({
  selector: 'app-lovs',
  templateUrl: './lovs.component.html',
  styleUrls: ['./lovs.component.css']
})
export class LovsComponent implements OnInit {
  content: any;
  filter: any;
  OpenPrint: boolean;
  selectedLovs: any;
  selectAllLovs: any;
  state: any;
  userFilter: any;
  lov: any;
  collapse = true;
  lovsData = [];
  response: any;
  collectionSize: any;
  pageSize: any;
  selectedPage: any;
  goToPage: any;
  fromPage: any;
  lovDatas: any;
  toPage: any;
  currentRoute: any;
  url = 'lovData';
  meta: {
    totalItemCount: number,
    totalPageCount: number,
    itemsPerPage: number,
    currentPage: number,
    nextPage: number,
  };
  addNew: boolean;
  editExisting: boolean;
  constructor( private _location: Location, public api: ApiService, public modalService: SuiModalService, private route: ActivatedRoute, private router: Router) {
    this.meta = {
      totalItemCount: 0,
      totalPageCount: 0,
      itemsPerPage: 10,
      currentPage: 1,
      nextPage: 0,
    };
    this.lov = new LOV();
    this.route.params.subscribe(param => {
      if (param.id) {
        this.collapse = false;
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
  selectAll() {
    this.selectedLovs = [];
    if (this.selectAllLovs) {
      this.lovsData.forEach(item => {
        item.selected = true;
        this.selectedLovs.push(item);
      });
    } else {
      this.lovsData.forEach(item => {
        item.selected = false;
      });
      this.selectedLovs = [];
    }
  }
  backClicked() {
    this._location.back();
  }
  selectCompanies(item, i) {
    if (item.selected) {
      this.selectedLovs.push(item);
    } else {
      this.selectedLovs.splice(i, 1);
      this.selectAllLovs = false;
    }

  }
  goToPageNo() {
    this.meta.currentPage = this.goToPage;
    this.get();
  }
  getFilterUrl() {
    const filter: any = {};
    filter['where'] = {};
    filter['order'] = 'id DESC';
    if (this.lov.lovtype) {
      filter['where']['lovtype'] = {};
      filter['where']['lovtype']['like'] = '%25' + this.lov.lovtype + '%25';

    }
    return filter;
  }
  // get(search?: boolean) {
  //   if (search) {
  //     this.meta.currentPage = 1;
  //   }
  //   this.api.getdata('WorkOrderMasters?page=' + this.meta.currentPage + '&filter=' +
  //     JSON.stringify(this.getFilterUrl())).subscribe((res: any) => {
  //     this.orders = res.data;
  //     this.meta = res.meta;
  //     console.log(res);
  //   }, error2 => {
  //     console.log(error2);
  //   });
  // }
  get(search?: boolean) {
    if (search) {
      this.meta.currentPage = 1;
    }
    this.api.getdata('lovData?page=' + this.meta.currentPage + '&filter=' +
      JSON.stringify(this.getFilterUrl())).subscribe((res: any) => {
      this.lovsData = res.data;
      this.meta = res.meta;
      console.log(res);
    }, error1 => {
      console.log('Class: , Line:  error1 ', error1);
    });
  }
  edit(id) {
    console.log(id);
    this.modalService
      .open(new EditDetail('Edit LOV', 'lov', id))
      .onApprove(() => {

      })
      .onDeny(() => {
        console.log();
      });
  }
  delete(id) {
    this.modalService
      .open(new ConfirmModal('Are you sure?', 'Are you sure to delete this?', 'mini'))
      .onApprove(() => {
        this.api.deletedata('lovData', id).subscribe(res => {
          this.get();
          this.response = res;
          this.api.showDeleteToast('Deleted', this.response.message);
        }, err => {
          console.log(err);
        });
      })
      .onDeny(() => {
        console.log('Class: LovComponent, Line: 108  ');
      });
  }
  mapData(prog) {
    return {
      lovtype : prog.lovtype,
      listitem : prog.listitem,
      remarks : prog.remarks,
    };
  }
  exporttoExcel(pageRange?: boolean): void {
    const fileName = 'LOV';
    const columns = [
      { header: 'Lov Type', key: 'lovtype', width: 35 },
      { header: 'List Item', key: 'listitem', width: 35 },
      { header: 'Remarks', key: 'remarks', width: 30 },
    ];
    if (pageRange) {
      if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
        return;
      }
      const url = this.getFilterUrl();
      url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
      url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
      this.api.getdata('lovData?filter=' + JSON.stringify(url)).subscribe((res: any) => {
        this.api.exportToExcel(columns, res.map(this.mapData), fileName);
      }, error1 => {
        console.log('Class: , Line:  error1 ', error1);
      });
    } else {
      this.api.exportToExcel(columns, this.selectedLovs.map(this.mapData), fileName);
    }
  }
  exporttoCsv(pageRange?: boolean): void {
    const fileName = 'LOV';
    const columns = [
      { header: 'Lov Type', key: 'lovtype', width: 35 },
      { header: 'List Item', key: 'listitem', width: 35 },
      { header: 'Remarks', key: 'remarks', width: 30 },
    ];
    if (pageRange) {
      if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
        return;
      }
      const url = this.getFilterUrl();
      url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
      url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
      this.api.getdata('lovData?filter=' + JSON.stringify(url)).subscribe((res: any) => {
        this.api.exportToCsv(columns, res.map(this.mapData), fileName);
      }, error1 => {
        console.log('Class: , Line:  error1 ', error1);
      });
    } else {
      this.api.exportToCsv(columns, this.selectedLovs.map(this.mapData), fileName);
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
      this.api.getdata('lovData?filter=' + JSON.stringify(url)).subscribe((res: any) => {
        this.api.savePdf(this.getDataForPDF(res), 'A4', 'landscape', 'Lov', ['auto', '*' , '*', '*']);
      }, error1 => {
        console.log('here');
        console.log('Class: , Line:  error1 ', error1);
      });
    } else {
      this.api.savePdf(this.getDataForPDF(this.selectedLovs), 'A4', 'landscape', 'Lov' , ['auto', '*' , '*', '*']);
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
      this.api.getdata('lovData?filter=' + JSON.stringify(url)).subscribe((res: any) => {
        this.api.OpenPrint(this.getDataForPDF(res), 'A4', 'landscape', 'Lov', ['auto', '*' , '*', '*']);
      }, error1 => {
        console.log('here');
        console.log('Class: , Line:  error1 ', error1);
      });``
    } else {
      this.api.OpenPrint(this.getDataForPDF(this.selectedLovs), 'A4', 'landscape', 'Lov', ['auto', '*' , '*', '*']);
    }
  }
  getDataForPDF(data) {
    const Data = [[
      'S.No.',
      'Lov Type',
      'List Item',
      'Remarks'
    ]];
    const exportData = data.map(this.mapData);
    exportData.forEach((element, i) => {
      Data.push([
        i + 1,
        element.lovtype,
        element.listitem,
        element.remarks,
      ]);
    });
    return Data;
  }
  ngOnInit() {
    if(!this.api.checkPermission('Lov', 'viewList'))  this.router.navigateByUrl('/home');
    this.addNew = this.api.checkPermission('Lov', 'addList');
    this.editExisting = this.api.checkPermission('Lov', 'editList');
    this.collapse = !this.addNew;
    
    this.lovsData = [];
    this.selectedLovs = [];
    this.selectedPage = 1;
    this.get();
  }

}
