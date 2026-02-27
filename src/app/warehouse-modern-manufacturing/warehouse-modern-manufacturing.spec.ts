import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseModernManufacturing } from './warehouse-modern-manufacturing';

describe('WarehouseModernManufacturing', () => {
  let component: WarehouseModernManufacturing;
  let fixture: ComponentFixture<WarehouseModernManufacturing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarehouseModernManufacturing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseModernManufacturing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
