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
            icons: "fa-solid fa-chart-pie"
        },
        {
            path: '/department',
            name: 'Quản lý phòng ban',
            icons: "fa-solid fa-city"
        },
        {
            path: '/position',
            name: 'Quản lý chức vụ',
            icons: "fa-solid fa-graduation-cap"
        },
        {
            path: '/employee',
            name: 'Quản lý nhân viên',
            icons: "fa-solid fa-chalkboard-teacher"
        },
        {
            path: '/marvel',
            name: 'Quản lý chấm công',
            icons: "fa-solid fa-calculator"
        },
        {
            path: '/attendances',
            name: 'Quản lý điểm danh',
            icons: "fa-solid fa-calendar-alt"
        },
        {
            path: '/contract',
            name: 'Quản lý hợp đồng',
            icons: "fa-solid fa-book-open"
        },
        
    ]
}
