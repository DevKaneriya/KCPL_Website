import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityMission } from './quality-mission';

describe('QualityMission', () => {
  let component: QualityMission;
  let fixture: ComponentFixture<QualityMission>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualityMission]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualityMission);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
