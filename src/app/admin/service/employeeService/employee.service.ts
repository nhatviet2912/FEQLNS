import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

    constructor(private http : HttpClient) { }

	private baseURL = `http://localhost:3000`;

    getList() : Observable<any[]> {
		return this.http.get<any>(`${this.baseURL}/employees`);
	}

	getPageData(pageSize: number, pageIndex: number): Observable<any> {
		const params = new HttpParams()
		  .set('pagesize', pageSize.toString())
		  .set('pageindex', pageIndex.toString());
	
		return this.http.get<any>(`${this.baseURL}/employees/getPageData`, { params });
	}


	getById(id : number) : Observable<any> {
		return this.http.get<any>(`${this.baseURL}/employees/getById/${id}`);
	}

	post(request: any): Observable<any> {
		return this.http.post(`${this.baseURL}/employees/create`, request);
	}

	put(id: number, request: any): Observable<any> {
		return this.http.put(`${this.baseURL}/employees/update/${id}`, request);
	}

	delete(id: number): Observable<any> {
		return this.http.delete(`${this.baseURL}/employees/delete/${id}`);
	}

	search(request: any) : Observable<any> {
		return this.http.post(`${this.baseURL}/employees/search`, request);
	}

	import(request: any): Observable<any>{
		return this.http.post(`${this.baseURL}/employees/import`, request);
	}

	export() : Observable<any>{
		const headers = new HttpHeaders({
			'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		});
		return this.http.get(`${this.baseURL}/employees/export`, {
            headers,
            responseType: 'arraybuffer'
        });
	}
}
