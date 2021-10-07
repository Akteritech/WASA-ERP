import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SampleForAllCategoryComponent} from './sample-for-all-category.component';
const routes: Routes = [
  {path: '' , redirectTo: '', pathMatch: 'full'},
  { path: 'sampleforall', component: SampleForAllCategoryComponent , data: {preload: true}},
  {path: 'Sample/edit/:id' , component: SampleForAllCategoryComponent},
];
@NgModule({
  declarations: [],
  imports: [
     RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class SampleForAllRoutingModule { }
