import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Study, STUDY_DATA} from '../studies-table/studies-table-datasource';


@Component({
  selector: 'app-study-edit',
  templateUrl: './study-edit.component.html',
  styleUrls: ['./study-edit.component.css']
})
export class StudyEditComponent implements OnInit {
  private study: Study;
  private id: number;
  private studies: Study[];

  constructor(private route: ActivatedRoute) {
    this.studies = STUDY_DATA;
    console.log(this.studies);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      console.log('study id: ', this.id);
    });
    this.study = this.studies.find( x => x.id.toString() === this.id.toString());
    console.log(this.study);
  }
}
