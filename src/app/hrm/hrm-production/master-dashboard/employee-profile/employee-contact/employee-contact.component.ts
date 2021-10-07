import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Location} from "@angular/common";
import {ApiService} from "../../../../../api.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {SuiModalService} from "ng2-semantic-ui";
import {NgForm} from "@angular/forms";
export class EmployeeContact{
  CardNo: any;
  PRESENT_ADD_ENG: any;
  PRESENT_ADD_CITY_ENG: any;
  PRESENT_ADD_ZIP: any;
  PRESENT_ADD_PHONE: any;
  PRESENT_ADD_BNG: any;
  PRESENT_ADD_CITY_BNG: any;
  PER_ADD_ENG: any;
  PER_ADD_DIST_ENG: any;
  PER_ADD_ZIP: any;
  PER_ADD_PHONE: any;
  PER_ADD_BNG: any;
  PER_ADD_DIST_BNG: any;
  NATIONAL_ID_NO: any;
  EMAIL_ADD: any;
  PASSPORT_NO: any;
  BANK_ACCOUNT_NO: any;
  BANK_AC_ACTIVITY: any;
  DRIVING_LICENSE_NO: any;
  EMER_CONT_NAME_ENG: any;
  EMER_CONT_PHONE: any;
  EMER_CONT_REL_ENG: any;
  EMER_CONT_NAME_BNG: any;
  EMPR_CONT_REL_BNG: any;
  UPDATED_BY: any;

  constructor() {
    this.CardNo = 0;
    this.PRESENT_ADD_ENG = 0;
    this.PRESENT_ADD_CITY_ENG = 0;
    this.PRESENT_ADD_ZIP = 0;
    this.PRESENT_ADD_PHONE = 0;
    this.PRESENT_ADD_BNG = 0;
    this.PRESENT_ADD_CITY_BNG = 0;
    this.PER_ADD_ENG = 0;
    this.PER_ADD_DIST_ENG = 0;
    this.PER_ADD_ZIP = 0;
    this.PER_ADD_PHONE = 0;
    this.PER_ADD_BNG = 0;
    this.PER_ADD_DIST_BNG = 0;
    this.NATIONAL_ID_NO = 0;
    this.EMAIL_ADD = 0;
    this.PASSPORT_NO = 0;
    this.BANK_ACCOUNT_NO = 0;
    this.BANK_AC_ACTIVITY = 0;
    this.DRIVING_LICENSE_NO = 0;
    this.EMER_CONT_NAME_ENG = 0;
    this.EMER_CONT_PHONE = 0;
    this.EMER_CONT_REL_ENG = 0;
    this.EMER_CONT_NAME_BNG = 0;
    this.EMPR_CONT_REL_BNG = 0;
    this.UPDATED_BY = 0;
  }


}
declare let $: any;

@Component({
  selector: 'app-employee-contact',
  templateUrl: './employee-contact.component.html',
  styleUrls: ['./employee-contact.component.css']
})
export class EmployeeContactComponent implements OnInit {
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

  employeeTypes = [
    { type: 'Worker', value: '0' }, { type: 'Officer', value: '1' }, { type: 'Staff', value: '2' }
  ];
  grades: any;
  shifts: any;
  weeklyOffs: any;

