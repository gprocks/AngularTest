import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { tap, catchError, map } from "rxjs/operators";
import { RaceScheduleCurrent } from "../../models/race-schedule-current";

import { CurrentRaceSchedule } from "../../util/constants";
import { ParseDateStringBasic } from "../util/date-helper";
import { NationalityService } from "../nationality/nationality.service";
import { ErrorHandlerService } from "../util/error-handler.service";

@Injectable()
export class RaceScheduleCurrentService {
  public nextRaceSubject = new BehaviorSubject<RaceScheduleCurrent>(undefined);

  constructor(
    private http: HttpClient,
    private nationalityService: NationalityService,
    private errorHandlerService: ErrorHandlerService
  ) {
    this.setNextRaceSubject();
  }

  getCurrentRaceSchedule(): Observable<RaceScheduleCurrent[]> {
    return this.http
      .get<RaceScheduleCurrent[]>("./assets/schedule/2021.json")
      .pipe(
        map(raceSchedule => {
          raceSchedule.forEach(this.setCustomData.bind(this));
          return raceSchedule;
        }),
        tap(raceSchedule =>
          console.log("Fetching Race Schedule", raceSchedule)
        ),
        catchError(
          this.errorHandlerService.handleError("getCurrentRaceSchedule", [])
        )
      );
  }

  setCustomData(raceDetails: RaceScheduleCurrent): RaceScheduleCurrent {
    raceDetails.eventDate = ParseDateStringBasic(raceDetails.dtstart);
    this.nationalityService
      .GetInfoByNationality(this.getNationality(raceDetails.summary))
      .subscribe(countryInfo => {
        raceDetails.country =
          countryInfo == null
            ? this.getNationality(raceDetails.summary)
            : countryInfo.en_short_name;
      });
    return raceDetails;
  }

  getNationality(event: string) {
    let evt =  event.replace(
      /(\(|\)| Grand Prix|Session |1 |2 |3 |Practice | Qualifying|Free )+/gi,
      ""
    );
    return evt;
  }

  setNextRaceSubject() {
    this.getNextRace().subscribe(race => {
      this.nextRaceSubject.next(race);
    });
  }

  getNextRace(): Observable<RaceScheduleCurrent> {
    const currentDate: Date = new Date();
    return this.getCurrentRaceSchedule().pipe(
      map(result => {
        const races: RaceScheduleCurrent[] = result.filter(function(i) {
          return i.categories === CurrentRaceSchedule.Categories.GrandPrix;
        });
        for (let i = 0; i < races.length; i++) {
          if (races[i].eventDate >= currentDate) {
            return races[i];
          }
        }
      })
    );
  }
}
