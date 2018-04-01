import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { RaceScheduleCurrentService } from '../../../services/race-schedule/race-schedule-current.service';
import { RaceScheduleCurrent } from '../../../models/race-schedule-current';
import { ParseDateStringBasic } from '../../../services/util/date-helper';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit {

  @Input() nextRaceDate: Date;

  timeRemaining: string[] = [];
  nextRace: RaceScheduleCurrent;

  constructor(private raceScheduleCurrentService: RaceScheduleCurrentService) { }

  ngOnInit() {
    this.setupTimer();
  }

  getTimeComponents(time) {
    let days: number;
    let hours: number;
    let minutes: number;
    let seconds: number;

    days = Math.floor(time / 86400);
    time -= days * 86400;
    hours = Math.floor(time / 3600) % 24;
    time -= hours * 3600;
    minutes = Math.floor(time / 60) % 60;
    time -= minutes * 60;
    seconds = time % 60;

    this.timeRemaining = [
      days.toString().padStart(2, '0'),
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ];
  }

  setupTimer() {
    let diff: number;
    Observable.interval(1000).map((x) => {
      diff = Math.floor((this.nextRaceDate.getTime() - new Date().getTime()) / 1000);
    }).subscribe((x) => {
      if (diff <= 0) {
        this.raceScheduleCurrentService.setNextRaceSubject();
      }
      this.getTimeComponents(diff);
    });
  }
}
