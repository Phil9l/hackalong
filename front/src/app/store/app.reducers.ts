import { ActionReducerMap } from '@ngrx/store';

import * as fromContests from './contests/contests.reducer';

export interface AppState {
    contests: fromContests.State
}

export const reducers: ActionReducerMap<AppState> = {
    contests: fromContests.contestsReducer
};
