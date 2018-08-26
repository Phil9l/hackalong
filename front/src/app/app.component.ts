import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.reducers';
import { UserAppService } from './common/services/app/user/user.app.service';
import * as ContestActions from './store/contests/contests.actions';
import { ContestsAppService } from './common/services/app/contests/contests.app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

    constructor(private userService: UserAppService,
                private store: Store<AppState>,
                private contestsService: ContestsAppService) {
        if (this.userService.hasLoggedStory()) {
            this.userService.login();
        }

        this.contestsService.subscribeOnContestsUpdates();

        this.store.dispatch(new ContestActions.fetchContests());
    }
}
