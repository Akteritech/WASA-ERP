export class ThermalSample {
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
  artworklocation: any;
  filename: any;
  pcsyard: any;
  unit: any;
  status: any;
  orderdate: any;
  textcolor: any;
  groundcolor: any;
  estdeliverydate: any;
  approveldate: any;
  genspcStatus: any;
  totalnoofcolor: any;
  noofups: any;
  papergsm: any;
  submissiondate: any;
  submissioncomment: any;
  rejectiondate: any;
  remark1: any;
  specialinstruction: any;
  rejectioncomment: any;
  isbarcode: boolean;
  issubcontact: number;
  isjobformultimaterial: boolean;
  expiryStatus: boolean;
  partno: any;
  reasonOfChange: any;
  submissiondate2: any;
  submissiondate3: any;
  submissiondate4: any;
  submissioncomment2: any;
  submissioncomment3: any;
  submissioncomment4: any;
  expireDate: any;
  completeDate: any;
  finishlength: any;
  rejectiondate2: any;
  rejectiondate3: any;
  rejectiondate4: any;
  rejectioncomment2: any;
  rejectioncomment3: any;
  rejectioncomment4: any;
  constructor() {
    this.samplename = '';
    this.artworklocation = '';
    this.filename = '';
    this.brandid = 0;
    this.imagepath = '';
    this.isbarcode = false;
    this.isjobformultimaterial = false;
    this.expiryStatus = false;
    this.programid = 0;
    this.unit = 0;
    this.productcategoryid = 3;
    this.productsubcategoryid = 0;
    this.clientid = 0;
    this.companyid = 0;
    this.salesid = 0;
    this.executiveid = 0;
    this.noofups = 0;
    this.papergsm = 0;
    this.totalnoofcolor = 0;
    this.designerid = 0;
    this.genspcStatus = 0;
    this.textcolor = '';
    this.groundcolor = '';
    this.pcsyard = '';
    this.specialinstruction = '';
    this.expireDate = '';
    this.completeDate = '';
    this.finishlength = 0;
    this.orderdate = new Date();
    this.estdeliverydate = new Date();
    this.approveldate = '';
    this.submissiondate = '';
    this.rejectiondate = '';
    this.rejectioncomment = '';
    this.partno = 1;
    this.submissiondate2 =  '';
    this.reasonOfChange =  '';
    this.submissiondate3 =  '';
    this.submissiondate4 =  '';
    this.submissioncomment =  '';
    this.submissioncomment2 =  '';
    this.submissioncomment3 =  '';
    this.submissioncomment4 =  '';
    this.rejectioncomment2 =  '';
    this.rejectioncomment3 =  '';
    this.rejectioncomment4 =  '';
    this.rejectiondate2 =  '';
    this.rejectiondate3 = '';
    this.rejectiondate4 = '';
  }
}
