import { ApiService } from "src/app/api.service";
import { resolve } from "url";

export class LeaveData {
	constructor() {}

	getLeaveDays(empId: string, api: ApiService): Promise<any> {
		const yearString = '' + new Date().getFullYear();
		let object =  {allowed: {cl: 0, sl: 0, el: 0}, spent: {cl: 0, sl: 0, el: 0}, remaining: {cl: 0, sl: 0, el: 0}};
		const link = 'hrm-leave-details?filter[where][EMP_ID]=' + encodeURIComponent(empId);

		return api.getdata('hrm-leaveapplications/leavetypes').toPromise().then((value: any) => {
			object.allowed.cl = value[0].LEAVE_DAYS_COUNT;
			object.remaining.cl = value[0].LEAVE_DAYS_COUNT;
			object.allowed.sl = value[1].LEAVE_DAYS_COUNT;
			object.remaining.sl = value[1].LEAVE_DAYS_COUNT;
			object.allowed.el = value[2].LEAVE_DAYS_COUNT;
			object.remaining.el = value[2].LEAVE_DAYS_COUNT;

			return new Promise((resolve, reject) => {
				api.getdata(link).subscribe((res: any[]) => {
					res.forEach((element: any) => {
							if(!element.LEAVE_DATES.includes(yearString)) return;
							if(element.LEAVE_ID == 1) {
								object.spent.cl++;
								object.remaining.cl -= 1;
							}
							else if(element.LEAVE_ID == 2) {
								object.spent.sl++;
								object.remaining.sl -= 1;
							}
							else if(element.LEAVE_ID == 3) {
								object.spent.el++;
								object.remaining.el -= 1;
							}//if
					});//for each
				});//get data
				resolve(object)
			}).then((value: any) => {
				return new Promise((resolve, reject) => {
					api.getdata('psn-employees/employeeInfo?eid=' + encodeURIComponent(empId)).subscribe((res: any) => {
						value.empData = res;
						resolve(value); 
					});
				});
			});
		});//parent promise
	}
}