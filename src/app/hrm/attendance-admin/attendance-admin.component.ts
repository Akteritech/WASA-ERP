import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-attendance-admin',
  templateUrl: './attendance-admin.component.html',
  styleUrls: ['./attendance-admin.component.css']
})
export class AttendanceAdminComponent implements OnInit {
  date: Date;
  shifts: any[];
  companies: string[];
  departments: any[];
  department: string;
  cardNo: string;
  tableData: any[];
  allTableData: any[];
  pageSize = 25;
  currentPage = 1;
  totalItemCount = 0;
  allCheck = false;
  checks: boolean[];
  addNew: boolean;
  visible: boolean;
  code: string;

  constructor(private api: ApiService) {
    this.visible = false;
    this.date = new Date();
    this.checks = new Array(this.pageSize).fill(false);
  }

  ngOnInit() {
    this.api.getdata('icg-shifts').subscribe((res: any[]) => this.shifts = res);
    this.api.getdata('employee-attendences/departments').subscribe((res: string[]) => this.departments = res);
  }

  newAttendance(){
    if(!this.department && !this.cardNo) {
      this.api.showWarningToast('Enter Department or Card');
      return;
    }

    const link = this.generateLink('employee-attendences/adminTable');
    this.api.getdata(link).subscribe((res: any[]) => this.processRes(res, true));
  }

  missingAttendance() {
    const link = this.generateLink('employee-attendences/adminMissingTable');
    this.api.getdata(link).subscribe((res: any[]) => this.processRes(res, false));
  }

  fullAttendance() {
    const link = this.generateLink('employee-attendences/fullAttendance');
    this.api.getdata(link).subscribe((res: any[]) => this.processRes(res, true));
  }

  showAbsent() {
    const link = this.generateLink('employee-attendences/showAbsence')
    this.api.getdata(link).subscribe((res: any[]) => this.processRes(res, true));
  }

  generateLink(link: string): string {
    link += '?date=' + this.api.formatDate(this.date);
    if(this.cardNo) link += '&card=' + this.cardNo;
    if(this.department) link += '&department=' + encodeURIComponent(this.department);
    return link;
  }

  processRes(data: any[], add: boolean) {
    this.addNew = add;
    this.checks.fill(false);
    this.currentPage = 1;
    this.tableData = [];
    this.allTableData = [];
    this.totalItemCount = data.length;
    this.tableData = data.slice(0, this.pageSize);
    this.allTableData = data;
  }

  reset() {
    this.department = null;
    this.cardNo = null;
  }

  pageChange() {
    const start = (this.currentPage - 1) * this.pageSize;
    this.tableData = this.allTableData.slice(start, start + this.pageSize);
  }

  changeCheck() {
    this.checks.fill(this.allCheck);
  }

  validate(): boolean {
    if(!this.checks.includes(true)) {
      this.api.showWarningToast('Select at least one entry');
      return false;
    }

    let valid = true;
    this.tableData.forEach((e: any, index: number) => {
      if(!this.checks[index]) return;

      if(!e.InTime && e.AttendStatus != 'OS') {
        this.api.showWarningToast('Enter In Time');
        valid = false;
      }
    });

    return valid;
  }

  update() {
    if(!this.validate()) return;

    const data = {
      date: this.api.formatDate(this.date), updater: sessionStorage.getItem('username'), addNew: this.addNew, employee: null
    }
    this.patchData(data, 'employee-attendences/updateAttendance', 'Attendance Updates');
  }

  makeAbsent() {
    if(!this.validate()) return;
    const data = {date: this.api.formatDate(this.date), updater: sessionStorage.getItem('username'), employee: null};
    this.patchData(data, 'employee-attendences/createAbsence', 'Absence Created');
  }

  patchData(baseData: any, link: string, message: string) {
    this.tableData.forEach((e: any, index: number) => {
      if(!this.checks[index]) return;

      if(!e.OutTime && !this.addNew) e.OutTime = e.ShiftOut;
      baseData.employee = e;

      this.api.patchdata(link, baseData).subscribe((res: any) => {
        if(res) {
          this.api.showSuccessToast(message);
        }
      });
    });
  }
}
