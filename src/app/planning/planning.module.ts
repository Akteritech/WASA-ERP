import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SuiModule } from 'ng2-semantic-ui';
import { PlanningRoutingModule } from './planning-routing.module';
import { PlanningComponent } from './planning.component';
import { PlanPflComponent } from './plan-pfl/plan-pfl.component';
import { PlanWovenComponent } from './plan-woven/plan-woven.component';
import { PlanOffsetComponent } from './plan-offset/plan-offset.component';
import { PlanThermalComponent } from './plan-thermal/plan-thermal.component';
import { PlanHeatComponent } from './plan-heat/plan-heat.component';
import { PlanScreenComponent } from './plan-screen/plan-screen.component';
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
import { PflCuttingUpdateComponent } from './plan-pfl/plan-cutting/pfl-cutting-update/pfl-cutting-update.component';
import { PflPrintingUpdateComponent } from './plan-pfl/plan-printing/pfl-printing-update/pfl-printing-update.component';
import { WovenActualWastageEntryComponent } from './plan-woven/woven-actual-wastage-entry/woven-actual-wastage-entry.component';
import { PflProductionDashboardComponent } from './plan-pfl/pfl-production-dashboard/pfl-production-dashboard.component';
import { WovenDesignerEntryComponent } from './plan-woven/woven-designer-entry/woven-designer-entry.component';
import { PflPrintingMachineComponent } from './plan-pfl/plan-printing/pfl-printing-machine/pfl-printing-machine.component';
import { PflCuttingMachineComponent } from './plan-pfl/plan-cutting/pfl-cutting-machine/pfl-cutting-machine.component';
import { PflJobcardApprovalComponent } from './plan-pfl/pfl-jobcard-approval/pfl-jobcard-approval.component';


@NgModule({
  declarations: [
    PlanningComponent,
    PlanPflComponent,
    PlanWovenComponent,
    PlanOffsetComponent,
    PlanThermalComponent,
    PlanHeatComponent,
    PlanScreenComponent,
    PflDashboardComponent,
    PlanPlanningComponent,
    PlanDesignComponent,
    PlanProfReadingComponent,
    PlanPrintingComponent,
    PlanCuttingComponent,
    PlanCuringComponent,
    PlanLabTestComponent,
    PlanFinishingComponent,
    PlanAqlComponent,
    PlanChallanComponent,
    PlanScanJobCardComponent,
    PflProductStatusDashboardComponent,
    PflCuttingUpdateComponent,
    PflPrintingUpdateComponent,
    WovenActualWastageEntryComponent,
    PflProductionDashboardComponent,
    WovenDesignerEntryComponent,
    PflPrintingMachineComponent,
    PflCuttingMachineComponent,
    PflJobcardApprovalComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SuiModule,
        PlanningRoutingModule,
    ],
  exports: [
    PflPrintingUpdateComponent
  ]
})
export class PlanningModule { }
