import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityPdcaCycle } from './quality-pdca-cycle';

describe('QualityPdcaCycle', () => {
  let component: QualityPdcaCycle;
  let fixture: ComponentFixture<QualityPdcaCycle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualityPdcaCycle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualityPdcaCycle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
