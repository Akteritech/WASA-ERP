import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../../../api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-show-program',
  templateUrl: './show-program.component.html',
  styleUrls: ['./show-program.component.css']
})
export class ShowProgramComponent implements OnInit {

  program: any;
  @Input() id: number;
   brands: any;
  constructor(public api: ApiService, private route: ActivatedRoute) {
  }
  get(id) {
    this.api.getdata('Programs/' + id + '?filter[include]=brand').subscribe(res => {
      this.program = res;
      console.log(res);

    }, error => {
      console.log(error);
    });
  }
  ngOnInit() {
    this.get(this.id);
  }
  // getBrands() {
  //   this.api.getdata('Brands?filter[where][brandid]=' + this.program.brandid).subscribe(res => {
  //     this.brands = res;
  //   }, err => {
  //     console.log(err);
  //   });
  // }
  // getProgram(id) {
  //   this.api.getdata('Programs/' + id).subscribe(res => {
  //     this.program = res;
  //   }, err => {
  //     console.log(err);
  //   });
  // }
}

