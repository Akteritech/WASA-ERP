import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-employee-shift',
  templateUrl: './employee-shift.component.html',
  styleUrls: ['./employee-shift.component.css']
})
export class EmployeeShiftComponent implements OnInit {
  shifts: any[];
  shift: string;
  changedShift: string;
  employees: any[];
  departments: string[];
  department: string;
  fromdate: Date;
  todate: Date;
  meta: {
    totalItemCount: number,
    totalPageCount: number,
    itemsPerPage: number,
    currentPage: number,
    nextPage: number,
  };
  allCheck: boolean = false;
  checks: boolean[];
  companies: string[];
  sections: any[];
  allSections: any[];
  cardNo: any;
  companyname: any;
  section: any;
  Roster:boolean = false;
  constructor(private _location: Location, private api: ApiService) {
    this.fromdate = new Date();
    this.todate = new Date();
    this.meta = {
      totalItemCount: 0, totalPageCount: 0, itemsPerPage: 25, currentPage: 1, nextPage: 0,
    };
    this.checks = new Array(this.meta.itemsPerPage).fill(false);
  }
  getUnitSpec() {
    // ?card=' + this.cardno
    this.api.getdata('employee-profiles/getUnitSpec?unit=' +sessionStorage.getItem('zoneaccess') ).subscribe((res: any) => {
      this.companies = res;
    }, err => {
      console.log(err);
    },()=> {
      console.log('ád');
    });
    // this.units=sessionStorage.getItem('zoneaccess');
  //  this.hide=true;
  }
  ngOnInit() {
    this.api.getdata('icg-shifts').subscribe((res: any[]) => this.shifts = res);
    this.api.getdata('employee-attendences/departments').subscribe((res: string[]) => this.departments = res);
    // this.get();

    if (sessionStorage.getItem('zoneaccess')=='All')
    {
      this.api.getdata('employee-attendences/companies?id=true').subscribe((res: string[]) => this.companies = res);
    }
   else
   {
    this.getUnitSpec();
   }
   
    this.api.getdata('icg-sections').subscribe((res: any[]) => {
      this.sections = res;
      this.allSections = res;
    });
  }

  filterSection() {
    this.sections = this.allSections.filter((e: any) => e.DEPARTMENT_ID == this.department);
    this.get();
  }
  generateLink(link: string): string {
    if(!this.cardNo) {
      this.cardNo='0';
    }
    if (this.companies) link += `Unit=` + encodeURIComponent(this.companyname);
    if (this.fromdate) link += `&fromdate=` + this.api.formatDate(this.fromdate);
    if (this.todate) link += `&todate=` + this.api.formatDate(this.todate);
    if (this.cardNo) link += `&ID=` + this.cardNo;
    return link
  }
  
  // get() {
  //   const start = (this.meta.currentPage - 1) * this.meta.itemsPerPage;
  //   let link = 'icg-shifts/tableData?start=' + start + '&size=' + this.meta.itemsPerPage;
  //   if(this.department) link += `&department=` + this.department.replace('#', '|');
  //   if(this.shift) link+= `&shift=` + this.shift.replace('#', '|');

  //   this.api.getdata(link).subscribe((res: any) => {
  //     this.employees = res.data;
  //     this.meta.totalItemCount = res.size;
  //   });
  // }

  get() {
    const start = (this.meta.currentPage - 1) * this.meta.itemsPerPage;
    let link = 'icg-shifts/tableData?start=' + start + '&size=' + this.meta.itemsPerPage;
    if(this.companyname) link += `&unit=` + this.companyname.replace('#', '|');
    if(this.department) link += `&department=` + this.department.replace('#', '|');
    if(this.section) link += `&sec=` + this.section.replace('#', '|');
    if(this.cardNo) link += `&cardno=` + this.cardNo.replace('#', '|');
    if(this.shift) link+= `&shift=` + this.shift.replace('#', '|');

    this.api.getdata(link).subscribe((res: any) => {
      this.employees = res.data;
      this.meta.totalItemCount = res.size;
    });
  }

