import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrmComponent } from './crm.component';
import { AddPiComponent } from './pi/add-pi/add-pi.component';
import { PIComponent } from './pi/pi.component';
import { CrmReportComponent } from './crm-report/crm-report.component';
import { OutstandingSummaryComponent } from './crm-report/outstanding-summary/outstanding-summary.component';

const routes: Routes = [
  { path: '', component: CrmComponent },
  { path: 'pi', component: PIComponent},
  { path: 'createpi', component: AddPiComponent},
  { path: 'crmReport', component: CrmReportComponent},
  { path: 'crmReport/outstandingSummary', component: OutstandingSummaryComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CRMRoutingModule { }
