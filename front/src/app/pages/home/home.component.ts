import { ChangeDetectorRef, Component } from '@angular/core';
import { firestore } from 'firebase';
import { Contest } from '../../common/entities/contest';
import { CommonUtils } from '../../common/utils/common/common.utils';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    finished = [] as Contest[];
    active = [] as Contest[];

    commonUtils = CommonUtils;

    constructor(private cd: ChangeDetectorRef) {
        firestore().collection('contests').get().then(snapshot => {
            snapshot.forEach((doc) => {
                const contest = new Contest(doc.data());
                switch (contest.isFinished) {
                    case true:
                        this.finished.push(contest);
                        break;
                    case false:
                        this.active.push(contest);
                        break;
                    default:
                        break;
                }
            });
            this.cd.detectChanges();
            console.log('active;', this.active);
            console.log('finished:', this.finished);
        })
    }
}
