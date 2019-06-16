import {Component, OnInit} from '@angular/core';
import {Participant, PARTICIPANT_DATA} from '../participants-table/participants-table-datasource';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent implements OnInit {
  participant: Participant;
  private participants: Participant[];
  private id: number;
  private pid: any;
  panelOpenState: boolean;

  constructor(private route: ActivatedRoute) {
    this.participants = PARTICIPANT_DATA;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      console.log('participant id: ', this.id);
      this.participant = this.participants.find(x => x.id.toString() === this.id.toString());
    });
    // full id as search
    this.route.queryParams.subscribe(qparams => {
      if (qparams.pid) {
        this.pid = qparams.pid;
        console.log('participant search by pid: ', this.pid);
        this.participant = this.participants.find(x => x.fullid.toString() === this.pid);
      }
    });

  }
}
