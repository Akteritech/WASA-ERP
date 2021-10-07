import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { SuiModalService } from 'ng2-semantic-ui';
import { EditDetail } from 'src/app/templates/edit-detail/edit-detail.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {
  collapse = false;
  collectionSize: number;
  goToPage: number;
  selected: boolean[];

  selectedLoan: any;

  meta: {
    totalItemCount: number, totalPageCount: number, itemsPerPage: number, currentPage: number,
  };
  fromPage: number;
  toPage: number;
  sectionData: any[];
  allsectionData: any[];
  section: any;
  editId: boolean;

  @Input() id: any;
  departments: any;
  companyname: any;

  @Output() added = new EventEmitter<boolean>();
  companies: any;
  response: any;


  constructor(public api: ApiService, public modalService: SuiModalService,) {
    this.goToPage = 1;
    this.collectionSize = 0;
    this.meta = {
      totalItemCount: 0,
      totalPageCount: 0,
      itemsPerPage: 25,
      currentPage: 1,
    };
    this.section = {};

  }

  get() {
    this.meta.currentPage = 1
    let link = `icg-sections`;
    this.api.getdata(link).subscribe((res: any[]) => {
      this.sectionData = res.slice(0, 25);
      this.allsectionData = res;
      this.meta.totalItemCount = res.length;

    }, err => {
      console.log(err);
    });
  }

  pageChange() {
    const start = (this.meta.currentPage - 1) * this.meta.itemsPerPage;
    const end = start + this.meta.itemsPerPage
    this.sectionData = this.allsectionData.slice(start, end);
  }

  searchTable() {
    this.meta.currentPage = 1;
    this.get();
  }

  reset() {
    this.meta.currentPage = 1;
    this.get();
  }

  onSaved(event: any) {
    this.get();
  }

  ngOnInit() {
    this.get();
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


  getSectionEditData(id) {
    this.api.getdata('icg-sections/' + encodeURIComponent(id)).subscribe((res: any) => {
      this.section = res;
        console.log(this.section);
      // if (res.length > 0) {
      //   this.section = res;
      //   console.log(this.section);
      // } else {
      //   this.api.showInfoToast('No data on List');
      // }
    });
    this.editId = true;
  }

  edit() {
    this.api.patchdata('icg-sections/' + encodeURIComponent(this.section.SECTION_ID),  this.section).subscribe((res: any) => {
      this.response = res;
      this.get();
      this.api.showSuccessToast('Success', this.response.message);
    });
  }

}
