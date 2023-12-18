import { HttpClient, HttpHeaders } from '@angular/common/http';
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

	postDepartment(request: any): Observable<any> {
		return this.http.post(`${this.baseURL}/department/create`, request);
	}

	putDepartment(id: number, request: any): Observable<any> {
		return this.http.put(`${this.baseURL}/department/update/${id}`, request);
	}

	delelte(id: number): Observable<any> {
		return this.http.delete(`${this.baseURL}/department/delete/${id}`);
	}

	searchDepartment(request: any) : Observable<any> {
		return this.http.post(`${this.baseURL}/department/search`, request);
	}

	importDepartment(request: any): Observable<any>{
		return this.http.post(`${this.baseURL}/department/import`, request);
	}

	exportDepartments() : Observable<any>{
		const headers = new HttpHeaders({
			'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		});
		return this.http.get(`${this.baseURL}/department/export`, {
            headers,
            responseType: 'arraybuffer'
        });
	}
}
