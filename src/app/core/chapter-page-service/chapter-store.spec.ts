import { TestBed } from '@angular/core/testing';

import { ChapterStore } from './chapter-store';

describe('ChapterStore', () => {
  let service: ChapterStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChapterStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
