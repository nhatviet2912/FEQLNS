import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarveldetailService } from '../../service/marveldetails/marveldetail.service';

@Component({
  selector: 'app-marveldetails',
  templateUrl: './marveldetails.component.html',
  styleUrls: ['./marveldetails.component.css']
})
export class MarveldetailsComponent implements OnInit  {
    constructor (private router: Router, private activatedRoute: ActivatedRoute, private marvelDetailsService : MarveldetailService) {}

    month: any;
    year: any;
    marvelcode: any;
    data: any;
    daysInMonth: number = 0;
    columnHeaders: string[] = [];
    row: string[] = [];
    isEditing: boolean = true;
    dataUpdate: any;
    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            this.month = params['month'];
            this.year = params['year'];
            this.marvelcode = params['marvelcode'];
            this.create();
            
            
        });
    }
    onDoubleClick(event: any, item: any, day: any): void {
      // Đặt thuộc tính isEditing của day thành true để hiển thị input
      this.isEditing = false;
      this.dataUpdate = item
    
    }
  
    // Hàm xử lý sự kiện khi input mất focus
    onBlur(event: any, item: any, day: any): void {
      // Đặt thuộc tính isEditing của day thành false để hiển thị giá trị từ input
      this.isEditing = true;
    }

    onUpdateClick() {
        console.log(this.dataUpdate);
    }


    create() {
        let body = {
            Month: this.month,
            Year: this.year,
            MarvelCode: this.marvelcode
        }
        this.marvelDetailsService.post(body).subscribe((res: any[]) => {
            this.data = res;

            this.columnHeaders = this.data[0].weekdays.map((day: any) => day.weekday);
            this.row = this.data[0].weekdays.map((day: any) => day.day);

            
            console.log(this.columnHeaders);
            

        })
    }

    getDayNumber(month: number, year: number) {
        let daysInMonth;
    
        switch (month) {
            case 1: // January
            case 3: // March
            case 5: // May
            case 7: // July
            case 8: // August
            case 10: // October
            case 12: // December
                daysInMonth = 31;
                break;
    
            case 4: // April
            case 6: // June
            case 9: // September
            case 11: // November
                daysInMonth = 30;
                break;
    
            case 2: // February
                // Check if it's a leap year
                daysInMonth = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0) ? 29 : 28;
                break;
    
            default:
                throw new Error('Invalid month');
        }
    
        return daysInMonth;
    }

    getDayOfWeek(dayValue: string): string {
        console.log(dayValue);
        
        switch (dayValue) {
          case 'CN':
            return 'Chủ Nhật';
          case 'T2':
            return 'Thứ Hai';
          case 'T3':
            return 'Thứ Ba';
          case 'T4':
            return 'Thứ Tư';
          case 'T5':
            return 'Thứ Năm';
          case 'T6':
            return 'Thứ Sáu';
          case 'T7':
            return 'Thứ Bảy';
          default:
            return '';
        }
    }

}
