import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeattransferRoutingModule } from './heattransfer-routing.module';
import {SuiModule} from 'ng2-semantic-ui';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxBarcodeModule} from 'ngx-barcode';
import {HeattransferComponent} from './heattransfer.component';
import {HeattransferSampleComponent} from './heattransfer-production/heattransfer-sample/heattransfer-sample.component';
import {AddHeattransferSampleComponent} from './heattransfer-production/heattransfer-sample/add-heattransfer-sample/add-heattransfer-sample.component';
import {MaterialDetailsComponent} from './heattransfer-production/material-details/material-details.component';
import {AddMaterialDetailComponent} from './heattransfer-production/material-details/add-material-detail/add-material-detail.component';
import {ShowHeattransferSampleComponent} from './heattransfer-production/heattransfer-sample/show-heattransfer-sample/show-heattransfer-sample.component';
import {HeattransferProductionComponent} from './heattransfer-production/heattransfer-production.component';
import {NgxPrintModule} from 'ngx-print';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SuiModule,
    NgxBarcodeModule,
    HeattransferRoutingModule,
    NgxPrintModule
  ],
  exports: [
    AddHeattransferSampleComponent,
    ShowHeattransferSampleComponent,
    AddMaterialDetailComponent

  ],
  declarations: [
    HeattransferSampleComponent,
    HeattransferComponent,
    HeattransferProductionComponent,
    AddHeattransferSampleComponent,
    MaterialDetailsComponent,
    AddMaterialDetailComponent,
    ShowHeattransferSampleComponent
  ]
})
export class HeattransferModule { }
