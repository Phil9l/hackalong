import { Action } from '@ngrx/store';
import { Contest } from '../../common/entities/contest';

export const ADD_CONTESTS = 'ADD_CONTESTS';
export const FETCH_CONTESTS = 'FETCH_CONTESTS';
export const RELOAD_CONTEST = 'RELOAD_CONTEST';

export class addContests implements Action {
    readonly type = ADD_CONTESTS;

    constructor(public payload: Map<string, Contest>) {}
}

export class fetchContests implements Action {
    readonly type = FETCH_CONTESTS;

    constructor() {}
}

export class reloadContest implements Action {
    readonly type = RELOAD_CONTEST;

    constructor() {}
}

export type ContestsListActions = addContests | fetchContests | reloadContest;
