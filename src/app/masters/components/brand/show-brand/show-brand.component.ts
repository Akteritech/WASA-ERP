import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../../../api.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-show-brand',
  templateUrl: './show-brand.component.html',
  styleUrls: ['./show-brand.component.css']
})
export class ShowBrandComponent implements OnInit {
  brand: any;
  @Input() id: number;
  constructor(public api: ApiService, private route: ActivatedRoute) {
  }
  get(id) {
    this.api.getdata('Brands/' + id).subscribe(res => {
      this.brand = res;
      console.log(res);

    }, error => {
      console.log(error);
    });
  }
  ngOnInit() {
    this.get(this.id);
  }

}
