import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-master-dashboard',
  templateUrl: './master-dashboard.component.html',
  styleUrls: ['./master-dashboard.component.css']
})
export class MasterDashboardComponent implements OnInit {
  visible: boolean;

  constructor() {this.visible = false }

  ngOnInit() {
  }

}
