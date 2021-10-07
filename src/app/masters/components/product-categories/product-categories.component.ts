import {Component, OnInit, ViewChild} from '@angular/core';
import {SuiModalService} from 'ng2-semantic-ui';
import {ApiService} from '../../../api.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ProductCategory} from './add-product-category/add-product-category.component';
import {Location} from '@angular/common';
import {ShowDetail} from '../../../templates/show-detail/show-detail.component';
import {ConfirmModal} from '../../../templates/confirm-modal/confirm-modal.component';
import {EditDetail} from '../../../templates/edit-detail/edit-detail.component';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css']
})
export class ProductCategoriesComponent implements OnInit {
  collapse = true;
  response: any;
    collectionSize: any;
  selectedProdcats: any;
  selectAllProdcat: any;
    pageSize: any;
    selectedPage: any;
    goToPage: any;
    currentRoute: any;
    prod: any;
    fromPage: any;
    toPage: any;
    productCategory: any;
    categories: any;
    userFilter: any;
    p: any;
    url = 'ProductCategories';
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
        this.route.params.subscribe(param => {
          if (param.id) {
              this.collapse = false;
          }
      });
        this.prod = new ProductCategory();
        this.router.events.subscribe(
            (event: any) => {
                if (event instanceof NavigationEnd) {
                    this.currentRoute = this.router.url;
                }
            }
        );
  }
  selectAll() {
    this.selectedProdcats = [];
    if (this.selectAllProdcat) {
      this.categories.forEach(item => {
        item.selected = true;
        this.selectedProdcats.push(item);
      });
    } else {
      this.categories.forEach(item => {
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
      .open(new ShowDetail('Product Category Details', 'ProductCategory', id))
      .onApprove(() => {

      })
      .onDeny(() => {
        console.log();
      });
  }

  optionsSearch = (query) => {
    this.searchBox.dropdownService.setOpenState(true);
    return this.api.getdata('ProductCategories?filter={ "where":{"productategoryname":{"like":"%25' + query + '%25"}}}').toPromise();
  }
  ngOnInit() {
    if(!this.api.checkPermission('Product Category', 'viewList'))  this.router.navigateByUrl('/home');
    this.addNew = this.api.checkPermission('Product Category', 'addList');
    this.editExisting = this.api.checkPermission('Product Category', 'editList');
    this.collapse = !this.addNew;
    
    this.categories = [];
    this.selectedProdcats = [];
    this.meta.currentPage  = 1;
       this.get();
    }
    edit(id) {
        console.log(id);
        this.modalService
            .open(new EditDetail('Edit Product Categories', 'product categories', id))
            .onApprove(() => {

            })
            .onDeny(() => {
              this.get();
                console.log();
            });
    }
    getItemCount() {
        let filter: any = {};
        filter['productcategoryid'] = this.prod.productcategoryid;
        filter = JSON.stringify(filter);
        this.api.getdata('ProductCategories/count?where=' + filter ).subscribe( (res: any) => {
            this.collectionSize = res.count;
            this.meta.currentPage  = 1;
            this.get();
        }, err => {
            console.log(err);
        });
    }
    goToPageNo() {
        this.meta.currentPage = this.goToPage;
        this.get();
    }
    get() {
        this.api.getdata('ProductCategories?page=' + this.meta.currentPage + '&filter[order]=productcategoryid DESC').subscribe((res: any) => {
            this.categories = res.data;
            this.meta = res.meta;
            console.log(res);
        }, error1 => {
            console.log('Class: , Line:  error1 ', error1);
        });
    }
    viewDetail(id) {
        console.log(id);
        this.modalService
            .open(new ShowDetail('Product Category Details', 'ProductCategory', id))
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
                this.api.deletedata('ProductCategories', id).subscribe((res: any) => {
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
        const fileName = 'Product Categories';
        const columns = [
            { header: 'Category Name', key: 'productcategoryname', width: 15 },
            { header: 'Description', key: 'description', width: 15 },
        ];
        if (pageRange) {
            if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
                return;
            }
            const url = {};
            url['order'] = 'productcategoryid DESC';
            url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
            url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
            this.api.getdata('ProductCategories?filter=' + JSON.stringify(url)).subscribe((res: any) => {
                this.api.exportToExcel(columns, res, fileName);
            }, error1 => {
                console.log('Class: , Line:  error1 ', error1);
            });
        } else {
            this.api.exportToExcel(columns, this.selectedProdcats, fileName);
        }
    }
    exporttoCsv(pageRange?: boolean): void {
        const fileName = 'Product Categories';
        const columns = [
            { header: 'Category Name', key: 'productcategoryname', width: 15 },
            { header: 'Description', key: 'description', width: 15 },
        ];
        if (pageRange) {
            if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
                return;
            }
            const url = {};
            url['order'] = 'productcategoryid DESC';
            url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
            url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
            this.api.getdata('ProductCategories?filter=' + JSON.stringify(url)).subscribe((res: any) => {
                this.api.exportToCsv(columns, res, fileName);
            }, error1 => {
                console.log('Class: , Line:  error1 ', error1);
            });
        } else {
            this.api.exportToCsv(columns, this.selectedProdcats, fileName);
        }
    }
    exportToPDF(pageRange?: boolean) {
        if (pageRange) {
            if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
                return;
            }
            const url = {};
            url['order'] = 'productcategoryid DESC';
            url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
            url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
            this.api.getdata('ProductCategories?filter=' + JSON.stringify(url)).subscribe((res: any) => {
                this.api.savePdf(this.getDataForPDF(res), 'A4', 'landscape', 'Product_Category', ['auto', '*', 'auto']);
            }, error1 => {
                console.log('here');
                console.log('Class: , Line:  error1 ', error1);
            });
        } else {
            this.api.savePdf(this.getDataForPDF(this.selectedProdcats), 'A4', 'landscape', 'Product_Category' , ['auto', '*', 'auto']);
        }
    }
    printOpen(pageRange?: boolean) {
        if (pageRange) {
            if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
                return;
            }
            const url = {};
            url['order'] = 'productcategoryid DESC';
            url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
            url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
            this.api.getdata('ProductCategories?filter=' + JSON.stringify(url)).subscribe((res: any) => {
                this.api.OpenPrint(this.getDataForPDF(res), 'A4', 'landscape', 'Product_Category', ['auto', '*', 'auto']);
            }, error1 => {
                console.log('here');
                console.log('Class: , Line:  error1 ', error1);
            });
        } else {
            this.api.OpenPrint(this.getDataForPDF(this.selectedProdcats), 'A4', 'landscape', 'Product_Category' , ['auto', '*', 'auto']);
        }
    }
    getDataForPDF(data) {
        const Data = [[
            'S.No.',
            'Category Name',
            'Description'
        ]];
        const exportData = data;
        exportData.forEach((element, i) => {
            Data.push([
                i + 1,
                element.productcategoryname,
                element.description,
            ]);
        });
        return Data;
    }
}
