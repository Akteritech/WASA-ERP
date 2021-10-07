import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MastersRoutingModule } from './masters-routing.module';
import { CompanyComponent } from './components/company/company.component';
import {AddCompanyComponent} from './components/company/add-company/add-company.component';
import {ShowCompanyComponent} from './components/company/show-company/show-company.component';
import {DepartmentComponent} from './components/department/department.component';
import {AddDepartmentComponent} from './components/department/add-department/add-department.component';
import {ShowDepartmentComponent} from './components/department/show-department/show-department.component';
import {DesignationComponent} from './components/designations/designation.component';
import {AddDesignationComponent} from './components/designations/add-designation/add-designation.component';
import {EmployeeComponent} from './components/employee/employee.component';
import {AddEmployeeComponent} from './components/employee/add-employee/add-employee.component';
import {ShowEmployeeDetailsComponent} from './components/employee/show-employee-details/show-employee-details.component';
import {BrandComponent} from './components/brand/brand.component';
import {AddBrandComponent} from './components/brand/add-brand/add-brand.component';
import {ShowBrandComponent} from './components/brand/show-brand/show-brand.component';
import {ProductCategoriesComponent} from './components/product-categories/product-categories.component';
import {AddProductCategoryComponent} from './components/product-categories/add-product-category/add-product-category.component';
import {ProductSubCategoriesComponent} from './components/product-sub-categories/product-sub-categories.component';
import {AddProductSubCategoryComponent} from './components/product-sub-categories/add-product-sub-category/add-product-sub-category.component';
import {ProgramComponent} from './components/program/program.component';
import {AddProgramComponent} from './components/program/add-program/add-program.component';
import {SuppliersComponent} from './components/suppliers/suppliers.component';
import {AddSupplierComponent} from './components/suppliers/add-supplier/add-supplier.component';
import {SuiModule} from 'ng2-semantic-ui';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomersComponent} from './components/customers/customers.component';
import {AddCustomerComponent} from './components/customers/add-customer/add-customer.component';
import {ShowCustomerComponent} from './components/customers/show-customer/show-customer.component';
import { LovsComponent } from './components/lovs/lovs.component';
import { AddLovComponent } from './components/lovs/add-lov/add-lov.component';
import {WovenModule} from '../woven/woven.module';
import { SampleColorsComponent } from './components/sample-colors/sample-colors.component';
import { AddSampleColorComponent } from './components/sample-colors/add-sample-color/add-sample-color.component';
import { SamplePartWisesComponent } from './components/sample-part-wises/sample-part-wises.component';
import { AddSamplePartWiseComponent } from './components/sample-part-wises/add-sample-part-wise/add-sample-part-wise.component';
import { MastersComponent } from './masters.component';
import { ShowDesignationComponent } from './components/designations/show-designation/show-designation.component';
import { ShowProgramComponent } from './components/program/show-program/show-program.component';
import {NgxBarcodeModule} from 'ngx-barcode';
import {NgxPrintModule} from 'ngx-print';
import { AddFabricCompositionComponent } from './components/add-fabric-composition/add-fabric-composition.component';

@NgModule({
  imports: [
    CommonModule,
    MastersRoutingModule,
    ReactiveFormsModule,
    SuiModule,
    FormsModule,
    WovenModule,
    NgxBarcodeModule,
    NgxPrintModule
  ],
    exports: [
        AddCompanyComponent,
        AddBrandComponent,
        ShowBrandComponent,
        ShowCompanyComponent,
        ShowCustomerComponent,
        ShowDepartmentComponent,
        ShowEmployeeDetailsComponent,
        AddCustomerComponent,
        AddDepartmentComponent,
        AddEmployeeComponent,
        AddDesignationComponent,
        AddProductCategoryComponent,
        AddProductSubCategoryComponent,
        AddProgramComponent,
        AddSamplePartWiseComponent,
        AddSampleColorComponent,
        AddSupplierComponent,
        AddLovComponent,
        AddSupplierComponent,
        ShowDesignationComponent,
        ShowProgramComponent,
        AddFabricCompositionComponent
    ],
  declarations: [
    CompanyComponent,
    AddCompanyComponent,
    ShowCompanyComponent,
    DepartmentComponent,
    AddDepartmentComponent,
    ShowDepartmentComponent,
    DesignationComponent,
    AddDesignationComponent,
    EmployeeComponent,
    AddEmployeeComponent,
    ShowEmployeeDetailsComponent,
    BrandComponent,
    AddBrandComponent,
    ShowBrandComponent,
    CustomersComponent,
    AddCustomerComponent,
    ShowCustomerComponent,
    ProductCategoriesComponent,
    AddProductCategoryComponent,
    ProductSubCategoriesComponent,
    AddProductSubCategoryComponent,
    ProgramComponent,
    AddProgramComponent,
    SuppliersComponent,
    AddSupplierComponent,
    LovsComponent,
    AddLovComponent,
    SampleColorsComponent,
    AddSampleColorComponent,
    SamplePartWisesComponent,
    AddSamplePartWiseComponent,
    MastersComponent,
    ShowDesignationComponent,
    ShowProgramComponent,
    AddFabricCompositionComponent,
  ]
})
export class MastersModule { }
