import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Location} from "@angular/common";
import {ApiService} from "../../../../../api.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {SuiModalService} from "ng2-semantic-ui";
import {NgForm} from "@angular/forms";
declare let $: any;
export class EmployeeEducation {
  EMP_ID: any;
  DEGREE: any;
  DEGREE_YEAR: any;
  INSTITUTE: any;
  RESULT: any;
  CREATED_BY: any;
  constructor() {
    this.EMP_ID = 0;
    this.DEGREE = 0;
    this.DEGREE_YEAR = 0;
    this.INSTITUTE = 0;
    this.RESULT = 0;
    this.CREATED_BY = sessionStorage.getItem('empid');
  }
}
@Component({
  selector: 'app-employee-education',
  templateUrl: './employee-education.component.html',
  styleUrls: ['./employee-education.component.css']
})
export class EmployeeEducationComponent implements OnInit {
  emp: any;
  gender: any;
  bloodgroups: any;
  nationality: any;
  bankinfo: any;
  maritalstatuses: any;
  religions: any;
  nationalities: any;
  employees: any;
  response: any;
  companies: any;
  departments: string[];
  designations: any;
  currentRoute: any;
  @Output() added = new EventEmitter<boolean>();
  @Input() id: number;
  editId: any;
  collapse1: boolean;
  sections: string[];

  employeeTypes = [
    { type: 'Worker', value: '0' }, { type: 'Officer', value: '1' }, { type: 'Staff', value: '2' }
  ];
  grades: any;
  shifts: any;
  weeklyOffs: any;
   educations: any;
   data: any;
   selectedEmployees: any[];
   selectAllEmployee: any;
   index: any;

  constructor(private _location: Location , public api: ApiService, private route: ActivatedRoute, public modalService: SuiModalService, private router: Router) {
    this.emp = new EmployeeEducation();

    this.route.params.subscribe( params => {
      if (params.id) {
        this.editId = params.id;
        this.getEmpLoyees(params.id);
      }
    });

    this.router.events.subscribe(
        (event: any) => {
          if (event instanceof NavigationEnd) {
            this.currentRoute = this.router.url;
          }
        }
    );
    this.collapse1 = false;
  }
  selectAll() {
    this.selectedEmployees = [];
    if (this.selectAllEmployee) {
      this.employees.forEach(item => {
        item.selected = true;
        this.selectedEmployees.push(item);
      });
    } else {
      this.employees.forEach(item => {
        item.selected = false;
      });
      this.selectedEmployees = [];
    }
  }
  selectEmployees(item, i) {
    if (item.selected === true) {
      this.selectedEmployees.push(item);
      console.log(this.selectedEmployees);
    } else {
      const index = this.selectedEmployees.indexOf(item);
      if (index !== -1) {
        this.selectedEmployees.splice(index, 1);
      }
      console.log(this.selectedEmployees);
      // this.selectedCards = false;
    }
  }
  getEmpLoyees (id) {
    this.api.getdata('employee-educations/getEducation?cardno=' +id).subscribe((res: any) => {
      if (res.length > 0) {
        this.employees = res;
      } else {
        this.api.showInfoToast('No data on this Card No.');
      }
      console.log(res);

    }, err => {
      console.log(err);
    });
  }
   getEmpLoyeess( item, i) {
    this.index = this.employees.indexOf(item);
    // console.log(this.index);
    if (this.index !== -1) {
      this.emp.DEGREE = this.employees[this.index].DEGREE;
      this.emp.DEGREE_YEAR = this.employees[this.index].DEGREE_YEAR;
      this.emp.INSTITUTE = this.employees[this.index].INSTITUTE;
      this.emp.RESULT = this.employees[this.index].RESULT; }
    // console.log(this.employees);
  }

  patch(form: NgForm) {
    this.emp.EMP_ID = this.editId;
    this.api.patchdata('employee-educations/insertEmployeeEducation', this.emp).subscribe((res: any) => {
      this.response = res;
      this.api.showSuccessToast('Employee Added Successfully', this.response.message);
      form.resetForm();
      this.getEmpLoyees(this.editId);
      this.router.navigateByUrl(`hrm/hrmMaster/employee-experience/${this.editId}`);
    }, err => {
      this.api.showFailureToast('Error', err.message);
      console.log(err);
    });
  }


  updateEmp() {
    this.emp.EMP_ID = this.editId;
    this.emp.CREATED_BY = sessionStorage.getItem('empid');
    this.api.patchdata('employee-educations/updateEmployeeEducation', this.emp).subscribe((res: any) => {
      this.response = res;
      this.api.showSuccessToast('Employee Updated Successfully', this.response.message);
      this.getEmpLoyees(this.editId);
    }, err => {
      this.api.showFailureToast('Error', err.message);
      console.log(err);
    });
  }
  getEducation() {
    this.api.getdata('employee-educations/getDegree' ).subscribe( (res: any) => { this.educations = res;});
  }
  ngOnInit() {
    this.selectedEmployees = [];
    this.getEducation();
  }
}
