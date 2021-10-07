import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-edit-salary',
  templateUrl: './edit-salary.component.html',
  styleUrls: ['./edit-salary.component.css']
})
export class EditSalaryComponent implements OnInit {
  @Input() id: any;
  // id = {card: 1641, date: '2020-06-11'}
  data: any;

  constructor(private api: ApiService) { }

  ngOnInit() {
    const data = 'employee-payrolls/getSalaryStatementManual?PayrollDate=' + this.id.date + '&EMP_CARD_NO=' + this.id.card;
    this.api.getdata(data).subscribe((res: any[]) => {
      this.data = res[0];
    })
  }

  update() {
    this.api.postdata('employee-payrolls/updateSalary', {data: this.data, card: this.id.card, date: this.id.date}).subscribe(res => {
      if(res) this.api.showSuccessToast('Salary Updated');
    })
  }

}
