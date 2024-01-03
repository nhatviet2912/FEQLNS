import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './admin/shared/components/layout/layout.component';
import { SidebarComponent } from './admin/shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './admin/shared/components/header/header.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { DepartmentComponent } from './admin/components/department/department.component';
import { PositionComponent } from './admin/components/position/position.component';
import { EmployeeComponent } from './admin/components/employee/employee.component';
import { AttendancesComponent } from './admin/components/attendances/attendances.component';
import { ContractComponent } from './admin/components/contract/contract.component';
import { MarvelComponent } from './admin/components/marvel/marvel.component';
import { MarveldetailsComponent } from './admin/components/marveldetails/marveldetails.component';
import { GetattendancesComponent } from './admin/components/getattendances/getattendances.component';
import { SalaryComponent } from './admin/components/salary/salary.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SidebarComponent,
    HeaderComponent,
    DashboardComponent,
    DepartmentComponent,
    PositionComponent,
    EmployeeComponent,
    AttendancesComponent,
    ContractComponent,
    MarvelComponent,
    MarveldetailsComponent,
    GetattendancesComponent,
    SalaryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
