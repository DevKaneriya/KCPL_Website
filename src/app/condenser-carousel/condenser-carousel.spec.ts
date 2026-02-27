import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondenserCarousel } from './condenser-carousel';

describe('CondenserCarousel', () => {
  let component: CondenserCarousel;
  let fixture: ComponentFixture<CondenserCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CondenserCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CondenserCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
