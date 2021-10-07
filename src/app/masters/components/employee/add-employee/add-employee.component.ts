import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {SuiModalService} from 'ng2-semantic-ui';
import {ApiService} from '../../../../api.service';
import {Employee} from '../../../models/employee';
declare var $: any;
import {NgForm} from '@angular/forms';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
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
    this.emp = new Employee();

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

  getEmpLoyees (id) {
    this.api.getdata('EmployeePersonalInfos/' + id + '?filter[include]=sex2&filter[include]=maritalstatus1&filter[include]=nationality1&filter[include]=bloodgroup1' ).subscribe((res: any) => {
      this.emp = res;

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
    if (!this.emp.prevempId) {
      this.formValidation();
      this.api.showWarningToast('Employee No. required', '');
      return ;

    }  else if (!this.emp.firstname) {
        this.formValidation();
        this.api.showWarningToast('First Name required', '');
        return;

    } else if (!this.emp.sex) {
        this.formValidation();
        this.api.showWarningToast('Gender required', '');
        return;

    } else if (!this.emp.dob) {
        this.formValidation();
        this.api.showWarningToast('D.O.B. required', '');
        return;

    } else if (!this.emp.religion) {
        this.formValidation();
        this.api.showWarningToast('Religion required', '');
        return;

    } else if (!this.emp.maritalstatus) {
        this.formValidation();
        this.api.showWarningToast('Marital Status required', '');
        return;

    }  else if (!this.emp.empidentificationtypeid || this.emp.empidentificationtypeid === 0 ) {
        this.formValidation();
        this.api.showWarningToast('Identification Type required', '');
        return;

    }   else if (!this.emp.idno) {
        this.formValidation();
        this.api.showWarningToast('National Id No. required', '');
        return;

    }  else if (!this.emp.identificationmark) {
      this.formValidation();
      this.api.showWarningToast('Identification Mark required', '');
      return;

    }
    this.api.patchdata('EmployeePersonalInfos', this.emp).subscribe((res: any) => {
      this.response = res;
      this.api.showSuccessToast('Employee Added Successfully', this.response.message);
      this.added.emit(true);
      form.resetForm();
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
    delete (this.emp.sex2);
    delete (this.emp.maritalstatus1);
    delete (this.emp.bloodgroup1);
    delete (this.emp.nationality1);
    // delete (this.emp.dob);
    this.api.putdata('EmployeePersonalInfos', this.emp).subscribe((res: any) => {
      this.response = res;
      // this.emp = new Employee();
      this.api.showSuccessToast('Employee Updated Successfully', this.response.message);
      this.added.emit(true);
      delete (this.emp.imagepath);
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

  formValidation() {
    $('.ui.form')
      .form({
        no: {
          identifier: 'no',
          rules: [
            {
              type: 'empty',
              prompt: '{name} must have a value'
            }
          ]
        },
        Fname: {
          identifier: 'Fname',
          rules: [
            {
              type: 'empty',
              prompt: '{name} must have a value'
            }
          ]
        },
        gender: {
          identifier: 'gender',
          rules: [
            {
              type: 'empty',
              prompt: '{name}  must have a value'
            }
          ]
        } ,
        DOBDate: {
          identifier: 'DOBDate',
          rules: [
            {
              type: 'empty',
              prompt: '{name}  must have a value'
            }
          ]
        },
        Idtype: {
          identifier: 'Idtype',
          rules: [
            {
              type: 'empty',
              prompt: '{name}  must have a value'
            }
          ]
        },
        IdNo: {
          identifier: 'IdNo',
          rules: [
            {
              type: 'empty',
              prompt: '{name}  must have a value'
            }
          ]
        },
        IdentityMarks: {
          identifier: 'IdentityMarks',
          rules: [
            {
              type: 'empty',
              prompt: '{name}  must have a value'
            }
          ]
        },
      }, {
        on: 'blur',
        inline: 'true'
      });
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
