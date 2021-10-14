import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() dataSource: MatTableDataSource<any>;
  @Input() displayColumns: string[];
  @ViewChild(MatPaginator) observationsPaginator: MatPaginator;
  @ViewChild(MatSort) observationsSort: MatSort;

  constructor() {
    setTimeout(() => this.dataSource.paginator = this.observationsPaginator);
    setTimeout(() => this.dataSource.sort = this.observationsSort);
   }

  ngOnInit(): void {
  }

}
