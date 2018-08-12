import { Participant } from './participant';

export class Contest {
  title: string;
  start: Date;
  end: Date;
  participants: Participant[];
  deadline: number;
  description: string;
  isFinished: boolean;

  constructor(data: any = {}) {
    this.title = data.title || '';
    this.start = new Date(data.start);
    this.end = new Date(data.end);
    this.deadline = data.deadline || 0;
    this.description = data.description || '';
    this.isFinished = data.isFinished || data.is_finished;

    const users = Object.keys(data.users);
    this.participants = users.map(user => new Participant({ nickname: user, points: users[user] }));
  }
}
