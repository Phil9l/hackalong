import { Participant } from './participant';

export class Contest {
    title: string;
    start: Date;
    end: Date;
    participants: Participant[];
    deadline: number;
    imageURL: string;
    description: string;
    isFinished: boolean;

    constructor(data: any = {}) {
        this.title = data.title || '';
        this.start = new Date(data.start);
        this.end = new Date(data.end);
        this.deadline = data.deadline || 0;
        this.imageURL = data.imageURL || '';
        this.description = data.description || '';
        this.isFinished = data.isFinished || data.is_finished;

        const users = Object.keys(data.users);
        this.participants = users.map(user => new Participant({ nickname: user, points: users[user] }));
    }

    get started(): boolean {
        return this.start < new Date();
    }
}
