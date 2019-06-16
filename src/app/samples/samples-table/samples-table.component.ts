import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTable} from '@angular/material';
import {Sample, SamplesTableDataSource, SampleType} from './samples-table-datasource';

@Component({
  selector: 'app-samples-table',
  templateUrl: './samples-table.component.html',
  styleUrls: ['./samples-table.component.css']
})
export class SamplesTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable, {static: true}) table: MatTable<Sample>;
  dataSource: SamplesTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'participant', 'sampletype', 'rebleed', 'storage_date',
    'storage_location', 'leukocyte', 'lcl', 'dna', 'transform', 'harvest', 'shipment'];

  ngOnInit() {
    this.dataSource = new SamplesTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onAddSample() {

  }

}
