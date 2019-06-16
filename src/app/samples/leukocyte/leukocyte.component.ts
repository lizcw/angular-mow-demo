import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTable} from '@angular/material';
import { LeukocyteDataSource, LeukocyteItem } from './leukocyte-datasource';
import {Leukocyte} from '../samples-table/samples-table-datasource';

@Component({
  selector: 'app-leukocyte',
  templateUrl: './leukocyte.component.html',
  styleUrls: ['./leukocyte.component.css']
})
export class LeukocyteComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable, {static: true}) table: MatTable<LeukocyteItem>;
  dataSource: LeukocyteDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'participant', 'leukocyte', 'location1', 'location2', 'location3'];

  ngOnInit() {
    this.dataSource = new LeukocyteDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  getLocation(leukocyte: Leukocyte, site: number) {
    const loc = leukocyte.location.find(x => x.site === site);
    return loc.ref;
  }
}
