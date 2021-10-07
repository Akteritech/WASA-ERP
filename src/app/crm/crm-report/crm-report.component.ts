import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-crm-report',
  templateUrl: './crm-report.component.html',
  styleUrls: ['./crm-report.component.css']
})
export class CrmReportComponent implements OnInit {

  constructor(public api: ApiService) { }

  ngOnInit() {
  }

}
