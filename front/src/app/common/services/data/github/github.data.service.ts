import { BaseDataService } from '../base/base.data.service';
import { Contest } from '../../../entities/contest';
import { environment } from '../../../../../environments/environment';
import { Issue } from '../../../entities/issue';
import { Repository } from '../../../entities/repository';

export class GithubDataService extends BaseDataService {

  getIssues(params): Promise<Issue[]> {
    return this.get(environment.apiUrls.repositories, params);
  }

  async getRepositories(params): Promise<Repository[]> {
    const repositories = await this.get(environment.apiUrls.repositories, params);
    return repositories.map(item => new Repository(item));
  }

  getContests(): Promise<Contest[]> {
    return this.get(environment.apiUrls.contests.all);
  }
}
