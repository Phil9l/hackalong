import { Contest } from '../../common/entities/contest';
import * as ContestsListActions from './contests.actions';
import * as fromApp from '../app.reducers';

export interface FeatureState extends fromApp.AppState {
    entities: State
}

export interface State {
    entities: Contest[];
}

const initialState: State = {
    entities: []
};

export function contestsReducer(state = initialState, action: ContestsListActions.ContestsListActions) {
    switch (action.type) {
        case ContestsListActions.ADD_CONTESTS:
            return {
                ...state,
                entities: action.payload
            };
        default:
            return state;
    }
}
