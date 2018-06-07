import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { RaceScheduleCurrent } from '../../models/race-schedule-current';
import 'rxjs/add/operator/mergeMap';
import { CurrentRaceSchedule } from '../../util/constants';
import { ParseDateStringBasic } from '../util/date-helper';
import { NationalityService } from '../nationality/nationality.service';
import { ErrorHandlerService } from '../util/error-handler.service';

@Injectable()
export class RaceScheduleCurrentService {

  public nextRaceSubject = new BehaviorSubject<RaceScheduleCurrent>(new RaceScheduleCurrent());

  constructor(
    private http: HttpClient,
    private nationalityService: NationalityService,
    private errorHandlerService: ErrorHandlerService
  ) {
    this.setNextRaceSubject();
  }

  getCurrentRaceSchedule(): Observable<RaceScheduleCurrent[]> {
    return this.http.get<RaceScheduleCurrent[]>('./assets/schedule/2018.json')
      .map(raceSchedule => { raceSchedule.forEach(this.setCustomData.bind(this)); return raceSchedule; })
      .pipe(
        tap(raceSchedule => console.log('Fetching Race Schedule', raceSchedule)),
        catchError(this.errorHandlerService.handleError('getCurrentRaceSchedule', []))
      );
  }

  setCustomData(raceDetails: RaceScheduleCurrent): RaceScheduleCurrent {
    raceDetails.eventDate = ParseDateStringBasic(raceDetails.dtstamp);
    // this.nationalityService.GetInfoByNationality(this.getNationality(raceDetails.summary))
    //   .flatMap((countryInfo: any) => {
    //     raceDetails.country = countryInfo == null ? raceDetails.summary : countryInfo.en_short_name;
    //     return this.countryService.getCountry(raceDetails.country);
    //   }).subscribe(result => console.log('TEST', result));

    this.nationalityService.GetInfoByNationality(this.getNationality(raceDetails.summary))
      .subscribe(countryInfo => {
        raceDetails.country = countryInfo == null ? this.getNationality(raceDetails.summary) : countryInfo.en_short_name;
      });
    return raceDetails;
  }

  getNationality(event: string) {
    return event.replace(/(\(|\)| Grand Prix|Session |First |Second |Third |Practice |Qualifying )+/gi, '');
  }

  setNextRaceSubject() {
    this.getNextRace().subscribe(race => { this.nextRaceSubject.next(race); });
  }

  getNextRace(): Observable<RaceScheduleCurrent> {
    const currentDate: Date = new Date();
    return this.getCurrentRaceSchedule().map(result => {
      const races: RaceScheduleCurrent[] = result.filter(function (i) {
        return i.categories === CurrentRaceSchedule.Categories.GrandPrix;
      });
      for (let i = 0; i < races.length; i++) {
        if (races[i].eventDate >= currentDate) {
          return races[i];
        }
      }
    });
  }

}
