import { Action } from '@ngrx/store';
import { Contest } from '../../common/entities/contest';

export const ADD_CONTESTS = 'ADD_CONTESTS';
export const FETCH_CONTESTS = 'FETCH_CONTESTS';

export class addContests implements Action {
    readonly type = ADD_CONTESTS;

    constructor(public payload: Contest[]) {}
}

export class fetchContests implements Action {
    readonly type = FETCH_CONTESTS;

    constructor() {}
}

export type ContestsListActions = addContests | fetchContests;
