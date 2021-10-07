import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CRMRoutingModule } from './crm-routing.module';
import { PIComponent } from './pi/pi.component';
import { AddPiComponent } from './pi/add-pi/add-pi.component';
import { SuiModule } from 'ng2-semantic-ui';
import { FormsModule } from '@angular/forms';
import { CrmComponent } from './crm.component';
import { ShowMaheenPiComponent } from './pi/show-maheen-pi/show-maheen-pi.component';
import { ShowBywaysPiComponent } from './pi/show-byways-pi/show-byways-pi.component';
import { ShowNexgenPiComponent } from './pi/show-nexgen-pi/show-nexgen-pi.component';
import { CrmReportComponent } from './crm-report/crm-report.component';
import { OutstandingSummaryComponent } from './crm-report/outstanding-summary/outstanding-summary.component';

@NgModule({
  declarations: [PIComponent, AddPiComponent, CrmComponent, ShowMaheenPiComponent, ShowBywaysPiComponent, ShowNexgenPiComponent, CrmReportComponent, OutstandingSummaryComponent],
  imports: [
    CommonModule,
    CRMRoutingModule,
    SuiModule,
    FormsModule
  ],
  exports: [
    ShowMaheenPiComponent,
    ShowBywaysPiComponent,
    ShowNexgenPiComponent
  ],
})
export class CRMModule { }
