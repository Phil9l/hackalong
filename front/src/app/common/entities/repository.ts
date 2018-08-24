export class Repository {
    id: number;
    name: string;
    selected: boolean;

    constructor(data: any = {}) {
        this.id = data.id;
        this.name = data.name || '';
        this.selected = data.selected || false;
    }
}
