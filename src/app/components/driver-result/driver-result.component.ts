import { Component, OnInit, Input } from "@angular/core";
import { DriverResultDisplay } from "../../models/driver-result-display";
import { staggerItems } from "../../animations/stagger-list-item";

@Component({
  selector: "app-driver-result",
  templateUrl: "./driver-result.component.html",
  styleUrls: ["./driver-result.component.css"],
  animations: staggerItems
})
export class DriverResultComponent implements OnInit {
  @Input() driverResults: DriverResultDisplay[];
  constructor() {}

  ngOnInit() {}
}
