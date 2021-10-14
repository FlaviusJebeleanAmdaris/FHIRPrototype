export class TableEncounter {
    category: string;
    type: string;
    started: string;
    ended: string;

    constructor(category: string, type: string, started: string, ended: string) {
        this.category = category;
        this.type = type;
        this.started = started;
        this.ended = ended;
    }
  }