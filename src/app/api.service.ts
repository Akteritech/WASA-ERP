import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import * as Excel from 'exceljs/dist/exceljs.min.js';
import * as fs from 'file-saver';
import {DatePipe, Location} from '@angular/common';
import * as pdfmake from 'pdfmake-lite/build/pdfmake';
import * as pdfFont from 'pdfmake-lite/build/vfs_fonts';
import {Observable} from 'rxjs';
import * as XLSX from 'xlsx';
pdfmake.vfs = pdfFont.pdfMake.vfs;
import { environment } from './../environments/environment';
declare var $: any;
import * as html2pdf from 'html2pdf.js';
import {DomSanitizer} from "@angular/platform-browser";
import {ResponseContentType} from "@angular/http";
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // public baseUrl = 'http://117.58.243.13:3000/api/';
  // public baseUrl = 'http://192.168.12.5:3000/api/';
  // public baseUrl = 'http://192.168.13.3:3000/api/';
  // public baseUrl = 'http://182.160.126.149:3000/api/';
  noImagePath = 'assets/data.png';
  imageNotFound = 'assets/imagenotfound.png';
   localUrl = 'assets/employees';
  baseUrl: string;
  buyermodeUser="Admin";
  cutting = [
    // {name: '' , value: 0},
    {name: 'Please Select' , value: 0},
    {name: 'Polar' , value: 1},
    {name: 'Die' , value: 2},
    {name: 'Polar + Die' , value: 3},
  ];

  glueing = [
    // {name: '' , value: 0},
    {name: 'No' , value: 0},
    {name: 'Manual' , value: 1},
    {name: 'Machine' , value: 2}];
  thermal = [
    // {name: '' , value: 0},
    {name: 'Gloss' , value: 1},
    {name: 'Matt' , value: 2}
  ];
  coldglue = [
    // {name: '' , value: 0},
    {name: 'Gloss' , value: 1},
    {name: 'Matt' , value: 2}
  ];
  lamination = [
    {name: 'No' , value: 0},
    {name: 'Hot' , value: 1},
    {name: 'Cold/Glue' , value: 2}
  ];

  working_type = [
    // {name: '', value: 0},
    { name: 'Satin' , value: 1},
    { name: 'Taffeta' , value: 2},
  ];
  part_no = [
    { name: '1' , value: 1},
    // { name: '1' , value: 2},
  ];
  fabrics = [
    { name: '4inch' , value: 1},
    { name: '8inch' , value: 2},
  ];
  options = [
    {name: 'Yes' , value: 1},
    // {name: '' , value: 0},
    {name: 'No' , value: 2},
    {name: 'Not Applicable' , value: 3}
  ];
  denier_Value = [
    {name: '50' , value: '50'},
    {name: '75' , value: '75'},
    {name: '90' , value: '90'},
    {name: '100' , value: '100'},
  ];
  // unit = [
  //   {name: 'pcs', value: 30710},
  //   {name: 'yard', value: 30734},
  //   {name: 'mtr', value: 30711},
  // ];
