import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../../api.service';
import {SuiModalService} from 'ng2-semantic-ui';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ShowDetail} from '../../../templates/show-detail/show-detail.component';
import {ConfirmModal} from '../../../templates/confirm-modal/confirm-modal.component';
import {EditDetail} from '../../../templates/edit-detail/edit-detail.component';
import {Employee} from '../../models/employee';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
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
  emp: any;
  url = 'EmployeePersonalInfos';
  meta: {
    totalItemCount: number,
    totalPageCount: number,
    itemsPerPage: number,
    currentPage: number,
    nextPage: number,
  };
  @ViewChild('searchBox') searchBox;

  constructor(private _location: Location , public api: ApiService, public modalService: SuiModalService, private route: ActivatedRoute , private router: Router) {
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
    this.emp = new Employee();
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = this.router.url;
        }
      }
    );
  }
  edit(id) {
    console.log(id);
    this.modalService
      .open(new EditDetail('Edit Employee', 'employee', id))
      .onApprove(() => {

      })
      .onDeny(() => {
        console.log();
      });
  }


  alert(id): void {
    console.log(id);
    this.modalService
      .open(new ShowDetail('Employee Details', 'employee', id))
      .onApprove(() => {
      })
      .onDeny(() => {
        console.log();
      });
  }

  optionsSearch = (query) => {
    this.searchBox.dropdownService.setOpenState(true);
    return this.api.getdata('EmployeePersonalInfos?filter={ "where":{"firstname":{"like":"%25' + query + '%25"}}}').toPromise();
  }
  ngOnInit() {
    this.employees = [];
    this.selectedEmployees = [];
    this.meta.currentPage = 1;
    // this.getItemCount();
    this.get();
    // this.getCount();
  }
  getItemCount() {
    let filter: any = {};
    filter['employeeid'] = this.emp.empId;
    filter = JSON.stringify(filter);
    this.api.getdata('EmployeePersonalInfos/count?where=' + filter ).subscribe( (res: any) => {
      this.collectionSize = res.count;
      this.meta.currentPage = 1;
      this.get();
    }, err => {
      console.log(err);
    });
  }
  goToPageNo() {
    this.meta.currentPage = this.goToPage;
    this.get();
  }
  // getFilterUrl() {
  //   const filter: any = {};
  //   filter['where'] = {};
  //   filter['include'] = ['sex', 'maritalstatus', 'religion', 'nationality', 'bloodgroup'];
  //   filter['order'] = 'empId DESC';
  //   if (this.emp.sex) {
  //     filter['where']['lovid'] = this.emp.lovid;
  //   }
  //   if (this.emp.maritalstatus) {
  //     filter['where']['maritalstatus'] = this.emp.maritalstatus;
  //   }
  //   if (this.emp.religionId) {
  //     filter['where']['religionId'] = this.emp.religionId;
  //   }
  //   if (this.emp.nationality) {
  //     filter['where']['nationality'] = this.emp.nationality;
  //   } if (this.emp.bloodgroup) {
  //     filter['where']['bloodgroup'] = this.emp.bloodgroup;
  //   }
  //   return filter;
  // }
  // selectAll() {
  //   this.selectedEmployees = [];
  //   if (this.selectAllEmployee) {
  //     this.employees.forEach(item => {
  //       item.selected = true;
  //       this.selectedEmployees.push(item);
  //     });
  //   } else {
  //     this.employees.forEach(item => {
  //       item.selected = false;
  //     });
  //     this.selectedEmployees = [];
  //   }
  // }
  // selectEmployees(item, i) {
  //   if (item.selected) {
  //     this.selectedEmployees.push(item);
  //   } else {
  //     this.selectedEmployees.splice(i, 1);
  //     this.selectAllEmployee = false;
  //   }
  // }
  // get(search?: boolean) {
  //   this.selectAllEmployee = false;
  //   if (search) {
  //     this.meta.currentPage = 1;
  //   }
  //   this.api.getdata('EmployeePersonalInfos?page=' + this.meta.currentPage + '&filter=' + JSON.stringify(this.getFilterUrl())).subscribe((res: any) => {
  //     this.employees = res.data;
  //     this.meta = res.meta;
  //     console.log(res);
  //   }, error1 => {
  //     console.log('Class: , Line:  error1 ', error1);
  //   });
  // }
  getFilterUrl() {
    const filter: any = {};
    filter['where'] = {};
    filter['include'] = ['sex2', 'maritalstatus1', 'ReligionDetails', 'nationality1', 'bloodgroup1'];
    filter['order'] = 'empId DESC';
    if (this.emp.sex) {
      filter['where']['lovtype'] = this.emp.sex;
    }
    if (this.emp.clientid) {
      filter['where']['clientid'] = this.emp.clientid;
    }
    if (this.emp.productsubcategoryid) {
      filter['where']['productsubcategoryid'] = this.emp.productsubcategoryid;
    }
    if (this.emp.genspcStatus) {
      filter['where']['genspcStatus'] = this.emp.genspcStatus;
    }
    return filter;
  }
  selectAll() {
    this.selectedEmployees = [];
    if (this.selectAllEmployee) {
      this.employees.forEach(item => {
        item.selected = true;
        this.selectedEmployees.push(item);
      });
    } else {
      this.employees.forEach(item => {
        item.selected = false;
      });
      this.selectedEmployees = [];
    }
  }
  selectEmployees(item, i) {
    if (item.selected) {
      this.selectedEmployees.push(item);
    } else {
      this.selectedEmployees.splice(i, 1);
      this.selectAllEmployee = false;
    }
  }
  get(search?: boolean) {
    this.selectAllEmployee = false;
    if (search) {
      this.meta.currentPage = 1;
    }
    this.api.getdata('EmployeePersonalInfos?page=' + this.meta.currentPage + '&filter=' +
      JSON.stringify(this.getFilterUrl())).subscribe((res: any) => {
      this.employees = res.data;
      this.meta = res.meta;
      console.log(res);
    }, error2 => {
      console.log(error2);
    });
  }

  viewDetail(id) {
    console.log(id);
    this.modalService
      .open(new ShowDetail('Employee Details', 'employee', id))
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
        this.api.deletedata('EmployeePersonalInfos', id).subscribe((res: any) => {
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
  backClicked() {
    this._location.back();
  }
  mapData(emp) {
    return {
      prevempId: emp.prevempId,
      firstname: emp.firstname,
      empfullnameinbangla: emp.empfullnameinbangla,
      fathersname: emp.fathersname,
      mothersname: emp.mothersname,
      fullnameinbangla: emp.empfullnameinbangla,
      dob : new Date(emp.dob).toLocaleDateString('en-US'),
      sex2: emp.sex2 ? emp.sex2.listitem : '',
      bloodgroup1: emp.bloodgroup1 ? emp.bloodgroup1.listitem : '',
      maritalstatus1: emp.maritalstatus1 ? emp.maritalstatus1.listitem : '',
      nationality1: emp.nationality1 ? emp.nationality1.listitem : '',
      ReligionDetails: emp.ReligionDetails ? emp.ReligionDetails.listitem : '',
      idno: emp.idno,
      empidentificationtypeid: emp.empidentificationtypeid,
      identificationmark: emp.identificationmark,
    };
  }
  exporttoExcel(pageRange?: boolean): void {
    const fileName = 'Employee';
    const columns = [
      { header: 'Emp No', key: 'prevempId', width: 15 },
      { header: 'Full Name', key: 'firstname', width: 25 },
      { header: 'Name in Bangla ', key: 'empfullnameinbangla', width: 25 },
      { header: 'Father Name', key: 'fathersname', width: 15 },
      { header: 'Mother Name', key: 'mothersname', width: 15 },
      { header: 'Name in Bangla', key: 'fullnameinbangla', width: 15 },
      { header: 'DOB', key: 'dob', width: 15 },
      { header: 'Gender', key: 'sex2', width: 15 },
      { header: 'Blood Group', key: 'bloodgroup1', width: 15 },
      { header: 'Marital Status', key: 'maritalstatus1', width: 15 },
      { header: 'Nationality', key: 'nationality1', width: 15 },
      { header: 'Religion', key: 'ReligionDetails', width: 15 },
      { header: 'National Id ', key: 'idno', width: 15 },
      { header: 'Identification Type', key: 'empidentificationtypeid', width: 15 },
      { header: 'Identification Mark', key: 'identificationmark', width: 15 },
    ];
    if (pageRange) {
      if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
        return;
      }
      const url = this.getFilterUrl();
      url['order'] = 'empId DESC';
      url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
      url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
      this.api.getdata('EmployeePersonalInfos?filter=' + JSON.stringify(url)).subscribe((res: any) => {
        this.api.exportToExcel(columns, res.map(this.mapData), fileName);
      }, error1 => {
        console.log('Class: , Line:  error1 ', error1);
      });
    } else {
      this.api.exportToExcel(columns, this.selectedEmployees.map(this.mapData), fileName);
    }
  }
  exporttoCsv(pageRange?: boolean): void {
    const fileName = 'Employee';
    const columns = [
      { header: 'Emp No', key: 'prevempId', width: 15 },
      { header: 'Full Name', key: 'firstname', width: 25 },
      { header: 'Father Name', key: 'fathersname', width: 15 },
      { header: 'Mother Name', key: 'mothersname', width: 15 },
      { header: 'Name in Bangla', key: 'fullnameinbangla', width: 15 },
      { header: 'DOB', key: 'dob', width: 15 },
      { header: 'Gender', key: 'sex2', width: 15 },
      { header: 'Blood Group', key: 'bloodgroup1', width: 15 },
      { header: 'Marital Status', key: 'maritalstatus1', width: 15 },
      { header: 'Nationality', key: 'nationality1', width: 15 },
      { header: 'Religion', key: 'ReligionDetails', width: 15 },
      { header: 'National Id ', key: 'idno', width: 15 },
      { header: 'Identification Type', key: 'empidentificationtypeid', width: 15 },
      { header: 'Identification Mark', key: 'identificationmark', width: 15 },
    ];
    if (pageRange) {
      if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
        return;
      }
      const url = this.getFilterUrl();
      url['order'] = 'empId DESC';
      url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
      url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
      this.api.getdata('EmployeePersonalInfos?filter=' + JSON.stringify(url)).subscribe((res: any) => {
        this.api.exportToCsv(columns, res.map(this.mapData), fileName);
      }, error1 => {
        console.log('Class: , Line:  error1 ', error1);
      });
    } else {
      this.api.exportToCsv(columns, this.selectedEmployees.map(this.mapData), fileName);
    }
  }
  exportToPDF(pageRange?: boolean) {
    if (pageRange) {
      if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
        return;
      }
      const url = {};
      url['order'] = 'empId DESC';
      url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
      url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
      this.api.getdata('EmployeePersonalInfos?filter=' + JSON.stringify(url)).subscribe(res => {
        this.api.savePdf(this.getDataForPDF(res), 'A2', 'landscape', 'Employee', 'auto');
      }, error1 => {
        console.log('here');
        console.log('Class: , Line:  error1 ', error1);
      });
    } else {
      this.api.savePdf(this.getDataForPDF(this.selectedEmployees), 'A2', 'landscape', 'Employee', 'auto');
    }
  }
  printOpen(pageRange?: boolean) {
    if (pageRange) {
      if (this.api.exportValidations(this.fromPage, this.toPage, this.meta.totalPageCount)) {
        return;
      }
      const url = {};
      url['order'] = 'empId DESC';
      url['skip'] = (this.fromPage - 1) * this.meta.itemsPerPage;
      url['limit'] = (this.toPage - this.fromPage + 1) * this.meta.itemsPerPage;
      this.api.getdata('EmployeePersonalInfos?filter=' + JSON.stringify(url)).subscribe(res => {
        this.api.OpenPrint(this.getDataForPDF(res), 'A2', 'landscape', 'Employee', 'auto');
      }, error1 => {
        console.log('here');
        console.log('Class: , Line:  error1 ', error1);
      });
    } else {
      this.api.OpenPrint(this.getDataForPDF(this.selectedEmployees), 'A2', 'landscape', 'Employee', 'auto');
    }
  }
  getDataForPDF(data) {
    const Data = [[
      'S.No.',
      'Emp No.',
      'First Name',
      'Father Name',
      'Mother Name',
      'Name in Bangla',
      'DOB',
      'Gender',
      'Blood Group',
      'Marital Status',
      'Nationality',
      'Religion',
      'National Id No.',
      'Identification Type',
      'Identification Mark',
    ]];
    const exportData = data.map(this.mapData);
    exportData.forEach((element, i) => {
      Data.push([
        i + 1,
        element.prevempId,
        element.firstname,
        element.fathersname,
        element.mothersname,
        element.fullnameinbangla,
        element.dob ,
        element.sex2 ,
        element.bloodgroup1 ,
        element.maritalstatus1 ,
        element.nationality1 ,
        element.ReligionDetails ,
        // dob: new Date(element.dob),
        element.idno,
        element.empidentificationtypeid,
        element.identificationmark,
      ]);
    });
    return Data;
  }
}
