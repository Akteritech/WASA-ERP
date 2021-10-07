import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/api.service';
import { SuiModalService } from 'ng2-semantic-ui';

@Component({
  selector: 'app-searchleaveapplication',
  templateUrl: './searchleaveapplication.component.html',
  styleUrls: ['./searchleaveapplication.component.css']
})
export class SearchleaveapplicationComponent implements OnInit {
  currentRoute: any;
  empId: string;
  cardnos: any[];
  name: string;
  leaveYear: number;
  leaverecords: any;
   leaverecord: any;

  constructor(private _location: Location, public api: ApiService, private modalService: SuiModalService) {
    this.leaveYear = new Date().getFullYear();
   }

  ngOnInit() {
    this.getCards();
  }

  getCards(search: string = null) {
    let link = 'psn-employees?filter[limit]=50';
    if(search) link += '&filter[where][EMP_CARD_NO][like]=%' + search + '%';
    this.api.getdata(link).subscribe((res: any[]) => this.cardnos = res);
  }

  cardSelected() {
    this.name = this.cardnos.find((element: any) => element.EMP_ID == this.empId).EMP_NAME_ENG;
  }

  backClicked() {
    this._location.back();
  }

  getLeaveApplicationEnglish(){
    window.open('hrmMaster/leaveapplication/search/leaveAppEnglish/' + encodeURIComponent(this.empId));
  }

  getLeaveApplicationBangla(){
    window.open('hrmMaster/leaveapplication/search/leaveAppBangla/' + encodeURIComponent(this.empId));
  }

  // getLeaveRegister(){
  //   window.open('hrmMaster/leaveapplication/leaveRegister/' + encodeURIComponent(this.empId));
  // }
  leaveRegisterPdf(){
     this.api.getdata('Hrm-Leaveapplications/leaveRegisterPdf?empcardno='+encodeURIComponent(this.empId)+ '&year='+this.leaveYear).subscribe((resp:any)=>{
      this.leaverecords= resp;
      console.log(this.leaverecords);
    })
   setTimeout(() => {
     this.api.pdf('printContent', 'leave register');
   },500)

  }


}
