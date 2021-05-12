import { Component, OnInit } from "@angular/core";
import { RaceScheduleCurrent } from "../../models/race-schedule-current";
import { RaceScheduleCurrentService } from "../../services/race-schedule/race-schedule-current.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
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
