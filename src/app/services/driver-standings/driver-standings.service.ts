import { Injectable } from '@angular/core';
import { DriverStanding } from '../../models/driver-standing';
import { Observable, of } from 'rxjs';
import { AppSettings } from '../../util/app.settings';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';
import { ApiServices } from '../../util/constants';
import { ErrorHandlerService } from '../util/error-handler.service';
import { DriverResultDisplay } from '../../models/driver-result-display';

@Injectable()
export class DriverStandingsService {
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}
  static getDriverResultDisplay(
    driverStanding: DriverStanding
  ): DriverResultDisplay {
    const returnItem: DriverResultDisplay = {
      Driver: driverStanding.Driver,
      Constructor:
        driverStanding.Constructors[driverStanding.Constructors.length - 1],
      position: driverStanding.position,
      points: driverStanding.points
    };
    return returnItem;
  }

  getStandings(year?: string): Observable<DriverStanding[]> {
    if (year == null) {
      year = 'current';
    }
    const driversUrl =
      AppSettings.API_URL + year + '/' + ApiServices.DriverStandings + '.json';
    return this.http.get(driversUrl).pipe(
      map((response: any) => {
        return response.MRData.StandingsTable.StandingsLists[0]
          .DriverStandings as DriverStanding[];
      }),
      tap(standings => console.log('Fetching Standings', standings)),
      catchError(this.errorHandlerService.handleError('getStandings', []))
    );
  }
}
