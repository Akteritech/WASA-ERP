export class DeliveryChallanMaster {

    deliverychallanid: any;
    challandate: any;
    challanno: string;
    customerid: any;
    companyid: any;
    workorderid: any;
    remarks: any;
    statusid: any;
    createdby: any;
    createddate: any;
    approveby: any;
    approvedate: any;
    deliverydate: any;
    chalanreciptdate: any;
    isdelivered: true;
    ischallanrecieptfound: true;
    lastmodifiedby: any;
    lastmodifieddate: any;
    deletedby: any;
    deleteddate: any;
    changedreason: string;
    billstatus: any;

    constructor() {
      this.isdelivered = true;
      this.createdby = sessionStorage.getItem('empid');
      this.createddate = new Date();
      this.remarks = 0;
    }
}
export class DeliveryChallanDetail {
  deliverychallandetailsid: any;
  deliverychallanid: any;
  workorderid: any;
  partsid: any;
  challanqty: any;
  unitid: any;
  breakdownid: any;
  statusid: any;
  createdby: any;
  createddate: any;


  constructor() {

  }
}
export class DeliveryChallanBreakdown {

  deliverychallanbreakdownid: any;
  deliverychallandetailsid: any;
  deliverychallanid: any;
  breakdownid: any;
  KeyEntry2: any;
  KeyEntry3: any;
  KeyEntry4: any;
  KeyEntry5: any;
  KeyEntry6: any;
  KeyEntry7: any;
  KeyEntry8: any;
  KeyEntry9: any;
  challanbreakdownqty: any;
  statusid: any;
  createdby: any;
  createddate: any;

  constructor() {
    this.breakdownid = 0;
    this.KeyEntry2 = '';
    this.KeyEntry3 = '';
    this.KeyEntry4 = '';
    this.KeyEntry5 = '';
    this.KeyEntry6 = '';
    this.KeyEntry7 = '';
    this.KeyEntry8 = '';
    this.KeyEntry9 = '';
  }
}
