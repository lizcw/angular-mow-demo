import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTable} from '@angular/material';
import {Dataset, DatasetsTableDataSource, FIELD_CODES, GROUP_FILES, GroupFiles} from './datasets-table-datasource';

@Component({
  selector: 'app-datasets-table',
  templateUrl: './datasets-table.component.html',
  styleUrls: ['./datasets-table.component.css']
})
export class DatasetsTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable, {static: true}) table: MatTable<Dataset>;
  dataSource: DatasetsTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'participant_id', 'digs', 'figs', 'narrative', 'records', 'consensus', 'ldps', 'notes'];
  files: string[] = [];
  groups: GroupFiles[];
  selectedDataset: Dataset;
  selectedGroup: string;
  @Input() group: string;

  ngOnInit() {
    // tslint:disable-next-line:radix
    this.dataSource = new DatasetsTableDataSource(parseInt(this.group));
    this.groups = GROUP_FILES;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  getFieldCode(code: number) {
    return FIELD_CODES[code];
  }

  onShowFiles(dataset: Dataset, grouptype: string) {
    console.log('onshowfiles');
    this.selectedDataset = dataset;
    this.selectedGroup = grouptype;
    const group = this.groups.find( x => x.id === dataset.group);
    this.files = group[grouptype.toLowerCase() + '_files'];
    console.log(this.files);
  }
}
