import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Location} from "@angular/common";
import {ApiService} from "../../../../../api.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {SuiModalService} from "ng2-semantic-ui";
import {Employee} from "../../../../../masters/models/employee";
import {NgForm} from "@angular/forms";
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
declare var $: any
import fileUpload  from "fuctbase64";
import {Observable, Observer} from "rxjs";
export class EmployeeProfile {
  EMP_TYPE: any;EMP_ID : any;EMP_ACTIVITY : any;EMP_NAME_ENG : any;EMP_NAME_BNG : any;
  DIVISION_ID : any;DEPARTMENT_ID : any;FLOOR_ID : any;GROUP_ID : any;DESIGNATION_ID : any;
  EMP_CARD_NO : any;ATTEND_DEVICE_NO : any;EMP_STATUS : any;LUNCH_TIME_START : any;LUNCH_TIME_END : any;
  SHIFT_START_DATE : any;JOINING_DATE : any;GRADE_ID : any;PRESENT_SALARY : any;HOLLYDAY_AMOUNT : any;
  TIFFIN_AMOUNT : any;NIGHT_AMOUNT : any;EARNED_LEAVE : any;EL_START_DATE : any;PF_MEMBER : any;
  PF_PERCENT : any;PF_AMOUNT : any;HOUSE_RENT_DEDUCT : any;EMP_OT_ACTIVITY : any;
  CREATED_BY : any;LAST_PROMOTION_DEMOTION : any;LAST_INCREMENT_AMOUNT : any;AC_NO : any;
  BuyerMode : any;BUYER_SALARY : any;ExtraHour : any;Probation : any;ExtendProbation : any;
  SHIFT_STATUS : any;Workdays : any;RocketAC : any;Command : any;   LINE_ID: number;
   SHIFT_ID: number;JOINING_SALARY: number;PF_DATE: string;OTHERS_CAHRGES: number;
   ITDS: number;CONFIRM_DATE: string;DSG: string;ExtendConfirmdate: string;SECTION_ID: number;
   BUYER_JOINING: string;
  PERCENTAGE: number;
  CashAmount: number;
  PAY_CATEGORY: number;
  Benifit: number;
  InCahrgeCardNo: string;
  constructor() {
    this.EMP_TYPE = 0;
    this.EMP_ID = '';
    this.EMP_ACTIVITY = 0;
    this.Benifit = 0;
    this.EMP_NAME_ENG = 0;
    this.EMP_NAME_BNG = 0;
    this.DIVISION_ID = 0;
    this.DEPARTMENT_ID = 0;
    this.LINE_ID = 0;
    this.FLOOR_ID = 0;
    this.GROUP_ID = 0;
    this.DESIGNATION_ID = 0;
    this.EMP_CARD_NO = 0;
    this.ATTEND_DEVICE_NO = 0;
    this.EMP_STATUS = 0;
    this.LUNCH_TIME_END = 0;
    this.LUNCH_TIME_START = 0;
    this.SHIFT_ID = 0;
    this.SHIFT_START_DATE = 0;
    this.JOINING_DATE = '';
    this.GRADE_ID = 0;
    this.JOINING_SALARY = 0;
    this.PRESENT_SALARY = 0;
    this.HOLLYDAY_AMOUNT = 0;
    this.TIFFIN_AMOUNT = 0;
    this.NIGHT_AMOUNT = 0;
    this.EARNED_LEAVE = 0;
    this.EL_START_DATE = '';
    this.PF_MEMBER = 0;
    this.PF_DATE = '';
    this.PF_PERCENT = 0;
    this.PF_AMOUNT = 0;
    this.HOUSE_RENT_DEDUCT = 0;
    this.ITDS = 0;
    this.OTHERS_CAHRGES = 0;
    this.EMP_OT_ACTIVITY = 0;
    this.CREATED_BY = sessionStorage.getItem('empid');
    this.LAST_PROMOTION_DEMOTION = 0;
    this.LAST_INCREMENT_AMOUNT = 0;
    this.AC_NO = 0;
    this.BuyerMode = 0;
    this.DSG = '';
    this.BUYER_SALARY = 0;
    this.BUYER_JOINING = '';
    this.ExtraHour = 0;
    this.CONFIRM_DATE = '';
    this.InCahrgeCardNo = '';
    this.Probation = 0;
    this.ExtendProbation = 0;
    this.ExtendConfirmdate = '';
    this.SECTION_ID = 0;
    this.SHIFT_STATUS = 0;
    this.Workdays = 0;
    this.RocketAC = '';
    this.PERCENTAGE = 0;
    this.CashAmount = 0;
    this.PAY_CATEGORY = 0;
    this.Command = 0;
    this.DIVISION_ID=sessionStorage.getItem('zoneaccess');
  }

}
@Component({
  selector: 'app-add-employee-profile',
  templateUrl: './add-employee-profile.component.html',
  styleUrls: ['./add-employee-profile.component.css']
})
export class AddEmployeeProfileComponent implements OnInit, AfterViewInit {

