import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ɵCodegenComponentFactoryResolver} from '@angular/core';
import {Location} from "@angular/common";
import {ApiService} from "../../../../api.service";
import {SuiModalService} from "ng2-semantic-ui";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {ShowDetail} from "../../../../templates/show-detail/show-detail.component";
import {ConfirmModal} from "../../../../templates/confirm-modal/confirm-modal.component";
import {EmployeeProfile} from "./add-employee-profile/add-employee-profile.component";
import * as html2pdf from 'html2pdf.js';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {from, fromEvent, interval, of, Subscription, timer} from "rxjs";
import {delay} from "rxjs/operators";

declare let $: any
@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit, AfterViewInit {

  @Output() myevent = new EventEmitter()
  hide=false;
  collapse = true;
  employees: any;
  response: any;
  selectedEmployees: any;
  selectAllEmployee: any;
  userFilter: any;
  p: any;
  collectionSize: any;
  pageSize: any;
  selectedPage: any;
  goToPage: any;
  fromPage: any;
  toPage: any;
  currentRoute: any;
  showSearchForm = false;
  emp: any;
  cardno: string;
  url = 'employee-profiles';
  meta: {
    totalItemCount: number,
    totalPageCount: number,
    itemsPerPage: number,
    currentPage: number,
    nextPage: number,
  };
  @ViewChild('searchBox') searchBox;
   workerIdCard: any;
   staffIdCard: any;
   departments: any;
  department: any;
   photo: any;
   array  = [];
   imageBlobUrl: any;
   imageurl: any;
   staffIdCard1: any;
   companyLogo: any;
   imageurlforworker: any;
   employeehistory: any;
  unit: any;
  units: any;
  allemployees: any;
  genderlist: any;
   accountlist: any;
@ViewChild('addbtn') addbtn:ElementRef;
   designations: any;
   isImageLoading: boolean;
     image: any;
  constructor(private _location: Location , public api: ApiService,
              public modalService: SuiModalService, private route: ActivatedRoute ,
              private router: Router, public sanitizer: DomSanitizer) {
    this.meta = {
      totalItemCount: 0,
      totalPageCount: 0,
      itemsPerPage: 10,
      currentPage: 1,
      nextPage: 0,
    };
    this.route.params.subscribe( params => {
      if (params.id) {
        this.collapse = false;
      }
    });
    this.emp = new EmployeeProfile();
    this.router.events.subscribe(
        (event: any) => {
          if (event instanceof NavigationEnd) {
            this.currentRoute = this.router.url;
          }
        }
    );
  }

  ngAfterViewInit(): void {
   // let counnt = 0
   //  fromEvent(this.addbtn.nativeElement, 'click').subscribe(res => {
   //  })
  }
  ngOnInit() {

     if (sessionStorage.getItem('zoneaccess')=='All')
     {
      this.getUnit();
     }
    else
    {
      this.getUnitSpec();
    }
    this.employees = [];
    this.workerIdCard = [];
    this.selectedEmployees = [];
    this.getItemCount();
    this.getDepartment();
    this.getDesignation();
    
    // this.unit=sessionStorage.getItem('zoneaccess');
    // this.hide=true;
  }
  mapEmployeeData(data: any[]): any[] {
    return data.map((e: any) => {
      return {
        Zone: e.Company, Department: e.Department, 'ID No.': e.IDNo, Name: e.Name, Designation: e.Designation
        
        
      };
    })
  }

  employeeList() {
   
    let link = `psn-employees/salaryInfo?`;
    if (this.cardno) link += '&type=';
    if (this.department) link += '&department='+encodeURIComponent(this.department);
    if (this.unit) link += '&company='+encodeURIComponent(this.unit);

    this.api.getdata(link).subscribe((res: any[]) => {
      this.api.exportExcel(res, [['Employee List']], 'Employee List', [10, 30, 15, 30, 30]);
    });
   
   
   
   
    // const link = this.generateLink(`psn-employees/salaryInfo?company=''&department=''&type=''`);
    // this.api.getdata(link).subscribe((res: any[]) => {
    //   const data = this.mapEmployeeData(res);
    //   this.api.exportExcel(data, [['Employee List']], 'Employee List', [30, 10, 30, 20, 15]);
    // });
  }
  generateLink(arg0: string) {
    throw new Error('Method not implemented.');
  }
  get1() {
    let link = `psn-employees/getGradeList`;
    this.api.getdata(link).subscribe((res: any) => {
    });
  }
  getUnit() {
    // ?card=' + this.cardno
    this.api.getdata('employee-profiles/getUnit').subscribe((res: any) => {
      this.units = res;
    }, err => {
      console.log(err);
    },()=> {
      console.log('ád');
    });
   // this.units=sessionStorage.getItem('zoneaccess');
  //  this.hide=true;
  }
  getUnitSpec() {
    // ?card=' + this.cardno
    this.api.getdata('employee-profiles/getUnitSpec?unit=' +sessionStorage.getItem('zoneaccess') ).subscribe((res: any) => {
      this.units = res;
    }, err => {
      console.log(err);
    },()=> {
      console.log('ád');
    });
    // this.units=sessionStorage.getItem('zoneaccess');
  //  this.hide=true;
  }
  alert(id): void {
    console.log(id);
    this.modalService.open(new ShowDetail('Employee Details', 'employee', id))
        .onApprove(() => {}).onDeny(() => {console.log();});
  }
  optionsSearch = query => {
    this.searchBox.dropdownService.setOpenState(true);
    return this.api.getdata('EmployeePersonalInfos?filter={ "where":{"firstname":{"like":"%25' + query + '%25"}}}').toPromise();
  }

  pdf() {
    setTimeout(() => {
      const element = document.getElementById('printSection');
      let margin = 15;let format = 'a4';let orientation = 'landscape';
      const opt = {margin: margin,
        filename: this.toExportFileName('StaffIDCards', 'pdf'),
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: format, orientation: orientation }
      };
      html2pdf().from(element).set(opt).save();
    }, 1200)

  }


  uploadCard() {
    if(!this.cardno) {
      this.api.showWarningToast('Enter Card');
      return;
    }

    this.api.getdata('psn-employees/addCard?card=' + this.cardno).subscribe((res: number) => {
      if(res) this.api.showSuccessToast('Card Added');
      else this.api.showWarningToast('Card Already Exists');
    })
  }

  pdfForWorker() {
    setTimeout(() => {
      const element = document.getElementById('hidden2');
      let margin = 15;
      let format = 'a4';
      let orientation = 'landscape';
      const opt = {
        margin: margin,
        filename: this.toExportFileName('WorkerIDCards', 'pdf'),
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: format, orientation: orientation }
      };
      html2pdf().from(element).set(opt).save();
    }, 1000);

  }
  toExportFileName(fileName: string, type: string): string {
    return `${fileName}_${new Date().toLocaleDateString()}.${type}`;
  }

  getItemCount() {
    let filter: any = {};
    filter['EMP_ID'] = this.emp.EMP_ID;
    filter = JSON.stringify(filter);
    this.api.getdata('employee-profiles/count?where=' + filter ).subscribe( (res: any) => {
      this.collectionSize = res.count;
      this.meta.currentPage = 1;
      // this.get();
    }, err => {
      console.log(err);
    });
  }
  // goToPageNo() {
  //   this.meta.currentPage = this.goToPage;
  //   this.get();
  // }
  // getFilterUrl() {
  //   const filter: any = {};
  //   filter['where'] = {};
  //     filter['where']['CREATED_BY'] = 'setu';
  //   return filter;
  // }
     searchRecord() {
    let link = `employee-profiles/searchdata?`;
    if (this.cardno) link += '&cardno='+this.cardno;
    if (this.department) link += '&deptno='+encodeURIComponent(this.department);
    if (this.unit) link += '&unitid='+encodeURIComponent(this.unit);
    if (this.desig) link += '&desigid='+encodeURIComponent(this.desig);
    this.api.getdata(link).subscribe((res: any) => {
      res.forEach((item, index) => {
        item.image = `assets/employees/${item.IDNo.replace(/000+/, '')}.jpg`;
      });
      this.employees =res.slice(0, 10);
      this.allemployees = res;
      this.meta.totalItemCount = res.length;
      this.selectedEmployees = [];
      console.log(this.employees);
    }, error2 => {
      console.log(error2);
    });
  }
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.image = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  key() {
    this.searchRecord();
  }
  pageChange(){
    const start = (this.meta.currentPage - 1) * this.meta.itemsPerPage;
    const end = start + this.meta.itemsPerPage
    this.employees = this.allemployees.slice(start, end);
  }

  viewDetail(id) {
    console.log(id);
    this.modalService.open(new ShowDetail('Employee Profile Details', 'employeeprofile', id)).onApprove(() => {}).onDeny(() => {console.log();});
  }
  backClicked() {
    this._location.back();
  }

  getDepartment = () => {
    this.api.getdata('employee-profiles/getDepartment').subscribe((res: any) => {this.departments = res;
    }, error2 => {console.log(error2);});
  }

 async PrintWorkerIdCard() {
     await this.api.getdata('employee-profiles/getMultipleCardNo?cardno=' + this.cardno).subscribe((res: any) => {
            res.forEach(item => {
              if (res.length >0 ) {
                item.image = `assets/employees/${item.EmpCardNo}.jpg`;
                item.companyLogo = `assets/employees/${item.COMPANY}logo.jpg`;
                  // let array1 = new Uint8Array(item.logo.data);
                  // const char1 = array1.reduce((data, byte)=> {return data + String.fromCharCode(byte);},'');
                  // let base64String1 = btoa(char1);
                  // item.companyLogo = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + base64String1);
              }
              else {this.api.showWarningToast('No Data Found');}
            });
            setTimeout(()=>{
                this.workerIdCard = res;
                this.pdfForWorker();

            },2000);
            console.log(this.workerIdCard);
          }, error2 => {console.log(error2);}
      );
  }
 async PrintStaffIdCard() {
  await  this.api.getdata('employee-profiles/getMultipleCardNoForStaff?cardno=' + this.cardno).subscribe((res: any) => {
      console.log(res);      res.forEach(item => {
          if (res.length >0 ) {
              item.image = `assets/employees/${item.EmpCardNo}.jpg`;
              item.companyLogo = `assets/employees/${item.DIVISION_NAME_ENG.replace(/\s/g, '')}.jpg`;
            // let array1 = new Uint8Array(item.COMlOGO.data);
            // const char1 = array1.reduce((data, byte)=> {return data + String.fromCharCode(byte);},'');
            // let base64String1 = btoa(char1);
            // item.companyLogo = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + base64String1);
          }
          else {this.api.showWarningToast('No Data Found');}
          });
          this.staffIdCard = res;
          setTimeout(() => {
            this.pdf();
          },2000);
          console.log(this.staffIdCard);
        }, error2 => {console.log(error2);}
    );
  }

   async PrintOldWorkerIdCard() {
      await  this.api.getdata('employee-profiles/getMultipleCardNo?cardno=' + this.cardno).subscribe((res: any) => {
          res.forEach(item => {
              if (res.length >0 ) {
                // item.image = `assets/employees/${item.EmpCardNo}.jpg`;
                  item.companyLogo = `assets/employees/${item.COMPANY}logo.jpg`;
                  this.api.getBlobThumbnail(`FileUploads/employees/download/${item.EmpCardNo}.jpg`).subscribe((Response: any) => {
                      console.log(Response);
                     this.createImageFromBlob(Response);
                      // this.api.getBlobThumbnail(`FileUploads/employees/download/${res[0].EnglishCompany.replace(/\s/g, '')}.jpg`).subscribe((resp: any) => {
                      //     this.api.createImageFromBlob1(resp);
                          // console.log(this.photo);
                      });
                  // let array1 = new Uint8Array(item.logo.data);
                  // const char1 = array1.reduce((data, byte)=> {return data + String.fromCharCode(byte);},'');
                  // let base64String1 = btoa(char1);
                  // item.companyLogo = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + base64String1);
              }
            else {this.api.showWarningToast('No Data Found');}
          });
              setTimeout(()=>{
                  this.workerIdCard = res;
                  this.pdfForWorker();

              },2000);
              console.log(this.workerIdCard);
          }, error2 => {console.log(error2);}
          );
  }
  printOldMultipleStaff = async() => {

    await this.api.getdata('employee-profiles/getMultipleCardNoForStaff?cardno=' + this.cardno).subscribe((res: any) => {
          res.forEach(item => {
            if (res.length >0 ) {
              // item.image = `assets/employees/${item.EmpCardNo}.jpg`;
              item.companyLogo = `assets/employees/${item.DIVISION_NAME_ENG.replace(/\s/g, '')}.jpg`;
              item.backgroundImage = `assets/backgroundImage/${item.DIVISION_NAME_ENG.replace(/\s/g, '')}.png`;
                this.api.getBlobThumbnail(`FileUploads/employees/download/${item.EmpCardNo}.jpg`).subscribe((Response: any) => {
                    console.log(Response);
                    this.createImageFromBlob(Response);
                    // this.api.getBlobThumbnail(`FileUploads/employees/download/${res[0].EnglishCompany.replace(/\s/g, '')}.jpg`).subscribe((resp: any) => {
                    //     this.api.createImageFromBlob1(resp);
                    // console.log(this.photo);
                });
            } else {this.api.showWarningToast('No Data Found ');}
          });
          setTimeout(() => {
            this.staffIdCard = res;this.pdf();
            console.log(this.staffIdCard);
          },2000);
         }, error2 => {console.log(error2);});
  }
  desig: any;

  printGenderlist () {
      this.api.getdata('employee-profiles/genderList').subscribe((res: any) => {this.genderlist = res;
    }, error2 => {console.log(error2);});
    setTimeout(()=> {
      const data = this.genderlist.map((element: any) => {
        return {
          'Employee name (English)': element['EMP_NAME_ENG'], 'Unit Name': element['DIVISION_NAME_ENG'], 'Department Name': element['DeptEngNm'],
          'Designation Name': element['DesigNmEng'],
          'Employee Card No.': element['EMP_CARD_NO'], 'Joining Date': element['JOINING_DATE'],
          'Present Salary': element['PRESENT_SALARY']
        };
      });
      const lengths = [22, 10, 30, 30, 11, 15, 25, 20, 20, 8, 13, 10, 10, 10, 18];
      this.api.exportExcel(data, [[' Gender List Report'], []], ' Gender List Report',  lengths);
    }, 1000);
    
	}
  getDesignation() {
    this.api.getdata('employee-profiles/getDesignation').subscribe((res: any) => {
      this.designations = res;
      // console.log(res);
    }, error2 => {
      console.log(error2);
    });
  }

  benefitList() {
    let link = `employee-profiles/benefitList?`;
    if (this.cardno) link += '&card='+this.cardno;
    if (this.department) link += '&department='+encodeURIComponent(this.department);
    if (this.unit) link += '&company='+encodeURIComponent(this.unit);

    this.api.getdata(link).subscribe((res: any[]) => {
      this.api.exportExcel(res, [['Benefit List']], 'benefit lits', [10, 20, 20, 20]);
    });
  }
}
