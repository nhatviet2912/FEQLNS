import { Route, Router } from '@angular/router';
import { MarvelService } from './../../service/marvel/marvel.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marvel',
  templateUrl: './marvel.component.html',
  styleUrls: ['./marvel.component.css']
})
export class MarvelComponent implements OnInit {
    constructor(private marvelService : MarvelService, private router : Router) {}
    data: any;

    pageSize = 10;
    pageIndex = 1;
    totalPages = 1;

    ngOnInit(): void {
        this.getPageData();
    }


    getPageData() {
        this.marvelService.getPageData(this.pageSize, this.pageIndex).subscribe((response) => {
            this.data = response.data;
            
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

    editMarvelDetails(Month: number, Year: number){
        // console.log(Month, Year);
        this.router.navigate(['getattendance', Month, Year]);
        
    }

    salary(Month: number, Year: number){
        this.router.navigate(['salary', Month, Year]);
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
}
