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
  public resultsLoaded: boolean;

  public selectedSeasonOption: string;
  public selectedRaceOption: string;

  races: RaceDetail[] = [];
  selectedRace: RaceDetail;
  raceResult: Result[];


  seasons: string[] = [];


  constructor(
    private route: ActivatedRoute,
    private resultService: ResultService,
    private raceService: RaceDetailService,
    private seasonService: SeasonsService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.error = false;
    this.resultsLoaded = false;

    this.getSeasons();

  }

  getSeasons(): void {
    this.seasonService.getSeasons()
      .subscribe(seasons => {
        this.seasons = seasons.reverse();
        this.selectSeason();
      },
        error => {
          console.error('Error getting Seaon Details: ' + error);
        });
  }

  selectSeason(selectedSeason?: string) {
    if (selectedSeason) {
      this.selectedSeasonOption = selectedSeason;
    } else {
      this.selectedSeasonOption = this.seasons[0];
    }
    this.getRaces(this.selectedSeasonOption);
  }

  getRaces(season: string) {
    // clear the selected race
    this.selectedRaceOption = undefined;
    this.raceService.getRaceList(this.selectedSeasonOption)
      .subscribe(raceList => {
        this.races = raceList;
        if (!this.selectedRace) {
          const urlRound = this.route.snapshot.paramMap.get('round');
          if (urlRound) {
            this.selectRace(urlRound);
          } else {
            this.selectRace(this.races[0].round);
          }
        }
      },
        error => {
          console.error('Error getting Race Details: ' + error);
        });
  }

  selectRace(round: string) {
    const selectedRace: RaceDetail = this.races.find(race => race.round === round);

    this.selectedRaceOption = selectedRace.round;
    this.selectedRace = selectedRace;
    this.getResults();
  }

  getResults(): void {
    this.isLoading = true;
    this.resultsLoaded = false;



    this.resultService.getResult(this.selectedRaceOption, this.selectedSeasonOption)
      .subscribe(result => { this.raceResult = result; },
        error => {
          this.isLoading = false;
          this.error = true;
          console.log('In Error', this.resultsLoaded);
          console.error('Error getting Results: ' + error);
        },
        () => {
          this.isLoading = false;
          this.error = false;
          this.resultsLoaded = true;
          console.log('In Complete', this.resultsLoaded);
        }
      );
  }

  yearOnChange(evt) {
    this.selectSeason(evt.value);
  }

  raceOnChange(evt) {
    this.selectRace(evt.value);
  }
}
