import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, FormsModule],
	template: `
	<div style="padding: 20px; background: #0b1020; color: white; min-height: 100vh; font-family: Arial, sans-serif;">
	<header style="display:flex;justify-content:space-between;align-items:center;padding:16px 24px;border-bottom:1px solid #1e2648;background:#0c1328;position:sticky;top:0;z-index:10">
			<h1 style="font-size:24px;margin:0;color:#e7ecf3;">✈️ Airport Issue Portal</h1>
		<nav style="display:flex;gap:10px">
				<button *ngIf="!isLoggedIn" class="button" (click)="showSection('login')">Login</button>
				<button *ngIf="isLoggedIn && loggedInRole === 'staff'" class="button" (click)="showSection('staff')">Staff Dashboard</button>
				<button *ngIf="isLoggedIn && loggedInRole === 'passenger'" class="button" (click)="showSection('passenger')">Passenger Dashboard</button>
				<button *ngIf="isLoggedIn" class="button primary" (click)="showSection('portal')">🚨 Portal SOS</button>
				<button *ngIf="isLoggedIn" class="button" (click)="logout()" style="background: #dc3545; border-color: #dc3545;">Logout</button>
		</nav>
	</header>
	<div class="container">
			<div *ngIf="currentSection === 'login'" style="background: #121933; border: 1px solid #1f2a4a; border-radius: 12px; padding: 20px; max-width: 500px; margin: 0 auto;">
				<h2 style="color: #e7ecf3; margin: 0 0 20px 0;">Login</h2>
				<div style="display: flex; gap: 12px; flex-direction: column;">
					<select [(ngModel)]="selectedRole" style="background: #0e1737; border: 1px solid #2a345e; border-radius: 10px; color: #e7ecf3; padding: 10px 12px;">
						<option value="staff">Staff</option>
						<option value="passenger">Passenger</option>
					</select>
					<input [(ngModel)]="email" placeholder="Email" style="background: #0e1737; border: 1px solid #2a345e; border-radius: 10px; color: #e7ecf3; padding: 10px 12px;"/>
					<input [(ngModel)]="password" type="password" placeholder="Password" style="background: #0e1737; border: 1px solid #2a345e; border-radius: 10px; color: #e7ecf3; padding: 10px 12px;"/>
					<button (click)="login()" style="background: #2242ff; border: 1px solid #2242ff; border-radius: 10px; color: white; padding: 10px 14px; cursor: pointer;">Login</button>
				</div>
				<p style="opacity: 0.7; margin-top: 12px; color: #9aa3b2;">
					Use any email and password to login!
				</p>
			</div>

			<div *ngIf="currentSection === 'staff' && isLoggedIn && loggedInRole === 'staff'" style="background: #121933; border: 1px solid #1f2a4a; border-radius: 12px; padding: 20px;">
				<h2 style="color: #e7ecf3; margin: 0 0 20px 0;">Staff Dashboard</h2>
				
				<!-- Action Buttons -->
				<div style="display: flex; gap: 10px; margin-bottom: 20px;">
					<button class="button" (click)="showCreateIssueForm = !showCreateIssueForm">Create Issue</button>
					<button class="button" [class.active]="staffMode === 'take'" (click)="staffMode = 'take'">Take Issues</button>
					<button class="button" [class.active]="staffMode === 'resolve'" (click)="staffMode = 'resolve'">Resolve Issues</button>
				</div>

				<!-- Create Issue Form -->
				<div *ngIf="showCreateIssueForm" style="background: #1a1f3a; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
					<h3 style="color: #e7ecf3; margin: 0 0 15px 0;">Report New Issue</h3>
					<div style="display: flex; gap: 12px; flex-direction: column;">
						<select [(ngModel)]="newIssue.sector" style="background: #0e1737; border: 1px solid #2a345e; border-radius: 10px; color: #e7ecf3; padding: 10px 12px;">
							<option value="">Select Sector</option>
							<option value="CabinCrew">Cabin Crew</option>
							<option value="Sanitation">Sanitation</option>
							<option value="Security">Security Systems</option>
						</select>
						<select [(ngModel)]="newIssue.category" style="background: #0e1737; border: 1px solid #2a345e; border-radius: 10px; color: #e7ecf3; padding: 10px 12px;">
							<option value="">Select Category</option>
							<option *ngFor="let cat of getStaffCategories(newIssue.sector)" [value]="cat">{{cat}}</option>
						</select>
						<textarea [(ngModel)]="newIssue.description" placeholder="Describe the issue..." style="background: #0e1737; border: 1px solid #2a345e; border-radius: 10px; color: #e7ecf3; padding: 10px 12px; min-height: 80px;"></textarea>
						<div style="display: flex; gap: 10px;">
							<button (click)="reportIssue()" style="background: #2242ff; border: 1px solid #2242ff; border-radius: 10px; color: white; padding: 10px 14px; cursor: pointer;">Report Issue</button>
							<button (click)="showCreateIssueForm = false" style="background: #6c757d; border: 1px solid #6c757d; border-radius: 10px; color: white; padding: 10px 14px; cursor: pointer;">Cancel</button>
						</div>
					</div>
				</div>

				<!-- Issue Status Dashboard -->
				<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-top: 20px;">
					<!-- New Issues Column -->
					<div style="background: #121933; border: 1px solid #1f2a4a; border-radius: 12px; padding: 15px;">
						<h3 style="color: #e7ecf3; margin: 0 0 15px 0; text-align: center;">New Issues</h3>
						<div *ngFor="let issue of getAllIssuesByStatus('red')" class="issue-card">
							<div style="font-weight: bold; color: #e7ecf3;">{{issue.sector || issue.type}} - {{issue.category}}</div>
							<div style="color: #9aa3b2; font-size: 14px; margin: 5px 0;">{{issue.description}}</div>
							<div style="color: #666; font-size: 12px;">{{issue.createdAt | date:'short'}}</div>
							<div style="display: flex; gap: 5px; margin-top: 8px;">
								<button *ngIf="staffMode === 'take'" (click)="takeIssue(issue.id)" style="background: #ffc107; color: #000; border: none; border-radius: 5px; padding: 5px 10px; cursor: pointer;">Take Issue</button>
								<button (click)="deleteIssue(issue.id)" style="background: #dc3545; color: white; border: none; border-radius: 5px; padding: 5px 10px; cursor: pointer;">Delete</button>
							</div>
						</div>
					</div>

					<!-- In Progress Column -->
					<div style="background: #121933; border: 1px solid #1f2a4a; border-radius: 12px; padding: 15px;">
						<h3 style="color: #e7ecf3; margin: 0 0 15px 0; text-align: center;">In Progress</h3>
						<div *ngFor="let issue of getAllIssuesByStatus('yellow')" class="issue-card">
							<div style="font-weight: bold; color: #e7ecf3;">{{issue.sector || issue.type}} - {{issue.category}}</div>
							<div style="color: #9aa3b2; font-size: 14px; margin: 5px 0;">{{issue.description}}</div>
							<div style="color: #666; font-size: 12px;">Assigned to: {{issue.assignee}}</div>
							<div style="display: flex; gap: 5px; margin-top: 8px;">
								<button (click)="resolveIssue(issue.id)" style="background: #28a745; color: white; border: none; border-radius: 5px; padding: 5px 10px; cursor: pointer;">Resolve</button>
								<button (click)="deleteIssue(issue.id)" style="background: #dc3545; color: white; border: none; border-radius: 5px; padding: 5px 10px; cursor: pointer;">Delete</button>
							</div>
						</div>
					</div>

					<!-- Resolved Column -->
					<div style="background: #121933; border: 1px solid #1f2a4a; border-radius: 12px; padding: 15px;">
						<h3 style="color: #e7ecf3; margin: 0 0 15px 0; text-align: center;">Resolved</h3>
						<div *ngFor="let issue of getAllIssuesByStatus('green')" class="issue-card">
							<div style="font-weight: bold; color: #e7ecf3;">{{issue.sector || issue.type}} - {{issue.category}}</div>
							<div style="color: #9aa3b2; font-size: 14px; margin: 5px 0;">{{issue.description}}</div>
							<div style="color: #666; font-size: 12px;">Resolved: {{issue.resolvedAt | date:'short'}}</div>
							<div style="display: flex; gap: 5px; margin-top: 8px;">
								<button (click)="deleteIssue(issue.id)" style="background: #dc3545; color: white; border: none; border-radius: 5px; padding: 5px 10px; cursor: pointer;">Delete</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div *ngIf="currentSection === 'passenger' && isLoggedIn && loggedInRole === 'passenger'" style="background: #121933; border: 1px solid #1f2a4a; border-radius: 12px; padding: 20px;">
				<h2 style="color: #e7ecf3; margin: 0 0 20px 0;">Passenger Dashboard</h2>
				
				<!-- Action Buttons -->
				<div style="display: flex; gap: 10px; margin-bottom: 20px;">
					<button class="button" (click)="showCreateIssueForm = !showCreateIssueForm">Create Issue</button>
				</div>
				
				<!-- Create Issue Form -->
				<div *ngIf="showCreateIssueForm" style="background: #1a1f3a; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
					<h3 style="color: #e7ecf3; margin: 0 0 15px 0;">Report New Issue</h3>
					<div style="display: flex; gap: 12px; flex-direction: column;">
						<select [(ngModel)]="newPassengerIssue.type" style="background: #0e1737; border: 1px solid #2a345e; border-radius: 10px; color: #e7ecf3; padding: 10px 12px;">
							<option value="">Select Type</option>
							<option value="Boarding">Boarding</option>
							<option value="Food">Food & Beverages</option>
							<option value="Arrivals">Arrivals</option>
						</select>
						<select [(ngModel)]="newPassengerIssue.category" style="background: #0e1737; border: 1px solid #2a345e; border-radius: 10px; color: #e7ecf3; padding: 10px 12px;">
							<option value="">Select Category</option>
							<option *ngFor="let cat of getPassengerCategories(newPassengerIssue.type)" [value]="cat">{{cat}}</option>
						</select>
						<textarea [(ngModel)]="newPassengerIssue.description" placeholder="Describe your issue..." style="background: #0e1737; border: 1px solid #2a345e; border-radius: 10px; color: #e7ecf3; padding: 10px 12px; min-height: 80px;"></textarea>
						<div style="display: flex; gap: 10px;">
							<button (click)="reportPassengerIssue()" style="background: #dc3545; border: 1px solid #dc3545; border-radius: 10px; color: white; padding: 10px 14px; cursor: pointer;">Report Issue</button>
							<button (click)="showCreateIssueForm = false" style="background: #6c757d; border: 1px solid #6c757d; border-radius: 10px; color: white; padding: 10px 14px; cursor: pointer;">Cancel</button>
						</div>
					</div>
				</div>

				<!-- Issue Status Dashboard -->
				<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
					<!-- Reported Issues Column -->
					<div style="background: #121933; border: 1px solid #1f2a4a; border-radius: 12px; padding: 15px;">
						<h3 style="color: #e7ecf3; margin: 0 0 15px 0; text-align: center;">Reported Issues</h3>
						<div *ngFor="let issue of getPassengerIssuesByStatus('red')" class="issue-card">
							<div style="font-weight: bold; color: #e7ecf3;">{{issue.type}} - {{issue.category}}</div>
							<div style="color: #9aa3b2; font-size: 14px; margin: 5px 0;">{{issue.description}}</div>
							<div style="color: #666; font-size: 12px;">Reported: {{issue.createdAt | date:'short'}}</div>
							<div style="display: flex; gap: 5px; margin-top: 8px;">
								<button (click)="deletePassengerIssue(issue.id)" style="background: #dc3545; color: white; border: none; border-radius: 5px; padding: 5px 10px; cursor: pointer;">Delete</button>
							</div>
						</div>
					</div>

					<!-- Resolved Issues Column -->
					<div style="background: #121933; border: 1px solid #1f2a4a; border-radius: 12px; padding: 15px;">
						<h3 style="color: #e7ecf3; margin: 0 0 15px 0; text-align: center;">Resolved Issues</h3>
						<div *ngFor="let issue of getPassengerIssuesByStatus('green')" class="issue-card">
							<div style="font-weight: bold; color: #e7ecf3;">{{issue.type}} - {{issue.category}}</div>
							<div style="color: #9aa3b2; font-size: 14px; margin: 5px 0;">{{issue.description}}</div>
							<div style="color: #666; font-size: 12px;">Resolved: {{issue.resolvedAt | date:'short'}}</div>
							<div style="display: flex; gap: 5px; margin-top: 8px;">
								<button (click)="deletePassengerIssue(issue.id)" style="background: #dc3545; color: white; border: none; border-radius: 5px; padding: 5px 10px; cursor: pointer;">Delete</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div *ngIf="currentSection === 'portal'" style="background: #121933; border: 1px solid #1f2a4a; border-radius: 12px; padding: 20px;">
				<h2 style="color: #e7ecf3; margin: 0 0 20px 0;">🚨 Portal SOS - Emergency Response</h2>
				<p style="color: #9aa3b2; margin-bottom: 30px;">Click any button below to send an immediate emergency alert to the respective department:</p>
				
				<!-- SOS Buttons -->
				<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-bottom: 30px;">
					<button (click)="sendSOS('CabinCrew')" class="sos-button cabin-crew">
						<div style="font-size: 48px; margin-bottom: 10px;">✈️</div>
						<div style="font-size: 18px; font-weight: bold;">CABIN CREW</div>
						<div style="font-size: 14px; opacity: 0.8;">Emergency</div>
					</button>
					
					<button (click)="sendSOS('Sanitation')" class="sos-button sanitation">
						<div style="font-size: 48px; margin-bottom: 10px;">🧹</div>
						<div style="font-size: 18px; font-weight: bold;">SANITATION</div>
						<div style="font-size: 14px; opacity: 0.8;">Critical Issue</div>
					</button>
					
					<button (click)="sendSOS('Security')" class="sos-button security">
						<div style="font-size: 48px; margin-bottom: 10px;">🛡️</div>
						<div style="font-size: 18px; font-weight: bold;">SECURITY</div>
						<div style="font-size: 14px; opacity: 0.8;">Breach Alert</div>
					</button>
				</div>

				<!-- Recent SOS Alerts -->
				<div style="background: #1a1f3a; border-radius: 8px; padding: 15px;">
					<h3 style="color: #e7ecf3; margin: 0 0 15px 0;">Recent SOS Alerts</h3>
					<div *ngFor="let alert of sosAlerts" class="sos-alert">
						<div style="display: flex; justify-content: space-between; align-items: center;">
							<div>
								<div style="font-weight: bold; color: #dc3545;">🚨 {{alert.sector}} Emergency</div>
								<div style="color: #9aa3b2; font-size: 14px;">{{alert.description}}</div>
							</div>
							<div style="color: #666; font-size: 12px;">{{alert.timestamp | date:'short'}}</div>
						</div>
					</div>
					<div *ngIf="sosAlerts.length === 0" style="color: #666; text-align: center; padding: 20px;">
						No recent SOS alerts
					</div>
				</div>
			</div>
		</div>
	</div>
	`,
	styles: [`
		.button {
			cursor: pointer;
			padding: 10px 14px;
			border-radius: 10px;
			border: 1px solid #2a345e;
			background: #0f1a3b;
			color: #e7ecf3;
			transition: all 0.2s ease;
			display: inline-block;
		}
		.button:hover {
			background: #1a2447;
			border-color: #3a4568;
		}
		.button.primary {
			background: #2242ff;
			border-color: #2242ff;
		}
		.button.primary:hover {
			background: #1d3ae6;
			border-color: #1d3ae6;
		}
		.button.active {
			background: #2242ff;
			border-color: #2242ff;
		}
		.container {
			max-width: 1200px;
			margin: 24px auto;
			padding: 0 16px;
		}
		.issue-card {
			background: #1a1f3a;
			border-radius: 8px;
			padding: 12px;
			margin-bottom: 10px;
			border: 1px solid #2a345e;
		}
		.sos-button {
			background: #1a1f3a;
			border: 2px solid #dc3545;
			border-radius: 12px;
			padding: 20px;
			color: white;
			cursor: pointer;
			transition: all 0.3s ease;
			text-align: center;
		}
		.sos-button:hover {
			background: #dc3545;
			transform: scale(1.05);
		}
		.sos-button.cabin-crew {
			border-color: #ffc107;
		}
		.sos-button.cabin-crew:hover {
			background: #ffc107;
			color: #000;
		}
		.sos-button.sanitation {
			border-color: #17a2b8;
		}
		.sos-button.sanitation:hover {
			background: #17a2b8;
		}
		.sos-button.security {
			border-color: #dc3545;
		}
		.sos-button.security:hover {
			background: #dc3545;
		}
		.sos-alert {
			background: #2d1b1b;
			border: 1px solid #dc3545;
			border-radius: 8px;
			padding: 12px;
			margin-bottom: 10px;
		}
	`]
})
export class AppComponent {
	currentSection = 'login';
	selectedRole = 'staff';
	email = '';
	password = '';
	staffMode = 'take';
	isLoggedIn = false;
	loggedInRole = '';
	showCreateIssueForm = false;
	
