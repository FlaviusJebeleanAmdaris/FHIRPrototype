import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  url = 'http://localhost:8080';

  constructor(
    private http: HttpClient
  ) { }

  getPatients(): Promise<any> {
    return this.http.get(this.url + '/patients').toPromise();
  }

  getPatient(id: string): Promise<any> {
    return this.http.get(this.url + `/patient/${id}`).toPromise();
  }

  getObservations(patientId: string): Promise<any> {
    return this.http.get(this.url + `/observations/${patientId}`).toPromise();
  }

  getConditions(patientId: string): Promise<any> {
    return this.http.get(this.url + `/conditions/${patientId}`).toPromise();
  }

  getEncounters(patientId: string): Promise<any> {
    return this.http.get(this.url + `/encounters/${patientId}`).toPromise();
  }
}
