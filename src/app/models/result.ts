import { Driver } from './driver';
import { Constructor } from './constructor';

export class Result {
  number: string;
  position: string;
  positionText: string;
  points: string;
  Driver: Driver;
  Constructor: Constructor;
  grid: string;
  laps: string;
  status: string;
  // Time?: Time;
  // FastestLap?: FastestLap;
}



// interface FastestLap {
//   rank: string;
//   lap: string;
//   Time: Time2;
//   AverageSpeed: AverageSpeed;
// }

// interface AverageSpeed {
//   units: string;
//   speed: string;
// }

// interface Time2 {
//   time: string;
// }

// interface Time {
//   millis: string;
//   time: string;
// }
