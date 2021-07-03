import { TestBed } from '@angular/core/testing';

import { CoursesResolverService } from './courses-resolver.service';

describe('CoursesResolverService', () => {
  let service: CoursesResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursesResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
