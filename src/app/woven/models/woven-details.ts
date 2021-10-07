export class WovenDetails {
  wovencommondetailsid: any;
  sampleid: any;
  color: any;
  weavingtype: any;
  filename: any;
  pick: any;
  cutter: any;
  pslengthctoc: any;
  damasklength: any;
  psfoldtofold: any;
  pswidth: any;
  samplehuk: any;
  stracinginfo: any;
  beamtension: any;
  warpdenier: any;
  ironicinfo: any;
  ultrasoniccutting: any;
  lasercutting: any;
  cutfoldinfo: any;
  productioncapacity: any;
  washstarcirontime: any;
  ultrasoniccutcapacity: any;
  cutfoldcapacity: any;
  finishinginfo: any;
  pickwheel: any;
  remarks: any;
  createddate: any;
  antidying: any;
  constructor() {
    this.sampleid = 0;
    this.color = 0;
    this.weavingtype = 0;
    this.antidying = 0;
    this.filename = '';
    this.pick = 0;
    this.cutter = 0;
    this.pslengthctoc = 0;
    this.damasklength = 0;
    this.psfoldtofold = 0;
    this.pswidth = 0;
    this.samplehuk = 0;
    this.stracinginfo = 0;
    this.beamtension = '';
    this.warpdenier = '';
    this.ironicinfo = 0;
    this.ultrasoniccutting = 0;
    this.lasercutting = 0;
    this.productioncapacity = 0;
    this.washstarcirontime = 0;
    this.ultrasoniccutcapacity = 0;
    this.cutfoldcapacity = 0;
    this.finishinginfo = 0;
    this.pickwheel = 0;
    this.remarks = 0;
    this.createddate = new Date();
  }
}
export class Yarn {
  yarninfoid: any;
  sampleid: any;
  colordescription: any;
  color: any;
  itemid: any;
  requiredqty: any;
  maheencode: any;
  denier: any;
  pick: any;
  supplierid: any;
  suppliercode: any;
  sequenceid: any;
  Color_Name: any;
}
export class WovenYarn {
  yarn: Yarn[];
  constructor() {
  }
}
