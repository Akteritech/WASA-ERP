export class ScreenPrintSample {
  samplename: any;
  brandid: any;
  programid: any;
  imagepath: any;
  productcategoryid: any;
  productsubcategoryid: any;
  clientid: any;
  companyid: any;
  salesid: any;
  executiveid: any;
  designerid: any;
  length: any;
  width: any;
  pcsyard: any;
  unit: any;
  status: any;
  orderdate: any;
  estdeliverydate: any;
  submissiondate: any;
  submissioncomment: any;
  rejectiondate: any;
  rejectioncomment: any;
  partno: any
  approveldate: any;
  genspcStatus: any;
  totalnoofcolor: any;
  noofups: any;
  artworklocation: any;
  papergsm: any;
  deliverydate: any;
  reasonOfChange: any;
  completeDate: any;
  expireDate: any;
  remark1: any;
  specialinstruction: any;
  samplecolor : any;
  printcolor : any;
  filename: any;
  remark2date: any;
  expiryStatus: boolean;
  isbarcode: boolean;
  issubcontact: number;
  isjobformultimaterial: boolean;
  submissiondate2: any;
  submissiondate3: any;
  submissiondate4: any;
  submissioncomment2: any;
  submissioncomment3: any;
  submissioncomment4: any;
  finishlength: any;
  rejectiondate2: any;
  rejectiondate3: any;
  rejectiondate4: any;
  rejectioncomment2: any;
  rejectioncomment3: any;
  rejectioncomment4: any;

  constructor() {
    this.filename = '';
    this.artworklocation = '';
    this.samplename = '';
    this.imagepath = '';
    this.specialinstruction = '';
    this.reasonOfChange = '';
    this.brandid = 0;
    this.unit = 0;
    this.isbarcode = false;
    this.isjobformultimaterial = false;
    this.expiryStatus = false;
    this.programid = 0;
    this.pcsyard = 0;
    this.papergsm = 0;
    this.productcategoryid = 5;
    this.productsubcategoryid = 0;
    this.clientid = 0;
    this.totalnoofcolor = 0;
    this.companyid = 0;
    this.salesid = 0;
    this.executiveid = 0;
    this.designerid = 0;
    this.genspcStatus = 0;
    this.finishlength = 0;
    this.orderdate = new Date();
    this.estdeliverydate = new Date();
    this.approveldate = '';
    this.expireDate = '';
    this.deliverydate = '';
    this.completeDate = '';
    this.estdeliverydate = '';
    this.submissiondate = '';
    this.rejectiondate = '';
    this.samplecolor = '';
    this.printcolor = '';
    this.submissioncomment = '';
    this.rejectioncomment = '';
    this.partno = 1;
    this.submissiondate2 = '';
    this.submissiondate3 = '';
    this.submissiondate4 = '';
    this.submissioncomment = '';
    this.submissioncomment2 = '';
    this.submissioncomment3 = '';
    this.submissioncomment4 = '';
    this.rejectioncomment2 =  '';
    this.rejectioncomment3 =  '';
    this.rejectioncomment4 =  '';
    this.rejectiondate2 =  '';
    this.rejectiondate3 = '';
    this.rejectiondate4 = '';
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