import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTable} from '@angular/material';
import { ParticipantsTableDataSource, Participant, PARTICIPANT_DATA } from './participants-table-datasource';

@Component({
  selector: 'app-participants-table',
  templateUrl: './participants-table.component.html',
  styleUrls: ['./participants-table.component.css']
})
export class ParticipantsTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable, {static: true}) table: MatTable<Participant>;
  dataSource: ParticipantsTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'fullid', 'family', 'arrival_date', 'country', 'study'];

  ngOnInit() {
    this.dataSource = new ParticipantsTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onAddParticipant() {
    alert('To be implemented');
  }
}
