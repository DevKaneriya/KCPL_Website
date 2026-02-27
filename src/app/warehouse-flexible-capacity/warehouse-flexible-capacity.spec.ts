import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseFlexibleCapacity } from './warehouse-flexible-capacity';

describe('WarehouseFlexibleCapacity', () => {
  let component: WarehouseFlexibleCapacity;
  let fixture: ComponentFixture<WarehouseFlexibleCapacity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarehouseFlexibleCapacity]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseFlexibleCapacity);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
