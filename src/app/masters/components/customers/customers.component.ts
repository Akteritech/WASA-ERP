import {Component, OnInit, ViewChild} from '@angular/core';
import {SuiModalService} from 'ng2-semantic-ui';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ApiService} from '../../../api.service';
import {ShowDetail} from '../../../templates/show-detail/show-detail.component';
import {ConfirmModal} from '../../../templates/confirm-modal/confirm-modal.component';
import {EditDetail} from '../../../templates/edit-detail/edit-detail.component';
import {Location} from '@angular/common';
import {Customer} from '../../models/customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

    collapse = true;
    customers: any;
    response: any;
  selectedClients: any;
  selectAllClient: any;
    userFilter: any;
    p: any;
    fromPage: any;
    toPage: any;
    collectionSize: any;
    pageSize: any;
    selectedPage: any;
    goToPage: any;
    currentRoute: any;
    cust: any;
    url = 'Customers';
    meta: {
        totalItemCount: number,
        totalPageCount: number,
        itemsPerPage: number,
        currentPage: number,
        nextPage: number,
    };
    @ViewChild('searchBox') searchBox;
    addNew: boolean;
    editExisting: boolean;
    constructor(private _location: Location , public api: ApiService, public modalService: SuiModalService, private route: ActivatedRoute, private router: Router) {
        this.meta = {
            totalItemCount: 0,
            totalPageCount: 0,
            itemsPerPage: 10,
            currentPage: 1,
            nextPage: 0,
        };

        this.route.params.subscribe(param => {
            if (param.id) {
                this.collapse = false;
            }
        });
        this.cust = new Customer();
        this.router.events.subscribe(
            (event: any) => {
                if (event instanceof NavigationEnd) {
                    this.currentRoute = this.router.url;
                }
            }
        );
    }
  selectAll() {
    this.selectedClients = [];
    if (this.selectAllClient) {
      this.customers.forEach(item => {
        item.selected = true;
        this.selectedClients.push(item);
      });
    } else {
      this.customers.forEach(item => {
        item.selected = false;
      });
      this.selectedClients = [];
    }
  }
  selectClients(item, i) {
    if (item.selected) {
      this.selectedClients.push(item);
    } else {
      this.selectedClients.splice(i, 1);
      this.selectAllClient = false;
    }

  }
  ngOnInit() {
    if(!this.api.checkPermission('Customer Profile', 'viewList'))  this.router.navigateByUrl('/home');
    this.addNew = this.api.checkPermission('Customer Profile', 'addList');
    this.editExisting = this.api.checkPermission('Customer Profile', 'editList');
    this.collapse = !this.addNew;
    
    this.customers = [];
    this.selectedClients = [];
    this.meta.currentPage = 1;
        this.get();
    }
    edit(id) {
        console.log(id);
        this.modalService
            .open(new EditDetail('Edit Customers', 'customers', id))
            .onApprove(() => {

            })
            .onDeny(() => {
              this.get();
                console.log();
            });
    }
    getItemCount() {
        let filter: any = {};
        filter['clientid'] = this.cust.clientid;
        filter = JSON.stringify(filter);
        this.api.getdata('Customers/count?where=' + filter ).subscribe( (res: any) => {
            this.collectionSize = res.count;
            this.meta.currentPage = 1;
            this.get();
        }, err => {

        });
    }
    goToPageNo() {
        this.meta.currentPage = this.goToPage;
        this.get();
    }
    get() {
        this.api.getdata('Customers?page=' + this.meta.currentPage + '&filter[order]=clientid DESC').subscribe((res: any) => {
            this.customers = res.data;
            this.meta = res.meta;
        }, error1 => {
        });
    }
    viewDetail(id) {
        this.modalService
            .open(new ShowDetail('Customer Details', 'customer', id))
            .onApprove(() => {
            })
            .onDeny(() => {
            });
    }
    delete(id) {
        this.modalService
            .open(new ConfirmModal('Are you sure?', 'Are you sure to delete this?', 'mini'))
            .onApprove(() => {
                this.api.deletedata('Customers', id).subscribe((res: any) => {
                    this.get();
                    this.response = res;
                    this.api.showDeleteToast('Deleted', this.response.message);
                }, err => {

                });
            })
            .onDeny(() => {

            });
    }

    alert(id): void {
        this.modalService
            .open(new ShowDetail('Client Details', 'customer', id))
            .onApprove(() => {
            })
            .onDeny(() => {
            });
    }
    optionsSearch = (query) => {
        this.searchBox.dropdownService.setOpenState(true);
        return this.api.getdata('Customers?filter={ "where":{"clientname":{"like":"%25' + query + '%25"}}}').toPromise();
    }
    backClicked() {
        this._location.back();
    }
    mapData(cust) {
      return {
        clientname: cust.clientname,
        currentaddress: cust.currentaddress,
        previousaddress: cust.previousaddress,
        factorylocation: cust.factorylocation,
        contactperson: cust.contactperson,
        buyername: cust.buyername,
        telephone: cust.telephone,
        fax: cust.fax,
        email: cust.email,
        majorproducts: cust.majorproducts,
        majorbrands: cust.majorbrands,
        totalcapacity: cust.totalcapacity,
        totalemployee: cust.totalemployee,
        director: cust.director,
        merchandiser: cust.merchandiser,
        commercialperson: cust.commercialperson,
        accountsperson: cust.accountsperson,
        salesperson: cust.salesperson,
        creditlimit: cust.creditlimit,
        modeofpayment: cust.modeofpayment,
        clienthistory: cust.clienthistory,
        specialinstruction: cust.specialinstruction,
        isunnominated: cust.isunnominated,
      };
    }
    exporttoExcel(pageRange?: boolean): void {
        const fileName = 'Clients';
        const columns = [
            { header: 'Customer Name', key: 'clientname', width: 25 },
            { header: 'Current Address', key: 'currentaddress', width: 25 },
            { header: 'Previous Address', key: 'previousaddress', width: 25 },
            { header: 'Factory Location', key: 'factorylocation', width: 25 },
            { header: 'Contact Person', key: 'contactperson', width: 25 },
          { header: 'Buyer Name', key: 'buyername', width: 25 },
            { header: 'Telephone', key: 'telephone', width: 15 },
            { header: 'Fax', key: 'fax', width: 15 },
            { header: 'Email', key: 'email', width: 15 },
            { header: 'Major Products', key: 'majorproducts', width: 30 },
            { header: 'Major Brands', key: 'majorbrands', width: 30 },
            { header: 'Total Capacity', key: 'totalcapacity', width: 10 },
            { header: 'Total Employee', key: 'totalemployee', width: 10 },
            { header: 'Director', key: 'director', width: 20 },
            { header: 'Merchandiser', key: 'merchandiser', width: 20 },
            { header: 'Commercial Person', key: 'commercialperson', width: 20 },
            { header: 'Accounts Person', key: 'accountsperson', width: 20 },
          { header: 'Sales Person', key: 'salesperson', width: 20 },
            { header: 'Credit Limit', key: 'creditlimit', width: 20 },
            { header: 'Mode of Payment', key: 'modeofpayment', width: 20 },
            { header: 'Client History', key: 'clienthistory', width: 20 },
            { header: 'Special Instruction', key: 'specialinstruction', width: 20 },
            { header: 'Nominated Price', key: 'isunnominated', width: 20 },
        ];
        if (pageRange) {
            if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
                return;
            }
            const url = {};
            url['order'] = 'clientid DESC';
            url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
            url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
            this.api.getdata('Customers?filter=' + JSON.stringify(url)).subscribe((res: any) => {
                this.api.exportToExcel(columns, res.map(this.mapData), fileName);
            }, error1 => {
                console.log('Class: , Line:  error1 ', error1);
            });
        } else {
            this.api.exportToExcel(columns, this.selectedClients.map(this.mapData), fileName);
        }
    }
    exporttoCsv(pageRange?: boolean): void {
        const fileName = 'Clients';
        const columns = [
          { header: 'Client Name', key: 'clientname', width: 25 },
          { header: 'Current Address', key: 'currentaddress', width: 25 },
          { header: 'Previous Address', key: 'previousaddress', width: 25 },
          { header: 'Factory Location', key: 'factorylocation', width: 25 },
          { header: 'Contact Person', key: 'contactperson', width: 25 },
          { header: 'Buyer Name', key: 'buyername', width: 25 },
          { header: 'Telephone', key: 'telephone', width: 15 },
          { header: 'Fax', key: 'fax', width: 15 },
          { header: 'Email', key: 'email', width: 15 },
          { header: 'Major Products', key: 'majorproducts', width: 30 },
          { header: 'Major Brands', key: 'majorbrands', width: 30 },
          { header: 'Total Capacity', key: 'totalcapacity', width: 10 },
          { header: 'Total Employee', key: 'totalemployee', width: 10 },
          { header: 'Director', key: 'director', width: 20 },
          { header: 'Merchandiser', key: 'merchandiser', width: 20 },
          { header: 'Commercial Person', key: 'commercialperson', width: 20 },
          { header: 'Accounts Person', key: 'accountsperson', width: 20 },
          { header: 'Sales Person', key: 'salesperson', width: 20 },
          { header: 'Credit Limit', key: 'creditlimit', width: 20 },
          { header: 'Mode of Payment', key: 'modeofpayment', width: 20 },
          { header: 'Client History', key: 'clienthistory', width: 20 },
          { header: 'Special Instruction', key: 'specialinstruction', width: 20 },
          { header: 'Nominated Price', key: 'isunnominated', width: 20 },
        ];
        if (pageRange) {
            if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
                return;
            }
            const url = {};
            url['order'] = 'clientid DESC';
            url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
            url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
            this.api.getdata('Customers?filter=' + JSON.stringify(url)).subscribe((res: any) => {
                this.api.exportToCsv(columns, res.map(this.mapData), fileName);
            }, error1 => {
                console.log('Class: , Line:  error1 ', error1);
            });
        } else {
            this.api.exportToCsv(columns, this.selectedClients.map(this.mapData), fileName);
        }
    }
    exportToPDF(pageRange?: boolean) {
        if (pageRange) {
            if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
                return;
            }
            const url = {};
            url['order'] = 'clientid DESC';
            url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
            url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
            this.api.getdata('Customers?filter=' + JSON.stringify(url)).subscribe((res: any) => {
                this.api.savePdf(this.getDataForPDF(res), 'A2', 'landscape', 'Clients', 'auto');
            }, error1 => {
                console.log('here');
                console.log('Class: , Line:  error1 ', error1);
            });
        } else {
            this.api.savePdf(this.getDataForPDF(this.selectedClients), 'A2', 'landscape', 'Clients' , 'auto');
        }
    }
    printOpen(pageRange?: boolean) {
        if (pageRange) {
            if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
                return;
            }
            const url = {};
            url['order'] = 'clientid DESC';
            url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
            url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
            this.api.getdata('Customers?filter=' + JSON.stringify(url)).subscribe((res: any) => {
                this.api.OpenPrint(this.getDataForPDF(res), 'A2', 'landscape', 'Clients', 'auto');
            }, error1 => {
                console.log('here');
                console.log('Class: , Line:  error1 ', error1);
            });
        } else {
            this.api.OpenPrint(this.getDataForPDF(this.selectedClients), 'A2', 'landscape', 'Clients' , 'auto');
        }
    }
    getDataForPDF(data) {
        const Data = [[
            'S.No.',
            'Customer Name',
            'Current Address',
            'Previous Address',
            'Factory Location',
            'Contact Person',
            'Buyer Name',
            'Telephone',
            'Fax',
            'Email',
            'Major Products',
            'Major Brands',
            'Total Capacity',
            'Total Employee',
            'Director',
            'Merchandiser',
          'Commercial Person',
          'Accounts Person',
          'Sales Person',
          'Credit Limit',
          'Mode of Payment',
          'Customer History',
          'Special Instruction',
          'Nominated Price',
        ]];
      const exportData = data.map(this.mapData);
      exportData.forEach((element, i) => {
        Data.push([
          i + 1,
          element.clientname,
          element.currentaddress,
          element.previousaddress,
          element.factorylocation,
          element.contactperson,
          element.buyername,
          element.telephone,
          element.fax,
          element.email,
          element.majorproducts,
          element.majorbrands,
          element.totalcapacity,
          element.totalemployee,
          element.director,
          element.merchandiser,
          element.commercialperson,
          element.accountsperson,
          element.salesperson,
          element.creditlimit,
          element.modeofpayment,
          element.clienthistory,
          element.specialinstruction,
          element.isunnominated,
            ]);
        });
        return Data;
    }
}
