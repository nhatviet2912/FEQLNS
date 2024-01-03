import { EmployeeService } from '../../service/employeeService/employee.service';
import { ContractService } from './../../service/contract/contract.service';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit{
    constructor(private contractService : ContractService, private employeeSerive : EmployeeService) {}
    searchKeyWord: string = '';
    data: any = [];
    fomartDataApiId:any = [];
    dataDropdown:any = [];
    dropdown: any = [];

    modalType: 'create' | 'update' = 'create';
    modelTypeMessage: 'delete' | 'error' = 'delete';
    message: string ='';


    ContractCode: string = '';
    ContractName: string = '';
    ContractStartDate: string ='';
    ContractEndDate: string = '';
    ContractTerm: string = '';
    SalaryCoefficient: string = '';
    SalaryBasic: string = '';
    Contract_Employee_id: string = '';

    IdDelete: number = 0;
    code: string | null = null;

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

    //Hide Modal
    closeModal(){
        document.querySelector('.manager__modal')?.classList.remove('active');
        document.querySelector('.manager__modal-content')?.classList.remove('scale-up-center');
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

    //reset inpu Modal
    resetInput(){
        this.ContractCode = '';
        this.ContractName = '';
        this.ContractStartDate ='';
        this.ContractEndDate = '';
        this.ContractTerm = '';
        this.SalaryCoefficient = '';
        this.SalaryBasic = '';
        this.Contract_Employee_id = '';
    }

    getPageData() {
        this.contractService.getPageData(this.pageSize, this.pageIndex).subscribe((response) => {
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

    editContract(Id: number){
        this.showModal('update');
        this.getById(Id);
    }

    getById(Id: number){
        this.contractService.getById(Id).subscribe(res => {
            this.fomartDataApiId = res.data;                       
        })
    }

    getDropdown() {
        this.employeeSerive.getList().subscribe((response) => {
            this.dropdown = response;
            this.dataDropdown = this.dropdown.data;            
        });
    }

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

    create(){

        let body = {
            ContractCode: this.ContractCode,
            ContractName: this.ContractName,
            ContractStartDate: this.ContractStartDate,
            ContractEndDate: this.ContractEndDate,
            ContractTerm: this.ContractTerm,
            SalaryCoefficient: this.SalaryCoefficient,
            SalaryBasic: this.SalaryBasic,
            Contract_Employee_id: this.Contract_Employee_id
        }
        
        this.contractService.post(body).subscribe((res) => {
            this.closeModal();
            this.getPageData();
        }, (error) => {
            if(error.error){
                this.showConfirmDialog('error')
                this.message = error.error.message; 
            }
        })
        
    }

    update() {
        let body = {
            ContractCode : this.fomartDataApiId.ContractCode,
            ContractName: this.fomartDataApiId.ContractName,
            ContractStartDate : this.fomartDataApiId.ContractStartDate,
            ContractEndDate : this.fomartDataApiId.ContractEndDate,
            ContractTerm: this.fomartDataApiId.ContractTerm,
            SalaryCoefficient : this.fomartDataApiId.SalaryCoefficient,
            SalaryBasic : this.fomartDataApiId.SalaryBasic,
            Contract_Employee_id : this.fomartDataApiId.Contract_Employee_id
        } 
        let id = this.fomartDataApiId.Id;
        
        this.contractService.put(id, body).subscribe((res) => {
            this.getPageData();            
        }, (err) => {
            if(err.error){
                this.showConfirmDialog('error')
                this.message = err.error.message; 
            }
        })
    }

    delete(Id: number, ContractCode: string) {
        this.showConfirmDialog('delete')
        this.IdDelete = Id;
        this.code = ContractCode;
    }

    deleteConfirm() {
        this.contractService.delete(this.IdDelete).subscribe((res) => {
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

    //search
    search() {
        let body = {
            KeyWord: this.searchKeyWord
        }
        this.contractService.search(body).subscribe((res) => {            
            this.data = res;            
        })
    }

    //handle file upload
    handleFileInput(event: any) {
        const files = event.target.files;
        const formData = new FormData();
        formData.append('file', files[0]);
        
        this.contractService.import(formData).subscribe((res) => {
            this.getPageData();
        });
    }

    //export file
    export(){
        this.contractService.export().subscribe((res) => {
            this.downloadFile(res, 'contract.xlsx');  
        });      
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
