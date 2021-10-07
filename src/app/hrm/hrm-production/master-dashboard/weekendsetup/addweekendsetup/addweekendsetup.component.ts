import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/api.service';
import { Company } from 'src/app/masters/models/company';
import { element } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-addweekendsetup',
  templateUrl: './addweekendsetup.component.html',
  styleUrls: ['./addweekendsetup.component.css']
})
export class AddweekendsetupComponent implements OnInit {
  weekend: any;
  response: any;
  currentRoute: any;
  @Output() added = new EventEmitter<boolean>();
  @Input() id: number;
  companies: any;
  departments: any[];
  groups: any;
  cardnos: any;
  filterEmployeeDetails: any;
  allEmployeeDetails: any[];
  meta: {
    totalItemCount: number,
    totalPageCount: number,
    itemsPerPage: number,
    currentPage: number,
    nextPage: number,
  };
  employerDetails: any;
  checks: boolean[];
  allCheck = false;
  allWeekendData: any[];
  constructor(private _location: Location, public api: ApiService, private route: ActivatedRoute, private router: Router) {

    this.weekend = {}

    this.meta = {
      totalItemCount: 0,
      totalPageCount: 0,
      itemsPerPage: 10,
      currentPage: 1,
      nextPage: 0,
    };

    // this.route.params.subscribe(param => {
    //   if (param.id) {
    //     this.getCompanies(param.id);
    //   }
    // });

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = this.router.url;
      }
    });
  }

  getCompanies(query) {


    if (sessionStorage.getItem('zoneaccess')=='All')
    {
      this.api.getdata('employee-attendences/companies?id=true').subscribe((res: string[]) => this.companies = res);
    }
   else
   {
    this.getUnitSpec();
   }
    // this.api.getdata('comp?filter={"limit":10,"where":{"companyname":{"like":"%25' + query + '%25"}}}').subscribe((res: any) => {
    //   this.companies = res;
    // }, error1 => {
    //   console.log('error1 ', error1);
    // });
  }
  getUnitSpec() {
    // ?card=' + this.cardno
    this.api.getdata('employee-profiles/getUnitSpec?unit=' +sessionStorage.getItem('zoneaccess') ).subscribe((res: any) => {
      this.companies = res;
    }, err => {
      console.log(err);
    },()=> {
      console.log('ád');
    });
    // this.units=sessionStorage.getItem('zoneaccess');
  //  this.hide=true;
  }
  getGroup() {
    this.api.getdata('icg-groups/').subscribe(res => {
      this.groups = res;
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
    this.api.getdata('employee-attendences/departments')
      .subscribe((res: any[]) => {
        this.departments = res;
      });
    this.getCompanies('a');
    this.getGroup();
    this.getCards();
    // this.getEmpDetails();
    this.checks = new Array(this.meta.itemsPerPage).fill(false);

  }

  backClicked() {
    this._location.back();
  }

  getCards(search: string = null) {
    let link = `psn-employees?filter[limit]=50&filter[where][EMP_ACTIVITY]=1&filter[where][EMP_CARD_NO][isnot]=null`;
    if (search) link += `&filter[where][EMP_CARD_NO][like]=%` + search + `%`;
    this.api.getdata(link).subscribe((res: any[]) => {
      this.cardnos = res;
      console.log(this.cardnos);
    });
  }

  pageChange() {
    const start = (this.meta.currentPage - 1) * this.meta.itemsPerPage;
    const end = start + this.meta.itemsPerPage
    this.employerDetails = this.allEmployeeDetails.slice(start, end);
  }

  getEmpDetails() {


    // if(!this.weekend.unit) {
    //   this.api.showWarningToast('Please Select Zone.');
    //   return;
    // }

    let link = `hrm-weekendsetups/getEmpDetails`;
    if (this.weekend.unit) link += `?unit=` + encodeURIComponent(this.weekend.unit);
    if (this.weekend.department) link += `&department=` +  encodeURIComponent(this.weekend.department);
    if (this.weekend.EMP_CARD_NO) link += '&cardno=' + this.weekend.EMP_CARD_NO;
   

    this.api.getdata(link).subscribe((res: any[]) => {
      this.allEmployeeDetails = res;
      this.meta.totalItemCount = this.allEmployeeDetails.length;
      this.employerDetails = this.allEmployeeDetails.slice(0, this.meta.itemsPerPage);
    });
  }

  checkAll() {
    this.checks.fill(this.allCheck);
  }

  patch(form: NgForm) {
    this.allEmployeeDetails.forEach((element: any, index: number) => {
      if (this.checks[index]) {
        const senddata = {
          "empid": element.EMP_ID,
          "cardno": element.EMP_CARD_NO,
          "weekendday": this.weekend.WEEKEND_DAY,
          "CREATE_DATE": new Date(), 
          "createdby": sessionStorage.getItem('username'),
         };
        this.api.postdata('hrm-weekendsetups/updateWeekendsetup', senddata).subscribe((res: any) => {
          this.response = res;
          console.log(this.response);
          this.added.emit(true);
          this.api.showSuccessToast('Success', this.response.message);
          form.resetForm();
        });
      }
    });
  }

  reset() {
    this.meta.currentPage = 1
    this.weekend = [];
    // this.getEmpDetails();
    this.allWeekendData = [];
  }

  get() {
    let link = `hrm-weekendsetups/getEmpDetailsWeekend`;
    if (this.weekend.department) link += `?department=` + this.weekend.department.replace('#', '|');
    if (this.weekend.EMP_CARD_NO) link += '?cardno=' + this.weekend.EMP_CARD_NO;
    // if (this.weekend.unit) link += '?cardno=' + this.weekend.unit;
    this.api.getdata(link).subscribe((res: any) => {
      this.allWeekendData = res;
      this.meta.totalItemCount = res.length;
    });
  }


}
