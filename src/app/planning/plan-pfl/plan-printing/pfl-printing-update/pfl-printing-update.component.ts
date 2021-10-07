import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ApiService } from 'src/app/api.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { SuiModalService } from 'ng2-semantic-ui';
import { ShowDetail } from 'src/app/templates/show-detail/show-detail.component';

@Component({
  selector: 'app-pfl-printing-update',
  templateUrl: './pfl-printing-update.component.html',
  styleUrls: ['./pfl-printing-update.component.css']
})
export class PflPrintingUpdateComponent implements OnInit {
   data: any;
   breakdownDetails: any;
  @Output() added = new EventEmitter<boolean>();
  @Input() id: number;
   editId: any;
   machines: any;
   operatores: any;
   selectedCards: any;
   selectAllCard: any;
   inserted: any;
   currentRoute: string;
   breakdownDetailss: any;
   printingTableData: any;
   machineno: any;
  constructor( public api: ApiService,
    public route: ActivatedRoute,
    public tost: ApiService,
    public router: Router,
    ) {

    this.router.events.subscribe(
        (event: any) => {
          if (event instanceof NavigationEnd) {
            this.currentRoute = this.router.url;
          }
        }
    );
    this.route.params.subscribe(param => {
      if (param.id) {
        this.editId = param.id;
        this.getMachineIdToChangeStatus(param.id);
        this.preview(param.id);
      }
    });
  }
   async getMachineIdToChangeStatus(id: number) {
    await this.api.getdata('ProductionPrintings/getmachine?printid=' + id).subscribe((res: any) => {
      this.breakdownDetailss = res;
      console.log(this.breakdownDetailss);
      setTimeout(() => {
        this.getMachineAndOperator();
      },1000);
    });
  }
  getMachineAndOperator() {
    this.breakdownDetailss.forEach(item => {
      this.api.getdata('ProductionPrintings/getMachineOnEdit?machineid=' + item.MachinID).subscribe((res: any) => {
        item.MachingId = res[0].MachineID;
        console.log(res);
      });
      this.api.getdata('ProductionPrintings/getOperatorOnEdit?operatorid=' + item.OperatorID).subscribe((res: any) => {
        item.OperatorID = res[0].OperatorID;
        console.log(res);
      });
    });
  }
  stopMachine() {
    this.breakdownDetails.forEach(item => {
      item.MachingId = 0;
      item.OperatorID = 0;
    });
  }
  preview(id: number) {
    this.api.getdataByid('ProductionPrintings', id).subscribe((res: any) => {
      console.log(res); this.data = res; });
    setTimeout(() => {
      this.getBreakDownDetails();
    }, 500);
  }
  getBreakDownDetails() {
    this.api.getdata('ProductionPrintings/getBreakDownDetailsByWorkOrder?prijobid=' + this.data.proprintingjobid +
        '&priorderid=' + this.data.proprintingorderid).subscribe((res: any) => {
             res.MachingId = this.breakdownDetailss.MachingId;
                 res.OperatorID = this.breakdownDetailss.OperatorID;
      this.breakdownDetails = res;
      console.log(this.breakdownDetails);
    });
  }
  getData() {
    this.api.getdata('ProductionPrintings/getProductionPrinting').subscribe((res: any) => {
      this.printingTableData = res;
      console.log(this.printingTableData);
      // this.getMachineIdToChangeStatus();
    });
  }
  ngOnInit() {
    this.getMachineName();
    this.getOperator();
  }
  selectAll() {
    this.selectedCards = [];
    if (this.selectAllCard) {
      this.breakdownDetails.forEach(item => {
        item.selected = true;
        this.selectedCards.push(item);
        console.log(this.selectedCards);
      });
    } else {
      this.breakdownDetails.forEach(item => {
        item.selected = false;
      });
      this.selectedCards = [];
    }
  }
  selectCards(item, i) {
    if (item.selected === true) {
      this.selectedCards.push(item);
      console.log(this.selectedCards);
    } else {
      const index = this.selectedCards.indexOf(item);
      if (index !== -1) {
        this.selectedCards.splice(index, 1);
      }
      console.log(this.selectedCards);
      // this.selectedCards = false;
    }
  }
  selectAllMachine() {
    this.selectedCards.forEach(item => {
      item.MachingId = this.selectedCards[0].MachingId;
    });
  }


  selectAllOperator() {
    this.selectedCards.forEach(item => {
      item.OperatorID = this.selectedCards[0].OperatorID;
    });
  }
  updateRecord() {
    const data = {
      'data': { 'record': this.selectedCards,
        'breakdown': this.breakdownDetails,
        'userid': sessionStorage.getItem('empid')
      }};
    console.log(data);
    this.api.patchdata('ProductionPrintings/updatenPrinting' , data).subscribe( (res: any) => {
      this.inserted = res;
      console.log(res);
      this.api.showSuccessToast(' Record added into cutting process successfully');
      this.selectedCards = [];
    });
    this.router.navigateByUrl('planning/pfl-printing');
  }

  getMachineName() {
    this.api.getdata('ProductionPrintings/getMachineName?categoryid=2' + '&mctype=5').subscribe((res: any) => {
      this.machines = res;
    });
  }
  getOperator() {
    this.api.getdata('ProductionPrintings/getOperatorName').subscribe((res: any) => {
      this.operatores = res;
      console.log(this.operatores);
    });
  }
}
