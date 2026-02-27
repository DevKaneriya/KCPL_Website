import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturingQualitySystems } from './manufacturing-quality-systems';

describe('ManufacturingQualitySystems', () => {
  let component: ManufacturingQualitySystems;
  let fixture: ComponentFixture<ManufacturingQualitySystems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManufacturingQualitySystems]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManufacturingQualitySystems);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