  emp: any;
  gender: any;
  bloodgroups: any;
  nationality: any;
  bankinfo: any;
  maritalstatuses: any;
  religions: any;
  nationalities: any;
  employees: any;
  response: any;
  companies: any;
  departments: string[];
  designations: any;
  currentRoute: any;
  @Output() added = new EventEmitter<boolean>();
  @Input() id: number;
  editId: any;
  collapse1: boolean;
  sections: string[];
  grades: any;
  shifts: any;
  weeklyOffs: any;
  EMP_TYPE: any;
  EMP_ID : any;
  EMP_ACTIVITY : any;
  EMP_NAME_ENG : any;
  EMP_NAME_BNG : any;
  DIVISION_ID : any;
  DEPARTMENT_ID : any;
  LINE_ID : any;
  FLOOR_ID : any;
  GROUP_ID : any;
  DESIGNATION_ID : any;
  EMP_CARD_NO : any;
  ATTEND_DEVICE_NO : any;
  EMP_STATUS : any;
  LUNCH_TIME_START : any;
  LUNCH_TIME_END : any;
  SHIFT_ID : any;
  SHIFT_START_DATE : any;
  JOINING_DATE : any;
  GRADE_ID : any;
  JOINING_SALARY : any;
  PRESENT_SALARY : any;
  HOLLYDAY_AMOUNT : any;
  TIFFIN_AMOUNT : any;
  NIGHT_AMOUNT : any;
  EARNED_LEAVE : any;
  EL_START_DATE : any;
  PF_MEMBER : any;
  PF_DATE : any;
  PF_PERCENT : any;
  PF_AMOUNT : any;
  HOUSE_RENT_DEDUCT : any;
  ITDS : any;
  OTHERS_CAHRGES : any;
  EMP_OT_ACTIVITY : any;
  CREATED_BY : any;
  LAST_PROMOTION_DEMOTION : any;
  LAST_INCREMENT_AMOUNT : any;
  AC_NO : any;
  BuyerMode : any;
  DSG : any;
  BUYER_SALARY : any;
  BUYER_JOINING : any;
  ExtraHour : any;
  CONFIRM_DATE : any;
  Probation : any;
  ExtendProbation : any;
  ExtendConfirmdate : any;
  SECTION_ID : any;
  SHIFT_STATUS : any;
  Workdays : any;
  RocketAC : any;
  Command : any;
   empprofile: EmployeeProfile;
   unit: any;
   groups: any;
   employeesrecord: any;
  inchargecardno: any;
  inchargecardnos: any;
  empImage: any;
   base64Image: any;
   arrayForImage: Uint8Array;
   isImageLoading: boolean;
   card: any;
   hide=true;
  constructor(private _location: Location ,
              public api: ApiService,
              private route: ActivatedRoute, public modalService: SuiModalService, private router: Router, public sanitizer: DomSanitizer) {
    this.emp = new EmployeeProfile();
    this.isImageLoading = false;
    this.route.params.subscribe( params => {
      if (params.id) {
        this.editId = params.id;
        this.getEmpLoyees(params.id);
        this.getInChangeCardNos(params.id);
      }
    });
    this.router.events.subscribe(
        (event: any) => {
          if (event instanceof NavigationEnd) {
            this.currentRoute = this.router.url;
          }
        }
    );
    this.collapse1 = false;
  }
  imageToShow: any;

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
      // this.emp.DSG = this.imageToShow;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }
  async getEmpLoyees (id) {
   await this.api.getdata('employee-profiles/' +id).subscribe((res: any) => {
res.BUYER_JOINING = new Date(res.BUYER_JOINING);
res.SHIFT_START_DATE = new Date(res.SHIFT_START_DATE);
res.PF_DATE = new Date(res.PF_DATE);
res.JOINING_DATE = new Date(res.JOINING_DATE);
res.EL_START_DATE = new Date(res.EL_START_DATE);
      this.emp = res;
      this.api.getBlobThumbnail(`FileUploads/employees/download/${this.emp.EMP_CARD_NO.replace(/000+/, '')}.jpg`).subscribe((Response: any) => {

      this.createImageFromBlob(Response);
        this.isImageLoading = true;
     }, error => {
        this.isImageLoading = false;
        console.log(error);
      });
      console.log(res);
        this.api.getdata('employee-profiles/getInchargeCardNo?departmentid=' + res.DEPARTMENT_ID.replace('#', '|')).subscribe((resp: any) => {
        this.inchargecardno = resp;
        console.log(this.inchargecardno)
     });
    }, err => {  console.log(err);});

   await this.api.getdata('employee-profiles/getInchargeCardNoOnEdit?empcardno=' +id).subscribe((res: any) => {
      this.emp.InCahrgeCardNo = res[0].INC_CARDNO;
      console.log(this.emp.InCahrgeCardNo);
    }, err => {    console.log(err);  });
 //    await this.api.getdata('employee-profiles/getImageOnEdit?empcardno=' +id).subscribe((resp: any) => {
 //      console.log(resp);
 //      if (resp.length >0 ) {let array = new Uint8Array(resp[0].EMP_PHOTO.data);
 //        const char = array.reduce((data, byte)=> {return data + String.fromCharCode(byte);},'');
 //        let base64String = btoa(char);
 //          this.empImage = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + base64String);
 //      } else {this.api.showWarningToast('No Photo Found');}
 //      console.log(this.empImage);
 // }, err => {    console.log(err);  });
  }

