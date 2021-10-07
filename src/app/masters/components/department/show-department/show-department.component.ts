import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../../../api.service';
import {ActivatedRoute} from '@angular/router';
import {Department} from '../add-department/add-department.component';

@Component({
  selector: 'app-show-department',
  templateUrl: './show-department.component.html',
  styleUrls: ['./show-department.component.css']
})
export class ShowDepartmentComponent implements OnInit {
  dept: any;
  @Input() id: number;
  constructor(public api: ApiService, private route: ActivatedRoute) {
  }
  get(id) {
    this.api.getdata('dept/' + id).subscribe(res => {
      this.dept = res;
      console.log(res);

    }, error => {
      console.log(error);
    });
  }

  ngOnInit() {
    this.get(this.id);
  }

}
