import { BaseDataService } from '../base/base.data.service';
import { Contest } from '../../../entities/contest';
import { environment } from '../../../../../environments/environment';
import { Issue } from '../../../entities/issue';
import { Repository } from '../../../entities/repository';

export class GithubDataService extends BaseDataService {

  getIssues(): Promise<Issue[]> {
    return this.get(environment.apiUrls.issues);
  }

  getRepositories(): Promise<Repository> {
    return this.get(environment.apiUrls.repositories);
  }

  getContests(): Promise<Contest[]> {
    return this.get(environment.apiUrls.contests.all);
  }
}
