import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payroll-dashboard',
  templateUrl: './payroll-dashboard.component.html',
  styleUrls: ['./payroll-dashboard.component.css']
})
export class PayrollDashboardComponent implements OnInit {
  visible: boolean;
  code: string;

  constructor() { 
    this.visible = false;
  }

  ngOnInit() { }

}
