import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

	constructor(private http : HttpClient) { }

	private baseURL = `http://localhost:3000`;

	getList() : Observable<any[]> {
		return this.http.get<any>(`${this.baseURL}/department`);
	}

	getById(id : number) : Observable<any> {
		return this.http.get<any>(`${this.baseURL}/department/getById/${id}`);
	}

	postFile(request: any): Observable<any> {
		return this.http.post('http://localhost:3000/employees/upload', request);
	}
	
	postDepartment(request: any): Observable<any> {
		return this.http.post(`${this.baseURL}/department/create`, request);
	}



}
