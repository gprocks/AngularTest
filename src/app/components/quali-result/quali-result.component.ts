import { Component, OnInit, Input } from "@angular/core";
import { QualifyingResult } from "../../models/qualifying-result";
import { staggerItems } from "../../animations/stagger-list-item";

@Component({
  selector: "app-quali-result",
  templateUrl: "./quali-result.component.html",
  styleUrls: ["./quali-result.component.css"],
  animations: staggerItems
})
export class QualiResultComponent implements OnInit {
  @Input() qualiResults: QualifyingResult[];
  constructor() {}

  ngOnInit() {}

  getFinalQualiTime(qualiResult: QualifyingResult) {
    if (qualiResult.Q3) {
      return `Q3 ${qualiResult.Q3}`;
    }
    if (qualiResult.Q2) {
      return `Q2 ${qualiResult.Q2}`;
    }
    if (qualiResult.Q1) {
      return `Q1 ${qualiResult.Q1}`;
    }
  }
}
