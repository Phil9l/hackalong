export class User {
  id: number;
  name: string;
  nickname: string;
  photoURL: string;

  constructor(data: any = {}) {
    this.id = data.id;
    this.name = data.name || '';
    this.nickname = data.nickname || '';
    this.photoURL = data.photoURL || '';
  }
}
