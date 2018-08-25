import { Contest } from '../../common/entities/contest';
import * as ContestsListActions from './contests.actions';
import * as fromApp from '../app.reducers';

export interface FeatureState extends fromApp.AppState {
    entities: State
}

export interface State {
    entities: Map<string, Contest>;
}

const initialState: State = {
    entities: new Map<string, Contest>()
};

export function contestsReducer(state = initialState, action: ContestsListActions.ContestsListActions) {
    switch (action.type) {
        case ContestsListActions.ADD_CONTESTS:
            return {
                ...state,
                entities: new Map([...Array.from(state.entities.entries()), ...Array.from(action.payload.entries())])
            };
        default:
            return state;
    }
}
