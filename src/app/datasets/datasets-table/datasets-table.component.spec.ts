import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';

import { DatasetsTableComponent } from './datasets-table.component';

describe('DatasetsTableComponent', () => {
  let component: DatasetsTableComponent;
  let fixture: ComponentFixture<DatasetsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasetsTableComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
