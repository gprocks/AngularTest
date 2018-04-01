import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import { HttpClient } from '@angular/common/http';
import { Nationality } from '../../models/nationality';

@Injectable()
export class NationalityService {

  constructor(private http: HttpClient) {
    this.http.get<Nationality[]>('./assets/countries.json')
      .subscribe(result => { this.subject.next(result); });

  }
  subject = new BehaviorSubject<Nationality[]>(new Array<Nationality>());

  public GetInfo(): Observable<Nationality[]> {
    return this.subject;
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
