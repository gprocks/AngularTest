import { Component, OnInit, Input, Inject } from '@angular/core';
import { RaceScheduleCurrent } from '../../../models/race-schedule-current';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-weekend-details-popup',
  templateUrl: './weekend-details-popup.component.html',
  styleUrls: ['./weekend-details-popup.component.css']
})
export class WeekendDetailsPopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public raceWeekend: RaceScheduleCurrent[]) { }

  ngOnInit() {

  }

}
