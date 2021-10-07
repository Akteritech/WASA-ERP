import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SuiModalService } from 'ng2-semantic-ui';
import { ApiService } from 'src/app/api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-addsection',
  templateUrl: './addsection.component.html',
  styleUrls: ['./addsection.component.css']
})
export class AddsectionComponent implements OnInit {
  @Input() id: any;
  section: any;
  departments: any;
  companyname: any;

  @Output() added = new EventEmitter<boolean>();
  companies: any;
  response: any;
  editId: boolean;

  constructor(public api: ApiService, public modalService: SuiModalService) {
    this.section = {};

  }

  ngOnInit() {
    this.api.getdata('employee-attendences/departments')
      .subscribe((res: any[]) => {
        this.departments = res;
      });

    this.getcompanies();
    this.getLatestSection();
  }

  getcompanies() {
    this.api.getdata('employee-attendences/companies?id=' + true).subscribe((res: any) => {
      this.companies = res;
      console.log(this.companies);
    }, err => {
      console.log(err);
    });
  }

  getLatestSection(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.api.getdata('icg-sections?filter[limit]=1&filter[order]=SECTION_ID desc').subscribe((res: any) => {
        var convertNo = (Number.parseInt(res[0].SECTION_ID.substring(4)) + 1) + '';

        const lengt = 4 - convertNo.length;
        for (let i = 0; i < lengt; i++) {
          convertNo = '0' + convertNo;
        }
        
        resolve('SEC#' + convertNo);
      })
    })
  }

  patch(form: NgForm) {
    if (!form.valid) {
      this.api.showWarningToast('Warning', 'please fill required fields first.');
      return;
    }

    this.section.CreateDt = Date.now();
    this.getLatestSection().then((value: string) => {
      this.section.SECTION_ID = value;
      this.api.patchdata('icg-sections', this.section).subscribe(res1 => {
        this.response = res1;
        this.added.emit(true);

        this.api.showSuccessToast('Success', this.response.message);
        form.resetForm();
      }, err => {
        this.api.showFailureToast('Error', err.message);
        console.log(err);
      });
    });
  }

  

}
