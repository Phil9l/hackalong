import { Contest } from './contest';

export class Contests {
    opened: Contest[];
    closed: Contest[];

    constructor(data: any = {}) {
        this.opened = (data.opened || []).map(contest => new Contest(contest));
        this.closed = (data.closed || []).map(contest => new Contest(contest));
    }
}
