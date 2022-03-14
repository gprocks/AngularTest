import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { tap, catchError, map, filter, mergeMap } from "rxjs/operators";

import { RaceScheduleCurrent } from "../../models/race-schedule-current";

import { CurrentRaceSchedule } from "../../util/constants";
import { NationalityService } from "../nationality/nationality.service";
import { ErrorHandlerService } from "../util/error-handler.service";
import * as ical from "ical.js";

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
//test
  getCurrentRaceSchedule(): Observable<RaceScheduleCurrent[]> {
    return this.http
      .get<String>("https://files-f1.motorsportcalendars.com/f1-calendar_p1_p2_p3_qualifying_sprint_gp.ics", { responseType: "text" as "json" })
      .pipe(
        map<String, RaceScheduleCurrent[]>(calString => {
          return new ical.Component(ical.parse(calString)).getAllSubcomponents("vevent")
            .map(evt => {
              const schedule = new RaceScheduleCurrent();
              schedule.summary = evt.getFirstPropertyValue("summary");
              schedule.location = evt.getFirstPropertyValue("location");
              schedule.eventDate = evt.getFirstPropertyValue("dtstart").toJSDate();
              schedule.status = evt.getFirstPropertyValue("status");
              schedule.categories = evt.getFirstPropertyValue("categories");

              this.setCustomData(schedule);
              return schedule;
            })
            .filter(evt=> evt.status!=='CANCELLED');
        }),
        catchError(
          this.errorHandlerService.handleError("getCurrentRaceSchedule", [])
        )
      );
  }

  setCustomData(raceDetails: RaceScheduleCurrent): RaceScheduleCurrent {
    raceDetails.nationality = this.getNationality(raceDetails.summary);
    this.nationalityService
      .GetInfoByNationality(raceDetails.nationality)
      .subscribe(countryInfo => {
        raceDetails.country =
          countryInfo == null
            ? raceDetails.nationality
            : countryInfo.en_short_name;
      });
    return raceDetails;
  }

  getNationality(event: string) {
    const evt = event.replace(
      /(\(|\)| ?Grand Prix ?| ?Session? |1 |2 |3 | ?Practice | ?Qualifying ?| ?Free? |TBC)+/gi,
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
        const races: RaceScheduleCurrent[] = result.filter(function (i) {
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
