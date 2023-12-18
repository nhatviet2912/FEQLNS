import { Component, OnInit } from '@angular/core';
import { PositionService } from '../../service/positionService/position.service';
import { DepartmentService } from '../../service/departmentService/department.service';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit{
    constructor(private positionService : PositionService, private departmentService: DepartmentService) {}
    data: any = [];
    fomartDataApi: any = [];
    dataId: any = [];
    fomartDataApiId: any = [];
    modelCode: string = '';
    modelName: string = '';
    Descriptions: string ='';
    showModalFlag: boolean = false;
    modalType: 'create' | 'update' = 'create';
    modelTypeMessage: 'delete' | 'error' = 'delete';
    departmentId: number = 0;
    IdDelete: number = 0;
    code: string | null = null;
    message: string | null = null;
    searchKeyWord: string | null = null;
    dataDropdown: any = [];
    dropdown: any = [];
    Department_id: any;

    ngOnInit(): void {
        this.getAll();
    }

    

    //Show Modal
    showModal(type: 'create' | 'update') {
        document.querySelector('.manager__modal')?.classList.add('active');
        document.querySelector('.manager__modal-content')?.classList.add('scale-up-center');
        this.getDropdown();
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
    closeModal(){
        document.querySelector('.manager__modal')?.classList.remove('active');
        document.querySelector('.manager__modal-content')?.classList.remove('scale-up-center');
    }

    //reset inpu Modal
    resetInput(){
        this.modelCode = '';
        this.modelName = '';
        this.Descriptions = '';
    }

    //click edit
    editModal(Id: number) {
        this.showModal('update');
        this.getById(Id);
        console.log(this.fomartDataApiId);
    }

    //call api get all 
    getAll() {
        this.positionService.getList().subscribe((res: any[]) => {
            this.data = res;
            this.fomartDataApi = this.data.data;
            console.log(this.fomartDataApi);
            
        })
    }

    //call api get by id
    getById(Id: number){
        this.positionService.getById(Id).subscribe(res => {
            this.dataId = res;
            this.fomartDataApiId = this.dataId.data;            
        })
    }

    //submit form
    submitForm(){
        if (this.modalType === 'create') {
            // Thực hiện xử lý tạo mới
            this.create();
        } else {
            // Thực hiện xử lý cập nhật
            this.update();
        }
        // Đóng modal sau khi tạo mới hoặc cập nhật
        this.closeModal();
    }

    //call api create
    create() {        
        
        let body = {
            PositionCode : this.modelCode,
            PositionName: this.modelName,
            Descriptions: this.Descriptions,
            Department_id: this.Department_id
        }        
        
        this.positionService.postPosition(body).subscribe((res) => {
            this.closeModal();
            this.getAll();
        }, (error) => {
            if(error.error){
                this.showConfirmDialog('error')
                this.message = error.error.message; 
            }
        })
        
    }

    //call api update
    update() {
        let body = {
            PositionCode : this.fomartDataApiId.PositionCode,
            PositionName: this.fomartDataApiId.PositionName,
            Descriptions: this.fomartDataApiId.Descriptions,
            Department_id: this.fomartDataApiId.Department_id

        }
        let id = this.fomartDataApiId.Id;
        
        this.positionService.putPosition(id, body).subscribe((res) => {
            this.getAll();            
        }, (err) => {
            if(err.error){
                this.showConfirmDialog('error')
                this.message = err.error.message; 
            }
        })
    }
    
    //click delete
    delete(Id: number, Code: string){
        this.showConfirmDialog('delete')
        this.IdDelete = Id;
        this.code = Code;
        
    }

    //call api delete
    deleteConfirm() {        
        this.positionService.delete(this.IdDelete).subscribe((res) => {
            if(res.message == "success"){
                this.getAll();
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
        
        this.positionService.importPosition(formData).subscribe((res) => {
            this.getAll();
        });
    }

    //export file
    export(){
        this.positionService.exportPosition().subscribe((res) => {
            this.downloadFile(res, 'position.xlsx');  
        });      
    }

    //search
    search() {
        let body = {
            KeyWord: this.searchKeyWord
        }
        this.positionService.searchPosition(body).subscribe((res) => {
            this.fomartDataApi = res.data;
            
        })
    }

    //get dropdown
    getDropdown() {
        this.departmentService.getList().subscribe(res => {
            this.dropdown = res;
            this.dataDropdown = this.dropdown.data;
            console.log(this.dataDropdown);
            
        })
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
