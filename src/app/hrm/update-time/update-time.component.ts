import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-update-time',
  templateUrl: './update-time.component.html',
  styleUrls: ['./update-time.component.css']
})
export class UpdateTimeComponent implements OnInit {
  @Input() id: any;
  // id = {year: 2020, month: '08', card: '01641'}
  data: any[];
  submitDateString: string;
  submitData: {
    updater: string, date: string, addNew: boolean, 
    employee: {CadrNo: string, ShiftID: string, InTime: string, OutTime: string, AttendStatus: string}
  }

  constructor(private api: ApiService) { }

  ngOnInit() {
    const date = this.id.year + '-' + this.id.month + '-01';
    this.submitDateString = this.id.year + '-' + this.id.month;
    this.api.getdata('employee-attendences/jobCard?date=' + date + '&card=' + this.id.card).subscribe((res: any[]) => {
      this.submitData = {
        updater: sessionStorage.getItem('username'), date: null, addNew: true,
        employee: {CadrNo: res[0].EMP_CARD_NO, ShiftID: null, InTime: null, OutTime: null, AttendStatus: null}
      }
      this.data = res.map((e: any) => {
        e.IN_TIME = this.processTime(e.IN_TIME);
        e.OUT_TIME = this.processTime(e.OUT_TIME);
        return e;
      });
    });
  }

  processTime(time: string): string {
    const length = time.length;
    const ampm = time.substring(length - 2, length);
    if(ampm != 'AM' && ampm != 'PM') return time;
    
    const colon = time.indexOf(':');
    let hour = Number.parseInt(time.substring(0, colon));
    const minute = time.substring(colon + 1, colon + 3);
    if(ampm == 'PM') hour += 12;
    let hourString: string;
    hour < 10? hourString = '0' + hour: hourString = '' + hour;

    return hourString + ':' + minute;
  }

  submit(index: number) {
    let day: string;
    index < 9? day = '-0' + (index + 1): day = '-' + (index + 1);
    this.submitData.date = this.submitDateString + day;
    this.submitData.employee.ShiftID = this.data[index].SHIFT_ID;
    this.submitData.employee.InTime = this.data[index].IN_TIME;
    this.submitData.employee.OutTime = this.data[index].OUT_TIME;
    this.submitData.employee.AttendStatus = this.data[index].Status;

    this.api.patchdata('employee-attendences/updateAttendance', this.submitData).subscribe(res => {
      if(res) this.api.showSuccessToast('Attendance Updated');
    });
  }
}
