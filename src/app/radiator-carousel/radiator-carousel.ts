import { Component, CUSTOM_ELEMENTS_SCHEMA, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItem } from '../../services/product';
import { Globalservice } from '../../services/globalservice';

@Component({
  selector: 'app-radiator-carousel',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './radiator-carousel.html',
  styleUrls: ['./radiator-carousel.scss']
})
export class RadiatorCarousel {

  radiatorProducts: ProductItem[] = [];

  carouselReady = false;

  loading = true;


  get skeletonCount() {

    return window.innerWidth < 768
      ? 1
      : 3;

  }


  constructor(
    public appData: Globalservice
  ) {

    /* react when global products load */
    effect(() => {

      const allProducts =
        this.appData.products();

      if (!allProducts.length)
        return;

      /* filter radiator category */
      const filtered = allProducts.filter(
        (p: ProductItem) =>
          p.category === 'radiator'
      );

      /* duplicate if <= 3 */
      this.radiatorProducts =
        filtered.length <= 3
          ? [...filtered, ...filtered]
          : filtered;

      this.loading = false;

      this.carouselReady = true;

    });

  }


  trackById(
    index: number,
    item: ProductItem
  ) {

    return item?.id ?? index;

  }

}