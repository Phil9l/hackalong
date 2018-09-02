import { environment } from '../../../../../environments/environment';
import { BaseDataService } from '../base/base.data.service';

export class ContestsDataService extends BaseDataService {

    registerContest(params): Promise<void> {
        return this.get(environment.apiUrls.contests.create, params);
    }

    selectIssue(params): Promise<void> {
        return this.get(environment.apiUrls.contests.selectIssue, params);
    }
}
