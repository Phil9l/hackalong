import { IssueStateType } from '../enums/issue-state.enum';

export class Issue {
    id: number;
    title: string;
    points: number;
    state: IssueStateType;
    date: Date;
    createdAt: Date;

    constructor(data: any = {}) {
        this.id = data.id;
        this.title = data.title || '';
        this.points = data.points || 0;
        this.state = data.state || IssueStateType.EMPTY;
        this.date = data.date;
        this.createdAt = new Date(data.createdAt || data.created_at);
    }

    increasePoints(): void {
        this.points++;
    }

    decreasePoints(): void {
        if (0 < this.points) {
            this.points--;
        }
    }

    get hasZeroPoints(): boolean {
        return this.points === 0;
    }
}
