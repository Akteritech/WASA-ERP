import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../../../api.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
   editId: any;
   currentRoute: string;
   accountlist: any;

  constructor(public api: ApiService, private route: ActivatedRoute , private router: Router,) {

    this.route.params.subscribe( params => {
      if (params.id) {
        this.editId = params.id;
      }
    });
    // this.emp = new EmployeeProfile();
    this.router.events.subscribe(
        (event: any) => {
          if (event instanceof NavigationEnd) {
            this.currentRoute = this.router.url;
          }
        }
    );
  }
  pdf() {
      const element = document.getElementById('accountlist');
      let margin = 15;
      let format = 'a4';
      let orientation = 'landscape';
      const opt = {
          margin: margin,
          filename: this.toExportFileName('Accountlist', 'pdf'),
          image: { type: 'jpeg', quality: 0.95 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'mm', format: format, orientation: orientation }
      };
      html2pdf().from(element).set(opt).save();
  }
    toExportFileName(fileName: string, type: string): string {
        return `${fileName}_` + new Date().toLocaleDateString() + `.${type}`;
    }

  ngOnInit() {
this.getAccountList(this.editId);
  }
  getAccountList = async id => {
    await  this.api.getdata('employee-profiles/getAccountList?unitid='+ encodeURIComponent(id)).subscribe((res: any) => {
      this.accountlist = res;
    }, error2 => {console.log(error2);});
  }

    excel() {
        // this.api.getdata('employee-profiles/genderList').subscribe((res: any) => {
        //     this.genderlist = res;
        // }, error2 => {console.log(error2);});
        setTimeout(()=> {
            const data = this.accountlist.map((element: any) => {
                return {
                    'Unit': element['Unit'], 'Department': element['Dept'], 'Employee Type': element['EmpType'],
                    'IDNo': element['IDNo'],
                    'Employee Name': element['EmpName'], 'Designation': element['Designation'],
                    'Present Salary': element['PresentSalary'],
                    'Rocket Account': element['RocketAC'],'Bank Account': element['BankAccount']

                };
            });
            const lengths = [22, 10, 30, 30, 11, 15, 25, 20, 20, 8, 13, 10, 10, 10, 18];
            this.api.exportExcel(data, [[' Accountlist'], []], ' Accountlist',  lengths);
        }, 1000);
    }
}
