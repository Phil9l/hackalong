import { Injectable } from '@angular/core';
import { GithubDataService } from '../data/github/github.data.service';
import { Contest } from '../../entities/contest';

@Injectable()
export class GithubAppService {

  constructor(private dataService: GithubDataService) {
  }

  getContests(): Promise<Contest[]> {
    return this.dataService.getContests();
  }
}
