import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MasterPriceEntryComponent} from './costing-production/master-price-entry/master-price-entry.component';
import {CostingComponent} from './costing.component';
import {CostingProductionComponent} from './costing-production/costing-production.component';
import {AddMasterPriceEntryComponent} from './costing-production/master-price-entry/add-master-price-entry/add-master-price-entry.component';
import { CostingreportsComponent } from './costingreports/costingreports.component';
import { MasterpricereportComponent } from './costingreports/masterpricereport/masterpricereport.component';
const routes: Routes = [
  {path: '' , component: CostingComponent},
  { path: '' , component: CostingProductionComponent,
    children : [
      {path: 'masterprice/add' , component: MasterPriceEntryComponent},
      {path: 'masterprice/edit/:id' , component: AddMasterPriceEntryComponent},
      {path: 'costingreports' , component: CostingreportsComponent},
      {path: 'costing/costingreports/masterPriceReport' , component: MasterpricereportComponent},

    ]
  },


];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CostingRoutingModule { }
