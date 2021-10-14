import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  id: string | null = '';
  loading: boolean = true;
  patientData: any;
  observationData: any[] = [];
  conditionData: any[] = [];
  encounterData: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private request: RequestService
  ) { }

  async ngOnInit() {
    let response;
    this.id = this.route.snapshot.paramMap.get('id');

    response = await this.request.getPatient(this.id!).catch(error => console.error(error));
    this.patientData = JSON.parse(response.resource);

    response = await this.request.getObservations(this.id!).catch(error => console.error(error));
    for (let element of response) {
      this.observationData.push(JSON.parse(element.resource));
    }

    response = await this.request.getConditions(this.id!).catch(error => console.error(error));
    for (let element of response) {
      this.conditionData.push(JSON.parse(element.resource));
    }

    response = await this.request.getEncounters(this.id!).catch(error => console.error(error));
    for (let element of response) {
      this.encounterData.push(JSON.parse(element.resource));
    }

    this.loading = false;
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
