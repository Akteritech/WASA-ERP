import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SuiModule, SuiProgressModule} from 'ng2-semantic-ui';
import {NgxBarcodeModule} from 'ngx-barcode';
import {HttpClientModule} from '@angular/common/http';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {ConfirmModalComponent} from './templates/confirm-modal/confirm-modal.component';
import {ShowDetailComponent} from './templates/show-detail/show-detail.component';
import {EditDetailComponent} from './templates/edit-detail/edit-detail.component';
import {MastersModule} from './masters/masters.module';
import {WovenModule} from './woven/woven.module';
import {InventoryModule} from './inventory/inventory.module';
import { DatePipe } from '@angular/common';
import {NgxPrintModule} from 'ngx-print';
import {PopCompoComponent} from './templates/pop-compo/pop-compo.component';
import {CostingModule} from './costing/costing.module';
import {PflModule} from './pfl/pfl.module';
import {HeattransferModule} from './HeatTransfer/heattransfer.module';
import {OffsetModule} from './offset/offset.module';
import { SamplesDashboardComponent } from './samples-dashboard/samples-dashboard.component';
import { OrdersDashboardComponent } from './orders-dashboard/orders-dashboard.component';
import {ThermalModule} from './thermal/thermal.module';
import {ScreenPrintModule} from './screenPrint/screenPrint.module';
import {ApiService} from './api.service';
import {UserLoginComponent} from './user-login/user-login.component';
import { JobCardDashboardComponent } from './job-card-dashboard/job-card-dashboard.component';
import {HrmModule} from './hrm/hrm.module';
import { WorkOrderForAllRoutingModule } from './work-order-for-all-category/work-order-for-all-routing.module';
import {WorkOrderForAllModule} from './work-order-for-all-category/work-order-for-all.module';
import { SampleForAllCategoryComponent } from './sample-for-all-category/sample-for-all-category.component';
import { SampleForAllRoutingModule } from './sample-for-all-category/sample-for-all-routing.module';
import {SampleForAllModule} from './sample-for-all-category/sample-for-all.module';
import {CreateWOComponent} from './create-wo/create-wo.component';
import {AddCreateWoComponent} from './create-wo/add-create-wo/add-create-wo.component';
import {ShowCreateWoComponent} from './create-wo/show-create-wo/show-create-wo.component';
import { SampleTrackingComponent } from './sample-tracking/sample-tracking.component';
import {UploadOrdersComponent} from './upload-orders/upload-orders.component';
import { WorkorderreportsComponent } from './workorderreports/workorderreports.component';
import { CsorderreportsComponent } from './workorderreports/csorderreports/csorderreports.component';
import { BuyerorderreportComponent } from './workorderreports/buyerorderreport/buyerorderreport.component';
import { WorkorderconfirmationComponent } from './orders-dashboard/workorderconfirmation/workorderconfirmation.component';
import { OrdertrackingComponent } from './orders-dashboard/ordertracking/ordertracking.component';
import { OrderexportComponent } from './workorderreports/orderexport/orderexport.component';
import { MonthwisesalereportComponent } from './workorderreports/monthwisesalereport/monthwisesalereport.component';
import { ProductioncapecityreportComponent } from './workorderreports/productioncapecityreport/productioncapecityreport.component';
import { DeliverypositionComponent } from './workorderreports/deliveryposition/deliveryposition.component';
import { ExtrareportsComponent } from './workorderreports/extrareports/extrareports.component';
import { ReportpanelComponent } from './workorderreports/reportpanel/reportpanel.component';
import { ReportmasterpriceComponent } from './workorderreports/reportmasterprice/reportmasterprice.component';
import { DeliverychartreportsComponent } from './workorderreports/deliverychartreports/deliverychartreports.component';
import { CRMModule } from './crm/crm.module';
import { PlanningModule } from './planning/planning.module';
import { HoldComponent } from './create-wo/hold/hold.component';
import {CommercialModule} from './commercial/commercial.module';
import {ChallanModule} from "./challan/challan.module";
// import { AgmCoreModule } from '@agm/core';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConfirmModalComponent,
    ShowDetailComponent,
    EditDetailComponent,
    PopCompoComponent,
    SamplesDashboardComponent,
    OrdersDashboardComponent,
    UserLoginComponent,
    JobCardDashboardComponent,
    SampleForAllCategoryComponent,
    //CostingComponent,
    CreateWOComponent,
    AddCreateWoComponent,
    ShowCreateWoComponent,
    SampleTrackingComponent,
    UploadOrdersComponent,
    WorkorderreportsComponent,
    CsorderreportsComponent,
    BuyerorderreportComponent,
    WorkorderconfirmationComponent,
    OrdertrackingComponent,
    OrderexportComponent,
    MonthwisesalereportComponent,
    ProductioncapecityreportComponent,
    DeliverypositionComponent,
    ExtrareportsComponent,
    ReportpanelComponent,
    ReportmasterpriceComponent,
    DeliverychartreportsComponent,
    HoldComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        SuiProgressModule,
        SuiModule,
        NgxBarcodeModule,
        FormsModule,
        HttpClientModule,
        LoadingBarHttpClientModule,
        MastersModule,
        OffsetModule,
        WovenModule,
        NgxPrintModule,
        CostingModule,
        PflModule,
        HeattransferModule,
        ThermalModule,
        ScreenPrintModule,
        HrmModule,
        SampleForAllRoutingModule,
        SampleForAllModule,
        CRMModule,
        PlanningModule,
        CommercialModule,
        ChallanModule,
        
        // AgmCoreModule.forRoot({
        //   // please get your own API key here:
        //   // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
        //   apiKey: 'AIzaSyAvcDy5ZYc2ujCS6TTtI3RYX5QmuoV8Ffw'
        // })
    ],
    
  providers: [DatePipe, ApiService],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmModalComponent, ShowDetailComponent, EditDetailComponent , PopCompoComponent]
,
})
export class AppModule { }
