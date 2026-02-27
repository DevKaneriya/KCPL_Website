import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiatorCarousel } from './radiator-carousel';

describe('RadiatorCarousel', () => {
  let component: RadiatorCarousel;
  let fixture: ComponentFixture<RadiatorCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadiatorCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadiatorCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
