import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivDown } from './div-down';

describe('DivDown', () => {
  let component: DivDown;
  let fixture: ComponentFixture<DivDown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DivDown]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DivDown);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
