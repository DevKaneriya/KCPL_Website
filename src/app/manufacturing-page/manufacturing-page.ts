import { Component, OnInit, OnDestroy } from '@angular/core';
import { ManufacturingRawMaterial } from "../manufacturing-raw-material/manufacturing-raw-material";
import { Footer } from "../footer/footer";
import { ReachOut } from "../reach-out/reach-out";
import { ManufacturingQualitySystems } from "../manufacturing-quality-systems/manufacturing-quality-systems";
import { TechnicalCapabilities } from "../technical-capabilities/technical-capabilities";

@Component({
  selector: 'app-manufacturing-page',
  standalone: true,
  imports: [
    ManufacturingRawMaterial,
    Footer,
    ReachOut,
    ManufacturingQualitySystems,
    TechnicalCapabilities
  ],
  templateUrl: './manufacturing-page.html',
  styleUrl: './manufacturing-page.scss'
})
export class ManufacturingPage implements OnInit, OnDestroy {

  currentSlide = 0;
  private intervalId: any;

  slides = [
    {
      title: 'Manufacturing Excellence',
      description: 'With decades of expertise in heat exchanger manufacturing, we combine advanced technology, precision engineering, and strict quality controls to deliver reliable, high-performance solutions at scale.',
      buttonText: 'Inside Our Manufacturing'
    },
    {
      title: 'Precision Engineering',
      description: 'Our advanced production systems ensure dimensional accuracy, structural integrity, and long-term reliability across all industrial applications.',
      buttonText: 'Explore Our Capabilities'
    }
  ];

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.currentSlide =
        (this.currentSlide + 1) % this.slides.length;
    }, 5000); // change every 5 seconds
  }

  scrollToQualitySystems(): void {
    const target = document.getElementById('manufacturing-quality-systems');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}