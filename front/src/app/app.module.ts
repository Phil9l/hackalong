import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { GithubDataService } from './common/services/data/github/github.data.service';
import { GithubAppService } from './common/services/app/github/github.app.service';
import { UserAppService } from './common/services/app/user/user.app.service';
import { CreateComponent } from './pages/create/create.component';
import { ContestComponent } from './pages/contest/contest.component';
import { AppRoutes } from './app.routes';
import { HomeHeaderComponent } from './pages/home/header/home-header.component';
import { ContestListComponent } from './components/contest-list/contest-list.component';
import { TimeLeftPipe } from './common/pipes/time-left.pipe';
import { DefaultImagePipe } from './common/pipes/default-image.pipe';
import { reducers } from './store/app.reducers';
import { ContestsSelectors } from './store/contests/contests.selectors';
import { LetDirective } from './common/directives/let.directive';
import { LogoComponent } from './components/logo/logo.component';
import { ContestsAppService } from './common/services/app/contests/contests.app.service';
import { CalendarModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ContestsDataService } from './common/services/data/contests/contests.data.service';

@NgModule({
    declarations: [
        AppComponent,
        ContestComponent,
        ContestListComponent,
        HomeComponent,
        CreateComponent,
        HomeHeaderComponent,

        LetDirective,
        LogoComponent,

        DefaultImagePipe,
        TimeLeftPipe
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        RouterModule.forRoot(AppRoutes, { enableTracing: true }),
        StoreModule.forRoot(reducers),
        CalendarModule,
        !environment.production ? StoreDevtoolsModule.instrument() : []
    ],
    providers: [
        GithubAppService,
        GithubDataService,
        ContestsAppService,
        UserAppService,

        ContestsDataService,

        ContestsSelectors
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
