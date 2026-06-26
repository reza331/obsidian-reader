import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingBox } from './loading-box';

describe('LoadingBox', () => {
  let component: LoadingBox;
  let fixture: ComponentFixture<LoadingBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingBox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingBox);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
