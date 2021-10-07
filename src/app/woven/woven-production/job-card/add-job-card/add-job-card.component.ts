import {Component, EventEmitter, Output, OnInit, Input} from '@angular/core';
import {ApiService} from '../../../../api.service';
import {JobCard, JobCardMaster} from '../../../models/jobcard';
import {Sample} from '../../../models/sample';
import {Location} from '@angular/common';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { JobCardDetail } from 'src/app/HeatTransfer/models/offsetJobcard';
import {WorkOrderDetail} from '../../../models/work-order';
import {NgForm} from '@angular/forms';
import {ShowDetail} from '../../../../templates/show-detail/show-detail.component';
import {SuiModalService} from 'ng2-semantic-ui';
@Component({
    selector: 'app-add-job-card',
    templateUrl: './add-job-card.component.html',
    styleUrls: ['./add-job-card.component.css']
})
export class AddJobCardComponent implements OnInit {
    jobcard: any;
    jobcardmaster: any;
    companyid: any;
    companies: any;
    productCategories: any;
    productSubCategories: any;
    samples: any;
    @Input() id: number;
    // @Input() maxLength: number;
    // id: any;
    selectedSample: any;
    sampleColors: any;
    machines: any;
    sampleid: any;
    selectAllWO: any;
    samplecolorid: any;
    workorderno: any;
    orders: any;
    workOrders: any;
    jobsToPlan = [];
    orderid: any;
    response: any;
    remarks: any;
    machineId: any;
    jobcardid: any;
    today: any;
    workorder: any;
    jobcarddetail: any;
    currentRoute: any;
    partsNo: any;
    partsNoValue: any;
    PARTSID: any;
    detail: any;
    peices: any;
    @Output() added = new EventEmitter<boolean>();
     orderTypes: any;
    ordercolor: any;
     lotno: any;
     workorderdetailsid: any;
     hour: any;
     jobqty = [];
    public hours: any;
     gridData: any;
     qty: any[];
     orderBySample: any;
    addJobCard: boolean;
     planqty =0;
     jobCardData: any;
    constructor(public api: ApiService, private _location: Location, public modalService: SuiModalService, public router: Router , private route: ActivatedRoute) {
        this.jobcard = new JobCard();
        this.jobcardmaster = new JobCardMaster();
        this.jobcarddetail = new JobCardDetail();
        this.selectedSample = new Sample();
        this.detail = new WorkOrderDetail();
        this.jobcard.productcategoryid = 1;
        this.today = new Date();
        this.router.events.subscribe(
          (event: any) => {
            if (event instanceof NavigationEnd) {
              this.currentRoute = this.router.url;
            }}); }
    ngOnInit() {
        this.addJobCard = this.api.checkPermission('Job Card', 'addList')
        this.getproductCategories();
        this.getCompanies();
        this.optionsLookupSample('a');
    }
    getCompanies() {
        this.api.getdata('comp').subscribe((res: any) => {this.companies = res;
            console.log(res); }, error2 => {console.log(error2); });
    }
    getproductCategories() {
        this.api.getdata('productcategories').subscribe((res: any) => {this.productCategories = res;
            console.log(res); }, error2 => { console.log(error2); });
    }
    getWorkOrderBySample() {
        this.api.getdata('WorkOrderMasters?filter[where][sampleid]=' + this.selectedSample.sampleid).subscribe( (res: any) => {this.orderBySample = res;
            console.log(res); }, error1 => {console.log('error1 ', error1); });
    }
  reset() {
    this.selectedSample.samplename = ''; this.jobcard.workorderno = ''; this.jobcard.companyid = '';
  }
  getMachines() {
        this.api.getdata('MachineMasters?&filter[where][productioncategoryid]=' + this.jobcard.productcategoryid).subscribe((res: any) => { this.machines = res; console.log(res);
        }, error2 => {console.log(error2); });
    }
    optionsLookupSample(query) {
        const filter: any = {};
        filter['where'] = {};
        filter['order'] = 'sampleid DESC';
        filter['where']['productcategoryid'] = 1;
        filter['limit'] = 10;
        filter['where']['samplename'] = {};
        filter['where']['samplename']['like'] = '%25' + query + '%25';
        this.api.getdata('SampleGeneralSpecs?filter=' + JSON.stringify(filter)).subscribe( (res: any) => {
            this.samples = res;
            console.log(this.samples);
        }, error1 => {
            console.log('error1 ', error1);
        });
    }

