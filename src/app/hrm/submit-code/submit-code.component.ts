import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-submit-code',
  templateUrl: './submit-code.component.html',
  styleUrls: ['./submit-code.component.css']
})
export class SubmitCodeComponent implements OnInit {
  @Output() valid = new EventEmitter();
  @Input() page: string;
  code: string;

  constructor(private api: ApiService) { }

  ngOnInit() {if(sessionStorage.getItem('rollid') == '1') this.valid.emit();}

  checkCode() {    
    this.api.postdata('psn-employees/accessCode', {menu: this.page, code: this.code}).subscribe(
      (res: boolean) => res? this.valid.emit(): this.api.showWarningToast('Access Not Allowed'));
  }

  onKey(keyCode: number) {
    if (keyCode === 13) this.checkCode();
  }
}
