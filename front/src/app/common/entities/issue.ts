import { IssueStateType } from '../enums/issue-state.enum';

export class Issue {
  id: number;
  title: string;
  points: number;
  state: IssueStateType;

  constructor(data: any = {}) {
    this.id = data.id;
    this.title = data.title || '';
    this.points = data.points || 0;
    this.state = data.state || IssueStateType.EMPTY;
  }
}
