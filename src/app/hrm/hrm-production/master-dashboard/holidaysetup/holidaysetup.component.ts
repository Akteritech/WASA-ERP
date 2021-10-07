import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SuiModalService } from 'ng2-semantic-ui';
import { ApiService } from '../../../../api.service';
import { Location } from '@angular/common';
import { ShowDetail } from '../../../../templates/show-detail/show-detail.component';
import { ConfirmModal } from '../../../../templates/confirm-modal/confirm-modal.component';
import { EditDetail } from '../../../../templates/edit-detail/edit-detail.component';

@Component({
    selector: 'app-holidaysetup',
    templateUrl: './holidaysetup.component.html',
    styleUrls: ['./holidaysetup.component.css']
})
export class HolidaysetupComponent implements OnInit {
    collectionSize: any;
    pageSize: any;
    selectedPage: any;
    goToPage: any;
    fromPage: any;
    toPage: any;
    meta: {
        totalItemCount: number,
        totalPageCount: number,
        itemsPerPage: number,
        currentPage: number,
        nextPage: number,
    };
    holidayData: any;
    allholidayData: any;
    currentRoute: any;
    url = 'hrm-holidaysetups';
    Name: string;
    SerachText: string;
    datas: any;
    constructor(private _location: Location, public api: ApiService, public modalService: SuiModalService, private route: ActivatedRoute, private router: Router) {
        this.meta = {
            totalItemCount: 0,
            totalPageCount: 0,
            itemsPerPage: 10,
            currentPage: 1,
            nextPage: 0,
        };

        this.router.events.subscribe(
            (event: any) => {
                if (event instanceof NavigationEnd) {
                    this.currentRoute = this.router.url;
                }
            }
        );
    }

    ngOnInit() {
        this.selectedPage = 1;
        this.get();
    }

    goToPageNo() {
        this.meta.currentPage = this.goToPage;
        this.get();
    }

    get() {
        let link = 'hrm-holidaysetups?page=' + this.meta.currentPage + '&filter[order]=SERIAL_NO DESC';
        this.api.getdata(link).subscribe((res: any[]) => {
            this.holidayData = res.slice(0, 25);
            this.allholidayData = res;
            this.meta.totalItemCount = res.length;

        }, err => {
            console.log(err);
        });
    }

    pageChange() {
        const start = (this.meta.currentPage - 1) * this.meta.itemsPerPage;
        const end = start + this.meta.itemsPerPage
        this.holidayData = this.allholidayData.slice(start, end);
    }

    backClicked() {
        this._location.back();
    }

    reset() {

    }

    search() {
        this.api.getdata('hrm-weekendsetups/searchHRMConfiguration?Name=' + this.Name + `&SerachText=` + this.api.formatDate(this.SerachText)).subscribe((res: any) => {
            this.datas = res.result;
        });
    }

}
