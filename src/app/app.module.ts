import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DriversComponent } from './components/drivers/drivers.component';
import { DriverComponent } from './components/drivers/driver/driver.component';
import { DriverService } from './services/driver.service';
import { AppRoutingModule } from './app-routing.module';
import { StandingsComponent } from './components/standings/standings.component';
import { GetAgePipe } from './pipes/get-age.pipe';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DriverStandingsService } from './services/driver-standings.service';
import { MaterialModule } from './material-module/material.module';


@NgModule({
  declarations: [
    AppComponent,
    DriversComponent,
    DriverComponent,
    StandingsComponent,
    GetAgePipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [DriverService, DriverStandingsService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
