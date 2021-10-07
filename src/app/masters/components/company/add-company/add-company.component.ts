import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Company} from '../../../models/company';
import {ApiService} from '../../../../api.service';
import {Location} from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
  company: any;
  response: any;
  Companies: any;
  currentRoute: any;
  imageSrc: string;
  file: any;
  @Output() added = new EventEmitter<boolean>();
  @Input() id: number;
  constructor(private _location: Location, public api: ApiService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(param => {
      if (param.id) {
        this.getCompany(param.id);
      }
    });
    this.router.events.subscribe(
        (event: any) => {
          if (event instanceof NavigationEnd) {
            this.currentRoute = this.router.url;
          }
        }
    );
    this.company = new Company();
  }
  formValidation() {
    $('.ui.form')
        .form({
          email: {
            identifier: 'email',
            rules: [{
              type: 'empty',
              prompt: 'Please enter your email'
            }, {
              type: 'email',
              prompt: 'Please enter a valid email'
            }]
          },
          name1: {
            identifier: 'name1',
            rules: [
              {
                type: 'empty',
                prompt: ' must have a value'
              }
            ]
          },
          shortName: {
            identifier: 'shortName',
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
    if (!this.company.companyname) {
      this.formValidation();
      this.api.showWarningToast('Company Name required', '');
      return ;

    } else if (!this.company.shortname) {
      this.formValidation();
      this.api.showWarningToast('Short Name required', '');
      return;

    } else if (!(/(.+)@(.+){2,}\.(.+){2,}/.test(this.company.email))) {
      this.formValidation();
      this.api.showWarningToast('Valid Email required', '');
      return;

    } else if (!this.company.imagepath) {
      this.formValidation();
      this.api.showWarningToast('Please Select Image First', '');
      return;

    }
      this.api.patchdata('comp', this.company).subscribe(res1 => {
        this.response = res1;
        this.get();
        this.added.emit(true);
        this.company = new Company();
          this.api.showSuccessToast('Success', this.response.message);
        form.resetForm();
      }, err => {
        this.api.showFailureToast('Error', err.message);
        console.log(err);
      });
  }
  getCompany(id) {
    this.api.getdata('comp/' + id).subscribe(res => {
      this.company = res;
      console.log(res);
    }, err => {
      console.log(err);

    });
  }
  handleFileInput(files: FileList) {
    const file = files.item(0);
    const folder = 'companies';
    console.log(file);
    // this.emp.imagePath = file.name;
    this.api.uploadFile(folder, file).subscribe(res => {
      this.company.imagepath = 'fileuploads/' + folder +  '/download/'  + file.name;

    }, err => {
      console.log(err);
    });
  }
  get() {
    this.api.getdata('comp').subscribe(res => {
      this.Companies = res;
    }, err => {
      console.log(err);
    });
  }
  ngOnInit() {
    if (this.id) {
      this.getCompany(this.id);
    }
    this.get();
  }
  backClicked() {
    this._location.back();
  }

}
