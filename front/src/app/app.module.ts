import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';

import { GithubDataService } from './common/services/data/github/github.data.service';
import { GithubAppService } from './common/services/app/github/github.app.service';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { UserAppService } from './common/services/app/user/user.app.service';
import { CreateComponent } from './create/create.component';
import { ContestComponent } from './contest/contest.component';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routes';
import { HomeHeaderComponent } from './home/header/home-header.component';

@NgModule({
  declarations: [
    AppComponent,
    ContestComponent,
    HomeComponent,
    CreateComponent,
    HomeHeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    RouterModule.forRoot(AppRoutes, { enableTracing: true })
  ],
  providers: [
    GithubAppService,
    GithubDataService,
    UserAppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
