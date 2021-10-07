import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../../api.service';

export class SalaryComponent {
  name: any;
  abbreviation: any;
  type: any;
  desc: any;
}
@Component({
  selector: 'app-salary-component',
  templateUrl: './salary-component.component.html',
  styleUrls: ['./salary-component.component.css']
})
export class SalaryComponentComponent implements OnInit {
  salComp: any;
  collapse: any;
  constructor(public api: ApiService) {
    this.salComp = new SalaryComponent();
  }

  ngOnInit() {
  }

  get() {

  }

  patch() {

  }
}
