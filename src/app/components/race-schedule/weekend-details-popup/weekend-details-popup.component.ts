import { Component, OnInit, Input, Inject } from "@angular/core";
import { RaceScheduleCurrent } from "../../../models/race-schedule-current";
import { MAT_DIALOG_DATA } from "@angular/material";
import { CountryService } from "../../../services/country/country.service";
import { Observable, of } from "rxjs";
import { tap, map, catchError } from "rxjs/operators";
import { ResultService } from "../../../services/result/result.service";
import { RaceResult } from "../../../models/race-result";

@Component({
  selector: "app-weekend-details-popup",
  templateUrl: "./weekend-details-popup.component.html",
  styleUrls: ["./weekend-details-popup.component.css"]
})
export class WeekendDetailsPopupComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public raceWeekend: any, // RaceScheduleCurrent[],
    private countryService: CountryService,
    private resultsService: ResultService
  ) {}

  headerImage: Observable<any>;

  raceResult: RaceResult[];
  hasResult = false;

  ngOnInit() {
    this.headerImage = this.countryService
      .getCountry(this.raceWeekend.weekend[0].country)
      .pipe(
        map(result => this.getBackgroundImage(result[0].flags.png)),
        catchError(()=>{
          return Observable.of({
            "background": "#3f51b5"
          });
        })
        );

    this.resultsService
      .getResult(
        this.raceWeekend.round,
        this.raceWeekend.weekend[0].eventDate.getFullYear()
      )
      .subscribe(result => {
        this.raceResult = result.race;
        this.hasResult = result.race.length > 0;
      });
  }

  getBackgroundImage(flagUrl: string) {
    return {
      "background-image":
        "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(" +
        flagUrl +
        ")"
    };
  }
}
