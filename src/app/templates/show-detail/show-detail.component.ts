
import { ComponentModalConfig, ModalSize, SuiModal } from 'ng2-semantic-ui';
import { Component, OnInit } from '@angular/core';
import * as html2pdf from 'html2pdf.js';
import { ApiService } from '../../api.service';
declare var $: any;

interface IShowDetailContext {
  title: string;
  componentName: string;
  id: number;
}
@Component({
  selector: 'app-show-detail',
  template: `
    <div class="ui header">
      <div class="header">
        {{ modal.context.title }}
        <button class="ui red label my-2"  (click)="pdf()" > <i class="download icon"></i>Download Pdf</button>
        <button class="ui blue label"  printSectionId="printSection" ngxPrint><i class="print icon"></i> Print</button>
        <label class="ui bg-white huge top right attached label" (click)="modal.deny(undefined)"><i class="ui x link icon"></i>
      </label>
      </div>
    </div>
    <div class="scrolling content" id="printSection" style="font-size: .8em !important;">
      <app-show-company *ngIf="compname==='company'" [id]="id"></app-show-company>
      <app-show-brand *ngIf="compname==='brand'" [id]="id"></app-show-brand>
      <app-show-pfl-sample *ngIf="compname==='pflSample'" [id]="id"></app-show-pfl-sample>
      <!--<app   *ngIf="compname==='pflSample'" [id]="id"></app>-->
      <!--<app-show-designation *ngIf="compname==='Designation'" [id]="id"></app-show-designation>-->
      <app-show-customer *ngIf="compname==='customer'" [id]="id"></app-show-customer>
      <app-show-program *ngIf="compname==='Program'" [id]="id"></app-show-program>
      <app-show-department *ngIf="compname==='department'" [id]="id"></app-show-department>
      <app-show-designation *ngIf="compname==='Designation'" [id]="id"></app-show-designation>
      <app-show-employee-details *ngIf="compname==='employee'" [id]="id"></app-show-employee-details>
      <app-show-employee-profile *ngIf="compname==='employeeprofile'" [id]="id"></app-show-employee-profile>
      <app-show-woven-common-details *ngIf="compname==='woven'" [id]="id"></app-show-woven-common-details>
      <app-show-sample *ngIf="compname==='sample'" [id]="id"></app-show-sample>
      <app-show-offset-jobcard *ngIf="compname==='offsetJobCard'" [id]="id"></app-show-offset-jobcard>
      <app-print-pfl-job-card *ngIf="compname==='PflJobCard'" [id]="id"></app-print-pfl-job-card>
      <app-print-thermal-job-card *ngIf="compname==='ThermalJobCard'" [id]="id"></app-print-thermal-job-card>
      <app-show-job-card *ngIf="compname==='showjobcard'" [id]="id"></app-show-job-card>
        <app-show-master-challan *ngIf="compname === 'masterchallan'" [id]="id"></app-show-master-challan>
      <app-show-offset-sample *ngIf="compname==='offsetsample'" [id]="id"></app-show-offset-sample>
      <app-show-heattransfer-sample *ngIf="compname==='heatshowtsample'" [id]="id"></app-show-heattransfer-sample>
      <app-show-thermal-sample *ngIf="compname==='showthermal'" [id]="id"></app-show-thermal-sample>
      <app-show-screen-print-sample *ngIf="compname==='screenprint'" [id]="id"></app-show-screen-print-sample>
	  <app-show-create-wo *ngIf="compname==='show-create'" [id]="id"></app-show-create-wo>
      <app-show-master-price-entry *ngIf="compname === 'masterprice'" [id]="id"></app-show-master-price-entry>
      <app-show-maheen-pi *ngIf="compname === 'showPI'" [id]="id"></app-show-maheen-pi>
      <app-show-byways-pi *ngIf="compname === 'bywaysPI'" [id]="id"></app-show-byways-pi>
      <app-show-nexgen-pi *ngIf="compname === 'nexgenPI'" [id]="id"></app-show-nexgen-pi>
      <app-leave-application-english *ngIf="compname === 'leave'" [id]="id"></app-leave-application-english>
      <app-show-delivery-challan *ngIf="compname === 'challan'" [id]="id"></app-show-delivery-challan>
      <app-gate-pass *ngIf="compname === 'gatepass'" [id]="id"></app-gate-pass>
    </div>`
})
export class ShowDetailComponent implements OnInit {
  compname: any;
  id: any;
  url = 'SampleGeneralSpecs';
  constructor(public modal: SuiModal<IShowDetailContext, void, void>, public api: ApiService) {
    this.compname = modal.context.componentName;
    this.id = modal.context.id;
    console.log(this.id);
  }
  ngOnInit() {
    // this.getname();
  }
  // getname() {
  //   const data = this.masterprice.getItemMasterEntry('id');
  //   console.log(data);
  // }
  pdf() {
    const element = document.getElementById('printSection');
    let margin = 15;
    let format = 'a4';
    let orientation = 'landscape';
    if (this.compname === 'jobcard' || this.compname === 'workorder') {
      margin = 10;
      format = 'a3';
      orientation = 'landscape';
    }
    const opt = {
      margin: margin,
      filename: this.toExportFileName(this.compname, 'pdf'),
      image: { type: 'jpeg', quality: 0.95 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: format, orientation: orientation }
    };
    html2pdf().from(element).set(opt).save();
  }
  toExportFileName(fileName: string, type: string): string {
    return `${fileName}_${new Date().toLocaleDateString()}.${type}`;
  }
}
export class ShowDetail extends ComponentModalConfig<IShowDetailContext, void, void> {
  constructor(title: string, componentName: string, id: any) {
    console.log(id);
    super(ShowDetailComponent, { title, componentName, id });

    this.isClosable = false;
    this.transitionDuration = 150;
    this.size = ModalSize.Large;
  }
}
