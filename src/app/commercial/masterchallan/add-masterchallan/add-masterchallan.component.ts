import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ApiService } from 'src/app/api.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-add-masterchallan',
  templateUrl: './add-masterchallan.component.html',
  styleUrls: ['./add-masterchallan.component.css']
})
export class AddMasterchallanComponent implements OnInit {
  clients: any;
  CustomerID: any;
  pino: any;
  gridData: any;
  @Output() added = new EventEmitter<boolean>();
  @Input() id: number;
  checkall: any;
  selectAllWO: boolean;
  masterChallan: Object;
  createdby: string;
  createddate: string;
  selectedData: any[];
   griddata1: any[];
   jobsToPlan: any[];

  constructor(private api: ApiService) {
    this.masterChallan = {};
    this.pino = 0;
    this.CustomerID = 0;
  }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers(search: string = null) {
    let link = 'customers?filter[limit]=40';
    if (search) link += '&filter[where][clientname][like]=%' + search + '%';
    return this.api.getdata(link).subscribe((res: any[]) => {
      this.clients = res;
      console.log(this.clients);
    });
  }

  getGridData() {
    this.api.getdata('master-challans/getPiForCreateChallanMaster?pino=' + this.pino +
        '&clientid=' + this.CustomerID).subscribe((resp: any) => {
      this.gridData = resp;
      console.log(resp);
    });
  }
  selectAll() {
    if (this.selectAllWO) {
      this.gridData.forEach(item => {item.selected = true; console.log(this.gridData); });
    } else {this.gridData.forEach(item => {item.selected = false; }); }
  }
  save(form: NgForm) {
    this.jobsToPlan = [];
    this.gridData.forEach(item => {
      if (item.selected) {
        this.jobsToPlan.push(item); console.log(this.jobsToPlan); }});
    this.createdby = sessionStorage.getItem('empid');
    this.createddate = new Date().toJSON();
    const data = {
      'data': {
        'griddata': this.jobsToPlan,
        'createdby': this.createdby,
        'createddate': this.createddate,
      }
    };
    console.log(data);
    this.api.patchdata('master-challans/addChallan', data).subscribe((res: any) => {
      console.log(res);
      this.api.showSuccessToast(' Master Challan Created', '');
      this.added.emit(true);
      form.resetForm();
    }, err => {
      this.api.showFailureToast('Error', err.message);
      console.log(err);
    });
  }


}
