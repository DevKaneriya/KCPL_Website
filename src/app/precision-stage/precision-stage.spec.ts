import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecisionStage } from './precision-stage';

describe('PrecisionStage', () => {
  let component: PrecisionStage;
  let fixture: ComponentFixture<PrecisionStage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrecisionStage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrecisionStage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
