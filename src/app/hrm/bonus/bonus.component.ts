import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import * as pdfmake from 'pdfmake-lite/build/pdfmake';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.css']
})
export class BonusComponent implements OnInit {
  checks: boolean[];
  allCheck = false;
  lastRow: any[];
  companies: any[];
  departments: any[];
  statements: any[];
  allStatements: any[];
  totalItemCount = 0;
  itemsPerPage = 25;
  currentPage = 1;
  date: Date;
  bonus: {
    name: string, card: string, company: string, days: number, department: string, month: string, calculation: string, percentage: number, fixed: number, creator: string
  };

  constructor(private api: ApiService, private datePipe: DatePipe) {
    this.checks = new Array(this.itemsPerPage).fill(false);
    this.date = new Date();
    this.bonus = {
      company: '', days: 179, department: '', percentage: 0, fixed: 0, creator: sessionStorage.getItem('username'),
      month: null, calculation: null, name: null, card: ''
    };
   }

  ngOnInit() {
    this.api.getdata('employee-attendences/companies?id=true').subscribe((res: any[]) => this.companies = res);
    this.api.getdata('employee-attendences/departments').subscribe((res: any[]) => this.departments = res);
  }

  changeAllCheck() {
    this.checks.fill(this.allCheck);
  }

  blockBonus() {
    if(!this.checks.includes(true)) {
      this.api.showWarningToast('Select an Employee');
      return;
    }
    const date = this.api.formatDate(this.date);
    this.statements.forEach((e: any, index: number) => {
      if(!this.checks[index]) return;

      this.api.patchdata('employee-payrolls/blockBonus', {date, card: e.IDNo}).subscribe(res => {
        if(res) {
          this.api.showSuccessToast('Salary Blocked');
        }
      })
    })
  }

  statetmentExcel() {
    const data = this.allStatements.map((e: any) => {
      return {
        ID: e.IDNo, Name: e.EmpName, Designation: e.Designation, Department: e.Deptment, 'Join Date': e.Joining, 'Present Salary': e.PresentSalary, 
        Basic: e.BasicAmount, Bonus: e.BonusPayable, Cash: e.CashAmount, Bank: e.BankAmount, Rocket: e.RocketAmount
      } 
    });

    this.api.exportExcel(data, [[this.allStatements[0].Unit], ['Bonus Statement'], [this.allStatements[0].BonusMonth]], 'Bonus Statement', [10, 20, 20, 20]);
  }

  companyCheck(): boolean {
    if(!this.bonus.company) {
      this.api.showWarningToast('Select Company');
      return false;
    }
    return true;
  }

  generateLink(link: string): string {
    link += '?date=' + this.api.formatDate(this.date);
    if (this.bonus.company) link += `&company=` + encodeURIComponent(this.bonus.company);
    if (this.bonus.department) link += `&department=` + encodeURIComponent(this.bonus.department);
    if (this.bonus.card) link += `&card=` + encodeURIComponent(this.bonus.card);

    return link
  }

  eligibleListLink(date: string): string {
    if(!this.companyCheck()) return null;

    if(!this.bonus.days) {
      this.api.showWarningToast('Enter Working Days');
      return null;
    }

    let link = 'employee-payrolls/bonusList?date=' + date + 
      '&days=' + this.bonus.days + '&company=' + encodeURIComponent(this.bonus.company);
    if(this.bonus.department) link += '&department=' + encodeURIComponent(this.bonus.department);

    return link;
  }

  eligibleList() {
    const date = this.api.formatDate(this.date);
    const link = this.eligibleListLink(date);
    if(!link) return;

    this.api.getdata(link).subscribe((res: any[]) => {
      const data = res.map((e: any) => {
        return {
          Name: e.EmpName, ID: e.IDNo, Designation: e.Designation, Department: e.Dept, Section: e.Section, 'Joining Date': e.Joining, 
          Salary: e.PresentSalary, Basic: e.BasicAmount
        };
      });
      this.api.exportExcel(data, [['Eligible for Bonus'], [res[0].Unit], [date]], 'Bonus Eligible', [30, 30, 10, 30, 30, 20]);
    });
  }

