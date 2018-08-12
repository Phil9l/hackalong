import { Component } from '@angular/core';
import { GithubAppService } from '../common/services/app/github/github.app.service';
import { Repository } from '../common/entities/repository';
import { UserAppService } from '../common/services/app/user/user.app.service';
import { User } from '../common/entities/user';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  user: User;
  repositories: Repository[];

  constructor(private githubService: GithubAppService,
              private userService: UserAppService) {
    this.getRepositories();
  }

  async getRepositories(): Promise<void> {
    await this.login();
    const owner = this.userService.user.nickname;
    const token = this.userService.loadToken();
    this.repositories = await this.githubService.getRepositories(owner, token);
  }

  async login(): Promise<void> {
    if (this.userService.user) {
      return;
    }
    await this.userService.login();
    this.user = this.userService.user;
  }

  selectRepository(selectedItem: Repository): void {
    this.repositories.forEach(item => item.selected = item === selectedItem);
  }
}
