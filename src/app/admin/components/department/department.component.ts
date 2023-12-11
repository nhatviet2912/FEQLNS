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
    Descriptions: string ='';
    showModalFlag: boolean = false;
    modalType: 'create' | 'update' = 'create';
    modelTypeMessage: 'delete' | 'error' = 'delete';
    departmentId: number = 0;
    departmentIdDelete: number = 0;
    departmentCode: string | null = null;
    message: string | null = null;
    searchKeyWord: string | null = null;

    ngOnInit(): void {
        this.getAllDepartment();
    }

    //Show Modal
    showModalDepartment(type: 'create' | 'update') {
        document.querySelector('.manager__modal')?.classList.add('active');
        document.querySelector('.manager__modal-content')?.classList.add('scale-up-center');
        this.modalType = type;
        if(type == 'create') {
            this.resetInput();
        }
    }

    //show modal confirm xóa 
    showConfirmDialog(type: 'delete' | 'error') {
        document.querySelector('.manager__alert')?.classList.add('active');
        document.querySelector('.manager__alert-content')?.classList.add('scale-up-center');
        this.modelTypeMessage = type;
    }

    //close modal confirm xóa
    closeConfirmDialog() {        
        document.querySelector('.manager__alert')?.classList.remove('active');
        document.querySelector('.manager__alert-content')?.classList.remove('scale-up-center');
    }

    //Hide Modal
    closeModalDepartment(){
        document.querySelector('.manager__modal')?.classList.remove('active');
        document.querySelector('.manager__modal-content')?.classList.remove('scale-up-center');
    }

    //reset inpu Modal
    resetInput(){
        this.DepartmentCode = '';
        this.DepartmentName = '';
        this.Descriptions = '';
    }

    //click edit
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
            console.log(this.fomartDataApi);
            
        })
    }

    //call api get by id
    getById(Id: number){
        this.departmentService.getById(Id).subscribe(res => {
            this.dataDepartmentId = res;
            this.fomartDataApiId = this.dataDepartmentId.data;            
        })
    }

    //submit form
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
            Descriptions: this.Descriptions
        }
        
        this.departmentService.postDepartment(body).subscribe((res) => {
            this.closeModalDepartment();
            this.getAllDepartment();
        }, (error) => {
            if(error.error){
                this.showConfirmDialog('error')
                this.message = error.error.message; 
            }
        })
        
    }

    //call api update
    updateDepartment() {
        let body = {
            DepartmentCode : this.fomartDataApiId.DepartmentCode,
            DepartmentName: this.fomartDataApiId.DepartmentName,
            Descriptions: this.fomartDataApiId.Descriptions
        }
        let id = this.fomartDataApiId.Id;
        
        this.departmentService.putDepartment(id, body).subscribe((res) => {
            this.getAllDepartment();            
        }, (err) => {
            if(err.error){
                this.showConfirmDialog('error')
                this.message = err.error.message; 
            }
        })
    }
    
    //click delete
    deleteDepartment(Id: number, Code: string){
        this.showConfirmDialog('delete')
        this.departmentIdDelete = Id;
        this.departmentCode = Code;
        
    }

    //call api delete
    deleteConfirm() {        
        this.departmentService.delelte(this.departmentIdDelete).subscribe((res) => {
            if(res.message == "success"){
                this.getAllDepartment();
                this.closeConfirmDialog();
            }
        }, (err) => {
            if(err.error){
                this.showConfirmDialog('error')
                this.message = err.error.message; 
            }
        });
    }

    //handle file upload
    handleFileInput(event: any) {
        const files = event.target.files;
        
        const formData = new FormData();
        formData.append('file', files[0]);
        
        this.departmentService.importDepartment(formData).subscribe((res) => {
            this.getAllDepartment();
        });
    }

    //export file
    exportDepartment(){
        this.departmentService.exportDepartments().subscribe((res) => {
            this.downloadFile(res, 'department.xlsx');  
        });      
    }

    searchDepartment() {
        console.log(this.searchKeyWord);
        
    }

    //download files
    private downloadFile(data: Blob, filename: string) {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }
}
