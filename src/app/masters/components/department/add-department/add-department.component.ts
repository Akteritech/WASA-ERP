import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from '../../../../api.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
declare var $: any;
export class Department {
    companyId: any;
    deptName: any;
    deptShortName: any;
    description: any;
    deptPosition: any;
    createdDate: any;
    createdBy: any;

}
@Component({
    selector: 'app-add-department',
    templateUrl: './add-department.component.html',
    styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
    department: any;
    response: any;
    departments: any;
    currentRoute: any;
    @Output() added = new EventEmitter<boolean>();
    @Input() id: number;
    constructor(public api: ApiService, private route: ActivatedRoute, private router: Router) {
        this.department = new Department();
        this.route.params.subscribe(param => {
          if (param.id) {
            this.getDepartment(param.id);
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
    patch(form: NgForm) {
        if (!this.department.deptName) {
            this.formValidation();
            this.api.showWarningToast('Warning', 'Department Name is required');
            return ;
        } else if (!this.department.deptShortName) {
            this.api.showWarningToast('Warning', 'Department Short Name is required');
            return ;
        }
        this.api.patchdata('dept', this.department).subscribe(res => {
            this.response = res;
            this.api.showSuccessToast('Department Added Successfully', this.response.message);
            this.get();
            this.added.emit(true);
            this.department = new Department();
          this.get();
          form.resetForm();
        }, err => {
            this.api.showFailureToast('Error', err.message);
            console.log(err);
        });
    }
    get() {
        this.api.getdata('dept').subscribe(res => {
            this.departments = res;
        }, err => {
            console.log('Class: InventoryWarehousesComponent, Line: 28 err ', err);
        });
    }
    getDepartment(id) {
        this.api.getdata('dept/' + id).subscribe( res => {
            this.department = res;
            console.log(res);
        }, err => {
            console.log('Class: InventoryWarehousesComponent, Line: 28 err ', this.department);

        });
    }
    formValidation() {
        $('.ui.form').form({
            name: {
                identifier: 'name',
                rules: [{ type: 'empty', prompt: '{name}  must have a value' }]},
            shortname: {
                identifier: 'shortname',
                rules: [{ type: 'empty', prompt: '{name}  must have a value' }]},
          deptPosition: {
                identifier: 'deptPosition',
                rules: [{ type: 'decimal[0...]', prompt: 'please enter a valid number' }]},
        }, {
            on: 'blur', inline: 'true' });
    }
    ngOnInit() {
      if (this.id) {
        this.getDepartment(this.id);
      }
        this.formValidation();
    }

}
