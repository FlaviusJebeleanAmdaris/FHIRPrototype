export class TablePatient {
    id: string;
    name: string;
    surname: string;
    birthDate: string;

    constructor(id: string, name: string, surname: string, birthDate: string) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.birthDate = birthDate;
    }
  }