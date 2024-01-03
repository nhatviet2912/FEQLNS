import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'department',
        component: DepartmentComponent
    },
    {
        path: 'position',
        component: PositionComponent
    },
    {
        path: 'employee',
        component: EmployeeComponent
    },
    {
        path: 'marvel',
        component: MarvelComponent
    },
    {
        path: 'marveldetail/:month/:year/:marvelcode',
        component: MarveldetailsComponent
    },
    {
        path: 'contract',
        component: ContractComponent
    },
    {
        path: 'attendances',
        component: AttendancesComponent
    },
    {
        path: 'getattendance/:month/:year',
        component: GetattendancesComponent
    },
    {
        path: 'salary/:month/:year',
        component: SalaryComponent
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
