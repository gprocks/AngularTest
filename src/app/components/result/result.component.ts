import { Component, OnInit, Input } from '@angular/core';
import { ResultService } from '../../services/result/result.service';
import { Result } from '../../models/result';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  // @Input() year: number;
  // @Input() round: number;


  public isLoading: boolean;
  public error: boolean;
  raceResult: Result[] = [];

  constructor(
    private route: ActivatedRoute,
    private resultService: ResultService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.error = false;
    this.getResults();
  }

  getResults(): void {
    const round = this.route.snapshot.paramMap.get('round');
    this.resultService.getResult(round)
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
