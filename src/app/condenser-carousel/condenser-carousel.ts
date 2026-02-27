import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewChild,
  ElementRef,
  AfterViewInit,
  effect
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItem } from '../../services/product';
import { Globalservice } from '../../services/globalservice';

@Component({
  selector: 'app-condenser-carousel',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './condenser-carousel.html',
  styleUrls: ['./condenser-carousel.scss']
})
export class CondenserCarousel implements AfterViewInit {

  condenserProducts: ProductItem[] = [];

  loading = true;

  carouselReady = false;


  get skeletonCount() {

    return window.innerWidth < 768
      ? 1
      : 3;

  }


  @ViewChild('swiperEl')
  swiperEl!: ElementRef;


  constructor(
    public appData: Globalservice
  ) {

    /* react when global products load */
    effect(() => {

      const allProducts =
        this.appData.products();

      if (!allProducts.length)
        return;

      /* filter condenser category */
      const filtered =
        allProducts.filter(
          (p: ProductItem) =>
            p.category === 'condenser'
        );

      /* duplicate if <= 3 */
      this.condenserProducts =
        filtered.length <= 3
          ? [...filtered, ...filtered]
          : filtered;

      this.loading = false;

      this.carouselReady = true;

      /* reinitialize swiper safely */
      requestAnimationFrame(() => {

        this.swiperEl
          ?.nativeElement
          ?.initialize?.();

      });

    });

  }


  ngAfterViewInit(): void {

    requestAnimationFrame(() => {

      this.swiperEl
        ?.nativeElement
        ?.initialize?.();

    });

  }


  trackById(
    index: number,
    item: ProductItem
  ) {

    return item?.id ?? index;

  }

}