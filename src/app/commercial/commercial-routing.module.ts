import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommercialComponent } from './commercial.component';
import { MasterchallanComponent } from './masterchallan/masterchallan.component';
import { LcComponent } from './lc/lc.component';

const routes: Routes = [
  { path: '', component: CommercialComponent },
  { path: 'masterchallan', component: MasterchallanComponent },
  { path: 'LC', component: LcComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommercialRoutingModule { }
