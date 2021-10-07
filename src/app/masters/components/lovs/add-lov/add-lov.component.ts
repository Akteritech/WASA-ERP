import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from '../../../../api.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
export class LOV {
  listitem: any;
  listvalue: any;
  listsequence: any;
  remarks: any;
  lovtype: any;
  lovid: any;
  isdefault: any;
  createddate: any;
  constructor () {
    this.listitem = '';
    this.listvalue = '';
    this.listsequence = '';
    this.remarks = '';
    this.lovtype = '';
    this.lovid = '';
    this.isdefault = '';
    this.createddate = new Date();
  }

}
export class LOVTYPE {
  listitem: any;
  listvalue: any;
  listsequence: any;
  remarks: any;
  lovtype: any;
  lovid: any;
  isdefault: boolean;
  createddate: any;
  constructor () {
    this.listitem = '';
    this.listvalue = '';
    this.listsequence = 0;
    this.remarks = '';
    this.lovtype = '';
    this.isdefault = false;
    this.createddate = new Date();
  }
}
@Component({
  selector: 'app-add-lov',
  templateUrl: './add-lov.component.html',
  styleUrls: ['./add-lov.component.css']
})
export class AddLovComponent implements OnInit {
  master: LOV;
  lovsDetails: any;
  lovData: any;
  response: any;
  currentRoute: any;
  response1: any;
  newlovtype: LOVTYPE;
  lovs: any;
  @Output() added = new EventEmitter<boolean>();
  @Input() id: number;
  private FabricCompositions: any;
  constructor(public api: ApiService, private route: ActivatedRoute, private router: Router) {
    this.master = new LOV();
    this.lovData = new LOV();
    this.newlovtype = new LOVTYPE();
    this.route.params.subscribe( params => {
        if (params.id) {
            this.getLov(params.id);
        }
    });
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = this.router.url;
        }
      }
    );
  }
  includes(route) {
    if (this.currentRoute) {
      return this.currentRoute.toString().includes(route);
    }
    return false;
  }
  getLov(id) {
    this.api.getdata('lovData/' + id).subscribe( (res: any) => {
      // this.master = res;
      // this.lovData = res;
      this.newlovtype = res;
      console.log(res);
    }, err => {
      console.log(err );

    });
  }
  selectedLOVData() {
    this.master.lovid = this.lovData.lovid;
    this.master.lovtype = this.lovData.lovtype;
  }

  optionsLookupLOVS(query) {
    const filter: any = {};
    filter['where'] = {};
    filter['order'] = 'id DESC';
    filter['limit'] = 10;
    if (this.lovData) {
      filter['where']['lovtype'] = {};
      filter['where']['lovtype']['like'] = '%25' + query + '%25';
    }
    this.get();
    this.added.emit(true);
    this.api.getdata('lovData?filter=' + JSON.stringify(filter)).subscribe( (res: any) => {
      this.lovs = res;
    }, error1 => {
      console.log('error1 ', error1);
    });
  }
  optionsFabricComposition(query) {
    const filter: any = {};
    filter['where'] = {};
    filter['where']['listitem'] = {};
    filter['where']['listitem']['like'] = '%25' + query + '%25';
    filter['where']['lovid'] = 1124;
    filter['limit'] = 10;
    filter['order'] = 'id DESC';
    this.api.getdata('lovData?filter=' + JSON.stringify(filter)).subscribe( (res: any) => {
      this.FabricCompositions = res;
    }, error1 => {
      console.log('error1 ', error1);
    });
  }
  updateData() {
    this.api.patchdata('lovData' ,  this.newlovtype ).subscribe(res1 => {
      this.response1 = res1;
      this.optionsLookupLOVS('a');
      this.api.showSuccessToast('New Lov Updated successfully', this.response1.message);
      this.get();
      this.added.emit(true);
      console.log(res1);
    }, error1 => {
      console.log(error1);
    });
  }
  add() {
    if (!this.newlovtype.lovtype) {
      this.api.showWarningToast('New List Type required', '');
      return ;
    } else if (!this.newlovtype.listitem) {
      this.api.showWarningToast('Listitem required', '');
      return ;
    } else if (!this.newlovtype.listvalue) {
      this.api.showWarningToast('List Value required', '');
      return ;
    } else if (!this.newlovtype.listsequence || this.newlovtype.listsequence === 0) {
      this.api.showWarningToast('List Sequence required', '');
      return ;
    }
    this.newlovtype.lovid = 0;
    this.api.patchdata('lovData/addLov' , {data: this.newlovtype}).subscribe(res1 => {
      this.response1 = res1;
      this.optionsLookupLOVS('a');
      this.api.showSuccessToast('New Lov added successfully', this.response1.message);
      this.newlovtype = new LOV();
      this.get();
      this.added.emit(true);
      console.log(res1);
    }, error1 => {
      console.log(error1);
    });
  }
  AddFabric(){
    this.newlovtype.lovid = 1124;
    this.api.patchdata('lovData/addLov' , {data: this.newlovtype}).subscribe(res1 => {
      this.response1 = res1;
      this.optionsLookupLOVS('a');
      this.api.showSuccessToast('New Fabric added successfully', this.response1.message);
      this.newlovtype = new LOV();
      this.get();
      this.added.emit(true);
      console.log(res1);
    }, error1 => {
      console.log(error1);
    });
  }
  patch(form) {
    if (!this.master.listitem) {
      this.api.showWarningToast('New List Item must be selected', 'in create new list');
      return ;
    }
    this.master.lovid = this.lovData.lovid;
    this.master.lovtype = this.lovData.lovtype;
    this.master.listvalue = this.lovData.listvalue;
    this.master.listsequence = this.lovData.listsequence;
    this.master.remarks = this.lovData.remarks;
    this.master.isdefault = this.lovData.isdefault;
    this.api.patchdata('lovData/addLov' , {data: this.master}).subscribe(res => {
      this.response = res;
      this.optionsLookupLOVS('a');
      this.api.showSuccessToast('New Lov added successfully', this.response.message);
      console.log(res);
      this.master = new LOV();
      this.lovData = new LOV();
      this.get();
      this.added.emit(true);
    }, error1 => {
      console.log(error1);
    });
  }
  get() {
    this.api.getdata('lovData').subscribe(res => {
      this.lovsDetails = res;
    }, err => {
      console.log('Class: InventoryWarehousesComponent, Line: 28 err ', err);
    });
  }
  ngOnInit() {
    this.optionsLookupLOVS('a');
    this.optionsFabricComposition('a');
    if (this.id) {
      this.getLov(this.id);
    }
  }
}
