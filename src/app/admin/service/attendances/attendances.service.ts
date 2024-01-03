import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendancesService {

  constructor(private http : HttpClient) { }

  private baseURL = `http://localhost:3000/attendances`;

	getList() : Observable<any[]> {
		return this.http.get<any>(`${this.baseURL}/`);
	}

	get(request: any) : Observable<any> {
		return this.http.post<any>(`${this.baseURL}/get`, request);
	}

	post(request: any): Observable<any> {
		return this.http.post(`${this.baseURL}/create`, request);
	}

	getWithMonth(request: any): Observable<any> {
		return this.http.post(`${this.baseURL}/getwithmonth`, request);
	}

	// delete(id: number): Observable<any> {
	// 	return this.http.delete(`${this.baseURL}/position/delete/${id}`);
	// }

	// searchPosition(request: any) : Observable<any> {
	// 	return this.http.post(`${this.baseURL}/position/search`, request);
	// }

	// importPosition(request: any): Observable<any>{
	// 	return this.http.post(`${this.baseURL}/position/import`, request);
	// }

	// exportPosition() : Observable<any>{
	// 	const headers = new HttpHeaders({
	// 		'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	// 		'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
	// 	});
	// 	return this.http.get(`${this.baseURL}/position/export`, {
    //         headers,
    //         responseType: 'arraybuffer'
    //     });
	// }
}
