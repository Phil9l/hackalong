import { Participant } from './participant';
import { StringUtils } from '../utils/string/string.utils';

export class Contest {
    id: string;
    title: string;
    start: Date;
    end: Date;
    participants: Participant[];
    deadline: number;
    imageURL: string;
    description: string;
    isFinished: boolean;
    link: string;
    owner: string;
    urlName: string;

    constructor(data: any = {}) {
        this.id = data.id || '';
        this.title = data.title || '';
        this.start = new Date(data.start);
        this.end = new Date(data.end);
        this.link = data.link || '';
        this.owner = data.owner || '';
        this.deadline = data.deadline || 0;
        this.imageURL = data.imageURL || '';
        this.description = data.description || '';
        this.isFinished = data.isFinished || data.is_finished;

        const users = Object.keys(data.users);
        this.participants = users.map(user => new Participant({ nickname: user, points: data.users[user] }));
        this.urlName = StringUtils.toKebabCase(data.title);
    }

    get started(): boolean {
        return this.start < new Date();
    }
}
