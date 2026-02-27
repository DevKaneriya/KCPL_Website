import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdpradiatorSystemEfficiency } from './pdpradiator-system-efficiency';

describe('PdpradiatorSystemEfficiency', () => {
  let component: PdpradiatorSystemEfficiency;
  let fixture: ComponentFixture<PdpradiatorSystemEfficiency>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdpradiatorSystemEfficiency]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdpradiatorSystemEfficiency);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
