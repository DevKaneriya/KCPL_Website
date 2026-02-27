import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalImpact } from './global-impact';

describe('GlobalImpact', () => {
  let component: GlobalImpact;
  let fixture: ComponentFixture<GlobalImpact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalImpact]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalImpact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
