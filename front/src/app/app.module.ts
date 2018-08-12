import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ContestsComponent } from './contests/contests.component';

import { GithubDataService } from './common/services/data/github/github.data.service';
import { GithubAppService } from './common/services/app/github/github.app.service';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { UserAppService } from './common/services/app/user/user.app.service';

@NgModule({
  declarations: [
    AppComponent,
    ContestsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
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
