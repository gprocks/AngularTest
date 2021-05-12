import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ErrorHandlerService } from "../util/error-handler.service";
import { Observable } from "rxjs";
import { AppSettings } from "../../util/app.settings";
import { ApiServices } from "../../util/constants";
import { tap, catchError, map } from "rxjs/operators";

@Injectable()
export class SeasonsService {
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  getSeasons(): Observable<string[]> {
    // Hack to ensure only seasons with results are included
    const driversUrl =
      AppSettings.API_URL +
      "constructors/ferrari/" +
      ApiServices.Seasons +
      ".json?limit=100";
    return this.http.get(driversUrl).pipe(
      map((response: any) => {
        return response.MRData.SeasonTable.Seasons.map(
          seasonItem => seasonItem.season
        );
      }),
      catchError(this.errorHandlerService.handleError("getSeasons", []))
    );
  }
}