  createTotalRow(length: number, zeroIndexes: number[], title: string): number[] {
    const row: any[] = ['', title].concat(new Array(length - 2).fill(''));
    zeroIndexes.forEach((index: number) => row[index] = 0);
    return row;
  }

  generatePDFArray(data: any[], sumColumns: string[]): string[][] {
    const headings = ['SL'].concat(Object.keys(data[0]));
    const pdfData = [headings];
    const sumIndex: number[] = [];
    let currentSerial = 1;

    headings.forEach((column: string, index: number) => {
      if (sumColumns.includes(column)) sumIndex.push(index);
    });
    let grandTotalRow: any[] = this.createTotalRow(headings.length, sumIndex, 'Total');

    data.forEach((e: any, index: number) => {
      const currentRow = headings.map((heading: string) => {
        if (heading == 'SL') return currentSerial;
        else return e[heading];
      });
      sumIndex.forEach((index: number) => grandTotalRow[index] += currentRow[index]);
      pdfData.push(currentRow);
      currentSerial++;
    });
    pdfData.push(grandTotalRow);
    return pdfData;
  }

  mapBankAdvice(data: any[]): any[] {
    return data.map((e: any) => {
      return {
        Employee: e.EmpName, 'ID No.': e.IDNo, 'Bank Account': e.BANK_ACCOUNT_NO, Amount: e.BankAmount
      }
    });
  }

  bankAdviceExcel() {
    if(!this.companyCheck()) return;
    const link = this.generateLink('employee-payrolls/bonusbank');

    this.api.getdata(link).subscribe((res: any[]) => {
      const widths = new Array(8).fill(20);
      const title = 'Bonus Bank Advice'
      this.api.exportExcel(this.mapBankAdvice(res), [[title], [res[0].BonusMonth]], title, widths);
    });
  }

  bankAdvice() {
    if(!this.companyCheck()) return;
    const link = this.generateLink('employee-payrolls/bonusbank');
    let total = 0;

    this.api.getdata(link).subscribe((res: any[]) => {
      const pdfData = this.generatePDFArray(this.mapBankAdvice(res), ['Amount']);
      this.api.pdfReport(pdfData, 'Bonus Bank Advice', 'portrait', res[0].BonusMonth, ' ')
    });
  }

  mapRocketAdvice(data: any[]): any[] {
    return data.map((e: any) => {
      return {
        Employee: e.EmpName, 'ID No.': e.IDNo, 'Rocket No.': e.ROCKET_NO, Amount: e.RocketAmount
      }
    })
  }

  rocketAdviceExcel() {
    const link = this.generateLink('employee-payrolls/bonusrocket');
    this.api.getdata(link).subscribe((res: any[]) => {
      const widths = new Array(8).fill(20);
      const title = 'Bonus Rocket Advice'
      this.api.exportExcel(this.mapRocketAdvice(res), [[title], [res[0].BonusMonth]], title, widths);
    });
  }

  rocketAdvice() {
    const link = this.generateLink('employee-payrolls/bonusrocket');
    this.api.getdata(link).subscribe((res: any[]) => {
      const data = this.generatePDFArray(this.mapRocketAdvice(res), ['Amount']);
      this.api.pdfReport(data, 'Bonus Rocket Advice', 'portrait', res[0].BonusMonth, '');
    });
  }

  disburse() {
    const link = this.generateLink('employee-payrolls/disburse');
    this.api.getdata(link).subscribe((res) => {
      if(res) this.api.showSuccessToast('Bonus Disbursed');
    });
  }

