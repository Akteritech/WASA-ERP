export class MaterialDetails {
  sampleid: any;
  id: any;
  sampleforqty: any;
  sequenceid: any;
  itemid: any;
  suppliercode: any;
  requiredqty: number;
  curingtemperature: number;
  curingtime: number;
  status: any;
  creationdate: any;
  colorid: any;
  fullsheetlength: any;
  noofups: any;
  fullsheetwidth: any;
  constructor() {
    this.sampleid = 0;
    this.colorid = 0;
    this.sequenceid = -1;
    this.status = 0;
    this.curingtemperature = 0;
    this.curingtime = 0;
    this.itemid = 0;
    this.fullsheetlength = 0;
    this.fullsheetwidth = 0;
  }
}
