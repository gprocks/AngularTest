import { Injectable } from "@angular/core";
import { ErrorHandlerService } from "../util/error-handler.service";
import { HttpClient } from "@angular/common/http";
import { AppSettings } from "../../util/app.settings";
import { ApiServices } from "../../util/constants";
import { Observable } from "rxjs";
import { forkJoin } from "rxjs";
import { RaceResult } from "../../models/race-result";
import { tap, catchError, map } from "rxjs/operators";
import { DriverResultDisplay } from "../../models/driver-result-display";
// import { QualifyingResult } from "../../models/qualifying-result";
import { WeekendResults } from "../../models/weekend-results";

@Injectable()
export class ResultService {
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}
  static getDriverResultDisplay(result: RaceResult): DriverResultDisplay {
    const returnItem: DriverResultDisplay = {
      Driver: result.Driver,
      Constructor: result.Constructor,
      position: result.position,
      points: result.points
    };
    return returnItem;
  }

  getResult(round: string, year?: string): Observable<WeekendResults> {
    if (year == null) {
      year = "current";
    }
    const raceResultApi =
      AppSettings.API_URL +
      year +
      "/" +
      round +
      "/" +
      ApiServices.Results +
      ".json";

    const qualiResultApi =
      AppSettings.API_URL +
      year +
      "/" +
      round +
      "/" +
      ApiServices.Qualifying +
      ".json";

    const raceResult = forkJoin({
      race: this.http.get<any>(raceResultApi),
      quali: this.http.get<any>(qualiResultApi)
    }).pipe(
      map(responses => {
        // tslint:disable-next-line: prefer-const
        let weekendResult: WeekendResults = new WeekendResults();
        if (responses.quali.MRData.RaceTable.Races[0]) {
          weekendResult.qualifying =
            responses.quali.MRData.RaceTable.Races[0].QualifyingResults;
        }
        if (responses.race.MRData.RaceTable.Races[0]) {
          weekendResult.race = responses.race.MRData.RaceTable.Races[0].Results;
        }

        return weekendResult;
      })
    );

    return raceResult;
  }
}
