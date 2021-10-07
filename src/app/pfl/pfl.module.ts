import { AddPflTechnicalDetailsComponent } from './pfl-production/pfl-technical-details/add-pfl-technical-details/add-pfl-technical-details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PflSampleComponent } from './pfl-production/pfl-sample/pfl-sample.component';
import { AddPflSampleComponent } from './pfl-production/pfl-sample/add-pfl-sample/add-pfl-sample.component';
import { ShowPflSampleComponent } from './pfl-production/pfl-sample/show-pfl-sample/show-pfl-sample.component';
import {
    SuiCheckboxModule,
    SuiCollapseModule,
    SuiDatepickerModule, SuiDimmerModule,
    SuiMessageModule, SuiPaginationModule,
    SuiPopupModule, SuiProgressModule,
    SuiSelectModule, SuiTabsModule
} from 'ng2-semantic-ui';
import {FormsModule} from '@angular/forms';
import {NgxBarcodeModule} from 'ngx-barcode';
import {NgxPrintModule} from 'ngx-print';
import {PflRoutingModule} from './pfl-routing.module';
import {PflProductionComponent} from './pfl-production/pfl-production.component';
import {PflTechnicalDetailsComponent} from './pfl-production/pfl-technical-details/pfl-technical-details.component';
import {PflJobCardComponent} from './pfl-production/pfl-JobCard/pfl-job-card.component';
import {AddPflJobCardComponent} from './pfl-production/pfl-JobCard/add-pfl-job-card/add-pfl-job-card.component';
import {PrintPflJobCardComponent} from './pfl-production/pfl-JobCard/print-pfl-job-card/print-pfl-job-card.component';

@NgModule({
    imports: [
        CommonModule,
        SuiMessageModule,
        SuiCollapseModule,
        FormsModule,
        SuiProgressModule,
        SuiSelectModule,
        SuiDatepickerModule,
        NgxBarcodeModule,
        NgxPrintModule,
        PflRoutingModule,
        SuiPopupModule,
        SuiCheckboxModule,
        SuiPaginationModule,
        SuiTabsModule,
        SuiDimmerModule
    ],
  exports: [
    AddPflSampleComponent,
    ShowPflSampleComponent,
    PrintPflJobCardComponent,
    PflTechnicalDetailsComponent,
    PflJobCardComponent

  ],
  declarations: [
    PflSampleComponent,
    AddPflSampleComponent,
    ShowPflSampleComponent,
    PflProductionComponent,
    PflTechnicalDetailsComponent,
    PflJobCardComponent,
    AddPflJobCardComponent,
    PrintPflJobCardComponent,
    AddPflTechnicalDetailsComponent
  ]
})
export class PflModule { }
