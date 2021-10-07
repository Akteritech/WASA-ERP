import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-create-lc',
  templateUrl: './create-lc.component.html',
  styleUrls: ['./create-lc.component.css']
})
export class CreateLcComponent implements OnInit {
  
  partyAddress: string;
  lcNos: any;
  amdNo: any;
	PIValue: number;

	allBanks: any[];
  issuingBanks: string[];
  lienBanks: string[];
	issuingBankBranches: any[];
	lienBankBranches: any[];
	issuingBank: string;
	lienBank: string;
	issuingBankAddress: string
	lienBankBranchAddress: string;
  
  master: any;  
  details: any[];
  @Output() added = new EventEmitter();
  editId: any;

  salesPeople: any[];
  companies: any[];
  clients: any[];
  lcTenors: any[];
  shipmentBy: any[];
  lcTypes: any[];
  portOfLoading: any[];
  finalDestination: any[];
  masterLCType: any[];
  shippingAddress: any[];
  lCPayment: any[];
  PIType: any[];
  PINo: any[][];
  uds = [{label: 'Yes', value: 1}, {label: 'No', value: 0}];
  today: Date;

  constructor(public api: ApiService) {
    this.today = new Date();
    this.master = {
      LCAmount: 0, GrossWeight: 0, NetWeight: 0, TotalCarton: 0, LCTenor: 486, LCType: 1176, UD: 1,
      CreatedDate: this.api.formatDate(this.today), CreatedBy: sessionStorage.getItem('empid')
    };
    this.details = [{}];
    this.PINo = [];
  }

  ngOnInit() {
    this.api.getdata('LOVs/?[filter][where][lovtype]=FinalDestination').subscribe((res: any[]) => this.finalDestination = res);
    this.api.getdata('LOVs/?[filter][where][lovtype]=ShippingAddress').subscribe((res: any[]) => this.shippingAddress = res);
    this.api.getdata('LOVs/?[filter][where][lovtype]=PortOfLoading').subscribe((res: any[]) => this.portOfLoading = res);
    this.api.getdata('LOVs/?[filter][where][lovtype]=MasterLCType').subscribe((res: any[]) => this.masterLCType = res);
    this.api.getdata('LOVs/?[filter][where][lovtype]=ShipmentBy').subscribe((res: any[]) => this.shipmentBy = res);
    this.api.getdata('LOVs/?[filter][where][lovtype]=LCPayment').subscribe((res: any[]) => this.lCPayment = res);
		this.api.getdata('LOVs/?[filter][where][lovtype]=LCTenor').subscribe((res: any[]) => this.lcTenors = res);
		this.api.getdata('LOVs/?[filter][where][lovtype]=LCType').subscribe((res: any[]) => this.lcTypes = res);
    this.api.getdata('LOVs/?[filter][where][lovtype]=PIType').subscribe((res: any[]) => this.PIType = res);
    this.api.getdata('comp').subscribe((res: any[]) => this.companies = res);
    this.getSalesPeople();
    this.getClients();
    this.getLCNo();
    
    this.api.getdata('BBLC-masters/banklist').subscribe((res: any[]) => {
      this.allBanks = res;
      this.issuingBanks = this.getBankNames(res, 506);
      this.lienBanks = this.getBankNames(res, 507);
		});
  }

  getBankNames(bankList: any[], bankType: number): string[] {
    const bankNames: string[] = bankList.filter((element: any) => element.BankType == bankType).map((element: any) => element.BankName);
    return Array.from(new Set(bankNames));
  }

  getIssuingBankBranchList(){
    this.issuingBankBranches = this.allBanks.filter((element: any) => element.BankName == this.issuingBank && element.BankType == 506);
	}
	
  getIssueBankBranchSelected(){
		this.master.CustomerBankID = this.master.CustomerBankBranchID;
		this.issuingBankAddress = this.issuingBankBranches.find((element: any) => element.BankID == this.master.CustomerBankID).BankAddress;
	}
	
  getLienBankBranchList(){
    this.lienBankBranches = this.allBanks.filter((element: any) => element.BankName == this.lienBank && element.BankType == 507);
	}
	
  lienBankBranchSelected(){
		this.master.BeneficiaryBankID = this.master.BeneficiaryBankBranchID;
		this.lienBankBranchAddress = this.lienBankBranches.find((element: any) => element.BankID == this.master.BeneficiaryBankID).BankAddress;
	}

  getClients(name: string = null) {
    let link = 'customers?filter[limit]=40';
    if(name) link += '&filter[where][clientname][like]=%' + name + '%';
    return this.api.getdata(link).subscribe((res: any[]) => this.clients = res);
  }

  getPartyAddress() {
    this.partyAddress = this.clients.find((element: any) => element.clientid === this.master.CustomerID).currentaddress;
  }
  
