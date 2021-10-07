import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-worker-payslip',
  templateUrl: './worker-payslip.component.html',
  styleUrls: ['./worker-payslip.component.css']
})
export class WorkerPayslipComponent implements OnInit {
  date: string;
  dateString: string;
  workerPayslipDetails: any;

  constructor(route: ActivatedRoute,private api: ApiService) { 
    route.queryParamMap.subscribe((param: Params) => {
			this.date = param.params.date;
			const currentDate = new Date(this.date);
			this.dateString = currentDate.toLocaleString('default', {month: 'long'}) + ' ' + currentDate.getFullYear()
			// if (param.params.card) this.card = param.params.card;
			// if (param.params.department) this.department = param.params.department;
		});
  }

  ngOnInit() {
    let link = 'employee-payrolls/getWorkerPayslip?date=' + this.api.formatDate(this.date);
		
		this.api.getdata(link).subscribe((res: any) => {
      this.workerPayslipDetails = res;
      console.log(this.workerPayslipDetails);
    })
  }

}
