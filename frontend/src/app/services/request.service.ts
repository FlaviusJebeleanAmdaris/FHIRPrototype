import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  url = 'http://localhost:8080/api';

  constructor(
    private http: HttpClient
  ) { }

  getPatients(): Promise<any> {
    return this.http.get(this.url + '/patients').toPromise();
  }

  getPatient(id: string): Promise<any> {
    return this.http.get(this.url + `/patients/${id}`).toPromise();
  }

  getObservations(patientId: string): Promise<any> {
    return this.http.get(this.url + `/patients/${patientId}/observations`).toPromise();
  }

  getConditions(patientId: string): Promise<any> {
    return this.http.get(this.url + `/patients/${patientId}/conditions`).toPromise();
  }

  getEncounters(patientId: string): Promise<any> {
    return this.http.get(this.url + `/patients/${patientId}/encounters`).toPromise();
  }
}
