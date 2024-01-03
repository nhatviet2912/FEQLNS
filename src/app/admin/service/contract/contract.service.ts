import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
    constructor(private http : HttpClient) { }

	private baseURL = `http://localhost:3000/contract`;

	getList() : Observable<any[]> {
		return this.http.get<any>(`${this.baseURL}`);
	}

	getPageData(pageSize: number, pageIndex: number): Observable<any> {
		const params = new HttpParams()
		  .set('pagesize', pageSize.toString())
		  .set('pageindex', pageIndex.toString());
	
		return this.http.get<any>(`${this.baseURL}/getPageData`, { params });
	}

	getById(id : number) : Observable<any> {
		return this.http.get<any>(`${this.baseURL}/getById/${id}`);
	}

	post(request: any): Observable<any> {
		return this.http.post(`${this.baseURL}/create`, request);
	}

	put(id: number, request: any): Observable<any> {
		return this.http.put(`${this.baseURL}/update/${id}`, request);
	}

	delete(id: number): Observable<any> {
		return this.http.delete(`${this.baseURL}/delete/${id}`);
	}

	search(request: any) : Observable<any> {
		return this.http.post(`${this.baseURL}/search`, request);
	}

	import(request: any): Observable<any>{
		return this.http.post(`${this.baseURL}/import`, request);
	}

	export() : Observable<any>{
		const headers = new HttpHeaders({
			'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		});
		return this.http.get(`${this.baseURL}/export`, {
            headers,
            responseType: 'arraybuffer'
        });
	}
}
