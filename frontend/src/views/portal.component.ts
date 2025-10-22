import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IssueService } from '../services/issue.service';

@Component({
	selector: 'app-portal',
	standalone: true,
	imports: [CommonModule, FormsModule],
	template: `
	<div class="portal-container">
		<div class="portal-header">
			<h2>🚨 Portal SOS - Emergency Response</h2>
			<p class="subtitle">Immediate assistance for urgent issues requiring top priority attention</p>
		</div>

		<div class="sos-grid">
			<div class="sos-card cabin-crew" (click)="openSOSModal('CabinCrew')">
				<div class="sos-icon">👥</div>
				<h3>Cabin Crew</h3>
				<p>Emergency provisions, first-aid kits, sanitary pads, harassment incidents</p>
				<div class="sos-button">SOS Alert</div>
			</div>

			<div class="sos-card sanitation" (click)="openSOSModal('Sanitation')">
				<div class="sos-icon">🧹</div>
				<h3>Sanitation</h3>
				<p>Critical hygiene issues, emergency cleaning, health hazards</p>
				<div class="sos-button">SOS Alert</div>
			</div>

			<div class="sos-card security" (click)="openSOSModal('Security')">
				<div class="sos-icon">🛡️</div>
				<h3>Security</h3>
				<p>Fraud investigation, missing items, security breaches, safety threats</p>
				<div class="sos-button">SOS Alert</div>
			</div>
		</div>

		<div class="emergency-info">
			<h3>⚠️ Emergency Information</h3>
			<ul>
				<li><strong>First Aid:</strong> Contact nearest airport medical center</li>
				<li><strong>Security:</strong> Report suspicious activities immediately</li>
				<li><strong>Lost Items:</strong> Visit lost & found or report theft</li>
				<li><strong>Harassment:</strong> Zero tolerance policy - report immediately</li>
			</ul>
		</div>

		<!-- SOS Modal -->
		<div *ngIf="showModal" class="modal-overlay" (click)="closeModal()">
			<div class="modal-content" (click)="$event.stopPropagation()">
				<div class="modal-header">
					<h3>🚨 SOS Alert - {{selectedSector}}</h3>
					<button class="close-btn" (click)="closeModal()">×</button>
				</div>
				<div class="modal-body">
					<div class="form-group">
						<label>Issue Category:</label>
						<select class="input" [(ngModel)]="sosCategory">
							<option *ngFor="let cat of getSOSCategories()" [value]="cat">{{cat}}</option>
						</select>
					</div>
					<div class="form-group">
						<label>Emergency Description:</label>
						<textarea class="input" [(ngModel)]="sosDescription" rows="4" 
							placeholder="Describe the emergency situation in detail..."></textarea>
					</div>
					<div class="form-group">
						<label>Contact Information (Optional):</label>
						<input class="input" [(ngModel)]="contactInfo" placeholder="Your contact number or location">
					</div>
				</div>
				<div class="modal-footer">
					<button class="button" (click)="closeModal()">Cancel</button>
					<button class="button sos-submit" (click)="submitSOS()" [disabled]="!sosDescription.trim()">
						🚨 Send SOS Alert
					</button>
				</div>
			</div>
		</div>
	</div>
	`,
})
export class PortalComponent {
	showModal = false;
	selectedSector = '';
	sosCategory = '';
	sosDescription = '';
	contactInfo = '';

	sosCategories = {
		'CabinCrew': [
			'Emergency first-aid needed',
			'Sanitary pad emergency',
			'Passenger harassment',
			'Medical emergency',
			'Crew safety threat',
			'Equipment malfunction'
		],
		'Sanitation': [
			'Health hazard detected',
			'Biohazard contamination',
			'Critical hygiene failure',
			'Pest infestation',
			'Water contamination',
			'Air quality issue'
		],
		'Security': [
			'Security breach',
			'Theft reported',
			'Fraud investigation',
			'Suspicious activity',
			'Missing person',
			'Unauthorized access'
		]
	};

	constructor(private issues: IssueService) {}

	openSOSModal(sector: string) {
		this.selectedSector = sector;
		this.sosCategory = this.getSOSCategories()[0];
		this.showModal = true;
	}

	closeModal() {
		this.showModal = false;
		this.sosDescription = '';
		this.contactInfo = '';
	}

	getSOSCategories(): string[] {
		return this.sosCategories[this.selectedSector as keyof typeof this.sosCategories] || [];
	}

	submitSOS() {
		if (!this.sosDescription.trim()) return;
		
		const fullDescription = `${this.sosCategory}: ${this.sosDescription}${this.contactInfo ? `\n\nContact: ${this.contactInfo}` : ''}`;
		
		this.issues.sos(this.selectedSector, fullDescription).subscribe({ 
			next: () => {
				alert('🚨 SOS Alert sent successfully! Emergency response team has been notified.');
				this.closeModal();
			}, 
			error: () => alert('Failed to send SOS alert. Please try again or contact staff directly.') 
		});
	}
}
