import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OffsetSampleComponent} from './offset-production/offset-sample/offset-sample.component';
import {AddOffsetTechnicalsComponent} from './offset-production/offset-technicals/add-offset-technicals/add-offset-technicals.component';
import {OffsetTechnicalsComponent} from './offset-production/offset-technicals/offset-technicals.component';
const routes: Routes = [
  {path: '' , redirectTo: 'work-orders', pathMatch: 'full'},
  {path: 'samples', component: OffsetSampleComponent},
  {path: 'offset/samples/edit/:id' , component: OffsetSampleComponent},
  {path: 'offset-technical-details', component: OffsetTechnicalsComponent},
  {path: 'offset-technical-details/edit/:id', component: AddOffsetTechnicalsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffsetRoutingModule { }
