import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRadiatorType } from './product-radiator-type';

describe('ProductRadiatorType', () => {
  let component: ProductRadiatorType;
  let fixture: ComponentFixture<ProductRadiatorType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductRadiatorType]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductRadiatorType);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
