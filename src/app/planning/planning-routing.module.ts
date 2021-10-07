import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanningComponent } from './planning.component';
import { PlanPflComponent } from './plan-pfl/plan-pfl.component';
import { PlanScreenComponent } from './plan-screen/plan-screen.component';
import { PlanHeatComponent } from './plan-heat/plan-heat.component';
import { PlanThermalComponent } from './plan-thermal/plan-thermal.component';
import { PlanOffsetComponent } from './plan-offset/plan-offset.component';
import { PlanWovenComponent } from './plan-woven/plan-woven.component';
import { PflDashboardComponent } from './plan-pfl/pfl-dashboard/pfl-dashboard.component';
import { PlanPlanningComponent } from './plan-pfl/plan-planning/plan-planning.component';
import { PlanDesignComponent } from './plan-pfl/plan-design/plan-design.component';
import { PlanProfReadingComponent } from './plan-pfl/plan-prof-reading/plan-prof-reading.component';
import { PlanPrintingComponent } from './plan-pfl/plan-printing/plan-printing.component';
import { PlanCuttingComponent } from './plan-pfl/plan-cutting/plan-cutting.component';
import { PlanCuringComponent } from './plan-pfl/plan-curing/plan-curing.component';
import { PlanLabTestComponent } from './plan-pfl/plan-lab-test/plan-lab-test.component';
import { PlanFinishingComponent } from './plan-pfl/plan-finishing/plan-finishing.component';
import { PlanAqlComponent } from './plan-pfl/plan-aql/plan-aql.component';
import { PlanChallanComponent } from './plan-pfl/plan-challan/plan-challan.component';
import { PlanScanJobCardComponent } from './plan-pfl/plan-scan-job-card/plan-scan-job-card.component';
import { PflProductStatusDashboardComponent } from './plan-pfl/pfl-product-status-dashboard/pfl-product-status-dashboard.component';
import { PflPrintingUpdateComponent } from './plan-pfl/plan-printing/pfl-printing-update/pfl-printing-update.component';
import {PflCuttingUpdateComponent} from './plan-pfl/plan-cutting/pfl-cutting-update/pfl-cutting-update.component';
import {WovenActualWastageEntryComponent} from "./plan-woven/woven-actual-wastage-entry/woven-actual-wastage-entry.component";
import {SampleComponent} from "../woven/woven-production/sample/sample.component";
import {WovenDesignerEntryComponent} from "./plan-woven/woven-designer-entry/woven-designer-entry.component";
import { PflPrintingMachineComponent } from './plan-pfl/plan-printing/pfl-printing-machine/pfl-printing-machine.component';
import {PflCuttingMachineComponent} from "./plan-pfl/plan-cutting/pfl-cutting-machine/pfl-cutting-machine.component";
import {PflJobcardApprovalComponent} from "./plan-pfl/pfl-jobcard-approval/pfl-jobcard-approval.component";
//import {PflPrintingUpdateComponent} from './plan-pfl/plan-printing/pfl-printing-update/pfl-printing-update.component';

const routes: Routes = [
  {path: '', component: PlanningComponent},
  {path: 'pfl', component: PlanPflComponent},
  {path: 'woven', component: PlanWovenComponent},
  {path: 'offset', component: PlanOffsetComponent},
  {path: 'thermal', component: PlanThermalComponent},
  {path: 'heat-transfer', component: PlanHeatComponent},
  {path: 'screen-print', component: PlanScreenComponent},
  {path: 'pfl-dashboard', component: PflDashboardComponent},
  {path: 'pfl-planing', component: PlanPlanningComponent},
  {path: 'pfl-design', component: PlanDesignComponent},
  {path: 'pfl-prof-reading', component: PlanProfReadingComponent},
  {path: 'pfl-printing', component: PlanPrintingComponent},
  {path: 'pfl-printing-update/:id', component: PflPrintingUpdateComponent},
  {path: 'pfl-printing-machine/:id', component: PflPrintingMachineComponent},
  {path: 'pfl-cutting', component: PlanCuttingComponent},
  {path: 'pfl-cutting-update/:id', component: PflCuttingUpdateComponent},
  {path: 'pfl-cutting-machine/:id', component: PflCuttingMachineComponent},
  {path: 'pfl-curing', component: PlanCuringComponent},
  {path: 'pfl-lab-test', component: PlanLabTestComponent},
  {path: 'pfl-finishing', component: PlanFinishingComponent},
  {path: 'pfl-aql', component: PlanAqlComponent},
  {path: 'pfl-challan', component: PlanChallanComponent},
  {path: 'pfl-scan-job-card', component: PlanScanJobCardComponent},
  {path: 'pfl-product-status-dashboard', component: PflProductStatusDashboardComponent},
  {path: 'wastage-entry/woven', component: WovenActualWastageEntryComponent},
  {path: 'designer-entry', component: WovenDesignerEntryComponent},
  {path: 'designer-entry/edit/:id', component: WovenDesignerEntryComponent},
  {path: 'wastage-entry/screen-print', component: WovenActualWastageEntryComponent},
  {path: 'pfl-jobcard-approval', component: PflJobcardApprovalComponent},
  {path: 'wastage-entry/woven/edit/:id' , component: WovenActualWastageEntryComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanningRoutingModule { }
