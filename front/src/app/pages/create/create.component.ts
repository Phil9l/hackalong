import { Component } from '@angular/core';
import { GithubAppService } from '../../common/services/app/github/github.app.service';
import { Repository } from '../../common/entities/repository';
import { UserAppService } from '../../common/services/app/user/user.app.service';
import { User } from '../../common/entities/user';
import { Issue } from '../../common/entities/issue';
import { firestore } from 'firebase';
import { ContestsAppService } from '../../common/services/app/contests/contests.app.service';
import { Router } from '@angular/router';
import { CollectionType } from '../../common/enums/collection-type.enum';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html'
})
export class CreateComponent {
    now = new Date();
    user: User;
    repositories: Repository[];
    selectedRepository: Repository;
    issues = [] as Issue[];
    start: Date;
    end: Date;
    description: string;
    title: string;

    busy = {
        repositories: false,
        issues: false,
        create: false
    };

    constructor(private githubService: GithubAppService,
                private contestService: ContestsAppService,
                private userService: UserAppService,
                private route: Router) {
        this.getRepositories();
    }

    async getRepositories(): Promise<void> {
        this.busy.repositories = true;
        await this.login();
        // TODO: Add location for user entity in store
        const owner = this.userService.user.nickname;
        const token = this.userService.loadToken();
        this.repositories = await this.githubService.getRepositories(owner, token);
        this.busy.repositories = false;
    }

    async getIssues(): Promise<void> {
        this.busy.issues = true;
        await this.login();
        const owner = this.userService.user.nickname;
        const repository = this.selectedRepository.name;
        this.issues = await this.githubService.getIssues(owner, repository);
        this.busy.issues = false;
    }

    async login(): Promise<void> {
        if (this.userService.user) {
            return;
        }
        await this.userService.login();
        this.user = this.userService.user;
    }

    selectRepository(selectedItem: Repository): void {
        this.repositories.forEach(item => {
            item.selected = item === selectedItem;
            if (item.selected) {
                this.selectedRepository = item;
            }
        });
        this.getIssues();
    }

    async registerContest(): Promise<void> {
        const data = {
            owner: this.userService.user.nickname,
            start: this.start,
            end: this.end,
            repository: this.selectedRepository.name,
            title: this.title,
            description: this.description
        };

        try {
            this.busy.create = true;
            const result = await this.contestService.registerContest({
                owner: data.owner,
                repository: data.repository,
                token: this.userService.loadToken()
            });

            console.log('contest has been created:', result);

            const contestRef = firestore().collection(CollectionType.CONTESTS);
            await contestRef.add(data);

            this.busy.create = false;

            this.route.navigate(['/']);
        } catch (e) {
            console.log('error in create contest:', e);
        }
    }
}
