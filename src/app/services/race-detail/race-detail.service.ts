import { Injectable } from '@angular/core';
import { ErrorHandlerService } from '../util/error-handler.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RaceDetail } from '../../models/race-detail';
import { AppSettings } from '../../util/app.settings';
import { tap, catchError } from 'rxjs/operators';
import { ApiServices } from '../../util/constants';

@Injectable()
export class RaceDetailService {

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) { }

  getRace(round: string, year?: string): Observable<RaceDetail> {
    if (year == null) {
      year = 'current';
    }
    const raceUrl = AppSettings.API_URL + year + '/' + round + '.json';
    return this.http.get(raceUrl)
      .map((response: any) => {
        return response.MRData.RaceTable.Races[0] as RaceDetail;
      })
      .pipe(
        tap(drivers => console.log('Fetching Race Details', drivers)),
        catchError(this.errorHandlerService.handleError('getDrivers', new RaceDetail()))
      );
  }
}
