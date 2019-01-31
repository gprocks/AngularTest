import { Component, OnInit } from '@angular/core';
import { RaceScheduleCurrent } from '../../models/race-schedule-current';
import { ParseDateStringBasic } from '../../services/util/date-helper';
import { RaceScheduleCurrentService } from '../../services/race-schedule/race-schedule-current.service';
import { CountdownComponent } from './countdown/countdown.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  nextRace: RaceScheduleCurrent;

  constructor(private raceScheduleCurrentService: RaceScheduleCurrentService) {}

  ngOnInit() {
    this.raceScheduleCurrentService.nextRaceSubject.subscribe(race => {
      this.nextRace = race;
    });
  }
}
