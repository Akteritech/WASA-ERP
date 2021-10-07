import { ScreenPrintTechnicalDetailsComponent } from './screenPrint-production/screenPrint-technical-details/screenPrint-technical-details.component';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ScreenPrintSampleComponent} from './screenPrint-production/screen-print-sample/screen-print-sample.component';
import {AddScreenPrintSampleComponent} from './screenPrint-production/screen-print-sample/add-screen-print-sample/add-screen-print-sample.component';
import {AddScreenPrintTechnicalDetailsComponent} from './screenPrint-production/screenPrint-technical-details/add-screen-print-technical-details/add-screen-print-technical-details.component';
const routes: Routes = [
  {path: 'samples' , component: ScreenPrintSampleComponent},
  {path: 'screen-print-technical-details' , component: ScreenPrintTechnicalDetailsComponent},
  {path: 'screen-print-technical-details/edit/:id' , component: AddScreenPrintTechnicalDetailsComponent},
  {path: 'samples/add' , component: AddScreenPrintSampleComponent},
  {path: 'samples/edit/:id' , component: ScreenPrintSampleComponent},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]

})
export class ScreenPrintRoutingModule { }
