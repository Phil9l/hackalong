import { Component } from '@angular/core';
import { GithubAppService } from '../common/services/app/github/github.app.service';
import { Contests } from '../common/entities/contests';

@Component({
  selector: 'app-contests',
  templateUrl: './contests.component.html',
  styleUrls: ['./contests.component.scss']
})
export class ContestsComponent {

  constructor(private githubService: GithubAppService) {
    this.getContests();
  }

  async getContests(): Promise<Contests> {
    return await this.githubService.getContests();
  }
}