	// Issue data
	newIssue = { sector: '', category: '', description: '' };
	newPassengerIssue = { type: '', category: '', description: '' };
	
	// Dummy data for demonstration
	staffIssues = [
		{ id: 1, sector: 'CabinCrew', category: 'Last-minute checks', description: 'Flight delay due to last-minute safety checks', status: 'red', createdAt: new Date(), assignee: '', resolvedAt: null },
		{ id: 2, sector: 'Sanitation', category: 'Restroom availability', description: 'Restroom maintenance required in Terminal A', status: 'yellow', createdAt: new Date(), assignee: 'John Smith', resolvedAt: null },
		{ id: 3, sector: 'Security', category: 'CCTV issues', description: 'Camera malfunction in security checkpoint', status: 'green', createdAt: new Date(), assignee: 'Jane Doe', resolvedAt: new Date() }
	];
	
	passengerIssues = [
		{ id: 1, type: 'Boarding', category: 'Boarding pass issues', description: 'Unable to scan boarding pass at gate', status: 'red', createdAt: new Date(), assignee: '', resolvedAt: null },
		{ id: 2, type: 'Food', category: 'Unhygienic food', description: 'Found foreign object in meal', status: 'green', createdAt: new Date(), assignee: '', resolvedAt: new Date() },
		{ id: 3, type: 'Arrivals', category: 'Luggage damage', description: 'Luggage arrived damaged', status: 'red', createdAt: new Date(), assignee: '', resolvedAt: null }
	];
	
