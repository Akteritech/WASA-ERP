import {Component, OnInit, ViewChild} from '@angular/core';
import {SuiModalService} from 'ng2-semantic-ui';
import {ApiService} from '../../../api.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ProductSubCategory} from './add-product-sub-category/add-product-sub-category.component';
import {Location} from '@angular/common';
import {ShowDetail} from '../../../templates/show-detail/show-detail.component';
import {ConfirmModal} from '../../../templates/confirm-modal/confirm-modal.component';
import {EditDetail} from '../../../templates/edit-detail/edit-detail.component';

@Component({
    selector: 'app-product-sub-categories',
    templateUrl: './product-sub-categories.component.html',
    styleUrls: ['./product-sub-categories.component.css']
})
export class ProductSubCategoriesComponent implements OnInit {
    userFilter: any;
    p: any;
  selectedProdcats: any;
  selectAllProdcat: any;
    collapse = true;
    subproduct: any;
    filter: any;
    response: any;
    fromPage: any;
    toPage: any;
    collectionSize: any;
    pageSize: any;
    selectedPage: any;
    goToPage: any;
    currentRoute: any;
    prod: any;
    url = 'ProductSubCategories';
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
        this.route.params.subscribe(param => {
            if (param.id) {
                this.collapse = false;
            }
        });
        this.prod = new ProductSubCategory();
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
            .open(new EditDetail('Edit Product Sub Categories', 'product sub categories', id))
            .onApprove(() => {

            })
            .onDeny(() => {
              this.get();
                console.log();
            });
    }
    // search() {
    //     let filter: any = {};
    //     filter['where'] = {};
    //     filter['where']['productsubcategoryid'] = this.prod.productsubcategoryid;
    //     filter['where']['type'] = this.prod.contactperson;
    //     filter['where']['description'] = this.prod.email;
    //     filter['limit'] = this.pageSize;
    //     filter['skip'] = (this.selectedPage - 1) * this.pageSize;
    //     filter = JSON.stringify(filter);
    //     console.log(filter);
    //     this.api.getdata(this.url + '?filter=' + filter).subscribe((res: any) => {
    //         console.log(res);
    //         this.subproduct = res;
    //     }, err => {
    //         console.log(err);
    //     });
    // }
  selectAll() {
    this.selectedProdcats = [];
    if (this.selectAllProdcat) {
      this.subproduct.forEach(item => {
        item.selected = true;
        this.selectedProdcats.push(item);
      });
    } else {
      this.subproduct.forEach(item => {
        item.selected = false;
      });
      this.selectedProdcats = [];
    }
  }
  selectProdcats(item, i) {
    if (item.selected) {
      this.selectedProdcats.push(item);
    } else {
      this.selectedProdcats.splice(i, 1);
      this.selectAllProdcat = false;
    }
  }
  alert(id): void {
    console.log(id);
    this.modalService
      .open(new ShowDetail('Product Sub-Categories Details', 'ProductSubCategory', id))
      .onApprove(() => {

      })
      .onDeny(() => {
        console.log();
      });
  }

  optionsSearch = (query) => {
    this.searchBox.dropdownService.setOpenState(true);
    return this.api.getdata('ProductSubCategories?filter={ "where":{"productsubcategoryname":{"like":"%25' + query + '%25"}}}').toPromise();
  }

  ngOnInit() {
    if(!this.api.checkPermission('Product Sub Category', 'viewList'))  this.router.navigateByUrl('/home');
    this.addNew = this.api.checkPermission('Product Sub Category', 'addList');
    this.editExisting = this.api.checkPermission('Product Sub Category', 'editList');
    this.collapse = !this.addNew;
    
    this.subproduct = [];
    this.selectedProdcats = [];
        this.meta.currentPage = 1;
        this.get();
    }
    getItemCount() {
        let filter: any = {};
        filter['productsubcategoryid'] = this.prod.productsubcategoryid;
        filter = JSON.stringify(filter);
        this.api.getdata('Brands/count?where=' + filter ).subscribe( (res: any) => {
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
        filter['include'] = ['productCategory'];
        filter['order'] = 'productsubcategoryid DESC';
        return filter;
    }
    get(search?: boolean) {
        if (search) {
            this.meta.currentPage = 1;
        }
        this.api.getdata('ProductSubCategories?page=' + this.meta.currentPage + '&filter=' + JSON.stringify(this.getFilterUrl())).subscribe((res: any) => {
            this.subproduct = res.data;
            this.meta = res.meta;
            console.log(res);
        }, error1 => {
            console.log('Class: , Line:  error1 ', error1);
        });
    }
    viewDetail(id) {
        console.log(id);
        this.modalService
            .open(new ShowDetail('Product Sub Category Details', 'ProductSubCategory', id))
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
                this.api.deletedata('ProductSubCategories', id).subscribe((res: any) => {
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
    mapData(subCat) {
        return {
            productsubcategoryname : subCat.productsubcategoryname,
            productCategory : subCat.productCategory ? subCat.productCategory.productcategoryname : '',
            description : subCat.description,
        };
    }
    exporttoExcel(pageRange?: boolean): void {
        const fileName = 'Product Sub-Category';
        const columns = [
            { header: 'Sub Category', key: 'productsubcategoryname', width: 20 },
            { header: 'Category', key: 'productCategory', width: 15 },
            { header: 'Description', key: 'description', width: 20 },
        ];
        if (pageRange) {
            if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
                return;
            }
            const url = this.getFilterUrl();
            url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
            url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
            this.api.getdata('ProductSubCategories?filter=' + JSON.stringify(url)).subscribe((res: any) => {
                this.api.exportToExcel(columns, res.map(this.mapData), fileName);
            }, error1 => {
                console.log('Class: , Line:  error1 ', error1);
            });
        } else {
            this.api.exportToExcel(columns, this.selectedProdcats.map(this.mapData), fileName);
        }
    }
    exporttoCsv(pageRange?: boolean): void {
        const fileName = 'Product Sub-Category';
        const columns = [
            { header: 'Sub Category', key: 'productsubcategoryname', width: 20 },
            { header: 'Category', key: 'productCategory', width: 15 },
            { header: 'Description', key: 'description', width: 20 },
        ];
        if (pageRange) {
            if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
                return;
            }
            const url = this.getFilterUrl();
            url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
            url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
            this.api.getdata('ProductSubCategories?filter=' + JSON.stringify(url)).subscribe((res: any) => {
                this.api.exportToCsv(columns, res.map(this.mapData), fileName);
            }, error1 => {
                console.log('Class: , Line:  error1 ', error1);
            });
        } else {
            this.api.exportToCsv(columns, this.selectedProdcats.map(this.mapData), fileName);
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
            this.api.getdata('ProductSubCategories?filter=' + JSON.stringify(url)).subscribe((res: any) => {
                this.api.savePdf(this.getDataForPDF(res), 'A4', 'landscape', 'Sub-Category', ['auto', '*' , '*', 'auto']);
            }, error1 => {
                console.log('here');
                console.log('Class: , Line:  error1 ', error1);
            });
        } else {
            this.api.savePdf(this.getDataForPDF(this.selectedProdcats), 'A4', 'landscape', 'Sub-Category' , ['auto', '*' , '*', 'auto']);
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
            this.api.getdata('ProductSubCategories?filter=' + JSON.stringify(url)).subscribe((res: any) => {
                this.api.OpenPrint(this.getDataForPDF(res), 'A4', 'landscape', 'Sub-Category', ['auto', '*' , '*', 'auto']);
            }, error1 => {
                console.log('here');
                console.log('Class: , Line:  error1 ', error1);
            });
        } else {
            this.api.OpenPrint(this.getDataForPDF(this.selectedProdcats), 'A4', 'landscape', 'Sub-Category' , ['auto', '*' , '*', 'auto']);
        }
    }
    getDataForPDF(data) {
        const Data = [[
            'S.No.',
            'Sub Category',
            'Category',
            'Description'
        ]];
        const exportData = data.map(this.mapData);
        exportData.forEach((element, i) => {
            Data.push([
                i + 1,
                element.productsubcategoryname,
                element.productCategory,
                element.description,
            ]);
        });
        return Data;
    }
}
