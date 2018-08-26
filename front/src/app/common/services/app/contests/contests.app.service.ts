import { CollectionType } from '../../../enums/collection-type.enum';
import { firestore } from 'firebase';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.reducers';
import { Contest } from '../../../entities/contest';
import * as ContestActions from '../../../../store/contests/contests.actions';

@Injectable()
export class ContestsAppService {

    constructor(private store: Store<AppState>) {
    }

    subscribeOnContestsUpdates(): void {
        firestore().collection(CollectionType.CONTESTS)
            .onSnapshot(snapshot => {
                const contests = [];
                snapshot.forEach(contest => contests.push(new Contest({ ...contest.data(), id: contest.id })));
                this.store.dispatch(
                    new ContestActions.addContests(
                        new Map(contests.map(item => [item.id, item] as [string, Contest]))
                    )
                )
            });
    }
}
