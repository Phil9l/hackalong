import { Component, Input } from '@angular/core';
import { Contest } from '../../common/entities/contest';

@Component({
    selector: 'app-contest-list',
    templateUrl: './contest-list.component.html'
})
export class ContestListComponent {
    @Input() title: string;
    @Input() contests: Contest[];
}
