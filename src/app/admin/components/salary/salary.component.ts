import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AttendancesService } from '../../service/attendances/attendances.service';
import { SalaryService } from '../../service/salary/salary.service';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent implements OnInit  {
    constructor (private attendancesService : AttendancesService, private router: Router, 
        private activatedRoute: ActivatedRoute, private salarySerivce : SalaryService) {}
    
    Month: any;
    Year: any;
    data: any;
    p: number = 1;

    // totalDayInMonth: any;
    // months: number[] = Array.from({ length: 12 }, (_, index) => index + 1);
    // days: number[] = Array.from({ length:31 }, (_, index) => index + 1);
    // hidden: boolean = true;

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            this.Month = params['month'];
            this.Year = params['year'];
            this.getSalary();

        });
    }


    getSalary() {
        let body = {
            Month: this.Month,
            Year: this.Year
        }

        this.salarySerivce.get(body).subscribe((res) => {
            this.data = res.data;
            
        })
    }

    //handle file upload
    handleFileInput(event: any) {
        const files = event.target.files;
        
        const formData = new FormData();
        formData.append('file', files[0]);
        
        this.salarySerivce.import(formData).subscribe((res) => {
            this.getSalary();
        });
    }

    //export file
    export(){
        this.salarySerivce.export().subscribe((res) => {
            this.downloadFile(res, 'salary.xlsx');  
        });      
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
