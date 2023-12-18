import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { DepartmentComponent } from './admin/components/department/department.component';
import { PositionComponent } from './admin/components/position/position.component';
import { EmployeeComponent } from './admin/components/employee/employee.component';

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
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
