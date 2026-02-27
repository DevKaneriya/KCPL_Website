import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityPolicy } from './quality-policy';

describe('QualityPolicy', () => {
  let component: QualityPolicy;
  let fixture: ComponentFixture<QualityPolicy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualityPolicy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualityPolicy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
