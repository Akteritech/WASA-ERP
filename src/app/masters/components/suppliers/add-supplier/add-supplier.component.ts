import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from '../../../../api.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
declare var $: any;
export class Supplier {
    suppliername: any;
    address: any;
    contactperson: any;
    telephone: any;
    email: any;
    isforeign: boolean;
}
@Component({
    selector: 'app-add-supplier',
    templateUrl: './add-supplier.component.html',
    styleUrls: ['./add-supplier.component.css'],

})
export class AddSupplierComponent implements OnInit {
    supplier: any;
    response: any;
    currentRoute: any;
    suppliers: any;
    registerForm: FormGroup;
    submitted = false;
    @Output() added = new EventEmitter<boolean>();
    @Input() id: number;

    constructor(public api: ApiService, private route: ActivatedRoute, private router: Router, public formBuilder: FormBuilder) {
        this.supplier = new Supplier();
        this.route.params.subscribe(params => {
            if (params.id) {
                this.getSupplier(params.id);
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

    getSupplier(id) {
        this.api.getdata('Suppliers/' + id).subscribe(res => {
            this.supplier = res;
        }, err => {
            console.log(err);
        });
    }

    get() {
        this.api.getdata('Suppliers').subscribe(res => {
            this.suppliers = res;
            console.log(res);
        }, err => {
            console.log('err', this.supplier);
        });
    }
    patch(form: NgForm) {
        if (!this.supplier.suppliername) {
            this.formValidation();
            this.api.showWarningToast('Supplier Name required', '');
            return ;

        } else if (!this.supplier.address) {
            this.formValidation();
            this.api.showWarningToast('Address required', '');
            return;

        } else if (!this.supplier.telephone) {
            this.formValidation();
            this.api.showWarningToast('Phone Number required', '');
            return;

        } else if (!(/(.+)@(.+){2,}\.(.+){2,}/.test(this.supplier.email))) {
            this.formValidation();
            this.api.showWarningToast('Valid Email required', '');
            return;

        }
        this.api.patchdata('Suppliers', this.supplier).subscribe(res => {
            this.response = res;
            this.api.showSuccessToast('Success', this.response.message);
            this.added.emit(true);
            form.resetForm();
        }, err => {
            this.api.showFailureToast('Error', err.message);
            console.log(err);
        });
    }
    formValidation() {
        $('.ui.form')
            .form({
                name: {
                    identifier: 'name',
                    rules: [
                        {
                            type: 'empty',
                            prompt: '{name} must have a value'
                        }, {
                            type: 'empty',
                            prompt: '{name} is not a valid email'
                        }
                    ]
                },
                Address: {
                    identifier: 'Address',
                    rules: [
                        {
                            type: 'empty',
                            prompt: '{name} must have address'
                        }
                    ]
                },
                email: {
                    identifier: 'email',
                    rules: [
                        {
                            type: 'empty',
                            prompt: '{name} must in format xxxx@xx.xx'
                        }
                    ]
                },
            }, {
                on: 'blur',
                inline: 'true'
            });
    }
    ngOnInit() {
      if (this.id) {
        this.getSupplier(this.id);
      }
      this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
        this.formValidation();
    }
}
