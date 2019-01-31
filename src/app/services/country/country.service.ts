import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../util/error-handler.service';
import { Observable } from 'rxjs';
import { Country } from '../../models/country';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class CountryService {

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) { }

  getCountry(name: string): Observable<Country[]> {
    // Add in some secial cases to deal with mismatches between the api
    switch (name) {
      case 'United States':
        name = 'United States of America?fullText=true';
        break;
      case 'Abu Dhabi':
        name = 'United Arab Emirates';
        break;
    }

    const driversUrl = 'https://restcountries.eu/rest/v2/name/' + name;
    return this.http.get<Country[]>(driversUrl)
      .pipe(
        tap(country => console.log('Fetching Country ' + name, country)),
      // catchError(this.errorHandlerService.handleError('getCountry: ' + name, new Country[]))
    );
  }
}