  constructor(private _location: Location , public api: ApiService, private route: ActivatedRoute, public modalService: SuiModalService, private router: Router) {
    this.emp = new EmployeeContact();

    this.route.params.subscribe( params => {
      if (params.id) {
        this.editId = params.id;
        this.getEmpLoyees(params.id);
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
  preview() {
    $('.woven').modal('setting', 'closable', false).modal({centered: false,  onDeny    : function() {
        return false;
      }}).modal('toggle');
  }
  getEmpLoyees (id) {
    this.api.getdata('employee-contacts/getContact?cardno=' +id).subscribe((res: any) => {
      if (res.length > 0) {
        this.emp = res[0];
      } else {
        this.api.showInfoToast('No data on this Card No.');
      }
      console.log(res);

    }, err => {
      console.log(err);
    });
  }

  getEmp() {
    this.api.getdata('EmployeePersonalInfos?filter[limit]=20').subscribe((res: any) => {
      this.employees = res;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

  patch(form: NgForm) {
    // if (!this.emp.prevempId) {
    //   this.api.showWarningToast('Employee No. required', '');
    //   return ;
    //
    // }  else if (!this.emp.firstname) {
    //   this.api.showWarningToast('First Name required', '');
    //   return;
    //
    // } else if (!this.emp.sex) {
    //   this.api.showWarningToast('Gender required', '');
    //   return;
    //
    // } else if (!this.emp.dob) {
    //   this.api.showWarningToast('D.O.B. required', '');
    //   return;
    //
    // } else if (!this.emp.religion) {
    //   this.api.showWarningToast('Religion required', '');
    //   return;
    //
    // } else if (!this.emp.maritalstatus) {
    //   this.api.showWarningToast('Marital Status required', '');
    //   return;
    //
    // }  else if (!this.emp.empidentificationtypeid || this.emp.empidentificationtypeid === 0 ) {
    //   this.api.showWarningToast('Identification Type required', '');
    //   return;
    //
    // }   else if (!this.emp.idno) {
    //   this.api.showWarningToast('National Id No. required', '');
    //   return;
    //
    // }  else if (!this.emp.identificationmark) {
    //   this.api.showWarningToast('Identification Mark required', '');
    //   return;
    //
    // }
    if (this.emp.BANK_AC_ACTIVITY == true) {
      this.emp.BANK_AC_ACTIVITY =1;
    } else {
      this.emp.BANK_AC_ACTIVITY =0;
    }
    this.emp.CardNo = this.editId;
    this.api.patchdata('employee-contacts/insertEmployeeContact', this.emp).subscribe((res: any) => {
      this.response = res;
      this.api.showSuccessToast('Employee Added Successfully', this.response.message);
      this.added.emit(true);
      form.resetForm();
      this.router.navigateByUrl(`hrm/hrmMaster/employee-education/${this.editId}`);
      delete (this.emp.imagepath);
    }, err => {
      this.api.showFailureToast('Error', err.message);
      console.log(err);
    });
  }

  mapEMPdata(element) {
    return {
      empId: element.empId,
      sex: element.sex,
      firstname: element.firstname,
      middlename: element.middlename,
      lastname: element.lastname,
      fathersname: element.fathersname,
      mothersname: element.mothersname,
      maritalstatus: element.maritalstatus,
      dob: element.dob,
      bloodgroup: element.bloodgroup,
      nationality: element.nationality,
      empidentificationtypeid: element.empidentificationtypeid,
      idno: element.idno,
      identificationmark: element.identificationmark,
      departmentId: element.departmentId,
      religion: element.religion,
      empfullnameinbangla: element.empfullnameinbangla,
      prevempId: element.prevempId
    };
  }

  updateEmp() {
    if (this.emp.BANK_AC_ACTIVITY == true) {
      this.emp.BANK_AC_ACTIVITY =1;
    } else {
      this.emp.BANK_AC_ACTIVITY =0;
    }
    this.emp.CardNo = this.editId;
    this.api.patchdata('employee-contacts/updateEmployeeContact', this.emp).subscribe((res: any) => {
      this.response = res;
      this.api.showSuccessToast('Employee Added Successfully', this.response.message);
      this.added.emit(true);
    }, err => {
      this.api.showFailureToast('Error', err.message);
      console.log(err);
    });
  }

  handleFileInput(files: FileList) {
    const file = files.item(0);
    const folder = 'employees';
    console.log(file);
    // this.emp.imagePath = file.name;
    this.api.uploadFile(folder, file).subscribe((res: any) => {
      this.emp.imagepath = 'fileuploads/' + folder +  '/download/' + file.name;
    }, err => {
      console.log(err);
    });
  }

  getGender() {
    this.api.getdata('lovData?filter[where][lovtype]=Sex').subscribe((res: any) => {
      this.gender = res;
      console.log(res);
    }, error2 => {
      console.log(error2);
    });
  }

  getNationality() {
    this.api.getdata('lovData?filter[where][lovtype]=Nationality').subscribe((res: any) => {
      this.nationalities = res;
      this.emp.nationality = this.nationalities[14].id;
      console.log(res);
    }, error2 => {
      console.log(error2);
    });
  }

  getBloodGrp() {
    this.api.getdata('lovData?filter[where][lovtype]=Blood Group').subscribe((res: any) => {
      this.bloodgroups = res;
      console.log(res);
    }, error2 => {
      console.log(error2);
    });
  }

  getMaritalstatus() {
    this.api.getdata('lovData?filter[where][lovtype]=Marital Status').subscribe((res: any) => {
      this.maritalstatuses = res;
      console.log(res);
    }, error2 => {
      console.log(error2);
    });
  }

  getReligions() {
    this.api.getdata('lovData?filter[where][lovtype]=Religion').subscribe((res: any) => {
      this.religions = res;
      console.log(res);
    }, error2 => {
      console.log(error2);
    });
  }

  updateSelection (domName, selectionText) {
    document.getElementsByName(domName)[0].firstChild['value'] = selectionText;
    document.getElementsByName(domName)[0].childNodes[2]['innerHTML'] = '';
  }

  ngOnInit() {
    if (this.id) {
      this.getEmpLoyees(this.id);
    }
    this.getEmp();
    this.getGender();
    this.getMaritalstatus();
    this.getReligions();
    this.getBloodGrp();
    this.getNationality();
    if (this.editId) {
      this.getEmpLoyees(this.editId);
      setTimeout(() => {
        // if (this.emp.maritalstatus) {
        //   this.updateSelection('Mstatus', this.emp.maritalstatus1.listitem);
        //   this.emp.maritalstatus = this.emp.maritalstatus1.id;
        // }
        // if (this.emp.sex) {
        //   this.updateSelection('gender', this.emp.sex2.listitem);
        //   this.emp.sex = this.emp.sex2.id;
        // }
        //
        // if (this.emp.bloodgroup) {
        //   this.updateSelection('bloodGroup', this.emp.bloodgroup1.listitem);
        //   this.emp.bloodgroup = this.emp.bloodgroup1.id;
        // }

        console.log('timeout called at 1000');
      }, 2000);
    }

    //this.getCompany();
    this.api.getdata('employee-attendences/departments').subscribe((res: string[]) => this.departments = res);
    this.api.getdata('icg-sections').subscribe((res: string[]) => this.sections = res);
    this.api.getdata('comp' ).subscribe( (res: any) => this.companies = res);
    this.getDesignations();
    this.api.getdata('config-lovs?filter[where][lovType]=grade' ).subscribe( (res: any) => this.grades = res);
    this.api.getdata('config-lovs?filter[where][lovType]=shift' ).subscribe( (res: any) => this.shifts = res);
    this.api.getdata('config-lovs?filter[where][lovType]=WeeklyOff' ).subscribe( (res: any) => this.weeklyOffs = res);
  }


  toggleCollapse1() {
    this.collapse1 = !this.collapse1;
  }

  // getCompany() {
  //   this.api.getdata('comp' ).subscribe( (res: any) => { this.companies = res;});
  // }

  getDesignations(search: string = null) {
    let link = 'desig?filter[limit]=50';
    if(search) link += '&filter[where][designation][like]=%' + search + '%';
    this.api.getdata(link).subscribe((res: any[]) => this.designations = res);
  }


}
