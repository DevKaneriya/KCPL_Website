import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdpradiatorWorkHardest } from './pdpradiator-work-hardest';

describe('PdpradiatorWorkHardest', () => {
  let component: PdpradiatorWorkHardest;
  let fixture: ComponentFixture<PdpradiatorWorkHardest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdpradiatorWorkHardest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdpradiatorWorkHardest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
