import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../../../api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-show-master-price-entry',
  templateUrl: './show-master-price-entry.component.html',
  styleUrls: ['./show-master-price-entry.component.css']
})
export class ShowMasterPriceEntryComponent implements OnInit {
    masterPrice: any;
  @Input() id: number;
   price: any;
     sample: any;
     material: any;
     salesPerson: any;

  constructor(public api: ApiService, private route: ActivatedRoute) {
  }
get(id) {
    this.api.getdata(`ItemPriceBuyerWises/${id}?filter[include]=brand&filter[include]=program&filter[include]=customer&filter[include]=productCategory&filter[include]=sample&filter[include]=salesPerson&filter[include]=partNo&filter[include]=lov`).subscribe((res: any) => {
      this.price = res;
console.log(res);
    });
}
    // gets(id) {
    //     this.api.getdata(`SampleGeneralSpecs/${id}?filter[include]=brand&filter[include]=client&filter[include]=company&filter[include]=productCategory&filter[include]=productSubCategory&filter[include]=salesPerson&filter[include]=NPDExecutive&filter[include]=designer&filter[include]=status&filter[include]=program`).subscribe((res: any) => {
    //         if (res.submissiondate2.includes('1900')) { res.submissiondate2 = ''; }
    //         if (res.submissiondate3.includes('1900')) { res.submissiondate3 = ''; }
    //         if (res.submissiondate4.includes('1900')) { res.submissiondate4 = ''; }
    //         this.sample = res;
    //         console.log(res);
    //
    //     }, error => {
    //         console.log(error);
    //     });
    // }
    exporttoExcel(): void {
        const fileName = 'Master Price Details details';
        const columns = [
            // {header: 'Section', key: 'productcategory', width: 15},
            // {header: 'Sample Name', key: 'samplename', width: 15},
            // {header: 'Customer Sample Name', key: 'customersamplename', width: 15},
            // {header: 'Part No.', key: 'partnoid', width: 25},
            // {header: 'Buyer ', key: 'brand', width: 25},
            {header: 'Sales Executive', key: 'firstname', width: 10},
            // {header: 'Customer', key: 'clientname', width: 10},
            // {header: 'Length', key: 'length', width: 10},
            // {header: 'Width', key: 'width', width: 10},
            // {header: 'Cost', key: 'cost', width: 10},
            // {header: 'Price', key: 'price', width: 10},
            // {header: 'Per Quantity  ', key: 'perqty', width: 30},
        ];
        this.api.exportToExcel(columns, this.price.map(this.mapData), fileName);
    }
    mapData(items) {
        return {
            // productcategory: items.productCategory ? items.productCategory.productcategoryname : '',
            // samplename: items.sample ? items.sample.samplename : '',
            // customersamplename: items.sample ? items.sample.customersamplename : '',
            // partnoid: items.partNo ? items.partNo.listitem : '',
            // brand: items.brand ? items.brand.brandname : '',
            firstname: items.salesPerson ? items.salesPerson.firstname : '',
            // clientname: items.customer ? items.customer.clientname : '',
            // length: items.length,
            // width: items.width,
            // cost: items.cost,
            // price: items.price,
            // perqty: items.perquantity,
        };
    }
  ngOnInit() {
    this.get(this.id);
    // this.gets(this.id);
    // this.gets(this.id);
  }

}
