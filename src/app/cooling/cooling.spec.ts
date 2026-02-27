import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cooling } from './cooling';

describe('Cooling', () => {
  let component: Cooling;
  let fixture: ComponentFixture<Cooling>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cooling]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cooling);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
