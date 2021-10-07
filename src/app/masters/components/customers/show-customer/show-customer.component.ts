import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../../../api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-show-customer',
  templateUrl: './show-customer.component.html',
  styleUrls: ['./show-customer.component.css']
})
export class ShowCustomerComponent implements OnInit {
  cust: any;
  @Input() id: number;
  constructor(public api: ApiService, private route: ActivatedRoute) {
  }
  get(id) {
    this.api.getdata('Customers/' + id).subscribe(res => {
      this.cust = res;
      console.log(res);

    }, error => {
      console.log(error);
    });
  }

  ngOnInit() {
    this.get(this.id);
  }

}
