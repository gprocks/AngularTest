
import { Component, OnInit, Input, Inject } from '@angular/core';
import { RaceScheduleCurrent } from '../../../models/race-schedule-current';
import { MAT_DIALOG_DATA } from '@angular/material';
import { CountryService } from '../../../services/country/country.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-weekend-details-popup',
  templateUrl: './weekend-details-popup.component.html',
  styleUrls: ['./weekend-details-popup.component.css']
})
export class WeekendDetailsPopupComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public raceWeekend: RaceScheduleCurrent[],
    private countryService: CountryService
  ) { }


  flagUrl: Observable<String>;
  ngOnInit() {
    this.flagUrl = this.countryService.getCountry(this.raceWeekend[0].country).map(result => result[0].flag);
  }

}
