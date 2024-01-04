import { PositionService } from './../../service/positionService/position.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { EmployeeService } from '../../service/employeeService/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
    constructor(private employeeService : EmployeeService, private positionService : PositionService) {}

    data: any = [];
    fomartDataApi: any = [];
    dataId: any = [];
    fomartDataApiId: any = [];

    EmployeeCode: string = '';
    EmployeeName: string = '';
    DateOfBirth: string ='';
    Gender: string = '';
    Email: string = '';
    PhoneNumber: string = '';
    Address: string = '';

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
    Position_id: any;

    pageSize = 10;
    pageIndex = 1;
    totalPages = 1;

    ngOnInit(): void {
        this.getPageData();
    }

    @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
        this.closeModal();
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
        this.EmployeeCode = '';
        this.EmployeeName = '';
        this.DateOfBirth ='';
        this.Gender = '';
        this.Email = '';
        this.PhoneNumber = '';
        this.Address = '';
    }

    //click edit
    editModal(Id: number) {
        this.showModal('update');
        this.getById(Id);
        // console.log(this.fomartDataApiId);
    }

    //call api get all 
    getAll() {
        this.employeeService.getList().subscribe((res: any[]) => {
            this.data = res;
            this.fomartDataApi = this.data.data;
            console.log(this.fomartDataApi);
            
        })
    }

    getPageData() {
        this.employeeService.getPageData(this.pageSize, this.pageIndex).subscribe((response) => {
            this.data = response.data;
            console.log(this.data);
            
            this.totalPages = Math.ceil(this.data.total / this.pageSize);            
        },
        (error) => {
            console.error('Error loading data:', error);
        })
        
    }

    onPageChange(newPageIndex: number): void {
        this.pageIndex = newPageIndex;
        this.getPageData();
      
    }

    //call api get by id
    getById(Id: number){
        this.employeeService.getById(Id).subscribe(res => {
            this.dataId = res;
            this.fomartDataApiId = this.dataId.data; 
            console.log(this.fomartDataApiId);
                       
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
            EmployeeCode : this.EmployeeCode,
            EmployeeName: this.EmployeeName,
            DateOfBirth : this.DateOfBirth,
            Gender : this.Gender,
            Email : this.Email,
            PhoneNumber : this.PhoneNumber,
            Address : this.Address,
            Position_id : this.Position_id
        }   
             
        this.employeeService.post(body).subscribe((res) => {
            this.closeModal();
            this.getPageData();
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
            EmployeeCode : this.fomartDataApiId.EmployeeCode,
            EmployeeName: this.fomartDataApiId.EmployeeName,
            DateOfBirth : this.fomartDataApiId.DateOfBirth,
            Gender : this.fomartDataApiId.Gender,
            Email : this.fomartDataApiId.Email,
            PhoneNumber : this.fomartDataApiId.PhoneNumber,
            Address : this.fomartDataApiId.Address,
            Position_id : this.fomartDataApiId.Position_id
        } 
        let id = this.fomartDataApiId.Id;
        
        this.employeeService.put(id, body).subscribe((res) => {
            this.getPageData();            
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
        console.log(Id, Code);
        
    }

    //call api delete
    deleteConfirm() {        
        this.employeeService.delete(this.IdDelete).subscribe((res) => {
            if(res.message == "success"){
                this.getPageData();
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
        
        this.employeeService.import(formData).subscribe((res) => {
            this.getPageData();
        });
    }

    //export file
    export(){
        this.employeeService.export().subscribe((res) => {
            this.downloadFile(res, 'employee.xlsx');  
        });      
    }

    //search
    search() {
        let body = {
            KeyWord: this.searchKeyWord
        }
        this.employeeService.search(body).subscribe((res) => {            
            this.data = res;
        })
    }

    //get dropdown
    getDropdown() {
        this.positionService.getList().subscribe(res => {
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

    formatDate(inputDateString: string) {
        const inputDate = new Date(inputDateString);
        
        if (isNaN(inputDate.getTime())) {
          // Invalid date string, return input as is or handle accordingly
          return inputDateString;
        }
      
        const day = String(inputDate.getDate()).padStart(2, '0');
        const month = String(inputDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = inputDate.getFullYear();
      
        return `${day}/${month}/${year}`;
    }

    formatGender(gender : number) {
        return gender === 0 ? 'Nữ' : 'Nam';
    }
}
