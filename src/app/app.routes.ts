import { Routes } from '@angular/router';
import { LandingPage } from './landing-page/landing-page';
import { AdminPage } from './admin-page/admin-page';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';
import { ResellerPage } from './reseller-page/reseller-page';

export const routes: Routes = [
  { path: '', component: LandingPage },
  {
    path: 'admin',
    component: AdminPage,
    // canActivate: [authGuard, adminGuard] // Must be logged in AND must be admin
  },
  {
    path: 'reseller',
    component: ResellerPage,
    // canActivate: [authGuard] // Must be logged in
  }
];
