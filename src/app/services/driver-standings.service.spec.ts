import { TestBed, inject } from '@angular/core/testing';

import { DriverStandingsService } from './driver-standings.service';

describe('DeiverStandingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DriverStandingsService]
    });
  });

  it('should be created', inject([DriverStandingsService], (service: DriverStandingsService) => {
    expect(service).toBeTruthy();
  }));
});
