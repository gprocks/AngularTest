import { Component, OnInit } from '@angular/core';
import { Driver } from '../../models/driver';
import { DRIVERS } from '../../mocks/drivers';
import { DriverService } from '../../services/driver.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {

  selectedDriver: Driver ;

  drivers: Driver[];
  constructor(private router: Router, private driverService: DriverService) { }

  ngOnInit() {
    this.getDrivers();
  }

  getDrivers(): void {
    this.driverService.getDrivers().subscribe(result => this.drivers = result);
  }

  onSelect(driver: Driver): void {
    this.selectedDriver = driver;
    this.router.navigate(['drivers', this.selectedDriver.driverId]);
  }
}
