import { Component, effect } from '@angular/core';
import { Globalservice } from '../../services/globalservice';
import { CommonModule } from '@angular/common';
import { ProductItem } from '../../services/product';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-product-condensers-type',
  imports: [ CommonModule, RouterLink],
  templateUrl: './product-condensers-type.html',
  styleUrl: './product-condensers-type.scss'
})
export class ProductCondensersType {

  condenserProducts: any[] = [];
  isLoading = true;

  constructor(private appData: Globalservice) {
    effect(() => {

      const allProducts =
        this.appData.products();

      /* wait until products exist */
      if (!allProducts.length)
        return;

      /* filter by category */
      this.condenserProducts =
        allProducts.filter(
          (p: ProductItem) =>
            p.category === 'condenser'
        );

      this.isLoading = false;

    });
  }

}
