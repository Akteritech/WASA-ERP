import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CompanyComponent} from './components/company/company.component';
import {SuppliersComponent} from './components/suppliers/suppliers.component';
import {ProgramComponent} from './components/program/program.component';
import {ShowBrandComponent} from './components/brand/show-brand/show-brand.component';
import {ProductCategoriesComponent} from './components/product-categories/product-categories.component';
import {ProductSubCategoriesComponent} from './components/product-sub-categories/product-sub-categories.component';
import {CustomersComponent} from './components/customers/customers.component';
import {ShowCustomerComponent} from './components/customers/show-customer/show-customer.component';
import {DesignationComponent} from './components/designations/designation.component';
import {DepartmentComponent} from './components/department/department.component';
import {ShowDepartmentComponent} from './components/department/show-department/show-department.component';
import {ShowCompanyComponent} from './components/company/show-company/show-company.component';
import {EmployeeComponent} from './components/employee/employee.component';
import {BrandComponent} from './components/brand/brand.component';
import {LovsComponent} from './components/lovs/lovs.component';

import {SampleColorsComponent} from './components/sample-colors/sample-colors.component';
import {SamplePartWisesComponent} from './components/sample-part-wises/sample-part-wises.component';
import {MastersComponent} from './masters.component';
import {AddCompanyComponent} from './components/company/add-company/add-company.component';
import {AddEmployeeComponent} from './components/employee/add-employee/add-employee.component';
import {AddSamplePartWiseComponent} from './components/sample-part-wises/add-sample-part-wise/add-sample-part-wise.component';
import {AddSampleColorComponent} from './components/sample-colors/add-sample-color/add-sample-color.component';
const routes: Routes = [
  {path: '' , redirectTo: 'masters-dashboard', pathMatch: 'full'},
  {path: 'masters-dashboard' , component: MastersComponent },
  {path: 'product-categories' , component: ProductCategoriesComponent},
  {path: 'product-categories/edit/:id' , component: ProductCategoriesComponent},
  {path: 'product-sub-categories' , component: ProductSubCategoriesComponent},
  {path: 'product-sub-categories/edit/:id' , component: ProductSubCategoriesComponent},
  {path: 'customers' , component: CustomersComponent},
  {path: 'customers/edit/:id' , component: CustomersComponent},
  {path: 'designations' , component: DesignationComponent},
  {path: 'designations/edit/:id' , component: DesignationComponent},
  {path: 'departments' , component: DepartmentComponent},
  {path: 'departments/edit/:id' , component: DepartmentComponent},
  {path: 'departments/show/:id' , component: ShowDepartmentComponent},
  {path: 'companies' , component: CompanyComponent},
  {path: 'companies/edit/:id' , component: CompanyComponent},
  {path: 'companies/show/:id' , component: ShowCompanyComponent},
  {path: 'employees' , component: EmployeeComponent},
  {path: 'employees/edit/:id' , component: EmployeeComponent},

  {path: 'brands' , component: BrandComponent},
  {path: 'brands/edit/:id' , component: BrandComponent},
  {path: 'brands/show/:id' , component: ShowBrandComponent},
  {path: 'programs' , component: ProgramComponent},
  {path: 'programs/edit/:id' , component: ProgramComponent},
  {path: 'suppliers' , component: SuppliersComponent},
  {path: 'suppliers/edit/:id' , component: SuppliersComponent},
  {path: 'lovs' , component: LovsComponent},
  {path: 'lovs/edit/:id' , component: LovsComponent},
  {path: 'sample-color' , component: SampleColorsComponent},
  {path: 'sample-color/edit/:id' , component: SampleColorsComponent},
  {path: 'sample-part-wise' , component: SamplePartWisesComponent},
  {path: 'sample-part-wise/edit/:id' , component: SamplePartWisesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
