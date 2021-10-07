import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../../../api.service';
import {ActivatedRoute} from '@angular/router';
import * as html2pdf from 'html2pdf.js';
import {element} from 'protractor';
import {AddJobCardComponent} from '../add-job-card/add-job-card.component';
import {JobCard, JobCardMaster} from '../../../models/jobcard';

@Component({
    selector: 'app-show-job-card',
    templateUrl: './show-job-card.component.html',
    styleUrls: ['./show-job-card.component.css']
})
export class ShowJobCardComponent implements OnInit {

    jobCardReport: any;
    detail: any;
    Machine_details: any;
    createdby: any;
    sample: any;
    materialrequistion: any;
    workorder: any;
    plan: any;
    // machines: any;
    @Input() id: number;
     showpagedata: any;
     details: any;
     showpagedatamaterial: any;
     hour: any;
    hours: any;
     speedofHour: any;
     totalproductionqty: any;
     orderTotal = 0;
     planTotal = 0;
     productionTotal = 0;
     jobCardSize: any;
     showpagedatafortable: any;
     rpt: number;

    constructor(public api: ApiService, private route: ActivatedRoute) {
    }
    ngOnInit() {
        this.get(this.id);
        this.getForShowPage(this.id);
        this.getForShowPageMaterial(this.id);
    }
    getForShowPage(id) {
this.api.getdata('JobCardMasters/getShowPageData?jobcardid=' + id).subscribe((res: any) => {
   this.showpagedata = res[0];
   this.showpagedatafortable = res;
   console.log(res);
    this.showpagedatafortable.forEach((elements: any) => {
        this.orderTotal += elements.OrderQty;
        this.planTotal += elements.PlanQTY;
        this.productionTotal += elements.ProductionQty;
        });
    this.speedofHour =  this.showpagedata.Speed / this.showpagedata.Pick * 50 * this.showpagedata.Cutter;
    this.hour = (this.productionTotal / this.speedofHour);
    this.rpt = this.productionTotal / this.showpagedata.Cutter;
    this.rpt = Math.round(this.rpt);
    this.api.getdata('JobCardMasters/getjobcardSize?WONO=' + this.workorder.workorderid).subscribe((res: any) => {
        this.jobCardSize = res[0].number;
        // console.log(this.jobCardSize);
    });
});
    }
    getForShowPageMaterial(id) {
        this.api.getdata('JobCardMasters/getShowPageDataForMaterialRequisition?jobcardid=' + id).subscribe((res: any) => {
            this.showpagedatamaterial = res;
            console.log(res);
        });
    }
    get(id) {
        let filter: any = {};
        filter['where'] = {};
        filter['include'] = ['createdby', 'materialrequistion', {'sample': ['NPDExecutive', 'wovenCommonDetails', 'sampleColors', 'wovenYarnDetails', 'sampleWiseKeyEntryFields'] }, {'details': [ 'machine',  'workorderbreakdown']}, {'Machine_details': [ {'machine': ['machinetype']}, 'plan', 'workorderbreakdown']} , {'workorder': ['brand', 'customer', 'company', 'details', 'salesExecutive']}];
        filter = JSON.stringify(filter);
        this.api.getdata('JobCardMasters/' + id +
            '?filter=' + filter ).subscribe((res: any) => {
            this.jobCardReport = res;
            this.detail =  this.jobCardReport.details[0];
            this.Machine_details =  this.jobCardReport.Machine_details;
            this.sample =  this.jobCardReport.sample;
            this.materialrequistion =  this.jobCardReport.materialrequistion;
            this.workorder =  this.jobCardReport.workorder;
            this.createdby =  this.jobCardReport.createdby;
            this.plan =  this.jobCardReport.plan;
            console.log(res);
        }, error => {
            console.log(error);
        });
    }
    getJobCardReport(jcid) {
        this.api.getdata('JobCardMasters/jobCardWovenReport?jobcardid=' + jcid + '&empid=101'
        ).subscribe((res: any) => {
            this.jobCardReport = res;
            console.log(res);
        }, error2 => {
            console.log(error2);
        });
    }

    print() {
        const element = document.getElementById('printContent');
        const opt = {
            margin:       10,
            filename:     this.api.toExportFileName('jobcard_' + this.jobCardReport[0].JobCardNo, 'pdf'),
            image:        { type: 'jpeg', quality: 1 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'mm', format: 'a3', orientation: 'landscape' }
        };
        html2pdf().from(element).set(opt).print();
    }

}
