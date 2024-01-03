import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AttendancesService } from '../../service/attendances/attendances.service';
import { EmployeeService } from './../../service/employeeService/employee.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { fomartDate, fomartGender} from '../../helper/fomart';

@Component({
  selector: 'app-attendances',
  templateUrl: './attendances.component.html',
  styleUrls: ['./attendances.component.css']
})
export class AttendancesComponent implements OnInit {
    constructor(private employeeService : EmployeeService, private attendancesSerivce : AttendancesService, private fb: FormBuilder, private router : Router) {}
    data: any = [];
    messageData: string= "";
    pageSize = 10;
    pageIndex = 1;
    totalPages = 1;

    // form: FormGroup | undefined;
    // selectedValues: { [key: number]: number } = {};


    ngOnInit(): void {
        this.getAll();
        // this.form = this.fb.group({
        //     // Define your form controls here
        //     // For example:
        //     selectField: ['', Validators.required],
        //   });
    }

    //show modal confirm xóa 
    showConfirmDialog() {
        document.querySelector('.manager__alert')?.classList.add('active');
        document.querySelector('.manager__alert-content')?.classList.add('scale-up-center');
    }

    //close modal confirm xóa
    closeConfirmDialog() {        
        document.querySelector('.manager__alert')?.classList.remove('active');
        document.querySelector('.manager__alert-content')?.classList.remove('scale-up-center');
    }

    getAll() {
        // this.employeeService.getList().subscribe((response) => {
        //     this.data = response;
        // }, (error) => {
        //     console.log(error);
            
        // });

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
        this.getAll();
      
    }

    save() {
        const dt = new Date();
        const year = dt.getFullYear();
        const month = dt.getMonth() + 1;
        const day = dt.getDate();    
        for (let i = 0; i < this.data.data.length; i++) {
            // Lấy giá trị từ trường select trong hàng tương ứng
            const selectElement = document.getElementById('select_' + + this.data.data[i].Id) as HTMLSelectElement;
            const trangThai = selectElement.value;
        
            // Thực hiện lưu trạng thái vào cơ sở dữ liệu hoặc xử lý theo nhu cầu
            console.log(`ID ${this.data.data[i].Id} - Trạng thái: ${trangThai}`);   
                 
            let body = {
                Absent: trangThai,
                EmployeeId: this.data.data[i].Id,
                Day: day,
                Month: month,
                Year: year
            }
                 
            this.attendancesSerivce.post(body).subscribe((res) => {
                if(res.message === 'success'){
                    this.showConfirmDialog();
                    this.messageData = 'Bạn đã điểm danh thành công'
                    this.router.navigate(['getattendance', month, year]);
                }  
            }, 
            (error) => {
                if(error != null){
                    this.messageData = error.error.message;
                    this.showConfirmDialog()
                }
                
            });
        }
    }


    formatGender(gender : number) {
        return gender === 0 ? 'Nữ' : 'Nam';
    }

    // submitForm() {
    //     console.log('Form submitted:', this.form.value);
        
    // }

}
