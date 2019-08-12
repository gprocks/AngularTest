import { Component, OnInit } from "@angular/core";
import { DriverStandingsService } from "../../services/driver-standings/driver-standings.service";
import { DriverResultDisplay } from "../../models/driver-result-display";

@Component({
  selector: "app-standings",
  templateUrl: "./standings.component.html",
  styleUrls: ["./standings.component.css"]
})
export class StandingsComponent implements OnInit {
  public isLoading: boolean;
  public error: boolean;
  results: DriverResultDisplay[] = [];
  constructor(private driverStandingService: DriverStandingsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.error = false;
    this.getStandings();
  }

  getStandings(): void {
    this.driverStandingService.getStandings().subscribe(
      driverStandings => {
        this.results = driverStandings.map(driverStanding => {
          return DriverStandingsService.getDriverResultDisplay(driverStanding);
        });
      },
      error => {
        this.isLoading = false;
        this.error = true;
        console.error("Error getting meetings: " + error);
      },
      () => {
        this.isLoading = false;
        this.error = false;
      }
    );
  }
}
