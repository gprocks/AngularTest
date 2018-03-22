import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { RaceScheduleCurrent } from '../../models/race-schedule-current';
import { AppSettings } from '../../util/app.settings';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { CurrentRaceSchedule } from '../../util/constants';
import { ParseDateStringBasic } from '../util/date-helper';

@Injectable()
export class RaceScheduleCurrentService {

  constructor(private http: HttpClient) {
  }

  getCurrentRaceSchedule(): Observable<RaceScheduleCurrent[]> {
    return this.http.get<RaceScheduleCurrent[]>('./assets/schedule/2018.json')
      .pipe(
        tap(raceSchedule => console.log('Fetching Race Schedule', raceSchedule)),
        catchError(this.handleError('getCurrentRaceSchedule', []))
      );

  }

  getNextRace(): Observable<RaceScheduleCurrent> {
    const currentDate: Date = new Date();
    return this.getCurrentRaceSchedule().map(result => {
      const races: RaceScheduleCurrent[] = result.filter(function (i) {
        return i.categories === CurrentRaceSchedule.Categories.GrandPrix;
      });
      for (let i = 0; i < races.length; i++) {
        const testDate = ParseDateStringBasic(races[i].dtstamp);
        if (ParseDateStringBasic(races[i].dtstamp) >= currentDate) {
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