	sosAlerts = [
		{ sector: 'CabinCrew', description: 'Medical emergency on board', timestamp: new Date() },
		{ sector: 'Security', description: 'Suspicious activity detected', timestamp: new Date() }
	];

	showSection(section: string) {
		if (this.isLoggedIn) {
			this.currentSection = section;
		} else {
			this.currentSection = 'login';
		}
	}

	login() {
		// Simple login - works with any email and password
		if (this.email && this.password) {
			this.isLoggedIn = true;
			this.loggedInRole = this.selectedRole;
			alert(`Login successful as ${this.selectedRole}!`);
			this.currentSection = this.selectedRole;
		} else {
			alert('Please enter email and password');
		}
	}

	logout() {
		this.isLoggedIn = false;
		this.loggedInRole = '';
		this.currentSection = 'login';
		this.email = '';
		this.password = '';
	}

	// Staff methods
	getStaffCategories(sector: string): string[] {
		const categories: { [key: string]: string[] } = {
			'CabinCrew': ['Last-minute checks', 'Passenger Misconduct', 'Pantry Availability', 'Others'],
			'Sanitation': ['Restroom availability', 'Staffing issues', 'Cleaning supplies', 'Others'],
			'Security': ['Boarding issues', 'CCTV problems', 'Security systems', 'Others']
		};
		return categories[sector] || [];
	}

