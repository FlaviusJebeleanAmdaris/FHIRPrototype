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
  patientData: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private request: RequestService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.request.getPatient(this.id!).then(response => {
      this.patientData = JSON.parse(response.resource);
    }).catch(error => {
      console.error(error);
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
