import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
	selector: 'app-attendance-jobcard',
	templateUrl: './attendance-jobcard.component.html',
	styleUrls: ['./attendance-jobcard.component.css']
})
export class AttendanceJobcardComponent implements OnInit {
	card: string;
	department: string;
	date: string;
	jobcards: any[];
	dateString: string;
	today: Date;
    zone: string;
	thours: number;
	Value:any;
	constructor(route: ActivatedRoute, private api: ApiService) {
		route.queryParamMap.subscribe((param: Params) => {
			this.date = param.params.date;
			const currentDate = new Date(this.date);
			this.dateString = currentDate.toLocaleString('default', {month: 'long'}) + ' ' + currentDate.getFullYear()
			if (param.params.card) this.card = param.params.card;
			if (param.params.department) this.department = param.params.department;
		});
	}

	ngOnInit() {
		 this.thours=0;
		this.zone=sessionStorage.getItem('zoneaccess');
		let link = 'employee-attendences/jobCard?date=' + this.api.formatDate(this.date);
		if (this.card) link += '&card=' + this.card;
		if (this.department) link += '&department=' + encodeURIComponent(this.department);
		if (this.zone) link += '&zone=' + this.zone;
		
		this.api.getdata(link).subscribe((res: any) => {
			//res = res.slice(0, 30);
			const cards = new Set<string>(res.map((e: any) => e.EMP_CARD_NO));
			const data = [];
			cards.forEach((card: string) => {
				let getData = true;
				const currentData = { 
					card, days: [], totalDays: 0,
					total: 0, present: 0, late: 0, absent: 0, sickLeave: 0, casualLeave: 0, weekend: 0, holiday: 0, Totalhour: 0, OT: 0,
					name: null, join: null, department: null, designation: null, company: null
				};

				res.forEach((e: any) => {
					if (e.EMP_CARD_NO != card) return;
					if(currentData.total > 30) return;
					if (getData) {
						currentData.name = e.EMP_NAME_ENG;
						currentData.join = e.JOINING_DATE;
						currentData.department = e.DeptEngNm;
						currentData.designation = e.DesigNmEng;
						currentData.company = e.DIVISION_NAME_ENG;
						getData = false;
					}

					currentData.days.push({ date: e.MonthDate, inTime: e.IN_TIME, outTime: e.OUT_TIME, status: e.Status, shift: e.SHIFT_NAME_ENG, Manual: e.Manual, Totalhour: e.TotalHour, OT: e.OT});
					currentData.total++;
					
					switch(e.Status) {
						case 'P': 
						currentData.present++;
						
						break;
						case 'A': currentData.absent++; break;
						case 'W': currentData.weekend++; break;
						case 'H': currentData.holiday++; break;
						case 'L': 
							currentData.late++;
							currentData.present++; 
						break;
						case 'CL': currentData.casualLeave++; break;
						case 'SL': currentData.sickLeave++; break;
					}
					this.thours+= currentData.Totalhour;
					// this.thours+= currentData.Totalhour;
					// currentData.Totalhour=this.thours;
				});
				
					currentData.OT++;
				data.push(currentData);
			});
			
			this.jobcards = data;
// 			this.Value=data;    
// //   console.log(this.value);  
//   for(let j=0;j<data.length;j++){   
//        this.thours+= data[j].Totalhour;  
//         console.log(this.thours)  
//   }  
			console.log(data);
		});

		this.today = new Date();
	}
}
