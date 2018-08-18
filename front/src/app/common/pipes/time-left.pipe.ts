import { AsyncPipe } from '@angular/common';
import { ChangeDetectorRef, Pipe } from '@angular/core';
import { Observable } from 'rxjs-compat/Observable';
import { interval } from 'rxjs/internal/observable/interval';
import { map } from 'rxjs/operators';

const LANGUAGE_CONSTANTS = {
    active: {
        now: 'just created',
        interval: 'left'
    },
    ended: {
        now: 'just finished',
        interval: 'ago'
    }
};

@Pipe({
    name: 'timeLeft',
    pure: false
})
export class TimeLeftPipe extends AsyncPipe {
    private static TIME_UPDATE_PERIOD = 1000;

    value: Date;
    timer: Observable<any>;

    constructor(ref: ChangeDetectorRef) {
        super(ref);
    }

    transform(obj: any): any {
        this.value = obj;

        if (!this.timer) {
            this.timer = this.getObservable();
        }

        return super.transform(this.timer);
    }

    private getObservable() {
        const time = this.value.getTime();
        return interval(TimeLeftPipe.TIME_UPDATE_PERIOD).pipe(
            map((result: any) => {
                const now = new Date().getTime();
                const isActive = now < time;
                const language = LANGUAGE_CONSTANTS[isActive ? 'active' : 'ended'];

                let delta = (now - time) / 1000;
                if (isActive) {
                    delta *= -1;
                }

                if (delta < 10 && !isActive) {
                    result = language.now;
                }
                else if (delta < 60) {
                    result = Math.floor(delta).toString() + ` seconds ${language.interval}`;
                }
                else if (delta < 3600) {
                    result = Math.floor(delta / 60).toString() + ` minutes ${language.interval}`;
                }
                else if (delta < 86400) {
                    result = Math.floor(delta / 3600).toString() + ` hours ${language.interval}`;
                }
                else {
                    result = Math.floor(delta / 86400).toString() + ` days ${language.interval}`;
                }
                return result;
            }));
    };
}
