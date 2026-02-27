import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturingInHouse } from './manufacturing-in-house';

describe('ManufacturingInHouse', () => {
  let component: ManufacturingInHouse;
  let fixture: ComponentFixture<ManufacturingInHouse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManufacturingInHouse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManufacturingInHouse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
