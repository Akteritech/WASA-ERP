import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-costing',
  templateUrl: './costing.component.html',
  styleUrls: ['./costing.component.css']
})
export class CostingComponent implements OnInit {
  totalmasterpriceentries: 0;

  constructor(public api: ApiService, private router: Router) { }

  ngOnInit() {    
    this.getTotalMasterPriceEntryCount();

  }

  getTotalMasterPriceEntryCount() {
  this.api.getdata('ItemPriceBuyerWises/count').subscribe((res: any) => {
    this.totalmasterpriceentries = res.count;

  }, error1 => {
    console.log(error1);
  });
}
}
