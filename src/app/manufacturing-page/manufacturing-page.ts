import { AfterViewInit, Component } from '@angular/core';
import { ManufacturingRawMaterial } from "../manufacturing-raw-material/manufacturing-raw-material";
import { Footer } from "../footer/footer";
import { ReachOut } from "../reach-out/reach-out";
import { ManufacturingQualitySystems } from "../manufacturing-quality-systems/manufacturing-quality-systems";
import { TechnicalCapabilities } from "../technical-capabilities/technical-capabilities";


@Component({
  selector: 'app-manufacturing-page',
  imports: [ ManufacturingRawMaterial, Footer, ReachOut, ManufacturingQualitySystems, TechnicalCapabilities],
  templateUrl: './manufacturing-page.html',
  styleUrl: './manufacturing-page.scss'
})
export class ManufacturingPage implements AfterViewInit {

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

  scrollToQualitySystems(): void {
    const target = document.getElementById('manufacturing-quality-systems');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