	reportIssue() {
		if (this.newIssue.sector && this.newIssue.category && this.newIssue.description) {
			const newId = Math.max(...this.staffIssues.map(i => i.id)) + 1;
			this.staffIssues.push({
				id: newId,
				sector: this.newIssue.sector,
				category: this.newIssue.category,
				description: this.newIssue.description,
				status: 'red',
				createdAt: new Date(),
				assignee: '',
				resolvedAt: null
			});
			this.newIssue = { sector: '', category: '', description: '' };
			this.showCreateIssueForm = false;
			alert('Issue reported successfully!');
		} else {
			alert('Please fill all fields');
		}
	}

	takeIssue(id: number) {
		// Find issue in staff issues
		const staffIssue = this.staffIssues.find(i => i.id === id);
		if (staffIssue) {
			staffIssue.status = 'yellow';
			staffIssue.assignee = 'Current Staff';
			alert('Issue taken successfully!');
			return;
		}
		
		// Find issue in passenger issues
		const passengerIssue = this.passengerIssues.find(i => i.id === id);
		if (passengerIssue) {
			passengerIssue.status = 'yellow';
			passengerIssue.assignee = 'Current Staff';
			alert('Passenger issue taken successfully!');
			return;
		}
	}

	resolveIssue(id: number) {
		// Find issue in staff issues
		const staffIssue = this.staffIssues.find(i => i.id === id);
		if (staffIssue) {
			staffIssue.status = 'green';
			staffIssue.resolvedAt = new Date();
			alert('Issue resolved successfully!');
			return;
		}
		
		// Find issue in passenger issues
		const passengerIssue = this.passengerIssues.find(i => i.id === id);
		if (passengerIssue) {
			passengerIssue.status = 'green';
			passengerIssue.resolvedAt = new Date();
			alert('Passenger issue resolved successfully!');
			return;
		}
	}

