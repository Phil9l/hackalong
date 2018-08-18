import { Component } from '@angular/core';
import { firestore } from 'firebase';
import { Contest } from '../../common/entities/contest';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    finished: Contest[];
    active: Contest[];

    date = new Date();

    constructor() {
        this.date.setMinutes(18);

        firestore().collection('contests').get().then(snapshot => {
            snapshot.forEach((doc) => {
                console.log(doc.id, '=>', doc.data());
                switch (doc.data().finished) {
                    case true:
                        this.finished.push(new Contest(doc.data()));
                        break;
                    case false:
                        this.active.push(new Contest(doc.data()));
                        break;
                    default:
                        break;
                }
            });
        })
    }
}
