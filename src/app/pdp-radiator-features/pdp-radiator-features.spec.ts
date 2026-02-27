import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdpRadiatorFeatures } from './pdp-radiator-features';

describe('PdpRadiatorFeatures', () => {
  let component: PdpRadiatorFeatures;
  let fixture: ComponentFixture<PdpRadiatorFeatures>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdpRadiatorFeatures]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdpRadiatorFeatures);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
