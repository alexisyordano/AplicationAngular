import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { TeamManagementComponent } from './modules/team-management/team-management.component';
import { StatisticsComponent } from './modules/statistics/statistics.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: HomeComponent,
  },

  {
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    path: 'team-management',
    component: TeamManagementComponent,
  },

  {
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    path: 'statistics',
    component: StatisticsComponent,
  },
];
