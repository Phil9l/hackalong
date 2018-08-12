import { Participant } from './participant';

export class Contest {
  id: number;
  title: string;
  participants: Participant[];
  deadline: number;
  description: string;

  constructor(data: any = {}) {
    this.id = data.id;
    this.title = data.title || '';
    this.participants = (data.participants || []).map(participant => new Participant(participant));
    this.deadline = data.deadline || 0;
    this.description = data.description || '';
  }
}
