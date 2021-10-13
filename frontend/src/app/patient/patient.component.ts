import { Component, OnInit } from '@angular/core';
import { flushMicrotasks } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  id: string | null = '';
  patient: any;

  constructor(
    private route: ActivatedRoute,
    private request: RequestService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.request.getPatient(this.id!).then(response => {
      this.patient = response;
      
      
    }).catch(error => {
      console.error(error);
    });
  }
}
