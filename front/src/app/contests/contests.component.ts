import { Component } from '@angular/core';
import { GithubAppService } from '../common/services/app/github.app.service';

@Component({
  selector: 'app-contests',
  templateUrl: './contests.component.html',
  styleUrls: ['./contests.component.scss']
})
export class ContestsComponent {

  constructor(private githubService: GithubAppService) {
    this.getContests();
  }

  async getContests() {
    const contests = await this.githubService.getContests();
    console.log('contests', contests);
  }
}