  getUnit() {
    this.api.getdata('employee-profiles/getUnit').subscribe((res: any) => {
      this.unit = res;
      console.log(res);
    }, err => {
      console.log(err);
    });
    // this.unit=sessionStorage.getItem('zoneaccess');
    // this.hide=true;
  }
  getUnitSpec() {
    this.api.getdata('employee-profiles/getUnitSpec?unit=' +sessionStorage.getItem('zoneaccess') ).subscribe((res: any) => {
      this.unit = res;
      console.log(res);
    }, err => {
      console.log(err);
    });
    // this.unit=sessionStorage.getItem('zoneaccess');
    // this.hide=true;
  }
  getInChangeCardNo() {
    this.api.getdata('employee-profiles/getInchargeCardNo?departmentid=' + encodeURIComponent(this.emp.DEPARTMENT_ID)).subscribe((resp: any) => {
       this.inchargecardno = resp;
      //  const cardno = this.inchargecardno.forEach(element => {
      //    return element[1];
      //  });
      //  console.log(cardno);
       console.log(this.inchargecardno)
    });
  } 
  getInChangeCardNos(id) {
    this.api.getdata('employee-profiles/getInchargeCardNo?departmentid=' +id).subscribe((resp: any) => {
       this.emp.InCahrgeCardNo = resp.EMP_CARD_NO;
       console.log(this.emp.InCahrgeCardNo)
    });
  }
  getPresentSalary() {
    this.emp.PRESENT_SALARY = this.emp.JOINING_SALARY;
  }
  searchRecord() {
    this.api.getdata('employee-profiles/searchdata?cardno=' + this.emp.EMP_CARD_NO).subscribe((res: any) => {
      this.employeesrecord = res.map(data => data.IDNo);
      console.log(this.employeesrecord)
    }, error2 => {
      console.log(error2);
    });
  }
  // async changeListener($event) {
  // await  fileUpload($event)
  //       .then((data) => {
  //        this.base64Image = data.base64;
  //        console.log(this.base64Image);
  //       })
  //   let binary_string = window.atob(this.base64Image);
  //   console.log(binary_string);
  //   let len = binary_string.length;
  //   console.log(len);
  //    this.arrayForImage = new Uint8Array(new ArrayBuffer(len));
  //   console.log(this.arrayForImage);
  //   for(let i = 0; i < len; i++) {
  //     this.arrayForImage[i] = binary_string.charCodeAt(i);
  //   }
  //   return this.arrayForImage;
  // }
  // insertImage = () => {
  //   setTimeout(() => {
  //     let data = {
  //       EMP_ID: 'EMP#001260',
  //       EMP_PHOTO: this.arrayForImage
  //
  //     }
  //     this.api.postdata('psn-employee-photos', data).subscribe((res: any) => {
  //       console.log(res);
  //     }, error2 => {
  //       console.log(error2);
  //     });
  //   },1500);
  //
  //
  // }


