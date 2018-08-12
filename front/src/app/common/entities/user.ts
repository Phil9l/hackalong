export class User {
  id: number;
  name: string;
  photoURL: string;

  constructor(data: any = {}) {
    this.id = data.id;
    this.name = data.name || '';
    this.photoURL = data.photoURL || '';
  }
}
