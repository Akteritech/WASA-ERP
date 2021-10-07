import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ApiService} from '../../../../api.service';
import {SuiModalService} from 'ng2-semantic-ui';
declare var $: any;
export class ProductCategory {
  productcategoryname: any;
  description: any;
  productcategoryid: any;
}
@Component({
  selector: 'app-add-product-category',
  templateUrl: './add-product-category.component.html',
  styleUrls: ['./add-product-category.component.css']
})
export class AddProductCategoryComponent implements OnInit {
  collapse = true;
  prod: any;
  response: any;
  productCategory: any;
  @Output() added = new EventEmitter<boolean>();
    @Input() id: number;
    currentRoute: any;
  constructor(public api: ApiService , private route: ActivatedRoute , private router: Router) {
    this.prod = new ProductCategory();
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
  getProduct(id) {
    this.api.getdata('ProductCategories/' + id).subscribe(res => {
      this.prod = res;
    }, err => {
      console.log('err ', this.prod);

    });
  }
  get() {
    this.api.getdata('ProductCategories').subscribe(res => {
      this.productCategory = res;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  patch(form: NgForm) {
    if (!form.valid) {
      this.api.showWarningToast('Warning', 'please fill required fields first.');
      return;
    }
    this.api.patchdata('ProductCategories', this.prod).subscribe(res => {
      this.response = res;
      this.api.showSuccessToast('Success', this.response.message);
      form.resetForm();
      this.added.emit(true);
    }, err => {
      this.api.showFailureToast('Error', err.message);
      console.log(err);
    });
  }
  ngOnInit() {
    if (this.id) {
      this.getProduct(this.id);
    }
    this.get();
      $('.ui.form')
          .form({
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

}
