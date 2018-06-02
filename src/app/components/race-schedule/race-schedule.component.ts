import { Component, OnInit } from '@angular/core';
import { RaceScheduleCurrentService } from '../../services/race-schedule/race-schedule-current.service';
import { RaceScheduleCurrent } from '../../models/race-schedule-current';
import { race } from 'rxjs/operators';

@Component({
  selector: 'app-race-schedule',
  templateUrl: './race-schedule.component.html',
  styleUrls: ['./race-schedule.component.css']
})
export class RaceScheduleComponent implements OnInit {

  public isLoading: boolean;
  public error: boolean;
  raceSchedule: RaceScheduleCurrent[][] = [];

  constructor(private raceScheduleCurrentService: RaceScheduleCurrentService) { }

  ngOnInit() {
    this.isLoading = true;
    this.error = false;
    this.getRaceSchedule();
  }

  getRaceSchedule(): void {
    this.raceScheduleCurrentService.getCurrentRaceSchedule()
      .subscribe((schedule) => {
        let raceWeekend: RaceScheduleCurrent[] = [];
        for (let i = 0; i < schedule.length; i++) {
          raceWeekend.push(schedule[i]);
          if ((i + 1) % 5 === 0) {
            this.raceSchedule.push(raceWeekend);
            raceWeekend = [];
          }
        }
        console.log('building race schedule', this.raceSchedule);
      },
        error => {
          this.isLoading = false;
          this.error = true;
          console.error('Error getting schedules: ' + error);
        },
        () => {
          this.isLoading = false;
          this.error = false;
        }
      );
  }
}