  getSalesPeople(name: string = null) {
    let link = 'SalesPersonLists?filter[limit]=40'
    if(name) link += '&filter[where][SalesPeron][like]=%' + name + '%';
    this.api.getdata(link).subscribe((res: any[]) => this.salesPeople = res);
  }

  getLCNo(searchString: string = null) {
    let link = 'BBLC-masters?filter[limit]=10';
    if(searchString)link+= '&filter[where][LCNo][like]=%' +searchString +'%';
    this.api.getdata(link).subscribe((res: any[]) => 
    this.lcNos = res
    )
    console.log(this.lcNos);
  }
  
  getPINo(index: number){
    const link = 'BBLC-masters/getPIDetailsByCompanyIDAndCustomerID?companyid='+ this.master.CompanyID + '&customerid=' + this.master.CustomerID + '&pitype=' + this.details[index].PIType
    this.api.getdata(link).subscribe((res: any[]) => this.PINo[index] = res);
  }

  getPiDetails(index: number) {
    const length = this.details.length;
    let proceed = true;
    for(let i = 0; i < length; i++) {
      if(i == index) continue;
      if(this.details[index].PIID === this.details[i].PIID && this.details[index].PIType == this.details[i].PIType) {
        this.api.showWarningToast('PI ALready Selected');
        proceed = false;
        this.details[index].PIID = 0;
        break;
      }
    }
    if(!proceed) return;

    const link = 'BBLC-masters/getPIDetails?id=' + this.details[index].PIID + '&type=' + this.details[index].PIType
    this.api.getdata(link).subscribe((res: any) => {
      this.details[index].PIQty = res.PIQty;
      this.details[index].PIValue = res.PIValue;
      this.details[index].date = res.PIDate;
      this.master.LCAmount += res.PIValue;
    });
  }

  add() {
    this.details.push({});
  }

  remove(index: number) {
    this.master.LCAmount -= this.details[index].PIValue;
    this.details.splice(index, 1);
    if(this.details.length == 0) this.details = [{}];
  }

  createCINo() {
    const shortName: string = this.companies.find((element: any) => element.companyid = this.master.CompanyID).shortname;
    const dateString: string = this.today.getFullYear() + '' + this.today.getMonth() + '' + this.today.getDate();
    this.api.getdata('BBLC-masters/count')
    .subscribe((res: any) => this.master.CINo = shortName + '/' + dateString + '/' + (res.count + 1));
  }

  reset() {
    this.master = {
      LCAmount: 0, GrossWeight: 0, NetWeight: 0, TotalCarton: 0, LCTenor: 486, LCType: 1176, UD: 1,
      CreatedDate: this.api.formatDate(this.today), CreatedBy: sessionStorage.getItem('empid')
    };
    this.details = [{}];
  }

  save() {
    const length = this.details.length - 1;
    this.api.postdata('BBLC-masters', this.master).subscribe((res: any) => {
      this.details.forEach((element: any, index: number) => {
        element.BBLCID = res.BBLCID;
        this.api.postdata('/bblc-details', element).subscribe((res: any) => {
            if(res && length == index) this.submitted(res.LCNo + 'submitted');
        })
      })
    })
  }

  submitted(message: string) {
    this.api.showSuccessToast(message);
    //this.reset();
    this.added.emit(true);
  }
	
  // getAmendmentNo(){
  //   this.api.getdata('BBLC-masters/getAmdNoLCwise?lcno=' + this.lc.LCNo).subscribe((res: any[]) => {
  //     this.amdNo = res;
  //   }, err => {
  //     console.log(err);
  //   })
  // }
  // getLCDetailsByLCNoAmndNo(){
  //   this.api.getdata('BBLC-masters/getLCDetailsByLCNoAmndNo?lcno=' + this.lc.LCNo + '&amdno=' + this.lc.AmndNo).subscribe((res: any[]) => {
  //     this.lc.LCDetails = res;
  //     this.getClients();
  //     this.lc.CompanyID = res[0].CompanyID;
  //     this.lc.CustomerID = res[0].CustomerID;
  //     this.lc.SalesPerson = res[0].SalesPerson;
  //     console.log(this.lc.CustomerID);
  //   }, err => {
  //     console.log(err);
  //   })
  // }
  // getPIDetailsByLCNoAmndNo(){
  //   this.api.getdata('BBLC-masters/getPIDetailsByLCNoAmndNo?lcno=' + this.lc.LCNo + '&amdno=' + this.lc.AmndNo).subscribe((res: any[]) => {
  //     this.lc.PIValue = res[0]['PI Value'];
  //     this.getLCDetailsByLCNoAmndNo();
  //   }, err => {
  //     console.log(err);
  //   })
  // }

  

}
