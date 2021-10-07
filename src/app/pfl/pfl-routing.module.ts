import { AddPflTechnicalDetailsComponent } from './pfl-production/pfl-technical-details/add-pfl-technical-details/add-pfl-technical-details.component';
import { PflTechnicalDetailsComponent } from './pfl-production/pfl-technical-details/pfl-technical-details.component';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PflSampleComponent} from './pfl-production/pfl-sample/pfl-sample.component';
import {AddPflSampleComponent} from './pfl-production/pfl-sample/add-pfl-sample/add-pfl-sample.component';
import {PflJobCardComponent} from './pfl-production/pfl-JobCard/pfl-job-card.component';
import {AddPflJobCardComponent} from './pfl-production/pfl-JobCard/add-pfl-job-card/add-pfl-job-card.component';
const routes: Routes = [
  {path: 'samples' , component: PflSampleComponent},
  {path: 'pfl-technical-details' , component: PflTechnicalDetailsComponent},
  {path: 'pfl-technical-details/edit/:id' , component: AddPflTechnicalDetailsComponent},
  {path: 'samples/add' , component: AddPflSampleComponent},
  {path: 'samples/edit/:id' , component: PflSampleComponent},
  {path: 'job-cards/:category', component: PflJobCardComponent},
  {path: 'job-cards/add' , component: AddPflJobCardComponent},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]

})
export class PflRoutingModule { }