  reset() {
    this.shift = null;
    this.department = null;
    this.companyname = null;
    this.section = null;
    this.cardNo = null;
    this.meta.currentPage = 1;
    this.get();
  }

  backClicked() {
    this._location.back();
  }
  generateRoster() {
    if(!this.companyname) {
      this.api.showWarningToast('Please Select Zone.');
      return;
    }
    if(!this.fromdate) {
      this.api.showWarningToast('Select a from date');
      return;
    }
    if(!this.todate) {
      this.api.showWarningToast('Select a to date');
      return;
    }
    // const dateValue = this.api.formatDate(new Date(this.date.getFullYear(), this.date.getMonth(), 1));
    let link = this.generateLink('employee-attendences/processRoster?');
    link += '&gen=1'

    //&user=' + sessionStorage.getItem('username');
    this.api.getdata(link).subscribe((res: any) => {
      if (res) {

          if(res == -1) this.api.showWarningToast('Roster Not Generated');
          else if(res == 2) this.api.showWarningToast('Roster Locked');
          else this.api.showSuccessToast('Roster Generated');

      

        const data = res;
        const description = ' - ' + sessionStorage.getItem('zoneaccess') +  ' From ' + this.api.formatDate(this.fromdate) + ' To ' + this.api.formatDate(this.todate);
        this.api.exportExcel(data, [['Roster REport'], [description]], 'Roster Report-' + this.companyname, new Array(8).fill(20));
        // let link = `actual-wastage-quantities/WastageDataExcel?fromdate=` + this.api.formatDate(this.fromDate) + `&todate=` + this.api.formatDate(this.toDate);
      
      }
    })
  }
  generateRosterShow() {
    if(!this.companyname) {
      this.api.showWarningToast('Please Select Zone.');
      return;
    }
    if(!this.fromdate) {
      this.api.showWarningToast('Select a from date');
      return;
    }
    if(!this.todate) {
      this.api.showWarningToast('Select a to date');
      return;
    }
    // const dateValue = this.api.formatDate(new Date(this.date.getFullYear(), this.date.getMonth(), 1));
    let link = this.generateLink('employee-attendences/processRoster?');
    link += '&gen=0' 
    //&user=' + sessionStorage.getItem('username');
    this.api.getdata(link).subscribe((res: any) => {
      if (res) {
        if(res == 0) this.api.showWarningToast('Roster not found.');
        const data = res;
        const description = ' - ' + sessionStorage.getItem('zoneaccess') +  ' From ' + this.api.formatDate(this.fromdate) + ' To ' + this.api.formatDate(this.todate);
        this.api.exportExcel(data, [['Roster REport'], [description]], 'Roster Report-' + this.companyname, new Array(8).fill(20));
        // let link = `actual-wastage-quantities/WastageDataExcel?fromdate=` + this.api.formatDate(this.fromDate) + `&todate=` + this.api.formatDate(this.toDate);
      
      }
    })
  }
  changeAllCheck() {
    this.checks.fill(this.allCheck);
  }

  update() {
    if(!this.checks.includes(true)) {
      this.api.showWarningToast('Select at least one employee');
      return;
    }
    if(!this.changedShift) {
      this.api.showWarningToast('Select a shift');
      return;
    }

    const data: any = {newShift: this.changedShift, createdBy: sessionStorage.getItem('empid')}
    this.employees.forEach((element: any, index: number) => {
      if(!this.checks[index]) return;

      data.employee = element.EMP_ID
      data.previousShift = element.SHIFT_ID
      this.api.patchdata('icg-shifts/changeShift', data).subscribe((res: any) => {
        if(res) {
          this.api.showSuccessToast('Shift Updated');
          this.reset();
        }
      });
    });
  }
}
