export class TableObservation {
    category: string;
    type: string;
    value: string;
    status: string;
    effective: string;

    constructor(category: string, type: string, value: string, status: string, effective: string) {
        this.category = category;
        this.type = type;
        this.value = value;
        this.status = status;
        this.effective = effective;
    }
  }