import {Component, OnInit, ViewChild} from '@angular/core';
import {SuiModalService} from 'ng2-semantic-ui';
import {ApiService} from '../../../api.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Designation} from './add-designation/add-designation.component';
import {Location} from '@angular/common';
import {ShowDetail} from '../../../templates/show-detail/show-detail.component';
import {ConfirmModal} from '../../../templates/confirm-modal/confirm-modal.component';
import {EditDetail} from '../../../templates/edit-detail/edit-detail.component';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {
  collapse = true;
  designations: any;
  response: any;
  collectionSize: any;
  pageSize: any;
  selectedDesignations: any;
  selectAllDesignation: any;
  userFilter: any;
  fromPage: any;
  toPage: any;
  selectedPage: any;
  goToPage: any;
  currentRoute: any;
  designation: any;
  url = 'desig';
  meta: {
    totalItemCount: number,
    totalPageCount: number,
    itemsPerPage: number,
    currentPage: number,
    nextPage: number,
  };
  @ViewChild('searchBox') searchBox;
  addNew: boolean;
  editExisting: boolean;

  constructor(private _location: Location , public api: ApiService, public modalService: SuiModalService, private route: ActivatedRoute , private router: Router) {
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
    this.designation = new Designation();
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = this.router.url;
        }
      }
    );
  }
  selectAll() {
    this.selectedDesignations = [];
    if (this.selectAllDesignation) {
      this.designations.forEach(item => {
        item.selected = true;
        this.selectedDesignations.push(item);
      });
    } else {
      this.designations.forEach(item => {
        item.selected = false;
      });
      this.selectedDesignations = [];
    }
  }
  selectDesignations(item, i) {
    if (item.selected) {
      this.selectedDesignations.push(item);
    } else {
      this.selectedDesignations.splice(i, 1);
      this.selectAllDesignation = false;
    }
  }
  ngOnInit() {
    if(!this.api.checkPermission('Designation', 'viewList'))  this.router.navigateByUrl('/home');
    this.addNew = this.api.checkPermission('Designation', 'addList');
    this.editExisting = this.api.checkPermission('Designation', 'editList');
    this.collapse = !this.addNew;
    
    this.designations = [];
    this.selectedDesignations = [];
    this.meta.currentPage = 1;
    // this.getItemCount();
    this.get();
  }
  edit(id) {
    console.log(id);
    this.modalService
      .open(new EditDetail('Edit Designation', 'designation', id))
      .onApprove(() => {

      })
      .onDeny(() => {
        this.get();
        console.log();
      });
  }
  getItemCount() {
    let filter: any = {};
    filter['designationid'] = this.designation.desigId;
    filter = JSON.stringify(filter);
    this.api.getdata('desig/count?where=' + filter ).subscribe( (res: any) => {
      this.collectionSize = res.count;
      this.meta.currentPage = 1;
      this.get();
    }, err => {
      console.log(err);
    });
  }
  goToPageNo() {
    this.meta.currentPage = this.goToPage;
    this.get();
  }
  getFilterUrl() {
    const filter: any = {};
    filter['where'] = {};
    filter['include'] = ['department'];
    filter['order'] = 'desigId DESC';
    if (this.designation.depId) {
      filter['where']['depId'] = this.designation.depId;
    }
    return filter;
  }
  get() {
    this.api.getdata('desig?page=' + this.meta.currentPage + '&filter=' + JSON.stringify(this.getFilterUrl())).subscribe((res: any) => {
      this.designations = res.data;
      this.meta = res.meta;
      console.log(res);
    }, error1 => {
      console.log('Class: , Line:  error1 ', error1);
    });
  }
  viewDetail(id) {
    console.log(id);
    this.modalService
      .open(new ShowDetail('Designation Details', 'Designation', id))
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
        this.api.deletedata('desig', id).subscribe((res: any) => {
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
  alert(id): void {
    console.log(id);
    this.modalService
      .open(new ShowDetail('Designation Details', 'designation', id))
      .onApprove(() => {

      })
      .onDeny(() => {
        console.log();
      });
  }

  optionsSearch = (query) => {
    this.searchBox.dropdownService.setOpenState(true);
    return this.api.getdata('desig?filter={ "where":{"designation":{"like":"%25' + query + '%25"}}}').toPromise();
  }
  backClicked() {
    this._location.back();
  }
  mapData(degis) {
    return {
      designation : degis.designation,
      designationnameinbangla : degis.designationnameinbangla,
      department : degis.department ? degis.department.deptName : '',
      description : degis.description,
      reportto : degis.reportto,
    };
  }
  exporttoExcel(pageRange?: boolean): void {
    const fileName = 'Designation';
    const columns = [
      { header: 'Designation Name', key: 'designation', width: 15 },
      { header: 'Designation Name In Bangla', key: 'designationnameinbangla', width: 25 },
      { header: 'Department', key: 'department', width: 15 },
      { header: 'Description', key: 'description', width: 15 },
      { header: 'Report To', key: 'reportto', width: 15 },
    ];
    if (pageRange) {
      if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
        return;
      }
      const url = {};
      url['order'] = 'desigId DESC';
      url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
      url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
      this.api.getdata('desig?filter=' + JSON.stringify(url)).subscribe((res: any) => {
        this.api.exportToExcel(columns, res.map(this.mapData), fileName);
      }, error1 => {
        console.log('Class: , Line:  error1 ', error1);
      });
    } else {
      this.api.exportToExcel(columns, this.selectedDesignations.map(this.mapData), fileName);
    }
  }
  exporttoCsv(pageRange?: boolean): void {
    const fileName = 'Designation';
    const columns = [
      { header: 'Designation Name', key: 'designation', width: 15 },
      { header: 'Designation Name In Bangla', key: 'designationnameinbangla', width: 25 },
      { header: 'Department', key: 'department', width: 15 },
      { header: 'Description', key: 'description', width: 15 },
      { header: 'Report To', key: 'reportto', width: 15 },
    ];
    if (pageRange) {
      if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
        return;
      }
      const url = {};
      url['order'] = 'desigId DESC';
      url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
      url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
      this.api.getdata('desig?filter=' + JSON.stringify(url)).subscribe((res: any) => {
        this.api.exportToCsv(columns, res.map(this.mapData), fileName);
      }, error1 => {
        console.log('Class: , Line:  error1 ', error1);
      });
    } else {
      this.api.exportToCsv(columns, this.selectedDesignations.map(this.mapData), fileName);
    }
  }
  exportToPDF(pageRange?: boolean) {
    if (pageRange) {
      if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
        return;
      }
      const url = {};
      url['order'] = 'desigId DESC';
      url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
      url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
      this.api.getdata('desig?filter=' + JSON.stringify(url)).subscribe((res: any) => {
        this.api.savePdf(this.getDataForPDF(res), 'A4', 'landscape', 'Designation', 'auto');
      }, error1 => {
        console.log('here');
        console.log('Class: , Line:  error1 ', error1);
      });
    } else {
      this.api.savePdf(this.getDataForPDF(this.selectedDesignations), 'A4', 'landscape', 'Designation' , 'auto');
    }
  }
  printOpen(pageRange?: boolean) {
    if (pageRange) {
      if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
        return;
      }
      const url = {};
      url['order'] = 'desigId DESC';
      url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
      url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
      this.api.getdata('desig?filter=' + JSON.stringify(url)).subscribe((res: any) => {
        this.api.OpenPrint(this.getDataForPDF(res), 'A4', 'landscape', 'Designation', 'auto');
      }, error1 => {
        console.log('here');
        console.log('Class: , Line:  error1 ', error1);
      });
    } else {
      this.api.OpenPrint(this.getDataForPDF(this.selectedDesignations), 'A4', 'landscape', 'Designation' , 'auto');
    }
  }
  getDataForPDF(data) {
    const Data = [[
      'S.No.',
      'Designation Name',
      'Designation Name In Bangla',
      'Department',
      'Description',
      'Report To',
    ]];
    const exportData = data.map(this.mapData);
    exportData.forEach((element, i) => {
      Data.push([
        i + 1,
        element.designation,
        element.designationnameinbangla,
        element.department,
        element.description,
        element.reportto,
      ]);
    });
    return Data;
  }
}
