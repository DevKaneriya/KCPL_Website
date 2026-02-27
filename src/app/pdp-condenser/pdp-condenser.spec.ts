import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdpCondenser } from './pdp-condenser';

describe('PdpCondenser', () => {
  let component: PdpCondenser;
  let fixture: ComponentFixture<PdpCondenser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdpCondenser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdpCondenser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
