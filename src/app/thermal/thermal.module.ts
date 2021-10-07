import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThermalProductionComponent } from './thermal-production/thermal-production.component';
import { ThermalSampleComponent } from './thermal-production/thermal-sample/thermal-sample.component';
import { AddThermalSampleComponent } from './thermal-production/thermal-sample/add-thermal-sample/add-thermal-sample.component';
import { ShowThermalSampleComponent } from './thermal-production/thermal-sample/show-thermal-sample/show-thermal-sample.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SuiModule} from 'ng2-semantic-ui';
import {NgxBarcodeModule} from 'ngx-barcode';
import {NgxPrintModule} from 'ngx-print';
import {ThermalRoutingModule} from './thermal-routing.module';
import {AddMaterialDetailComponent} from './thermal-production/material-details/add-material-detail/add-material-detail.component';
import {MaterialDetailsComponent} from './thermal-production/material-details/material-details.component';
import {ThermalComponent} from './thermal.component';
import {PrintThermalJobCardComponent} from './thermal-production/thermal-JobCard/print-thermal-job-card/print-thermal-job-card.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SuiModule,
    ThermalRoutingModule,
    NgxBarcodeModule,
    NgxPrintModule,
  ],
  exports: [
    ShowThermalSampleComponent,
    AddThermalSampleComponent,
    AddMaterialDetailComponent,
    PrintThermalJobCardComponent

  ],
  declarations: [
    ThermalComponent,
    ThermalProductionComponent,
    ThermalSampleComponent,
    AddThermalSampleComponent,
    ShowThermalSampleComponent,
    AddMaterialDetailComponent,
    MaterialDetailsComponent,
    PrintThermalJobCardComponent
  ],
})
export class ThermalModule { }
