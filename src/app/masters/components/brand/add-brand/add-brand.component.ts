import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ApiService} from '../../../../api.service';
import {BrandComponent} from '../brand.component';
import {Brand} from '../../../models/brand';
declare var $: any;
@Component({
    selector: 'app-add-brand',
    templateUrl: './add-brand.component.html',
    styleUrls: ['./add-brand.component.css'],
    providers: [BrandComponent]
})
export class AddBrandComponent implements OnInit {
    brand: any;
    response: any;
    currentRoute: any;
    pageSize: any;
    selectedPage: any;
    brands: any;
    goToPage: any;
    collectionSize: any;
    @Output() added = new EventEmitter<boolean>();
    @Input() id: number;
    constructor(public api: ApiService , private route: ActivatedRoute, private router: Router, public comp: BrandComponent) {
        this.pageSize = 15;
        this.collectionSize = 0;
        this.brand =  new Brand();
        this.route.params.subscribe( params => {
            if (params.id) {
                this.getBrand(params.id);
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
        this.getBrand(this.id);
      }
    }
    get() {
        let filter: any = {};
        filter['where'] = {};
        filter['where']['brandname'] = this.brand.brandname;
        filter['limit'] = this.pageSize;
        filter['skip'] = (this.selectedPage - 1) * this.pageSize;
        filter = JSON.stringify(filter);
        console.log(filter);
        this.api.getdata('Brands?filter=' + filter).subscribe(res => {
            this.brands = res;
            console.log(res);
        }, error1 => {
            console.log('Class: , Line:  error1 ', error1);
        });
    }
    getBrand (id) {
        this.api.getdata('Brands/' + id).subscribe(res => {
            this.brand = res;
        }, err => {
            console.log(err);
        });
    }
    formValidation() {
        $('.ui.form')
            .form({
                email: {
                    identifier: 'email',
                    rules: [
                        {
                            type: 'email',
                            prompt: ' {name} must be a valid e-mail'
                        }
                    ]
                },
                brandname: {
                    identifier: 'brandname',
                    rules: [
                        {
                            type: 'empty',
                            prompt: '{name} must have a value'
                        }
                    ]
                },
                contactperson: {
                    identifier: 'contactperson',
                    rules: [
                        {
                            type: 'empty',
                            prompt: ' {name} must have a value'
                        }
                    ]
                }
            }, {
                on: 'blur',
                inline: 'true'
            });
    }
    patch(form: NgForm) {
        if (!this.brand.brandname) {
            this.formValidation();
            this.api.showWarningToast('Brand Name required', '');
            return ;

        } else if (!this.brand.contactperson) {
            this.formValidation();
            this.api.showWarningToast('Contact Person required', '');
            return;

         } else if (!this.brand.telephone) {
            this.formValidation();
            this.api.showWarningToast('Telephone required', '');
            return;

         }  else if (!(/(.+)@(.+){2,}\.(.+){2,}/.test(this.brand.email))) {
            this.formValidation();
            this.api.showWarningToast('Valid Email required', '');
            return;
        }
        this.api.patchdata('Brands', this.brand).subscribe(res => {
            this.response = res;
            this.api.showSuccessToast('Brand Added Successfully', this.response.message);
            form.resetForm();
            this.added.emit(true);
            this.comp.get();
            this.get();
        }, err => {
            this.api.showFailureToast('Error', err.message);
            console.log(err);
        });
    }
}
