import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-workorderconfirmation',
  templateUrl: './workorderconfirmation.component.html',
  styleUrls: ['./workorderconfirmation.component.css']
})
export class WorkorderconfirmationComponent implements OnInit {
  companies: any;
  categories: any;
  history: any;
  company: any;
  category: any;
  workorderno: any;
  workOrderId: any;

  tableCheckBox: boolean[];
  masterCheck: boolean;
  anyCheck: boolean;
  constructor(private _location: Location, public api: ApiService) {
    this.masterCheck = false;
    this.anyCheck = false;
    this.tableCheckBox = []
    for (let i = 0; i < this.history; i++) {
      this.tableCheckBox.push(true);
    }
  }

  ngOnInit() {
    this.getCompanies();
    this.getCategory();
  }

  getCategory() {
    this.api.getdata('WorkOrderDetails/CategoryListForSectionConfirm').subscribe((res: any[]) => {
      this.categories = res;
    });
  }

  getCompanies() {
    this.api.getdata('comp').subscribe((res: any[]) => {
      this.companies = res;
    });
  }

  getWOData() {
    if (!this.company) {
      this.api.showWarningToast("Please select company");
      return;
    }
    if (!this.category) {
      this.api.showWarningToast("Please select category");
      return;
    }
    let link = 'WorkOrderDetails/WorkOrderListByCompanyCategory?company=' + this.company + '&category=' + this.category;
    if (this.workorderno) link += '&WONo=' + this.workorderno
    this.api.getdata(link).subscribe((res: any[]) => {
      this.history = res;
      //this.history.workOrderId = res[0].WorkOrderID;
      //console.log(this.workOrderId);
      this.tableCheckBox.length = res.length;
    });
  }

  backClicked() {
    this._location.back();
  }

  allCheck() {
    const length = this.tableCheckBox.length;
    for (let i = 0; i < length; i++) {
      this.tableCheckBox[i] = !this.masterCheck;
    }
    this.anySelected();
  }

  anySelected() {
    this.anyCheck = false;
    const length = this.tableCheckBox.length;
    for (let i = 0; i < length; i++) {
      if (this.tableCheckBox[i]) this.anyCheck = true;
    }
  }

  reset() {
    this.company = null;
    this.category = null;
    this.workorderno = null;
    this.history = null;
  }
  // "confirmationdate": Date.now() + 3600 * 6 * 1000;
  // "confirmby": localStorage.getItem('userid'),

  patch(form: NgForm) {
    this.history.forEach((element: any, index: number) => {
      if (!this.tableCheckBox[index]) {
        this.api.showWarningToast("Please check at least one of workorder");
        }
      if (this.tableCheckBox[index] == true) {
        const sendData = {
          "confirmationdate": Date.now() + 3600 * 6 * 1000,
          "confirmby": sessionStorage.getItem('empid')
        }
        this.api.patchdata('WorkOrderMasters/' + element.WorkOrderID, sendData).subscribe((res: any) => {
          this.api.showSuccessToast('Confirmed the workorder') + element.WorkOrderNo;
        });
      }
      this.history = [];
      this.reset();
    });

  }


}