	getAllIssuesByStatus(status: string) {
		const allIssues = [...this.staffIssues, ...this.passengerIssues];
		return allIssues.filter(issue => issue.status === status);
	}

	getIssuesByStatus(status: string) {
		return this.staffIssues.filter(issue => issue.status === status);
	}

	// Passenger methods
	getPassengerCategories(type: string): string[] {
		const categories: { [key: string]: string[] } = {
			'Boarding': ['Boarding pass issues', 'Lack of guidance', 'Regulation misunderstanding', 'Restroom availability'],
			'Food': ['Unhygienic food', 'Substandard quality', 'Allergy concerns', 'Others'],
			'Arrivals': ['Luggage damage', 'Luggage missing', 'Long wait times', 'Checkout issues']
		};
		return categories[type] || [];
	}

	reportPassengerIssue() {
		if (this.newPassengerIssue.type && this.newPassengerIssue.category && this.newPassengerIssue.description) {
			const newId = Math.max(...this.passengerIssues.map(i => i.id)) + 1;
			this.passengerIssues.push({
				id: newId,
				type: this.newPassengerIssue.type,
				category: this.newPassengerIssue.category,
				description: this.newPassengerIssue.description,
				status: 'red',
				createdAt: new Date(),
				assignee: '',
				resolvedAt: null
			});
			this.newPassengerIssue = { type: '', category: '', description: '' };
			this.showCreateIssueForm = false;
			alert('Issue reported successfully! It will appear in staff portal for resolution.');
		} else {
			alert('Please fill all fields');
		}
	}

