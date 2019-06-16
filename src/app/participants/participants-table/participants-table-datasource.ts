import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import {Study} from '../../studies/studies-table/studies-table-datasource';

class Demographic {
  gender: string;
  ageAssessment: number;
  maritalStatus: string;
  livingArr: string;
  yearsSchool: string;
  currentEmpStatus: string;
  employmentHistory: string;
}

class Diagnosis {
  summaryDiagnosis: string;
  ageOnset: number;
}

class MedicalHistory {
  complete: boolean;
  thyroid: boolean;
  epilepsy: boolean;
  headinjury: boolean;
}

class Symptoms {
  finalDelusions: boolean;
  severeCurrentDelusions: boolean;
}

// TODO: Replace this with your own data model type
export interface Participant {
  id: number;
  fullid: string;
  family: string;
  arrival_date: Date;
  country: string;
  study: Study[];
  demographic?: Demographic;
  diagnosis?: Diagnosis;
  medical?: MedicalHistory;
  symptoms?: Symptoms;
}

// TODO: replace this with real data from your application
export const PARTICIPANT_DATA: Participant[] = [
  {id: 1, fullid: '46-0024-001', family: '0024', arrival_date: new Date(), country: 'India',
    study: [
      {id: 1, code: 'ASRB', title: 'ASRB', description: '', status: 'completed'},
      {id: 2, code: 'B', title: 'BPS', description: '', status: 'completed'}
      ],
    demographic: { gender: 'male', ageAssessment: 34, maritalStatus: 'Married', livingArr: '',
    yearsSchool: 'High school', currentEmpStatus: 'Employed', employmentHistory: ''},
    diagnosis: {
      summaryDiagnosis: 'Schizoaffective', ageOnset: 24
    },
    medical: {
      complete: true, headinjury: true, epilepsy: false, thyroid: false
    }
  },
  {id: 2, fullid: '46-0024-002', family: '0024', arrival_date: new Date(), country: 'India',
    study: [
      {id: 1, code: 'ASRB', title: 'ASRB', description: '', status: 'completed'},
      {id: 2, code: 'B', title: 'BPS', description: '', status: 'completed'}
    ],
    demographic: { gender: 'male', ageAssessment: 34, maritalStatus: 'Married', livingArr: '',
      yearsSchool: 'High school', currentEmpStatus: 'Employed', employmentHistory: ''}
  },
  {id: 3, fullid: 'I10124-001', family: '10124', arrival_date: new Date(), country: 'India',
    study: [{id: 4, code: 'CC', title: 'Cadence CoMet', description: '', status: 'ongoing'}],
    demographic: { gender: 'male', ageAssessment: 34, maritalStatus: 'Married', livingArr: '',
      yearsSchool: 'High school', currentEmpStatus: 'Employed', employmentHistory: ''},
    diagnosis: {
      summaryDiagnosis: 'Schizoaffective', ageOnset: 24
    },
    medical: {
      complete: true, headinjury: true, epilepsy: false, thyroid: false
    }
  },
  {id: 4, fullid: 'Sw092-003', family: '092', arrival_date: new Date(), country: 'Sarawak',
    study: [{id: 4, code: 'CC', title: 'Cadence CoMet', description: '', status: 'ongoing'}],
    demographic: { gender: 'male', ageAssessment: 34, maritalStatus: 'Married', livingArr: '',
      yearsSchool: 'High school', currentEmpStatus: 'Employed', employmentHistory: ''},
    diagnosis: {
      summaryDiagnosis: 'Schizoaffective', ageOnset: 24
    },
    medical: {
      complete: true, headinjury: true, epilepsy: false, thyroid: false
    }
  }
];

/**
 * Data source for the ParticipantsTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ParticipantsTableDataSource extends DataSource<Participant> {
  data: Participant[] = PARTICIPANT_DATA;
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
  connect(): Observable<Participant[]> {
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
  private getPagedData(data: Participant[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Participant[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'fullid': return compare(a.fullid, b.fullid, isAsc);
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
