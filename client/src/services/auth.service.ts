import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
	private base = '/api/auth';
	token: string | null = null;
	user: any = null;
	constructor(private http: HttpClient) {}
	login(email: string, password: string){
		return this.http.post<any>(`${this.base}/login`, { email, password }).pipe(
			tap(res => { this.token = res.token; this.user = res.user; localStorage.setItem('token', this.token!); })
		);
	}
	getAuthHeader(){ return this.token || localStorage.getItem('token') ? { Authorization: `Bearer ${this.token || localStorage.getItem('token')}` } : {}; }
}
