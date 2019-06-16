import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTable} from '@angular/material';
import { LclDataSource, LclItem } from './lcl-datasource';
import {LCL, Leukocyte} from '../samples-table/samples-table-datasource';

@Component({
  selector: 'app-lcl',
  templateUrl: './lcl.component.html',
  styleUrls: ['./lcl.component.css']
})
export class LclComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable, {static: true}) table: MatTable<LclItem>;
  dataSource: LclDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'participant', 'lcl', 'location1', 'location2', 'location3', 'location4', 'location5'];

  ngOnInit() {
    this.dataSource = new LclDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  getLocation(lcl: LCL, site: number) {
    const loc = lcl.location.find(x => x.site === site);
    return loc.ref;
  }
}
