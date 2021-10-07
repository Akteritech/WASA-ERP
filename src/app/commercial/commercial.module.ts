import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommercialRoutingModule } from './commercial-routing.module';
import { MasterchallanComponent } from './masterchallan/masterchallan.component';
import { SuiModule } from 'ng2-semantic-ui';
import { FormsModule } from '@angular/forms';
import { CommercialComponent } from './commercial.component';
import { AddMasterchallanComponent } from './masterchallan/add-masterchallan/add-masterchallan.component';
import { LcComponent } from './lc/lc.component';
import { CreateLcComponent } from './lc/create-lc/create-lc.component';
import {ShowMasterChallanComponent} from './masterchallan/show-master-challan/show-master-challan.component';

@NgModule({
  declarations: [MasterchallanComponent, CommercialComponent, AddMasterchallanComponent, LcComponent,
    CreateLcComponent, ShowMasterChallanComponent],
  exports: [
      ShowMasterChallanComponent
  ],
  imports: [
    CommonModule,
    CommercialRoutingModule,
    SuiModule,
    FormsModule
  ]
})
export class CommercialModule { }
