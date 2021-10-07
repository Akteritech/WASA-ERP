import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../../../api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-show-designation',
  templateUrl: './show-designation.component.html',
  styleUrls: ['./show-designation.component.css']
})
export class ShowDesignationComponent implements OnInit {
  @Input() id: number;
  designation: any;
  constructor(public api: ApiService, private route: ActivatedRoute) {
  }
  get(id) {
    this.api.getdata('desig/' + id + '?filter[include]=department').subscribe(res => {
      this.designation = res;
      console.log(res);

    }, error => {
      console.log(error);
    });
  }

  ngOnInit() {
    this.get(this.id);
  }

}
