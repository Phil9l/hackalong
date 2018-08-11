import { BaseDataService } from '../base/base.data.service';
import { Contest } from '../../../entities/contest';
import { environment } from '../../../../../environments/environment';

export class GithubDataService extends BaseDataService {

  getContests(): Promise<Contest[]> {
    return this.get(environment.apiUrls.contests.all);
  }
}
