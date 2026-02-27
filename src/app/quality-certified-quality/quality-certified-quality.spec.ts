import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityCertifiedQuality } from './quality-certified-quality';

describe('QualityCertifiedQuality', () => {
  let component: QualityCertifiedQuality;
  let fixture: ComponentFixture<QualityCertifiedQuality>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualityCertifiedQuality]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualityCertifiedQuality);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
