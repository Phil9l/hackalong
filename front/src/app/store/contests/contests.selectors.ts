import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { BaseSelectors } from '../base.selector';
import { Contest } from '../../common/entities/contest';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../app.reducers';
import { Injectable } from '@angular/core';
import * as fromContests from './contests.reducer';

@Injectable()
export class ContestsSelectors extends BaseSelectors {
    protected featureStateSelector = createFeatureSelector('contests');

    constructor(store: Store<AppState>) {
        super(store);
    }

    getContest(id: string): Observable<Contest> {
        return this.select(createSelector(
            this.featureStateSelector,
            (state: fromContests.State) => state.entities.get(id)
        ));
    }

    getFinishedContests(): Observable<Contest[]> {
        return this.select(createSelector(
            this.featureStateSelector,
            (state: fromContests.State) => Array.from(state.entities.values()).filter(entity => entity.end < new Date()))
        );
    }

    getActiveContests(): Observable<Contest[]> {
        return this.select(createSelector(
            this.featureStateSelector,
            (state: fromContests.State) => Array.from(state.entities.values()).filter(entity => new Date() < entity.end))
        );
    }
}
