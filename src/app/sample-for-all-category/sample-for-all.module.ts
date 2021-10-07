import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSampleForAllCategoryComponent } from './add-sample-for-all-category/add-sample-for-all-category.component';
import { ShowSampleForAllCategoryComponent } from './show-sample-for-all-category/show-sample-for-all-category.component';
import {SuiModule} from 'ng2-semantic-ui';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxBarcodeModule} from 'ngx-barcode';
import {NgxPrintModule} from 'ngx-print';
import {SampleForAllRoutingModule} from './sample-for-all-routing.module';
import {HeattransferModule} from '../HeatTransfer/heattransfer.module';
import {PflModule} from '../pfl/pfl.module';

@NgModule({
  declarations: [AddSampleForAllCategoryComponent, ShowSampleForAllCategoryComponent],
  exports: [
    AddSampleForAllCategoryComponent
  ],
  imports: [
    CommonModule,
    SampleForAllRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SuiModule,
    NgxBarcodeModule,
    NgxPrintModule,
    HeattransferModule,
    PflModule,
  ]
})
export class SampleForAllModule { }
