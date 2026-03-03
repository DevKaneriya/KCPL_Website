import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManufacturingPage } from './manufacturing-page';

describe('ManufacturingPage', () => {
  let component: ManufacturingPage;
  let fixture: ComponentFixture<ManufacturingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManufacturingPage]
    }).compileComponents();

    fixture = TestBed.createComponent(ManufacturingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});