import { AfterViewInit, Component } from '@angular/core';
import { WarehouseCentralizedStorage } from "../warehouse-centralized-storage/warehouse-centralized-storage";
import { WarehouseInventoryManagement } from "../warehouse-inventory-management/warehouse-inventory-management";
import { WarehouseModernManufacturing } from "../warehouse-modern-manufacturing/warehouse-modern-manufacturing";
import { WarehouseFlexibleCapacity } from "../warehouse-flexible-capacity/warehouse-flexible-capacity";
import { ReachOut } from "../reach-out/reach-out";
import { Footer } from "../footer/footer";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-warehouse-page',
  imports: [WarehouseCentralizedStorage, WarehouseInventoryManagement, WarehouseModernManufacturing, WarehouseFlexibleCapacity, ReachOut, Footer, RouterLink],
  templateUrl: './warehouse-page.html',
  styleUrl: './warehouse-page.scss'
})
export class WarehousePage implements AfterViewInit {

  ngAfterViewInit(): void {
    // Ensure the Bootstrap carousel on this page never pauses on hover
    const carouselElement = document.querySelector('#bgCarousel') as HTMLElement | null;
    const bootstrapAny = (window as any).bootstrap;

    if (carouselElement && bootstrapAny && typeof bootstrapAny.Carousel === 'function') {
      new bootstrapAny.Carousel(carouselElement, {
        interval: 5000,
        pause: false,
        ride: 'carousel'
      });
    } else if (carouselElement && (window as any).$) {
      (window as any).$('#bgCarousel').carousel({
        interval: 5000,
        pause: false
      });
    }
  }
}
