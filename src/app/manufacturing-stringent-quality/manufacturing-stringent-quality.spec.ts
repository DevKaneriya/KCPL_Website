import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturingStringentQuality } from './manufacturing-stringent-quality';

describe('ManufacturingStringentQuality', () => {
  let component: ManufacturingStringentQuality;
  let fixture: ComponentFixture<ManufacturingStringentQuality>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManufacturingStringentQuality]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManufacturingStringentQuality);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
