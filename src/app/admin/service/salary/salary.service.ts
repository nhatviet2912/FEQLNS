import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

    constructor(private http : HttpClient) { }
	private baseURL = `http://localhost:3000/salary`;

    get(request: any): Observable<any> {
		return this.http.post(`${this.baseURL}/get`, request);
	}


    post(request: any): Observable<any> {
		return this.http.post(`${this.baseURL}/create`, request);
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
