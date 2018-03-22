import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Driver } from '../../../models/driver';
import { DriverService } from '../../../services/driver/driver.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {
  @Input() driver: Driver;

  constructor(
    private route: ActivatedRoute,
    private driverService: DriverService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getDriver();
  }

  getDriver(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.driverService.getDriver(id)
      .subscribe(driver => this.driver = driver);
  }
}
