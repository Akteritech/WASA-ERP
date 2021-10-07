import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HrmComponent } from './hrm.component';
import { AttendanceComponent } from './hrm-production/attendance/attendance.component';
import { SalarySlipComponent } from './hrm-production/payroll-dashboard/salary-slip/salary-slip.component';
import { SalaryComponentComponent } from './hrm-production/payroll-dashboard/salary-component/salary-component.component';
import { SalaryStructureComponent } from './hrm-production/payroll-dashboard/salary-structure/salary-structure.component';
import { PayrollDashboardComponent } from './hrm-production/payroll-dashboard/payroll-dashboard.component';
import { MasterDashboardComponent } from './hrm-production/master-dashboard/master-dashboard.component';
import { SectionComponent } from './hrm-production/master-dashboard/section/section.component';
import { EmployeeShiftComponent } from './employee-shift/employee-shift.component';
import { HolidaysetupComponent } from './hrm-production/master-dashboard/holidaysetup/holidaysetup.component';
import { WeekendsetupComponent } from './hrm-production/master-dashboard/weekendsetup/weekendsetup.component';
import { LeaveapplicationComponent } from './hrm-production/master-dashboard/leaveapplication/leaveapplication.component';
import { ShiftComponent } from './hrm-production/master-dashboard/shift/shift.component';
import { SearchleaveapplicationComponent } from './hrm-production/master-dashboard/leaveapplication/searchleaveapplication/searchleaveapplication.component';
import { LeaveApplicationEnglishComponent } from './hrm-production/master-dashboard/leaveapplication/searchleaveapplication/leave-application-english/leave-application-english.component';
import { LeaveApplicationBanglaComponent } from './hrm-production/master-dashboard/leaveapplication/searchleaveapplication/leave-application-bangla/leave-application-bangla.component';
import { GroupComponent } from './hrm-production/master-dashboard/group/group.component';
import { EmployeeComponent } from '../masters/components/employee/employee.component';
import { CreateSalaryComponent } from './hrm-production/payroll-dashboard/create-salary/create-salary.component';
import { EmployeeAdvanceComponent } from './hrm-production/payroll-dashboard/employee-advance/employee-advance.component';
import { SalaryIncrementComponent } from './hrm-production/payroll-dashboard/salary-increment/salary-increment.component';
import { AttendanceCalender2Component } from './attendance-calender2/attendance-calender2.component';
import { AttendanceJobcardComponent } from './hrm-production/attendance/attendance-jobcard/attendance-jobcard.component';
import {BillUploadComponent} from "./hrm-production/payroll-dashboard/bill-upload/bill-upload.component";
import {EmployeeProfileComponent} from "./hrm-production/master-dashboard/employee-profile/employee-profile.component";
import {AddEmployeeProfileComponent} from "./hrm-production/master-dashboard/employee-profile/add-employee-profile/add-employee-profile.component";
import { WorkerPayslipComponent } from './hrm-production/payroll-dashboard/create-salary/worker-payslip/worker-payslip.component';
import { EmployeeTerminationComponent } from './hrm-production/payroll-dashboard/employee-termination/employee-termination.component';
import { EmployeeTransferComponent } from './hrm-production/master-dashboard/employee-transfer/employee-transfer.component';
import { AttendanceAdminComponent } from './attendance-admin/attendance-admin.component';
import {EmployeePersonalComponent} from "./hrm-production/master-dashboard/employee-profile/employee-personal/employee-personal.component";
import {EmployeeContactComponent} from "./hrm-production/master-dashboard/employee-profile/employee-contact/employee-contact.component";
import { EmployeeRejoiningComponent } from './hrm-production/payroll-dashboard/employee-rejoining/employee-rejoining.component';
import { BonusComponent } from './bonus/bonus.component';
import { LetterDraftComponent } from './hrm-production/master-dashboard/letter-draft/letter-draft.component';
import {EmployeeEducationComponent} from "./hrm-production/master-dashboard/employee-profile/employee-education/employee-education.component";
import {EmployeeExperienceComponent} from "./hrm-production/master-dashboard/employee-profile/employee-experience/employee-experience.component";
import { DraftLetterComponent } from './hrm-production/payroll-dashboard/create-salary/draft-letter/draft-letter.component';
import {EmployeeHistoryComponent} from "./hrm-production/master-dashboard/employee-profile/employee-history/employee-history.component";
import {DesignationComponent} from "./hrm-production/master-dashboard/designation/designation.component";
import {DepartmentComponent} from "./hrm-production/master-dashboard/department/department.component";
import {GradeComponent} from "./hrm-production/master-dashboard/grade/grade.component";
import {DivisionComponent} from "./hrm-production/master-dashboard/division/division.component";
import { LeaveRegisterComponent } from './hrm-production/master-dashboard/leaveapplication/searchleaveapplication/leave-register/leave-register.component';
import {EmployeePhotoGalleryComponent} from "./hrm-production/master-dashboard/employee-photo-gallery/employee-photo-gallery.component";
import {AccountListComponent} from "./hrm-production/master-dashboard/employee-profile/account-list/account-list.component";
import { OfficerPayslipComponent } from './hrm-production/payroll-dashboard/create-salary/officer-payslip/officer-payslip.component';
import { ActivationComponent } from './hrm-production/payroll-dashboard/activation/activation.component';
import { PagePermissionComponent } from './hrm-production/master-dashboard/page-permission/page-permission.component';
import { UpdateTimeComponent } from './update-time/update-time.component';
import { EditSalaryComponent } from './edit-salary/edit-salary.component';
import { FacerecogComponent } from './facerecog/facerecog.component';
import { AttnddeviceComponent } from './attnddevice/attnddevice.component';
import { UserlevelComponent } from './userlevel/userlevel.component';
const routes: Routes = [
  { path: '', redirectTo: 'hrm-dashboard', pathMatch: 'full' },
  { path: 'hrm-dashboard', component: HrmComponent },
  { path: 'attendance', component: AttendanceComponent },
  { path: 'attendance/jobcard', component: AttendanceJobcardComponent },

  { path: 'payroll', component: PayrollDashboardComponent },
  { path: 'payroll/employeeAdvance', component: EmployeeAdvanceComponent },
  { path: 'payroll/employeeAdvance/:id', component: EmployeeAdvanceComponent },
  { path: 'payroll/salaryIncrement', component: SalaryIncrementComponent },
  { path: 'payroll/salaryIncrement/:id', component: SalaryIncrementComponent },
  { path: 'payroll/createSalary', component: CreateSalaryComponent },
  { path: 'payroll/billUpload', component: BillUploadComponent },
  { path: 'payroll/officerpayslip', component: OfficerPayslipComponent },
  { path: 'payroll/workerpayslip', component: WorkerPayslipComponent },
  { path: 'payroll/employeeTermination', component: EmployeeTerminationComponent },
  { path: 'payroll/employeeRejoining', component: EmployeeRejoiningComponent },
  { path: 'payroll/draftLetter', component: DraftLetterComponent },
  { path: 'salary-slip', component: SalarySlipComponent },
  { path: 'salary-component', component: SalaryComponentComponent },
  { path: 'salary-structure', component: SalaryStructureComponent },

  { path: 'hrmMaster', component: MasterDashboardComponent },
  { path: 'hrmMaster/section', component: SectionComponent },
  { path: 'hrmMaster/grade', component: GradeComponent },
  { path: 'hrmMaster/grade/:id', component: GradeComponent },
  { path: 'hrmMaster/designation', component: DesignationComponent },
  { path: 'hrmMaster/designation/:id', component: DesignationComponent },
  { path: 'hrmMaster/department', component: DepartmentComponent },
  { path: 'hrmMaster/department/:id', component: DepartmentComponent },
  { path: 'hrmMaster/division', component: DivisionComponent },
  { path: 'hrmMaster/photogallery', component: EmployeePhotoGalleryComponent },
  { path: 'hrmMaster/division/:id', component: DivisionComponent },
  { path: 'employeeshift', component: EmployeeShiftComponent },
  { path: 'hrmMaster/holidaysetup', component: HolidaysetupComponent },
  { path: 'hrmMaster/weekendsetup', component: WeekendsetupComponent },
  { path: 'hrmMaster/leaveapplication', component: LeaveapplicationComponent },
  { path: 'hrmMaster/leaveapplication/search', component: SearchleaveapplicationComponent },
  { path: 'hrmMaster/leaveapplication/search/leaveAppEnglish/:id', component: LeaveApplicationEnglishComponent },
  { path: 'hrmMaster/leaveapplication/search/leaveAppBangla/:id', component: LeaveApplicationBanglaComponent },
  { path: 'hrmMaster/leaveapplication/leaveRegister/:id', component: LeaveRegisterComponent },
  { path: 'hrmMaster/shift', component: ShiftComponent },
  { path: 'hrmMaster/letterDraft', component: LetterDraftComponent },
  { path: 'hrmMaster/letterDraft/:id', component: LetterDraftComponent },
  { path: 'hrmMaster/employee-profile', component: EmployeeProfileComponent },
  { path: 'hrmMaster/employee-personal/:id', component: EmployeePersonalComponent },
  { path: 'hrmMaster/employee-education/:id', component: EmployeeEducationComponent },
  { path: 'hrmMaster/employee-experience/:id', component: EmployeeExperienceComponent },
  { path: 'hrmMaster/employee-history/:id', component: EmployeeHistoryComponent },
  { path: 'hrmMaster/account-list/:id', component: AccountListComponent },
  { path: 'hrmMaster/employee-contact/:id', component: EmployeeContactComponent },
  { path: 'hrmMaster/employee-profile/:id', component: AddEmployeeProfileComponent },
  { path: 'hrmMaster/group', component: GroupComponent },
  { path: 'hrmMaster/employee', component: EmployeeComponent },
  { path: 'hrmMaster/employee_transfer', component: EmployeeTransferComponent },
  { path: 'hrmMaster/employee_transfer/:id', component: EmployeeTransferComponent },
  { path: 'hrmMaster/pagepermission', component: PagePermissionComponent },
  { path: 'calender2', component: AttendanceCalender2Component },
  { path: 'editattendance', component: AttendanceAdminComponent },
  { path: 'payroll/bonus', component: BonusComponent },
  { path: 'payroll/activation', component: ActivationComponent },
  { path: 'payroll/temp', component: EditSalaryComponent },
  {path: 'facerecog', component: FacerecogComponent },
  {path: 'attnddevice', component:  AttnddeviceComponent},
  {path: 'userlevel', component:  UserlevelComponent},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrmRoutingModule { }
