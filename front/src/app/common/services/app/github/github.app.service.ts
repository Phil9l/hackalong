import { Injectable } from '@angular/core';
import { GithubDataService } from '../../data/github/github.data.service';
import { Contests } from '../../../entities/contests';

@Injectable()
export class GithubAppService {

  constructor(private dataService: GithubDataService) {
  }

  async getContests(): Promise<Contests> {
    const contests = await this.dataService.getContests();
    return new Contests(contests);
  }
}
