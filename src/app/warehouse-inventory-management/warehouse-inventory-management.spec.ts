import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseInventoryManagement } from './warehouse-inventory-management';

describe('WarehouseInventoryManagement', () => {
  let component: WarehouseInventoryManagement;
  let fixture: ComponentFixture<WarehouseInventoryManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarehouseInventoryManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseInventoryManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
