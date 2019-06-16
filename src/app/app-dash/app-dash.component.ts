import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dash',
  templateUrl: './app-dash.component.html',
  styleUrls: ['./app-dash.component.css']
})
export class AppDashComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Total Statistics', details: ['Studies: 18', 'Participants: 12340', 'Samples: 10000', 'Datasets: 12000'],
            cols: 1, rows: 1 },
          { title: 'Study: ASRB', details: ['CODE: ASRB', 'STATUS: Completed', '719 participants', '1024 Post LCL-Phase',
              '206 Pre-Transform Phase'], cols: 1, rows: 1 },
          { title: 'Study: Control', details: ['CODE: C', 'STATUS: Completed', '1539 participants', '...'], cols: 1, rows: 1 },
          { title: 'Study: ICC', details: ['CODE: ICC', 'STATUS: Completed', '5257 participants', '...'], cols: 1, rows: 1 },
          { title: 'Study: India', details: ['CODE: I', 'STATUS: Completed', '5257 participants', '...'], cols: 1, rows: 1 },
          { title: 'Study: Sarawak', details: ['CODE: SW', 'STATUS: Completed', '758 participants', '...' ], cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Total Statistics', details: ['Studies: 18', 'Participants: 12340', 'Samples: 10000', 'Datasets: 12000'],
          cols: 2, rows: 1 },
        { title: 'Study: ASRB', details: ['CODE: ASRB', 'STATUS: Completed', '719 participants', '1024 Post LCL-Phase',
            '206 Pre-Transform Phase', '...'], cols: 1, rows: 2 },
        { title: 'Study: Control', details: ['CODE: C', 'STATUS: Completed', '1539 participants', '...'], cols: 1, rows: 1 },
        { title: 'Study: ICC', details: ['CODE: ICC', 'STATUS: Completed', '5257 participants', '...'], cols: 1, rows: 1 },
        { title: 'Study: India', details: ['CODE: I', 'STATUS: Completed', '5257 participants', '...'], cols: 1, rows: 1 },
        { title: 'Study: Sarawak', details: ['CODE: SW', 'STATUS: Completed', '758 participants', '...' ], cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
