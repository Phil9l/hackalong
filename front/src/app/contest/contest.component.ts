import { Component, Input } from '@angular/core';
import { GithubAppService } from '../common/services/app/github/github.app.service';
import { Contests } from '../common/entities/contests';
import { Contest } from '../common/entities/contest';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.scss']
})
export class ContestComponent {
  @Input() contest: Contest;

  constructor(private githubService: GithubAppService) {
    this.getContests();
  }

  async getContests(): Promise<Contests> {
    return await this.githubService.getContests();
  }
}
