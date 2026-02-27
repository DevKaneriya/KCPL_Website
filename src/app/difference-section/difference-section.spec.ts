import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifferenceSection } from './difference-section';

describe('DifferenceSection', () => {
  let component: DifferenceSection;
  let fixture: ComponentFixture<DifferenceSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DifferenceSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DifferenceSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
