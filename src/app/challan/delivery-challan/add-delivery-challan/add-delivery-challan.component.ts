import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Location} from '@angular/common';
import {NgForm} from '@angular/forms';
import {SuiModalService} from 'ng2-semantic-ui';
import {DeliveryChallanBreakdown, DeliveryChallanDetail, DeliveryChallanMaster} from '../../models/delivery-challan';
import {ApiService} from '../../../api.service';
import {ShowDetail} from '../../../templates/show-detail/show-detail.component';


@Component({
  selector: 'app-add-delivery-challan',
  templateUrl: './add-delivery-challan.component.html',
  styleUrls: ['./add-delivery-challan.component.css']
})
export class AddDeliveryChallanComponent implements OnInit {
  @Output() added = new EventEmitter<boolean>();
  @Input() id: number;
  master: any;
  detail: any;
  details: any;
  breakdownDetails: any;
  customers: any;
  companies: any;
  workOrders: any;
  response: any;
  currentRoute: any;
   items: any;
  selectSample: any;
   breakdownData: any;
   partsId: any;
   urnno: string;
   urndata: any;
  detailsArray = [];
   breakdownDetail: DeliveryChallanBreakdown;
   editId: any;
  challanNo: any;
  constructor(public api: ApiService, public router: Router ,  public modalService: SuiModalService , private route: ActivatedRoute, private _location: Location) {
    this.master = new DeliveryChallanMaster();
    this.detail = new DeliveryChallanDetail();
    this.breakdownDetail = new DeliveryChallanBreakdown();
    this.master.challandate = new Date();
    this.route.params.subscribe(param => {
      if (param.id) {
        this.editId = param.id;
        this.getChallan(param.id);
      }
    });
    this.router.events.subscribe(
        (event: any) => {
          if (event instanceof NavigationEnd) {
            this.currentRoute = this.router.url;
          }
        }
    );
  }
  // optionsLookupSampleItems(query) {
  //   const filter: any = {};
  //   filter['where'] = {};
  //   filter['order'] = 'sampleid DESC';
  //   filter['limit'] = 20;
  //   filter['where']['samplename'] = {};
  //   filter['where']['samplename']['like'] = '%25' + query + '%25';
  //   this.api.getdata('SampleGeneralSpecs?filter=' + JSON.stringify(filter)).subscribe( (res: any) => {
  //     this.items = res;
  //     console.log(res);
  //   }, error1 => {
  //     // console.log('error1 ', error1);
  //   });
  // }
  getChallan(id) {
    this.api.getdata('ChallanMasters/' + id).subscribe((res: any) => {
      this.master = res;
      this.challanNo = res.challanno;
this.api.getdata('ChallanDetails/getBreakDownDetailsByChallanNo?challanno='+ this.challanNo).subscribe((resp: any) => {
  this.detailsArray = resp;
  console.log(resp);
});
      // this.detailsArray = res.breakdownDetails;
      // this.master.workorderid = this.master.workorder.workorderid;
      // this.detailsArray.forEach(item => {
      //   item.SampleName = this.master.workorder.sample.samplename;
      //   item.OrderQty = this.master.details[0].challanqty;
      //   item.Unit = this.master.details[0].unitid;
      // });
      // this.master.orderreceivedate = new Date();
      // console.log(res);
      // console.log(this.detailsArray);
    }, error => {
      console.log(error);
    });
  }
  back() {
    this._location.back();
  }
  ngOnInit() {
    this.getCompanies();
    this.optionsLookupCustomer('a');
  }
  getPartIdForBreakdown() {
    this.api.getdata('WorkOrderDetails?filter[where][workorderid]=' + this.master.workorderid).subscribe((res: any) => {
      this.partsId = res[0].partsid;
      console.table(this.partsId);
    });
    setTimeout(() => {
      const link = 'ChallanDetails/DeliveryChallanDetailsItemWiseForGrid?workorderid=' + this.master.workorderid + '&partid=' + this.partsId;
      this.api.getdata(link).subscribe((resp: any) => {
        this.breakdownData = resp;
        console.table(this.breakdownData);
        }); }, 500);
  }
  getBreakDown() {
    this.detailsArray = [];
    setTimeout(() => {
      this.breakdownData.forEach(item => {
        this.detailsArray.push(item);
        console.log(this.detailsArray);
        // this.breakdownDetail.push(newBreakDown);
      });
      console.log(this.breakdownDetail);
    }, 1000);
  }
  // planJobs() {
  //   this.jobsToPlan = [];
  //   this.workOrders.forEach(item => {
  //     if (item.selected) {item.plandate = new Date(); item.PQty = item.OrderQty;
  //       this.jobsToPlan.push(item); console.log(this.jobsToPlan); }});
  //   this.getMachines();
  // }
  searchByUrn() {
    const link = 'ChallanDetails/searchWorkOrderByUrn?urn=' + this.urnno;
    this.api.getdata(link).subscribe((resp: any) => {
      this.urndata = resp;
      console.log(this.urndata);
    });
  }
  add(form: NgForm) {
    // if (!form.valid) {
    //   this.api.showWarningToast('Please fill required fields first.', '');
    //   return;
    // }
    // if (this.details.length < 1) {
    //   this.api.showWarningToast('Please fill atleast one challan detail.', '');
    //   return;
    // }
    // if (this.breakdownDetails.length < 1) {
    //   this.api.showWarningToast('Please fill atleast one challan breakdown details.', '');
    //   return;
    // }

    const data = {
      master: this.master,
      breakdown: this.breakdownData,
    };
    console.log(data);
    this.master.isdelivered = true;
    this.api.patchdata('ChallanMasters/addChallan', {data: data}).subscribe(res => {
      this.response = res;
      this.details = [];
      this.breakdownDetails = [];
      this.detailsArray = [];
      console.log(this.response);
      this.api.getdata('ChallanMasters/' + this.response.challanAdded.deliverychallanid).subscribe((resp: any) =>{
        this.api.showSuccessToast( resp.challanno + ' added successfully');
      });
      setTimeout(() => {
        this.viewDetail(this.response.challanAdded.deliverychallanid);
      }, 500);
    }, err => {
      this.api.showFailureToast('Error', err.message);
      console.log(err);
    });
  }
  viewDetail(id) {
    console.log(id);
    this.modalService
        .open(new ShowDetail('Delivery Challan Details', 'challan', id))
        .onApprove(() => {

        })
        .onDeny(() => {
          console.log();
        });
  }
  update(form: NgForm) {
    // if (!form.valid) {
    //   this.api.showWarningToast('Please fill required fields first.', '');
    //   return;
    // }
    // if (this.details.length < 1) {
    //   this.api.showWarningToast('Please fill atleast one challan detail.', '');
    //   return;
    // }
    // if (this.breakdownDetails.length < 1) {
    //   this.api.showWarningToast('Please fill atleast one challan breakdown details.', '');
    //   return;
    // }

    const data = {
      master: this.master,
      breakdown: this.breakdownData,
      challanQtyDetails: this.detailsArray
    };
    console.log(data);
    this.master.isdelivered = true;
    const  date = new Date();
    this.master.challandate = JSON.stringify(date);
    this.api.patchdata('ChallanMasters/updateChallan', {data: data}).subscribe(res => {
      this.response = res;
      this.details = [];
      this.breakdownDetails = [];
      this.detailsArray = [];
      console.log(this.response);
      form.resetForm();
    }, err => {
      this.api.showFailureToast('Error', err.message);
      console.log(err);
    });
  }
  optionsLookupCustomer(query) {
    this.api.getdata('customers?filter={"limit":100,"where":{"clientname":{"like":"%25' + query + '%25"}}}').subscribe( res => {
      this.customers = res;
    }, error1 => {
      console.log('error1 ', error1);
    });
  }
  getCompanies() {
    this.api.fetchData('comp').subscribe( res => {
      this.companies = res;
      console.log(this.companies);
    }, error1 => {
      console.log('error1 ', error1);
    });
  }
  getWorkOrderByCompanyAndCustomer() {
    const link = 'ChallanDetails/getWorkOrderByCompanyAndClient?companyid='  + this.master.companyid + '&clientid=' + this.master.customerid;
    this.api.getdata(link).subscribe((resp: any) => {
      this.workOrders = resp;
    });
  }
  // optionsLookupWorkOrder(query) {
  //   this.api.getdata('WorkOrderMasters?filter={"limit":10,"where":{"workorderno":{"like":"%25' + query + '%25"}}}').subscribe( res => {
  //     this.workOrders = res;
  //     console.log(this.workOrders);
  //   }, error1 => {
  //     console.log('error1 ', error1);
  //   });
  // }
}
