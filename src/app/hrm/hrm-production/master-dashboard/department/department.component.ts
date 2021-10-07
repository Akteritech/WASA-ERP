import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from "../../../../api.service";
import { SuiModalService } from "ng2-semantic-ui";
import { EditDetail } from "../../../../templates/edit-detail/edit-detail.component";
import { NgForm } from "@angular/forms";
import { Location } from "@angular/common";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { EmployeeEducation } from "../employee-profile/employee-education/employee-education.component";
import { Observable } from "rxjs";
export class Department {
  CommandID: any;
  DEPARTMENT_ID: any;
  DIVISION_ID: any;
  DeptEngNm: any;
  DeptBngNm: any;
  UpdateBy: any;
  Status: any;
  Section: any;
  Remarks: any;
  DptPos: any;
  constructor() {
    this.CommandID = '';
    this.DEPARTMENT_ID = '';
    this.DIVISION_ID = '';
    this.DeptEngNm = '';
    this.DeptBngNm = '';
    this.UpdateBy = '';
    this.Status = '';
    this.Section = '';
    this.Remarks = '';
    this.DptPos = '';
  }
}

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})

export class DepartmentComponent implements OnInit {

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
  department: Department;
  meta: {
    totalItemCount: number, totalPageCount: number, itemsPerPage: number, currentPage: number,
  };
  collapse = false;
  collectionSize: number;
  goToPage: number;
  fromPage: number;
  toPage: number;
  sectionData: any;
  allsectionData: any;
  divisions: any;
  departmenttabledata: any;
  alldepartmenttabledata: any;
  datas: any;
  Name: string;
  SerachText: string;
  constructor(private _location: Location, public api: ApiService, private route: ActivatedRoute, public modalService: SuiModalService, private router: Router) {
    this.department = new Department();

    this.goToPage = 1;
    this.collectionSize = 0;
    this.meta = {
      totalItemCount: 0,
      totalPageCount: 0,
      itemsPerPage: 10,
      currentPage: 1,
    };
    this.route.params.subscribe(params => {
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

  getEmpLoyees(id) {
    this.api.getdata('icg-departments/getDataOnEdit?departmentid=' + id.replace('#', '|')).subscribe((res: any) => {
      if (res.length > 0) {
        this.department = res[0];
      } else {
        this.api.showInfoToast('No data on this Card No.');
      }
      console.log(res);

    }, err => {
      console.log(err);
    });
  }

  patch(form: NgForm) {
    this.api.patchdata('icg-departments/insertIcgDepartment', this.department).subscribe((res: any) => {
      this.response = res;
      this.api.showSuccessToast('Department Added Successfully', this.response.message);
      form.resetForm();
    }, err => {
      this.api.showFailureToast('Error', err.message);
      console.log(err);
    });
  }


  updateEmp() {
    this.api.patchdata('icg-departments/updateIcgDepartment', this.department).subscribe((res: any) => {
      this.response = res;
      this.api.showSuccessToast('Department Updated Successfully', this.response.message);
    }, err => {
      this.api.showFailureToast('Error', err.message);
      console.log(err);
    });
  }

  getDivision = () => {
    this.api.getdata('icg-departments/getDivision').subscribe((resp: any) => {
      this.divisions = resp;

    });
  }

  getDepartment = () => {
    this.api.getdata('icg-departments/getDepartment').subscribe((resp: any) => {
      this.departments = resp;

    });
  }

  getTableData = () => {
    this.api.getdata('icg-departments/getTableData').subscribe((res: any) => {
      this.departmenttabledata = res.slice(0, 10);
      this.alldepartmenttabledata = res;
      this.meta.totalItemCount = res.length;
    });
  }

  pageChange() {
    const start = (this.meta.currentPage - 1) * this.meta.itemsPerPage;
    const end = start + this.meta.itemsPerPage
    this.departmenttabledata = this.alldepartmenttabledata.slice(start, end);
  }

  ngOnInit() {
    this.selectedEmployees = [];
    this.getDivision();
    this.getDepartment();
    this.getTableData();
  }

  search() {
    this.api.getdata('hrm-weekendsetups/searchHRMConfiguration?Name=' + this.Name + `&SerachText=` + this.SerachText).subscribe((res: any) => {
      this.datas = res.result;
    });
  }

  reset() {

  }
  
  backClicked() {
    this._location.back();
  }

}
