import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Founder } from './founder';

describe('Founder', () => {
  let component: Founder;
  let fixture: ComponentFixture<Founder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Founder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Founder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
