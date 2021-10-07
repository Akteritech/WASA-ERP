import { Component, OnInit } from '@angular/core';
import {read, utils} from 'xlsx';
import {WorkOrderBreakdownDetail, WorkOrderDetail, WorkOrderMaster} from '../woven/models/work-order';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-upload-orders',
  templateUrl: './upload-orders.component.html',
  styleUrls: ['./upload-orders.component.css']
})
export class UploadOrdersComponent implements OnInit {
  file: any;
  excelArray = [];
  problems: any[];
  company: number;
  downloadExcel: boolean;
  submitData: {master: WorkOrderMaster, details: WorkOrderDetail, breakdowns: WorkOrderBreakdownDetail[]}[]
  // submitMaster: WorkOrderMaster;
  // submitDetails: WorkOrderDetail;
  // submitBreakdowns: WorkOrderBreakdownDetail[];

  constructor(public api: ApiService) {
    this.downloadExcel = true;
    this.submitData = [];
   }
  
  fileChanged(e) {
    this.file = e.target.files[0];
  }
  
  uploadDocument(file, companyid: number) {
    this.company = companyid;
    this.excelArray = [];
    this.problems = [];
    this.downloadExcel = true;
    const reader = new FileReader();
    let workbookkk, XL_row_object, json_object;
    return new Promise((resolve, reject) => {
      reader.onload = (e) => {
        const data = reader.result;
        workbookkk = read(data, {type: 'binary'});
        workbookkk.SheetNames.forEach( (sheetName) => {
          XL_row_object = utils.sheet_to_json(workbookkk.Sheets[sheetName]);
          json_object = JSON.stringify(XL_row_object);
// console.log(json_object);
          const obj = XL_row_object;
          for (let i = 0; i < obj.length; i++) {
            this.excelArray.push(obj[i]);
          }

          if(companyid == 4) this.uploadForNexgen()
          else if(companyid == 6) this.uploadForByways();
        });
      };
      reader.readAsBinaryString(this.file);
    });
  }

  uploadHnMDocument(file) {
    this.excelArray = [];
    this.problems = [];
    this.downloadExcel = true;
    const reader = new FileReader();
    let workbookkk, XL_row_object, json_object;
    return new Promise((resolve, reject) => {
      reader.onload = (e) => {
        const data = reader.result;
        workbookkk = read(data, {type: 'binary'});
        workbookkk.SheetNames.forEach( (sheetName) => {
          XL_row_object = utils.sheet_to_json(workbookkk.Sheets[sheetName], {header: 1, raw: true});
          this.uploadForHnM(XL_row_object);
        });
      };
      reader.readAsBinaryString(this.file);
    });
  }

  checkUnique(value: number, type: string): Promise<null> {
    return new Promise((resolve, reject) => {
      this.api.getdata('WorkOrderMasters?filter[limit]=10&filter[where][companyid]=' + this.company + '&filter[where][extracolumn1]=' + value).subscribe((res: any[]) => {
        if(res.length > 0) {
          reject(type + ' number ' + value + ' already exists');
        }
        else resolve();
      });
    })
  }

  getSampleData(sampleName: string): Promise<any> {
    const filter: any = {
      where:{samplename: encodeURIComponent(sampleName)},
      order: 'sampleid DESC',
      include: ['brand', 'client', 'company', 'productCategory', 'productSubCategory', 'salesPerson', 'NPDExecutive', 'designer', 'status' , 'sampleColors' , 'parts', 'program'],
    };
    const link = 'SampleGeneralSpecs?filter=' + JSON.stringify(filter);

    return new Promise((resolve, reject) => {
      this.api.getdata(link).subscribe((res: any[]) => {
        if(res.length === 0) {
          this.api.showWarningToast(sampleName + 'does no exist');
          reject(sampleName + ' does no exist')
        }
        else resolve(res[0]);
      });
    });
  }

