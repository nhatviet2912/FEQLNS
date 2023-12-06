import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../service/departmentService/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css', ]
})
export class DepartmentComponent implements OnInit {
    constructor(private departmentService : DepartmentService) {}
    dataDepartment: any = [];
    fomartDataApi: any = [];
    ngOnInit(): void {
        console.log(1);
        this.departmentService.getList().subscribe((res: any[]) => {
            this.dataDepartment = res;
            this.fomartDataApi = this.dataDepartment.data;
        })
    }


    //Show Modal
    showModalDepartment() {
        document.querySelector('.manager__modal')?.classList.add('active');
        document.querySelector('.manager__modal-content')?.classList.add('scale-up-center');
    }

    //Hide Modal
    closeModalDepartment(){
        document.querySelector('.manager__modal')?.classList.remove('active');
        document.querySelector('.manager__modal-content')?.classList.remove('scale-up-center');
    }
}
