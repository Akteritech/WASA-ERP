import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuiModule } from 'ng2-semantic-ui';
import { NgxBarcodeModule } from 'ngx-barcode';
import { NgxPrintModule } from 'ngx-print';
import { HrmRoutingModule } from './hrm-routing.module';
import { AttendanceComponent } from './hrm-production/attendance/attendance.component';
import { SalaryComponentComponent } from './hrm-production/payroll-dashboard/salary-component/salary-component.component';
import { SalarySlipComponent } from './hrm-production/payroll-dashboard/salary-slip/salary-slip.component';
import { SalaryStructureComponent } from './hrm-production/payroll-dashboard/salary-structure/salary-structure.component';
import { MastersModule } from '../masters/masters.module';
import { PayrollDashboardComponent } from './hrm-production/payroll-dashboard/payroll-dashboard.component';
import { HrmComponent } from './hrm.component';
import { MasterDashboardComponent } from './hrm-production/master-dashboard/master-dashboard.component';
import { SectionComponent } from './hrm-production/master-dashboard/section/section.component';
import { AddsectionComponent } from './hrm-production/master-dashboard/section/addsection/addsection.component';
import { ShowsectionComponent } from './hrm-production/master-dashboard/section/showsection/showsection.component';
import { HolidaysetupComponent } from './hrm-production/master-dashboard/holidaysetup/holidaysetup.component';
import { AddholidaysetupComponent } from './hrm-production/master-dashboard/holidaysetup/addholidaysetup/addholidaysetup.component';
import { WeekendsetupComponent } from './hrm-production/master-dashboard/weekendsetup/weekendsetup.component';
import { AddweekendsetupComponent } from './hrm-production/master-dashboard/weekendsetup/addweekendsetup/addweekendsetup.component';
import { EmployeeShiftComponent } from './employee-shift/employee-shift.component';
import { LeaveapplicationComponent } from './hrm-production/master-dashboard/leaveapplication/leaveapplication.component';
import { AddleaveapplicationComponent } from './hrm-production/master-dashboard/leaveapplication/addleaveapplication/addleaveapplication.component';
import { ShiftComponent } from './hrm-production/master-dashboard/shift/shift.component';
import { AddshiftComponent } from './hrm-production/master-dashboard/shift/addshift/addshift.component';
import { SearchleaveapplicationComponent } from './hrm-production/master-dashboard/leaveapplication/searchleaveapplication/searchleaveapplication.component';
import { LeaveApplicationEnglishComponent } from './hrm-production/master-dashboard/leaveapplication/searchleaveapplication/leave-application-english/leave-application-english.component';
import { LeaveApplicationBanglaComponent } from './hrm-production/master-dashboard/leaveapplication/searchleaveapplication/leave-application-bangla/leave-application-bangla.component';
import { GroupComponent } from './hrm-production/master-dashboard/group/group.component';
import { AddgroupComponent } from './hrm-production/master-dashboard/group/addgroup/addgroup.component';
import { CreateSalaryComponent } from './hrm-production/payroll-dashboard/create-salary/create-salary.component';
import { AttendanceCalender2Component } from './attendance-calender2/attendance-calender2.component';
import { EmployeeAdvanceComponent } from './hrm-production/payroll-dashboard/employee-advance/employee-advance.component';
import { SalaryIncrementComponent } from './hrm-production/payroll-dashboard/salary-increment/salary-increment.component';
import { AttendanceJobcardComponent } from './hrm-production/attendance/attendance-jobcard/attendance-jobcard.component';
import { BillUploadComponent } from './hrm-production/payroll-dashboard/bill-upload/bill-upload.component';
import { WorkerPayslipComponent } from './hrm-production/payroll-dashboard/create-salary/worker-payslip/worker-payslip.component';
import { EmployeeProfileComponent } from './hrm-production/master-dashboard/employee-profile/employee-profile.component';
import { AddEmployeeProfileComponent } from './hrm-production/master-dashboard/employee-profile/add-employee-profile/add-employee-profile.component';
import { EmployeeTerminationComponent } from './hrm-production/payroll-dashboard/employee-termination/employee-termination.component';
import { ShowEmployeeProfileComponent } from './hrm-production/master-dashboard/employee-profile/show-employee-profile/show-employee-profile.component';
import { EmployeeTransferComponent } from './hrm-production/master-dashboard/employee-transfer/employee-transfer.component';
import { AttendanceAdminComponent } from './attendance-admin/attendance-admin.component';
import { EmployeePersonalComponent } from './hrm-production/master-dashboard/employee-profile/employee-personal/employee-personal.component';
import { EmployeeContactComponent } from './hrm-production/master-dashboard/employee-profile/employee-contact/employee-contact.component';
import { EmployeeRejoiningComponent } from './hrm-production/payroll-dashboard/employee-rejoining/employee-rejoining.component';
import { BonusComponent } from './bonus/bonus.component';
import { LetterDraftComponent } from './hrm-production/master-dashboard/letter-draft/letter-draft.component';
import { EmployeeEducationComponent } from './hrm-production/master-dashboard/employee-profile/employee-education/employee-education.component';
import { EmployeeExperienceComponent } from './hrm-production/master-dashboard/employee-profile/employee-experience/employee-experience.component';
import { ShowLetterDraftComponent } from './hrm-production/master-dashboard/letter-draft/show-letter-draft/show-letter-draft.component';
import { DraftLetterComponent } from './hrm-production/payroll-dashboard/create-salary/draft-letter/draft-letter.component';
import { EmployeeHistoryComponent } from './hrm-production/master-dashboard/employee-profile/employee-history/employee-history.component';
import { GradeComponent } from './hrm-production/master-dashboard/grade/grade.component';
import { DesignationComponent } from './hrm-production/master-dashboard/designation/designation.component';
import { DepartmentComponent } from './hrm-production/master-dashboard/department/department.component';
import { DivisionComponent } from './hrm-production/master-dashboard/division/division.component';
import { LeaveRegisterComponent } from './hrm-production/master-dashboard/leaveapplication/searchleaveapplication/leave-register/leave-register.component';
import { EmployeePhotoGalleryComponent } from './hrm-production/master-dashboard/employee-photo-gallery/employee-photo-gallery.component';
import { SubmitCodeComponent } from './submit-code/submit-code.component';
import { AccountListComponent } from './hrm-production/master-dashboard/employee-profile/account-list/account-list.component';
import { OfficerPayslipComponent } from './hrm-production/payroll-dashboard/create-salary/officer-payslip/officer-payslip.component';
import { ActivationComponent } from './hrm-production/payroll-dashboard/activation/activation.component';
import { PagePermissionComponent } from './hrm-production/master-dashboard/page-permission/page-permission.component';
import { UpdateTimeComponent } from './update-time/update-time.component';
import { EditSalaryComponent } from './edit-salary/edit-salary.component';
import { FacerecogComponent } from './facerecog/facerecog.component';
import { AttnddeviceComponent } from './attnddevice/attnddevice.component';
import { UserlevelComponent } from './userlevel/userlevel.component';
// import { AgmCoreModule } from '@agm/core'; 
@NgModule({
  declarations: [
    AttendanceComponent,
    SalarySlipComponent,
    SalaryStructureComponent,
    SalaryComponentComponent,
    PayrollDashboardComponent,
    HrmComponent,
    MasterDashboardComponent,
    SectionComponent,
    AddsectionComponent,
    ShowsectionComponent,
    HolidaysetupComponent,
    AddholidaysetupComponent,
    WeekendsetupComponent,
    AddweekendsetupComponent,
    EmployeeShiftComponent,
    LeaveapplicationComponent,
    AddleaveapplicationComponent,
    ShiftComponent,
    AddshiftComponent,
    SearchleaveapplicationComponent,
    LeaveApplicationEnglishComponent,
    LeaveApplicationBanglaComponent,
    GroupComponent,
    AddgroupComponent,
    HrmComponent,
    MasterDashboardComponent,
    SectionComponent,
    AddsectionComponent,
    ShowsectionComponent,
    HolidaysetupComponent,
    AddholidaysetupComponent,
    WeekendsetupComponent,
    AddweekendsetupComponent,
    EmployeeShiftComponent,
    LeaveapplicationComponent,
    AddleaveapplicationComponent,
    ShiftComponent,
    AddshiftComponent,
    SearchleaveapplicationComponent,
    LeaveApplicationEnglishComponent,
    LeaveApplicationBanglaComponent,
    GroupComponent,
    AddgroupComponent,
    CreateSalaryComponent,
    AttendanceCalender2Component,
    EmployeeAdvanceComponent,
    SalaryIncrementComponent,
    AttendanceJobcardComponent,
    BillUploadComponent,
    WorkerPayslipComponent,
    EmployeeProfileComponent,
    AddEmployeeProfileComponent,
    EmployeeTerminationComponent,
    ShowEmployeeProfileComponent,
    EmployeeTransferComponent,
    AttendanceAdminComponent,
    EmployeePersonalComponent,
    EmployeeContactComponent,
    EmployeeRejoiningComponent,
    BonusComponent,
    LetterDraftComponent,
    EmployeeEducationComponent,
    EmployeeExperienceComponent,
    LetterDraftComponent,
    ShowLetterDraftComponent,
    DraftLetterComponent,
    BonusComponent,
    EmployeeHistoryComponent,
    GradeComponent,
    DesignationComponent,
    DepartmentComponent,
    DivisionComponent,
    LeaveRegisterComponent,
    SubmitCodeComponent,
    LeaveRegisterComponent,
    EmployeePhotoGalleryComponent,
    AccountListComponent,
    EmployeePhotoGalleryComponent,
    OfficerPayslipComponent,
    ActivationComponent,
    PagePermissionComponent,
    UpdateTimeComponent,
    EditSalaryComponent,
    FacerecogComponent,
    AttnddeviceComponent,
    UserlevelComponent,
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SuiModule,
    NgxBarcodeModule,
    NgxPrintModule,
    HrmRoutingModule,
    NgxPrintModule,
    MastersModule
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyDXMEf6dDvZWNhCDhLVY45pP3KXgkughgY'
    // })
  ],
  exports: [
      LeaveApplicationEnglishComponent,
      ShowEmployeeProfileComponent,
      UpdateTimeComponent,
      EditSalaryComponent
  ]
})
export class HrmModule { }
