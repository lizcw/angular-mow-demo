import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTable} from '@angular/material';
import { DnaDataSource, DnaItem } from './dna-datasource';

@Component({
  selector: 'app-dna',
  templateUrl: './dna.component.html',
  styleUrls: ['./dna.component.css']
})
export class DnaComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable, {static: true}) table: MatTable<DnaItem>;
  dataSource: DnaDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'participant', 'dna', 'extraction', 'location', 'qc', 'notes'];

  ngOnInit() {
    this.dataSource = new DnaDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