orderType = [
  {name: 'Please Select', value: 0},
  {name: 'InHouse', value: 1},
  {name: 'Sub Contact', value: 3},
]
  foldtype = [
    {name: 'No', value: 0},
    {name: 'Yes', value: 1}
  ];
 printside = [
  {name: 'One side ', value: 0},
  {name: 'Double side', value: 1}
];
  WOoptions = [
    // {name: '' , value: 0},
    {name: 'No' , value: 0},
    {name: 'Yes' , value: 1}
  ];
  FOCreason = [
    {name: 'Excess wastage in Production' , value: 1},
    {name: 'FOC requested by Customer' , value: 2},
    {name: 'Rejected by Customer' , value: 3},
    {name: 'Short QTY claimed by Customer' , value: 4}
  ];
  EmployeeType = [
    {name: 'Worker' , value: 0},
    {name: 'Officer' , value: 1},
    {name: 'Staff' , value: 2},
  ];
  maritalStatus = [
    {name: 'Married' , value: 0},
    {name: 'Single' , value: 1},
    {name: 'Widower' , value: 2},
  ];
  ShiftChange = [
    {name: 'one' , value: 0},
    {name: 'two' , value: 1},
    {name: 'three' , value: 2},
  ];
  status = [
    {name: 'Active' , value: 1},
    {name: 'Inactive' , value: 0}
  ];
  payCategory = [
    {name: 'general' , value: 0},
    {name: 'Salary Percentage' , value: 1},
    {name: 'Fixed Salary' , value: 2},
    {name: 'Working Days' , value: 3},
  ];
  EmployeeStatus = [
    {name: 'Regular' , value: 7},
    {name: 'Probationary' , value: 1},
    {name: 'Dismissed' , value: 2},
    {name: 'Resigned' , value: 3},
    {name: 'Terminated' , value: 4},
    {name: 'Discharged' , value: 5},
    {name: 'Unauthorised' , value: 6},
  ];
    attStatus: any;
    payrollFreq: any;
  salaryType: any;
   unit: any;
   employeehistory: any;
   imageToShow: any;
   logo: any;


  constructor(public http: HttpClient , private myRoute: Router, private _location: Location, public datePipe: DatePipe ,public sanitizer: DomSanitizer) {
    this.baseUrl = environment.api;
  }

  login(username: string, pass: string): Observable<any[]> {
    // return this.http.get<any[]>('http://192.168.12.5:8000/api/login?LoginID=' + username + '&Password=' + pass);
   return this.http.get<any[]>('http://202.74.243.119:8000/api/login?LoginID=' + username + '&Password=' + pass);
   // return this.http.get<any[]>('http://localhost:3000/api/login?LoginID=' + username + '&Password=' + pass);
  }
  fetchData(url): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + url);
  }
  fetchDataById(url, id): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + url + '/' + id);
  }

  checkPermission(page: string, list: string): boolean {
    const pageList: string[] = JSON.parse(sessionStorage.getItem(list));
    return pageList.includes(page);
  }
  getUnit() {
    this.getdata('LOVs?filter[where][lovtype]=SampleUnit').subscribe((resp: any) => {
      this.unit = resp;
    });
  }

  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';

  public exportExcel(data: any[], title: string[][], filename: string, widths: number[]) {
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.aoa_to_sheet(title);
    XLSX.utils.sheet_add_json(ws, data, { origin: 'A' + (title.length + 2)});
    ws["!cols"] = widths.map((width: number) => {
      return {width: width};
    });
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, filename + '.xlsx');
  }
  backClicked() {
    this._location.back();
  }

  getdata(url) {
    const getUrl = this.baseUrl + url;
    return this.http.get(getUrl);
  }
  getdataEx(url) {
    const getUrl = url;
    return this.http.get(getUrl);
  }
  getdataByid(url , id) {
    const getUrl = this.baseUrl + url + '/' + id;
    return this.http.get(getUrl);
  }
  numberOnly(event: KeyboardEvent) {
    const number = Number.parseInt(event.key);
    if (!number && event.key !== '.' && event.key !== 'Backspace' && event.key !== '0') {
      event.preventDefault();
    }
  }
  postdata(url, data)  {
    console.log(JSON.stringify(data));
    const postUrl = this.baseUrl + url;
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.http.post(postUrl, data);
  }
  putdata(url, data) {
    console.log(JSON.stringify(data));
    const putUrl = this.baseUrl + url;
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.http.put(putUrl, data);
  }

  patchdata(url, data)  {
    console.log(JSON.stringify(data));
    const updateUrl = this.baseUrl + url;
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.http.patch(updateUrl, data);
  }
  deletedata(url, id)  {
    const deleteUrl = this.baseUrl + url + '/' + id;
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.http.delete(deleteUrl);
  }
  uploadFile(folderName, fileToUpload: File) {
    // console.log(JSON.stringify(data));
    const data: FormData = new FormData();
    data.append('file', fileToUpload, fileToUpload.name);
    const postUrl = this.baseUrl + 'fileuploads/' + folderName + '/upload';
    return this.http.post(postUrl, data);
  }
  uploadFileInLocal(folderName, fileToUpload: File) {
    const data: FormData = new FormData();
    data.append('file', fileToUpload, fileToUpload.name);
    const postUrl = 'assets/' + folderName;
    return this.http.post(postUrl, data);
  }

  toExportFileName(fileName: string, type: string): string {
    return `${fileName}_` + new Date().toLocaleDateString() + `.${type}`;
  }
  createImageFromBlob(image: Blob,) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
      // this.emp.DSG = this.imageToShow;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }
  createImageFromBlob1(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
     this.logo = reader.result;
      // this.emp.DSG = this.imageToShow;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }
//   getDataOnScroll(url, batch, lastKey?) {
// let query = {
//   orderByKey: true,
//   limitToFirst: batch
// }
// if (lastKey) query['startAt'] = lastKey
//     const getUrl = this.baseUrl + url;
//     return this.http.get(getUrl);
//   }
  formatDate1(date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }
  formatDate(date): string {
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }
  getBlobThumbnail(url): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.get<Blob>(this.baseUrl +url,
         {headers: headers, responseType: 'blob' as 'json' });
  }
  // getImage(imageUrl: string): Observable<File> {
  //   return this.http.get<Blob>(this.baseUrl +imageUrl,
  //       {headers: headers, responseType: 'blob' as 'json' });
  // }
  exportToExcel(columns, json, fileName) {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet(fileName);
    worksheet.columns = columns;
    const headerRow = worksheet.getRow(1);
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'eeeeee' }
      };
      cell.border = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
    });
    headerRow.font = {bold: true};
    worksheet.addRows(json);
    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      fs.saveAs(blob, this.toExportFileName(fileName, 'xlsx'));
    });
  }
