import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdpcondenserSystemEfficiency } from './pdpcondenser-system-efficiency';

describe('PdpcondenserSystemEfficiency', () => {
  let component: PdpcondenserSystemEfficiency;
  let fixture: ComponentFixture<PdpcondenserSystemEfficiency>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdpcondenserSystemEfficiency]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdpcondenserSystemEfficiency);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
