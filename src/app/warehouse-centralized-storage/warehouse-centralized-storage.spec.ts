import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseCentralizedStorage } from './warehouse-centralized-storage';

describe('WarehouseCentralizedStorage', () => {
  let component: WarehouseCentralizedStorage;
  let fixture: ComponentFixture<WarehouseCentralizedStorage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarehouseCentralizedStorage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseCentralizedStorage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
