import { Component } from '@angular/core';
import { UserAppService } from './common/services/app/user/user.app.service';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.reducers';

import * as ContestActions from './store/contests/contests.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

    constructor(private userService: UserAppService,
                private store: Store<AppState>) {
        if (this.userService.hasLoggedStory()) {
            this.userService.login();
        }

        this.store.dispatch(new ContestActions.fetchContests());
    }
}
