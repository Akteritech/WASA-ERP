
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../../../api.service';
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-show-employee-details',
  templateUrl: './show-employee-details.component.html',
  styleUrls: ['./show-employee-details.component.css']
})
export class ShowEmployeeDetailsComponent implements OnInit {
    emp: any;
    @Input() id: number;
    constructor(public api: ApiService , private route: ActivatedRoute) {
    }
    ngOnInit() {
        this.getEmpLoyees(this.id);
    }
    getEmpLoyees(id) {
        const includeUrl = '?filter[include]=nationality1&filter[include]=ReligionDetails&filter[include]=sex2&filter[include]=maritalstatus1&filter[include]=bloodgroup1';
        this.api.getdata('EmployeePersonalInfos/' + id + includeUrl).subscribe(res => {
            this.emp = res;
            console.log(res);
        }, err => {
            console.log(err);
        });
    }
}