  getCustomerData(customer: string): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.api.getdata(`customers?filter[limit]=10&filter[where][clientname]=` + encodeURIComponent(customer)).subscribe((res: any[]) => {
        if(res.length === 0) {
          this.api.showWarningToast(customer + 'does no exist');
          reject(customer + 'does no exist')
        }
        else resolve(res[0]);
      });
    });
  }

  getPriceData(sample: string, length: string, width: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const link = 'ItemPriceBuyerWises?filter[where][sampleid]=' + sample + '&filter[where][length]=' + length + '&filter[where][width]=' + width;
      this.api.getdata(link).subscribe((res: any[]) => {
        if(res.length === 0) {
          this.api.showWarningToast('No price set for this sample');
          reject('No price set for this sample')
        }
        else {
          resolve(res);
        }
      });
    });
  }

  getFinishType(value: string): Promise<any> {
    if(!value) {
      return new Promise((resolve, reject) => resolve([{id: -1}]));
    }
    return new Promise((resolve, reject) => {
      this.api.postdata('config-lovs/getLovId', {name: value}).subscribe((res: any[]) => {
        if(res.length === 0) {
          this.api.showWarningToast(value + ' is not a Finsish Type');
          reject(value + ' is not a Finsish Type')
        }
        else {
          resolve(res[0]);
        }
      });
    });
  }

  uploadForNexgen() {
    const ecoms: Set<number> = new Set();
    this.excelArray.forEach((element: any) => ecoms.add(element['Ecom order No']));
    let index = 0;
    ecoms.forEach((ecom: number) => {
      index++;
      const master: WorkOrderMaster = new WorkOrderMaster();
      const details: WorkOrderDetail = new WorkOrderDetail();
      const currentEntry = this.excelArray.find((element: any) => element['Ecom order No'] === ecom);

      master.companyid = 4;
      master.estdeliverdate = this.formatExcelDate(currentEntry['DELIVERY DATE']);
      master.partialdeldate = this.formatExcelDate(currentEntry['DELIVERY DATE']);
      master.customerpono = this.sanitize(currentEntry['VENDOR PO']);
      master.extracolumn1 = ecom;
      master.extracolumn2 = this.sanitize(currentEntry['MC PO']);
      master.extracolumn3 = this.sanitize(currentEntry['MC Style']);
      master.customerserviceid = sessionStorage.getItem('empid');
      master.narration = this.sanitize(currentEntry['NARRATION']);
      master.orderreceivedate = this.api.formatDate(new Date());

      details.length = currentEntry['LENGTH'];
      details.width = currentEntry['WIDTH'];
      if(currentEntry['Unit'] == 'inches') {
        details.length = details.length * 25.4;
        details.width = details.width * 25.4;
      }

      this.checkUnique(ecom, 'Ecom').then(() => {
        const sampleName = this.processSampleName(currentEntry['LABEL NAME'], currentEntry['LENGTH'] + '');
       
        return this.getSampleData(sampleName);
      }).then((value: any) => {
        master.sampleid = value.sampleid;
        master.brandid = value.brand.brandid;
        details.samplecolorid = value.sampleColors[0].samplecolorid;
        details.unitid = value.unit;

        return this.getCustomerData(currentEntry['CUSTOMER NAME']);
      }).then((value: any) => {
        master.clientid = value.clientid;

        return this.getCustomerData(currentEntry['DEL PARTY']);
      }).then((value: any) => {
        master.dalivaryid = value.clientid;

        return this.getFinishType(currentEntry['CUTTING LABEL']);
      }).then((value: any) => {
        details.finishtype = value.id;

        return new Promise((resolve, reject) => {
          this.api.getdata('UserInfos?filter[where][username]=' + currentEntry['EXECUTIVE']).subscribe((res: any[]) => {
            if(res.length === 0) {
                this.api.showWarningToast(currentEntry['EXECUTIVE'] + 'does no exist');
                reject(currentEntry['EXECUTIVE'] + 'does no exist')
              }
              else resolve(res[0]);
          });
        }).then((value: any) => {

          master.salespersonid = value.empId;
          const fabricComposition = currentEntry['FABRIC COMPOSITION'];
          return new Promise((resolve, reject) => {
            if(!fabricComposition) {
              resolve();
            }
            else {
              const link = 'lovData?filter[where][listitem]=' + encodeURIComponent(fabricComposition);
              this.api.getdata(link).subscribe((res: any[]) => {
                if(res.length === 0) {
                  this.api.showWarningToast(fabricComposition + 'does no exist');
                  reject(fabricComposition + 'does no exist')
                }
                else {
                  master.fabriccomposition = res[0].id;
                  resolve();
                }
              });
            }
          });
        });
      }).then(() => {
        return this.getPriceData(master.sampleid, details.length, details.width);
      }).then((value: any[]) => {
        const matchedPrice = value.find((element: any) => element.price === currentEntry['Unit Price']);
        if(!matchedPrice) {
          this.api.showWarningToast('Price does not match for ECOM ' + ecom);
          return;
        }
        details.partsid = matchedPrice.partnoid;
        details.price = matchedPrice.price;

        const breakDowns: WorkOrderBreakdownDetail[] = [];
        let totalQt = 0;
        this.excelArray.filter((element: any) => ecom === element['Ecom order No']).forEach((element: any) => {
          const currentBreakdown: WorkOrderBreakdownDetail = new WorkOrderBreakdownDetail();
          currentBreakdown.breakdownqty = element['ORDER QTY'];
          totalQt += element['ORDER QTY'];
          currentBreakdown.keyentry1 = this.sanitize(element['COLOR']);
          currentBreakdown.keyentry2 = this.sanitize(element['SIZE']);
          currentBreakdown.keyentry3 = this.sanitize(element['DESCRIPTION']);
          currentBreakdown.keyentry4 = this.sanitize(element['GARMENTS COLOR']);
          currentBreakdown.keyentry5 = this.sanitize(element['UPC Number']);
          currentBreakdown.keyentry6 = this.sanitize(element['Barcode']);
          currentBreakdown.partsid = details.partsid;
          breakDowns.push(currentBreakdown);
        });

        details.orderqty = totalQt;
        details.adjamount = totalQt * details.price / 1000;

        this.submitData.push({master, details, breakdowns: breakDowns})
        // this.submit(master, details, breakDowns);
        if(ecoms.size == index) this.createCsv();
      }).catch((e) => {
        this.problems.push({
          error: e, sample: currentEntry['LABEL NAME'], customer: currentEntry['CUSTOMER NAME'], customerService: currentEntry['EXECUTIVE']
        });
        if(ecoms.size == index) this.createCsv();
      }); 
    });
  }

  processSampleName(itemCode: string, length: string): string {
    let sampleName = itemCode + '-' + length;
    if(!length.includes('.')) sampleName += '.00';
    else if((length.length - length.indexOf('.')) < 3) sampleName += '0';
    return sampleName
  }

  uploadForByways() {
    const urns: Set<number> = new Set();
    this.excelArray.forEach((element: any) => urns.add(element['URN']));
    let index = 0;

    urns.forEach((urn: number) => {
      index++;
      const master: WorkOrderMaster = new WorkOrderMaster();
      const details: WorkOrderDetail = new WorkOrderDetail();
      const currentEntry = this.excelArray.find((element: any) => element['URN'] === urn);
// console.log(currentEntry);
      master.companyid = 6;
      master.estdeliverdate = this.formatExcelDate(currentEntry['DELIVERY DATE']);
      master.partialdeldate = this.formatExcelDate(currentEntry['DELIVERY DATE']);
      master.customerpono = this.sanitize(currentEntry['PO NO']);
      master.extracolumn1 = urn;
      master.customerserviceid = sessionStorage.getItem('empid');
      master.narration = this.sanitize(currentEntry['NARRATION']);
      master.orderreceivedate = this.api.formatDate(new Date());

      details.length = currentEntry['LENGTH'];
      details.width = currentEntry['WIDTH'];

      this.checkUnique(urn, 'URN').then(() => {
        // let sampleName = currentEntry['LABEL NAME'] + '-' + currentEntry['LENGTH'];
        const sampleName = this.processSampleName(currentEntry['LABEL NAME'], currentEntry['LENGTH'] + '');
        
        return this.getSampleData(sampleName);
      }).then((value: any) => {
        master.sampleid = value.sampleid;
        master.brandid = value.brand.brandid;
        const colorObject = value.sampleColors.find((element: any) => 
          element.samplecolorname.toUpperCase() == currentEntry['COLOUR'].toUpperCase());
        if(!colorObject) {
          this.problems.push({
            error: 'Color ' + currentEntry['COLOUR'] + ' does not match with sample', 
            sample: currentEntry['LABEL NAME'], customer: currentEntry['CUSTOMER'], customerService: currentEntry['EXECUTIVE']
          });
          if(index === urns.size) {
            this.createCsv();
          }
          return;
        }
        else details.samplecolorid = colorObject.samplecolorid;
        details.unitid = value.unit;

        return this.getCustomerData(currentEntry['CUSTOMER']);
      }).then((value: any) => {
        master.clientid = value.clientid;

        return this.getCustomerData(currentEntry['DEL PARTY']);
      }).then((value: any) => {
        master.dalivaryid = value.clientid;

        return this.getFinishType(currentEntry['CUTTING LABEL']);
      }).then((value: any) => {
        details.finishtype = value.id;

        return new Promise((resolve, reject) => {
          this.api.getdata('EmployeePersonalInfos?filter[where][firstname]=' + currentEntry['EXECUTIVE']).subscribe((res: any[]) => {
            if(res.length === 0) {
                this.api.showWarningToast(currentEntry['EXECUTIVE'] + 'does no exist');
                reject(currentEntry['EXECUTIVE'] + 'does no exist')
              }
              else resolve(res[0]);
          });
        }).then((value: any) => {

          master.salespersonid = value.empId;
          const fabricComposition = currentEntry['FABRIC COMPOSITION'];
          return new Promise((resolve, reject) => {
            if(!fabricComposition) {
              resolve();
            }
            else {
              const link = 'lovData?filter[where][listitem]=' + encodeURIComponent(fabricComposition);
              this.api.getdata(link).subscribe((res: any[]) => {
                if(res.length === 0) {
                  this.api.showWarningToast(fabricComposition + 'does no exist');
                  reject(fabricComposition + 'does no exist')
                }
                else {
                  master.fabriccomposition = res[0].id;
                  resolve();
                }
              });
            }
          });
        });
      }).then(() => {
        return this.getPriceData(master.sampleid, details.length, details.width);
      }).then((value: any) => {
        const matchedPrice = value.find((element: any) => element.price === currentEntry['Rate']);
        if(!matchedPrice) {
          this.api.showWarningToast('Price does not match for URN ' + urn);
          return;
        }
        details.partsid = matchedPrice.partnoid;
        details.price = matchedPrice.price;
        
        const breakDowns: WorkOrderBreakdownDetail[] = [];
        let totalQt = 0;
        this.excelArray.filter((element: any) => urn === element['URN']).forEach((element: any) => {
          const currentBreakdown: WorkOrderBreakdownDetail = new WorkOrderBreakdownDetail();
          currentBreakdown.breakdownqty = element['ORDER QTY'];
          totalQt += element['ORDER QTY'];
          currentBreakdown.keyentry1 = this.sanitize(element['COLOUR']);
          currentBreakdown.keyentry2 = this.sanitize(element['Size']);
          currentBreakdown.keyentry3 = this.sanitize(element['STYLE NO']);
          currentBreakdown.keyentry4 = this.sanitize(element['DESCIPTION']);
          currentBreakdown.keyentry5 = this.sanitize(element['GARMENTS COLOR']);
          currentBreakdown.keyentry6 = this.sanitize(element['SizeID']);
          currentBreakdown.keyentry7 = this.sanitize(element['Col3']);
          currentBreakdown.partsid = details.partsid;
          breakDowns.push(currentBreakdown);
        });

        details.orderqty = totalQt;
        details.adjamount = totalQt * details.price / 1000;

        // this.submit(master, details, breakDowns);
        this.submitData.push({master, details, breakdowns: breakDowns})
        if(urns.size == index) this.createCsv();
      })
      .catch((e: string) => {
        this.problems.push({
          error: e, sample: currentEntry['LABEL NAME'], customer: currentEntry['CUSTOMER'], customerService: currentEntry['EXECUTIVE']
        });
        if(urns.size == index) this.createCsv();
      }); 
    });
  }

  async uploadForHnM(data: any[][]) {
    console.log(data);
    let masterData: WorkOrderMaster, index = 0;
    try {
      masterData = await this.createHnmWorkOrderMaster(data);
    } catch(e) {
      console.log(e);
      this.problems.push({error: e});
      this.createCsv();
    }

    if(this.problems.length > 0) return;

    const set: Set<string> = new Set();
    const length = data.length;
    for(let i = 22; i < length; i++ ) set.add(data[i][0] + '-' + data[i][1] + data[i][5] + data[i][12]);
    // for(let i = 22; i < 25; i++ ) set.add(data[i][0] + '-' + data[i][1] + data[i][5] + data[i][12]);
    

    set.forEach((item: string) => {
      index++;
      const detail = new WorkOrderDetail();
      const master: WorkOrderMaster = {...masterData};
      const currentEntry = data.find((e: any[]) => (e[0] + '-' + e[1] + e[5] + e[12]) == item);
      detail.length = currentEntry[1];
      detail.width = currentEntry[2];
      master.narration = currentEntry[13];
      
      const sample = this.processSampleName(currentEntry[0], currentEntry[1] + '');
      this.getSampleData(sample).then((value: any) =>{
        master.sampleid = value.sampleid;
        master.brandid = value.brand.brandid;
        
        const colorObject = value.sampleColors.find((element: any) => element.samplecolorname.toUpperCase() == currentEntry[5].toUpperCase());
        if(!colorObject) {
          this.problems.push({
            error: 'Color ' + currentEntry[5] + ' does not match with sample', 
            sample: currentEntry[0], customer: data[1][1], customerService: data[12][1]
          });
          return;
        }
        else detail.samplecolorid = colorObject.samplecolorid;
        detail.unitid = value.unit;
        const fabricComposition = currentEntry[12];

        return new Promise((resolve, reject) => {
          if(!fabricComposition) resolve();
          else {
            const link = 'lovData?filter[where][listitem]=' + encodeURIComponent(fabricComposition);
            this.api.getdata(link).subscribe((res: any[]) => {
              if(res.length === 0) {
                const data = {lovid: 1124, lovtype: 'FabricComposition', listitem: fabricComposition}
                this.api.postdata('lovData', data).subscribe((res: any) => {
                  master.fabriccomposition = res.id;
                  resolve();
                })
              }
              else {
                master.fabriccomposition = res[0].id;
                resolve();
              }
            });
          }
        });
      }).then(() => {
        return this.getPriceData(master.sampleid, detail.length, detail.width)
      }).then((value: any) => {
        const matchedPrice = value.find((element: any) => element.price === currentEntry[11]);
        if(!matchedPrice) {
          this.api.showWarningToast('Price does not match for ' + currentEntry[0]);
          return;
        }
        detail.partsid = matchedPrice.partnoid;
        detail.price = matchedPrice.price;

        const breakDowns: WorkOrderBreakdownDetail[] = [];
        let totalQt = 0;
        data.filter((e: any) => e[0] + '-' + e[1] + e[5] + e[12] == item).forEach((e: any) => {
          const currentBreakdown: WorkOrderBreakdownDetail = new WorkOrderBreakdownDetail();
          currentBreakdown.breakdownqty = e[9];
          totalQt += e[9];
          currentBreakdown.keyentry1 = this.sanitize(e[5]);
          currentBreakdown.keyentry2 = this.sanitize(e[8]);
          currentBreakdown.keyentry3 = this.sanitize(data[19][1]);
          currentBreakdown.partsid = detail.partsid;
          breakDowns.push(currentBreakdown);
        });

        detail.orderqty = totalQt;
        detail.adjamount = totalQt * detail.price / 1000;

        this.submitData.push({master, details: detail, breakdowns: breakDowns})

        // console.log(master);
        // console.log(detail);
        // console.log(breakDowns);
      }).catch((e) => {
        this.problems.push({
          error: e, sample: currentEntry[0], customer: data[1][1], customerService: data[12][1]
        });
        if(set.size == index) this.createCsv();
      });
    });
  }

  createHnmWorkOrderMaster(data: any[][]): Promise<WorkOrderMaster> {
    const master = new WorkOrderMaster();

    return this.getCustomerData(data[1][1]).then((value: any) => {
      master.clientid = value.clientid;

      return this.getCustomerData(data[2][1])
    }).then((value: any) => {
      master.dalivaryid = value.clientid;

      return new Promise((resolve, reject) => {
        this.api.getdata('EmployeePersonalInfos?filter[where][firstname]=' + data[12][1]).subscribe((res: any[]) => {
          if(res.length === 0) {
              this.api.showWarningToast(data[12][1] + ' does no exist');
              reject(data[12][1] + ' does no exist')
            }
            else resolve(res[0]);
        });
      });
    }).then((value: any) => {
      master.salespersonid = value.empId;
      
      return new Promise<WorkOrderMaster>((resolve, reject) =>  {
        master.companyid = 1;
        master.partialdeldate = this.formatExcelDate(data[9][1]);
        master.estdeliverdate = this.formatExcelDate(data[10][1]);
        master.customerpono = this.sanitize(data[15][1]);
        master.customerserviceid = sessionStorage.getItem('empid');
        master.merchandisername = this.sanitize(data[11][1]);
        master.extracolumn4 = this.sanitize(data[16][1]);
        master.extracolumn5 = this.sanitize(data[17][1]);
        master.productcodeno = this.sanitize(data[18][1]);
    
        resolve(master);
      });
    });
  }

  submit() {
    // console.log(this.submitData);
    this.submitData.forEach((e: any) => this.upload(e.master, e.details, e.breakdowns));
  }

  upload(master: WorkOrderMaster, detail: WorkOrderDetail, breakdowns: WorkOrderBreakdownDetail[]) {
    this.api.postdata('WorkOrderMasters/addWorkOrder', {data: master}).subscribe((res: any) => {
      detail.workorderid = res.workorderid;
      detail.customerpono = master.customerpono;
      detail.brandid = master.brandid;
      detail.totalbreakdown = breakdowns.length;
      detail.createddate = Date.now();

      this.api.postdata('WorkOrderDetails', detail).subscribe((res1: any) => {
        breakdowns.forEach((element: WorkOrderBreakdownDetail) => {
          element.workorderid = res.workorderid;
          
          this.api.postdata('WorkOrderMasters/createBreakdown', {data: element}).subscribe(res2 => {
            }, err => {
            this.api.showFailureToast('Error', err.message);
          });
        });
      }, err => {
        this.api.showFailureToast('Error', err.message);
        console.log(err);
      });
      this.api.showSuccessToast('WOrkOrder Added');
    }, err => {
      this.api.showFailureToast('Error', err.message);
      console.log(err);
    });
  }

  formatExcelDate(value: number): string {
    if(typeof(value) == 'string') {
      let stringValue = value + '';
      if(stringValue.includes('/')) {
        stringValue = stringValue.replace('/', '-');
        stringValue = stringValue.replace('/', '-');
      }
      return this.api.formatDate(new Date(stringValue));
    }
    const utc_value = Math.floor(value - 25569) * 86400;
    const date_info = new Date(utc_value * 1000);
    return this.api.formatDate(date_info);
  }

  sanitize(value: string): string {
    if(!value) return '';
    if(!(typeof(value) === 'string')) return value;
    const returnValue = value.replace(`'`, '');
    return returnValue.replace('\n', '');
  }

  createCsv() {
    if(this.problems.length == 0 || !this.downloadExcel) return;
    this.downloadExcel = false;
    this.api.showWarningToast('Errors Found');
    setTimeout(() => {
      let csv = 'Label, Customer, Executive, Error\n'
      this.problems.forEach((element: any) => {
        csv += element.sample + ',' +  element.customer + ',' +  element.customerService + ',' +  element.error + '\n';
      });
      var hiddenElement = document.createElement('a');
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
      hiddenElement.target = '_blank';
      hiddenElement.download = 'errors.csv';
      hiddenElement.click();
    }, 2500);
  }

  ngOnInit() {  }
}