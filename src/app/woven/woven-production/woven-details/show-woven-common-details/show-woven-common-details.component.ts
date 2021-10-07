import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../../api.service';

@Component({
  selector: 'app-show-woven-common-details',
  templateUrl: './show-woven-common-details.component.html',
  styleUrls: ['./show-woven-common-details.component.css']
})
export class ShowWovenCommonDetailsComponent implements OnInit {
  wovenDetails: any;
  constructor(public api: ApiService) { }
getDetails() {
    this.api.getdata('WovenCommonDetails').subscribe(res => {
      this.wovenDetails = res;
    }, error1 => {
      console.log(error1);
    });
}

  ngOnInit() {
    this.getDetails();
  }

}
