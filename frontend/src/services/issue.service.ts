import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class IssueService {
	private base = '/api/issues';
	constructor(private http: HttpClient, private auth: AuthService) {}
	
	private getHeaders(): HttpHeaders {
		const token = this.auth.token || localStorage.getItem('token');
		return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
	}
	
	list(params: any){ return this.http.get<any[]>(this.base, { params, headers: this.getHeaders() }); }
	report(body: any){ return this.http.post<any>(`${this.base}/report`, body, { headers: this.getHeaders() }); }
	take(id: string){ return this.http.post<any>(`${this.base}/${id}/take`, {}, { headers: this.getHeaders() }); }
	resolve(id: string){ return this.http.post<any>(`${this.base}/${id}/resolve`, {}, { headers: this.getHeaders() }); }
	sos(sector: string, description: string){ return this.http.post<any>(`${this.base}/sos`, { sector, description }, { headers: this.getHeaders() }); }
}