  patch(form: NgForm) {
    if (!this.emp.EMP_NAME_ENG) {
      this.api.showWarningToast('Name required', '');
      return ;

    }  else if (!this.emp.JOINING_DATE) {
      this.api.showWarningToast('Joining Date required', '');
      return;

    } else if (!this.emp.DEPARTMENT_ID) {
      this.api.showWarningToast('Department required', '');
      return;

    } else if (!this.emp.DESIGNATION_ID) {
      this.api.showWarningToast('Designation required', '');
      return;

    } else if (!this.emp.JOINING_SALARY) {
      this.api.showWarningToast('Joining Salary required', '');
      return;

    } else if (!this.emp.SHIFT_ID) {
      this.api.showWarningToast('Employee Shift required', '');
      return;

    }  else if (!this.emp.GROUP_ID ) {
      this.api.showWarningToast('Group required', '');
      return;

    }   else if (!this.emp.SECTION_ID) {
      this.api.showWarningToast('Section required', '');
      return;

    }  else if (!this.emp.SHIFT_START_DATE) {
      // console.log(new Date(-15,0,1));
      this.api.showWarningToast('Date of Birth  required', '');
      return;

    }
    else if (!this.emp.BUYER_JOINING ) {
      this.api.showWarningToast('BUYER JOINING Date required', '');
      return;

    } else if ( new Date(this.emp.SHIFT_START_DATE) > new Date(2005, 0, 1)) {
      this.api.showWarningToast('Under Age Not Allowed(less than 15 year)', '');
      return;

    } else if (!this.emp.EMP_STATUS) {
      this.api.showWarningToast('Employee Status required', '');
      return;

    }else if (!this.emp.EMP_ACTIVITY) {
      this.api.showWarningToast('Active Status required', '');
      return;

    } else if (this.employeesrecord.length !== 0) {
      this.api.showWarningToast('Card No. Already Exist', '');
      return;

    }
    if (this.emp.EMP_ACTIVITY == true) {
      this.emp.EMP_ACTIVITY =1;
    } else {
      this.emp.EMP_ACTIVITY =0;
    }
    if (this.emp.Benifit == true) {
      this.emp.Benifit =1;
    } else {
      this.emp.Benifit =0;
    }
    if (this.emp.EMP_OT_ACTIVITY == true) {
      this.emp.EMP_OT_ACTIVITY =1;
    } else {
      this.emp.EMP_OT_ACTIVITY =0;
    } if (this.emp.BuyerMode == true) {
      this.emp.BuyerMode =1;
    } else {
      this.emp.BuyerMode =0;
    }
    if (this.emp.PF_MEMBER == true) {
      this.emp.PF_MEMBER =1;
    } else {
      this.emp.PF_MEMBER =0;
    }
this.emp.EMP_PHOTO = this.arrayForImage;
    this.emp.BUYER_JOINING = new Date(this.emp.BUYER_JOINING.getTime() + 6 * 3600 * 1000);
    this.emp.SHIFT_START_DATE = new Date(this.emp.SHIFT_START_DATE.getTime() + 6 * 3600 * 1000);
    this.emp.JOINING_DATE = new Date(this.emp.JOINING_DATE.getTime() + 6 * 3600 * 1000);
    if (this.emp.PF_DATE) {
      this.emp.PF_DATE = new Date(this.emp.PF_DATE.getTime() + 6 * 3600 * 1000);
    } else {
      this.emp.PF_DATE = '';
    }
    if (this.emp.EL_START_DATE) {
      this.emp.EL_START_DATE = new Date(this.emp.EL_START_DATE.getTime() + 6 * 3600 * 1000);
    } else {
      this.emp.EL_START_DATE = '';
    }
    this.api.patchdata('employee-profiles/insertEmployeeProfile', this.emp).subscribe((res: any) => {
      this.response = res;
      console.log(res);
      this.api.showSuccessToast('Employee Added Successfully');
      this.added.emit(true);
      this.router.navigateByUrl(`hrm/hrmMaster/employee-personal/${this.emp.EMP_CARD_NO}`);
      // form.resetForm();
      delete (this.emp.imagepath);
    }, err => {
      this.api.showFailureToast('Error', err.message);
      console.log(err);
    });
  }

