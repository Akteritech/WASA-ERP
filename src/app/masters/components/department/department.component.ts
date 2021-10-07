import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../../api.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {SuiModalService} from 'ng2-semantic-ui';
import {Department} from './add-department/add-department.component';
import {Location} from '@angular/common';
import {ShowDetail} from '../../../templates/show-detail/show-detail.component';
import {ConfirmModal} from '../../../templates/confirm-modal/confirm-modal.component';
import {EditDetail} from '../../../templates/edit-detail/edit-detail.component';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
    departments: any;
    collapse = true;
    response: any;
  selectedDepartments: any;
  selectAllDepartment: any;
    userFilter: any;
    collectionSize: any;
    p: any;
    department: any;
    goToPage: any;
    currentRoute: any;
    selectedPage: any;
    dept: any;
    fromPage: any;
    toPage: any;
    url = 'dept';
    id: number;
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

    constructor(private _location: Location , public api: ApiService,
                public modalService: SuiModalService, private route: ActivatedRoute , private router: Router) {
        this.meta = {
            totalItemCount: 0,
            totalPageCount: 0,
            itemsPerPage: 10,
            currentPage: 1,
            nextPage: 0,
        };
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
    this.department = new Department();
  }
    // search() {
    //     let filter: any = {};
    //     filter['where'] = {};
    //     filter['where']['departmentId'] = this.department.deptName;
    //     filter = JSON.stringify(filter);
    //     console.log(filter);
    //     this.api.getdata('dept' + '?filter=' + filter).subscribe(res => {
    //         console.log(res);
    //         this.departments = res;
    //     }, err => {
    //         console.log(err);
    //     });
    // }


  selectAll() {
    this.selectedDepartments = [];
    if (this.selectAllDepartment) {
      this.departments.forEach(item => {
        item.selected = true;
        this.selectedDepartments.push(item);
      });
    } else {
      this.departments.forEach(item => {
        item.selected = false;
      });
      this.selectedDepartments = [];
    }
  }
  selectDepartment(item, i) {
    if (item.selected) {
      this.selectedDepartments.push(item);
    } else {
      this.selectedDepartments.splice(i, 1);
      this.selectAllDepartment = false;
    }
  }
  ngOnInit() {
    if(!this.api.checkPermission('Department', 'viewList'))  this.router.navigateByUrl('/home');
    this.addNew = this.api.checkPermission('Department', 'addList');
    this.editExisting = this.api.checkPermission('Department', 'editList');
    this.collapse = !this.addNew;
    
    this.departments = [];
    this.selectedDepartments = [];        this.selectedPage = 1;
        // this.getItemCount();
        this.get();
        // this.getCount();
    }

    getItemCount() {
        let filter: any = {};
        filter['departmentid'] = this.department.departmentId;
        filter = JSON.stringify(filter);
        this.api.getdata('dept/count?where=' + filter ).subscribe( (res: any) => {
            this.collectionSize = res.count;
            this.meta.currentPage = 1;
            this.get();
        }, err => {
            console.log(err);
        });
    }
    edit(id) {
        console.log(id);
        this.modalService
            .open(new EditDetail('Edit Department', 'department', id))
            .onApprove(() => {

            })
            .onDeny(() => {
              this.get();
                console.log();
            });
    }
    // getCount() {
    //     let filter: any = {};
    //     filter['departmentid'] = this.department.departmentId;
    //     filter['shortname'] = this.department.deptShortName;
    //     filter['description'] = this.department.description;
    //     filter = JSON.stringify(filter);
    //     this.api.getdata(this.url + '/count?where=' + filter ).subscribe( res => {
    //         this.collectionSize = res.count;
    //         this.selectedPage = 1;
    //         this.search();
    //     }, err => {
    //         console.log(err);
    //     });
    // }
    goToPageNo() {
        this.meta.currentPage = this.goToPage;
        this.get();
    }
    get() {
        this.api.getdata('dept?page=' + this.meta.currentPage + '&filter[order]=departmentId DESC').subscribe((res: any) => {
            this.departments = res.data;
            this.meta = res.meta;
            console.log(res);
        }, error1 => {
            console.log('Class: , Line:  error1 ', error1);
        });
    }
    viewDetail(id) {
        console.log(id);
        this.modalService
            .open(new ShowDetail('Department Details', 'department', id))
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
          this.api.deletedata('dept', id).subscribe(res => {
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
            .open(new ShowDetail('Department Details', 'department', id))
            .onApprove(() => {

            })
            .onDeny(() => {
                console.log();
            });
    }
    optionsSearch = (query) => {
        this.searchBox.dropdownService.setOpenState(true);
        return this.api.getdata('dept?filter={ "where":{"deptName":{"like":"%25' + query + '%25"}}}').toPromise();
    }

    backClicked() {
        this._location.back();
    }
    exporttoExcel(pageRange?: boolean): void {
        const fileName = 'Department';
        const columns = [
            { header: 'Department Name', key: 'deptName', width: 15 },
            { header: 'Short Name', key: 'deptShortName', width: 25 },
            { header: 'Description', key: 'description', width: 15 },
          { header: 'Department Position', key: 'deptPosition', width: 15 },

        ];
        if (pageRange) {
            if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
                return;
            }
            const url = {};
            url['order'] = 'departmentId DESC';
            url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
            url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
            this.api.getdata('dept?filter=' + JSON.stringify(url)).subscribe(res => {
                this.api.exportToExcel(columns, res, fileName);
            }, error1 => {
                console.log('Class: , Line:  error1 ', error1);
            });
        } else {
            this.api.exportToExcel(columns, this.selectedDepartments, fileName);
        }
    }
    exporttoCsv(pageRange?: boolean): void {
        const fileName = 'Department';
        const columns = [
            { header: 'Department Name', key: 'deptName', width: 15 },
            { header: 'Short Name', key: 'deptShortName', width: 25 },
            { header: 'Description', key: 'description', width: 15 },
            { header: 'Department Position', key: 'deptPosition', width: 15 },
        ];
        if (pageRange) {
            if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
                return;
            }
            const url = {};
            url['order'] = 'departmentId DESC';
            url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
            url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
            this.api.getdata('dept?filter=' + JSON.stringify(url)).subscribe(res => {
                this.api.exportToCsv(columns, res, fileName);
            }, error1 => {
                console.log('Class: , Line:  error1 ', error1);
            });
        } else {
            this.api.exportToCsv(columns, this.selectedDepartments, fileName);
        }
    }
    exportToPDF(pageRange?: boolean) {
        if (pageRange) {
            if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
                return;
            }
            const url = {};
            url['order'] = 'departmentId DESC';
            url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
            url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
            this.api.getdata('dept?filter=' + JSON.stringify(url)).subscribe(res => {
                this.api.savePdf(this.getDataForPDF(res), 'A4', 'landscape', 'Department', 'auto');
            }, error1 => {
                console.log('here');
                console.log('Class: , Line:  error1 ', error1);
            });
        } else {
            this.api.savePdf(this.getDataForPDF(this.selectedDepartments), 'A4', 'landscape', 'Department' , 'auto');
        }
    }
    printOpen(pageRange?: boolean) {
        if (pageRange) {
            if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
                return;
            }
            const url = {};
            url['order'] = 'departmentId DESC';
            url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
            url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
            this.api.getdata('dept?filter=' + JSON.stringify(url)).subscribe(res => {
                this.api.OpenPrint(this.getDataForPDF(res), 'A4', 'landscape', 'Department', 'auto');
            }, error1 => {
                console.log('here');
                console.log('Class: , Line:  error1 ', error1);
            });
        } else {
            this.api.OpenPrint(this.getDataForPDF(this.selectedDepartments), 'A4', 'landscape', 'Department' , 'auto');
        }
    }
    getDataForPDF(data) {
        const Data = [[
            'S.No.',
            'Department Name',
            'Short Name',
            'Description',
            'Department Position',
        ]];
        const exportData = data;
        exportData.forEach((element, i) => {
            Data.push([
                i + 1,
                element.deptName,
                element.deptShortName,
                element.description,
                element.deptPosition,
            ]);
        });
        return Data;
    }
}
