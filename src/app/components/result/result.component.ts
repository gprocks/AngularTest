import { Component, OnInit, Input } from '@angular/core';
import { ResultService } from '../../services/result/result.service';
import { Result } from '../../models/result';
import { ActivatedRoute } from '@angular/router';
import { RaceDetail } from '../../models/race-detail';
import { RaceDetailService } from '../../services/race-detail/race-detail.service';
import { SeasonsService } from '../../services/seasons/seasons.service';


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


  years: string[] = [];


  constructor(
    private route: ActivatedRoute,
    private resultService: ResultService,
    private raceService: RaceDetailService,
    private seasonService: SeasonsService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.error = false;

    // populate the years dropdown
    this.getYears();
    const urlRound = this.route.snapshot.paramMap.get('round');

    if (urlRound) {
      this.selectedYearOption = this.years[0];
      this.getRaces();
      this.selectedRaceOption = urlRound;

      this.updateRaceResults();
    }
  }

  updateRaceResults(): void {
    this.selectedRace = this.races.find(race => race.round === this.selectedRaceOption);
    this.getResults();
  }

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
    this.selectedRaceOption = undefined;
    this.getRaces();
  }

  raceOnChange(evt) {
    this.updateRaceResults();
  }

  getYears(): void {
    this.seasonService.getSeasons()
      .subscribe(seasons => {
        this.years = seasons.reverse();
        //always default the selected year tot he 1st in the list
        this.selectedYearOption = this.years[0];
      },
        error => {
          console.error('Error getting Seaon Details: ' + error);
        });
  }

  getRaces() {
    this.raceService.getRaceList(this.selectedYearOption)
      .subscribe(raceList => {
        this.races = raceList;

        // //if no race was selected default it to the 1st of the season
        // if (!this.selectedRace) {
        //   this.selectedRaceOption = raceList[0].round;
        // }
        if (this.selectedRaceOption) {
          this.selectedRace = raceList.find(race => race.round === this.selectedRaceOption);
        }
      },
        error => {
          console.error('Error getting Race Details: ' + error);
        });
  }

}
