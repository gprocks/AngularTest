import { Component, OnInit, Input } from '@angular/core';
import { ResultService } from '../../services/result/result.service';
import { Result } from '../../models/result';
import { ActivatedRoute } from '@angular/router';
import { RaceDetail } from '../../models/race-detail';
import { RaceDetailService } from '../../services/race-detail/race-detail.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  public isLoading: boolean;
  public error: boolean;

  round: string;

  raceDetails: RaceDetail = new RaceDetail();
  raceResult: Result[] = [];


  constructor(
    private route: ActivatedRoute,
    private resultService: ResultService,
    private raceService: RaceDetailService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.error = false;
    this.round = this.route.snapshot.paramMap.get('round');
    this.getResults();
    this.getRaceDetails();
  }

  getRaceDetails(): void {
    this.raceService.getRace(this.round)
      .subscribe(race => { this.raceDetails = race; },
        error => {
          console.error('Error getting Race Details: ' + error);
        });
  }

  getResults(): void {
    this.resultService.getResult(this.round)
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

}
