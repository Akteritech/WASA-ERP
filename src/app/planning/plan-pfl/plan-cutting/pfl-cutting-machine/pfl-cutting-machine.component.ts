import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../../api.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {SuiModalService} from "ng2-semantic-ui";

@Component({
  selector: 'app-pfl-cutting-machine',
  templateUrl: './pfl-cutting-machine.component.html',
  styleUrls: ['./pfl-cutting-machine.component.css']
})
export class PflCuttingMachineComponent implements OnInit {
   selectedCards: any[];
   currentRoute: string;
   editId: any;
   selectAllCard: any;
   breakdownDetails: any;
   machines: any;
  operatores: any;

  constructor( public api: ApiService,
               public route: ActivatedRoute,
               public tost: ApiService,
               public router: Router,
               public modalService: SuiModalService) {
    this.route.params.subscribe(param => {
      if (param.id) {
        this.editId = param.id;
      }
    });
    this.router.events.subscribe(
        (event: any) => {
          if (event instanceof NavigationEnd) {
            this.currentRoute = this.router.url;
          }
        }
    );
  }

  ngOnInit() {
    this.selectedCards = [];
    this.preview(this.editId)
    this.getMachineName();
    this.getOperator();
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
    this.api.patchdata('ProductionCuttings/confirmInCutting' , data).subscribe( (res: any) => {
      console.log(res);
      this.api.showSuccessToast(' machine started');
      this.selectedCards = [];
      this.router.navigateByUrl('/planning/pfl-cutting');

    });
  }
  getMachineName() {
    this.api.getdata('ProductionPrintings/getMachineName?categoryid=2' + '&mctype=6').subscribe((res: any) => {
      this.machines = res;
    });
  }
  getOperator() {
    this.api.getdata('ProductionPrintings/getOperatorName').subscribe((res: any) => {
      this.operatores = res;
      console.log(this.operatores);
    });
  }
  getBreakDownDetails(id: number) {
    this.api.getdata('ProductionCuttings/getDetailsByMasterID?masterid=' + id).subscribe((res: any) => {
      this.breakdownDetails = res;
      console.log(this.breakdownDetails);
    });
  }
  getMachineIdToChangeStatus() {
    this.breakdownDetails.forEach(item => {
      this.api.getdata('ProductionCuttings/getmachine?cuttingid=' + item.Cat_Id).subscribe((res: any) => {
        item.machinestatus = res;
        if (!item.machinestatus.length) {
          item.hides =true;
          // document.getElementById('machine').style.display = 'none';
          // document.getElementById('machine1').style.display = 'none';
        }
        // console.log(this.machinestatus);
      });
    });
  }
  preview(id: number) {
    this.getBreakDownDetails(id);
    // setTimeout(()=>{
    //   $('.woven').modal('setting', 'closable', false).modal({centered: false,  onDeny    : function() {
    //       return false;
    //     }}).modal('toggle');
    // },500);
  }
}
