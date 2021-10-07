import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  totalItem:0;
  totalItemGroup:0;
  totalItemMaterial:0;
  totalItemAdjustment:0;

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.getItemCount();
    this.getItemGroupCount();
    this.getItemMaterialCount();
    this.getItemAdjustmentCount();

  }

  getItemCount() {
    this.api.getdata('ItemMasters/count').subscribe((res: any) => {
      this.totalItem = res.count;
      console.log(this.totalItem);
    }, error1 => {
      console.log(error1);
    });
  }

  getItemGroupCount() {
    this.api.getdata('ItemGroups/count').subscribe((res: any) => {
      this.totalItemGroup = res.count;
    }, error1 => {
      console.log(error1);
    });
  }

  getItemMaterialCount() {
    this.api.getdata('inventory-materials/count').subscribe((res: any) => {
      this.totalItemMaterial = res.count;
    }, error1 => {
      console.log(error1);
    });
  }

  getItemAdjustmentCount() {
    this.api.getdata('StockAdjustments/count').subscribe((res: any) => {
      this.totalItemAdjustment = res.count;
    }, error1 => {
      console.log(error1);
    });
  }
  

}
