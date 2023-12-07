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
    dataDepartmentId: any = [];
    fomartDataApiId: any = [];
    DepartmentCode: string = '';
    DepartmentName: string = '';
    Description: string ='';
    showModalFlag: boolean = false;
    modalType: 'create' | 'update' = 'create';
    departmentId: number = 0;

    ngOnInit(): void {
        this.getAllDepartment();
    }

    //Show Modal
    showModalDepartment(type: 'create' | 'update') {
        document.querySelector('.manager__modal')?.classList.add('active');
        document.querySelector('.manager__modal-content')?.classList.add('scale-up-center');
        this.modalType = type;
    }

    //Hide Modal
    closeModalDepartment(){
        document.querySelector('.manager__modal')?.classList.remove('active');
        document.querySelector('.manager__modal-content')?.classList.remove('scale-up-center');
    }

    editModalDepartment(Id: number) {
        this.showModalDepartment('update');
        this.getById(Id);
        console.log(this.fomartDataApiId);
        

    }

    //call api get all 
    getAllDepartment() {
        this.departmentService.getList().subscribe((res: any[]) => {
            this.dataDepartment = res;
            this.fomartDataApi = this.dataDepartment.data;
        })
    }

    //call api get by id
    getById(Id: number){
        this.departmentService.getById(Id).subscribe(res => {
            this.dataDepartmentId = res;
            this.fomartDataApiId = this.dataDepartmentId.data;            
        })
    }

    submitForm(){
        if (this.modalType === 'create') {
            // Thực hiện xử lý tạo mới
            this.createDepartment();
        } else {
            // Thực hiện xử lý cập nhật
            this.updateDepartment();
        }
        // Đóng modal sau khi tạo mới hoặc cập nhật
        this.closeModalDepartment();
    }

    //call api create
    createDepartment() {
        
        let body = {
            DepartmentCode : this.DepartmentCode,
            DepartmentName: this.DepartmentName,
            Descriptions: this.Description
        }
        
        this.departmentService.postDepartment(body).subscribe(res => {
            this.closeModalDepartment();
            this.getAllDepartment();
        })
        
    }

    updateDepartment() {
        let body = {
            DepartmentCode : this.fomartDataApiId.DepartmentCode,
            DepartmentName: this.fomartDataApiId.DepartmentName,
            Descriptions: this.fomartDataApiId.Description
        }
        console.log(body);
        
        
    }
    
}
