import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-dashboard',
  templateUrl: './orders-dashboard.component.html',
  styleUrls: ['./orders-dashboard.component.css']
})
export class OrdersDashboardComponent implements OnInit {
  viewList: string[];
  addList: string[];

  constructor() { }

  ngOnInit() {
    this.viewList = JSON.parse(sessionStorage.getItem('viewList'));
    this.addList = JSON.parse(sessionStorage.getItem('addList'));
    //this.viewList.includes('Work Order')
  }

}
