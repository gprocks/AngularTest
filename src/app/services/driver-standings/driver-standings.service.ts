import { Injectable } from '@angular/core';
import { DriverStanding } from '../../models/driver-standing';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../../util/app.settings';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ApiServices } from '../../util/constants';
import { ErrorHandlerService } from '../util/error-handler.service';

@Injectable()
export class DriverStandingsService {

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
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
        catchError(this.errorHandlerService.handleError('getDrivers', []))
      );
  }
}
