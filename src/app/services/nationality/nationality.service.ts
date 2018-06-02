import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
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
    return this.GetInfo()
      .map(nationalities => {
        return nationalities.filter(function (i) {
          return i.nationality === nationality;
        })[0];
      });
  }
}
