import { AfterViewInit, Component } from '@angular/core';
import { QualityPhilosophy } from "../quality-philosophy/quality-philosophy";
import { QualityCertifiedQuality } from "../quality-certified-quality/quality-certified-quality";
import { QualityPdcaCycle } from "../quality-pdca-cycle/quality-pdca-cycle";
import { Marque } from "../marque/marque";
import { Footer } from "../footer/footer";
import { DataDriven } from "../data-driven/data-driven";
import { ReachOut } from "../reach-out/reach-out";
import { QualityMission } from "../quality-mission/quality-mission";
import { QualityPolicy } from "../quality-policy/quality-policy";

@Component({
  selector: 'app-quality-control-page',
  imports: [QualityCertifiedQuality, Marque, Footer, ReachOut, QualityMission, QualityPolicy, QualityPhilosophy],
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
        interval: 3000,
        pause: false,
        ride: 'carousel'
      });
    } else if (carouselElement && (window as any).$) {
      // Fallback using jQuery plugin if it's being used
      (window as any).$('#bgCarousel').carousel({
        interval: 3000,
        pause: false
      });
    }
  }
}
