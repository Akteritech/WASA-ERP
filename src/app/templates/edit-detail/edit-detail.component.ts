import { Component} from '@angular/core';
import {ComponentModalConfig, ModalSize, SuiModal} from 'ng2-semantic-ui';

interface IEditDetailContext {
  title: string;
  componentName: string;
  id: number;
}
@Component({
  selector: 'app-edit-detail',
  template: `
  <div class="ui header" >
    <div class="header">
      {{ modal.context.title }}
      <label class="ui bg-white huge top right attached label" (click)="modal.deny(undefined)"><i class="ui x link icon"></i>
    </label>
  </div>
  </div>
  <div class="scrolling content" id="printSection">
    <app-add-company *ngIf="compname==='company'" [id]="id"></app-add-company>
    <app-add-brand *ngIf="compname==='brand'" [id]="id"></app-add-brand>
    <app-add-customer *ngIf="compname==='customers'" [id]="id"></app-add-customer>
    <app-add-department *ngIf="compname==='department'" [id]="id"></app-add-department>
    <app-add-employee *ngIf="compname==='employee'" [id]="id"></app-add-employee>
    <app-add-designation *ngIf="compname==='designation'" [id]="id"></app-add-designation>
    <app-add-product-category *ngIf="compname==='product categories'" [id]="id"></app-add-product-category>
    <app-add-product-sub-category *ngIf="compname==='product sub categories'" [id]="id"></app-add-product-sub-category>
    <app-add-program *ngIf="compname==='program'" [id]="id"></app-add-program>
    <app-add-supplier *ngIf="compname==='suppliers'" [id]="id"></app-add-supplier>
    <app-add-sample *ngIf="compname==='sample'" [id]="id"></app-add-sample>
    <app-update-time *ngIf="compname==='editAttendance'" [id]="id"></app-update-time>
    <app-hold *ngIf="compname==='hold'" [id]="id"></app-hold>
    <app-edit-salary *ngIf="compname==='editSalary'" [id]="id"></app-edit-salary>
  </div>
  `
})
export class EditDetailComponent {

  compname: any;
  id: any;
  constructor(public modal: SuiModal<IEditDetailContext, void, void> ) {
    this.compname = modal.context.componentName;
    this.id = modal.context.id;
  }
}

export class EditDetail extends ComponentModalConfig<IEditDetailContext, void, void> {
  constructor(title: string, componentName: string, id: any) {
    console.log(id);
    super(EditDetailComponent, { title, componentName, id });
    this.isClosable = false;
    this.transitionDuration = 150;
    this.size = ModalSize.Large;
  }
}
