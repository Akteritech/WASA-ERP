import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from "../../../../api.service";
import { SuiModalService } from "ng2-semantic-ui";
import { EditDetail } from "../../../../templates/edit-detail/edit-detail.component";
import { Location } from "@angular/common";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { EmployeeEducation } from "../employee-profile/employee-education/employee-education.component";
export class Division {
  CommandID: any;
  DIVISION_ID: any;
  DIVISION_NAME_ENG: any;
  UpdateBy: any;
  DIVISION_NAME_BNG: any;
  Remarks: any;
  Status: any;
  Weekend: any;
  DivissionAddress: any;
  DivissionAddressBangla: any;
  collapse: false;
  constructor() {
    this.CommandID = '';
    this.DIVISION_ID = '';
    this.DIVISION_NAME_ENG = '';
    this.UpdateBy = '';
    this.DIVISION_NAME_BNG = '';
    this.Remarks = '';
    this.Status = '';
    this.Weekend = '';
    this.DivissionAddress = '';
    this.DivissionAddressBangla = '';
  }
}

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.css']
})
export class DivisionComponent implements OnInit {
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
  data: any;
  selectedEmployees: any[];
  selectAllEmployee: any;
  index: any;
  division: any;
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
  divisiontabledata: any;
  alldivisiondata: any;
  datas: any;
  Name: string;
  SerachText: string;

  constructor(private _location: Location, public api: ApiService, private route: ActivatedRoute, public modalService: SuiModalService, private router: Router) {
    this.division = new Division();
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
    this.api.getdata('icg-divisions/getDataOnEdit?divisionid=' + id.replace('#', '|')).subscribe((res: any) => {
      if (res.length > 0) {
        this.division = res[0];
      } else {
        this.api.showInfoToast('No data on this Card No.');
      }
      console.log(res);

    }, err => {
      console.log(err);
    });
  }

  patch(form: NgForm) {
    this.api.patchdata('icg-divisions/insertIcgDivision', this.division).subscribe((res: any) => {
      this.response = res;
      this.api.showSuccessToast('Unit Added Successfully', this.response.message);
      form.resetForm();
    }, err => {
      this.api.showFailureToast('Error', err.message);
      console.log(err);
    });
  }

  getTableData = () => {
    this.api.getdata('icg-divisions/getTableData').subscribe((res: any) => {
      this.divisiontabledata = res.slice(0, 10);
      this.alldivisiondata = res;
      this.meta.totalItemCount = res.length;
    });
  }

  pageChange() {
    const start = (this.meta.currentPage - 1) * this.meta.itemsPerPage;
    const end = start + this.meta.itemsPerPage
    this.divisiontabledata = this.alldivisiondata.slice(start, end);
  }


  updateEmp() {
    this.api.patchdata('icg-divisions/updateIcgDivision', this.division).subscribe((res: any) => {
      this.response = res;
      this.api.showSuccessToast('Unit Updated Successfully', this.response.message);
    }, err => {
      this.api.showFailureToast('Error', err.message);
      console.log(err);
    });
  }

  ngOnInit() {
    this.selectedEmployees = [];
    this.getTableData();
  }

  search() {
    this.api.getdata('hrm-weekendsetups/searchHRMConfiguration?Name=' + this.Name + `&SerachText=` + this.SerachText).subscribe((res: any) => {
      this.datas = res.result;
    });
  }

  reset(){

  }

  backClicked() {
    this._location.back();
}

}
