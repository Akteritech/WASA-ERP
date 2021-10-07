import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WovenRoutingModule} from '../woven/woven-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SuiModule} from 'ng2-semantic-ui';
import {NgxBarcodeModule} from 'ngx-barcode';
import {NgxPrintModule} from 'ngx-print';

@NgModule({
  declarations: [
  ],
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
  ]
})
export class WorkOrderForAllModule { }
