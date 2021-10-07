import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plan-challan',
  templateUrl: './plan-challan.component.html',
  styleUrls: ['./plan-challan.component.css']
})
export class PlanChallanComponent implements OnInit {
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
