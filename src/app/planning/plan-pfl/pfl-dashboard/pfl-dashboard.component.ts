import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pfl-dashboard',
  templateUrl: './pfl-dashboard.component.html',
  styleUrls: ['./pfl-dashboard.component.css']
})
export class PflDashboardComponent implements OnInit {
  fromDate: Date;
  toDate: Date;
  workOrdernumber: string;
  constructor() { }

  ngOnInit() {
  }
  searchstatus() {}
  excelstatus() {}
  printstatus() {}
  cuttingstatus() {}
  finishstatus() {}

}
