import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Location} from "@angular/common";
import {ApiService} from "../../../../../api.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {SuiModalService} from "ng2-semantic-ui";
import {NgForm} from "@angular/forms";
import {EmployeePersonal} from "../employee-personal/employee-personal.component";
declare let $: any;
export class EmployeeExperience {
  EMP_ID : any;
  EX_COMPANY : any;
  EX_DESIGNATION : any;
  EX_RESPONSIBILTY : any;
  EX_YEAR : any;
  EX_JOIN_DATE : any;
  EX_RESIGN_DATE : any;
  SPECIAL_QUALIFICATION : any;
  CREATED_BY : any;
  constructor() {
    this.EMP_ID = '';
    this.EX_COMPANY = '';
    this.EX_DESIGNATION = '';
    this.EX_RESPONSIBILTY = '';
    this.EX_YEAR = '';
      this.EX_JOIN_DATE = '';
    this.EX_RESIGN_DATE = '';
    this.SPECIAL_QUALIFICATION = '';
    this.CREATED_BY = sessionStorage.getItem('empid');
  }
}
@Component({
  selector: 'app-employee-experience',
  templateUrl: './employee-experience.component.html',
  styleUrls: ['./employee-experience.component.css']
})
export class EmployeeExperienceComponent implements OnInit {
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
   data: any;
   selectedEmployees: any[];
   selectAllEmployee: any;
   index: any;

  constructor(private _location: Location , public api: ApiService, private route: ActivatedRoute, public modalService: SuiModalService, private router: Router) {
    this.emp = new EmployeeExperience();

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
    this.api.getdata('employee-experiences/getExperience?cardno=' +id).subscribe((res: any) => {
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
  getEmpLoyeess (item, i) {
    this.index = this.employees.indexOf(item);
    // console.log(this.index);
    if (this.index !== -1) {
      this.emp.EX_COMPANY = this.employees[this.index].EX_COMPANY;
      this.emp.EX_DESIGNATION = this.employees[this.index].EX_DESIGNATION;
      this.emp.EX_RESPONSIBILTY = this.employees[this.index].EX_RESPONSIBILTY;
      this.emp.EX_YEAR = this.employees[this.index].EX_YEAR;
      this.emp.EX_JOIN_DATE = this.employees[this.index].EX_JOIN_DATE;
      this.emp.EX_RESIGN_DATE = this.employees[this.index].EX_RESIGN_DATE;
      this.emp.SPECIAL_QUALIFICATION = this.employees[this.index].SPECIAL_QUALIFICATION;
    }
    // console.log(this.employees);
  }


  patch(form: NgForm) {
    // if (!this.emp.identificationmark) {
    //   this.api.showWarningToast('Identification Mark required', '');
    //   return;
    //
    // }
    // this.api.getdata('employee-experiences/getExperience?cardno=' +this.editId).subscribe((res: any) => {
    //   this.data = res[0].EMP_ID;
    // });
    this.emp.EMP_ID = this.editId;
    this.api.patchdata('employee-experiences/insertEmployeeExperience', this.emp).subscribe((res: any) => {
      this.response = res;
      this.api.showSuccessToast('Employee Added Successfully', this.response.message);
      form.resetForm();
      this.getEmpLoyees(this.editId);
    }, err => {
      this.api.showFailureToast('Error', err.message);
      console.log(err);
    });
  }


  updateEmp() {
    this.emp.EMP_ID = this.editId;
    this.emp.CREATED_BY = sessionStorage.getItem('empid');
    this.api.patchdata('employee-experiences/updateEmployeeExperience', this.emp).subscribe((res: any) => {
      this.response = res;
      this.api.showSuccessToast('Employee Updated Successfully', this.response.message);
      this.getEmpLoyees(this.editId);
    }, err => {
      this.api.showFailureToast('Error', err.message);
      console.log(err);
    });
  }

  ngOnInit() {
    this.selectedEmployees = [];
    if (this.id) {
      this.getEmpLoyees(this.id);
    }
    if (this.editId) {
      this.getEmpLoyees(this.editId);

    }
  }


}
