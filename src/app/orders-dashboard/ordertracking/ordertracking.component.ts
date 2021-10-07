import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ordertracking',
  templateUrl: './ordertracking.component.html',
  styleUrls: ['./ordertracking.component.css']
})
export class OrdertrackingComponent implements OnInit {
  companies: any;
  categories: any;
  history: any;
  company: any;
  category: any;
  workorderno: any;
  brands: any;
  salesperson: any;
  sales: any;
  brand: any;
  orderno: any;
  confirmOrder: any;

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
    this.confirmOrder = {};

  }

  ngOnInit() {
    this.getCompanies();
    this.getCategory();
    // this.getBrands();
  }

  getCategory() {
    this.api.getdata('WorkOrderDetails/CategoryListForProduction').subscribe((res: any[]) => {
      this.categories = res;
    });
  }

  getCompanies() {
    this.api.getdata('comp').subscribe((res: any[]) => {
      this.companies = res;
    });
  }

  // getBrands() {
  //   this.api.getdata('WorkOrderDetails/buyerListforOrderTracking').subscribe((res: any[]) => {
  //     this.brands = res;
  //   });
  // }

  getSalesPerson() {
    this.api.getdata('WorkOrderDetails/SalesPersonCompanyWise?company=' + this.company).subscribe((res: any[]) => {
      this.salesperson = res;
      console.log(this.salesperson);
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

    if (!this.workorderno) this.workorderno = '';
    if (!this.sales) this.sales = 0;
    const link = 'WorkOrderDetails/companywiseloadallWorkorder?company=' + this.company + '&category=' + this.category + '&WONo=' + this.workorderno + '&salesperson=' + this.sales;
    this.api.getdata(link).subscribe((res: any[]) => {
      this.history = res;
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
    this.brand = null;
    this.sales = null;
    this.orderno = null;
    this.history = null;
  }

  patch() {
    if(!this.tableCheckBox.includes(true)) {
      this.api.showWarningToast("Please check at least one of workorder");
      return;
    }
    this.history.forEach((element: any, index: number) => {
      if (this.tableCheckBox[index] == true) {
        const sendData = {
          "WorkOrderID": element.WorkOrderID,
          "ClientID": element.ClientID,
          "BrandID": element.BrandID,
          "SampleID": element.SampleID,
          "ProductCategoryID": element.ProductCategoryID,
          "OrderQTY": element.Qty,
          "OrderReceiveDate": element.OrderReceiveDate,
          "ConfirmDate": Date.now() + 3600 * 6 * 1000,
          "StatusID": 0,
          "ConfrimBy": sessionStorage.getItem('empid'),
          "Remarks": element.Remarks,
          "URNNO": element.URNNo
        }
        this.api.patchdata('OrderTrackings', sendData).subscribe((res: any) => {
          this.api.patchdata('WorkOrderDetails/deliveryDateUpdate/', { workorderid: element.WorkOrderID }).subscribe(res => {
            this.api.showSuccessToast('Confirmed the workorder');
          });
        });
      }
      this.history = [];
      this.reset();
    });
  }

}
