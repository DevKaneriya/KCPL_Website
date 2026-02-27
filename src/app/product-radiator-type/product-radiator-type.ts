import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { Globalservice } from '../../services/globalservice';
import { ProductItem } from '../../services/product';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-product-radiator-type',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-radiator-type.html',
  styleUrl: './product-radiator-type.scss'
})
export class ProductRadiatorType {
  radiatorProducts: any[] = [];
  isLoading = true;

  constructor(private appData: Globalservice) {
    effect(() => {

      const allProducts =
        this.appData.products();

      /* wait until products exist */
      if (!allProducts.length)
        return;

      /* filter by category */
      this.radiatorProducts =
        allProducts.filter(
          (p: ProductItem) =>
            p.category === 'radiator'
        );

      this.isLoading = false;

    });
  }

}

