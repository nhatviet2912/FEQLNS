import { Component, Input, OnInit } from '@angular/core';
import { AttendancesService } from '../../service/attendances/attendances.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { SalaryService } from '../../service/salary/salary.service';

@Component({
  selector: 'app-getattendances',
  templateUrl: './getattendances.component.html',
  styleUrls: ['./getattendances.component.css']
})
export class GetattendancesComponent  implements OnInit {
    constructor (private attendancesService : AttendancesService, private router: Router, 
        private activatedRoute: ActivatedRoute, private salarySerivce : SalaryService) {}
    
    Day: any;
    Month: any;
    Year: any;
    data: any;
    totalDayInMonth: any;
    months: number[] = Array.from({ length: 12 }, (_, index) => index + 1);
    days: number[] = Array.from({ length:31 }, (_, index) => index + 1);
    hidden: boolean = true;
    p: number = 1;

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            this.Month = params['month'];
            this.Year = params['year'];
            this.getWithMonth();

        });
    }

    getData() {
        if(this.Day != undefined) {
            this.hidden = false;
        }
        
        let body = {
            Day: this.Day,
            Month: this.Month,
            Year: this.Year
        }

        console.log(body);
        

        this.attendancesService.get(body).subscribe((res) => {
            this.data = res.data;
            console.log(this.data);
        });
        
    }

    getWithMonth() {
        let body = {
            Month: this.Month,
            Year: this.Year
        }
        this.attendancesService.getWithMonth(body).subscribe((res) => {
            this.data = res.data;
            
        });
    }

    tinhluong(){
        
        
        Object.values(this.data).forEach((item: any) => {
            let body = {
                Month: this.Month,
                Year: this.Year,
                EmployeeId: item.EmployeeId,
                AbsentCount: item.AbsentCount
            }
            this.salarySerivce.post(body).subscribe((res) => {
                if(res.message = 'success'){
                    this.router.navigate(['salary', this.Month, this.Year]);
                }
                
            })
        });
    }

}
