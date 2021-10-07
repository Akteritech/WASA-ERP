import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChallanTrackingComponent} from './challan-tracking/challan-tracking.component';
import {ChallanTrackingDashboardComponent} from './challan-tracking-dashboard/challan-tracking-dashboard.component';
import {ChallanComponent} from './challan.component';
import { AddDeliveryChallanComponent } from './delivery-challan/add-delivery-challan/add-delivery-challan.component';
import { DeliveryChallanComponent } from './delivery-challan/delivery-challan.component';

const routes: Routes = [
  { path: '', component: ChallanComponent },
  { path: 'deliverychallan', component: DeliveryChallanComponent },
  { path: 'challantracking', component: ChallanTrackingDashboardComponent },
  {path: 'deliverychallan/edit/:id', component: AddDeliveryChallanComponent},
  { path: 'challantracking/status1', component: ChallanTrackingComponent },
  { path: 'challantracking/status2', component: ChallanTrackingComponent },
  { path: 'challantracking/receipt', component: ChallanTrackingComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChallanRoutingModule { }
