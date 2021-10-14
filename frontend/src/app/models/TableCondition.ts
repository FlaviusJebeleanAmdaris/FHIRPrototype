export class TableCondition {
    category: string;
    type: string;
    status: string;
    onset: string;

    constructor(category: string, type: string, status: string, onset: string) {
        this.category = category;
        this.type = type;
        this.status = status;
        this.onset = onset;
    }
  }