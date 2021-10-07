import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-hold',
  templateUrl: './hold.component.html',
  styleUrls: ['./hold.component.css']
})
export class HoldComponent implements OnInit {
  @Output() added = new EventEmitter();
  @Input() holdData: {id: number, status: boolean, workorder: string};
  currentHoldData: {id: number, status: boolean, workorder: string};
  title: string;
  reason: string

  constructor(private api: ApiService) { }

  ngOnInit() {  }

  ngOnChanges() {
    if(!this.holdData) return;
    this.currentHoldData = this.holdData;
    this.title = 'Unhold';
    if(this.currentHoldData.status) this.title = 'Hold';
  }

  update() {
    const data: any = {
      ishold: this.currentHoldData.status, holdby: sessionStorage.getItem('empid'), orderholddate: this.api.formatDate(new Date())
    }

    this.currentHoldData.status? data.HoldReason = this.reason: data.UnHoldReason = this.reason;

    this.api.patchdata('WorkOrderMasters/' + this.currentHoldData.id, data).subscribe((res: any) => {
      if(res) {
        this.api.showSuccessToast('Hold Status Changed');
        this.reason = null;
        this.added.emit(0);
      }
    });
  }
}
