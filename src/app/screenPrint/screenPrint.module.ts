import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    SuiCheckboxModule,
    SuiCollapseModule,
    SuiDatepickerModule,
    SuiDimmerModule,
    SuiMessageModule,
    SuiPaginationModule,
    SuiPopupModule,
    SuiProgressModule,
    SuiSelectModule,
    SuiTabsModule
} from 'ng2-semantic-ui';
import {FormsModule} from '@angular/forms';
import {NgxBarcodeModule} from 'ngx-barcode';
import {NgxPrintModule} from 'ngx-print';
import {ScreenPrintRoutingModule} from './screenPrint-routing.module';
import {ScreenPrintProductionComponent} from './screenPrint-production/screenPrint-production.component';
import {ScreenPrintSampleComponent} from './screenPrint-production/screen-print-sample/screen-print-sample.component';
import {AddScreenPrintSampleComponent} from './screenPrint-production/screen-print-sample/add-screen-print-sample/add-screen-print-sample.component';
import {ShowScreenPrintSampleComponent} from './screenPrint-production/screen-print-sample/show-screen-print-sample/show-screen-print-sample.component';
import {ScreenPrintTechnicalDetailsComponent} from './screenPrint-production/screenPrint-technical-details/screenPrint-technical-details.component';
import { AddScreenPrintTechnicalDetailsComponent } from './screenPrint-production/screenPrint-technical-details/add-screen-print-technical-details/add-screen-print-technical-details.component';

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
        ScreenPrintRoutingModule,
        SuiPopupModule,
        SuiCheckboxModule,
        SuiPaginationModule,
        SuiTabsModule,
        SuiDimmerModule
    ],
    exports: [
        ShowScreenPrintSampleComponent,
    ],
  declarations: [
    ScreenPrintProductionComponent,
    ScreenPrintSampleComponent,
    AddScreenPrintSampleComponent,
    ShowScreenPrintSampleComponent,
    ScreenPrintTechnicalDetailsComponent,
    AddScreenPrintTechnicalDetailsComponent
  ]
})
export class ScreenPrintModule { }
