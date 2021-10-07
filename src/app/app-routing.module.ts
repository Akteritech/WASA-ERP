import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {SamplesDashboardComponent} from './samples-dashboard/samples-dashboard.component';
import {OrdersDashboardComponent} from './orders-dashboard/orders-dashboard.component';
// import {JobCardDashboardComponent} from './job-card-dashboard/job-card-dashboard.component';
import {CreateWOComponent} from './create-wo/create-wo.component';
// import {ScreenPrintModule} from './screenPrint/screenPrint.module';
// import {HrmModule} from './hrm/hrm.module';
// import {ThermalModule} from './thermal/thermal.module';
// import {HeattransferModule} from './HeatTransfer/heattransfer.module';
// import {PflModule} from './pfl/pfl.module';
// import {InventoryModule} from './inventory/inventory.module';
// import {CostingModule} from './costing/costing.module';
// import {OffsetModule} from './offset/offset.module';
// import {WovenModule} from './woven/woven.module';
// import {MastersModule} from './masters/masters.module';
import {SampleTrackingComponent} from './sample-tracking/sample-tracking.component';
import {AddCreateWoComponent} from './create-wo/add-create-wo/add-create-wo.component';
import {UploadOrdersComponent} from './upload-orders/upload-orders.component';
import {UserLoginComponent} from './user-login/user-login.component';
import {WorkorderreportsComponent } from './workorderreports/workorderreports.component';
import {CsorderreportsComponent } from './workorderreports/csorderreports/csorderreports.component';
import { BuyerorderreportComponent } from './workorderreports/buyerorderreport/buyerorderreport.component';
import { WorkorderconfirmationComponent } from './orders-dashboard/workorderconfirmation/workorderconfirmation.component';
import { OrdertrackingComponent } from './orders-dashboard/ordertracking/ordertracking.component';
import { OrderexportComponent } from './workorderreports/orderexport/orderexport.component';
import { MonthwisesalereportComponent } from './workorderreports/monthwisesalereport/monthwisesalereport.component';
import { ProductioncapecityreportComponent } from './workorderreports/productioncapecityreport/productioncapecityreport.component';
import { DeliverypositionComponent } from './workorderreports/deliveryposition/deliveryposition.component';
import { ExtrareportsComponent } from './workorderreports/extrareports/extrareports.component';
import { ReportpanelComponent } from './workorderreports/reportpanel/reportpanel.component';
import { ReportmasterpriceComponent } from './workorderreports/reportmasterprice/reportmasterprice.component';
import { DeliverychartreportsComponent } from './workorderreports/deliverychartreports/deliverychartreports.component';
// import { CRMModule } from './crm/crm.module';
// import { CommercialModule } from './commercial/commercial.module';
// import { PlanningModule } from './planning/planning.module';
// import {ChallanModule} from './challan/challan.module';
import {ShowCreateWoComponent} from './create-wo/show-create-wo/show-create-wo.component';
import { JobCardDashboardComponent } from './job-card-dashboard/job-card-dashboard.component';
import {MastersModule} from "./masters/masters.module";
import {WovenModule} from "./woven/woven.module";
import {CommercialModule} from "./commercial/commercial.module";
import {PflModule} from "./pfl/pfl.module";
import {InventoryModule} from "./inventory/inventory.module";
import {HrmModule} from "./hrm/hrm.module";
import {OffsetModule} from "./offset/offset.module";
import {CRMModule} from "./crm/crm.module";
import {ScreenPrintModule} from "./screenPrint/screenPrint.module";
import {PlanningModule} from "./planning/planning.module";
import {CostingModule} from "./costing/costing.module";
import {ThermalModule} from "./thermal/thermal.module";
import {ChallanModule} from "./challan/challan.module";
import {HeattransferModule} from "./HeatTransfer/heattransfer.module";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'workorderforall', component: CreateWOComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'upload-orders', component: UploadOrdersComponent },
  // { path: 'offset-technical-details', component: OffsetTechnicalDetailsComponent },
  { path: 'workorderforall/edit/:id', component: AddCreateWoComponent },
  { path: 'workorderforall/show/:id', component: ShowCreateWoComponent },
  { path: 'sample-tracking', component: SampleTrackingComponent },
  // { path: 'masters', loadChildren: () => MastersModule , data: {preload: true}},
  // { path: 'woven', loadChildren: () => WovenModule, data: {preload: true}},
  // { path: 'offset', loadChildren: () => OffsetModule , data: {preload: true}},
  // { path: 'costing', loadChildren: () => CostingModule , data: {preload: true}},
  // { path: 'pfl', loadChildren: () => PflModule , data: {preload: true}},
  // { path: 'heat-transfer', loadChildren: () => HeattransferModule , data: {preload: true}},
  // { path: 'thermal', loadChildren: () => ThermalModule , data: {preload: true}},
  { path: 'hrm', loadChildren: () => HrmModule , data: {preload: true}},
  // { path: 'screen-print', loadChildren: () => ScreenPrintModule , data: {preload: true}},
  // { path: 'commercial', loadChildren: () => CommercialModule , data: {preload: true}},
  // { path: 'challan', loadChildren: () => ChallanModule , data: {preload: true}},
  // { path: 'planning', loadChildren: () => PlanningModule , data: {preload: true}},
  // { path: 'crm', loadChildren: () => CRMModule , data: {preload: true}},
  { path: 'job-cards', component: JobCardDashboardComponent },
  { path: 'home', component: HomeComponent },
  { path: 'NPD-samples', component: SamplesDashboardComponent },
  { path: 'orders', component: OrdersDashboardComponent },
  { path: 'WOReports', component: WorkorderreportsComponent},
  { path: 'WOReports/CSOrderReport', component: CsorderreportsComponent},
  { path: 'WOReports/buyerOrderReport', component: BuyerorderreportComponent},
  { path: 'workorderconfirmation', component: WorkorderconfirmationComponent},
  { path: 'ordertracking', component: OrdertrackingComponent },
  { path: 'WOReports/orderexport', component: OrderexportComponent},
  { path: 'WOReports/monthWiseSaleReport', component: MonthwisesalereportComponent},
  { path: 'WOReports/productioncapacityreport', component: ProductioncapecityreportComponent},
  { path: 'WOReports/deliveryposition', component: DeliverypositionComponent},
  { path: 'WOReports/extrareports', component: ExtrareportsComponent},
  { path: 'WOReports/reportpanel', component: ReportpanelComponent},
  { path: 'WOReports/reportmasterprice', component: ReportmasterpriceComponent},
  { path: 'WOReports/deliverychartreport', component: DeliverychartreportsComponent},
  { path: 'masters', loadChildren: './masters/masters.module#MastersModule'},
  { path: 'woven', loadChildren: './woven/woven.module#WovenModule'},
  { path: 'offset', loadChildren: './offset/offset.module#OffsetModule'},
  { path: 'costing', loadChildren: './costing/costing.module#CostingModule'},
  { path: 'pfl', loadChildren: './pfl/pfl.module#PflModule'},
  { path: 'heat-transfer', loadChildren: './HeatTransfer/heattransfer.module#HeattransferModule'},
  { path: 'thermal', loadChildren: './thermal/thermal.module#ThermalModule'},
  { path: 'hrm', loadChildren: './hrm/hrm.module#HrmModule'},
  { path: 'screen-print', loadChildren: './screenPrint/screenPrint.module#ScreenPrintModule'},
  { path: 'commercial', loadChildren: './commercial/commercial.module#CommercialModule'},
  { path: 'challan', loadChildren: './challan/challan.module#ChallanModule'},
  { path: 'planning', loadChildren: './planning/planning.module#PlanningModule'},
  { path: 'crm', loadChildren: './crm/crm.module#CRMModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
