import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../api.service';
import {ActivatedRoute} from '@angular/router';
import * as html2pdf from 'html2pdf.js';


@Component({
  selector: 'app-show-create-wo',
  templateUrl: './show-create-wo.component.html',
  styleUrls: ['./show-create-wo.component.css']
})
export class ShowCreateWoComponent implements OnInit {
  CreateWorkData: any;
  detail: any;
  sampleName: string;
  totalPc: number;
  @Input() id: number;
  lastLine: string;
  createdBy: any;
  users: any;
  linkId: number;


  constructor(public api: ApiService, private route: ActivatedRoute) {
    this.totalPc = 0;
    this.route.params.subscribe((param: any) => {
      if(param.id) this.linkId = param.id;
    });
  }

  ngOnInit() {
    // this.get(this.id);
    if(this.id) this.get(this.id);
    if(this.linkId) this.get(this.linkId);

    this.lastLine = 'Printed By ' + sessionStorage.getItem('username') + ' On ' + new Date();
  }

  get(id) {
    let filter: any = {};
    filter['where'] = {};
    filter['include'] = ['brand', 'deliveryParty', 'customer', 'Fabric_Composition' , 'company',  'salesExecutive', 'customerService', [{'sample': ['productCategory', 'productSubCategory' , 'program']}], [{'details' : ['finish_type' , {'sampleColor' : 'sample'} , 'partNo']}], 'breakdownDetails'];
    filter = JSON.stringify(filter);
    this.api.getdata('WorkOrderMasters/' + id + '?filter=' + filter).subscribe((res: any) => {
      this.CreateWorkData = res;
      this.createdBy = res.details[0].createdby;
      this.api.getdata('WorkOrderMasters/tableData/?to=' + this.api.formatDate(new Date()) + '&page=0&pageSize=1&workorder=' + res.workorderno).subscribe((res: any) => this.sampleName = res.data[0].SampleName)
      this.api.getdata('UserInfos?filter[where][empId]=' + this.createdBy).subscribe(( user: any) => {
        this.users = user[0].username;
        }, error => {
          console.log(error);
        });

        this.CreateWorkData.breakdownDetails.forEach(element => this.totalPc += element.breakdownqty);
      });
    }

    pdf() {
      const element = document.getElementById('printContent');
      let margin = 10;
      let format = 'a3';
      let orientation = 'landscape';
      const opt = {
        margin: margin,
        filename: 'workorder.pdf',
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: format, orientation: orientation }
      };
      html2pdf().from(element).set(opt).save();
    }
  
  }
