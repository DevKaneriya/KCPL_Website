import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCondensersType } from './product-condensers-type';

describe('ProductCondensersType', () => {
  let component: ProductCondensersType;
  let fixture: ComponentFixture<ProductCondensersType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCondensersType]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCondensersType);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
