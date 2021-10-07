import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {SuiModalService} from 'ng2-semantic-ui';
import {ApiService} from '../../../api.service';
import {Location} from '@angular/common';
import {ShowDetail} from '../../../templates/show-detail/show-detail.component';
import {ConfirmModal} from '../../../templates/confirm-modal/confirm-modal.component';
import {EditDetail} from '../../../templates/edit-detail/edit-detail.component';
import {Company} from '../../models/company';

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
    company: any;
    content: any;
    filter: any;
    OpenPrint: boolean;
  selectedCompanies: any;
  selectAllCompany: any;
    state: any;
    userFilter: any;
    collapse = true;
    companies = [];
    response: any;
    collectionSize: any;
    pageSize: any;
    selectedPage: any;
    goToPage: any;
    fromPage: any;
    toPage: any;
    currentRoute: any;
    url = 'comp';
    meta: {
        totalItemCount: number,
        totalPageCount: number,
        itemsPerPage: number,
        currentPage: number,
        nextPage: number,
    };
    @ViewChild('searchBox') searchBox;
    addNewCompany: boolean;
    editCompany: boolean;
    constructor(private _location: Location, public api: ApiService, public modalService: SuiModalService, private route: ActivatedRoute, private router: Router) {
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
        this.router.events.subscribe(
            (event: any) => {
                if (event instanceof NavigationEnd) {
                    this.currentRoute = this.router.url;
                }
            }
        );
        this.company = new Company();
    }

  selectAll() {
    this.selectedCompanies = [];
    if (this.selectAllCompany) {
      this.companies.forEach(item => {
        item.selected = true;
        this.selectedCompanies.push(item);
      });
    } else {
      this.companies.forEach(item => {
        item.selected = false;
      });
      this.selectedCompanies = [];
    }
  }
  selectCompanies(item, i) {
    if (item.selected) {
      this.selectedCompanies.push(item);
      console.log(this.selectedCompanies);
    } else if(!item.selected) {
      this.selectedCompanies.splice(i, 1);
        console.log(this.selectedCompanies);

        this.selectAllCompany = false;
    }

  }
  ngOnInit() {
    if(!this.api.checkPermission('Company', 'viewList'))  this.router.navigateByUrl('/home');
    this.addNewCompany = this.api.checkPermission('Company', 'addList');
    this.editCompany = this.api.checkPermission('Company', 'editList');
    this.collapse = !this.addNewCompany;
    
    this.companies = [];
    this.selectedCompanies = [];
    this.selectedPage = 1;
        this.get();
    }

    goToPageNo() {
        this.meta.currentPage = this.goToPage;
        this.get();
    }

    get() {
        this.api.getdata('comp?page=' + this.meta.currentPage + '&filter[order]=companyid DESC').subscribe((res: any) => {
            this.companies = res.data;
            this.meta = res.meta;
            console.log(res);
        }, error1 => {
            console.log('Class: , Line:  error1 ', error1);
        });
    }
    edit(id) {
        console.log(id);
        this.modalService
            .open(new EditDetail('Edit Company', 'company', id))
            .onApprove(() => {

            })
            .onDeny(() => {
                console.log();
            });
    }
    delete(id) {
        this.modalService
            .open(new ConfirmModal('Are you sure?', 'Are you sure to delete this?', 'mini'))
            .onApprove(() => {
                this.api.deletedata('comp', id).subscribe(res => {
                    this.get();
                    this.response = res;
                    this.api.showDeleteToast('Deleted', this.response.message);
                }, err => {
                    console.log(err);
                });
            })
            .onDeny(() => {
                console.log('Class: LeaveTypeComponent, Line: 39  ');
            });
    }

    viewDetail(id) {
        console.log(id);
        this.modalService
            .open(new ShowDetail('Company Details', 'company', id))
            .onApprove(() => {

            })
            .onDeny(() => {
                console.log();
            });
    }

    alert(id): void {
        console.log(id);
        this.modalService
            .open(new ShowDetail('Company Details', 'company', id))
            .onApprove(() => {

            })
            .onDeny(() => {
                console.log();
            });
    }

    optionsSearch = (query) => {
        this.searchBox.dropdownService.setOpenState(true);
        return this.api.getdata('Comp?filter={ "where":{"companyname":{"like":"%25' + query + '%25"}}}').toPromise();
    };

    backClicked() {
        this._location.back();
    }

    exporttoExcel(pageRange?: boolean): void {
        const fileName = 'Companies';
        const columns = [
            {header: 'Company Name', key: 'companyname', width: 15},
            {header: 'Short Name', key: 'shortname', width: 15},
            {header: 'Address', key: 'address', width: 25},
            {header: 'Address 2', key: 'address2', width: 25},
            {header: 'Mobile', key: 'mobile', width: 15},
            {header: 'Phone', key: 'phone', width: 15},
            {header: 'Fax', key: 'fax', width: 15},
            {header: 'Email', key: 'email', width: 15},
            {header: 'Web', key: 'web', width: 15},
            {header: 'District', key: 'district', width: 15},
          {header: 'Post Code', key: 'postcode', width: 15},
          {header: 'IRC No.', key: 'ircno', width: 10},
            {header: 'LCA No.No', key: 'lcano', width: 10},
            {header: 'TIN No.', key: 'tinno', width: 10},
            {header: 'Vat Reg. No.', key: 'vatregno', width: 10},
            {header: 'ERC No.', key: 'ercno', width: 10},
            {header: 'Industry', key: 'sectorofindustry', width: 10},
          {header: 'HS Label Code', key: 'hscode', width: 10},
          {header: 'Year Of Renewal', key: 'yearofrenewal', width: 10},
        ];
        if (pageRange) {
            if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
                return;
            }
            const url = {};
            url['order'] = 'companyid DESC';
            url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
            url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
            this.api.getdata('Comp?filter=' + JSON.stringify(url)).subscribe(res => {
                this.api.exportToExcel(columns, res, fileName);
            }, error1 => {
                console.log('Class: , Line:  error1 ', error1);
            });
        } else {
            this.api.exportToExcel(columns, this.selectedCompanies, fileName);
        }
    }
    exporttoCsv(pageRange?: boolean): void {
        const fileName = 'Companies';
        const columns = [
            {header: 'Company Name', key: 'companyname', width: 15},
            {header: 'Short Name', key: 'shortname', width: 15},
            {header: 'Address', key: 'address', width: 25},
            {header: 'Address 2', key: 'address2', width: 25},
            {header: 'Mobile', key: 'mobile', width: 15},
            {header: 'Phone', key: 'phone', width: 15},
            {header: 'Fax', key: 'fax', width: 15},
            {header: 'Email', key: 'email', width: 15},
            {header: 'Web', key: 'web', width: 15},
            {header: 'District', key: 'district', width: 15},
            {header: 'Post Code', key: 'postcode', width: 15},
            {header: 'IRC No.', key: 'ircno', width: 10},
            {header: 'LCA No.No', key: 'lcano', width: 10},
            {header: 'TIN No.', key: 'tinno', width: 10},
            {header: 'Vat Reg. No.', key: 'vatregno', width: 10},
            {header: 'ERC No.', key: 'ercno', width: 10},
            {header: 'Industry', key: 'sectorofindustry', width: 10},
            {header: 'HS Label Code', key: 'hscode', width: 10},
            {header: 'Year Of Renewal', key: 'yearofrenewal', width: 10},
        ];
        if (pageRange) {
            if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
                return;
            }
            const url = {};
            url['order'] = 'companyid DESC';
            url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
            url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
            this.api.getdata('Comp?filter=' + JSON.stringify(url)).subscribe(res => {
                this.api.exportToCsv(columns, res, fileName);
            }, error1 => {
                console.log('Class: , Line:  error1 ', error1);
            });
        } else {
            this.api.exportToCsv(columns, this.selectedCompanies, fileName);
        }
    }
    exportToPDF(pageRange?: boolean) {
        if (pageRange) {
            if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
                return;
            }
            const url = {};
            url['order'] = 'companyid DESC';
            url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
            url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
            this.api.getdata('Comp?filter=' + JSON.stringify(url)).subscribe(res => {
                this.api.savePdf(this.getDataForPDF(res), 'A2', 'landscape', 'Company', 'auto');
            }, error1 => {
                console.log('here');
                console.log('Class: , Line:  error1 ', error1);
            });
        } else {
            this.api.savePdf(this.getDataForPDF(this.selectedCompanies), 'A2', 'landscape', 'Company', 'auto');
        }
    }
    printOpen(pageRange?: boolean) {
        if (pageRange) {
            if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
                return;
            }
            const url = {};
            url['order'] = 'companyid DESC';
            url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
            url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
            this.api.getdata('Comp?filter=' + JSON.stringify(url)).subscribe(res => {
                this.api.OpenPrint(this.getDataForPDF(res), 'A2', 'landscape', 'Company', 'auto');
            }, error1 => {
                console.log('here');
                console.log('Class: , Line:  error1 ', error1);
            });
        } else {
            this.api.OpenPrint(this.getDataForPDF(this.selectedCompanies), 'A2', 'landscape', 'Company', 'auto');
        }
    }
    getDataForPDF(data) {
        const Data = [['S.No', 'Company Name', 'Short Name', 'Address', 'Address 2', 'Mobile', 'Phone', 'Fax', 'Email', 'Web', 'District', 'Post Code', 'IRC No.', 'LCA No.No', 'TIN No.', 'Vat Reg. No.', 'ERC No.', 'Industry', 'HS Label Code', 'Year of Renewal',
        ]];
        const exportData = data;
        exportData.forEach((element, i) => {
            Data.push([i + 1, element.companyname, element.shortname, element.address, element.address2, element.mobile, element.phone, element.fax, element.email, element.web, element.district, element.postcode, element.ircno, element.lcano, element.tinno, element.vatregno, element.ercno, element.sectorofindustry, element.hscode, element.yearofrenewal,
            ]);
        });
        return Data;
    }
}
