import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ApiService} from '../../../../api.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
declare var $: any;
import {ProductCategory} from '../../product-categories/add-product-category/add-product-category.component';
export class ProductSubCategory {
  productsubcategoryname: any;
  description: any;
  productcategoryid: any;
  hmproducttype: any;
}
@Component({
  selector: 'app-add-product-sub-category',
  templateUrl: './add-product-sub-category.component.html',
  styleUrls: ['./add-product-sub-category.component.css']
})
export class AddProductSubCategoryComponent implements OnInit {
  prod: any;
  prods: any;
  response: any;
  productCategory: any;
  currentRoute: any;
          @Output() added = new EventEmitter<boolean>();
  @Input() id: number;


  constructor(public api: ApiService,  private route: ActivatedRoute, private router: Router) {
    this.prod = new ProductSubCategory();
    this.route.params.subscribe( param => {
      if (param.id) {
        this.getProduct(param.id);
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
  ngOnInit() {
    if (this.id) {
      this.getProduct(this.id);
    }
    this.getProductCategorytype();
    $('.ui.form')
        .form({
          productcategory: {
            identifier: 'name',
            rules: [
              {
                type: 'empty',
                prompt: '{name}  must have a value'
              }
            ]
          },
          name: {
            identifier: 'name',
            rules: [
              {
                type: 'empty',
                prompt: '{name}  must have a value'
              }
            ]
          },
        }, {
          on: 'blur',
          inline: 'true'
        });
  }
  patch(form: NgForm) {
    if (!this.prod.productcategoryid) {
      this.api.showWarningToast('Product Category must be selected', '');
      return;
    } else if (!this.prod.productsubcategoryname) {
      this.api.showWarningToast('Product Sub Category required', '');
      return;
    }
    this.api.patchdata('ProductSubCategories', this.prod).subscribe(res => {
      this.response = res;
      this.api.showSuccessToast('Success', this.response.message);
                          this.added.emit(true);

      form.resetForm();
    }, err => {
      this.api.showFailureToast('Error', err.message);
      console.log(err);
    });
  }
  getProduct(id) {
    this.api.getdata('ProductSubCategories/' + id).subscribe(res => {
      this.prod = res;
    }, err => {
      console.log('err ', this.prod);

    });
  }
  getProductCategorytype() {
    this.api.getdata('ProductCategories').subscribe(res => {
      this.prods = res;
      console.log(res);
    }, err => {
      console.log('err', this.prod);
    });
  }
}
