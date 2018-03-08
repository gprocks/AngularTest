import { Component, OnInit } from '@angular/core';
import { DriverStanding } from '../../models/driver-standing';
import { DriverStandingsService } from '../../services/driver-standings.service';


@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {

  public isLoading: boolean;
  public error: boolean;
  standings: DriverStanding[] = [];
  constructor(private driverStandingService: DriverStandingsService) { }

  ngOnInit() {
    this.isLoading = true;
    this.error = false;
    this.getStandings();
  }

  getStandings(): void {
    this.driverStandingService.getStandings()
      .subscribe(drivers => this.standings = drivers,
        error => {
          this.isLoading = false;
          this.error = true;
          console.error('Error getting meetings: ' + error);
        },
        () => {
          this.isLoading = false;
          this.error = false;
        }
      );
  }
}
