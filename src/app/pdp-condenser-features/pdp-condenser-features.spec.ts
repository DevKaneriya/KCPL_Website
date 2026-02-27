import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdpCondenserFeatures } from './pdp-condenser-features';

describe('PdpCondenserFeatures', () => {
  let component: PdpCondenserFeatures;
  let fixture: ComponentFixture<PdpCondenserFeatures>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdpCondenserFeatures]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdpCondenserFeatures);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
