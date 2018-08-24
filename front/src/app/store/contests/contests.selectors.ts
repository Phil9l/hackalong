import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { BaseSelectors } from '../base.selector';
import { Contest } from '../../common/entities/contest';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../app.reducers';
import { Injectable } from '@angular/core';

@Injectable()
export class ContestsSelectors extends BaseSelectors {
    protected featureStateSelector = createFeatureSelector('contests');

    constructor(store: Store<AppState>) {
        super(store);
    }

    // TODO: Array => Map data structure
    getContest(id: string): Observable<Contest> {
        return this.select(createSelector(
            this.featureStateSelector,
            (state: any) => state.entities.find(entity => entity.id === id)
        ));
    }

    getFinishedContests(): Observable<Contest[]> {
        return this.select(createSelector(
            this.featureStateSelector,
            (state: any) => state.entities.filter(entity => entity.end < new Date()))
        );
    }

    getActiveContests(): Observable<Contest[]> {
        return this.select(createSelector(
            this.featureStateSelector,
            (state: any) => state.entities.filter(entity => new Date() < entity.end))
        );
    }
}
