import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriverComponent } from './components/drivers/driver/driver.component';
import { DriversComponent } from './components/drivers/drivers.component';
import { StandingsComponent } from './components/standings/standings.component';
import { RaceScheduleComponent } from './components/race-schedule/race-schedule.component';
import { ResultComponent } from './components/result/result.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: StandingsComponent },
  { path: 'drivers', component: DriversComponent },
  { path: 'drivers/:id', component: DriverComponent },
  { path: 'raceschedule', component: RaceScheduleComponent },
  { path: 'raceresult/:round', component: ResultComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }


