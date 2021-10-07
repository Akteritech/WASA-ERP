import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {ApiService} from "../../../../../api.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import * as html2pdf from 'html2pdf.js';
import {EmployeeProfile} from "../add-employee-profile/add-employee-profile.component";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-employee-history',
  templateUrl: './employee-history.component.html',
  styleUrls: ['./employee-history.component.css']
})
export class EmployeeHistoryComponent implements OnInit {
   employeehistory: any;
   collapse: boolean;
   currentRoute: string;
   editId: any;
   imageurl: any;
   employeeincrement: any;
     photo: any;

  constructor(private _location: Location , public api: ApiService,
              private route: ActivatedRoute , private router: Router, public sanitizer: DomSanitizer) {
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

  ngOnInit() {
    this.printEmployeeHistory(this.editId);
  }
   public printEmployeeHistory = async id => {
   await this.api.getdata('employee-profiles/EmployeeHistoryReport?cardno=' + id).subscribe((res: any) => {

       this.api.getBlobThumbnail(`FileUploads/employees/download/${id.replace(/000+/, '')}.jpg`).subscribe((Response: any) => {
           console.log(Response);
           this.api.createImageFromBlob(Response);
           this.api.getBlobThumbnail(`FileUploads/employees/download/${res[0].EnglishCompany.replace(/\s/g, '')}.jpg`).subscribe((resp: any) => {
               this.api.createImageFromBlob1(resp);
               // console.log(this.photo);
           })
       }, error => {
           this.api.showWarningToast('Remove Starting Zeros')
           console.log(error);
       });
        if (res.length >0 ) {
        } else {this.api.showWarningToast('No Data Found');}
      this.employeehistory = res[0];
      console.log(this.employeehistory);
      this.api.getdata('employee-profiles/EmployeeHistoryIncrementReport?cardno=' + id).subscribe((resp: any)=>{
        this.employeeincrement = resp;
        console.log(this.employeeincrement);
      });
      this.pdf();
    }, error2 => {console.log(error2);});
}
  pdf() {
    setTimeout(() => {
      const element = document.getElementById('printSection');
      let margin = 15;
      let format = 'a4';
      let orientation = 'portrait';
      const opt = {
        margin: margin,
        filename: this.toExportFileName('Employee Details', 'pdf'),
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: format, orientation: orientation }
      };
      html2pdf().from(element).set(opt).save();
    }, 2000)

  }
  toExportFileName(fileName: string, type: string): string {
    return `${fileName}_${new Date().toLocaleDateString()}.${type}`;
  }
}
