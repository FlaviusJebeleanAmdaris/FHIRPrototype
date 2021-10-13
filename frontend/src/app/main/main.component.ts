import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TablePatient } from '../models/TablePatient';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  patients: TablePatient[] = [];

  displayedColumns: string[] = ['id', 'name', 'surname', 'birthDate', 'details'];
  dataSource: MatTableDataSource<TablePatient>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private requests: RequestService,
    private router: Router
  ) {
    this.requests.getPatients().then(response => {
      for (let patient of response) {
        const resource = JSON.parse(patient.resource);
        this.patients.push(new TablePatient(patient.id, resource.name[0].given[0], resource.name[0].family, resource.birthDate));
      }

      this.dataSource = new MatTableDataSource(this.patients);

      setTimeout(() => this.dataSource.paginator = this.paginator);
      setTimeout(() => this.dataSource.sort = this.sort);
    }).catch(error => {
      console.error(error);
    });
  }

  goToPatient(id: string) {
    this.router.navigate([`/patient/${id}`]);
  }

}
