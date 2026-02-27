import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdpRadiator } from './pdp-radiator';

describe('PdpRadiator', () => {
  let component: PdpRadiator;
  let fixture: ComponentFixture<PdpRadiator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdpRadiator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdpRadiator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
