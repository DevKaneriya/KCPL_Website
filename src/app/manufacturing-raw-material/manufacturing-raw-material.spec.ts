import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturingRawMaterial } from './manufacturing-raw-material';

describe('ManufacturingRawMaterial', () => {
  let component: ManufacturingRawMaterial;
  let fixture: ComponentFixture<ManufacturingRawMaterial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManufacturingRawMaterial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManufacturingRawMaterial);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
