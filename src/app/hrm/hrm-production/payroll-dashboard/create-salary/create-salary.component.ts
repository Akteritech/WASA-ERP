import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import * as pdfmake from 'pdfmake-lite/build/pdfmake';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { SuiModalService } from 'ng2-semantic-ui';
import { EditDetail } from 'src/app/templates/edit-detail/edit-detail.component';

@Component({
  selector: 'app-create-salary',
  templateUrl: './create-salary.component.html',
  styleUrls: ['./create-salary.component.css']
})
export class CreateSalaryComponent implements OnInit {
  departments: any[];
  companies: any[];
  date: Date;
  stopFrom: Date;
  stopTo: Date;
  taxFrom: Date;
  taxTo: Date;
  department: string;
  company: string;
  card: string;
  typeoftran:string;
  typeoftrans: any[];
  statementGrid: any[];
  allStatementGrid: any[];
  checks: boolean[];
  allCheck = false;
  totalItemCount = 0;
  itemsPerPage = 25;
  currentPage = 1;
  employeeType: string;
  letterDraftData: any[];
  draftDatas: any[];
  tentativeFrom: Date;
  tentativeTo: Date;
  attendanceTo: Date;
  attendanceFrom: Date;
  lastRow: any[];
  rowNoTotal: any;
  lastTotal: any;
   wages: any;

  constructor(public api: ApiService, private route: Router, private _location: Location, private modalService: SuiModalService) {
    this.date = new Date();
    this.checks = new Array(this.itemsPerPage).fill(false);
  }

  ngOnInit() {
    this.api.getdata('employee-attendences/departments').subscribe((res: any[]) => this.departments = res);
    this.api.getdata('employee-attendences/companies?id=true').subscribe((res: any[]) => this.companies = res);
    this.api.getdata('psn-employee-adv-loan-masters/AdvanceType').subscribe((res: any[]) => this.typeoftrans = res);
  }

  generateSalary() {
    const dateValue = this.api.formatDate(new Date(this.date.getFullYear(), this.date.getMonth(), 1));
    let link = this.generateLink('employee-payrolls/salaryGenerate?date=' + dateValue);
    link += '&user=' + sessionStorage.getItem('username');
    this.api.getdata(link).subscribe((res: any) => {
      if (res) {
        if(res == -1) this.api.showWarningToast('Salary Not Generated');
        else if(res == 2) this.api.showWarningToast('Salary Locked');
        else this.api.showSuccessToast('Salary Generated');
      }
    })
  }

  generateExceptionSalary() {
    if(!this.card) {
      this.api.showWarningToast('Enter Card No');
      return;
    }
    const dateValue = this.api.formatDate(new Date(this.date.getFullYear(), this.date.getMonth(), 1));
    let link = this.generateLink('employee-payrolls/exceptionSalaryGenerate?date=' + dateValue);
    this.api.getdata(link).subscribe((res: any) => {
      if(res == -1) this.api.showWarningToast('Salary Not Generated');
      else if(res == 2) this.api.showWarningToast('Salary Locked');
      else this.api.showSuccessToast('Salary Generated');
    });
  }

  backClicked() {
    this._location.back();
  }

  getCompanyName(): string {
    const entry = this.companies.find((e: any) => e.DIVISION_ID === this.company);
    if (!entry) return null;
    else return entry.DIVISION_NAME_ENG
  }

  getDepartment(): string {
    const entry = this.departments.find((e: any) => e.DEPARTMENT_ID === this.department);
    if (!entry) return null;
    else return entry.DeptEngNm;
  }

  inactiveList() {
    const link = this.generateLink('employee-payrolls/inactiveList?month=' + (this.date.getMonth() + 1) + '&year=' + this.date.getFullYear())

    this.api.getdata(link).subscribe((res: any[]) => {
      const data = [['Employee', 'Card', 'Designation', 'Join Date', 'Inactive Date', 'Salary', 'Status']];
      let currentDepartment = '', total = 0, grandTotal = 0;

      res.forEach((e: any, index: number) => {
        if (currentDepartment != e.Dept) {
          currentDepartment = e.Dept;
          let totalRow = ['Department Total'].concat(new Array(data[0].length - 1).fill(''));
          totalRow[5] = total + '';
          if (index > 0) data.push(totalRow);
          total = 0;
          data.push([currentDepartment].concat(new Array(data[0].length - 1).fill('')));
        }
        total += e.PresentSalary
        grandTotal += e.PresentSalary;
        data.push([e.EmpName, e.IDNo, e.Designation, e.Joining, e.InActiveDate, e.PresentSalary, e.TerminateStatus]);
      });
      let totalRow = ['Department Total'].concat(new Array(data[0].length - 1).fill(''));
      totalRow[5] = total + '';
      data.push(totalRow);
      data.push(['Grand Total', '', 'Employee: ' + res.length, '', '', 'Salary: ' + grandTotal, ''])

      const description = this.date.toLocaleString('default', { month: 'long' }) + ' ' + this.date.getFullYear();
      this.api.pdfReport(data, 'Inactive Employees', 'portrait', description);
    });
  }

