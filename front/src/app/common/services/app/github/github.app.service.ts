import { Injectable } from '@angular/core';
import { GithubDataService } from '../../data/github/github.data.service';
import { Issue } from '../../../entities/issue';
import { Repository } from '../../../entities/repository';

@Injectable()
export class GithubAppService {

    constructor(private dataService: GithubDataService) {
    }

    getIssues(owner, repository): Promise<Issue[]> {
        return this.dataService.getIssues({ owner, repository });
    }

    getRepositories(owner, token): Promise<Repository[]> {
        return this.dataService.getRepositories({ owner, token });
    }
}
