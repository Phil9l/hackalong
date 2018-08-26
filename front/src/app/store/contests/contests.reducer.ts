import { Contest } from '../../common/entities/contest';
import * as ContestsListActions from './contests.actions';

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
                entities: new Map(action.payload)
            };
        default:
            return state;
    }
}
