import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { ForbiddenComponent } from './shared/components/forbidden/forbidden.component';
import { UsersComponent } from './features/users/main/users.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'users' },
  { path: 'users', component: UsersComponent },
  { path: '403', component: ForbiddenComponent },
  { path: '**', component: PageNotFoundComponent },
];
