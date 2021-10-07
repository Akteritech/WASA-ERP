import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { timeStamp } from 'console';

@Component({
  selector: 'app-outstanding-summary',
  templateUrl: './outstanding-summary.component.html',
  styleUrls: ['./outstanding-summary.component.css']
})
export class OutstandingSummaryComponent implements OnInit {
  companies: Object;
  clients: any[];
  salesPeople: any[];
  searchFrom: any;
  company: any;
  client: any;
  salesperson: any;
  searchTo: string;
  empid: string;

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.getClients();
    this.getSalesPeople();
    this.empid = sessionStorage.getItem('empid');
    this.api.getdata('comp').subscribe((res: any[]) => this.companies = res);
  }

  getCustomers(name: string) {
    let link = 'customers?filter[limit]=40';
    if (name) link += '&filter[where][clientname][like]=%' + name + '%';
    return this.api.getdata(link);
  }

  getClients(name: string = null) {
    this.getCustomers(name).subscribe((res: any[]) => this.clients = res);
  }

  getSalesPeople(name: string = null) {
    let link = 'SalesPersonLists?filter[limit]=40'
    if (name) link += '&filter[where][SalesPeron][like]=%' + name + '%';
    this.api.getdata(link).subscribe((res: any[]) => this.salesPeople = res);
  }

  maturityInHandExcel() {
    if (!this.company) this.company = 0;
    if (!this.client) this.client = 0;
    if (!this.salesperson) this.salesperson = 0;
    if (!this.searchTo) this.searchTo = '2500-12-31';
    const link = this.generateLink(`BuyerWisePIMasters/maturityInHand?company=`+ this.company + `&client=` + this.client 
    + `&salesperson=` + this.salesperson + `&empid=` + this.empid + `&lctracktype=Maturity In Hand` 
    + `&searchFrom=` +  this.api.formatDate(this.searchFrom) + `&searchTo=` + this.api.formatDate(this.searchTo));
    this.api.getdata(link).subscribe((res: any[]) => {
      const widths = new Array(12).fill(20);
      this.api.exportExcel(this.mapMaturity(res), [[res[0].Particulars]], res[0].Particulars, widths);
    });
  }

  generateLink(link: string): string {
    if (this.company) link += `&company=` + this.company;
    if (this.client) link += `&client=` + this.client;
    if (this.salesperson) link += `&salesperson=` + this.salesperson;
    return link
  }

  mapMaturity(data: any[]): any[] {
    return data.map((e: any) => {
      return {
        'Party': e.ClientName, 'Sales Person': e.FirstName, 'LC No': e.LCNo, 'LC Date': e.LCDate, 'Amnd No': e.AmndNo,
        'Amnd Date': e.AmndDate, 'ShipmentDate': e.ShipmentDate, 'LC Expiry Date': e.LCExpiryDate, 'Maturity Date': e.Maturityinhand
        , 'Maturity in hand Date': e.Maturityinhand, 'Date Diff Maturity In Hand vs CurrentDate': e.DiffDate, 'Total LC Value': e.TotalDue
      }
    });
  }

  bOESubmitToPartyExcel() {
    if (!this.company) this.company = 0;
    if (!this.client) this.client = 0;
    if (!this.salesperson) this.salesperson = 0;
    if (!this.searchTo) this.searchTo = '2500-12-31';
    const link = this.generateLink(`BuyerWisePIMasters/BOESubmitToParty?company=`+ this.company + `&client=` + this.client 
    + `&salesperson=` + this.salesperson + `&empid=` + this.empid + `&lctracktype=BOE Submit To Party` 
    + `&searchFrom=` +  this.api.formatDate(this.searchFrom) + `&searchTo=` + this.api.formatDate(this.searchTo));
    this.api.getdata(link).subscribe((res: any[]) => {
      const widths = new Array(12).fill(20);
      this.api.exportExcel(this.mapBOESubmit(res), [[res[0].Particulars]], res[0].Particulars, widths);
    });
  }

  mapBOESubmit(data: any[]): any[] {
    return data.map((e: any) => {
      return {
        'Party': e.ClientName, 'Sales Person': e.FirstName, 'LC No': e.LCNo, 'LC Date': e.LCDate, 'Amnd No': e.AmndNo,
        'Amnd Date': e.AmndDate, 'ShipmentDate': e.ShipmentDate, 'Expiry Date': e.LCExpiryDate, 'Maturity Date': e.Maturityinhand
        , 'BOE Submittedto Party Date': e.Maturityinhand, 'Status Change Date': e.StatusChangeDate, 'Date Diff BOE Party to Submitted vs CurrentDate': e.DiffDate, 'Total LC Value': e.TotalDue
        , 'First Challan Date': e.FirstChallanDate, 'Last Challan Date': e.LastChallanDate, 'Company Name': e.CompanyName
      }
    });
  }

  LCPendingAgainstIssuedPIExcel() {
    if (!this.company) this.company = 0;
    if (!this.client) this.client = 0;
    if (!this.salesperson) this.salesperson = 0;
    if (!this.searchTo) this.searchTo = '2500-12-31';
    const link = this.generateLink(`BuyerWisePIMasters/LCPendingAgainstIssuedPIExcel?company=`+ this.company + `&client=` + this.client 
    + `&salesperson=` + this.salesperson + `&empid=` + this.empid
    + `&searchFrom=` +  this.api.formatDate(this.searchFrom) + `&searchTo=` + this.api.formatDate(this.searchTo));
    this.api.getdata(link).subscribe((res: any[]) => {
      const widths = new Array(12).fill(20);
      this.api.exportExcel(this.mapLCPendingAgainstIssuedPI(res), [["LC PENDING AGAINST ISSUED PI"]], "LC PENDING AGAINST ISSUED PI", widths);
    });
  }

  mapLCPendingAgainstIssuedPI(data: any[]): any[] {
    return data.map((e: any) => {
      return {
        'Party': e.ClientName, 'Sales Person': e.FirstName, 'PI No': e.PINo, 'PI Date': e.PIDate, 'Company Name': e.CompanyName,
        'PI Value': e.TotalDue, 'PIType': e.PIType, 'Address': e.Address
      }
    });
  }



}
