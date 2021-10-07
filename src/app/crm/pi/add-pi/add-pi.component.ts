import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Observable } from 'rxjs';
import { element } from 'protractor';

@Component({
  selector: 'app-add-pi',
  templateUrl: './add-pi.component.html',
  styleUrls: ['./add-pi.component.css']
})
export class AddPiComponent implements OnInit {
  companies: any[];
  clients: any[];
  deliveryClients: any[];
  salesPeople: any[];
  carriers: any[];
  loadingPorts: any[];
  selectedWorkOrder: any[];
  units: any[];
  terms: any[];
  master: any;
  detail: any[];
  today: Date;
  deliveryAddress: string;
  @Output() added = new EventEmitter();
  @Input() id: number;
  editId: number;
  removeIds: number[];
  customerService: string;
  customer: string;
  checks: boolean[];
  

  constructor(private api: ApiService) {
    this.today = new Date();
    this.master = {CreatedDate: this.today, CreatedBy: sessionStorage.getItem('empid'), PIDate: this.today};
    this.selectedWorkOrder = [];
    this.removeIds = [];
  }

  ngOnInit() {
    this.getClients();
    this.getSalesPeople();
    this.getDeliveryClients();
    this.api.getdata('lovData?filter[where][lovtype]=Carrier').subscribe((res: any[]) => this.carriers = res);
    this.api.getdata('lovData?filter[where][lovtype]=MeasurableUnit').subscribe((res: any[]) => this.units = res);
    this.api.getdata('lovData?filter[where][lovtype]=PortOfLoading').subscribe((res: any[]) => this.loadingPorts = res);
    this.api.getdata('comp').subscribe( (res: any[]) => this.companies = res);
    this.api.getdata('BuyerWisePIMasters/terms').subscribe( (res: any[]) => this.terms = res);
  }

  ngOnChanges() {
    if(!this.id) return;
    this.editId = this.id;
    this.api.getdata('BuyerWisePIMasters/editDetails?piid=' + this.editId).subscribe((res: any[]) => {
      this.deliveryClients.push({clientname:res[0].delivery, clientid: res[0].CustomerDeliveryID});
      this.master = res[0];
      this.selectedWorkOrder = res;
      this.customerService = res[0].SalesPeron;
      this.customer = res[0].ClientName;
      this.getDeliveryAddress();
      this.getWorkOrders();
      this.calculate();
    });
  }

  getClients(name: string = null) {
    this.getCustomers(name).subscribe((res: any[]) => this.clients = res);
  }

  getDeliveryClients(name: string = null) {
    this.getCustomers(name).subscribe((res: any[]) => this.deliveryClients = res);
  }

//http://localhost:3000/api/customers?filter[limit]=10&filter[where][clientname]=Cosmopolitan%20Industries%20Pvt%20Ltd
  getCustomers(name: string): Observable<any> {
    let link = 'customers?filter[limit]=40';
    if(name) link += '&filter[where][clientname][like]=%' + name + '%';
    return this.api.getdata(link);
  }

//SalesPersonLists?filter[where][SalesPeron][like]=%a%&filter[limit]=10
  getSalesPeople(name: string = null) {
    let link = 'SalesPersonLists?filter[limit]=40'
    if(name) link += '&filter[where][SalesPeron][like]=%' + name + '%';
    this.api.getdata(link).subscribe((res: any[]) => this.salesPeople = res);
  }

  clientSelected() {
    this.deliveryClients.push(this.clients.find((element: any) => this.master.CustomerID === element.clientid));
    this.master.CustomerDeliveryID = this.master.CustomerID;
    this.getDeliveryAddress();
    this.getWorkOrders();
  }

  getDeliveryAddress() {
    this.deliveryAddress = this.deliveryClients.find((element: any) => element.clientid === this.master.CustomerDeliveryID).currentaddress;
  }

  getWorkOrders() {
    if(!this.master.CustomerID || !this.master.CompanyID || !this.master.SalesPersonID) return;
    const link = 'BuyerWisePIMasters/getWorkorders/?company=' + this.master.CompanyID + '&customer=' + this.master.CustomerID + '&salesPerson=' + this.master.SalesPersonID;
    this.api.getdata(link).subscribe((res: any[]) => {
      this.detail = res;
      this.initChecks();
    });
  }

