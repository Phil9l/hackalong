import { BaseDataService } from '../base/base.data.service';
import { environment } from '../../../../../environments/environment';
import { Issue } from '../../../entities/issue';
import { Repository } from '../../../entities/repository';

export class GithubDataService extends BaseDataService {

    async getIssues(params): Promise<Issue[]> {
        const issues = await this.get(environment.apiUrls.issues, params) || [];
        return issues.map(issue => new Issue(issue));
    }

    async getRepositories(params): Promise<Repository[]> {
        const repositories = await this.get(environment.apiUrls.repositories, params) || [];
        return repositories.map(repo => new Repository(repo));
    }
}
