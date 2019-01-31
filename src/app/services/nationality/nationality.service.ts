import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Nationality } from '../../models/nationality';

@Injectable()
export class NationalityService {

  constructor(private http: HttpClient) {
    this.http.get<Nationality[]>('./assets/countries.json')
      .subscribe(result => { this.nationalitySubject.next(result); });

  }
  nationalitySubject = new BehaviorSubject<Nationality[]>(new Array<Nationality>());

  public GetInfo(): Observable<Nationality[]> {
    return this.nationalitySubject;
  }

  public GetInfoByNationality(nationality: string): Observable<Nationality> {
    return this.GetInfo().pipe(
      map(nationalities => {
        return nationalities.filter(function (i) {
          return i.nationality === nationality;
        })[0];
      }));
  }
}
