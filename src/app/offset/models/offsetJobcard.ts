export class OffsetJobcard {
  companyid: any;
  productionid: any;
  sampleid: any;
  samplecolorid: any;
  workorderno: any;
  orderid: any;
}
export class JobCardMaster {

  jobcardid: any;
  batchid: any;
  jobcardno: any;
  jobcarddate: any;
  workorderid: any;
  sampleid: any;
  partsid: any;
  itemid: any;
  planstartdate: any;
  statusid: any;
  createdby: any;
  createddate: any;
  priority: any;
  materialchangedby: any;
  materialchangeddate: any;
  materialchangedreason: any;
  samplelength: any;
  planlotnumber: any;
  isproductiondone: any;
  remarks: any;
  totaljobcard: any;
  manualpercentage: any;
  quality: any;
  istaffata: any;
  isneedle: any;
  constructor() {

  }
}
export class JobCardDetail {
  jobcarddetailid: any;
  workorderid: any;
  jobcardid: any;
  orderbreakdownid: any;
  planqty: any;
  remarks: any;
  statusid: any;
  createdby: any;
  createddate: any;
  machineid: any;
  planid: any;
  jobqty: any;
  settingwastageqty: any;
  productionwastageqty: any;
  constructor() {

  }
}
