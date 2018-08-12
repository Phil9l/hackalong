import { Component } from '@angular/core';
import { GithubAppService } from '../common/services/app/github/github.app.service';
import { Contests } from '../common/entities/contests';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.scss']
})
export class ContestComponent {

  constructor(private githubService: GithubAppService) {
    this.getContests();
  }

  async getContests(): Promise<Contests> {
    return await this.githubService.getContests();
  }
}
