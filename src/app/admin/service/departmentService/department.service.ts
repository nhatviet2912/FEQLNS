import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http : HttpClient) { }

  getList() : Observable<any[]> {
    return this.http.get<any>('http://localhost:3000/department');
  }

  postFile(request: any): Observable<any> {
    return this.http.post('http://localhost:3000/employees/upload', request);
  }
}
