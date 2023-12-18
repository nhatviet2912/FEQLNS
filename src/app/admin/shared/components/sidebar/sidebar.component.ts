import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

    fakeData = [
        {
            path: '/',
            name: 'Tổng quan',
            icons: "fas fa-chart-pie-alt"
        },
        {
            path: '/department',
            name: 'Quản lý phòng ban',
            icons: "far fa-city"
        },
        {
            path: '/position',
            name: 'Quản lý chức vụ',
            icons: "far fa-city"
        },
        {
            path: '/employee',
            name: 'Quản lý nhân viên',
            icons: "far fa-city"
        }
    ]
}
