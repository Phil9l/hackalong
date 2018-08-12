import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Contest } from './contest';

export class Contests {
  opened: Contest[];
  closed: Content[];

  constructor(data: any = {}) {
    this.opened = (data.opened || []).map(contest => new Contest(contest));
    this.closed = (data.closed || []).map(contest => new Contest(contest));
  }
}
