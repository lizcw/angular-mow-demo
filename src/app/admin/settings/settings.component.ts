import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Users', cols: 1, rows: 1 },
          { title: 'Datasets: Field Codes', cols: 1, rows: 1 },
          { title: 'Demographic: Marital Status', cols: 1, rows: 1 },
          { title: 'Demographic: Employment Status', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Users', cols: 2, rows: 1 },
        { title: 'Datasets: Field Codes', cols: 1, rows: 1 },
        { title: 'Demographic: Marital Status', cols: 1, rows: 2 },
        { title: 'Demographic: Employment Status', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
