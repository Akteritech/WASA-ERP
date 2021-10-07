import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../../../api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-show-company',
  templateUrl: './show-company.component.html',
  styleUrls: ['./show-company.component.css']
})
export class ShowCompanyComponent implements OnInit {
  comp: any;
  @Input() id: number;
  constructor(public api: ApiService, private route: ActivatedRoute) {

  }
  get(id) {
    this.api.getdata('comp/' + id).subscribe(res => {
      this.comp = res;
      console.log(res);

    }, error => {
      console.log(error);
    });
  }
  ngOnInit() {
    this.get(this.id);
  }

}
