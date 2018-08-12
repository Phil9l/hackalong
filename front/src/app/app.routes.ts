import { Routes } from '@angular/router';
import { ContestComponent } from './contest/contest.component';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';

export const AppRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'contest', component: ContestComponent },
  { path: 'contests', component: HomeComponent },
  { path: 'create', component: CreateComponent }
];
