import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdpCondenserDifference } from './pdp-condenser-difference';

describe('PdpCondenserDifference', () => {
  let component: PdpCondenserDifference;
  let fixture: ComponentFixture<PdpCondenserDifference>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdpCondenserDifference]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdpCondenserDifference);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
