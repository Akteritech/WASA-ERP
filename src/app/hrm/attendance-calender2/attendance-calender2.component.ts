import { Component, OnInit } from '@angular/core';
import { ProcessData } from '../attendance-calender2/ProcessData';
import * as XLSX from 'xlsx';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { SuiModalService } from 'ng2-semantic-ui';
import { Location } from "@angular/common";
import { EditDetail } from 'src/app/templates/edit-detail/edit-detail.component';

@Component({
  selector: 'app-attendance-calender2',
  templateUrl: './attendance-calender2.component.html',
  styleUrls: ['./attendance-calender2.component.css']
})
export class AttendanceCalender2Component implements OnInit {
  date: Date;
  toDate: Date;
  processData: ProcessData;
  data: any[];
  allData = [];
  departments: string[];
  allDepartments: string[];
  pageSize = 25;
  dataSize = 0;
  currentPage: number;
  departmentSearch: string;
  cardSearch: string;
  filteredData: any[];
  dayList: number[];
  collapse = true;
  currentRoute: string;
  firstOfMonth: string;
  companies: string[];
  company: string;
  visible = false;
  hide=false;

  constructor(private api: ApiService, private route: Router, public modalService: SuiModalService, private _location: Location) {
    this.date = new Date();
    this.toDate = new Date();
    this.date = new Date(this.toDate.getFullYear(), this.toDate.getMonth(), 1);
    this.currentPage = 1;

  }

  ngOnInit() {
    this.api.getdata('employee-attendences/companies').subscribe((res: string[]) => this.companies = res);
    this.api.getdata('employee-attendences/departments').subscribe((res: any[]) => {
      this.departments = res.map((element: any) => element.DeptEngNm);
      this.allDepartments = this.departments;
      if (sessionStorage.getItem('zoneaccess')=='All')
      {
        // this.company=sessionStorage.getItem('zoneaccess');
        this.hide=false;
      }
      else
      {
        this.company=sessionStorage.getItem('zoneaccess');
        this.hide=true;
      }
     
    });
  }

  searchDepartment(key: string) {
    this.departments = this.allDepartments
      .filter((department: string) => department.toUpperCase().includes(key.toUpperCase()));
  }

  getData(fixDate: boolean = false) {
    if (fixDate) this.toDate = new Date(this.api.formatDate(this.date));
    this.processData = new ProcessData(this.date);
    this.dayList = this.processData.dayList;
    const month = this.date.getMonth() + 1;
    const year = this.date.getFullYear();
   // const link = 'employee-attendences/calender2?month=' + month + '&year=' + year;
   const link = 'employee-attendences/calender3?date=' + this.api.formatDate(this.date) + '&ID=&Dept=&Zone=' +  this.company;

    this.api.getdata(link).subscribe((res: any[]) => {
      this.allData = res;
      this.filter();
    });
  }

  filter() {
    this.currentPage = 1;
    this.filteredData = this.processData.filter(this.allData, this.cardSearch, this.departmentSearch, this.company)
    this.dataSize = this.filteredData.length;
    this.data = this.filteredData.slice(0, this.pageSize);
  }

  pageChange() {
    const start = (this.currentPage - 1) * this.pageSize;
    this.data = this.filteredData.slice(start, start + this.pageSize);
  }

  reset() {
    this.company = null;
    this.cardSearch = null;
    this.departmentSearch = null;
    this.currentPage = 1;
    this.date = new Date();
    this.toDate = new Date();
    this.getData();
  }

  pdf() {
    this.api.pdfReport(this.processData.pdfData(this.filteredData), this.company, 'landscape', this.processData.pdfTitle + ' for ' + this.processData.pdfDescription);
  }

  excel() {
    const dayList = this.processData.dayList;
    let lengths = [];
    const data = this.filteredData.map((e: any) => {
      const row: any = {Company: e.Company, Employee: e.EMP_NAME_ENG, Card: e.EMP_CARD_NO, Department: e.DeptEngNm };
      dayList.forEach((day: number) => {
        row[day] = e[day];
        lengths.push(5);
      });
      row.total = e.Total;
      return row;
    });

    lengths = [8, 30, 20, 30].concat(lengths);
    const header = ['Company', 'Employee', 'Card', 'Department'].concat(dayList.map((day: number) => '' + day));

    this.exportExcel(data, [['Monthly Attendance Report'], [this.date.toLocaleString('default', { month: 'long' }) + ' ' + this.date.getFullYear()]], 'Attendance Report', lengths, header);
  }

  public exportExcel(data: any[], title: string[][], filename: string, widths: number[], header: string[]) {
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.aoa_to_sheet(title);
    XLSX.utils.sheet_add_json(ws, data, { origin: 'A' + (title.length + 2), header });
    ws["!cols"] = widths.map((width: number) => {
      return { width };
    });
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, filename + '.xlsx');
  }

  process() {
    for (let currentDate: Date = this.date; currentDate <= this.toDate; currentDate.setDate(currentDate.getDate() + 1)) {
      const currentDateString = this.api.formatDate(currentDate);
      const data = { date: currentDateString, card: this.cardSearch };
      this.api.patchdata('employee-attendences/processAttendance', data).subscribe((res: any) => {
        if (res) {
          this.api.showSuccessToast('Data Processed for' + currentDateString);
          this.getData();
        }
      });
    }
  }

  jobcardIndivisual(cardNo) {
    const year = this.date.getFullYear();
    var convertMonthNo = this.date.getMonth();
    this.firstOfMonth = this.api.formatDate(new Date(year, convertMonthNo, 1))
    console.log(this.firstOfMonth);
    let link = 'attendance/jobcard?date=' + this.firstOfMonth + '&card=' + cardNo;
    this.route.navigateByUrl(link);
  }

  modifyAttendance(index: number) {
    const card = this.data[index].EMP_CARD_NO;
    let monthString: string;
    this.date.getMonth() < 9? monthString = '0' + (this.date.getMonth() + 1): 
      monthString = '' + (this.date.getMonth() + 1);
    const input = {card, month: monthString, year: this.date.getFullYear()};

    this.modalService.open(new EditDetail(this.data[index].DeptEngNm + ' - ' + card, 'editAttendance', input));
  } 

  backClicked() {
    this._location.back();
  }

}
