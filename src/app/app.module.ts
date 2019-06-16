import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppNavComponent} from './app-nav/app-nav.component';
import {AppDashComponent} from './app-dash/app-dash.component';
import {AppRouters} from './app.routes';
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule, MatExpansionModule, MatFormFieldModule,
  MatGridListModule,
  MatIconModule, MatInputModule,
  MatListModule,
  MatMenuModule, MatOptionModule,
  MatPaginatorModule, MatSelectModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {StudiesTableComponent} from './studies/studies-table/studies-table.component';
import {ParticipantsTableComponent} from './participants/participants-table/participants-table.component';
import {SamplesTableComponent} from './samples/samples-table/samples-table.component';
import {DatasetsTableComponent} from './datasets/datasets-table/datasets-table.component';
import {SettingsComponent} from './admin/settings/settings.component';
import {ParticipantComponent} from './participants/participant/participant.component';
import {LayoutModule} from '@angular/cdk/layout';
import {StudyComponent} from './studies/study/study.component';
import {BarChartComponent} from './bar-chart/bar-chart.component';
import {ChartsModule} from 'ng2-charts';
import {FormsModule} from '@angular/forms';
import { StudyEditComponent } from './studies/study-edit/study-edit.component';
import { SearchComponent } from './search/search.component';
import { DatasetsComponent } from './datasets/datasets.component';
import { SamplesComponent } from './samples/samples.component';
import { LeukocyteComponent } from './samples/leukocyte/leukocyte.component';
import { LclComponent } from './samples/lcl/lcl.component';
import { DnaComponent } from './samples/dna/dna.component';


@NgModule({
  declarations: [
    AppComponent,
    AppDashComponent,
    AppNavComponent,
    StudiesTableComponent,
    ParticipantsTableComponent,
    SamplesTableComponent,
    DatasetsTableComponent,
    SettingsComponent,
    ParticipantComponent,
    StudyComponent,
    BarChartComponent,
    StudyEditComponent,
    SearchComponent,
    DatasetsComponent,
    SamplesComponent,
    LeukocyteComponent,
    LclComponent,
    DnaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ChartsModule,
    // MaterialModule,
    AppRouters,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    LayoutModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatOptionModule,
    MatSelectModule,
    MatTabsModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
