import {Component,EventEmitter,Output,OnInit, Input} from '@angular/core';
import {ApiService} from '../../../../api.service';
import {Location} from '@angular/common';
import {JobCardMaster} from '../../../../woven/models/jobcard';

@Component({
    selector: 'app-add-pfl-job-card',
    templateUrl: './add-pfl-job-card.component.html',
    styleUrls: ['./add-pfl-job-card.component.css']
})
export class AddPflJobCardComponent implements OnInit {
  jobcardmaster: any;
  priority: number;
  company: number;
  @Input() productcategoryid: number
  companies: any[];
  // machines: any;
  masterSelect: boolean;
  selections: boolean[];
  workorderno: any;
  orders: any;
  jobsToPlan = [];
  // machineId: any;
  addList: string[];
  @Output() added = new EventEmitter<boolean>();

  constructor(public api: ApiService, private _location: Location) {
      this.jobcardmaster = new JobCardMaster();
      this.priority = 0;
      this.company = 0;
      this.masterSelect = true;
  }

  ngOnInit() {
    this.addList = JSON.parse(sessionStorage.getItem('addList'));
    this.optionsLookupWorkOrder();
    this.api.getdata('comp').subscribe((res: any) => this.companies = res);
}

  reset() {
    this.workorderno = null;
    this.company = 0;
  }

  optionsLookupWorkOrder(query: string = null) {
    let link = `WorkOrderDetails/searchConfirmedWorkOrder?company=` + this.company + `&category=` + this.productcategoryid;
    if(query) link += `&workorder=` + query;
    
    this.api.getdata(link).subscribe((res: any[]) => this.orders = res);
  }

  getOrderDetailsByCategoryAndSampleName() {
    const link = 'JobCardMasters/getOrderDetailsByCategoryAndSampleName?workorderno=' + this.workorderno
    this.api.getdata(link).subscribe((res: any[]) => {
      this.selections = new Array(res.length).fill(true);
      this.jobsToPlan = res.map((element: any) => {
        element.PQty = element.unplanned;
        element.plandate = new Date();
        return element;
      });
    });
  }

  selectAll() {
    this.selections.fill(this.masterSelect);
  }

  create() {    
    if (!this.selections.includes(true)) {
      this.api.showWarningToast('Select workOrder For job creation');
      return;
    }

    let valid = true;
    this.jobsToPlan.forEach((element: any, index: number) => {
      if(!this.selections[index]) return;

      if(!element.PQty) {
        this.api.showWarningToast('Enter Valid Quantity');
        valid = false;
      }

      if(element.PQty > element.unplanned) {
        this.api.showWarningToast('Production Quantity Cannot be More Than Unplanned Quantity');
        valid = false;
      }
    });
    if(!valid) return;

    const data =  {data: {
      'jobsToPlan': this.jobsToPlan.filter((element: any, index: number) => this.selections[index]), 
      'jobcardmaster': this.jobcardmaster, 'priority': this.priority, createdby: sessionStorage.getItem('empid')
    }};
    this.api.postdata('jobcardmasters/createJob', data).subscribe((res: any) => {
      if(res) {
        this.api.showSuccessToast('Jobcard Added')
        this.added.emit(true);
        this.jobsToPlan = [];
      }
    });
  }
}


  // getMachines() {
  //     this.api.getdata('MachineMasters?&filter[where][productioncategoryid]=' +
  //         this.productcategoryid +
  //         '&filter[where][companyid]=' + this.company).subscribe((res: any) => {
  //         this.machines = res;
  //         console.log(res);
  //     }, error2 => {
  //         console.log(error2);
  //     });
  // }