  updateEmp() {
    if (!this.emp.EMP_NAME_ENG) {
      this.api.showWarningToast('Name required', '');
      return ;

    }  else if (!this.emp.JOINING_DATE) {
      this.api.showWarningToast('Joining Date required', '');
      return;

    } else if (!this.emp.DEPARTMENT_ID) {
      this.api.showWarningToast('Department required', '');
      return;

    } else if (!this.emp.DESIGNATION_ID) {
      this.api.showWarningToast('Designation required', '');
      return;

    } else if (!this.emp.JOINING_SALARY) {
      this.api.showWarningToast('Joining Salary required', '');
      return;

    } else if (!this.emp.SHIFT_ID) {
      this.api.showWarningToast('Employee Shift required', '');
      return;

    }  else if (!this.emp.GROUP_ID ) {
      this.api.showWarningToast('Group required', '');
      return;

    }  else if (!this.emp.BUYER_JOINING ) {
      this.api.showWarningToast('BUYER JOINING Date required', '');
      return;

    }   else if (!this.emp.SECTION_ID) {
      this.api.showWarningToast('Section required', '');
      return;

    }   else if (!this.emp.SHIFT_START_DATE) {
      this.api.showWarningToast('Date of Birth  required', '');
      return;

    } else if ( new Date(this.emp.SHIFT_START_DATE) > new Date(2005, 0, 1) ) {
      this.api.showWarningToast('Under Age Not Allowed(less than 15 year)', '');
      return;

    } else if (!this.emp.EMP_STATUS) {
      this.api.showWarningToast('Employee Status required', '');
      return;

    } else if (!this.emp.EMP_ACTIVITY) {
      this.api.showWarningToast('Active Status required', '');
      return;

    }
    if (this.emp.EMP_ACTIVITY == true) {
      this.emp.EMP_ACTIVITY =1;
    } else {
      this.emp.EMP_ACTIVITY =0;
    }
    if (this.emp.Benifit == true) {
      this.emp.Benifit =1;
    } else {
      this.emp.Benifit =0;
    }
    if (this.emp.EMP_OT_ACTIVITY == true) {
      this.emp.EMP_OT_ACTIVITY =1;
    } else {
      this.emp.EMP_OT_ACTIVITY =0;
    } if (this.emp.BuyerMode == true) {
      this.emp.BuyerMode =1;
    } else {
      this.emp.BuyerMode =0;
    }
    if (this.emp.PF_MEMBER == true) {
      this.emp.PF_MEMBER =1;
    } else {
      this.emp.PF_MEMBER =0;
    }
    this.emp.ExtendConfirmdate = '';
    this.emp.CONFIRM_DATE = '';
    // if (!this.emp.RocketAC) {
    //   this.emp.RocketAC = 0;
    // }
    this.emp.BUYER_JOINING = new Date(this.emp.BUYER_JOINING.getTime() + 6 * 3600 * 1000);
    this.emp.SHIFT_START_DATE = new Date(this.emp.SHIFT_START_DATE.getTime() + 6 * 3600 * 1000);
    this.emp.JOINING_DATE = new Date(this.emp.JOINING_DATE.getTime() + 6 * 3600 * 1000);
    if (this.emp.PF_DATE) {
      this.emp.PF_DATE = new Date(this.emp.PF_DATE.getTime() + 6 * 3600 * 1000);
    } else {
      this.emp.PF_DATE = '';
    }
    if (this.emp.EL_START_DATE) {
      this.emp.EL_START_DATE = new Date(this.emp.EL_START_DATE.getTime() + 6 * 3600 * 1000);
    } else {
      this.emp.EL_START_DATE = '';
    }
    this.api.patchdata('employee-profiles/updateEmployeeProfile', this.emp).subscribe((res: any) => {
      this.response = res;
      // this.emp = new Employee();
      this.api.showSuccessToast('Employee Updated Successfully', this.response.message);
      this.added.emit(true);
      delete (this.emp.imagepath);
      this.router.navigateByUrl('hrm/hrmMaster/employee-profile');
    }, err => {
      this.api.showFailureToast('Error', err.message);
      console.log(err);
    });
  }