  salaryAdvance() {

    if(!this.typeoftran) {
      this.api.showWarningToast('Please select advance type.');
      return;
    }
    let link = 'employee-payrolls/salaryAdvance';
    if (this.company) link += `?company=` + encodeURIComponent(this.company) + '&advancetype=' + this.typeoftran;

    this.api.getdata(link).subscribe((res: any[]) => {
      const data = [['ID No.', 'Employee', 'Designation', 'Advance','AdavnceDate','MonthlyAdvance','Installs','Rate%','Status', 'Paid', 'Balance','Remarks']];
      const totalRow = new Array(data[0].length).fill(0);
      let currentDepartment = '';

      res.forEach((e: any, index: number) => {
        if (currentDepartment != e.Department) {
          currentDepartment = e.Department;
          data.push([currentDepartment].concat(new Array(data[0].length - 1).fill('')));
        }
        data.push([e.IDNo, e.EmpName, e.Designation, e.Advance,e.AdavnceDate,e.MonthlyAdvance,e.Installs,e.Rate,e.Status, e.PaidAmount, e.Balance,e.Remarks]);
        data[data.length - 1].forEach((e: any, index: number) => {

         // if (index > 2) totalRow[index] += e;
        })
      });

      totalRow[0] = 'Grand Total';
      totalRow[1] = totalRow[2] = '';
      data.push(totalRow);
      this.api.pdfReport(data,[[res[0].Unit]]+'' , 'portrait',  this.typeoftran  + ' Current Balance Report -' + this.api.formatDate(this.date));
    });
  }
  payrollJournal() {
    let link = 'employee-payrolls/payrolljournal';
    if (this.company) link += `?company=` + encodeURIComponent(this.company);
    //let link = `employee-payrolls/getSalaryStatement?PayrollDate=` ;
    link += `&date=` +  this.api.formatDate(this.date);
    this.api.getdata(link).subscribe((res: any[]) => {
      const data = [['Particulars', 'Subsidiary', 'Debit', 'Credit']];
      const totalRow = new Array(data[0].length).fill(0);
     // let currentDepartment = '';
console.log(res)
      res.forEach((e: any, index: number) => {
       // if (currentDepartment != e.Department) {
        //  currentDepartment = e.Department;
         // data.push([currentDepartment].concat(new Array(data[0].length - 1).fill('')));
       // }
        data.push([e.Particulars, e.Subsidiary, e.Debit, e.Credit]);
        console.log(e.Particulars)
        data[data.length - 1].forEach((e: any, index: number) => {

          if (index > 2) totalRow[index] += e;
        })
      });

     // totalRow[0] = 'Grand Total';
     // totalRow[1] = totalRow[2] = '';
      //data.push(totalRow);
      this.api.pdfReport(data, 'Payroll Journal', 'portrait', this.api.formatDate(this.date));
    });
  }

  newJoinList() {
    const link = this.generateLink('employee-payrolls/newJoinList?date=' + this.api.formatDate(this.date));

    this.api.getdata(link).subscribe((res: any[]) => {
      const data = [['Employee', 'Card', 'Designation', 'Join Date', 'Salary', 'Company']];
      let currentDepartment = '', total = 0, grandTotal = 0;

      res.forEach((e: any, index: number) => {
        if (currentDepartment != e.Dept) {
          currentDepartment = e.Dept;
          let totalRow = ['Department Total'].concat(new Array(data[0].length - 1).fill(''));
          totalRow[4] = total + '';
          if (index > 0) data.push(totalRow);
          total = 0;
          data.push([currentDepartment].concat(new Array(data[0].length - 1).fill('')));
        }
        total += e.JoiningSalary;
        grandTotal += e.JoiningSalary;
        data.push([e.EmpName, e.IDNo, e.Designation, e.Joining, e.JoiningSalary, e.Unit]);
      });

      let totalRow = ['Department Total'].concat(new Array(data[0].length - 1).fill(''));
      totalRow[4] = total + '';
      data.push(totalRow);
      data.push(['Grand Total', '', 'Employee: ' + res.length, '', 'Salary: ' + grandTotal, '']);

      const description = this.date.toLocaleString('default', { month: 'long' }) + ' ' + this.date.getFullYear();
      this.api.pdfReport(data, 'New Employees', 'portrait', description);
    });
  }

  createTotalRow(length: number, zeroIndexes: number[], title: string): number[] {
    const row: any[] = ['', title].concat(new Array(length - 2).fill(''));
    zeroIndexes.forEach((index: number) => row[index] = 0);
    return row;
  }

  generatePDFArray(data: any[], sumColumns: string[], department: boolean = true): string[][] {
    const headings = ['SL'].concat(Object.keys(data[0]).filter((heading: string) => heading != 'Department'));
    const pdfData = [headings];
    const sumIndex: number[] = [];
    let currentDepartment = '';
    let currentSerial = 1;

    headings.forEach((column: string, index: number) => {
      if (sumColumns.includes(column)) sumIndex.push(index);
    });
    let totalRow: any[] = this.createTotalRow(headings.length, sumIndex, 'Department Total');
    let grandTotalRow: any[] = this.createTotalRow(headings.length, sumIndex, 'Grand Total');

    data.forEach((e: any, index: number) => {
      if (e.Department != currentDepartment && department) {
        currentDepartment = e.Department;
        if (index > 0) pdfData.push(totalRow);
        pdfData.push(['', currentDepartment].concat(new Array(headings.length - 2).fill('')));
        totalRow = this.createTotalRow(headings.length, sumIndex, 'Department Total');
        currentSerial = 1;
      }

      const currentRow = headings.map((heading: string) => {
        if (heading == 'SL') return currentSerial;
        else return e[heading];
      });
      sumIndex.forEach((index: number) => {
        totalRow[index] += currentRow[index];
        grandTotalRow[index] += currentRow[index];
      });
      pdfData.push(currentRow);
      currentSerial++;
    });

    if(department) pdfData.push(totalRow);
    pdfData.push(grandTotalRow);
    return pdfData;
  }

  pf() {
    const date = this.api.formatDate(this.date);
    const link = this.generateLink('employee-payrolls/pf?date=' + date);
    this.api.getdata(link).subscribe((res: any[]) => {
      this.api.exportExcel(res, [['PF'], [this.api.formatDate(this.date)]], 'PF', [20, 20, 20])
    })
  }

  pfPdf() {
    if(!this.company) {
      this.api.showWarningToast('Enter Company');
      return;
    }

    const date = this.api.formatDate(this.date);
    const link = this.generateLink('employee-payrolls/pf?date=' + date);
    this.api.getdata(link).subscribe((res: any[]) => {
      const title = res[0].Company;
      const data = res.map((e: any) => {
        delete e.Company;
        return e;
      });
      const pdfData = this.generatePDFArray(data, ['PF'], false);
      const description = 'PF Report for ' + date;
      this.api.pdfReport(pdfData, title, 'portrait', description, '.')
    });
  }

  mapTaxList(data: any[]): any[] {
    return data.map((e: any) => {
      return { ID: e.IDNo, Name: e.EmpName, Company: e.Unit, Month: e.Month, Salary: e.GrossSalary, Deduction: e.TaxDeduction };
    });
  }

  taxList() {
    const from = this.api.formatDate(this.taxFrom), to = this.api.formatDate(this.taxTo);
    const link = this.generateLink('employee-payrolls/taxStatement?to=' + to + '&from=' + from);
    this.api.getdata(link).subscribe((res: any[]) => {
      const data = this.mapTaxList(res);
      const description = 'From ' + from + ' To ' + to;
      this.api.exportExcel(data, [['Monthly Tax Deduction'], [description]], 'Tax Report', new Array(8).fill(20));
    });
  }

