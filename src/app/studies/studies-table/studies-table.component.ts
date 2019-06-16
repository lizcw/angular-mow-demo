import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTable} from '@angular/material';
import { StudiesTableDataSource, Study } from './studies-table-datasource';

@Component({
  selector: 'app-studies-table',
  templateUrl: './studies-table.component.html',
  styleUrls: ['./studies-table.component.css']
})
export class StudiesTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable, {static: true}) table: MatTable<Study>;
  dataSource: StudiesTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'code', 'title', 'description', 'status', 'action'];
  showdetail: boolean;

  ngOnInit() {
    this.dataSource = new StudiesTableDataSource();
    this.showdetail = false;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onAddStudy() {
    alert('Not yet implemented');
  }
}
