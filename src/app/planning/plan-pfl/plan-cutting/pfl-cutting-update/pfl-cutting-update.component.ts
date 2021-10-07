import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../../api.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-pfl-cutting-update',
  templateUrl: './pfl-cutting-update.component.html',
  styleUrls: ['./pfl-cutting-update.component.css']
})
export class PflCuttingUpdateComponent implements OnInit {
    machines: any;
  breakdownDetails: any;
  selectAllCard: any;
   editId: any;
   operatores: any;
   selectedCards: any[];
   inserted: any;
  data: any;
   breakdownDetailss: any;

  constructor(
      public api: ApiService,
      public route: ActivatedRoute,
      public tost: ApiService,
      public router: Router,
  ) {
    this.route.params.subscribe(param => {
      if (param.id) {
        this.editId = param.id;
        this.getMachineIdToChangeStatus(param.id);
        this.getBreakDownDetails(param.id);
      }
    });
  }
  getMachineIdToChangeStatus(id: number) {
    // this.printingTableData.forEach(item => {
      this.api.getdata('ProductionPrintings/getmachine?printid=' + id).subscribe((res: any) => {
        this.breakdownDetailss = res;
        console.log(this.breakdownDetailss);
      });
    // });
  }
  getBreakDownDetails(id: number) {
    this.api.getdata('ProductionCuttings/getDetailsByMasterID?masterid=' + id).subscribe((res: any) => {
      this.breakdownDetails = res;
      console.log(this.breakdownDetails);
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
  // preview(id: number) {
  //   this.api.getdataByid('ProductionPrintings', id).subscribe((res: any) => {
  //     console.log(res); this.data = res; });
  //   setTimeout(() => {
  //     this.getBreakDownDetails(id);
  //   }, 500);
  // }
  updateRecord() {
    const data = {
      'data': {
        'breakdown': this.selectedCards,
        'userid': sessionStorage.getItem('userid')
      }};
    console.log(data);
    this.api.patchdata('ProductionCuttings/updateCutting' , data).subscribe( (res: any) => {
      this.inserted = res;
      console.log(res);
      this.api.showSuccessToast(' Record added into curring process successfully');
      this.selectedCards = [];
    });
    this.router.navigateByUrl('planning/pfl-cutting');
  }

  getMachineName() {
    this.api.getdata('ProductionPrintings/getMachineName?categoryid=2' + '&mctype=6').subscribe((res: any) => {
      this.machines = res;
    });
  }
  getOperator() {
    this.api.getdata('ProductionCuttings/getOperatorName').subscribe((res: any) => {
      this.operatores = res;
      console.log(this.operatores);
    });
  }
  ngOnInit() {
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
  selectAllComment(){
    this.selectedCards.forEach(item => {
      item.comment = this.selectedCards[0].comment;
    });
  }
}
