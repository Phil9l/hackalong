import { Routes } from '@angular/router';
import { ContestComponent } from './pages/contest/contest.component';
import { HomeComponent } from './pages/home/home.component';
import { CreateComponent } from './pages/create/create.component';

export const AppRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'contest', component: ContestComponent },
  { path: 'contests', component: HomeComponent },
  { path: 'create', component: CreateComponent }
];
