import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TableObservation } from '../models/TableObservation';
import { TableEncounter } from '../models/TableEncounter';
import { TableCondition } from '../models/TableCondition';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent {

  id: string | null = '';
  loading: boolean = true;
  patientData: any;

  observationsDisplayedColumns: string[] = ['category', 'type', 'value', 'status', 'effective'];
  observationsDataSource: MatTableDataSource<TableObservation>;

  conditionsDisplayedColumns: string[] = ['category', 'type', 'status', 'onset'];
  conditionsDataSource: MatTableDataSource<TableCondition>;

  encountersDisplayedColumns: string[] = ['category', 'type', 'started', 'ended'];
  encountersDataSource: MatTableDataSource<TableEncounter>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private request: RequestService
  ) {
    this.initializeData().then().catch(error => console.error(error));
  }

  async initializeData(): Promise<any> {
    let response;
    this.id = this.route.snapshot.paramMap.get('id');

    response = await this.request.getPatient(this.id!).catch(error => console.error(error));
    this.patientData = JSON.parse(response.resource);

    // Create datasource for the observations table
    let observations: TableObservation[] = [];
    response = await this.request.getObservations(this.id!).catch(error => console.error(error));
    for (let element of response) {
      let jsonElement = JSON.parse(element.resource);

      let value = '-';
      if (jsonElement.value) {
        if (jsonElement.value.Quantity) {
          value = jsonElement.value.Quantity.value.toFixed(2) + ' ' + jsonElement.value.Quantity.unit
        } else {
          value = jsonElement.value.CodeableConcept.text;
        }
      }

      observations.push(new TableObservation(jsonElement.category[0].coding[0].code, jsonElement.code.text, 
        value, jsonElement.status, jsonElement.effective.dateTime ));
    }
    this.observationsDataSource = new MatTableDataSource(observations);

    // Create datasource for the conditions table
    let conditions: TableCondition[] = [];
    response = await this.request.getConditions(this.id!).catch(error => console.error(error));
    for (let element of response) {
      let jsonElement = JSON.parse(element.resource);
      conditions.push(new TableCondition(jsonElement.category[0].coding[0].code, jsonElement.code.text, 
        jsonElement.clinicalStatus, jsonElement.onset.dateTime ));
    }
    this.conditionsDataSource = new MatTableDataSource(conditions);

    // Create datasource for the conditions table
    let encounters: TableEncounter[] = [];
    response = await this.request.getEncounters(this.id!).catch(error => console.error(error));
    for (let element of response) {
      let jsonElement = JSON.parse(element.resource);
      encounters.push(new TableEncounter(jsonElement.class.code, jsonElement.type[0].text, 
        jsonElement.period.start, jsonElement.period.end ));
    }
    this.encountersDataSource = new MatTableDataSource(encounters);

    this.loading = false;
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
