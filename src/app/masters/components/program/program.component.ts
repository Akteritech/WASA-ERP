import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {SuiModalService} from 'ng2-semantic-ui';
import {ApiService} from '../../../api.service';
import {AddProgramComponent} from './add-program/add-program.component';
import {Location} from '@angular/common';
import {ShowDetail} from '../../../templates/show-detail/show-detail.component';
import {ConfirmModal} from '../../../templates/confirm-modal/confirm-modal.component';
import {EditDetail} from '../../../templates/edit-detail/edit-detail.component';
import {Program} from '../../models/program';

@Component({
  providers: [AddProgramComponent],
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {
  programs: any;
  collapse = true;
  response: any;
  selectedPrograms: any;
  selectAllProgram: any;
  userFilter: any;
  fromPage: any;
  toPage: any;
  collectionSize: any;
  pageSize: any;
  selectedPage: any;
  goToPage: any;
  currentRoute: any;
  program: any;
  url = 'Programs';
  meta: {
    totalItemCount: number,
    totalPageCount: number,
    itemsPerPage: number,
    currentPage: number,
    nextPage: number,
  };
  addNew: boolean;
  editExisting: boolean;
  constructor(private _location: Location , public api: ApiService, public modalService: SuiModalService, private route: ActivatedRoute, private router: Router, private comp: AddProgramComponent) {
    this.meta = {
      totalItemCount: 0,
      totalPageCount: 0,
      itemsPerPage: 10,
      currentPage: 1,
      nextPage: 0,
    };

    this.route.params.subscribe(params => {
      if (params.id) {
        this.collapse = false;
      }
    });
    this.program =  new Program();
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = this.router.url;
        }
      }
    );
  }
  edit(id) {
    console.log(id);
    this.modalService
      .open(new EditDetail('Edit Program', 'program', id))
      .onApprove(() => {

      })
      .onDeny(() => {
        this.get();
        console.log();
      });
  }
  selectAll() {
    this.selectedPrograms = [];
    if (this.selectAllProgram) {
      this.programs.forEach(item => {
        item.selected = true;
        this.selectedPrograms.push(item);
      });
    } else {
      this.programs.forEach(item => {
        item.selected = false;
      });
      this.selectedPrograms = [];
    }
  }
  selectPrograms(item, i) {
    if (item.selected) {
      this.selectedPrograms.push(item);
    } else {
      this.selectedPrograms.splice(i, 1);
      this.selectAllProgram = false;
    }
  }

  ngOnInit() {
    if(!this.api.checkPermission('Sub Brand', 'viewList'))  this.router.navigateByUrl('/home');
    this.addNew = this.api.checkPermission('Sub Brand', 'addList');
    this.editExisting = this.api.checkPermission('Sub Brand', 'editList');
    this.collapse = !this.addNew;
    
    this.programs = [];
    this.selectedPrograms = [];
    this.meta.currentPage = 1;
    this.get();
  }
  goToPageNo() {
    this.meta.currentPage = this.goToPage;
    this.get();
  }
  getFilterUrl() {
    const filter: any = {};
    filter['where'] = {};
    filter['include'] = ['brand'];
    filter['order'] = 'programid DESC';
    if (this.program.brandid) {
      filter['where']['brandid'] = this.program.brandid;
    }
    return filter;
  }
  get(search?: boolean) {
    if (search) {
      this.meta.currentPage = 1;
    }
    this.api.getdata('Programs?page=' + this.meta.currentPage + '&filter=' + JSON.stringify(this.getFilterUrl())).subscribe((res: any) => {
      this.programs = res.data;
      this.meta = res.meta;
      console.log(res);
    }, error1 => {
      console.log('Class: , Line:  error1 ', error1);
    });
  }
  viewDetail(id) {
    console.log(id);
    this.modalService
      .open(new ShowDetail('Sub Brand Details', 'Program', id))
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
        this.api.deletedata('Programs', id).subscribe((res: any) => {
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
  mapData(prog) {
    return {
      programname : prog.programname,
      brand : prog.brand ? prog.brand.brandname : '',
      status : prog.status,
    };
  }
  exporttoExcel(pageRange?: boolean): void {
    const fileName = 'Sub Brand';
    const columns = [
      { header: 'Brand Name', key: 'brand', width: 35 },
      { header: 'Sub Brand Name', key: 'programname', width: 20 },
      { header: 'Status', key: 'status', width: 15 },
    ];

    if (pageRange) {
      if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
        return;
      }
      const url = this.getFilterUrl();
      url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
      url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
      this.api.getdata('Programs?filter=' + JSON.stringify(url)).subscribe((res: any) => {
        this.api.exportToExcel(columns, res.map(this.mapData), fileName);
      }, error1 => {
        console.log('Class: , Line:  error1 ', error1);
      });
    } else {
      this.api.exportToExcel(columns, this.selectedPrograms.map(this.mapData), fileName);
    }
  }
  exporttoCsv(pageRange?: boolean): void {
    const fileName = 'Sub Brand';
    const columns = [
      { header: 'Brand Name', key: 'brand', width: 35 },
      { header: 'Sub Brand Name', key: 'programname', width: 20 },
      { header: 'Status', key: 'status', width: 15 },
    ];

    if (pageRange) {
      if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
        return;
      }
      const url = this.getFilterUrl();
      url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
      url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
      this.api.getdata('Programs?filter=' + JSON.stringify(url)).subscribe((res: any) => {
        this.api.exportToCsv(columns, res.map(this.mapData), fileName);
      }, error1 => {
        console.log('Class: , Line:  error1 ', error1);
      });
    } else {
      this.api.exportToCsv(columns, this.selectedPrograms.map(this.mapData), fileName);
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
      this.api.getdata('Programs?filter=' + JSON.stringify(url)).subscribe((res: any) => {
        this.api.savePdf(this.getDataForPDF(res), 'A4', 'landscape', 'Sub Brands', 'auto');
      }, error1 => {
        console.log('here');
        console.log('Class: , Line:  error1 ', error1);
      });
    } else {
      this.api.savePdf(this.getDataForPDF(this.selectedPrograms), 'A4', 'landscape', 'Sub Brands' , 'auto');
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
      this.api.getdata('Programs?filter=' + JSON.stringify(url)).subscribe((res: any) => {
        this.api.OpenPrint(this.getDataForPDF(res), 'A4', 'landscape', 'Sub Brands', 'auto');
      }, error1 => {
        console.log('here');
        console.log('Class: , Line:  error1 ', error1);
      });
    } else {
      this.api.OpenPrint(this.getDataForPDF(this.selectedPrograms), 'A4', 'landscape', 'Sub Brands' , 'auto');
    }
  }
  getDataForPDF(data) {
    const Data = [[
      'S.No.',
      'Sub Brand',
      'Brand',
      'Status'
    ]];
    const exportData = data.map(this.mapData);
    exportData.forEach((element, i) => {
      Data.push([
        i + 1,
        element.programname,
        element.brand,
        element.status,
      ]);
    });
    return Data;
  }
  // savePdf(data){
  //     let pdfData = this.getDataForPDF(data);
  //     const docDefinition =
  //         {
  //             pageOrientation: 'landscape',
  //             pageSize: 'A4',
  //             headerRows: 1,
  //             content: [
  //                 {text: 'Sub Brand Details', fontSize: 24, alignment: 'center', bold: true, margin: [0, 0, 0, 8]},
  //                 {table: {style: 'header',widths: ['auto','*','*'], body: pdfData } }
  //             ],
  //             styles: { header: {alignment: 'center' },}
  //         };
  //     pdfmake.createPdf(docDefinition).download(this.api.toExportFileName('Sub Brands','pdf'));
  // }
}