  generate() {
    if(!this.bonus.name) {
      this.api.showWarningToast('Enter Bonus Name');
      return;
    }

    if(!this.bonus.month) {
      this.api.showWarningToast('Enter Month');
      return;
    }

    if(!this.bonus.days) {
      this.api.showWarningToast('Enter Total Working Days');
      return;
    }

    if(!this.bonus.calculation) {
      this.api.showWarningToast('Enter Calculation Type');
      return;
    }

    if(!this.bonus.percentage && !this.bonus.fixed) {
      this.api.showWarningToast('Enter Fixed Amount or Percentage Amount');
      return;
    }

    this.bonus.month = this.api.formatDate(this.bonus.month);
    this.api.postdata('employee-payrolls/addBonus', this.bonus).subscribe((res: number) => {
      if(res == 2) {
        this.api.showWarningToast('Bonus Already Created');
      }
      else this.api.showSuccessToast('Bonus Generated');
    });
  }

  createStyle(text: string | number, bold: boolean, alignment: string = 'left'): any {
    return { text, style: { bold, fontSize: 7 }, alignment};
  }

  statetment() {
    if(!this.companyCheck()) return;
    const link = this.generateLink('employee-payrolls/bonusStatetement');
    this.api.getdata(link).subscribe((res: any[]) => {
      this.totalItemCount = res.length
      this.statements = res.slice(0, this.itemsPerPage);
      this.allStatements = res;
    });
    this.currentPage = 1;
  }

  statetmentPDF() {
    const docDefinition = { pageOrientation: 'portrait', pageSize: 'A4', pageMargins: [18, 30, 30, 1], content: [] };
    let start = 0, i = 0, serial = 1, page = 1, changeDepartment = false, pdfContent = [], currentDepartment = this.allStatements[0].Deptment;
    const pageSize = 15,  length = this.totalItemCount;     

    while(start < length) {
      for(; i < start + pageSize; i++) {
        if(i == length || currentDepartment != this.allStatements[i].Deptment) {
          changeDepartment = true;
          break;
        }
      }
      pdfContent.push(this.pageContents(this.allStatements.slice(start, i), currentDepartment, serial, changeDepartment, page));
      serial += pageSize;

      if(changeDepartment && i < length) {
        currentDepartment = this.allStatements[i].Deptment;
        changeDepartment = false;
        serial = 1;
      }
      start = i;
      page++;
    }

    docDefinition.content = pdfContent;
    pdfmake.createPdf(docDefinition).open();
  }

