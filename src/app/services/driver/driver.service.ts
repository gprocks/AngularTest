import { Injectable } from '@angular/core';
import { Driver } from '../../models/driver';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../../util/app.settings';

@Injectable()
export class DriverService {
  constructor(
    private http: HttpClient
  ) { }

  getDrivers(year?: string): Observable<Driver[]> {
    if (year == null) {
      year = 'current';
    }
    const driversUrl = AppSettings.API_URL + year + '/' + 'drivers.json';
    return this.http.get(driversUrl)
      .map((response: any) => {
        return response.MRData.DriverTable.Drivers as Driver[];
      })
      .pipe(
        tap(drivers => console.log('Fetching Drivers', drivers)),
        catchError(this.handleError('getDrivers', []))
      );

  }

  getDriver(id: string): Observable<Driver> {
    const driversUrl = AppSettings.API_URL + 'drivers/' + id + '.json';
    return this.http.get(driversUrl)
      .map((response: any) => {
        return response.MRData.DriverTable.Drivers[0] as Driver;
      })
      .pipe(
        tap(driver => console.log('Fetching Driver', driver)),
        catchError(this.handleError('getDrivers', new Driver()))
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
