import { TestBed } from '@angular/core/testing';

import { CoursesEffectsService } from './courses-effects.service';

describe('CoursesEffectsService', () => {
  let service: CoursesEffectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursesEffectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
