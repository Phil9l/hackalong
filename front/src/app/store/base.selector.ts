import { MemoizedSelector, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState } from './app.reducers';

export class BaseSelectors {
    protected featureStateSelector;

    constructor(private store: Store<AppState>) {
    }

    protected select<T>(selector: MemoizedSelector<object, T>): Observable<T> {
        return this.store.pipe(select(selector));
    }
}