  taxListPdf() {
    const from = this.api.formatDate(this.taxFrom), to = this.api.formatDate(this.taxTo);
    const link = this.generateLink('employee-payrolls/taxStatement?to=' + to + '&from=' + from);
    this.api.getdata(link).subscribe((res: any[]) => {
      const data = this.generatePDFArray(this.mapTaxList(res), ['Salary', 'Deduction'], false);
      this.api.pdfReport(data, 'Tax List', 'portrait', 'From ' + from + ' To ' + to, '.')
    })
  }

  tentativeSalary() {
    const from = this.api.formatDate(this.tentativeFrom), to = this.api.formatDate(this.tentativeTo);
    const link = this.generateLink('employee-payrolls/tentativeSlary?to=' + to + '&from=' + from);
    this.api.getdata(link).subscribe((res: any[]) => {
      console.log(res);
      const data = res.map((e: any) => {
        return { Unit: e.Unit, AttendSalary: e.AttendSalary, TaxAmount: e.TaxAmount, CDAmount: e.CDAmount, PayableSalary: e.PayableSalary, RocketAmount: e.RocketAmount, BankAmount: e.BankAmount, CashAmount: e.CashAmount };
      });

      const description = 'From ' + from + ' To ' + to;
      this.api.exportExcel(data, [['Tentative Unit wise Salary'], [description]], 'Tentative Unit wise Salary', new Array(8).fill(20));
    })
  }

  attWiseEmpList() {
    const from = this.api.formatDate(this.attendanceFrom), to = this.api.formatDate(this.attendanceTo);
    const link = this.generateLink('employee-payrolls/attWiseEmpList?to=' + to + '&from=' + from);
    this.api.getdata(link).subscribe((res: any[]) => {
      console.log(res);
      const data = res.map((e: any) => {
        return { Unit: e.Unit, DptPos: e.DptPos, DeptEngNm: e.DeptEngNm, EMP_CARD_NO: e.EMP_CARD_NO, EMP_NAME_ENG: e.EMP_NAME_ENG, PRESENT_SALARY: e.PRESENT_SALARY, EmpType: e.EmpType, PR: e.PR, NoOfWeekend: e.NoOfWeekend, NoOfHoliday: e.NoOfHoliday, NoOfLeave: e.NoOfLeave, Workingdays: e.Workingdays, Extradays: e.Extradays, AbsentDays: e.AbsentDays, AbsentAmountForWorkers: e.AbsentAmountForWorkers, WorkingAmount: e.WorkingAmount, RocketAC: e.RocketAC, BANK_ACCOUNT_NO: e.BANK_ACCOUNT_NO, ITDS: e.ITDS, PF_AMOUNT: e.PF_AMOUNT };
      });

      const description = 'From ' + from + ' To ' + to;
      this.api.exportExcel(data, [['Attendance wise Employee List'], [description]], 'Attendance wise Employee List', new Array(8).fill(20));
    })
  }

  mapIncrement(data: any[]): any[] {
    return data.map((e: any) => {
      return {
        'Employee': e.Name, 'Card': e.IDNo, 'Department': e.Dept, 'Designation': e.Designation, 'Join Date': e.Joining,
        'Present Salary': e.PresentSalary, 'Increment': e.Increment, 'Total Salary': e.TotalSalary
      }
    });
  }

  incrementPDF() {
    const link = this.generateLink('employee-payrolls/incrementList?date=' + this.api.formatDate(this.date));
    this.api.getdata(link).subscribe((res: any[]) => {
      const pdfData = this.generatePDFArray(this.mapIncrement(res), ['Present Salary', 'Increment', 'Total Salary']);
      this.api.pdfReport(pdfData, res[0].Unit, 'portrait', res[0].ReportTitle, '.');
    });
  }

  incrementExcel() {
    const link = this.generateLink('employee-payrolls/incrementList?date=' + this.api.formatDate(this.date));
    this.api.getdata(link).subscribe((res: any[]) => {
      const widths = new Array(8).fill(20);
      this.api.exportExcel(this.mapIncrement(res), [[res[0].ReportTitle]], res[0].ReportTitle, widths);
    });
  }

  mapTransferList(data: any[]): any[] {
    return data.map((e: any) => {
      return {
        'Employee': e.Name, 'Card': e.CadrNo, 'Current Department': e.TrasferedDeptment, 'Previous Department': e.PreviousDeprtment,
        'Current Designation': e.TrasferedDesignnation, 'Previous Dessignation': e.PreviousDesignation, 'Current Grade': e.TrasferedGrade,
        'Previous Grade': e.PreviousGrade, 'Present Salary': e.PresentSalary, 'Transfer Date': e.TrasferDate, 'Join Date': e.Joining
      };
    });
  }

  transferList() {
    const link = this.generateLink('employee-payrolls/monthlyTransferList?date=' + this.api.formatDate(this.date));
    this.api.getdata(link).subscribe((res: any[]) => {
      const data = this.mapTransferList(res);
      const widths = new Array(8).fill(20);
      this.api.exportExcel(data, [['Monthly Transfer Report']], 'Transfer Report', widths);
    });
  }

  transferListPDF() {
    const link = this.generateLink('employee-payrolls/monthlyTransferList?date=' + this.api.formatDate(this.date));
    this.api.getdata(link).subscribe((res: any[]) => {
      const data = this.generatePDFArray(this.mapTransferList(res), ['Present Salary']);
      this.api.pdfReport(data, 'Monthly Transfer List', 'portrait', '', '.');
    })
  }

  statementGridView() {
    let link = `employee-payrolls/getSalaryStatement?PayrollDate=` + this.api.formatDate(this.date);
    if (this.company) link += `&DIVISION_ID=` + this.company.replace('#', '|');
    if (this.department) link += `&DEPARTMENT_ID=` + this.department.replace('#', '|');
    if (this.card) link += `&EMP_CARD_NO=` + this.card;
    this.api.getdata(link).subscribe((res: any[]) => {
      this.statementGrid = res.slice(0, this.itemsPerPage);
      this.allStatementGrid = res;
      this.totalItemCount = res.length;
    });
  }
  statementGridViewCash() {
    let link = `employee-payrolls/getSalaryStatementCash?PayrollDate=` + this.api.formatDate(this.date);
    if (this.company) link += `&DIVISION_ID=` + this.company.replace('#', '|');
    if (this.department) link += `&DEPARTMENT_ID=` + this.department.replace('#', '|');
    if (this.card) link += `&EMP_CARD_NO=` + this.card;
    this.api.getdata(link).subscribe((res: any[]) => {
      this.statementGrid = res.slice(0, this.itemsPerPage);
      this.allStatementGrid = res;
      this.totalItemCount = res.length;
    });
  }
  checkAll() {
    this.checks.fill(this.allCheck);
  }

