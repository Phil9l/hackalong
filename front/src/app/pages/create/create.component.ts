import { Component } from '@angular/core';
import { GithubAppService } from '../../common/services/app/github/github.app.service';
import { Repository } from '../../common/entities/repository';
import { UserAppService } from '../../common/services/app/user/user.app.service';
import { User } from '../../common/entities/user';
import { Issue } from '../../common/entities/issue';
import { database } from 'firebase';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html'
})
export class CreateComponent {
    user: User;
    repositories: Repository[];
    selectedRepository: Repository;
    issues = [] as Issue[];
    deadline: Date;
    description: string;

    constructor(private githubService: GithubAppService,
                private userService: UserAppService) {
        this.getRepositories();
        this.getIssues();
    }

    async getRepositories(): Promise<void> {
        await this.login();
        const owner = this.userService.user.nickname;
        const token = this.userService.loadToken();
        this.repositories = await this.githubService.getRepositories(owner, token);
    }

    async getIssues(): Promise<void> {
        await this.login();
        const owner = this.userService.user.nickname;
        const repository = this.selectedRepository.name;
        this.issues = await this.githubService.getIssues(owner, repository);
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
    }

    createContest(): void {
        if (!this.isComplete()) {
            alert('Please, fill all forms');
            return;
        }
        const contestRef = database().ref('contests');
        const data = {
            username: this.userService.user.nickname,
            deadline: this.deadline,
            repository: this.selectedRepository.name,
            description: this.description,
            issues: this.issues
        };
        contestRef.set(data);
    }

    isComplete(): boolean {
        return Boolean(this.deadline) && Boolean(this.selectedRepository) && Boolean(this.description.length);
    }
}
