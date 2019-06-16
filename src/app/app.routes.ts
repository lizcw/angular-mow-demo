import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppDashComponent} from './app-dash/app-dash.component';
import {StudiesTableComponent} from './studies/studies-table/studies-table.component';
import {ParticipantsTableComponent} from './participants/participants-table/participants-table.component';
import {SamplesTableComponent} from './samples/samples-table/samples-table.component';
import {DatasetsTableComponent} from './datasets/datasets-table/datasets-table.component';
import {SettingsComponent} from './admin/settings/settings.component';
import {ParticipantComponent} from './participants/participant/participant.component';
import {StudyComponent} from './studies/study/study.component';
import {StudyEditComponent} from './studies/study-edit/study-edit.component';
import {SearchComponent} from './search/search.component';
import {DatasetsComponent} from './datasets/datasets.component';
import {SamplesComponent} from './samples/samples.component';


const routes: Routes = [
  {path: '', component: AppDashComponent},
  {path: 'studies', component: StudiesTableComponent},
  {path: 'study/:id', component: StudyComponent},
  {path: 'study/edit/:id', component: StudyEditComponent},
  {path: 'participants', component: ParticipantsTableComponent},
  {path: 'participant/:id', component: ParticipantComponent},
  {path: 'samples', component: SamplesComponent},
  {path: 'datasets', component: DatasetsComponent},
  {path: 'admin', component: SettingsComponent},
  {path: 'search', component: SearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouters {}
