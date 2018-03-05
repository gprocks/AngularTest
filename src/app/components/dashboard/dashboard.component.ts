import { Component, OnInit } from '@angular/core';
import { DriverStanding } from '../../models/driver-standing';
import { DriverStandingsService } from '../../services/driver-standings.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  standings: DriverStanding[] = [];
  constructor(private driverStandingService: DriverStandingsService) { }

  ngOnInit() {
    this.getStandings();
  }

  getStandings(): void {
    this.driverStandingService.getStandings()
      .subscribe(drivers => this.standings = drivers);
  }
}
