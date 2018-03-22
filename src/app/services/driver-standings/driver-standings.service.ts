import { Injectable } from '@angular/core';
import { DriverStanding } from '../../models/driver-standing';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../../util/app.settings';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ApiServices } from '../../util/constants';

@Injectable()
export class DriverStandingsService {

  constructor(
    private http: HttpClient
  ) { }

  getStandings(year?: string): Observable<DriverStanding[]> {
    if (year == null) {
      year = 'current';
    }
    const driversUrl = AppSettings.API_URL + year + '/' + ApiServices.DriverStandings + '.json';
    return this.http.get(driversUrl)
      .map((response: any) => {
        return response.MRData.StandingsTable.StandingsLists[0].DriverStandings as DriverStanding[];
      }).pipe(
        tap(driver => console.log('Fetching Driver', driver)),
        catchError(this.handleError('getDrivers', []))
      );
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
