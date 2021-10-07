import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  currentRoute: string;
   username: string;
   password: string;
    // zone: string;
    // zone2:string;
    todayattend:string;
    companies: string[];
    companyname: string;
  constructor(public api: ApiService, public route: Router ) {
    this.route.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = this.route.url;
        }
      }
    );
  }

  onKey(keyCode: number) {
    if (keyCode === 13) this.login();
  }
  // getUnit() {
  //   this.api.getdata('employee-profiles/getUnit').subscribe((res: any) => {
  //     this.companies = res;
  //     console.log(res);
  //   }, err => {
  //     console.log(err);
  //   });
  //   // this.unit=sessionStorage.getItem('zoneaccess');
  //   // this.hide=true;
  // }
  login() {
    if(!this.username) {
      this.api.showWarningToast('Enter Username');
      return;
    }
    if(!this.password) {
      this.api.showWarningToast('Enter Password');
      return;
    }
    if(!this.companyname) {
      this.api.showWarningToast('Enter Area name');
      return;
    }
    this.api.getdata('employee-attendences/zoneaccess?User=' + this.username + '&psw=' + this.password + '&zone=' +this.companyname).subscribe((res: any) => {
      if (res[0].msg == -1) {

        this.api.showInfoToast('Invalid zone access');
       
        return;
      }
      else if (res[0].msg == 1) {

        if(this.username == 'Admin' && this.password == '123' ) {
          sessionStorage.setItem('userid', '172');
          sessionStorage.setItem('constid', '-1');
          sessionStorage.setItem('username', this.api.buyermodeUser);
          sessionStorage.setItem('empid', '-1');
          sessionStorage.setItem('rollid', '1');
          sessionStorage.setItem('zoneaccess', this.companyname);
          this.api.getdata('UserInfos/getPermittedPages?empId=' + 172).subscribe((res: any[]) => {
            let addList: string[] = res.filter((element: any) => element.IsAddEnable).map((element: any) => element.Title);
            let viewList: string[] = res.filter((element: any) => element.IsViewEnable).map((element: any) => element.Title);
            let editList: string[] = res.filter((element: any) => element.IsUpdateEnable).map((element: any) => element.Title);
            sessionStorage.setItem('addList', JSON.stringify(addList));
            sessionStorage.setItem('viewList', JSON.stringify(viewList));
            sessionStorage.setItem('editList', JSON.stringify(editList));


            this.api.getdata('employee-attendences/zonetodayattend?zone=' + this.companyname).subscribe((res: any) => {
            //   if (res[0].msg != '') {
            //     sessionStorage.setItem('todayattend', res[0].msg);
              
            //   }
            //  else
            //  {
              // sessionStorage.setItem('todayattend', 'Pr.: 0');
              sessionStorage.setItem('todayattend', res[0].TodayPr);
              sessionStorage.setItem('sumattend', res[0].sumattend);
            //  }
        
     
    });

            this.route.navigateByUrl('hrm/hrm-dashboard');
          });
    
          return;
        }
    
        this.api.login(this.username, this.password).subscribe((res: any[]) => {
          if(!res.length) {
            this.api.showWarningToast('Wrong Username or Password');
            return;
          }
    
          sessionStorage.setItem('userid', res[0].UserID);
          sessionStorage.setItem('constid', res[0].UserID);
          sessionStorage.setItem('username', res[0].UserName);
          sessionStorage.setItem('empid', res[0].Emp_ID);
          sessionStorage.setItem('rollid', res[0].RoleID);
    
          localStorage.setItem('userid', res[0].UserID);
          localStorage.setItem('constid', res[0].UserID);
          localStorage.setItem('username', res[0].UserName);
          localStorage.setItem('empid', res[0].Emp_ID);
          localStorage.setItem('rollid', res[0].RoleID);
    
          this.api.getdata('UserInfos/getPermittedPages?empId=172').subscribe((res: any[]) => {
            let addList: string[] = res.filter((element: any) => element.IsAddEnable).map((element: any) => element.Title);
            let viewList: string[] = res.filter((element: any) => element.IsViewEnable).map((element: any) => element.Title);
            let editList: string[] = res.filter((element: any) => element.IsUpdateEnable).map((element: any) => element.Title);
            sessionStorage.setItem('addList', JSON.stringify(addList));
            sessionStorage.setItem('viewList', JSON.stringify(viewList));
            sessionStorage.setItem('editList', JSON.stringify(editList));
            this.route.navigateByUrl('hrm/hrm-dashboard');
          });
        });
      }



      console.log(res);

    }, err => {
      console.log(err);
    });








  }

  ngOnInit() {
    // if(localStorage.getItem('userid')) this.route.navigateByUrl('/hrm-dashboard');
     this.api.getdata('employee-attendences/companies').subscribe((res: string[]) => this.companies = res);
    // this.getUnit();
  }
}