  handleFileInput(files: FileList) {
    const file = files.item(0);
    const folder = 'employees';
    console.log(files.item(0));
    // const newfilename = files.item(0).name.replace(`${this.emp.EMP_CARD_NO.replace(/000+/, '')}.jpg`, ``)
    this.isImageLoading = true;
    this.api.uploadFile(folder, file).subscribe((res: any) => {
      this.imageToShow = 'fileuploads/' + folder +  '/download/' + file.name;
      // console.log("base64 :",this.empImage.base64);
    }, err => {
      console.log(err);
    });
  }

  getDepartment() {
    this.api.getdata('employee-profiles/getDepartment').subscribe((res: any) => {
      this.departments = res;
      // console.log(res);
    }, error2 => {
      console.log(error2);
    });
  }
  getDesignation() {
    this.api.getdata('employee-profiles/getDesignation').subscribe((res: any) => {
      this.designations = res;
      // console.log(res);
    }, error2 => {
      console.log(error2);
    });
  }
  getSection() {
    this.api.getdata('employee-profiles/getSection').subscribe((res: any) => {
      this.sections = res;
      // console.log(res);
    }, error2 => {
      console.log(error2);
    });
  }
  getGroup() {
    this.api.getdata('employee-profiles/getGroup').subscribe((res: any) => {
      this.groups = res;
      // console.log(res);
    }, error2 => {
      console.log(error2);
    });
  }
  getShift() {
    this.api.getdata('employee-profiles/getShift').subscribe((res: any) => {
      this.shifts = res;
      // console.log(res);
    }, error2 => {
      console.log(error2);
    });
  }
  getGrade() {
    this.api.getdata('employee-profiles/getGrade').subscribe((res: any) => {
      this.grades = res;
      // console.log(res);
    }, error2 => {
      console.log(error2);
    });
  }
ngAfterViewInit() {

}

  ngOnInit() {
   console.log(new Date(this.emp.SHIFT_START_DATE) > new Date(2005, 0, 1));
    this.getDepartment();
    this.getDesignation();
    this.getInChangeCardNo();
    this.getGrade();
    this.getGroup();
    this.getSection();
    this.getShift();
    if (sessionStorage.getItem('zoneaccess')=='All')
    {
     this.getUnit();
    }
   else
   {
     this.getUnitSpec();
   }
    // this.getUnit();
    if (this.id) {
      this.getEmpLoyees(this.id);
    }
    if (this.editId) {
      this.getEmpLoyees(this.editId);
    }
  }


  toggleCollapse1() {
    this.collapse1 = !this.collapse1;
  }
}
