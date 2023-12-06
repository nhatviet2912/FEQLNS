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

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SidebarComponent,
    HeaderComponent,
    DashboardComponent,
    DepartmentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
