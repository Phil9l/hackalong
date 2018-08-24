import { Component, Input } from '@angular/core';
import { GithubAppService } from '../../common/services/app/github/github.app.service';
import { Contest } from '../../common/entities/contest';
import { ActivatedRoute } from '@angular/router';
import { ContestsSelectors } from '../../store/contests/contests.selectors';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-contest',
    templateUrl: './contest.component.html'
})
export class ContestComponent {
    @Input() contest: Contest;

    contest$: Observable<Contest>;

    constructor(private githubService: GithubAppService,
                private route: ActivatedRoute,
                private contestsSelectors: ContestsSelectors) {
        const id = this.route.snapshot.paramMap.get('id');
        this.contest$ = this.contestsSelectors.getContest(id);
    }
}
