import { Injectable } from '@angular/core';
import { Driver } from '../../models/driver';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../../util/app.settings';
import { ErrorHandlerService } from '../util/error-handler.service';

@Injectable()
export class DriverService {
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
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
        catchError(this.errorHandlerService.handleError('getDrivers', []))
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
        catchError(this.errorHandlerService.handleError('getDrivers', new Driver()))
      );
  }
}
