export class Sample {
  samplename: any;
  brandid: any;
  programid: any;
  productcategoryid: any;
  productsubcategoryid: any;
  clientid: any;
  companyid: any;
  salespersonid: any;
  npdexecutiveid: any;
  designerid: any;
  length: any;
  width: any;
  pcsyard: any;
  orderdate: any;
  artworklocation: any;
  minDateEst: any;
  filename: any;
  estdeliverydate: any;
  approveldate: any;
  genspcStatus: any;
  groundcolor: any;
  textcolor: any;
  isbarcode: any;
  remark1: any;
  remark2: any;
  remark3: any;
  papergsm : any;
  noofups : any;
  remark1date: any;
  remark2date: any;
  remark3date: any;
  minDateRcv: any;

  constructor() {
    this.samplename = '';
    this.remark1 = '';
    this.groundcolor = '';
    this.artworklocation = '';
    this.filename = '';
    this.textcolor = '';
    this.brandid = 0;
    this.isbarcode = false;
    this.programid = 0;
    this.clientid = 0;
    this.companyid = 0 ;
    this.salespersonid = 0;
    this.npdexecutiveid = 0;
    this.designerid = 0;
    this.approveldate = '';
    this.orderdate = new Date();
    this.noofups = 0;
    this.papergsm = '';
    // this.estdeliverydate = new Date(this.minDateRcv.getFullYear(), this.minDateRcv.getMonth(), this.minDateRcv.getDate() + 7);
    this.remark1date = new Date();
    this.remark2date = new Date();
    this.remark3date = new Date();
  }
}

export class SampleWiseKeyEntryField {
  sampleid: any;
  keyentry1: any;
  keyentry2: any;
  keyentry3: any;
  keyentry4: any;
  keyentry5: any;
  keyentry6: any;
  keyentry7: any;
  keyentry8: any;
  keyentry9: any;
  keyentry10: any;
  statusid: any;
  createdby: any;
  constructor() {
    this.sampleid = 0;
  }
}
