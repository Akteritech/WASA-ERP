import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ApiService} from '../../../../api.service';
import {Customer} from '../../../models/customer';
declare var $: any;
@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  cust: Customer;
  response: any;
  currentRoute: any;

  @Output() added = new EventEmitter<boolean>();
  @Input() id: number;

  constructor(public api: ApiService , private route: ActivatedRoute , private router: Router) {
    this.cust = new Customer();
    this.route.params.subscribe( params => {
      if (params.id) {
        this.getCutomers(params.id);
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

  getCutomers(id) {
    this.api.getdata('Customers/' + id).subscribe((res: any) => this.cust = res);
  }

  formValidation() {
    $('.ui.form').form({
          email: {
            identifier: 'email',
            rules: [
              {
                type: 'email',
                prompt: 'must be a valid e-mail'
              }
            ]
          },
          clientname: {
            identifier: 'clientname',
            rules: [
              {
                type: 'empty',
                prompt: ' must have a value'
              }
            ]
          },
          factorylocation: {
            identifier: 'factorylocation',
            rules: [
              {
                type: 'empty',
                prompt: 'must have a value'
              }
            ]
          },
          contactperson: {
            identifier: 'contactperson',
            rules: [
              {
                type: 'empty',
                prompt: 'must have a value'
              }
            ]
          }
        }, {
          on: 'blur',
          inline: 'true'
        });
  }
  
  patch(form: NgForm) {
    if (!this.cust.clientname) {
      this.formValidation();
      this.api.showWarningToast('Customer Name required', '');
      return ;

    } else if (!this.cust.contactperson) {
      this.formValidation();
      this.api.showWarningToast('Contact Person required', '');
      return;

    } else if (!this.cust.factorylocation) {
      this.formValidation();
      this.api.showWarningToast('Factory Location required', '');
      return;

    } else if (!this.cust.telephone) {
      this.formValidation();
      this.api.showWarningToast('Telephone Number required', '');
      return;

    } else if (!(/(.+)@(.+){2,}\.(.+){2,}/.test(this.cust.email))) {
      this.formValidation();
      this.api.showWarningToast('Valid Email required', '');
      return;

    }
    this.api.patchdata('Customers', this.cust).subscribe(res => {
      this.response = res;
      this.api.showSuccessToast('Customer Added Successfully', this.response.message);
      this.added.emit(true);
      form.resetForm();
    }, err => {
      this.api.showFailureToast('Error', err.message);
      console.log(err);
    });
  }
  ngOnInit() {
    if (this.id) {
      this.getCutomers(this.id);
    }
  }

}
