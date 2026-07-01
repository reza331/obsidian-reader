import { TestBed } from '@angular/core/testing';

import { SearchMobileUi } from './search-mobile-ui';

describe('SearchMobileUi', () => {
  let service: SearchMobileUi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchMobileUi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
