import { DatePipe } from "@angular/common";

export class ProcessData {
	dayList: number[];
	date: Date;
	pdfDescription: string;
	pdfTitle = 'Monthly Attendance Report';
	link: string;
	datePipe: DatePipe

	constructor(searchDate: Date) {
		this.datePipe = new DatePipe('en-us');
		this.date = searchDate;
		this.dayList = [];
		const month = searchDate.getMonth() + 1;
		const year = searchDate.getFullYear();

		for (let i = 1; i <= 28; i++) this.dayList.push(i);
		if (month == 2 && year % 4 == 0) this.dayList.push(29);
		else if (month != 2) {
			this.dayList.push(29);
			this.dayList.push(30);
		}
		if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10
			|| month == 12) this.dayList.push(31);
	}

	getFirstDay(): string {
		const month = this.date.getMonth() + 1;
		const year = this.date.getFullYear();
		return this.datePipe.transform(new Date(year, month - 1, 1), 'yyyy-MM-dd')
		.replace('-', '').replace('-', '');
	}

	getLastDay(): string {
		const month = this.date.getMonth() + 1;
		const year = this.date.getFullYear();
		return this.datePipe.transform(new Date(year, month - 1, this.dayList.length), 'yyyy-MM-dd')
		.replace('-', '').replace('-', '');
	}

	filter(data: any[], card: string, department: string, company: string) {
		return data.filter((element: any) => {
			let cardMatch = element.EMP_CARD_NO.includes(card);
			if (!card) cardMatch = true;
			let deptMatch = element.DeptEngNm == department;
			if (!department) deptMatch = true;
			let copmanyMatch = element.Unit == company;
			if (!company) copmanyMatch = true;

			return deptMatch && cardMatch && copmanyMatch
		});
	}

	pdfData(attendanceData: any[]): any[] {
    const data: any[][] = [['Company', 'Employee', 'Card', 'Department'].concat(this.dayList.map((day: number) => '' + day)).concat('Total')];
    attendanceData.forEach((element: any) => {
      const currentRow = [element.Company, element.EMP_NAME_ENG, element.EMP_CARD_NO, element.DeptEngNm];
	  	this.dayList.forEach((day: number) => currentRow.push(element[day]));
	  	currentRow.push(element.Total);
      data.push(currentRow);
    });

  	this.pdfDescription = this.date.toLocaleString('default', {month: 'long'}) + ' ' + this.date.getFullYear();
		return data;
  }
}