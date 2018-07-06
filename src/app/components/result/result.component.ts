import { Component, OnInit, Input } from '@angular/core';
import { ResultService } from '../../services/result/result.service';
import { Result } from '../../models/result';
import { ActivatedRoute } from '@angular/router';
import { RaceDetail } from '../../models/race-detail';
import { RaceDetailService } from '../../services/race-detail/race-detail.service';
import { SelectItem } from '../../models/select-item';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  public isLoading: boolean;
  public error: boolean;

  public selectedYearOption: string;
  public selectedRaceOption: string;

  races: RaceDetail[] = [];
  selectedRace: RaceDetail;
  raceResult: Result[];


  years: SelectItem[] = [];


  constructor(
    private route: ActivatedRoute,
    private resultService: ResultService,
    private raceService: RaceDetailService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.error = false;

    // populate the years dropdown
    this.getYears();


    const urlRound = this.route.snapshot.paramMap.get('round');

    console.log(urlRound);
    if (urlRound) {
      this.selectedYearOption = this.years[0].value;
      this.getRaces();
      this.selectedRaceOption = urlRound;
      console.log('Races', this.races);
      this.updateRaceResults();
    }

  }

  updateRaceResults(): void {
    this.selectedRace = this.races.find(race => race.round === this.selectedRaceOption);
    this.getResults();
  }


  // getRaceDetails(round: string): void {
  //   this.raceService.getRace(round)
  //     .subscribe(race => { this.selectedRace = race; },
  //       error => {
  //         console.error('Error getting Race Details: ' + error);
  //       });
  // }

  getResults(): void {
    this.resultService.getResult(this.selectedRaceOption, this.selectedYearOption)
      .subscribe(result => { this.raceResult = result; },
        error => {
          this.isLoading = false;
          this.error = true;
          console.error('Error getting Results: ' + error);
        },
        () => {
          this.isLoading = false;
          this.error = false;
        }
      );
  }

  yearOnChange(evt) {
    this.selectedRace = undefined;
    this.raceResult = undefined;
    this.selectedRaceOption = undefined;
    this.getRaces();
  }

  raceOnChange(evt) {
    // this.selectedRace = this.races.find(race => race.round === evt.value);
    this.updateRaceResults();
  }

  getYears(): void {
    let currentYear = new Date().getFullYear();
    const minYear = 1950;

    while (currentYear-- > minYear) {
      this.years.push(
        { value: currentYear.toString(), viewValue: currentYear.toString() },
      );
    }
  }

  getRaces() {
    this.raceService.getRaceList(this.selectedYearOption)
      .subscribe(raceList => {
        this.races = raceList;
        if (this.selectedRaceOption) {
          this.selectedRace = raceList.find(race => race.round === this.selectedRaceOption);
        }
      },
        error => {
          console.error('Error getting Race Details: ' + error);
        });
  }

}
