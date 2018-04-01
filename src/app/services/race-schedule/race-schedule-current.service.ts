import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { RaceScheduleCurrent } from '../../models/race-schedule-current';
import { AppSettings } from '../../util/app.settings';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { CurrentRaceSchedule } from '../../util/constants';
import { ParseDateStringBasic } from '../util/date-helper';
import { NationalityService } from '../nationality/nationality.service';

@Injectable()
export class RaceScheduleCurrentService {

  constructor(private http: HttpClient, private nationalityService: NationalityService) {
  }

  getCurrentRaceSchedule(): Observable<RaceScheduleCurrent[]> {
    return this.http.get<RaceScheduleCurrent[]>('./assets/schedule/2018.json')
      .map(raceSchedule => { raceSchedule.forEach(this.setCustomData.bind(this)); return raceSchedule; })
      .pipe(
        tap(raceSchedule => console.log('Fetching Race Schedule', raceSchedule)),
        catchError(this.handleError('getCurrentRaceSchedule', []))
      );

  }

  setCustomData(raceDetails: RaceScheduleCurrent): RaceScheduleCurrent {
    raceDetails.eventDate = ParseDateStringBasic(raceDetails.dtstamp);
    this.nationalityService.GetInfoByNationality(this.getNationality(raceDetails.summary))
      .subscribe(countryInfo => {
        raceDetails.country = countryInfo == null ? this.getNationality(raceDetails.summary) : countryInfo.en_short_name;
      });
    return raceDetails;
  }

  getNationality(event: string) {
    return event.replace(/(\(|\)| Grand Prix|Session |First |Second |Third |Practice |Qualifying )+/gi, '');
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

  /**
* Handle Http operation that failed.
* Let the app continue.
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
*/
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
