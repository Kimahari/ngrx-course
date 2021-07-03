import { TestBed } from '@angular/core/testing';

import { LessonsDataService } from './lessons-data.service';

describe('LessonsDataService', () => {
  let service: LessonsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LessonsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
