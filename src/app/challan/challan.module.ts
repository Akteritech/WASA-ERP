import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SuiModule} from 'ng2-semantic-ui';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChallanRoutingModule} from './challan-routing.module';
import {ChallanComponent} from './challan.component';
import {ChallanTrackingComponent} from './challan-tracking/challan-tracking.component';
import {ChallanTrackingDashboardComponent} from './challan-tracking-dashboard/challan-tracking-dashboard.component';
import {DeliveryChallanComponent} from './delivery-challan/delivery-challan.component';
import {AddDeliveryChallanComponent} from './delivery-challan/add-delivery-challan/add-delivery-challan.component';
import { ShowDeliveryChallanComponent } from './delivery-challan/show-delivery-challan/show-delivery-challan.component';
import { GatePassComponent } from './delivery-challan/gate-pass/gate-pass.component';

@NgModule({
  
  imports: [
    CommonModule,
    ChallanRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SuiModule
  ],
  exports: [
    ShowDeliveryChallanComponent,
    GatePassComponent
  ],
  declarations: [ChallanComponent, DeliveryChallanComponent,
    GatePassComponent, ShowDeliveryChallanComponent, AddDeliveryChallanComponent,
   ChallanTrackingComponent, ChallanTrackingDashboardComponent],
})
export class ChallanModule { }
