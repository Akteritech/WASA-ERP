import {Component, OnInit} from '@angular/core';
import {ApiService} from './api.service';
import {NavigationEnd, Router} from '@angular/router';
import us from 'ng2-semantic-ui/locales/en-US';
import {SuiLocalizationService} from 'ng2-semantic-ui';
import {NgxSpinnerService} from 'ngx-spinner';
import { AgmCoreModule } from '@agm/core';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentRoute: any;
  isdimm: Boolean;
  username: string;
  zonename:string;
  todayprst:string;
  designation: string;
  rolename: string;
  showheader: boolean;
  constructor(public api: ApiService, private router: Router ) {
      this.router.events.subscribe(
      (event: any) => {
         if (event instanceof NavigationEnd) {
          this.currentRoute = this.router.url;
          if(this.currentRoute != '/login') {

            if(!sessionStorage.getItem('userid')) this.router.navigateByUrl('/');

            else this.username = sessionStorage.getItem('username');
            this.zonename=sessionStorage.getItem('zoneaccess');
            this.todayprst=sessionStorage.getItem('todayattend');
             
            //  this.username = localStorage.getItem('rolename');
            //  this.username = localStorage.getItem('designation');


          }

          this.showheader = !(this.currentRoute == '/login' || this.currentRoute == '/login/user-login' || this.currentRoute.search(/\/NPD-samples\/costing\/\d/) === 0 || this.currentRoute.includes('hrmMaster/leaveapplication/search/leaveAppBangla') || this.currentRoute.includes('hrmMaster/leaveapplication/search/leaveAppEnglish'));
          //console.log(this.currentRoute);
        }
      }
    );
    // localizationService.load('us', us);
    // localizationService.patch('us', {
    //   datepicker: {
    //     formats: {
    //       date: 'DD/MM/YYYY'
    //     }
    //   }
    // });
    // localizationService.setLanguage('us');
  }
  includes(route) {
    if (this.currentRoute) {
      return this.currentRoute.toString().includes(route);
    }
    return false;
  }
  logout() {

    sessionStorage.removeItem('userid');

    sessionStorage.removeItem('username');
    sessionStorage.removeItem('empid');
    // sessionStorage.removeItem('designation');

    this.router.navigateByUrl('/');
    this.username = '';

  }
}
