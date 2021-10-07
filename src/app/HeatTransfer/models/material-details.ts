export class MaterialDetails {
  sampleid: any;
  sampleforqty: any;
  sequenceid: any;
  itemid: any;
  suppliercode: any;
  requiredqty: number;
  status: any;
  creationdate: any;
  colorid: any;
  length: any;
  fullsheetlength: any;
  width: any;
  fullsheetwidth: any;
  constructor() {
    this.sampleid = 0;
    this.status = 0;
    this.colorid = 0;
    this.sequenceid = -1;
    this.itemid = 0;
    this.length = '';
    this.fullsheetlength = '';
    this.width = '';
    this.fullsheetwidth = '';
  }
}
