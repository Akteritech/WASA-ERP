import {Component} from '@angular/core';
import {ComponentModalConfig, ModalSize, SuiModal} from 'ng2-semantic-ui';
interface PoPContext {
  title: string;
  componentName: string;
}
@Component({
  selector: 'app-pop-compo',
  template: `
  <div class="ui header" >
    <div class="header">
      {{ modal.context.title }}
      <label class="ui bg-white huge top right attached label" (click)="modal.deny(undefined)"><i class="ui x link icon"></i>
    </label>
  </div>
  </div>
  <div class="scrolling content">
    <app-add-company *ngIf="compname==='company'" ></app-add-company>
    <app-add-brand *ngIf="compname==='brand'" ></app-add-brand>
    <app-add-customer *ngIf="compname==='customers'" ></app-add-customer>
    <app-add-department *ngIf="compname==='department'" ></app-add-department>
    <app-add-employee *ngIf="compname==='employee'" ></app-add-employee>
    <app-add-designation *ngIf="compname==='designation'" ></app-add-designation>
    <app-add-product-category *ngIf="compname==='product categories'" ></app-add-product-category>
    <app-add-product-sub-category *ngIf="compname==='product sub categories'" ></app-add-product-sub-category>
    <app-add-program *ngIf="compname==='program'" ></app-add-program>
    <app-add-sample-color *ngIf="compname==='samplecolor'" ></app-add-sample-color>
    <app-add-supplier *ngIf="compname==='suppliers'" ></app-add-supplier>
    <app-add-lov *ngIf="compname==='lov'" ></app-add-lov>
    <app-add-master-price-entry *ngIf="compname==='finish'" ></app-add-master-price-entry>
    <app-add-sample-color *ngIf="compname==='color'" ></app-add-sample-color>
    <app-add-master-price-entry *ngIf="compname==='price'" ></app-add-master-price-entry>
    <app-add-sample-part-wise *ngIf="compname==='partno'" ></app-add-sample-part-wise>
    <app-add-fabric-composition *ngIf="compname==='fabric'" ></app-add-fabric-composition>
  </div>
  `
})
export class PopCompoComponent {

  compname: any;
  constructor(public modal: SuiModal<PoPContext, void, void> ) {
    this.compname = modal.context.componentName;
  }
}

export class PopDetails extends ComponentModalConfig<PoPContext, void, void> {
  constructor(title: string, componentName: string, ) {
    super(PopCompoComponent, { title, componentName});
    this.isClosable = false;
    this.transitionDuration = 150;
    this.size = ModalSize.Large;
  }
}
