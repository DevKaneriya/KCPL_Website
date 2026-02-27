import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalCapabilities } from './technical-capabilities';

describe('TechnicalCapabilities', () => {
  let component: TechnicalCapabilities;
  let fixture: ComponentFixture<TechnicalCapabilities>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicalCapabilities]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicalCapabilities);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
