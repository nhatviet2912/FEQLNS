import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarveldetailService {
    constructor(private http : HttpClient) { }

	private baseURL = `http://localhost:3000/marvelDetails`;

	// getList() : Observable<any[]> {
	// 	return this.http.get<any>(`${this.baseURL}/position`);
	// }

	post(request: any): Observable<any> {
		return this.http.post(`${this.baseURL}/create`, request);
	}
}
