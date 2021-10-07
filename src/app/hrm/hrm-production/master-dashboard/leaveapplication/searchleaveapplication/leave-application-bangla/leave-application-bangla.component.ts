import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { LeaveData } from '../../leave-data';

@Component({
  selector: 'app-leave-application-bangla',
  templateUrl: './leave-application-bangla.component.html',
  styleUrls: ['./leave-application-bangla.component.css']
})
export class LeaveApplicationBanglaComponent implements OnInit {
  empId: string;
  leaveData: any;
  today: string;

  constructor(private route: ActivatedRoute, private api: ApiService) { 
    this.today = this.api.formatDate(new Date());
  }

  ngOnInit() {
    let leaveData: LeaveData = new LeaveData();
    this.route.params.subscribe((param: any) => {
      this.empId = param.id;
      leaveData.getLeaveDays(this.empId, this.api).then((value: any) => this.leaveData = value);
    });
  }

}
