import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdpRadiatorDifference } from './pdp-radiator-difference';

describe('PdpRadiatorDifference', () => {
  let component: PdpRadiatorDifference;
  let fixture: ComponentFixture<PdpRadiatorDifference>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdpRadiatorDifference]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdpRadiatorDifference);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
