import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchErrorBox } from './fetch-error-box';

describe('FetchErrorBox', () => {
  let component: FetchErrorBox;
  let fixture: ComponentFixture<FetchErrorBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FetchErrorBox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FetchErrorBox);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
