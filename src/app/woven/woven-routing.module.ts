  import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {JobCardComponent} from './woven-production/job-card/job-card.component';
import {AddJobCardComponent} from './woven-production/job-card/add-job-card/add-job-card.component';
import {SampleComponent} from './woven-production/sample/sample.component';
import { WovenDetailsComponent } from './woven-production/woven-details/woven-details.component';
import {ShowJobCardComponent} from './woven-production/job-card/show-job-card/show-job-card.component';
import {AddWovenCommonDetailsComponent} from './woven-production/woven-details/add-woven-common-details/add-woven-common-details.component';

const routes: Routes = [
  {path: '' , redirectTo: 'work-orders', pathMatch: 'full'},
  {path: 'job-cards' , component: JobCardComponent},
  {path: 'job-cards/add' , component: AddJobCardComponent},
  {path: 'job-cards/show/:id' , component: ShowJobCardComponent},
  {path: 'samples', component: SampleComponent},
  {path: 'woven-technical-details', component: WovenDetailsComponent},
  {path: 'woven-technical-details/edit/:id', component: AddWovenCommonDetailsComponent},
  {path: 'woven/samples/edit/:id' , component: SampleComponent},
  {path: 'technical/edit/:id' , component: WovenDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WovenRoutingModule { }
