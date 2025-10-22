import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IssueService } from '../services/issue.service';

@Component({
	selector: 'app-passenger-dashboard',
	standalone: true,
	imports: [CommonModule, FormsModule],
	template: `
	<div class="dashboard-header">
		<h2>Passenger Dashboard</h2>
		<p class="subtitle">Report issues and track their resolution status</p>
	</div>

	<div class="grid columns-3">
		<div class="card">
			<h3>🔴 Report New Issue (Red)</h3>
			<div class="form-section">
				<select class="input" [(ngModel)]="sector" (change)="updateCategories()">
					<option value="Boarding">Boarding</option>
					<option value="Food">Food & Beverages</option>
					<option value="Arrivals">Arrivals</option>
				</select>
				<select class="input" [(ngModel)]="category">
					<option *ngFor="let cat of categories" [value]="cat">{{cat}}</option>
				</select>
				<textarea class="input" [(ngModel)]="description" rows="4" placeholder="Describe your issue in detail..."></textarea>
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
					<div class="status-info">Status: Being addressed by staff</div>
				</div>
				<div *ngIf="yellow.length === 0" class="empty-state">No issues currently being addressed</div>
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
					<div class="status-info">✅ Issue has been resolved</div>
				</div>
				<div *ngIf="green.length === 0" class="empty-state">No resolved issues yet</div>
			</div>
		</div>
	</div>

	<div class="help-section">
		<h3>Need Immediate Help?</h3>
		<p>For urgent issues requiring immediate attention, please use the Portal SOS feature or contact airport staff directly.</p>
		<button class="button primary" routerLink="/portal">Go to Portal SOS</button>
	</div>
	`,
})
export class PassengerDashboardComponent implements OnInit {
	sector = 'Boarding'; 
	category = ''; 
	description = '';
	red: any[] = []; 
	yellow: any[] = []; 
	green: any[] = [];
	
	categories: string[] = [];
	
	sectorCategories = {
		'Boarding': [
			'Boarding pass issues',
			'Lack of clear guidance',
			'Misunderstanding of regulations',
			'Restroom availability',
			'Gate confusion',
			'Seating problems'
		],
		'Food': [
			'Unhygienic food conditions',
			'Substandard beverages',
			'Food poisoning concerns',
			'Allergy information missing',
			'Overpriced items',
			'Poor service quality'
		],
		'Arrivals': [
			'Luggage misplacement',
			'Luggage damage',
			'Excessive checkout waiting',
			'Immigration delays',
			'Customs issues',
			'Transportation problems'
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
			this.red = list.filter((i: any)=>i.status==='red' && i.flow==='passenger');
			this.yellow = list.filter((i: any)=>i.status==='yellow' && i.flow==='passenger');
			this.green = list.filter((i: any)=>i.status==='green' && i.flow==='passenger');
		});
	}
	
	report(){ 
		if (!this.description.trim()) return;
		this.issues.report({ 
			sector: this.sector, 
			category: this.category, 
			description: this.description, 
			flow: 'passenger' 
		}).subscribe({
			next: () => {
				this.description = '';
				this.refresh();
				alert('Issue reported successfully! You can track its progress here.');
			},
			error: () => alert('Failed to report issue. Please try again.')
		}); 
	}
	
	formatDate(date: string): string {
		return new Date(date).toLocaleString();
	}
}
