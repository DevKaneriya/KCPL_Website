import { AfterViewInit, Component } from '@angular/core';
import { QualityPhilosophy } from "../quality-philosophy/quality-philosophy";
import { QualityCertifiedQuality } from "../quality-certified-quality/quality-certified-quality";
import { Marque } from "../marque/marque";
import { Footer } from "../footer/footer";
import { ReachOut } from "../reach-out/reach-out";
import { QualityMission } from "../quality-mission/quality-mission";
import { QualityPolicy } from "../quality-policy/quality-policy";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quality-control-page',
  imports: [QualityCertifiedQuality, Marque, Footer, ReachOut, QualityMission, QualityPolicy, QualityPhilosophy, RouterLink],
  templateUrl: './quality-control-page.html',
  styleUrl: './quality-control-page.scss'
})
export class QualityControlPage implements AfterViewInit {

  ngAfterViewInit(): void {
    // Ensure the Bootstrap carousel never pauses on hover
    const carouselElement = document.querySelector('#bgCarousel') as HTMLElement | null;

    // Prefer the Bootstrap 5 JS API if available
    const bootstrapAny = (window as any).bootstrap;

    if (carouselElement && bootstrapAny && typeof bootstrapAny.Carousel === 'function') {
      // Re-initialize or override carousel options with pause disabled
      new bootstrapAny.Carousel(carouselElement, {
        interval: 5000,
        pause: false,
        ride: 'carousel'
      });
    } else if (carouselElement && (window as any).$) {
      // Fallback using jQuery plugin if it's being used
      (window as any).$('#bgCarousel').carousel({
        interval: 5000,
        pause: false
      });
    }
  }
}
