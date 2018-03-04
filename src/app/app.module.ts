import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DriversComponent } from './components/drivers/drivers.component';
import { DriverComponent } from './components/drivers/driver/driver.component';
import { DriverService } from './services/driver.service';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GetAgePipe } from './pipes/get-age.pipe';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DriverStandingsService } from './services/driver-standings.service';


@NgModule({
  declarations: [
    AppComponent,
    DriversComponent,
    DriverComponent,
    DashboardComponent,
    GetAgePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [DriverService, DriverStandingsService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