  pageContents(data: any[], department: string, serialStart: number, enterRow: boolean, page: number): any[] {
    const tableHead = [[
      'Sl', 'ID No', 'Employee Name', 'Designation', 'Join Date', 'Present Salary', 'Basic Amount', 'Bonus Amount', 
      'Cash', 'Bank', 'Rocket', 'Employee Signature'
    ].map((header) => this.createStyle(header, true))];

    const length = tableHead[0].length;
    const widths = [12].concat(new Array(length - 1).fill('auto'));
    if (!this.lastRow) this.lastRow = new Array(length).fill(0);

    const content: any = [
      { text: this.allStatements[0].Unit, fontSize: 14, alignment: 'center', bold: false, margin: [0, 0, 0, 2] },
      { text: this.allStatements[0].UnitAddress, fontSize: 10, alignment: 'center', bold: false, margin: [0, 0, 0, 2] },
      { text: 'Bonus Statement', fontSize: 14, alignment: 'center', bold: true, margin: [0, 0, 0, 2] },
      { text: 'Department: ' + department, fontSize: 14, alignment: 'center', bold: false, margin: [0, 0, 0, 2] },
      {
        text: this.date.toLocaleString('default', { month: 'long' }) + ' ' + this.date.getFullYear(),
        fontSize: 10, alignment: 'center', bold: true, margin: [0, 0, 0, 6]
      },
    ];

    const tableData = data.map((e: any, index: number) => {
      const currentRow = [
        index + serialStart, e.IDNo, e.EmpName, e.Designation, e.Joining + '\n.\n.\n.', e.PresentSalary, e.BasicAmount, 
        e.BonusPayable, e.CashAmount, e.BankAmount, e.RocketAmount, ''
      ];
      for (let i = 4; i < length - 1; i++) this.lastRow[i] += Number.parseInt(currentRow[i]);
      return currentRow.map((e: string, index: number) => {
        let alignment: string;
        index < 5? alignment = 'left': alignment = 'right';
        return this.createStyle(e, false, alignment);
      });
    });

    if(enterRow) {
      const employeeCount = serialStart + tableData.length - 1;
      this.lastRow[1] = 'Total';
      this.lastRow[2] = employeeCount;
      this.lastRow[0] = this.lastRow[3] = this.lastRow[4] = this.lastRow[length - 1] = '';
      tableData.push(this.lastRow.map((e: string, index: number) => {
        let alignment: string;
        index < 2? alignment = 'left': alignment = 'right';
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
// console.log(tableHead.concat(tableData));
    return content;
  }

  statementSummeryExcel() {
    if(!this.companyCheck()) return;
    const link = this.generateLink(`employee-payrolls/bonusSummery`);

    this.api.getdata(link).subscribe((res: any[]) => {
      const data = res.map((e: any) => {
        return {
          Department: e.Deptment, Employees: e.NoOfEmp, 'Present Salary': e.PresentSalary, Basic: e.BasicAmount,
          Bonus: e.BonusPayable, Cash: e.CashAmount, Bank: e.BankAmount, Rocket: e.RocketAmount
        }
      });
      const description = [[res[0].Unit], ['Bonus Summery(' + res[0].BonusFileName + ')'], [res[0].BonusMonth]];
      this.api.exportExcel(data, description, 'Bonus Summery', [20, 20, 20]);
    });
  }

  statementSummery() {
    if(!this.companyCheck()) return;
    const link = this.generateLink(`employee-payrolls/bonusSummery`);
    const footerText = '.          Printed On ' + new Date().toString() + ' Printed By ' + sessionStorage.getItem('username');
    
    this.api.getdata(link).subscribe((res: any[]) => { 
      const docDefinition = {
        footer: function(currentPage, pageCount) {
          return {columns: [
            {text: footerText, alignment: 'left', fontSize: 5 }, {text: currentPage + '      |', alignment: 'right', fontSize: 5}
          ]};
        },
        pageOrientation: 'portrait', pageSize: 'A4', content: null
      };//doc definition

      const pageSize = 45
      let docData = [];
      for(let i = 0; i < 5; i++) {
        const start = (i * pageSize);
        if(start > res.length - 1) break;
        const end = start + pageSize;
        const lastPage = end > res.length - 1;
        docData = docData.concat(this.summeryPageContents(res.slice(start, end), start + 1, lastPage));
      }

      docData.push({text: '', fontSize: 10, alignment: 'left', bold: true, margin: [0, 50, 0, 0]},);
      docData.push({
        table: {widths: 'auto',  body: [
        [
          {text: '__________________', alignment: 'center' },
          {text: '__________________', alignment: 'center' }, 
          {text: '__________________', alignment: 'center' },
          {text: '__________________', alignment: 'center' },
          {text: '__________________', alignment: 'center' }
        ],
        [
          {text: 'HR Manager', alignment: 'center' },
          {text: 'Accounts\nManager', alignment: 'center' },
          {text: 'Internal Audit', alignment: 'center' }, 
          {text: 'CFO', alignment: 'center' }, 
          {text: 'Managing\nDirector', alignment: 'center' }, 
        ]] }, layout: 'noBorders'
      });

      docDefinition.content = docData;
      pdfmake.createPdf(docDefinition).open();
    });//getData
  }

  summeryPageContents(data: any[], serialStart: number, enterRow: boolean): any[] {
    const tableHead = [[
      'Si', 'Department', 'No. of Employees', 'Present Salary', 'Basic Amount', 'Bonus Payable', 
      'Cash Amount', 'Bank Amount', 'Rocket Amount',
    ].map((header) => this.createStyle(header, true))];

    const length = tableHead[0].length;
    if (!this.lastRow) this.lastRow = new Array(length).fill(0);

    const content: any = [
      {text: data[0].Unit, fontSize: 14, alignment: 'center', bold: true, margin: [0, 0, 0, 4]},
      {text: 'Bonus Summery (' + data[0].BonusFileName + ')', fontSize: 12, alignment: 'center', bold: false, margin: [0, 0, 0, 4]},
      {text: data[0].BonusMonth, fontSize: 12, alignment: 'center', bold: false, margin: [0, 0, 0, 6]},
    ];

    const tableData = data.map((e: any, index: number) => {
      const currentRow = [
        index + serialStart, e.Deptment, e.NoOfEmp, e.PresentSalary, e.BasicAmount,
        e.BonusPayable, e.CashAmount, e.BankAmount, e.RocketAmount
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
        return styleObject;
      }));
      this.lastRow = new Array(length).fill(0);
    }    
    
    const tableObject: any = {table: {headerRows: 1, body: tableHead.concat(tableData)}}
    if(!enterRow) tableObject.pageBreak = 'after';
    content.push(tableObject);
    return content;
  }

  eligibleListPDF() {
    const date = this.api.formatDate(this.date);
    const link = this.eligibleListLink(date);
    if(!link) return;

    const footerText = '.          Printed On ' + new Date().toString() + ' Printed By ' + sessionStorage.getItem('username');
    this.api.getdata(link).subscribe((res: any[]) => { 
      const docDefinition = {
        footer: function(currentPage, pageCount) {
          return {columns: [
            {text: footerText, alignment: 'left', fontSize: 5 }, {text: currentPage + '      |', alignment: 'right', fontSize: 5}
          ]};
        },
        pageOrientation: 'portrait', pageSize: 'A4', content: null
      };//doc definition

      const pageSize = 33;
      let docData = [];
      for(let i = 0; i < 25; i++) {
        const start = (i * pageSize);
        if(start > res.length - 1) break;
        const end = start + pageSize;
        const lastPage = end > res.length - 1;
        docData = docData.concat(this.eligibleContents(res.slice(start, end), start + 1, lastPage));
      }

      docDefinition.content = docData;
      pdfmake.createPdf(docDefinition).open();
    });//getData
  }

  eligibleContents(data: any[], serialStart: number, enterRow: boolean): any[] {
    const tableHead = [[
      'Si', 'Name', 'ID', 'Designation', 'Department', 'Section', 'Joining Date', 'Salary', 'Basic',
    ].map((header) => this.createStyle(header, true))];

    const length = tableHead[0].length;
    if (!this.lastRow) this.lastRow = new Array(length).fill(0);

    const content: any = [
      {text: data[0].Unit, fontSize: 14, alignment: 'center', bold: true, margin: [0, 0, 0, 4]},
      {text: 'Bonus Eligible List', fontSize: 12, alignment: 'center', bold: false, margin: [0, 0, 0, 4]},
      {text: this.datePipe.transform(this.date), fontSize: 12, alignment: 'center', bold: false, margin: [0, 0, 0, 6]},
    ];

    const tableData = data.map((e: any, index: number) => {
      const currentRow = [
        index + serialStart, e.EmpName, e.IDNo, e.Designation, e.Dept, e.Section, e.Joining, e.PresentSalary, e.BasicAmount
      ];

      for (let i = 2; i < length; i++) this.lastRow[i] += Number.parseInt(currentRow[i]);
      return currentRow.map((e: string, index: number) => this.createStyle(e, false));
    });

    if(enterRow) {
      this.lastRow[1] = 'Total';
      this.lastRow[0] = this.lastRow[2] = this.lastRow[3] = this.lastRow[4] = this.lastRow[5] = this.lastRow[6] = '';
      tableData.push(this.lastRow.map((e: string, index: number) => this.createStyle(e, false)));
      this.lastRow = new Array(length).fill(0);
    }    
    
    const tableObject: any = {table: {headerRows: 1, body: tableHead.concat(tableData)}}
    if(!enterRow) tableObject.pageBreak = 'after';
    content.push(tableObject);

    return content;
  }

  pageChange() {
    this.checks.fill(false);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.statements = this.allStatements.slice(start, start + this.itemsPerPage);
  }

  
}
