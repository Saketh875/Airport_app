import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IssueService } from '../services/issue.service';

@Component({
	selector: 'app-staff-dashboard',
	standalone: true,
	imports: [CommonModule, FormsModule],
	template: `
	<div class="dashboard-header">
		<h2>Staff Dashboard</h2>
		<div class="mode-selector">
			<button class="button" [class.active]="mode === 'report'" (click)="mode = 'report'">Report Issues</button>
			<button class="button" [class.active]="mode === 'resolve'" (click)="mode = 'resolve'">Resolve Issues</button>
		</div>
	</div>

	<div *ngIf="mode === 'report'" class="grid columns-3">
		<div class="card">
			<h3>🔴 Report New Issue (Red)</h3>
			<div class="form-section">
				<select class="input" [(ngModel)]="sector" (change)="updateCategories()">
					<option value="CabinCrew">Cabin Crew</option>
					<option value="Sanitation">Sanitation</option>
					<option value="Security">Security Systems</option>
				</select>
				<select class="input" [(ngModel)]="category">
					<option *ngFor="let cat of categories" [value]="cat">{{cat}}</option>
				</select>
				<textarea class="input" [(ngModel)]="description" rows="4" placeholder="Describe the issue in detail..."></textarea>
				<button class="button primary" (click)="report()" [disabled]="!description.trim()">Report Issue</button>
			</div>
		</div>
		<div class="card">
			<h3>🟡 Issues In Progress (Yellow)</h3>
			<div class="issues-list">
				<div class="issue yellow" *ngFor="let it of yellow" style="margin-bottom:12px">
					<div class="issue-header">
						<strong>{{it.category}}</strong>
						<span class="priority-badge" [class.sos]="it.priority === 'sos'">{{it.priority === 'sos' ? 'SOS' : 'Normal'}}</span>
					</div>
					<div class="issue-details">{{it.sector}} · {{it.description}}</div>
					<div class="issue-meta">Reported: {{formatDate(it.createdAt)}}</div>
					<div class="issue-actions">
						<button class="button resolve-btn" (click)="resolve(it)">Mark Resolved</button>
					</div>
				</div>
				<div *ngIf="yellow.length === 0" class="empty-state">No issues in progress</div>
			</div>
		</div>
		<div class="card">
			<h3>🟢 Resolved Issues (Green)</h3>
			<div class="issues-list">
				<div class="issue green" *ngFor="let it of green" style="margin-bottom:12px">
					<div class="issue-header">
						<strong>{{it.category}}</strong>
						<span class="priority-badge" [class.sos]="it.priority === 'sos'">{{it.priority === 'sos' ? 'SOS' : 'Normal'}}</span>
					</div>
					<div class="issue-details">{{it.sector}} · {{it.description}}</div>
					<div class="issue-meta">Resolved: {{formatDate(it.updatedAt)}}</div>
				</div>
				<div *ngIf="green.length === 0" class="empty-state">No resolved issues</div>
			</div>
		</div>
	</div>

	<div *ngIf="mode === 'resolve'" class="grid columns-2">
		<div class="card">
			<h3>🔴 Available Issues to Resolve</h3>
			<div class="issues-list">
				<div class="issue red" *ngFor="let it of red" style="margin-bottom:12px">
					<div class="issue-header">
						<strong>{{it.category}}</strong>
						<span class="priority-badge" [class.sos]="it.priority === 'sos'">{{it.priority === 'sos' ? 'SOS' : 'Normal'}}</span>
					</div>
					<div class="issue-details">{{it.sector}} · {{it.description}}</div>
					<div class="issue-meta">Reported: {{formatDate(it.createdAt)}}</div>
					<div class="issue-actions">
						<button class="button take-btn" (click)="take(it)">Take Issue</button>
					</div>
				</div>
				<div *ngIf="red.length === 0" class="empty-state">No issues available to resolve</div>
			</div>
		</div>
		<div class="card">
			<h3>🟡 My Assigned Issues</h3>
			<div class="issues-list">
				<div class="issue yellow" *ngFor="let it of myAssigned" style="margin-bottom:12px">
					<div class="issue-header">
						<strong>{{it.category}}</strong>
						<span class="priority-badge" [class.sos]="it.priority === 'sos'">{{it.priority === 'sos' ? 'SOS' : 'Normal'}}</span>
					</div>
					<div class="issue-details">{{it.sector}} · {{it.description}}</div>
					<div class="issue-meta">Assigned: {{formatDate(it.updatedAt)}}</div>
					<div class="issue-actions">
						<button class="button resolve-btn" (click)="resolve(it)">Mark Resolved</button>
					</div>
				</div>
				<div *ngIf="myAssigned.length === 0" class="empty-state">No assigned issues</div>
			</div>
		</div>
	</div>
	`,
})
export class StaffDashboardComponent implements OnInit {
	mode: 'report' | 'resolve' = 'report';
	sector = 'CabinCrew'; 
	category = ''; 
	description = '';
	red: any[] = []; 
	yellow: any[] = []; 
	green: any[] = [];
	myAssigned: any[] = [];
	
	categories: string[] = [];
	
	sectorCategories = {
		'CabinCrew': [
			'Last-minute checks and delays',
			'Passenger Misconduct',
			'Pantry Availability',
			'Crew coordination issues',
			'Equipment malfunction'
		],
		'Sanitation': [
			'Restroom availability',
			'Cleaning staff shortage',
			'Unhygienic conditions',
			'Waste management issues',
			'Pest control problems'
		],
		'Security': [
			'Boarding-related issues',
			'CCTV system defects',
			'Access control problems',
			'Security equipment failure',
			'Personnel shortage'
		]
	};

	constructor(private issues: IssueService) {}
	
	ngOnInit(){ 
		this.updateCategories();
		this.refresh(); 
	}
	
	updateCategories() {
		this.categories = this.sectorCategories[this.sector as keyof typeof this.sectorCategories] || [];
		if (this.categories.length > 0) {
			this.category = this.categories[0];
		}
	}
	
	refresh(){
		this.issues.list({}).subscribe((list: any[])=>{
			this.red = list.filter((i: any)=>i.status==='red' && i.flow==='staff');
			this.yellow = list.filter((i: any)=>i.status==='yellow');
			this.green = list.filter((i: any)=>i.status==='green');
			this.myAssigned = list.filter((i: any)=>i.status==='yellow' && i.assignee);
		});
	}
	
	report(){ 
		if (!this.description.trim()) return;
		this.issues.report({ 
			sector: this.sector, 
			category: this.category, 
			description: this.description, 
			flow: 'staff' 
		}).subscribe({
			next: () => {
				this.description = '';
				this.refresh();
			},
			error: () => alert('Failed to report issue')
		}); 
	}
	
	take(it: any){ 
		this.issues.take(it._id).subscribe({
			next: () => this.refresh(),
			error: () => alert('Failed to take issue')
		}); 
	}
	
	resolve(it: any){ 
		this.issues.resolve(it._id).subscribe({
			next: () => this.refresh(),
			error: () => alert('Failed to resolve issue')
		}); 
	}
	
	formatDate(date: string): string {
		return new Date(date).toLocaleString();
	}
}
