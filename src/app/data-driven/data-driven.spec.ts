import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDriven } from './data-driven';

describe('DataDriven', () => {
  let component: DataDriven;
  let fixture: ComponentFixture<DataDriven>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataDriven]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataDriven);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
