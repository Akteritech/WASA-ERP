import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.css']
})
export class MastersComponent implements OnInit {
  totalcompanies: 0;
  todaycompanies: 0;
  totalcustomers: 0;
  todaycustomers: 0;
  totaldepartments: 0;
  todaydepartments: 0;
  totaldesignations: 0;
  todaydesignations: 0;
  totalemployees: 0;
  todayemployees: 0;
  totalbrands: 0;
  todaybrands: 0;
  totalsubbrands: 0;
  todaysubbrands: 0;
  totalproductcategories: 0;
  todayproductcategories: 0;
  totalproductsubcategories: 0;
  todayproductsubcategories: 0;
  totalsamplecolors: 0;
  todaysamplecolors: 0;
  totalsuppliers: 0;
  todaysuppliers: 0;
  todaylovs: 0;
  totallovs: 0;
  todaymasterpriceentries: 0;
  totalmasterpriceentries: 0;
  todaysamplepartwises: 0;
  totalsamplepartwises: 0;
  permittedPages: string[];
  constructor(public api: ApiService) {

}
  ngOnInit() {
    this.permittedPages = JSON.parse(sessionStorage.getItem('viewList'));

    this.getTotalCompanyCount();
    this.getTodayCompanyCount();
    this.getTotalCustomerCount();
    this.getTodayCustomerCount();
    this.getTotalBrandCount();
    this.getTotalDepartmentCount();
    this.getTotalDesignationCount();
    this.getTotalEmployeeCount();
    this.getTotalSubBrandCount();
    this.getTotalProductCategoryCount();
    this.getTotalProductSubCategoryCount();
    this.getTotalSampleColorCount();
    this.getTotalSupplierCount();
    this.getTotalSamplePartWiseCount();
    this.getTotalMasterPriceEntryCount();
    this.getTotalLovCount();
  }
getTotalCompanyCount() {
  this.api.getdata('Comp/count').subscribe((res: any) => {
    this.totalcompanies = res.count;
    console.log(this.totalcompanies);
  }, error1 => {
    console.log(error1);
  });
}
getTodayCompanyCount() {
  this.api.getdata('Comp/count').subscribe((res: any) => {
    this.todaycompanies = res.count;

  }, error1 => {
    console.log(error1);
  });
}
getTotalCustomerCount() {
  this.api.getdata('customers/count').subscribe((res: any) => {
    this.totalcustomers = res.count;

  }, error1 => {
    console.log(error1);
  });
}
getTodayCustomerCount() {
  this.api.getdata('customers/count').subscribe((res: any) => {
    this.todaycustomers = res.count;

  }, error1 => {
    console.log(error1);
  });
}
getTotalBrandCount() {
  this.api.getdata('Brands/count').subscribe((res: any) => {
    this.totalbrands = res.count;

  }, error1 => {
    console.log(error1);
  });
}
getTotalDepartmentCount() {
  this.api.getdata('dept/count').subscribe((res: any) => {
    this.totaldepartments = res.count;

  }, error1 => {
    console.log(error1);
  });
}

getTotalDesignationCount() {
  this.api.getdata('desig/count').subscribe((res: any) => {
    this.totaldesignations = res.count;

  }, error1 => {
    console.log(error1);
  });
}
getTotalEmployeeCount() {
  this.api.getdata('EmployeePersonalInfos/count').subscribe((res: any) => {
    this.totalemployees = res.count;

  }, error1 => {
    console.log(error1);
  });
}
getTotalSubBrandCount() {
  this.api.getdata('Programs/count').subscribe((res: any) => {
    this.totalsubbrands = res.count;

  }, error1 => {
    console.log(error1);
  });
}
getTotalProductCategoryCount() {
  this.api.getdata('ProductCategories/count').subscribe((res: any) => {
    this.totalproductcategories = res.count;

  }, error1 => {
    console.log(error1);
  });
}
getTotalProductSubCategoryCount() {
  this.api.getdata('ProductSubCategories/count').subscribe((res: any) => {
    this.totalproductsubcategories = res.count;

  }, error1 => {
    console.log(error1);
  });
}
getTotalSampleColorCount() {
  this.api.getdata('Samplecolors/count').subscribe((res: any) => {
    this.totalsamplecolors = res.count;

  }, error1 => {
    console.log(error1);
  });
}
getTotalSupplierCount() {
  this.api.getdata('Suppliers/count').subscribe((res: any) => {
    this.totalsuppliers = res.count;

  }, error1 => {
    console.log(error1);
  });
}
getTotalSamplePartWiseCount() {
  this.api.getdata('SampleWisePartsLengths/count').subscribe((res: any) => {
    this.totalsamplepartwises = res.count;

  }, error1 => {
    console.log(error1);
  });
}
getTotalMasterPriceEntryCount() {
  this.api.getdata('ItemPriceBuyerWises/count').subscribe((res: any) => {
    this.totalmasterpriceentries = res.count;

  }, error1 => {
    console.log(error1);
  });
}
getTotalLovCount() {
  this.api.getdata('LOVs/count').subscribe((res: any) => {
    this.totallovs = res.count;

  }, error1 => {
    console.log(error1);
  });
}

}
