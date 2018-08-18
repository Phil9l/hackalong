import { ChangeDetectorRef, Component } from '@angular/core';
import { GithubAppService } from '../../../common/services/app/github/github.app.service';
import { UserAppService } from '../../../common/services/app/user/user.app.service';
import { User } from '../../../common/entities/user';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home-header',
    templateUrl: './home-header.component.html'
})
export class HomeHeaderComponent {
    user: User;

    constructor(private githubService: GithubAppService,
                private userService: UserAppService,
                private changeDetector: ChangeDetectorRef,
                private router: Router) {
        this.user = this.userService.user;

        this.userService.userChanged$.subscribe(user => {
            this.user = user;
            this.changeDetector.detectChanges();
        });
    }

    signIn(): void {
        this.userService.signIn();
    }

    signOut(): void {
        this.userService.signOut();
    }

    createContest(): void {
        if (!this.user) {
            this.userService.signIn();
            return;
        }
        this.router.navigateByUrl('create');
    }
}
