import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturingFutureReady } from './manufacturing-future-ready';

describe('ManufacturingFutureReady', () => {
  let component: ManufacturingFutureReady;
  let fixture: ComponentFixture<ManufacturingFutureReady>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManufacturingFutureReady]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManufacturingFutureReady);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
