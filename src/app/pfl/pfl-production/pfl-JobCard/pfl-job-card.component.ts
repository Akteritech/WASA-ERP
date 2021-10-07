import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../api.service';
import {ShowDetail} from '../../../templates/show-detail/show-detail.component';
import {SuiModalService} from 'ng2-semantic-ui';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pfl-job-card',
  templateUrl: './pfl-job-card.component.html',
  styleUrls: ['./pfl-job-card.component.css']
})
export class PflJobCardComponent implements OnInit {
  showSearchForm = false;
  fromDate: Date;
  toDate: Date;
  jobCards: any;
  brands: any;
  productcategoryid: any;
  collapse = false;
  goToPage: any;
  fromPage: any;
  upsData: any;
  toPage: any;
  meta: {
    totalItemCount: number,
    totalPageCount: number,
    itemsPerPage: number,
    currentPage: number,
    nextPage: number,
  };
  currentRoute: any;
  searchWorkOrder: string;
  searchJobCard: string;
  searchBrand: number;
  deleter = 'Nilufar  ,ahmed,1600,1608,etu,atik,farzana,keya,jannatul.cs,shanaz.cc,sabrina,noor,porag,shibu,ERP,rezowana,jahanara,sathi,faruque,shimu,nishat,pabel,ruhul,yeasin,rupuyan,kulsum,mofij,arzan,ashraf,palash,sonia.cs,polash,newton'
  deletePermission: boolean;

  constructor(public api: ApiService, public modalService: SuiModalService, private _location: Location, private route: ActivatedRoute, private router: Router) {
    this.meta = {
      totalItemCount: 0,
      totalPageCount: 0,
      itemsPerPage: 10,
      currentPage: 1,
      nextPage: 0,
    };
    this.toDate = new Date();
    this.route.params.subscribe((param: any) => {
      if(param.category) this.productcategoryid = param.category;
    });
  }

  back() {
    this._location.back();
  }

  ngOnInit() {
    if(!this.api.checkPermission('Job Card', 'viewList'))  this.router.navigateByUrl('/home');
    this.deletePermission = this.deleter.split(',').includes(sessionStorage.getItem('username'))
    this.get(false, false);
    this.getBrands('a');
    this.jobCards = [];
  }

  reset() {
    this.searchJobCard = null;
    this.searchBrand = null;
    this.searchWorkOrder = null;
    this.fromDate = null;
    this.toDate = new Date();
    this.meta.currentPage = 1;
    this.get(true, false);
  }

  getBrands(query) {
    this.api.getdata('Brands?filter={"limit":10,"where":{"brandname":{"like":"%25' + query + '%25"}}}').subscribe( (res: any) => this.brands = res);
  }

  goToPageNo() {
    this.jobCards.forEach(item => {
      item.selected = false;
    });
    this.meta.currentPage = this.goToPage;
    this.get(false, false);
  }

  getFilterUrl(): string {
    const start = this.meta.itemsPerPage * (this.meta.currentPage - 1);
    let link = 'JobCardMasters/jobcardtable/?category=' + this.productcategoryid + '&start=' + start + '&size=' + this.meta.itemsPerPage;
    if(this.searchJobCard) link += '&jobcardno=' + this.searchJobCard;
    if(this.searchWorkOrder) link += '&workorderno=' + this.searchWorkOrder;
    if(this.fromDate) link += '&from=' + this.api.formatDate(this.fromDate);
    if(this.toDate) link += '&to=' + this.api.formatDate(this.toDate);
    
    return link;
  }

  get(search: boolean, view: boolean) {
    if (search) {
      this.meta.currentPage = 1;
      this.collapse= true;
    }
    this.api.getdata(this.getFilterUrl()).subscribe((res: any) => {
      this.jobCards = res.data;
      this.meta.totalItemCount = res.size;

      if(view) this.viewDetail(this.jobCards[0].JobCardID);
    });
  }

  viewDetail(id) {
    if(this.productcategoryid == '5') this.modalService.open(new ShowDetail('Offset Job Card Details', 'offsetJobCard', id));
    else if(this.productcategoryid == '4') this.modalService.open(new ShowDetail('Thermal Job Card Details', 'ThermalJobCard', id));
    else this.modalService.open(new ShowDetail('Job Card Details', 'PflJobCard', id));
  }

  delete(id: number) {
    this.api.getdata('JobCardDetails/deleteJob?jobCard=' + id + '&user=' + sessionStorage.getItem('empid'))
    .subscribe((res: any) => {
      if(res) {
        this.api.showSuccessToast('Job Card Deleted');
        this.get(true, false);
      }
    })
  }
}
