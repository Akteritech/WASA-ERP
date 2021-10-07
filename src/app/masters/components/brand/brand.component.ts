import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {SuiModalService} from 'ng2-semantic-ui';
import {Location} from '@angular/common';
import {Brand} from '../../models/brand';
import {ApiService} from '../../../api.service';
import {ShowDetail} from '../../../templates/show-detail/show-detail.component';
import {ConfirmModal} from '../../../templates/confirm-modal/confirm-modal.component';
import {EditDetail} from '../../../templates/edit-detail/edit-detail.component';
@Component({
    selector: 'app-brand',
    templateUrl: './brand.component.html',
    styleUrls: ['./brand.component.css']
})

export class BrandComponent implements OnInit {
    userFilter: any;
    p: any;
    collapse = true;
    brands: any;
    optionTemplate: any;
  selectedBrands: any;
  selectAllBrand: any;
    brand: any;
    response: any;
    collectionSize: any;
    pageSize: any;
    selectedPage: any;
    currentRoute: any;
    goToPage: any;
    fromPage: any;
    toPage: any;
    content: any;
    url = 'Brands';
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
    constructor(private _location: Location , public api: ApiService, public modalService: SuiModalService, private route: ActivatedRoute, private router: Router) {
        this.meta = {
            totalItemCount: 0,
            totalPageCount: 0,
            itemsPerPage: 10,
            currentPage: 1,
            nextPage: 0,
        };

        this.brand = new Brand();
        this.route.params.subscribe( params => {
            if (params.id) {
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
    backClicked() {
        this._location.back();
    }
  selectAll() {
    this.selectedBrands = [];
    if (this.selectAllBrand) {
      this.brands.forEach(item => {
        item.selected = true;
        this.selectedBrands.push(item);
      });
    } else {
      this.brands.forEach(item => {
        item.selected = false;
      });
      this.selectedBrands = [];
    }
  }
  selectBrands(item, i) {
    if (item.selected) {
      this.selectedBrands.push(item);
    } else {
      this.selectedBrands.splice(i, 1);
      this.selectAllBrand = false;
    }

  }

  ngOnInit() {
    if(!this.api.checkPermission('Brand', 'viewList'))  this.router.navigateByUrl('/home');
    this.addNew = this.api.checkPermission('Brand', 'addList');
    this.editExisting = this.api.checkPermission('Brand', 'editList');
    this.collapse = !this.addNew;

    this.brands = [];
    this.selectedBrands = [];        this.selectedPage = 1;
        this.get();

    }
    edit(id) {
        console.log(id);
        this.modalService
            .open(new EditDetail('Edit Brand', 'brand', id))
            .onApprove(() => {

            })
            .onDeny(() => {
              this.get();
                console.log();
            });
    }
    goToPageNo() {
        this.meta.currentPage = this.goToPage;
        this.get();
    }
    get() {
        let filter: any = {};
        filter['where'] = {};
        filter['where']['brandname'] = this.brand.brandname;
        filter = JSON.stringify(filter);
        console.log(filter);
        this.api.getdata('Brands?page=' + this.meta.currentPage + '&filter[order]=brandid DESC').subscribe((res: any) => {
            this.brands = res.data;
            this.meta = res.meta;
            console.log(res);
        }, error1 => {
            console.log('Class: , Line:  error1 ', error1);
        });
    }
    viewDetail(id) {
        console.log(id);
        this.modalService
            .open(new ShowDetail('Brand Details', 'brand', id))
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
                this.api.deletedata('Brands', id).subscribe(res => {
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
        this.modalService
            .open(new ShowDetail('Brand Details', 'brand', id))
            .onApprove(() => {

            })
            .onDeny(() => {
                console.log();
            });
        console.log('clicked....');
    }
    optionsSearch = (query) => {
        this.searchBox.dropdownService.setOpenState(true);
        return this.api.getdata('Brands?filter={ "where":{"brandname":{"like":"%25' + query + '%25"}}}').toPromise();
    };
    exporttoExcel(pageRange?: boolean): void {
        const fileName = 'Brands';
        const columns = [
            { header: 'Brand Name', key: 'brandname', width: 15 },
            { header: 'Contact Person', key: 'contactperson', width: 15 },
            { header: 'Telephone', key: 'telephone', width: 25 },
            { header: 'Fax', key: 'fax', width: 15 },
            { header: 'Email', key: 'email', width: 15 },
            { header: 'Specific Price', key: 'specificprice', width: 15 },
        ];
        if (pageRange) {
            if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
                return;
            }
            const url = {};
            url['order'] = 'brandid DESC';
            url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
            url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
            this.api.getdata('Brands?filter=' + JSON.stringify(url)).subscribe(res => {
                this.api.exportToExcel(columns, res, fileName);
            }, error1 => {
                console.log('Class: , Line:  error1 ', error1);
            });
        } else {
            this.api.exportToExcel(columns, this.selectedBrands, fileName);
        }
    }
    exporttoCsv(pageRange?: boolean): void {
        const fileName = 'Brands';
        const columns = [
            { header: 'Brand Name', key: 'brandname', width: 15 },
            { header: 'Contact Person', key: 'contactperson', width: 15 },
            { header: 'Telephone', key: 'telephone', width: 25 },
            { header: 'Fax', key: 'fax', width: 15 },
            { header: 'Email', key: 'email', width: 15 },
            { header: 'Specific Price', key: 'specificprice', width: 15 },
        ];
        if (pageRange) {
            if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
                return;
            }
            const url = {};
            url['order'] = 'brandid DESC';
            url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
            url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
            this.api.getdata('Brands?filter=' + JSON.stringify(url)).subscribe(res => {
                this.api.exportToCsv(columns, res, fileName);
            }, error1 => {
                console.log('Class: , Line:  error1 ', error1);
            });
        } else {
            this.api.exportToCsv(columns, this.selectedBrands, fileName);
        }
    }
    exportToPDF(pageRange?: boolean) {
        if (pageRange) {
            if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
                return;
            }
            const url = {};
            url['order'] = 'brandid DESC';
            url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
            url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
            this.api.getdata('Brands?filter=' + JSON.stringify(url)).subscribe(res => {
                this.api.savePdf(this.getDataForPDF(res), 'A4', 'landscape', 'Brands', ['auto', '*' , 'auto', 'auto', 'auto', 'auto', 'auto']);
            }, error1 => {
                console.log('here');
                console.log('Class: , Line:  error1 ', error1);
            });
        } else {
            this.api.savePdf(this.getDataForPDF(this.selectedBrands), 'A4', 'landscape', 'Brands' , ['auto', '*' , 'auto', 'auto', 'auto', 'auto', 'auto']);
        }
    }
    printOpen(pageRange?: boolean) {
        if (pageRange) {
            if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
                return;
            }
            const url = {};
            url['order'] = 'brandid DESC';
            url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
            url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
            this.api.getdata('Brands?filter=' + JSON.stringify(url)).subscribe(res => {
                this.api.OpenPrint(this.getDataForPDF(res), 'A4', 'landscape', 'Brands', ['auto', '*' , 'auto', 'auto', 'auto', 'auto', 'auto']);
            }, error1 => {
                console.log('here');
                console.log('Class: , Line:  error1 ', error1);
            });
        } else {
          this.api.OpenPrint(this.getDataForPDF(this.selectedBrands), 'A4', 'landscape', 'Brands', ['auto', '*', 'auto', 'auto', 'auto', 'auto', 'auto']);
        }
    }
    getDataForPDF(data) {
        const Data = [[
            'S.No',
            'Brand Name',
            'Contact Person',
            'Telephone',
            'Fax',
            'Email',
            'Specific Price',
        ]];
        const exportData = data;
        exportData.forEach((element, i) => {
            Data.push([
                i + 1,
                element.brandname,
                element.contactperson,
                element.telephone,
                element.fax,
                element.email,
                element.specificprice,
            ]);
        });
        return Data;
    }

    // csv() {
    //     var data = [
    //         {
    //             name: "Anil Singh",
    //             age: 33,
    //             average: 98,
    //             approved: true,
    //             description: "I am active blogger and Author."
    //         },
    //         {
    //             name: 'Reena Singh',
    //             age: 28,
    //             average: 99,
    //             approved: true,
    //             description: "I am active HR."
    //         },
    //         {
    //             name: 'Aradhya',
    //             age: 4,
    //             average: 99,
    //             approved: true,
    //             description: "I am engle."
    //         },
    //     ];
    //
    //     var options = {
    //         fieldSeparator: ',',
    //         quoteStrings: '"',
    //         decimalseparator: '.',
    //         showLabels: true,
    //         showTitle: true,
    //         useBom: true,
    //         noDownload: true,
    //         headers: ["FirstName", "LastName", "UserID"]
    //     };
    //     new Angular5Csv(data, 'MyFileName');
    //     Angular5Csv(data, filename, options);
    // }


}
