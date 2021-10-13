import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  patients: any[] = [];

  constructor(
    private requests: RequestService,
    private router: Router
  ) {}

  ngOnInit() {
    this.requests.getPatients().then(response => {
      this.patients = response;
    }).catch(error => {
      console.error(error);
    });
  }

  goToPatient(patient: any) {
    this.router.navigate([`/patient/${patient.id}`]);
  }

}