  add() {
    const length = this.detail.length;
    const removeIndex: number[] = [];
    
    for(let i = 0; i < length; i++){
      if(!this.checks[i]) continue;
      if(this.detail[i].ID) {
        const removeIndex = this.removeIds.indexOf(this.detail[i].ID);
        if(removeIndex != -1) this.removeIds.splice(removeIndex, 1);
      }
      this.selectedWorkOrder.push(this.detail[i]);
      removeIndex.push(i);
    }

    this.detail = this.detail.filter((element: any, index: number) => !removeIndex.includes(index));
    this.initChecks();
    this.calculate();
  }

  remove(index) {
    if(this.selectedWorkOrder[index].ID) this.removeIds.push(this.selectedWorkOrder[index].ID);
    this.detail.push(this.selectedWorkOrder[index]);
    this.selectedWorkOrder.splice(index, 1);
    this.calculate();
    this.initChecks();
  }

  initChecks() {
    this.checks = new Array(this.detail.length).fill(true);
  }

  calculate() {
    let qty = 0, amount = 0;
    this.selectedWorkOrder.forEach((element: any, index: number) => {
      qty += element.Qty;
      amount += element.amount;
    });

    this.master.PIQty = qty;
    this.master.PIValue = amount;
  }

  createPiNo(): Promise<string> {
    const year: number = this.today.getFullYear();
    const link = 'BuyerWisePIMasters?filter[where][PINo][like]=%/' + year + '%&filter[limit]=1&filter[order]=PIID%20desc';

    return new Promise((resolve, reject) => {
      this.api.getdata(link).subscribe((res: any[]) => {
        let serialString: string;
  
        if(res.length === 0) {
          serialString = '1'
        }
        else {
          const latestSerial: number = Number.parseInt(res[0].PINo.substring(3, 9));
          serialString = '' + (latestSerial + 1);
        }
  
        const length = 6 - serialString.length;
        for(let i = 0; i < length; i++) {
          serialString = '0' + serialString;
        }

        resolve('PI-' + serialString + '/' + year);
      });
    });
  }

  reset() {
    this.master = {CreatedDate: this.today, CreatedBy: sessionStorage.getItem('empid'), PIDate: this.today};
    this.detail = null;
    this.editId = null;
    this.selectedWorkOrder = [];
    this.removeIds = [];
  }

  validate(): boolean {
    if(this.selectedWorkOrder.length == 0) {
      this.api.showWarningToast('Select at least one work order');
      return false;
    }

    if(!this.master.Carrier) {
      this.api.showWarningToast('Select a Carrier');
      return false;
    }

    if(!this.master.TnAID) {
      this.api.showWarningToast('Select Terms and Condition');
      return false;
    }

    return true;
  }

  save() {
    if(!this.validate()) return;
    const length = this.selectedWorkOrder.length;

    this.createPiNo().then((value: string) => {
      this.master.PINo = value;
      this.api.postdata('BuyerWisePIMasters', this.master).subscribe((res: any) => {
        this.selectedWorkOrder.forEach((element: any, index: number) => {
          element.PIID = res.PIID;
          this.api.postdata('BuyerwisePIDetails', element).subscribe((res2: any) => {
            if(res2 && length == index + 1) {
              this.submitted(res.PINo + ' Submitted');
            }
          });
        });
      });
    });
  }

  update() {
    if(!this.validate()) return;
    this.api.patchdata('BuyerWisePIMasters/' + this.editId, this.master).subscribe((res: any) => {
      this.removeIds.forEach((id: number) => {
        this.api.deletedata('BuyerwisePIDetails', id).subscribe(res => {
          console.log(res);
        });
      });
      
      this.selectedWorkOrder.forEach((element: any, index: number) => {
        if(!element.ID) {
          element.PIID = this.editId;
          this.api.postdata('BuyerwisePIDetails', element).subscribe((res2: any) => {
            console.log(res2);
          });
        }
        if(this.selectedWorkOrder.length - 1 == index) this.submitted('PI Edited');
      });
    });
  }

  submitted(message: string) {
    this.api.showSuccessToast(message);
    this.reset();
    this.added.emit();
  }
}
