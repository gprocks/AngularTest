import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DriverComponent } from "./components/drivers/driver/driver.component";
import { DriversComponent } from "./components/drivers/drivers.component";
import { StandingsComponent } from "./components/standings/standings.component";
import { RaceScheduleComponent } from "./components/race-schedule/race-schedule.component";
import { ResultWeekendComponent } from "./components/result-weekend/result-weekend.component";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: StandingsComponent },
  { path: "drivers", component: DriversComponent },
  { path: "drivers/:id", component: DriverComponent },
  { path: "raceschedule", component: RaceScheduleComponent },
  { path: "raceresult", component: ResultWeekendComponent },
  { path: "raceresult/:round", component: ResultWeekendComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
