import { Injectable } from '@angular/core';
import { ErrorHandlerService } from '../util/error-handler.service';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../../util/app.settings';
import { ApiServices } from '../../util/constants';
import { Observable } from 'rxjs';
import { Result } from '../../models/result';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable()
export class ResultService {

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) { }

  getResult(round: string, year?: string): Observable<Result[]> {
    if (year == null) {
      year = 'current';
    }
    const resultUrl = AppSettings.API_URL + year + '/' + round + '/' + ApiServices.Results + '.json';
    return this.http.get(resultUrl)
      .pipe(
        map((response: any) => {
          return response.MRData.RaceTable.Races[0].Results as Result[];
        }),
        tap(result => console.log('Fetching Results', result)),
      // catchError(this.errorHandlerService.handleError('getResult', []))
    );
  }

}
