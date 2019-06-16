import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import {Participant} from '../../participants/participants-table/participants-table-datasource';

export enum SampleType {
  Serum = 'Serum',
  Plasma = 'Plasma',
  PAXgene = 'PAXgene'
}

export class Location {
  id: number;
  site: number;
  ref: string;
}
export class Leukocyte {
  id: number;
  used: boolean;
  location: Location[];
}

export class LCL {
  id: number;
  date: Date;
  location: Location[];
  used: boolean;
}

export class QC {
  id: number;
  date: Date;
  passed: boolean;
  notes: string;
}

export class DNA {
  id: number;
  extractionDate: Date;
  used: boolean;
  location: Location[];
  qc: QC[];
  notes: string;
}

export class TransformSample {
  id: number;
  date: Date;
  failed: boolean;
  notes: string;
}

export class HarvestSample {
  id: number;
  regrowDate: Date;
  harvestDate: Date;
  notes: string;
}

export class Shipment {
  id: number;
  date: Date;
  reference: number;
  notes: string;
  rutgersNo: string;
  rutgers: boolean;
}

export interface Sample {
  participant: Participant;
  id: number;
  sample_type: SampleType;
  rebleed: boolean;
  storage_date: Date;
  storage_location: string;
  leukocyte: Leukocyte[];
  lcl: LCL[];
  dna: DNA[];
  transform: TransformSample[];
  harvest: HarvestSample[];
  shipment: Shipment[];
}

export const SAMPLE_DATA: Sample[] = [
  {
    id: 1, participant: {
      id: 1, fullid: '46-0024-001', family: '0024',
      arrival_date: new Date(), country: 'India',
      study: []
    }, sample_type: SampleType.Serum,
    rebleed: false,
    storage_date: new Date(),
    storage_location: 'O',
    leukocyte: [{ id: 1, location: [
        {id: 2, site: 1, ref: 'O'},
        {id: 3, site: 2, ref: 'H/E14/C7'},
        {id: 4, site: 3, ref: 'O'}], used: true}],
    lcl: [{ id: 1, date: new Date(),
      location: [
      {id: 5, site: 1, ref: 'O'},
        {id: 6, site: 2, ref: 'O'},
        {id: 7, site: 3, ref: 'O'},
        {id: 8, site: 4, ref: 'O'},
        {id: 9, site: 5, ref: 'O'}
        ], used: true}],
    dna: [{ id: 1, extractionDate: new Date(),
      location: [{id: 10, site: 5, ref: 'O'}],
      notes: 'DNA extracted', used: false,
      qc: [{id: 1, date: new Date(), passed: true, notes: ''}]
    }],
    transform: [{id: 1, date: new Date(), failed: false, notes: ''}],
    harvest: [{id: 1, harvestDate: new Date(), regrowDate: new Date(), notes: ''}],
    shipment: [{id: 1, date: new Date(), notes: '', reference: 123,
      rutgers: true, rutgersNo: 'A123'}]
  },
  {
    id: 2, participant: {
      id: 1, fullid: '46-0024-001', family: '0024',
      arrival_date: new Date(), country: 'India',
      study: []
    }, sample_type: SampleType.Plasma,
    rebleed: false,
    storage_date: new Date(),
    storage_location: 'O',
    leukocyte: [{ id: 3, location: [
        {id: 4, site: 1, ref: 'O'},
        {id: 5, site: 2, ref: 'H/E14/C7'},
        {id: 6, site: 3, ref: 'O'}], used: true}],
    lcl: [{ id: 2, date: new Date(),
      location: [
        {id: 7, site: 1, ref: 'O'},
        {id: 8, site: 2, ref: 'O'},
        {id: 9, site: 3, ref: 'O'},
        {id: 10, site: 4, ref: 'O'},
        {id: 11, site: 5, ref: 'O'}
      ], used: true}],
    dna: [{ id: 2, extractionDate: new Date(),
      location: [{id: 12, site: 5, ref: 'O'}],
      notes: 'DNA extracted', used: false,
      qc: [{id: 2, date: new Date(), passed: true, notes: ''}]
    }],
    transform: [{id: 2, date: new Date(), failed: false, notes: ''}],
    harvest: [{id: 2, harvestDate: new Date(), regrowDate: new Date(), notes: ''}],
    shipment: [{id: 2, date: new Date(), notes: '', reference: 123,
      rutgers: true, rutgersNo: 'B123'}]
  }
];

/**
 * Data source for the SamplesTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class SamplesTableDataSource extends DataSource<Sample> {
  data: Sample[] = SAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Sample[]> {
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
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Sample[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Sample[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

export default {
  LCL, Leukocyte, Location, DNA, HarvestSample, TransformSample
};
