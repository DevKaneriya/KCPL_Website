import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { PdpradiatorWorkHardest } from "../pdpradiator-work-hardest/pdpradiator-work-hardest";
import { PdpradiatorSystemEfficiency } from "../pdpradiator-system-efficiency/pdpradiator-system-efficiency";
import { Application } from "../application/application";
import { ReachOut } from "../reach-out/reach-out";
import { Footer } from "../footer/footer";
import { PdpRadiatorFeatures } from "../pdp-radiator-features/pdp-radiator-features";
import { PdpRadiatorDifference } from "../pdp-radiator-difference/pdp-radiator-difference";
import { RadiatorCarousel } from "../radiator-carousel/radiator-carousel";

@Component({
  selector: 'app-pdp-radiator',
  imports: [PdpradiatorWorkHardest, PdpradiatorSystemEfficiency, Application, ReachOut, Footer, PdpRadiatorFeatures, PdpRadiatorDifference, RadiatorCarousel],
  templateUrl: './pdp-radiator.html',
  styleUrl: './pdp-radiator.scss'
})
export class PdpRadiator {

  @ViewChild('animateTarget', { static: false }) animateTarget?: ElementRef;



  ngAfterViewInit(): void {

    const wrapper = document.querySelector('.tilt-wrapper') as HTMLElement;
    const img = document.querySelector('.tilt-img') as HTMLElement;

    if (!wrapper || !img) return;

    wrapper.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();

      const x = e.clientX - rect.left;   // cursor X inside box
      const y = e.clientY - rect.top;    // cursor Y inside box

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (centerY - y) / 30;
      const rotateY = (x - centerX) / 30;

      img.style.transform = `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateZ(-3px)
      scale(1.02)
    `;
    });

    wrapper.addEventListener('mouseleave', () => {
      img.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    });




    if (!this.animateTarget) {
      return;
    }

    gsap.from(this.animateTarget.nativeElement, {
      opacity: 0.9,
      scale: 1.5,
      duration: 4,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: this.animateTarget.nativeElement,
        start: 'top 90%',      // when top of element hits 80% of viewport
        end: 'bottom 100%',    // when bottom of element hits bottom of viewport
        once: true,            // animate only once per page load
        toggleActions: 'play none none none'
      }
    });

  }

}
