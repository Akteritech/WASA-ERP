import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffsetRoutingModule } from './offset-routing.module';
import {SuiModule} from 'ng2-semantic-ui';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxBarcodeModule} from 'ngx-barcode';
import {OffsetSampleComponent} from './offset-production/offset-sample/offset-sample.component';
import {AddOffsetSampleComponent} from './offset-production/offset-sample/add-offset-sample/add-offset-sample.component';
import {MaterialDetailsComponent} from './offset-production/material-details/material-details.component';
import {AddMaterialDetailComponent} from './offset-production/material-details/add-material-detail/add-material-detail.component';
import {ShowOffsetSampleComponent} from './offset-production/offset-sample/show-offset-sample/show-offset-sample.component';
import {OffsetProductionComponent} from './offset-production/offset-production.component';
import { ShowOffsetJobcardComponent } from './offset-production/offset-jobcard/show-offset-jobcard/show-offset-jobcard.component';
import {NgxPrintModule} from 'ngx-print';
import { OffsetTechnicalsComponent } from './offset-production/offset-technicals/offset-technicals.component';
import { AddOffsetTechnicalsComponent } from './offset-production/offset-technicals/add-offset-technicals/add-offset-technicals.component';
import { ShowOffsetTechnicalsComponent } from './offset-production/offset-technicals/show-offset-technicals/show-offset-technicals.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SuiModule,
    NgxBarcodeModule,
    OffsetRoutingModule,
    NgxPrintModule
  ],
  exports: [
    ShowOffsetSampleComponent,
    AddOffsetSampleComponent,
    ShowOffsetJobcardComponent,
    AddMaterialDetailComponent
  ],
  declarations: [
    OffsetSampleComponent,
    OffsetProductionComponent,
    AddOffsetSampleComponent,
    MaterialDetailsComponent,
    AddMaterialDetailComponent,
    ShowOffsetSampleComponent,
    ShowOffsetJobcardComponent,
    ShowOffsetSampleComponent,
    OffsetTechnicalsComponent,
    AddOffsetTechnicalsComponent,
    ShowOffsetTechnicalsComponent,
  ]
})
export class OffsetModule { }
