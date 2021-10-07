// export class PersonalContact {
//   val: any;
//   status: any;
//   subTypes: any;
//   type: any;
//   employeeId: any;
//   isPrimary: any;
//   number: any;
//   city: any;
//   add: any;
//   state: any;
//   country: any;
// }
// export class EducationInfo {
//   qualification: string;
//   institute: string;
//   level: string;
//   fromDate: any;
//   toDate: any;
//   percentage: any;
//   active: true;
// }
// export class PersonalAddress {
// }
// export class EmployeeDetails {
// }
// export class Otherinfo {
//   tin: any;
// }
// export class EmployeeBankInfo {
//   bankName: any;
//   branch: any;
//   ifsc: any;
//   accountNo: any;
//   presentSalary: any;
//   joiningSalary: any;
// }
// export class SkillInfo {
//   skill: any;
//   desc: any;
//   yearsOfExp: any;
// }
// export class EmpHistory {
//   fromDate: any;
//   toDate: any;
//   companyName: any;
//   designationName: any;
//   salary: any;
// }
export class Employee {

  sex: any;
  firstname: any;
  middlename: any;
  lastname: any;
  fathersname: any;
  mothersname: any;
  maritalstatus: any;
  dob: any;
  empId: any;
  bloodgroup: any;
  nationality: any;
  empidentificationtypeid: any;
  idno: any;
  identificationmark: any;
  departmentId: any;
  religion: any;
  empfullnameinbangla: any;
  prevempId: any;
  // employeeDetails: EmployeeDetails[];
  // educationInfo: EducationInfo[];
  // empBankInfo: EmployeeBankInfo[];
  // personalContacts: PersonalContact[];
  // personalAdd: PersonalAddress[];
  // otherInfo: Otherinfo[];
  // skills: SkillInfo[];
  // workExperience: EmpHistory[];

  constructor () {
    this.sex = '';
    this.firstname = '';
    this.middlename = '';
    this.lastname = '';
    this.fathersname = '';
    this.mothersname = '';
    this.maritalstatus = '';
    this.dob = '';
    this.bloodgroup = '';
    this.nationality = 0;
    this.empidentificationtypeid = 0;
    this.idno = '';
    this.identificationmark = '';
    this.departmentId = '';
    this.religion = 0;
    this.empfullnameinbangla = '';
    this.prevempId = '';
    // this.workExperience = [];
    // this.educationInfo = [];
    // this.skillInfo = [];
  }
}



