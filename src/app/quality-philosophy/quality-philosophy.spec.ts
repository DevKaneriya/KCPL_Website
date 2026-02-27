import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityPhilosophy } from './quality-philosophy';

describe('QualityPhilosophy', () => {
  let component: QualityPhilosophy;
  let fixture: ComponentFixture<QualityPhilosophy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualityPhilosophy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualityPhilosophy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
