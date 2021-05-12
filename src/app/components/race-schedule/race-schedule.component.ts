import { Component, OnInit } from "@angular/core";
import { RaceScheduleCurrentService } from "../../services/race-schedule/race-schedule-current.service";
import { RaceScheduleCurrent } from "../../models/race-schedule-current";
import { MatDialog } from "@angular/material";
import { WeekendDetailsPopupComponent } from "./weekend-details-popup/weekend-details-popup.component";
import { staggerItems } from "../../animations/stagger-list-item";

@Component({
  selector: "app-race-schedule",
  templateUrl: "./race-schedule.component.html",
  styleUrls: ["./race-schedule.component.css"],
  animations: staggerItems
})
export class RaceScheduleComponent implements OnInit {
  public isLoading: boolean;
  public error: boolean;
  raceSchedule: RaceScheduleCurrent[][] = [];

  constructor(
    private raceScheduleCurrentService: RaceScheduleCurrentService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.error = false;
    this.getRaceSchedule();
  }

  getRaceSchedule(): void {
    this.raceScheduleCurrentService.getCurrentRaceSchedule().subscribe(
      schedule => {
        let raceWeekend: RaceScheduleCurrent[] = [];
        for (let i = 0; i < schedule.length; i++) {
          raceWeekend.push(schedule[i]);
          if ((i + 1) % 5 === 0) {
            this.raceSchedule.push(raceWeekend);
            raceWeekend = [];
          }
        }
      },
      error => {
        this.isLoading = false;
        this.error = true;
        console.error("Error getting schedules: " + error);
      },
      () => {
        this.isLoading = false;
        this.error = false;
      }
    );
  }

  openRaceWeekendPopup(raceWeekend: RaceScheduleCurrent[], round: number) {
    this.dialog.open(WeekendDetailsPopupComponent, {
      panelClass: "myapp-no-padding-dialog",
      data: {
        round: round,
        weekend: raceWeekend
      }
    });
  }
}
