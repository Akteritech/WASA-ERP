import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { ApiService } from "../../../api.service";
import * as pdfmake from 'pdfmake-lite/build/pdfmake';
import { ProcessData } from '../../attendance-calender2/ProcessData';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  fromDate: Date;
  toDate: Date;
  hours = 8;
  companies: string[];
  departments: any[];
  attendenceReportData: any[];
  allAttendenceReportData: any[]
  employeeTypes = [
    { type: 'Worker', value: '0' }, { type: 'Officer', value: '1' }, { type: 'Staff', value: '2' }
  ];
  meta: {
    totalItemCount: number,
    itemsPerPage: number,
    currentPage: number,
  };
  companyname: string;
  department: string;
  empType: string;
  cardNo: any;
  attendenceAbsentLeaveData: any;
  shifts: any[];
  shift: string;
  sections: any[];
  section: string;
  allSections: any[];
  hide=true;
  private btnDisable: boolean = true;
  constructor(public api: ApiService, private _location: Location, private route: Router) {
    this.meta = {
      totalItemCount: 0,
      itemsPerPage: 25,
      currentPage: 1,
    };
  }

  ngOnInit() {
    this.api.getdata('icg-shifts').subscribe((res: any[]) => this.shifts = res);
    this.api.getdata('icg-sections').subscribe((res: any[]) => {
      this.sections = res;
      this.allSections = res;
    });
    this.api.getdata('employee-attendences/companies').subscribe((res: string[]) => this.companies = res);
    this.companyname=sessionStorage.getItem('zoneaccess');
    this.api.getdata('employee-attendences/departmentszone?zone=' +  this.companyname).subscribe((res: string[]) => this.departments = res);
    this.fromDate = new Date();
    this.toDate = new Date();
   
   
    this.get();
    this.hide=true;
    // if( sessionStorage.getItem('zoneaccess')=="Admin") {
    //   this.btnDisable = false;
    // }
   

  }

  backClicked() {
    this._location.back();
  }

  filterSection() {
    this.sections = this.allSections.filter((e: any) => e.DEPARTMENT_ID == this.department);
    this.get();
  }

  get() {
    this.meta.currentPage = 1
    const link = this.generateAttendanceLink('attendanceReport');
    this.api.getdata(link).subscribe((res: any[]) => {
      this.attendenceReportData = res.slice(0, this.meta.itemsPerPage);
      this.allAttendenceReportData = res;
      this.meta.totalItemCount = res.length;
    });
  }

  generateAttendanceLink(baseLink: string): string {
    let link = `employee-attendences/` + baseLink + `?fromDate=` + this.api.formatDate(this.fromDate) + `&toDate=` + this.api.formatDate(this.toDate);
    if (this.companyname) link += `&company=` + this.companyname;
    if (this.department) link += `&department=` + this.department.replace('#', '|');
    if (this.empType) link += `&type=` + this.empType;
    if (this.cardNo) link += `&cardno=` + this.cardNo;
    if (this.section) link += `&section=` + encodeURIComponent(this.section);
    return link;
  }

  pageChange() {
    const start = (this.meta.currentPage - 1) * this.meta.itemsPerPage;
    const end = start + this.meta.itemsPerPage
    this.attendenceReportData = this.allAttendenceReportData.slice(start, end);
  }

  excelGenerate() {
    const link = this.generateAttendanceLink('attendanceReport');
    this.api.getdata(link).subscribe((res: any[]) => {
      const data = res.map((e: any) => {
        return {
          Company: e.CompanyName, Department: e.Dep_Name, Section: e.Section, Card: e.EMP_CARD_NO, Name: e.FirstName, Designation: e.Designation, 
          DATE: e.IN_OUT_DATE, 'In Time': e.InTime, 'Out Time': e.OutTime, Shit: e.AssignedShit, Status: e.AttendStatus
        };
      });
      const lengths = [30, 30, 25, 30, 20, 20, 20, 20, 20, 20];
      this.api.exportExcel(data, [['Attendance Report'], ['From ' + this.api.formatDate(this.fromDate) + ' To ' + this.api.formatDate(this.toDate)]], 'Attendance Report', lengths);
    });
  }

  getDepartmentName(): string {
   if(!this.department) return null;
   return this.departments.find((element: any) => element.DEPARTMENT_ID === this.department).DeptEngNm;
  }

  reset() {
    this.fromDate = new Date();
    this.toDate = new Date();
    this.companyname = null;
    this.empType = null;
    this.department = null;
    this.cardNo = null;
    this.shift = null;
    this.section = null;
    this.sections = this.allSections;
    this.get();
  }

  pdf(baseLink: string) {
    const link = this.generateAttendanceLink(baseLink);
    this.api.getdata(link).subscribe((res: any[]) => {
      const data = [['SL.', 'Card', 'Name', 'Company', 'Section', 'Designation', 'Date', 'In Time', 'Out Time', 'Status']];
      const title = 'Attendance Report'
      const description = 'From ' + this.api.formatDate(this.fromDate) + ' to ' + this.api.formatDate(this.toDate);
      let currentDepartment: string = res[0].Dep_Name;
      data.push([currentDepartment, '', '', '', '', '', '', '', '', '']);
      let deptCount = 0;

      res.forEach((e: any) => {
        if(e.Dep_Name == currentDepartment) {
          deptCount++;
          data.push([
            deptCount, e.EMP_CARD_NO, e.FirstName, e.CompanyName, e.Section, e.Designation, e.IN_OUT_DATE.substring(0, 10), e.InTime, e.OutTime, e.AttendStatus
          ]);
        }
        else {
          data[data.length - 1 - deptCount][1] = 'Employees: ' + deptCount;
          deptCount = 1;

          data.push([e.Dep_Name, '', '', '', '', '', '', '', '', '']);
          currentDepartment = e.Dep_Name;
          data.push([
            1, e.EMP_CARD_NO, e.FirstName, e.CompanyName, e.Section, e.Designation, e.IN_OUT_DATE.substring(0, 10), e.InTime, e.OutTime, e.AttendStatus
          ]);
        }
      });

      data[data.length - 1 - deptCount][1] = 'Employees: ' + deptCount;
      data.push(['Grand Total', 'Employee: ' + this.allAttendenceReportData.length, '', '', '', '', '', '', '', '']);
      this.pdfReport(data, title, 'portrait', description);
    });
  }
  getSummeryLink(processData: ProcessData): string {
    const month = this.fromDate.getMonth() + 1;
		const year = this.fromDate.getFullYear();
    return 'employee-attendences/attendanceSummery?month=' + month + '&year=' + year 
      + '&fday=' + processData.getFirstDay() + '&lday=' + processData.getLastDay();
  }

  summeryPDF2() {
    const department = this.getDepartmentName();
    const processData = new ProcessData(this.fromDate);
    const link = 'employee-attendences/attendanceSummery2?date1=' + this.api.formatDate(this.fromDate) + '&date2=' + this.api.formatDate(this.toDate);
    
    this.api.getdata(link).subscribe((res: any[]) => {
      const data = [['Employee', 'Card', 'Department', 'Present', 'Leave', 'Weekend', 'Holiday', 'Absent']];
      const filteredData = processData.filter(res, this.cardNo, department, null);
      
      filteredData.forEach((e: any) => {
        data.push([
          e.EMP_NAME_ENG, e.EMP_CARD_NO, e.DeptEngNm, e.PR, e.NoOfLeave, e.NoOfWeekend, e.NoOfHoliday, e.AbsentDays
        ]);
      });
      const description = this.fromDate.toLocaleString('default', {month: 'long'}) + ' ' + this.fromDate.getFullYear();
      this.api.pdfReport(data, 'Attendance Summery Report', 'portrait', description);
    });
  }

  summeryExcel2() {
    const department = this.getDepartmentName();
    const processData = new ProcessData(this.fromDate);
    const link = 'employee-attendences/attendanceSummery2?date1=' + this.api.formatDate(this.fromDate) + '&date2=' + this.api.formatDate(this.toDate);

    this.api.getdata(link).subscribe((res: any[]) => {
      const filterData = processData.filter(res, this.cardNo, department, null);
      const data = filterData.map((e: any) => {
        return {
          'Employee': e.EMP_NAME_ENG, 'Card': e.EMP_CARD_NO, 'Department': e.DeptEngNm, 'Present': e.PR,
          'Leave': e.NoOfLeave, 'Weekend': e.NoOfWeekend, 'Holiday': e.NoOfHoliday, 'Absent': e.AbsentDays
        };
      });
      const lengths = [30, 15, 30, 10, 10, 10, 10, 10];
      const description = this.fromDate.toLocaleString('default', {month: 'long'}) + ' ' + this.fromDate.getFullYear();
      this.api.exportExcel(data, [['Monthly Attendance Summery'], [description]], 'Attendance Summery', lengths);
    });
  }

  excelAbsentLeave() {
    let today = new Date();
    let link = 'employee-attendences/absenceReport?fromDate=' + this.api.formatDate(this.fromDate);
    if (this.companyname) link += '&company=' + this.companyname;
    if (this.department) link += `&department=` + this.department.replace('#', '|');
    if (this.shift) link += `&shift=` + this.shift.replace('#', '|');

    this.api.getdata(link).subscribe((res: any[]) => {

      const data = res.map((e: any) => {
        return {
          'Company Name': e.DIVISION_NAME_ENG, 'Department Name': e.DeptEngNm, 'Card No': e.EMP_CARD_NO, 'Employee Name': e.EMP_NAME_ENG,
          'Designation': e.DesigNmEng, 'Attendance Status': e.AttendStatus, 'Shift': e.Shift
        };
      });
      const lengths = [30, 30, 25, 30, 20, 20, 20];
      this.api.exportExcel(data, [['Absent Report '], ['From ' + this.api.formatDate(this.fromDate) + ' To ' + this.api.formatDate(this.toDate)]], ' Absent Report ' + this.api.formatDate(today), lengths);
    });
  }

  absenceReport() {
    const data = [['Department', 'Card', 'Name', 'Designation', 'Company', 'Status', 'Shift']];
    const title = 'Absence Report';
    const description = this.api.formatDate(this.fromDate);
    // const link = 'employee-attendences/absenceReport?fromDate=2019-05-18&company=Maheen Label Tex Ltd.'
    let link = 'employee-attendences/absenceReport?fromDate=' + this.api.formatDate(this.fromDate);
    if (this.companyname) link += '&company=' + this.companyname;
    if (this.department) link += `&department=` + this.department.replace('#', '|');
    if(this.shift) link += `&shift=` + this.shift.replace('#', '|');

    this.api.getdata(link).subscribe((res: any[]) => {
      let currentDepartment: string = res[0].DeptEngNm;
      data.push([currentDepartment, '', '', '', '', '', '']);
      let deptCount = 0;

      res.forEach((e: any) => {
        if(e.DeptEngNm == currentDepartment) {
          deptCount++;
          data.push([
            '', e.EMP_CARD_NO, e.EMP_NAME_ENG, e.DesigNmEng, e.DIVISION_NAME_ENG, e.AttendStatus, e.Shift
          ]);
        }
        else {
          data[data.length - 1 - deptCount][1] = 'Employees: ' + deptCount;
          deptCount = 1;
          data.push([e.DeptEngNm, '', '', '', '', '', '']);
          currentDepartment = e.DeptEngNm;
          data.push([
            '', e.EMP_CARD_NO, e.EMP_NAME_ENG, e.DesigNmEng, e.DIVISION_NAME_ENG, e.AttendStatus, e.Shift
          ]);
        }
      });

      data[data.length - 1 - deptCount][1] = 'Employees: ' + deptCount;
      data.push(['Total: ' + res.length, '', '', '', '', '', '']);
      this.pdfReport(data, title, 'portrait', description);
    });
  }

  punchMissing() {
    let link = 'employee-attendences/missingPunch?fromDate='+ this.api.formatDate(this.fromDate) + '&toDate=' + this.api.formatDate(this.toDate);
    if(this.department) link += '&department=' + this.getDepartmentName();

    this.api.getdata(link).subscribe((res: any[]) => {
      const data = [['Name', 'Card', 'Department', 'Section', 'Shift', 'Shift Out', 'Date', 'In Time', 'Out Time', 'Work Hour']];

      res.forEach((e: any) => {
        data.push([
          e.EmployeeName, e.IDNo, e.Dept, e.SecEngNm, e.ShiftName, e.ShiftOut, e.AttndDate.substring(0, 10), 
          e.InTIme, e.OuTime, e.WorkHour
        ]);
      });

      this.api.pdfReport(data, 'Missing Card Punch', 'portrait', this.api.formatDate(this.fromDate) + ' to ' + this.api.formatDate(this.toDate))
    });
  }

  workHour() {
    let link = 'employee-attendences/workHour?from='+ this.api.formatDate(this.fromDate) + '&to=' + this.api.formatDate(this.toDate) + '&hour=' + this.hours;
    if(this.department) link += '&department=' + this.getDepartmentName();

    this.api.getdata(link).subscribe((res: any[]) => {
      const data = [
        ['Sl.', 'Name', 'Card', 'Department', 'Section', 'Designation', 'Shift', 'Date', 'In Time', 'Out Time',  'End Time', 'Work Hour']
      ];

      res.forEach((e: any, index: number) => {
        data.push([
          index + 1, e.EmployeeName, e.IDNo, e.Dept, e.SecEngNm, e.Designation, e.ShiftName, e.AttndDate.substring(0, 10), 
          e.InTIme, e.OutTime, e.END_TIME, e.WorkHour
        ]);
      });

      const description = this.api.formatDate(this.fromDate) + ' to ' + this.api.formatDate(this.toDate) + '\nSearched Less Then ' + this.hours + ' Hours';
      this.api.pdfReport(data, 'Short Attendance Report', 'portrait', description, ' ');
    });
  }

  movementReport() {
    if(!this.cardNo) {
      this.api.showWarningToast('Enter Card');
      return;
    }

    let link = 'employee-attendences/movement?fromDate='+ this.api.formatDate(this.fromDate) 
      + '&toDate=' + this.api.formatDate(this.toDate) + '&card=' + this.cardNo;

    this.api.getdata(link).subscribe((res: any[]) => {
      const data = [['Si', 'Date', 'Time', 'Status']];
      let currentDate: string = '';
      let serial = 0;
      const description = 'Employee: ' + res[0].EmpName + ', ID: ' + res[0].IDNo + ', Department: ' + res[0].Dept 
      + ', Designation: ' + res[0].Designation;
      const header = 'Movement Report from ' + this.api.formatDate(this.fromDate) + ' to ' + this.api.formatDate(this.toDate);

      res.forEach((e: any , index: number) => {
        if(e.AttendandDate != currentDate) {
          currentDate = e.AttendandDate;
          data.push(['', e.AttendandDate, '', '']);
          serial = 0;
        }
        serial++;
        let time: string = e.InOutTime.substring(11,16);
        let timePosition = 'AM';
        const hour = Number.parseInt(time.substring(0, 2));
        if(hour > 12) {
          time = (hour - 12) + time.substring(2);
          timePosition = 'PM';
        }
        data.push([serial, '', time + timePosition, e.AttendandStatus]);
      });

      this.pdfReport(data, 'Movement Report', 'portrait', description, header);
    });
  }

  jobcard() {
    if(!this.cardNo && !this.department) {
      this.api.showWarningToast('Enter Card or Department');
      return;
    }
    
    let link = 'attendance/jobcard?date=' + this.api.formatDate(this.fromDate);
    if(this.cardNo) link += '&card=' + this.cardNo;
    else link += '&department=' + encodeURIComponent(this.department);

    this.route.navigateByUrl(link);
  }

  pdfReport(pdfData: string[][], title: string, pageOrientation: string, description: string, header: string = null ) {
    if(!header) header = title + ' ' + description;
    const printData = pdfData.map((element: string[], row: number) => {

      let isBold = element[3].length == 0; 
      return element.map((text: string) => {
        if(row === 0) isBold = true;
        const style = {bold: isBold, fontSize: 6};
        return {text: text, style: style};
      });
    });

    const docDefinition = {
      header: header, pageOrientation: pageOrientation, pageSize: 'A4',
      info: {title: title + '.pdf', subject: title},
      content: [
        {text: title, fontSize: 14, alignment: 'center', bold: true, margin: [0, 0, 0, 4]},
        {text: description, fontSize: 10, alignment: 'center', bold: false, margin: [0, 0, 0, 2]},
        {table: {headerRows: 1, widths: 'auto', body: printData }}
      ]
    };
    pdfmake.createPdf(docDefinition).open();
  }
}
