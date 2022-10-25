import { TestBed } from '@angular/core/testing';

import { AcademicSubjectsService } from './academic-subjects.service';

describe('AcademicSubjectsService', () => {
  let service: AcademicSubjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcademicSubjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
