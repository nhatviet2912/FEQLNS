import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
    constructor(private http : HttpClient) { }

	private baseURL = `http://localhost:3000`;

	getList() : Observable<any[]> {
		return this.http.get<any>(`${this.baseURL}/position`);
	}

	getPageData(pageSize: number, pageIndex: number): Observable<any> {
		const params = new HttpParams()
		  .set('pagesize', pageSize.toString())
		  .set('pageindex', pageIndex.toString());
	
		return this.http.get<any>(`${this.baseURL}/position/getPageData`, { params });
	}

	getById(id : number) : Observable<any> {
		return this.http.get<any>(`${this.baseURL}/position/getById/${id}`);
	}

	postPosition(request: any): Observable<any> {
		return this.http.post(`${this.baseURL}/position/create`, request);
	}

	putPosition(id: number, request: any): Observable<any> {
		return this.http.put(`${this.baseURL}/position/update/${id}`, request);
	}

	delete(id: number): Observable<any> {
		return this.http.delete(`${this.baseURL}/position/delete/${id}`);
	}

	searchPosition(request: any) : Observable<any> {
		return this.http.post(`${this.baseURL}/position/search`, request);
	}

	importPosition(request: any): Observable<any>{
		return this.http.post(`${this.baseURL}/position/import`, request);
	}

	exportPosition() : Observable<any>{
		const headers = new HttpHeaders({
			'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		});
		return this.http.get(`${this.baseURL}/position/export`, {
            headers,
            responseType: 'arraybuffer'
        });
	}
}
