import { ChangeDetectorRef, Component } from '@angular/core';
import { Contest } from '../../common/entities/contest';
import { CommonUtils } from '../../common/utils/common/common.utils';
import { ContestsSelectors } from '../../store/contests/contests.selectors';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    finishedContests$: Observable<Contest[]>;
    activeContests$: Observable<Contest[]>;

    commonUtils = CommonUtils;

    constructor(private cd: ChangeDetectorRef,
                private contestsSelectors: ContestsSelectors) {
        this.finishedContests$ = this.contestsSelectors.getFinishedContests();
        this.activeContests$ = this.contestsSelectors.getActiveContests();
    }
}
