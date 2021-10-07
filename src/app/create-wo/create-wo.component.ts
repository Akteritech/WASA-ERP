import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {NavigationEnd, Router} from '@angular/router';
import {Location} from '@angular/common';
import {SuiModalService} from 'ng2-semantic-ui';
import {ConfirmModal} from '../templates/confirm-modal/confirm-modal.component';
import {ShowDetail} from '../templates/show-detail/show-detail.component';
import { EditDetail } from '../templates/edit-detail/edit-detail.component';
declare var $: any;

@Component({
  selector: 'app-create-wo',
  templateUrl: './create-wo.component.html',
  styleUrls: ['./create-wo.component.css']
})
export class CreateWOComponent implements OnInit {
  showSearchForm = true;
  sampleproduct: any;
  orders: any;
  clients: any;
  brandName: any;
  salesPersons: any;
  selectedOrders: any;
  work: any;
  selectAllOrders: any;
  response: any;
  currentRoute: any;
  goToPage: any;
  fromPage: any;
  toPage: any;
  fromDate: Date;
  toDate: Date;
  workOrderSearch: string;
  ecomSearch: string;
  ponoSearch: string;
  editPermission: boolean;
  meta: {
    totalItemCount: number,
    totalPageCount: number,
    itemsPerPage: number,
    currentPage: number,
    nextPage: number,
  };
  collapse = true;
  holdCollapse = true;
  holdData: {id: number, status: boolean, workorder: string};
  customers: any;
  samples: any;
  addList: string[];

  constructor(public api: ApiService, private router: Router, public modalService: SuiModalService,  private _location: Location) {
    this.meta = {
      totalItemCount: 0,
      totalPageCount: 0,
      itemsPerPage: 10,
      currentPage: 1,
      nextPage: 0,
    };
    this.toDate = new Date();
    this.fromDate = new Date();
    this.router.events.subscribe(
        (event: any) => {
          if (event instanceof NavigationEnd) {
            this.currentRoute = this.router.url;
          }
        }
    );
  }

  back() {
    this._location.back();
  }

  serchForm() {
    this.showSearchForm = false
  }

  backClicked() {
    this._location.back();
  }
  
  selectOrders(item, i) {
    if (item.selected) {
      this.selectedOrders.push(item);
    } else {
      this.selectedOrders.splice(i, 1);
      this.selectAllOrders = false;
    }

  }

  selectAll() {
    this.selectedOrders = [];
    if (this.selectAllOrders) {
      this.orders.forEach(item => {
        item.selected = true;
        this.selectedOrders.push(item);
      });
    } else {
      this.orders.forEach(item => {
        item.selected = false;
      });
      this.selectedOrders = [];
    }
  }

  ngOnInit() {
    if(!this.api.checkPermission('Work Order', 'viewList'))  this.router.navigateByUrl('/home');
    this.addList = JSON.parse(sessionStorage.getItem('addList'));
    const editList: string[] = JSON.parse(sessionStorage.getItem('editList'));
    this.editPermission = editList.includes('Work Order');
    this.get();
    this.fromDate = null;
    this.toDate = null;
  }

  reset() {
    this.meta.currentPage = 1;
    this.workOrderSearch = null;
    this.ponoSearch = null;
    this.ecomSearch = null;
    this.fromDate = null;
    this.toDate = new Date();
    this.get();
  }

  goToPageNo() {
    this.orders.forEach(item => {
      item.selected = false;
    });
    this.meta.currentPage = this.goToPage;
    this.get();
  }

  getFilterUrl(): string {
    const page = (this.meta.currentPage - 1) * this.meta.itemsPerPage;
    let link = `WorkOrderMasters/tableData/?page=` + page + '&pageSize=' + this.meta.itemsPerPage;
    if(this.workOrderSearch) link += '&workorder=' + this.workOrderSearch;
    if(this.ponoSearch) link += '&pono=' + this.ponoSearch;
    if(this.ecomSearch) link += '&ecom=' + this.ecomSearch;
    if(this.fromDate) link += '&from=' + this.api.formatDate(this.fromDate);
    if(this.toDate) link += '&to=' + this.api.formatDate(this.toDate);
    
    return link;
  }

  newWorkOrder(previewId: number = 0) {
    this.meta.currentPage = 1;
    this.workOrderSearch = null;
    this.ponoSearch = null;
    this.ecomSearch = null;
    this.fromDate = null;
    this.fromDate = new Date();
    this.toDate = new Date();
    this.get(previewId);
    this.fromDate = null;
    this.toDate = null;

  }

  get(preview: number = 0) {
    this.holdCollapse = true;
    this.api.getdata(this.getFilterUrl()).subscribe((res: any) => {
      this.orders = res.data;
      this.meta.totalItemCount = res.size;
      if(preview) this.viewDetail(preview);
    });
  }

  viewDetail(id) {
    // this.modalService.open(new ShowDetail('Work Order Details', 'show-create', id));
    window.open('/workorderforall/show/' + id);
  }

  changeHold(id: number, status: boolean, workorder: string) {
    this.holdData = {id, status, workorder};
    this.holdCollapse = false;
    setTimeout(() => {
      this.holdData = null;
    }, 1000);

  }

  // delete(id) {
  //   this.modalService.open(new ConfirmModal('Are you sure?', 'Are you sure to delete this?', 'mini')).onApprove(() => {
  //     this.api.deletedata('WorkOrderMasters', id).subscribe((res: any) => {
  //       this.get();
  //       this.api.showDeleteToast('Deleted', this.response.message);
  //     }, err => this.api.showFailureToast('Error Deleting Data'));
  //   });
  // }
}
