import { AddMaterialDetailComponent } from './heattransfer-production/material-details/add-material-detail/add-material-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HeattransferSampleComponent} from './heattransfer-production/heattransfer-sample/heattransfer-sample.component';
import {AddHeattransferSampleComponent} from './heattransfer-production/heattransfer-sample/add-heattransfer-sample/add-heattransfer-sample.component';
import {MaterialDetailsComponent} from './heattransfer-production/material-details/material-details.component';

const routes: Routes = [
  {path: '' , redirectTo: 'samples', pathMatch: 'full'},
  {path: 'samples', component: HeattransferSampleComponent},
  {path: 'heat-transfer-technical-details', component: MaterialDetailsComponent},
  {path: 'heat-transfer-technical-details/edit/:id', component: AddMaterialDetailComponent},
  {path: 'heat-transfer/samples/add' , component: AddHeattransferSampleComponent},
  {path: 'heat-transfer/samples/edit/:id' , component: HeattransferSampleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeattransferRoutingModule { }
