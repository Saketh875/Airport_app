import { Routes } from '@angular/router';
import { LoginComponent } from './views/login.component';
import { StaffDashboardComponent } from './views/staff-dashboard.component';
import { PassengerDashboardComponent } from './views/passenger-dashboard.component';
import { PortalComponent } from './views/portal.component';

export const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'login' },
	{ path: 'login', component: LoginComponent },
	{ path: 'staff', component: StaffDashboardComponent },
	{ path: 'passenger', component: PassengerDashboardComponent },
	{ path: 'portal', component: PortalComponent },
	{ path: '**', redirectTo: 'login' }
];
