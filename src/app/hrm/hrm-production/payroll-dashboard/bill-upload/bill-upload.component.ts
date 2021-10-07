import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../../api.service";
import * as XLSX from 'xlsx';
type AOA = any[][];

@Component({
  selector: 'app-bill-upload',
  templateUrl: './bill-upload.component.html',
  styleUrls: ['./bill-upload.component.css']
})
export class BillUploadComponent implements OnInit {

  file: any;
  excelArray = [];
  problems;
  company: number;
  downloadExcel: boolean;
  monthname: any;
  monthnamArear: any;

  constructor(public api: ApiService) {
    this.downloadExcel = true;
  }
  data: AOA = [];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
      console.log(this.data);
    };
    reader.readAsBinaryString(target.files[0]);
  }


  // export(): void {
  //   /* generate worksheet */
  //   const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);
  //
  //   /* generate workbook and add the worksheet */
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  //
  //   /* save to file */
  //   XLSX.writeFile(wb, this.fileName);
  // }
  ngOnInit() {  }

  upload() {
    this.data.forEach((item: any) => {
      let data = {
        'id': item[0],
        'amount': item[1],
        'monthname': this.monthname
      }
      this.api.patchdata('bill-uploads/billUpload', data).subscribe((res: any) => {
        console.log(res);
      },error => {
        console.log(error);
      });
    });
    this.api.showSuccessToast(`${this.data.length-1} record inserted`);
  }

  uploadArrears() {
    this.data.forEach((item: any) => {
      let data = {
        'MonthName': this.api.formatDate(this.monthname),
        'CardNo': item[0],
        'Arear': item[1]
        
      }
      this.api.patchdata('bill-uploads/arrearsUpload', data).subscribe((res: any) => {
        console.log(res);
      },error => {
        console.log(error);
      });
    });
    this.api.showSuccessToast(`${this.data.length-1} record inserted`);

  }
  rocketUplaod() {
    this.data.forEach((item: any) => {
      let data = {
        'CardNo': item[0],
        'accountno': JSON.stringify(item[1]) 
        
      }
      this.api.patchdata('bill-uploads/rocketUpload', data).subscribe((res: any) => {
        console.log(res);
      },error => {
        console.log(error);
      });
    });
    this.api.showSuccessToast(`${this.data.length-1} record inserted`);

  }
  
  uploadForHour() {
    this.data.forEach((item: any) => {
      let data = {
        'id': item[0],
        'hour': item[1],
        'monthname': this.monthname
      }
      this.api.patchdata('bill-uploads/extarOtHour', data).subscribe((res: any) => {
        console.log(res);
      });
    });
    this.api.showSuccessToast(`${this.data.length-1} record inserted`);

  }
}
