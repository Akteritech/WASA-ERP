import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ApiService} from '../../../../api.service';
// import {Designation} from '../../../../../models/hrm/designation';
declare var $: any;
export class Designation {
  designation: any;
  designationnameinbangla: any;
  createdby: any;
  reportto: any;
  description: any;
  desigId: any;
  depId: any;
}
@Component({
  selector: 'app-add-designation',
  templateUrl: './add-designation.component.html',
  styleUrls: ['./add-designation.component.css']
})
export class AddDesignationComponent implements OnInit {
  response: any;
  designation: any;
  departments: any;
  currentRoute: any;
  @Output() added = new EventEmitter<boolean>();
  @Input() id: number;

  constructor(public api: ApiService, private route: ActivatedRoute, private router: Router) {
    this.designation = new Designation();
    this.route.params.subscribe( params => {
      if (params.id) {
        this.getDesignation(params.id);
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
      this.getDesignation(this.id);
    }
    this.getDepartment();
    $('.ui.form')
        .form({
          reportto: {
            identifier: 'reportto',
            rules: [
              {
                type: 'empty',
                prompt: 'must have a value'
              }
            ]
          },
          department: {
            identifier: 'department',
            rules: [
              {
                type: 'empty',
                prompt: 'must have a value'
              }
            ]
          },
          d_name: {
            identifier: 'd_name',
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
  getDesignation (id) {
    this.api.getdata('desig/' + id).subscribe(res => {
      this.designation = res;
    }, err => {
      console.log(err);
    });
  }
  getDepartment() {
    this.api.getdata('dept/').subscribe(res => {
      this.departments = res;
    }, err => {
      console.log(err);
    });
  }
  patch(form: NgForm) {
    if (!this.designation.designation) {
      this.api.showWarningToast('Warning', 'Designation Name required');
      return;
    } else if (!this.designation.depId) {
      this.api.showWarningToast('Warning', 'Department must be selected');
      return;
    } else if (!this.designation.reportto) {
      this.api.showWarningToast('Warning', 'Report To required');
      return;
    }
    this.api.patchdata('desig', this.designation).subscribe(res => {
      this.response = res;
      this.api.showSuccessToast('Designation Added Successfully', this.response.message);
      this.added.emit(true);
      form.resetForm();
    }, err => {
      this.api.showFailureToast('Error', err.message);
      console.log(err);
    });
  }
}