    getColorByWorkOrder() {
        this.api.getdata('WorkOrderDetails?filter[where][workorderid]=' + this.jobcard.workorderno.workorderid).subscribe((resp: any) => {
            this.ordercolor = resp[0].samplecolorid;
            this.workorderdetailsid = resp[0].wodetailid;
            console.log(resp);
        });
    }
    getOrderDetailsByCategoryAndSampleName() {
        if (!this.jobcard.companyid) {this.api.showWarningToast('Company Name must be selected', ''); return;
          } else if (!this.jobcard.productcategoryid) { this.api.showWarningToast('Product  Category must be selected', ''); return;
          } else if (!this.selectedSample) { this.api.showWarningToast('Sample Name  must be selected', ''); return;
          } else if (!this.jobcard.workorderno) { this.api.showWarningToast('Work Order No  must be selected', ''); return;
          } else if (!this.jobcard.ordertype) { this.api.showWarningToast('Work Order No  must be selected', ''); return;
          }
        const link = 'JobCardMasters/GetOrderDetailsByCategoryCompanyWorkOrderSampleOrdertypeForWoven?productcategoryid='
         + this.jobcard.productcategoryid + '&sampleid=' + this.selectedSample.sampleid + '&samplecolorid=' + this.ordercolor +
            '&workorderno=' + this.jobcard.workorderno.workorderno + '&companyid=' + this.jobcard.companyid + '&ordertype=' + this.jobcard.ordertype;
        this.api.getdata(link).subscribe((res: any) => {this.workOrders = res; console.log(res);
        }, error2 => { console.log(error2); });
    }

