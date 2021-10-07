export class JobCard {
    companyid: any;
    productionid: any;
    sampleid: any;
    samplecolorid: any;
    workorderno: any;
    workorderid: any;
    orderid: any;
    jobcardno: any;
    jobcarddate: any;
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
    istaffata: number;
    isneedle: number;
    sonic: any;
    constructor() {
      this.itemid = 0;
      this.istaffata = 0;
      this.isneedle = 0;
      this.sonic = 0;
      this.priority = '';
        this.planstartdate = new Date();
        this.priority = 0;
        this.createdby = sessionStorage.getItem('empid');

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
       this.machineid = 0;
    }
}
