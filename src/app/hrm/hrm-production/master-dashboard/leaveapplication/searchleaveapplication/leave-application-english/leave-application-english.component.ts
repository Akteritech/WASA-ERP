import { Component, OnInit, Input } from '@angular/core';
import * as html2pdf from 'html2pdf.js';
import { ActivatedRoute } from '@angular/router';
import { LeaveData } from '../../leave-data';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-leave-application-english',
  templateUrl: './leave-application-english.component.html',
  styleUrls: ['./leave-application-english.component.css']
})
export class LeaveApplicationEnglishComponent implements OnInit {
  empId: string;
  leaveData: any;
  @Input() id: string;
  today: string;

  constructor(private route: ActivatedRoute, private api: ApiService) { 
    this.today = this.api.formatDate(new Date());
   }

  ngOnInit() {
    let leaveData: LeaveData = new LeaveData();
    
    if(this.id) {
      this.empId = this.id;
      leaveData.getLeaveDays(this.empId, this.api).then((value: any) => this.leaveData = value);
    }
    
    this.route.params.subscribe((param: any) => {
      if(!param.id) return;
      this.empId = param.id;
      leaveData.getLeaveDays(this.empId, this.api).then((value: any) => this.leaveData = value);
    });
  }

  pdf() {
    const element = document.getElementById('printContent');
    let margin = 15;
    let format = 'a4';
    let orientation = 'portrait';
    const opt = {
      margin: margin,
      filename: 'leaveapplicationenglish.pdf',
      image: { type: 'jpeg', quality: 0.95 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: format, orientation: orientation }
    };
    html2pdf().from(element).set(opt).save();
  }

}
