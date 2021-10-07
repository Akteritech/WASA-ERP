import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
const routes: Routes = [
  {path: '' , redirectTo: 'work-orders', pathMatch: 'full'},
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]

})
export class WorkOrderForAllRoutingModule { }
