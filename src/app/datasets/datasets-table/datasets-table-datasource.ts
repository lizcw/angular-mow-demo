import {DataSource} from '@angular/cdk/collections';
import {MatPaginator, MatSort} from '@angular/material';
import {map} from 'rxjs/operators';
import {Observable, of as observableOf, merge} from 'rxjs';

// TODO: Replace this with your own data model type
export interface Dataset {
  id: number;
  group: number;
  participant_id: string;
  digs: number;
  figs: number;
  narrative: number;
  records: number;
  consensus: number;
  ldps: number;
  dsmiv?: number;
  notes: string;
}

export interface GroupFiles {
  id: number;
  group: string;
  files: string[];
  digs_files: string[];
  figs_files: string[];
  narrative_files: string[];
  records_files: string[];
  consensus_files: string[];
  ldps_files: string[];
}

// TODO: replace this with real data from your application
export const DATASET_DATA: Dataset[] = [
  {
    id: 1, group: 1, participant_id: '46-0024-001', digs: 1, figs: 1, narrative: 1,
    records: 2, consensus: 1, ldps: 1, notes: ''
  },
  {
    id: 2, group: 1, participant_id: '46-0024-002', digs: 1, figs: 1, narrative: 1,
    records: 2, consensus: 1, ldps: 1, notes: ''
  },
  {
    id: 3, group: 1, participant_id: '41-0002-001', digs: 1, figs: 1, narrative: 1,
    records: 2, consensus: 0, ldps: 1, notes: ''
  },
  {
    id: 4, group: 1, participant_id: '41-0002-002', digs: 1, figs: 1, narrative: 1,
    records: 2, consensus: 0, ldps: 1, notes: 'some info here'
  },
  {
    id: 5, group: 1, participant_id: '41-0002-003', digs: 1, figs: 1, narrative: 1,
    records: 2, consensus: 1, ldps: 1, notes: ''
  },
  {
    id: 6, group: 1, participant_id: '41-0003-001', digs: 1, figs: 1, narrative: 1,
    records: 2, consensus: 1, ldps: 1, notes: ''
  },
  {
    id: 7, group: 1, participant_id: '41-0003-002', digs: 1, figs: 1, narrative: 1,
    records: 2, consensus: 1, ldps: 3, notes: ''
  }
];

export const GROUP_FILES: GroupFiles[] = [
  {
    id: 1, group: 'Australia-MGS1', files: [
      'C:\scz 2000\Audit\Audit_22Apr_08.xls (Non-VISDIGS stand-alone)',
      'C:\scz 2000\schiz2000.mdb (Non-VISDIGS stand-alone)'],
    digs_files: [
      'C:\\newlod\\vdg_mgs2 (VISDIGS stand-alone)',
      'Hard copy: File storage room S3.31 + Genetics room S3.21'
    ],
    figs_files: [
      'Hard copy: File storage room S3.31 + Genetics room S3.21',
      'C:\\scz 2000\\schiz2000.mdb (Non-VISDIGS stand-alone)'
    ],
    narrative_files: [
      'C:\\scz 2000\\MGS 2 Narratives (Non-VISDIGS stand-alone)'
    ],
    records_files: [
      'Hard copy: File storage room S3.31 + Genetics room S3.21',
      'Hard copy: Medical records requests audit - Genetics room S3.21',
      'C:\\scz 2000\\schiz2000.mdb (Non-VISDIGS stand-alone)'
    ],
    consensus_files: [
      'C:\\newlod\\vdg_mgs2 (VISDIGS stand-alone)',
      'Hard copy: Stand-alone room S3.22',
      'C:\\scz 2000\\Audit\\Audit_22Apr_08.xls (Non-VISDIGS stand-alone)'
    ],
    ldps_files: [
      'C:\\newlod\\vdg_mgs2 (VISDIGS stand-alone)',
      'Hard copy: Stand-alone room S3.22'
    ]
  }
];

export const FIELD_CODES = {
  0: 'No',
  1: 'Yes (electronic)',
  2: 'Yes (hard copy only)',
  3: 'Yes (exists but hard to locate)',
  9: 'Unknown'
};

/**
 * Data source for the DatasetsTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DatasetsTableDataSource extends DataSource<Dataset> {
  data: Dataset[] = DATASET_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor(group: number) {
    super();
    console.log('group:' + group);
    if (group) {
      this.data = DATASET_DATA.filter(x => x.group === group);
    }
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Dataset[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Dataset[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Dataset[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'consensus':
          return compare(+a.consensus, +b.consensus, isAsc);
        case 'id':
          return compare(+a.id, +b.id, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
