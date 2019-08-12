import { RaceResult } from "./race-result";
import { QualifyingResult } from "./qualifying-result";

export class WeekendResults {
  race: RaceResult[];
  qualifying: QualifyingResult[];
  constructor() {
    this.qualifying = [];
    this.race = [];
  }
}
