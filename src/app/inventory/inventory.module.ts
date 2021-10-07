import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SuiModule} from 'ng2-semantic-ui';

@NgModule({
  imports: [
    CommonModule,
    InventoryRoutingModule,
    ReactiveFormsModule,
    SuiModule,
    FormsModule,
  ],
  declarations: [
    InventoryComponent,
  ],
  exports: [
  ]
})
export class InventoryModule { }
