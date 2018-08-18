import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Contest } from '../../common/entities/contest';

import * as ContestActons from './contests.actions';
import { mergeMap } from 'rxjs/operators';
import { firestore } from 'firebase';

@Injectable()
export class ContestsEffects {

    constructor(private actions$: Actions) {
    }

    @Effect()
    contestsFetch = this.actions$.pipe(
        ofType(ContestActons.FETCH_CONTESTS),
        mergeMap(() =>
            firestore().collection('contests').get().then(snapshot => {
                const contests = [];
                snapshot.forEach(contest => contests.push(new Contest(contest.data())));
                return { type: ContestActons.ADD_CONTESTS, payload: contests };
            })
        ));
}
