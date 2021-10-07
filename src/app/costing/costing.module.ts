import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SuiModule} from 'ng2-semantic-ui';
import {NgxPrintModule} from 'ngx-print';
import {CostingRoutingModule} from './costing-routing.module';
import {MasterPriceEntryComponent} from './costing-production/master-price-entry/master-price-entry.component';
import {AddMasterPriceEntryComponent} from './costing-production/master-price-entry/add-master-price-entry/add-master-price-entry.component';
import { CostingProductionComponent } from './costing-production/costing-production.component';
import {ShowMasterPriceEntryComponent} from './costing-production/master-price-entry/show-master-price-entry/show-master-price-entry.component';
import { CostingComponent } from './costing.component';
import { CostingreportsComponent } from './costingreports/costingreports.component';
import { MasterpricereportComponent } from './costingreports/masterpricereport/masterpricereport.component';

@NgModule({
  declarations: [
    MasterPriceEntryComponent,
    AddMasterPriceEntryComponent,
    CostingProductionComponent,
    ShowMasterPriceEntryComponent,
    CostingComponent,
    CostingreportsComponent,
    MasterpricereportComponent
  ],
  imports: [
    CommonModule,
    CostingRoutingModule,
    ReactiveFormsModule,
    SuiModule,
    FormsModule,
    NgxPrintModule
  ],
    exports: [
        AddMasterPriceEntryComponent,
        ShowMasterPriceEntryComponent
    ]
})
export class CostingModule { }
