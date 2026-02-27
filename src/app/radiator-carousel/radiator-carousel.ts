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
      this.radiatorProducts =
        allProducts.filter(
          (p: ProductItem) =>
            p.category === 'radiator'
        );

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