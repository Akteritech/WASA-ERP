import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-page-permission',
  templateUrl: './page-permission.component.html',
  styleUrls: ['./page-permission.component.css']
})
export class PagePermissionComponent implements OnInit {
  roles: any[];
  pages: string[];
  allPages: string[];

  constructor(private _location: Location, private api: ApiService) { }

  ngOnInit() {
    this.api.getdata('UserInfos/pages').subscribe((res: string[]) => {
      this.pages = res.slice(0, 50);
      this.allPages = res;
    });
    this.api.getdata('UserInfos/roles').subscribe((res: string[]) => this.roles = res);
  }

  pageSearch(key: string) {
    this.pages = this.allPages.filter((page: string, index: number) => 
      page.toLowerCase().includes(key.toLowerCase())).slice(0, 50);
  }

  reset() {
  }

  backClicked() { this._location.back();}

}
