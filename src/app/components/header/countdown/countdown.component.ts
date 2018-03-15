import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit {

  timeRemaining: string[] = [];
  diff: number;
  constructor() { }

  ngOnInit() {
    Observable.interval(1000).map((x) => {
      this.diff = Math.floor((new Date('2018-03-25T05:10Z').getTime() - new Date().getTime()) / 1000);
    }).subscribe((x) => {
      this.getComponents(this.diff);
    });
  }

  getComponents(t) {
    let days: number;
    let hours: number;
    let minutes: number;
    let seconds: number;

    days = Math.floor(t / 86400);
    t -= days * 86400;
    hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    minutes = Math.floor(t / 60) % 60;
    t -= minutes * 60;
    seconds = t % 60;

    this.timeRemaining = [
      days.toString().padStart(2, '0'),
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ];
  }
}
