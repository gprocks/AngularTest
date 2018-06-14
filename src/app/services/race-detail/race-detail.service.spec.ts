import { TestBed, inject } from '@angular/core/testing';

import { RaceDetailService } from './race-detail.service';

describe('RaceDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RaceDetailService]
    });
  });

  it('should be created', inject([RaceDetailService], (service: RaceDetailService) => {
    expect(service).toBeTruthy();
  }));
});
