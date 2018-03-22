import { TestBed, inject } from '@angular/core/testing';

import { RaceScheduleCurrentService } from './race-schedule-current.service';

describe('RaceScheduleCurrentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RaceScheduleCurrentService]
    });
  });

  it('should be created', inject([RaceScheduleCurrentService], (service: RaceScheduleCurrentService) => {
    expect(service).toBeTruthy();
  }));
});
