export  class Customer {
    clientname: any;
    currentaddress: any;
    previousaddress: any;
    factorylocation: any;
    contactperson: any;
    buyername: any;
    clientcategory: any;
    telephone: any;
    fax: any;
    email: any;
    majorproducts: any;
    majorbrands: any;
    totalcapacity: any;
    totalemployee: any;
    director: any;
    merchandiser: any;
    commercialperson: any;
    accountsperson: any;
    salesperson: any;
    creditlimit: any;
    modeofpayment: any;
    clienthistory: any;
    specialinstruction: any;
    issubcontractfactory: boolean;
    isunnominated: any;
    hmallocated: boolean;
    createdby: string;
    creationdate: Date;
    status: number;

    constructor() {
        this.createdby = sessionStorage.getItem('empid');
        this.creationdate = new Date();
        this.status = 0;
    }
}