BlobToImage(blobData,) {
  let array = new Uint8Array(blobData);
  const char = array.reduce((data, byte)=> {return data + String.fromCharCode(byte);},'');
  let base64String = btoa(char);
  let imageurl = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + base64String);
}
   printEmployeeHistory = id => {
    this.getdata('employee-profiles/EmployeeHistoryReport?cardno=' + id).subscribe((res: any) => {
          this.employeehistory = res;
          console.log(this.employeehistory);
        }, error2 => {console.log(error2);}
    );
  }
  exportToCsv(columns, json, fileName) {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet(fileName);
    worksheet.columns = columns;
    const headerRow = worksheet.getRow(1);
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'eeeeee' }
      };
      cell.border = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
    });
    headerRow.font = {bold: true};
    worksheet.addRows(json);
    workbook.csv.writeBuffer().then((data) => {
      const blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      fs.saveAs(blob, this.toExportFileName(fileName, 'csv'));
    });
  }
  pdf(elementid,filename) {
    const element = document.getElementById(elementid);
    let margin = 15;
    let format = 'a4';
    let orientation = 'landscape';
    const opt = {
      margin: margin,
      filename: this.toExportFileName(filename, 'pdf'),
      image: { type: 'jpeg', quality: 0.95 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: format, orientation: orientation }
    };
    html2pdf().from(element).set(opt).save();

  }
  savePdf(pdfData, pageSize, pageOrientation, fileName , widths ) {
    const docDefinition = {
      info: {
        title: this.toExportFileName(fileName, 'pdf'),
        subject: fileName,
      },
      pageOrientation: pageOrientation,
      pageSize: pageSize,
      headerRows: 1,
      content: [
        {text: fileName + ' Details', fontSize: 20, alignment: 'center', bold: true, margin: [0, 0, 0, 8], },
        {table: {style: 'header', widths: widths, body: pdfData }, }
      ],
      styles: { header: {alignment: 'center' } }
    };
    pdfmake.createPdf(docDefinition).download(this.toExportFileName(fileName, 'pdf'));

  }

  OpenPrint(pdfData, pageSize, pageOrientation, fileName , widths ) {
    const docDefinition = {
      info: {
        title: this.toExportFileName(fileName, 'pdf'),
        subject: fileName,
      },
      pageOrientation: pageOrientation,
      pageSize: pageSize,
      headerRows: 1,
      content: [
        {text: fileName + ' Details', fontSize: 24, alignment: 'center', bold: true, margin: [0, 0, 0, 8]},
        {table: {style: 'header', widths: widths, body: pdfData }}
      ],
    };
    pdfmake.createPdf(docDefinition).print();

  }

  exportValidations(frompage, topage, totalPageCount) {
    let isError = false;
    if (topage > totalPageCount) {
      this.showWarningToast('To Page cannot be greater than Total Pages', '');
      isError = true;
    }
    if (frompage < 1) {
      this.showWarningToast('From Page cannot be less than 1', '');
      isError = true;
    }
    if (topage < 1) {
      this.showWarningToast('To Page cannot be less than 1', '');
      isError = true;
    }
    if (topage  < frompage) {
      this.showWarningToast('From Page cannot be greater than To Page', '');
      isError = true;
    }
    if (topage - frompage > 10) {
      this.showWarningToast('Range is too large(>10)', '');
      isError = true;
    }
    return isError;
  }

  showSuccessToast(title= '', message= '') {
    $.uiAlert({
      textHead: title,
      text: message,
      bgcolor: '#097a06',
      textcolor: '#fff',
      position: 'top-right',
      icon: 'checkmark box',
      time: 2,
    });
  }
  showInfoToast(title= '', message= '') {
    $.uiAlert({
      textHead: title,
      text: message,
      bgcolor: '#55a9ee',
      textcolor: '#fff', // color
      position: 'top-right', // position . top And bottom ||  left / center / right
      icon: 'info circle', // icon in semantic-UI
      time: 2,
    });
  }
  showResetToast(title= '', message= '') {
    $.uiAlert({
      textHead: title,
      text: message,
      bgcolor: '#55a9ee',
      textcolor: '#fff', // color
      position: 'top-right', // position . top And bottom ||  left / center / right
      icon: 'checkmark circle', // icon in semantic-UI
      time: 1,
    });
  }
  showWarningToast(title= '', message= '') {
    $.uiAlert({
      textHead: title,
      text: message,
      bgcolor: '#f36712',
      textcolor: '#fff', // color
      position: 'top-right', // position . top And bottom ||  left / center / right
      icon: 'warning sign', // icon in semantic-UI
      time: 2,
    });
  }

  showFailureToast(title= '', message= '') {
    $.uiAlert({
      textHead: title, // header
      text: message, // Text
      bgcolor: '#DB2828',
      textcolor: '#fff', // color
      position: 'top-right', // position . top And bottom ||  left / center / right
      icon: 'remove circle', // icon in semantic-UI
      time: 4, // time
    });
  }
  showDeleteToast(title= '', message= '') {
    $.uiAlert({
      textHead: title, // header
      text: message, // Text
      bgcolor: '#DB2828',
      textcolor: '#fff', // color
      position: 'top-right', // position . top And bottom ||  left / center / right
      icon: 'checkmark box', // icon in semantic-UI
      time: 2, // time
    });
  }
  showRefreshToast(title= '', message= '') {
    $.uiAlert({
      textHead: title,
      text: message,
      bgcolor: '#00B4AB',
      textcolor: '#fff', // color
      position: 'top-right', // position . top And bottom ||  left / center / right
      icon: 'checkmark box', // icon in semantic-UI
      time: 2,
    });
  }

  pdfReport(pdfData: string[][], title: string, pageOrientation, description: string, header: string = null ) {
    if(!header) header = title + ' ' + description;
    const printData = pdfData.map((element: string[], row: number) => {
      return element.map((text: string) => {
        let isBold = false;
        if(row === 0) isBold = true;
        const style = {bold: isBold, fontSize: 6};
        return {text: text, style: style};
      });
    });

    const docDefinition = {
      header: header,
      info: {title: this.toExportFileName(title, 'pdf'), subject: title},
      pageOrientation: pageOrientation,
      pageSize: 'A4',
      content: [
        {text: title, fontSize: 14, alignment: 'center', bold: true, margin: [0, 0, 0, 4]},
        {text: description, fontSize: 12, alignment: 'center', bold: false, margin: [0, 0, 0, 2]},
        {table: {headerRows: 1, widths: 'auto', body: printData }}
      ]
    };
    pdfmake.createPdf(docDefinition).open();
  }

  pdfReportProduction(pdfData: string[][], title: string, pageOrientation, description: string ) {
    const printData = pdfData.map((element: string[], row: number) => {
      return element.map((text: string) => {
        let isBold = false;
        if(row === 0) isBold = true;
        const style = {bold: isBold, fontSize: 2};
        return {text: text, style: style};
      });
    });

    const docDefinition = {
      info: {
        title: this.toExportFileName(title, 'pdf'), subject: title,
      },
      pageOrientation: pageOrientation,
      pageSize: 'A4',
      content: [
        {text: title, fontSize: 14, alignment: 'center', bold: true, margin: [0, 0, 0, 4]},
        {text: description, fontSize: 12, alignment: 'center', bold: false, margin: [0, 0, 0, 2]},
        {table: {headerRows: 1, widths: 'auto', body: printData }}
      ]
    };
    pdfmake.createPdf(docDefinition).open();
  }

  pdfReportWorkOrder(pdfData: string[][], title: string, pageOrientation, description: string ) {
    const printData = pdfData.map((element: string[], row: number) => {
      return element.map((text: string) => {
        let isBold = false;
        if(row === 0) isBold = true;
        const style = {bold: isBold, fontSize: 3};
        return {text: text, style: style};
      });
    });

    const docDefinition = {
      info: {
        title: this.toExportFileName(title, 'pdf'), subject: title,
      },
      pageOrientation: pageOrientation,
      pageSize: 'A4',
      content: [
        {text: title, fontSize: 14, alignment: 'center', bold: true, margin: [0, 0, 0, 4]},
        {text: description, fontSize: 12, alignment: 'center', bold: false, margin: [0, 0, 0, 2]},
        {table: {headerRows: 1, widths: 'auto', body: printData }}
      ]
    };
    pdfmake.createPdf(docDefinition).open();
  }
}
