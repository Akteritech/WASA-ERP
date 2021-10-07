import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../api.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {SuiModalService} from 'ng2-semantic-ui';
import {Supplier} from './add-supplier/add-supplier.component';
import {Location} from '@angular/common';
import {ShowDetail} from '../../../templates/show-detail/show-detail.component';
import {ConfirmModal} from '../../../templates/confirm-modal/confirm-modal.component';
import {EditDetail} from '../../../templates/edit-detail/edit-detail.component';

@Component({
    selector: 'app-suppliers',
    templateUrl: './suppliers.component.html',
    styleUrls: ['./suppliers.component.css']

})
export class SuppliersComponent implements OnInit {
    collapse = true;
    suppliers = [];
    supplier: any;
    response: any;
  selectedSuppliers: any;
  selectAllSupplier: any;
    userFilter: any;
    toPage: any;
    fromPage: any;
    collectionSize: any;
    pageSize: any;
    selectedPage: any;
    goToPage: any;
    currentRoute: any;
    url = 'Suppliers';
    meta: {
        totalItemCount: number,
        totalPageCount: number,
        itemsPerPage: number,
        currentPage: number,
        nextPage: number,
    };
    addNew: boolean;
    editExisting: boolean;
    constructor(private _location: Location, public api: ApiService, public modalService: SuiModalService,
                private route: ActivatedRoute, private router: Router) {
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
        this.supplier = new Supplier();
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
            .open(new EditDetail('Edit Suppliers', 'suppliers', id))
            .onApprove(() => {

            })
            .onDeny(() => {
              this.get();
                console.log();
            });
    }
  selectAll() {
    this.selectedSuppliers = [];
    if (this.selectAllSupplier) {
      this.suppliers.forEach(item => {
        item.selected = true;
        this.selectedSuppliers.push(item);
      });
    } else {
      this.suppliers.forEach(item => {
        item.selected = false;
      });
      this.selectedSuppliers = [];
    }
  }
  selectSuppliers(item, i) {
    if (item.selected) {
      this.selectedSuppliers.push(item);
    } else {
      this.selectedSuppliers.splice(i, 1);
      this.selectAllSupplier = false;
    }

  }
  ngOnInit() {
    if(!this.api.checkPermission('Supplier Enroll', 'viewList'))  this.router.navigateByUrl('/home');
    this.addNew = this.api.checkPermission('Supplier Enroll', 'addList');
    this.editExisting = this.api.checkPermission('Supplier Enroll', 'editList');
    this.collapse = !this.addNew;
    
    this.suppliers = [];
    this.selectedSuppliers = [];
    this.meta.currentPage = 1;
        this.get();
    }
    getItemCount() {
        let filter: any = {};
        filter['supplierid'] = this.supplier.supplierid;
        filter = JSON.stringify(filter);
        this.api.getdata('Suppliers/count?where=' + filter ).subscribe( (res: any) => {
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
    // getFilterUrl(){
    //     let filter: any = {};
    //     filter['where'] = {};
    //     filter['order'] = 'supplierid DESC';
    //     return filter;
    // }
    get(search?: boolean) {
        if (search) {
            this.meta.currentPage = 1;
        }
        this.api.getdata('Suppliers?page=' + this.meta.currentPage + '&filter[order]=supplierid DESC').subscribe((res: any) => {
            this.suppliers = res.data;
            this.meta = res.meta;
            console.log(res);
        }, error1 => {
            console.log('Class: , Line:  error1 ', error1);
        });
    }
    viewDetail(id) {
        console.log(id);
        this.modalService
            .open(new ShowDetail('Supplier Details', 'Supplier', id))
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
                this.api.deletedata('Suppliers', id).subscribe(res => {
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
    exporttoExcel(pageRange?: boolean): void {
        const fileName = 'Suppliers';
        const columns = [
            { header: 'Full Name', key: 'suppliername', width: 15 },
            { header: 'Contact Person', key: 'contactperson', width: 15 },
            { header: 'Phone', key: 'telephone', width: 25 },
            { header: 'Email', key: 'email', width: 15 },
            { header: 'Address', key: 'address', width: 15 },
        ];
        if (pageRange) {



            if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
                return;
            }
            const url = {};
            url['order'] = 'supplierid DESC';
            url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
            url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
            this.api.getdata('Suppliers?filter=' + JSON.stringify(url)).subscribe(res => {
                this.api.exportToExcel(columns, res, fileName);
            }, error1 => {
                console.log('Class: , Line:  error1 ', error1);
            });
        } else {
            this.api.exportToExcel(columns, this.selectedSuppliers, fileName);
        }
    }
    exporttoCsv(pageRange?: boolean): void {
        const fileName = 'Suppliers';
        const columns = [
            { header: 'Full Name', key: 'suppliername', width: 15 },
            { header: 'Contact Person', key: 'contactperson', width: 15 },
            { header: 'Phone', key: 'telephone', width: 25 },
            { header: 'Email', key: 'email', width: 15 },
            { header: 'Address', key: 'address', width: 15 },
        ];
        if (pageRange) {



            if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
                return;
            }
            const url = {};
            url['order'] = 'supplierid DESC';
            url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
            url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
            this.api.getdata('Suppliers?filter=' + JSON.stringify(url)).subscribe(res => {
                this.api.exportToCsv(columns, res, fileName);
            }, error1 => {
                console.log('Class: , Line:  error1 ', error1);
            });
        } else {
            this.api.exportToCsv(columns, this.selectedSuppliers, fileName);
        }
    }
    exportToPDF(pageRange?: boolean) {
        if (pageRange) {
            if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
                return;
            }
            const url = {};
            url['order'] = 'supplierid DESC';
            url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
            url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
            this.api.getdata('Suppliers?filter=' + JSON.stringify(url)).subscribe(res => {
                this.api.savePdf(this.getDataForPDF(res), 'A4', 'landscape', 'Supplier', 'auto');
            }, error1 => {
                console.log('here');
                console.log('Class: , Line:  error1 ', error1);
            });
        } else {
            this.api.savePdf(this.getDataForPDF(this.selectedSuppliers), 'A4', 'landscape', 'Supplier' , 'auto');
        }
    }
    printOpen(pageRange?: boolean) {
        if (pageRange) {
            if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
                return;
            }
            const url = {};
            url['order'] = 'supplierid DESC';
            url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
            url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
            this.api.getdata('Suppliers?filter=' + JSON.stringify(url)).subscribe(res => {
                this.api.OpenPrint(this.getDataForPDF(res), 'A4', 'landscape', 'Supplier', 'auto');
            }, error1 => {
                console.log('here');
                console.log('Class: , Line:  error1 ', error1);
            });
        } else {
            this.api.OpenPrint(this.getDataForPDF(this.selectedSuppliers), 'A4', 'landscape', 'Supplier' , 'auto');
        }
    }
    getDataForPDF(data) {
        const Data = [[
            'S.No.',
            'Full Name',
            'Contact Person',
            'Phone',
            'Email',
            'Address',
        ]];
        const exportData = data;
        exportData.forEach((element, i) => {
            Data.push([
                i + 1,
                element.suppliername,
                element.contactperson,
                element.telephone,
                element.email,
                element.address,
            ]);
        });
        return Data;
    }
}
