import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DriversComponent } from './components/drivers/drivers.component';
import { DriverComponent } from './components/drivers/driver/driver.component';
import { DriverService } from './services/driver/driver.service';
import { AppRoutingModule } from './app-routing.module';
import { StandingsComponent } from './components/standings/standings.component';
import { GetAgePipe } from './pipes/get-age.pipe';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DriverStandingsService } from './services/driver-standings/driver-standings.service';
import { MaterialModule } from './material-module/material.module';
import { TeamTranslatorPipe } from './pipes/team-translator.pipe';
import { CountdownComponent } from './components/header/countdown/countdown.component';
import { HeaderComponent } from './components/header/header.component';
import { RaceScheduleCurrentService } from './services/race-schedule/race-schedule-current.service';
import { RaceScheduleComponent } from './components/race-schedule/race-schedule.component';
import { NationalityService } from './services/nationality/nationality.service';
import { NationalityPipe } from './pipes/nationality.pipe';
import { ErrorHandlerService } from './services/util/error-handler.service';
import { WeekendDetailsPopupComponent } from './components/race-schedule/weekend-details-popup/weekend-details-popup.component';
import { CountryService } from './services/country/country.service';


@NgModule({
  declarations: [
    AppComponent,
    DriversComponent,
    DriverComponent,
    StandingsComponent,
    GetAgePipe,
    TeamTranslatorPipe,
    CountdownComponent,
    HeaderComponent,
    RaceScheduleComponent,
    NationalityPipe,
    WeekendDetailsPopupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  entryComponents: [
    WeekendDetailsPopupComponent
  ],
  providers: [
    DriverService,
    DriverStandingsService,
    HttpClientModule,
    RaceScheduleCurrentService,
    NationalityService,
    CountryService,
    ErrorHandlerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
