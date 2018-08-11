import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ContestsComponent } from './contests/contests.component';

import { GithubDataService } from './common/services/data/github/github.data.service';
import { GithubAppService } from './common/services/app/github.app.service';

@NgModule({
  declarations: [
    AppComponent,
    ContestsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    GithubAppService,
    GithubDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
