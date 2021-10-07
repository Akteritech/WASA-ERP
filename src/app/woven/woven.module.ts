import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WovenRoutingModule } from './woven-routing.module';
import { WovenProductionComponent } from './woven-production/woven-production.component';
import {AddJobCardComponent} from './woven-production/job-card/add-job-card/add-job-card.component';
import {SampleComponent} from './woven-production/sample/sample.component';
import {AddSampleComponent} from './woven-production/sample/add-sample/add-sample.component';
import { WovenDetailsComponent} from './woven-production/woven-details/woven-details.component';
import {ShowSampleComponent} from './woven-production/sample/show-sample/show-sample.component';
import {ShowJobCardComponent} from './woven-production/job-card/show-job-card/show-job-card.component';
import {JobCardComponent} from './woven-production/job-card/job-card.component';
import {ShowWovenCommonDetailsComponent} from './woven-production/woven-details/show-woven-common-details/show-woven-common-details.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SuiModule} from 'ng2-semantic-ui';
import {NgxBarcodeModule} from 'ngx-barcode';
import {NgxPrintModule} from 'ngx-print';
import { AddWovenCommonDetailsComponent } from './woven-production/woven-details/add-woven-common-details/add-woven-common-details.component';

@NgModule({
  imports: [
    CommonModule,
    WovenRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SuiModule,
    NgxBarcodeModule,
    NgxPrintModule
  ],
    exports: [
        ShowWovenCommonDetailsComponent,
        ShowSampleComponent,
        ShowJobCardComponent,
        AddSampleComponent,
    ],
  declarations: [
    WovenProductionComponent,
    SampleComponent,
    AddSampleComponent,
    ShowSampleComponent,
    WovenDetailsComponent,
    ShowWovenCommonDetailsComponent,
    JobCardComponent,
    AddJobCardComponent,
    ShowJobCardComponent,
    AddWovenCommonDetailsComponent,

  ]
})
export class WovenModule { }
