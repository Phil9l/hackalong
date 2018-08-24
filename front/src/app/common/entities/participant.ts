import { User } from './user';

export class Participant extends User {
    points: number;

    constructor(data: any = {}) {
        super(data);

        this.points = data.points || 0;
    }
}
