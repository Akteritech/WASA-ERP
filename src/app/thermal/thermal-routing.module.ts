import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ThermalSampleComponent} from './thermal-production/thermal-sample/thermal-sample.component';
import {AddThermalSampleComponent} from './thermal-production/thermal-sample/add-thermal-sample/add-thermal-sample.component';
import { AddMaterialDetailComponent } from './thermal-production/material-details/add-material-detail/add-material-detail.component';
import {MaterialDetailsComponent} from './thermal-production/material-details/material-details.component';
const routes: Routes = [
  // {path: '' , redirectTo: 'work-orders', pathMatch: 'full'},
  {path: 'samples', component: ThermalSampleComponent},
  {path: 'thermal-technical-details', component: MaterialDetailsComponent},
  {path: 'thermal-technical-details/edit/:id', component: AddMaterialDetailComponent},
  {path: 'thermal/samples/add' , component: AddThermalSampleComponent},
  {path: 'thermal/samples/edit/:id' , component: ThermalSampleComponent},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ThermalRoutingModule { }