  pageChange() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.statementGrid = this.allStatementGrid.slice(start, end);
  }

  reset() {
    this.card = null;
    this.department = null;
    this.company = null;
    this.date = new Date();
    this.typeoftran=null;
  }

  generateLink(link: string): string {
    if (this.company) link += `&company=` + encodeURIComponent(this.company);
    if (this.department) link += `&department=` + encodeURIComponent(this.department);
    if (this.card) link += `&card=` + this.card;
    return link
  }

  stopList() {
    let link = 'employee-payrolls/stopList?fromDate=' + this.api.formatDate(this.stopFrom) + '&toDate='
      + this.api.formatDate(this.stopTo) + '&monthDate=' + this.api.formatDate(this.date);
    if (this.company) link += '&company=' + encodeURIComponent(this.company);
    this.api.getdata(link).subscribe((res: any[]) => {
      const data = res.map((e: any) => {
        return { 'Name': e.EmNpame, 'Card': e.IDNo, 'Department': e.department, 'Designation': e.Designation, 'Join Date': e.Joining };
      });
      this.api.exportExcel(data, [['Stop List']], 'Stop List', [30, 10, 30, 20, 15]);
    });
  }

  mapEmployeeData(data: any[]): any[] {
    return data.map((e: any) => {
      return {
        Company: e.Company, Department: e.Department, 'ID No.': e.IDNo, Name: e.Name, Designation: e.Designation
        
        
      };
    })
  }

  employeeList() {
    const link = this.generateLink(`psn-employees/salaryInfo?`);
    this.api.getdata(link).subscribe((res: any[]) => {
      const data = this.mapEmployeeData(res);
      this.api.exportExcel(data, [['Employee List']], 'Employee List', [30, 10, 30, 20, 15]);
    });
  }

  employeeListPDF() {
    const link = this.generateLink('psn-employees/salaryInfo?');
    this.api.getdata(link).subscribe((res: any[]) => {
      const data = this.generatePDFArray(this.mapEmployeeData(res), ['Present Salary']);
      data[data.length - 1][2] = 'Employees ' + res.length;
      this.api.pdfReport(data, 'Employee List', 'portrait', '', '.');
    });
  }

  mapRejoinList(data: any[]): any[] {
    return data.map((e: any) => {
      return {
        Name: e.EmpName, Card: e.IDNo, Department: e.Department, Designation: e.Designation, 'Rejoin Date': e.RejoiningDate,
        Salary: e.PRESENT_SALARY, Remarks: e.REMARKS
      };
    })
  }

  rejoinList() {
    let link = this.generateLink('employee-payrolls/rejoinList?date=' + this.api.formatDate(this.date));
    this.api.getdata(link).subscribe((res: any[]) => {
      this.api.exportExcel(this.mapRejoinList(res), [['Monthly Rejoining List']], 'Monthly Rejoining List', [30, 10, 30, 20, 15, 20]);
    });
  }

  rejoinListPDF() {
    let link = this.generateLink('employee-payrolls/rejoinList?date=' + this.api.formatDate(this.date));
    this.api.getdata(link).subscribe((res: any[]) => {
      const data = this.generatePDFArray(this.mapRejoinList(res), ['Salary']);
      this.api.pdfReport(data, 'Monthly Rejoin List', 'portrait', '', '.')
    })
  }

  rocket() {
    let link = this.generateLink('employee-payrolls/rocketList?date=' + this.api.formatDate(this.date));

    this.api.getdata(link).subscribe((res: any[]) => {
      const data = res.map((e: any) => {
        return { Name: e.Name, Card: e.ID, Company: e.Unit, 'Rocket Number': e['Rocket Number'], Salary: e.Amount };
      });
      this.api.exportExcel(data, [['Rocket Advice']], 'rocket', [30, 10, 30, 20, 15, 20]);
    });
  }

  editSalary(index: number) {
    const title = this.statementGrid[index].EmployeeName + ' - ' + this.statementGrid[index].CardNo;
    const input = {card: this.statementGrid[index].IDNo, date: this.api.formatDate(this.date)};
    this.modalService.open(new EditDetail(title, 'editSalary', input));
  }

  generateEstimate() {
    const link = this.generateLink(`employee-payrolls/generateEstimate?date=` + this.api.formatDate(this.date));
    this.api.getdata(link).subscribe(res => {
      if (res) this.api.showSuccessToast('Estimate Created');
    })
  }

  bankStatement() {
    const link = this.generateLink(`employee-payrolls/bankData?date=` + this.api.formatDate(this.date));

    this.api.getdata(link).subscribe((res: any[]) => {
      const data = res.map((e: any, index: number) => {
        return {
          Si: index + 1, Card: e.CardNo, Employee: e.EmployeeName, Account: e.AccountNNumber, Amount: e.BankAmount
        }
      });

      this.api.exportExcel(data, [['Bank Statement']], 'Bank Statement', [5, 10, 30, 20, 15]);
    });
  }

  officerPayslip() {
    const link = this.generateLink(`employee-payrolls/workerPaySlip?date=` + this.api.formatDate(this.date))
    this.route.navigateByUrl('payroll/officerpayslip?link=' + encodeURIComponent(link));
  }

  workerPayslip() {
    this.route.navigateByUrl('payroll/workerpayslip?date=' + this.api.formatDate(this.date));
  }

  blockSalary() {
    if(!this.company) {
      this.api.showWarningToast('Enter Company');
      return;
    }
    const link = this.generateLink(`employee-payrolls/lockSalary?date=` + this.api.formatDate(this.date));
    this.api.getdata(link).subscribe((res: any) => {
      if(res) this.api.showSuccessToast('Salary Blocked');
    });
  }
  

  createStyle(text: string | number, bold: boolean, alignment: string = 'left'): any {
    return { text, style: { bold, fontSize: 7 }, alignment};
  }

  pageContents(data: any[], department: string, serialStart: number, enterRow: boolean, page: number): any[] {
    const tableHead = [[
      'SL','IDNo.', 'Employee Name\nJoining Date','Designation', 'Work\nDays', 'Gross\nSalary',  'Salary\nEarned\nasper\nAttnd', 
      'Basic','House\nRent', 'Medical', 'Convey\nance', 'Other\nAllow', 'Tiffin\nAllow', 'Misc.\nAllow./\nIncr.\nArear\nL','Fest.\nBonus', 
      'Perform\nBonus', 'OT\nHour', 'OT\nAmnt', 'Total\nGross\nEarning', 'ITDS','PF','Advance\n(B)', 'Loan', 'PF Loan', 
      'EIPS', 'Others', 'Total\nDeduction', 'Net\nAmount\nPayable', 
     // 'Pay\nable\nAmnt\nN-B+L-W', 'Ded.\nAmnt',  'Cash', 'Bank', 'Rocket', 
      'Signature      '
    ].map((header) => this.createStyle(header, true))];

    const length = tableHead[0].length;
    const widths = [8, 35,75,65].concat(new Array(length - 4).fill('auto'));
    if (!this.lastRow) this.lastRow = new Array(length).fill(0);

    
    const content: any = [
      { text: this.allStatementGrid[0].Unit, fontSize: 14, alignment: 'center', bold: false, margin: [0, 0, 0, 4] },
      { text: this.allStatementGrid[0].UnitAddress, fontSize: 10, alignment: 'center', bold: false, margin: [0, 0, 0, 2] },
      { text: this.allStatementGrid[0].ReportTitle, fontSize: 14, alignment: 'center', bold: true, margin: [0, 0, 0, 2] },
      { text: 'Department: ' + department, fontSize: 14, alignment: 'center', bold: false, margin: [0, 0, 0, 2] },
      {
        text: this.date.toLocaleString('default', { month: 'long' }) + ' ' + this.date.getFullYear(),
        fontSize: 10, alignment: 'center', bold: true, margin: [0, 0, 0, 6]
      },
    ];

    const tableData = data.map((e: any, index: number) => {
      const currentRow = [
        index + serialStart,e.CardNo,  e.EmployeeName + '\n       ' +'\n' + e.Joining  , e.Designation, e.GradeName, e.PrvMonthSalary, e.PresentSalary,
        e.BasicAmount, e.HousdeRent, e.MedicalAmount, e.Conveyance, e.LaunchAmount,e['Allow-Incr-Arear'], e.SpecialAllowance, e.FESTIVAL_BONUS, e.ATTENDANCE_BONOUS, e.OTHour, e.OTAmount, e.TotalEarning,e.TaxAmount,e.CDAmountDeposit,e.AdvanceAmount, e.Loan,
        e.PFLoan, e.EIPS,e.adjustmentAmount , e.TotalDeduction, e.PayableSalary,  
       // e.PayableSalary,  e.LatejoiningDays,  e.CashAmount, e.BankAmount, e.RocketAmount, 
         ''
      ];
      for (let i = 4; i < length - 1; i++) this.lastRow[i] += Number.parseInt(currentRow[i]);
      return currentRow.map((e: string, index: number) => {
        let alignment: string;
        index === 1 || index === 2 || index === 3? alignment = 'left': alignment = 'right';
       //index === 2? alignment = 'left': alignment = 'right';
        return this.createStyle(e, false, alignment);
      });
    });

    if(enterRow) {
      const employeeCount = serialStart + tableData.length - 1;
      this.lastRow[1] = '.\nDept.No.of\nEmp: ' + employeeCount;
      this.lastRow[0] = this.lastRow[2] = this.lastRow[length - 1] = '';
      tableData.push(this.lastRow.map((e: string, index: number) => {
        let alignment: string;
        index === 1? alignment = 'left': alignment = 'right';
        return this.createStyle(e, false, alignment) 
      }));
      this.lastRow = new Array(length).fill(0);
    }    

    content.push({table: {headerRows: 1, widths: widths, body: tableHead.concat(tableData) }});
    content.push({text: '', fontSize: 10, alignment: 'left', bold: true, margin: [0, 0, 0, 47]});
    content.push({
      table: {
        widths: ['*', '*', '*'], body: [
          [
            { text: '_______________________', alignment: 'center' },
            { text: '_______________________', alignment: 'center' },
            { text: '_______________________', alignment: 'center' },
          ],
          [
            { text: 'Prepared By', alignment: 'center' },
            { text: 'Checked By', alignment: 'center' },
            { text: 'Approved By', alignment: 'center' },
          ],
        ]
      }, layout: 'noBorders'
    });
    const footerText = 'Printed On ' + new Date().toString() + ' Printed By ' + sessionStorage.getItem('username');
    content.push({
      table: {
        widths: ['*', '*'], body: [
          [
            {text: footerText, alignment: 'left', width: 'auto', fontSize: 5}, 
            {text: 'Page: ' + page, width: 'auto', alignment: 'right', fontSize: 5}
          ]
        ]
      }, layout: 'noBorders', pageBreak: 'after', margin: [0, 20, 0, 0]
    });

    return content;
  }

  statement() {
    const docDefinition = { pageOrientation: 'landscape', pageSize: 'LEGAL', pageMargins: [18, 30, 30, 1], content: [] };
    const length = this.allStatementGrid.length;
    let start = 0, i = 0, serial = 1, page = 1, changeDepartment = false, pdfContent = [], currentDepartment = this.allStatementGrid[0].Department;

    while(start < length) {
      for(; i < start + 8; i++) {
        if(i == length || currentDepartment != this.allStatementGrid[i].Department) {
          changeDepartment = true;
          break;
        }
      }
      pdfContent.push(this.pageContents(this.allStatementGrid.slice(start, i), currentDepartment, serial, changeDepartment, page));
      serial += 8;

      if(changeDepartment && i < length) {
        currentDepartment = this.allStatementGrid[i].Department;
        changeDepartment = false;
        serial = 1;
      }
      start = i;
      page++;
    }

    docDefinition.content = pdfContent;
    pdfmake.createPdf(docDefinition).open();
  }
  statementcash() {

   // this.statementGridViewCash();

    const docDefinition = { pageOrientation: 'landscape', pageSize: 'LEGAL', pageMargins: [18, 30, 30, 1], content: [] };
    const length = this.allStatementGrid.length;
    let start = 0, i = 0, serial = 1, page = 1, changeDepartment = false, pdfContent = [], currentDepartment = this.allStatementGrid[0].Department;

    while(start < length) {
      for(; i < start + 8; i++) {
        if(i == length || currentDepartment != this.allStatementGrid[i].Department) {
          changeDepartment = true;
          break;
        }
      }
      pdfContent.push(this.pageContents(this.allStatementGrid.slice(start, i), currentDepartment, serial, changeDepartment, page));
      serial += 8;

      if(changeDepartment && i < length) {
        currentDepartment = this.allStatementGrid[i].Department;
        changeDepartment = false;
        serial = 1;
      }
      start = i;
      page++;
    }

    docDefinition.content = pdfContent;
    pdfmake.createPdf(docDefinition).open();
  }
  statementExcel() {
    const data = this.allStatementGrid.map((e: any) => {
        delete e.DptPos;
        delete e.Position;
        delete e.Unit;
        delete e.UnitAddress;
        delete e.ReportTitle;
        delete e.SalaryMonth;
        e.ManualDays = e.MedicalDays;
        delete e.MedicalDays;

        return e;
    })

    this.api.exportExcel(data, [[this.allStatementGrid[0].ReportTitle]], 'salary-statement' , [20, 20, 20, 20]);
  }

  patch() {
    this.allStatementGrid.forEach((element: any, index: number) => {
      if (this.checks[index]) {
        const sendData = {
          "EMP_ID": element.CardNo,
          "MonthFileName": this.api.formatDate(this.date),
          "OnOff": 0,
        };
        this.api.postdata('employee-payrolls/updateSalaryOnOff', sendData).subscribe((res: any) => {
          this.api.showSuccessToast('Success', res.message);
          //console.log(res);
        });
      }
    });
  }

  salaryReactive() {
    this.allStatementGrid.forEach((element: any, index: number) => {
      if (this.checks[index]) {
        const sendData = {
          "EMP_ID": element.CardNo,
          "MonthFileName": this.api.formatDate(this.date),
          "OnOff": 1,
        };
        this.api.postdata('employee-payrolls/updateSalaryOnOff', sendData).subscribe((res: any) => {
          this.api.showSuccessToast('Success', res.message);
          //console.log(res);
        });
      }
    });
  }
  
  
  summeryPageContents(data: any[], serialStart: number, enterRow: boolean): any[] {
    const tableHead = [[
      'SL', 'Dept', 'No.\nof\nEmp', 'Gross\nSalary', 'Salary Earned\nasper\nAttnd', 'Basic', 'House\nRent', 'Medical', 
      'Conve\nyance', 'Other\nAllow.', 'Tiffin\nAllow', 'Misc\nAllow.', 'Fest.\nBonus', 'Perform\nBonus', 'OT\nHour', 'OT\nAmnt', 'Total Gross\nEarning',
      'ITDS', 'PF', 'Advance', 'Loan', 'PFLoan', 'EIPS', 'Others', 'Total Deduction', 'Net Amount\nPayable'
    ].map((header) => this.createStyle(header, true))];

    const length = tableHead[0].length;
    if (!this.lastRow) this.lastRow = new Array(length).fill(0);

    const content: any = [
      {text: data[0].Unit, fontSize: 14, fontName: 'Arial', alignment: 'center', bold: true, margin: [0, 0, 0, 4]},
      {text: data[0].UnitAddress, fontSize: 12, alignment: 'center', bold: false, margin: [0, 0, 0, 4]},
      {text: data[0].ReportTitle, fontSize: 14, alignment: 'center', bold: true, margin: [0, 0, 0, 4]},
      {text: data[0].SalaryMonth, fontSize: 12, alignment: 'center', bold: false, margin: [0, 0, 0, 2]},
    ];

    const tableData = data.map((e: any, index: number) => {
      const currentRow = [
        index + serialStart, e.Department, e.NoOfEmp, e.PrvMonthSalary, e.Increment, e.BasicAmount, e.HousdeRent, e.MedicalAmount,
        e.Conveyance, e.LaunchAmount, e['Allow-Incr-Arear'], e.SpecialAllowance,  e.FESTIVAL_BONUS, e.ATTENDANCE_BONOUS, e.OTHour,
        e.OTAmount, e.TotalEarning, e.TaxAmount, e.CDAmountDeposit, e.AdvanceAmount, e.Loan, e.PFLoan, e.EIPS, e.adjustmentAmount,
        e.TotalDeduction, e.PayableSalary
      ];
      for (let i = 2; i < length; i++) this.lastRow[i] += Number.parseInt(currentRow[i]);
      return currentRow.map((e: string, index: number) => {
        let alignment: string;
        index < 2? alignment = 'left': alignment = 'right';
        return this.createStyle(e, false, alignment);
      });
    });

    if(enterRow) {
      this.lastRow[1] = 'Total';
      this.lastRow[0] = '';
      tableData.push(this.lastRow.map((e: string, index: number) => {
        let alignment: string;
        index < 2? alignment = 'left': alignment = 'right';

        const styleObject = this.createStyle(e, false, alignment);
        styleObject.style.fontSize = 5
        return styleObject;
      }));
      this.lastRow = new Array(length).fill(0);
    }    
    
    const tableObject: any = {table: {headerRows: 1, body: tableHead.concat(tableData)}}
    if(!enterRow) tableObject.pageBreak = 'after';
    content.push(tableObject);
    return content;
  }

  statementSummery() {
    const link = this.generateLink(`employee-payrolls/payrollSummery?date=` + this.api.formatDate(this.date));
    const footerText = '.          Printed On ' + new Date().toString() + ' Printed By ' + sessionStorage.getItem('username');
    
    this.api.getdata(link).subscribe((res: any[]) => { 
      const docDefinition = {
        footer: function(currentPage, pageCount) {
          return {columns: [
            {text: footerText, alignment: 'left', fontSize: 5 }, {text: currentPage + '      |', alignment: 'right', fontSize: 5}
          ]};
        },
        pageOrientation: 'landscape', pageSize: 'LEGAL', content: null
      };//doc definition

      const pageSize = 20
      let docData = [];
      for(let i = 0; i < 5; i++) {
        const start = (i * pageSize);
        if(start > res.length - 1) break;
        const end = start + pageSize;
        const lastPage = end > res.length - 1;
        docData = docData.concat(this.summeryPageContents(res.slice(start, end), start + 1, lastPage));
      }

      docData.push({text: '', fontSize: 10, alignment: 'center', bold: true, margin: [0, 50, 0, 0]},);
      docData.push({
        table: {widths: ['*', '*', '*', '*', '*'],  body: [
        [
          {text: '_______________________', alignment: 'center' },
          {text: '_______________________', alignment: 'center' }, 
          {text: '_______________________', alignment: 'center' },
          {text: '_______________________', alignment: 'center' },
          {text: '_______________________', alignment: 'center' },
        //  {text: '_______________________', alignment: 'center' },
         // {text: '_______________________', alignment: 'center' }
        ],
        [
          {text: 'Prepared By', alignment: 'center' },
          {text: 'Checked By', alignment: 'center' },
         // {text: 'Head of HR', alignment: 'center' }, 
          {text: 'AGM Finance', alignment: 'center' }, 
          {text: 'DGM Accounts', alignment: 'center' }, 
         // {text: 'CEO', alignment: 'center' },
          {text: 'Approved By', alignment: 'center' }
        ]] }, layout: 'noBorders'
      });

      docDefinition.content = docData;
      pdfmake.createPdf(docDefinition).open();
    });//getData
  }

  estimateSalary() {
    const link = this.generateLink(`employee-payrolls/getEstimate?date=` + this.api.formatDate(this.date));
    this.api.getdata(link).subscribe((res: any[]) => {
      const docDefinition = {pageOrientation: 'landscape', pageSize: 'LEGAL', content: null};
      const pageSize = 20;
      let docData = [];
      for(let i = 0; i < 5; i++) {
        const start = (i * pageSize);
        if(start > res.length) break;
        const end = start + pageSize;
        const lastPage = end > res.length;
        docData = docData.concat(this.summeryPageContents(res.slice(start, end), start + 1, lastPage));
      }

      docDefinition.content = docData;
      pdfmake.createPdf(docDefinition).open();
    });
  }

  sectionStatementSummery() {
    const link = this.generateLink(`employee-payrolls/sectionStatementSummery?date=` + this.api.formatDate(this.date));

    this.api.getdata(link).subscribe((res: any[]) => {
      const docDefinition = {pageOrientation: 'landscape', pageSize: 'LEGAL', content: null};
      const pageSize = 11;
      let docData = [];
      
      for(let i = 0; i < 5; i++) {
        const start = (i * pageSize);
        if(start >= res.length) break;
        const end = start + pageSize;
        const lastPage = end >= res.length;
        docData = docData.concat(this.summeryPageContents(
          res.slice(start, end).map((e: any) => {
            e.Department = e.GroupName;
            return e;
          }), start + 1, lastPage
        ));
      }

      docDefinition.content = docData;
      pdfmake.createPdf(docDefinition).open();
    });
  }

  statementSummeryExcel() {
    const link = this.generateLink(`employee-payrolls/payrollSummery?date=` + this.api.formatDate(this.date));
    this.api.getdata(link).subscribe((res: any[]) => {
      const description = 'Salary Summery for ' + res[0].SalaryMonth;
      const data = res.map((e: any) => {
        delete e.DptPos;
        delete e.UnitAddress;
        delete e.SalaryMonth;
        delete e.ReportTitle;

        return e;
      });

      this.api.exportExcel(data, [[description]], 'Salary Summery', [20, 20, 20]);
    });
  }

  createStyle1(text: string | number, bold: boolean, fontSize: number = 7): any {
    return { text, style: { bold, fontSize } , colSpan:5}
  }

  draftLetterPdf() {
    const footerText = '.          Printed On ' + new Date().toString() + ' Printed By ' + sessionStorage.getItem('username');
    const docDefinition = { 
      pageOrientation: 'portrait', pageSize: 'A4', pageMargins: [10, 90, 30, 45], content: [], 
      footer: function(currentPage, pageCount) {
        return {columns: [
          {text: footerText, alignment: 'left', fontSize: 5 }, {text: currentPage + '      |', alignment: 'right', fontSize: 5}
        ]};
      },
    };
    this.api.getdata(`psn-employees/getBankAdviseWithDraft?UnitID=` + encodeURIComponent(this.company) + `&Date=` + this.api.formatDate(this.date) + `&AdviseType=1`).subscribe((res: any[]) => {
      const link = this.generateLink(`employee-payrolls/bankData?date=` + this.api.formatDate(this.date));
      this.api.getdata(link).subscribe((res1: any[]) => {

        const tableHead = [['Unit', 'Employee Name', 'Card No', 'Account Number', 'Amount'].map((header) => this.createStyle(header, true))];

        const content: any = [
          {
            table: {
              widths: ['*', '*'], body: [
                [
                  { text: res[0].RefrenceNo, fontSize: 8, alignment: 'left' },
                  {
                    text: this.date.toLocaleString('default', { month: 'long' }) + ' ' + this.date.getFullYear(), alignment: 'right'
                    , fontSize: 8, bold: true, margin: [0, 0, 0, 0]
                  }
                ]
              ]
            }, layout: 'noBorders'
          },
          { text: res[0].RefTo, fontSize: 8, alignment: 'left', bold: false, margin: [0, 0, 0, 0] },
          { text: res[0].RefSubject, fontSize: 8, alignment: 'left', bold: false, margin: [0, 10, 0, 10] },
          { text: 'Dear Sir', fontSize: 8, alignment: 'left', bold: true, margin: [0, 0, 0, 0] },
          { text: res[0].DraftBody, fontSize: 8, alignment: 'left', bold: false, margin: [0, 10, 0, 10] },
        ];

        const tableData = res1.map((e: any) => {
          const currentRow = [e.Unit, e.EmployeeName, e.CardNo, e.AccountNNumber, e.BankAmount];
          this.lastTotal = 'Total: ' + e.totalBankAmount;
          return currentRow.map((e: string) => this.createStyle(e, false));;
        });


        this.lastTotal = new Array(1).fill(this.lastTotal);
        tableData.push(this.lastTotal.map((e: string) => this.createStyle1(e, true)));
        content.push({ table: { headerRows: 1, widths: ['*', '*', '*', '*', '*'], body: tableHead.concat(tableData) } });
        content.push({ text: res[0].DraftClosing, fontSize: 8, alignment: 'left', bold: false, margin: [0, 10, 0, 10] });
        content.push({ text: 'Thanking You', fontSize: 8, alignment: 'left', bold: false, margin: [0, 40, 0, 0] });
        content.push({ text: 'Best Regards', fontSize: 8, alignment: 'left', bold: false, margin: [0, 0, 0, 0] });

        docDefinition.content = content;
        pdfmake.createPdf(docDefinition).open();
      });

    });
  }

  recketAdvice() {
    if (!this.company) {
      this.api.showWarningToast("select company");
      return;
    }
    if (!this.date) {
      this.api.showWarningToast("select date");
      return;
    }

    this.route.navigateByUrl(`payroll/draftLetter?UnitID=` + encodeURIComponent(this.company) + `&Date=` + this.api.formatDate(this.date) + `&AdviseType=2`);
  }

   wagesExcel() {
     this.api.getdata('employee-payrolls/minimumWasage?date='+ this.api.formatDate(this.date)).subscribe((resp: any) => {
this.wages =resp;
console.log(this.wages)
    setTimeout(()=> {
      const data = resp.result.map((element: any) => {
        return {
          'Unit': element['DIVISION_NAME_ENG'], 'Name': element['EMP_NAME_ENG'], 'Designation': element['DesigNmEng'],
          'IDNo.': element['EMP_CARD_NO'],
          'Joining': element['JOINING_DATE'].substring(0,10), 'Present Salary':element['PRESENT_SALARY'],
          'Work Month': element['WorkMonths'], 'Increment Amount': element['IncrementAmount']
        };
      });
      const lengths = [22, 10, 30, 30, 11, 15, 25, 20, 20, 8, 13, 10, 10, 10, 18];
      this.api.exportExcel(data, [[`Minimum Wages Eligible For Month ${this.date.toJSON().substring(0,10)}`], []], 'Minimum Wages Eligible',  lengths);
    },2000);
     });
  }

  wagesPdf() {
     this.api.getdata('employee-payrolls/minimumWasage?date='+ this.api.formatDate(this.date)).subscribe((resp: any) => {
      this.wages =resp;
       console.log(this.wages)
       setTimeout(() => {
      const data = [[ 'Unit',
        'Name',
        'Designation',
        'IDNo',
        'Joining',
        'Present Salary'
        , 'Work Month',
      'Increment Amount']];
      const title = `Minimum Wages Eligible`

      resp.result.forEach((element: any) => {
        data.push([
          element['DIVISION_NAME_ENG'],
          element['EMP_NAME_ENG'],
          element['DesigNmEng'],
          element['EMP_CARD_NO'],
          element['JOINING_DATE'].substring(0,10),
          element['PRESENT_SALARY'],
          element['WorkMonths'],
          element['IncrementAmount'],
        ]);
      });
      this.api.pdfReport(data, title, 'portrait', `For The Month of ${this.date.toJSON().substring(0,10)}`, '.');
    },2000);
     });
  }
}

  // sectionStatement() {
    // let data = [[
    //   'Si', 'Employee\nInfo', 'Grade', 'Prv\nGross\nSalary', 'Incre\nmen', 'Prsnt\nSalary\n(G)', 
    //   'Basic','House\nRent', 'Med.', 'Lunch', 'Conv\nence', 'CL', 'SL', 'EL', 
    //   'OT\nHrs', 'OT\nRate', 'OT\nAmnt', 'Man\nDays', 'Abs\nDays', 
    //   'A/D\nAmnt', 'Late\nJoin', 'Late\nJoin\nAmnt', 'Net\nSalary\nN=G-1', 'Advance\n(B)', 'Other\nAllow/\nIncr.\nArear\nL',
    //   'Pay\nable\nAmnt\nN-B+L-W', 'Adj\nAmnt', 'Tax\nAmnt', 'Cash', 'Bank', 'Rocket', 'CD\nAmnt\nDeposit', 'Signature'   ],
    // ];
    // const length = data[0].length;
    // const lastrow = new Array(length).fill(0);

    // const link = this.generateLink('employee-payrolls/sectionStatement?date=' + this.api.formatDate(this.date));
    // this.api.getdata(link).subscribe((res: any[]) => {
    //   let currentSection = res[0].GroupName, serial = 1;
    //   data.push(['', '\n' + currentSection + '\n.'].concat(new Array(length - 2).fill('')));

    //   res.forEach((e: any, index: number) => {
    //     if(e.GroupName != currentSection) {
    //       currentSection = e.GroupName;
    //       serial = 1;
    //       data.push(lastrow.map((value: any, index: number) => {
    //         if(index == 1) return 'Section Total'
    //         else if(index < 3 || index == length - 1) return '';
    //         else return value;
    //       }));
    //       lastrow.fill(0);
    //       data.push(['', '\n' + currentSection + '\n.'].concat(new Array(length - 2).fill(''))); 
    //     }

    //     const newRow = [
    //       serial, e.CardNo + '\n' + e.EmployeeName+'\n'+ e.Joining+'\n'+e.Designation, '', e.PrvMonthSalary, e.INCREMENT, e.PresentSalary, 
    //       e.BasicAmount, e.HousdeRent, e.MedicalAmount, e.LaunchAmount, e.Conveyance, e.CL, e.SL, e.EL, e.OTHour, e.OTRate, e.OTAmount, 0, 
    //       e.AbsentDays, e.AbsentAmount, e.LatejoiningDays, e.LateJoiningAmount, e.NetSalary, e.AdvanceAmount, e['Allow-Incr-Arear'], 
    //       e.PayableSalary, e.adjustmentAmount, e.TaxAmount,e.CashAmount, e.BankAmount, e.RocketAmount, e.CDAmountDeposit, ''
    //     ];

    //     serial++;

    //     for(let i = 3; i < length - 1; i++) lastrow[i] += Number.parseInt(newRow[i]); 
    //     data.push(newRow);
    //   });

    //   data.push(lastrow.map((value: any, index: number) => {
    //     if(index == 1) return 'Department Total'
    //     else if(index < 3 || index == length - 1) return '';
    //     else return value;
    //   }));
    //   this.pdfReport(data, 'Salary Statement', res[0].UnitAddress);
    // })
  // }