	getPassengerIssuesByStatus(status: string) {
		return this.passengerIssues.filter(issue => issue.status === status);
	}

	// Delete methods
	deleteIssue(id: number) {
		// Find and delete from staff issues
		const staffIndex = this.staffIssues.findIndex(i => i.id === id);
		if (staffIndex !== -1) {
			this.staffIssues.splice(staffIndex, 1);
			alert('Issue deleted successfully!');
			return;
		}
		
		// Find and delete from passenger issues
		const passengerIndex = this.passengerIssues.findIndex(i => i.id === id);
		if (passengerIndex !== -1) {
			this.passengerIssues.splice(passengerIndex, 1);
			alert('Issue deleted successfully!');
			return;
		}
	}

	deletePassengerIssue(id: number) {
		const index = this.passengerIssues.findIndex(i => i.id === id);
		if (index !== -1) {
			this.passengerIssues.splice(index, 1);
			alert('Issue deleted successfully!');
		}
	}

	// SOS methods
	sendSOS(sector: string) {
		const descriptions: { [key: string]: string } = {
			'CabinCrew': 'Emergency assistance required in cabin crew operations',
			'Sanitation': 'Critical sanitation issue requiring immediate attention',
			'Security': 'Security breach alert - immediate response needed'
		};
		
		this.sosAlerts.unshift({
			sector: sector,
			description: descriptions[sector],
			timestamp: new Date()
		});
		
		alert(`🚨 SOS ALERT SENT TO ${sector.toUpperCase()} DEPARTMENT!`);
	}
}