    selectAll() {
        if (this.selectAllWO) {
            this.workOrders.forEach(item => {item.selected = true; console.log(this.workOrders); });
        } else {this.workOrders.forEach(item => {item.selected = false; }); }
    }
    planJobs() {
        this.jobsToPlan = [];
        this.workOrders.forEach(item => {
            if (item.selected) {item.plandate = new Date();
            // this.planqty = ;
            //     this.planqty = (item.OrderQty - item.PQty);
            //     item.PQty = null;
                this.jobsToPlan.push(item); console.log(this.jobsToPlan); }});
        this.getMachines();
    }
    getJobQtyByDefault() {
        this.jobsToPlan.forEach(elements => {
            this.api.getdata('JobCardMasters/getJobQtyForWoven?machineid=' +
                this.machineId + '&empid=' + sessionStorage.getItem('empid') + '&planqty=' + elements.PQty +
                '&quality=' + this.jobcardmaster.sonic + '&istaffeta=' + this.jobcardmaster.istaffata + '&isneedle=' +
                this.jobcardmaster.isneedle + '&sampleid=' + this.selectedSample.sampleid).subscribe((res: any[]) => {
                if (res.length > 0) {this.qty = res; elements.jobqty = res[0].JobQty;
                } else {this.jobcardmaster.hour = null; } }); });
    }
    planJobByProcedure() {
        this.jobsToPlan.forEach(item => {
            const link = 'JobCardMasters/getBreakdowndetailsInGridForWoven?productcategoryid=' + 1 +
                '&workorderid=' + item.WorkOrderID + '&orderbreakdownid=' + item.OrderBreakDownID + '&partsid=' + item.PartsID;
            this.api.getdata(link).subscribe((res: {}) => {this.gridData = res; console.log(res);
            });
        });
    }
    getHour() {
        this.api.getdata('JobCardMasters/getHourByMachineid?machineid=' + this.machineId).subscribe((res: any[]) => {
            if (res.length > 0) {this.hour = res; console.log(res);
                this.jobcardmaster.hour = res[0].hrRequiredForJOb;
                this.hours = this.jobcardmaster.hour;
            } else {this.jobcardmaster.hour = null; }
            this.api.getdata('JobCardMasters/getJobQtyForWoven?machineid=' +
                this.machineId + '&empid=' + sessionStorage.getItem('empid') + '&planqty=' + this.workOrders[0].OrderQty +
                '&quality=' + this.jobcardmaster.sonic + '&istaffeta=' + this.jobcardmaster.istaffata + '&isneedle=' +
                this.jobcardmaster.isneedle + '&sampleid=' + this.selectedSample.sampleid).subscribe((res: any[]) => {
                if (res.length > 0) {this.hour = res; this.jobqty = res[0].JobQty; console.log(this.jobqty);
                } else {this.jobcardmaster.hour = null; }}); });
    }
    limitValue(event: KeyboardEvent, i) {
            console.log(this.jobsToPlan[i].PQty);
            if (this.jobsToPlan[i].PQty > this.jobsToPlan[i].OrderQty) {
                event.preventDefault();
            }
    }
    getJobQty(i) {
        if (this.jobcardmaster.istaffata === true) {this.jobcardmaster.istaffata = 1;
        } else {this.jobcardmaster.istaffata = 0; }
        if (this.jobcardmaster.isneedle === true) {this.jobcardmaster.isneedle = 1;
        } else {this.jobcardmaster.isneedle = 0; }
        this.api.getdata('JobCardMasters/getJobQtyForWoven?machineid=' +
            this.machineId + '&empid=' + sessionStorage.getItem('empid') + '&planqty=' + this.jobsToPlan[i].PQty +
            '&quality=' + this.jobcardmaster.sonic + '&istaffeta=' + this.jobcardmaster.istaffata + '&isneedle=' +
            this.jobcardmaster.isneedle + '&sampleid=' + this.selectedSample.sampleid).subscribe((res: any[]) => {
            if (res.length > 0) {this.qty = res; this.jobsToPlan[i].jobqty = res[0].JobQty;
            } else {this.jobcardmaster.hour = null; }});
    }
    viewDetail(id) {
        this.modalService.open(new ShowDetail('Job Card Details', 'showjobcard', id))
            .onApprove(() => { })
            .onDeny(() => {console.log(); });
    }
    getJobCard() {
        const filter: any = {};
        filter['where'] = {};
        filter['order'] = 'jobcardid DESC';
        filter['where']['productcategoryid'] = 1;
        filter['limit'] = 1;
        this.api.getdata('JobCardMasters?filter=' + JSON.stringify(filter)).subscribe( (res: any) => {
            this.jobCardData = res[0];
            console.log(this.jobCardData);
        }, error1 => {
            console.log('error1 ', error1);
        });
    }
    create(form: NgForm) {
        if (!this.machineId) {this.api.showWarningToast('Machine is required', 'select machine first '); return; }
        if (this.jobcardmaster.istaffata === true) {this.jobcardmaster.istaffata = 1;
        } else {this.jobcardmaster.istaffata = 0; }
        if (this.jobcardmaster.isneedle === true) {this.jobcardmaster.isneedle = 1;
        } else {this.jobcardmaster.isneedle = 0; }
        this.api.getdata('JobCardMasters?filter={"order":"jobcardid DESC","limit":1}').subscribe((resp: any) => {
            this.lotno = resp[0].jobcardid + 1; console.log(this.lotno);
        });
        if (this.jobsToPlan.length <= 0) {this.api.showWarningToast('Select WorkOrder For job creation');
        } else {
            if (!this.machineId) {this.machineId = 0;
                this.jobcardmaster.machineId = this.machineId; } else {this.jobcardmaster.machineId = this.machineId; }
            setTimeout(() => {
                const data = {
                    'data': {'jobsToPlan': this.jobsToPlan, 'jobcardmaster': this.jobcardmaster, 'lotno': this.lotno, 'workorderdetailsid' : this.workorderdetailsid,
                        'jobcard': this.jobcard, 'jobqty': this.jobqty}};
                console.log(data); this.jobcard.lotno = this.lotno;
                this.api.postdata('jobcardmasters/createJobForWoven1', data).subscribe((res: any) => { console.log(res);
                    this.api.showSuccessToast(' Job Cards Created', '');
                    this.added.emit(true);
                    form.resetForm(); this.jobsToPlan = []; this.workOrders = [];
                    this.getJobCard();
                    setTimeout(() => {
                        this.viewDetail(this.jobCardData.jobcardid);
                    }, 500);
                }, err => {
                    this.api.showFailureToast('Error', err.message);
                    console.log(err);
                });
            }, 1000);
        }
    }
}
