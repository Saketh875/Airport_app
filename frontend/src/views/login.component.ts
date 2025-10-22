import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [CommonModule, FormsModule],
	template: `
	<div style="background: #121933; border: 1px solid #1f2a4a; border-radius: 12px; padding: 20px; max-width: 500px; margin: 0 auto;">
		<h2 style="color: #e7ecf3; margin: 0 0 20px 0;">Login</h2>
		<div style="display: flex; gap: 12px; flex-direction: column;">
			<select [(ngModel)]="role" style="background: #0e1737; border: 1px solid #2a345e; border-radius: 10px; color: #e7ecf3; padding: 10px 12px;">
				<option value="staff">Staff</option>
				<option value="passenger">Passenger</option>
			</select>
			<input [(ngModel)]="email" placeholder="Email" style="background: #0e1737; border: 1px solid #2a345e; border-radius: 10px; color: #e7ecf3; padding: 10px 12px;"/>
			<input [(ngModel)]="password" type="password" placeholder="Password" style="background: #0e1737; border: 1px solid #2a345e; border-radius: 10px; color: #e7ecf3; padding: 10px 12px;"/>
			<button (click)="login()" style="background: #2242ff; border: 1px solid #2242ff; border-radius: 10px; color: white; padding: 10px 14px; cursor: pointer;">Login</button>
		</div>
		<p style="opacity: 0.7; margin-top: 12px; color: #9aa3b2;">Demo users: staff&#64;example.com/staff123, passenger&#64;example.com/pass123</p>
	</div>
	`,
})
export class LoginComponent {
	role: 'staff' | 'passenger' = 'staff';
	email = 'staff@example.com';
	password = 'staff123';
	
	constructor(private auth: AuthService, private router: Router){}
	
	login(){
		console.log('Login attempt:', { role: this.role, email: this.email });
		this.auth.login(this.email, this.password).subscribe({
			next: ()=> {
				console.log('Login successful');
				this.router.navigate([this.role === 'staff' ? '/staff' : '/passenger']);
			},
			error: (err)=> {
				console.error('Login failed:', err);
				alert('Login failed. Please check your credentials or set up MongoDB Atlas.');
			}
		});
	}
}
