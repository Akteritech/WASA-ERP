import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../../../api.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {SuiModalService} from "ng2-semantic-ui";

@Component({
  selector: 'app-pfl-printing-machine',
  templateUrl: './pfl-printing-machine.component.html',
  styleUrls: ['./pfl-printing-machine.component.css']
})
export class PflPrintingMachineComponent implements OnInit {
  breakdownDetails: any;
   machines: any;
   selectedCards: any[];
   selectAllCard: any;
   inserted: any;
   operatores: any;
   data: any;
  @Input() id: number;
   currentRoute: string;
   editId: any;

  constructor( public api: ApiService,
               public route: ActivatedRoute,
               public tost: ApiService,
               public router: Router,
               public modalService: SuiModalService,) {

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
        this.preview(param.id);
      }
    });
  }

  ngOnInit() {
    this.selectedCards = [];
    this.getOperator();
  this.getMachineName();
  this.preview(this.editId)}
  getMachineName() {
    this.api.getdata('ProductionPrintings/getMachineName?categoryid=2' + '&mctype=5').subscribe((res: any) => {
      this.machines = res;
    });
  }
  machineAutoSelect() {
    this.selectedCards.forEach((item , index) => {
      item.MachingId = item[index].MachingId;
      console.log(item.MachingId);
    });
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
  completeData() {
    const data = {
      'data': {
        'breakdown': this.selectedCards,
        'userid': sessionStorage.getItem('userid')
      }};
    console.log(data);
    this.api.patchdata('ProductionPrintings/confirmInPrinting' , data).subscribe( (res: any) => {
      this.inserted = res;
      console.log(res);
      this.api.showSuccessToast('machine started');
      this.selectedCards = [];
      this.router.navigateByUrl('/planning/pfl-printing');
    });
  }
  getOperator() {
    this.api.getdata('ProductionPrintings/getOperatorName').subscribe((res: any) => {
      this.operatores = res;
      console.log(this.operatores);
    });
  }
  preview(id: number) {
    this.api.getdataByid('ProductionPrintings', id).subscribe((res: any) => {
   console.log(res); this.data = res; });
     setTimeout(() => {
       this.getBreakDownDetails();
     }, 500);
     // $('.woven').modal('setting', 'closable', false, {blurring: true}).modal({centered: false,  onDeny    : function() {
     //     return false;
     //   }}).modal('toggle');
 }
 getBreakDownDetails() {
  this.api.getdata('ProductionPrintings/getBreakDownDetailsByWorkOrder?prijobid=' + this.data.proprintingjobid +
      '&priorderid=' + this.data.proprintingorderid).subscribe((res: any) => {
    this.breakdownDetails = res;
    console.log(this.breakdownDetails);
  });
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
}
