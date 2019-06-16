import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';

import { LeukocyteComponent } from './leukocyte.component';

describe('LeukocyteComponent', () => {
  let component: LeukocyteComponent;
  let fixture: ComponentFixture<LeukocyteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeukocyteComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeukocyteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
