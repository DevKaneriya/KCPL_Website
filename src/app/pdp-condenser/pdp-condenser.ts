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
import { PdpcondensorWorkHardest } from "../pdpcondensor-work-hardest/pdpcondensor-work-hardest";
import { PdpcondenserSystemEfficiency } from "../pdpcondenser-system-efficiency/pdpcondenser-system-efficiency";
import { ReachOut } from "../reach-out/reach-out";
import { Application } from "../application/application";
import { Footer } from "../footer/footer";
import { PdpCondenserDifference } from "../pdp-condenser-difference/pdp-condenser-difference";
import { PdpCondenserFeatures } from "../pdp-condenser-features/pdp-condenser-features";
import { CondenserCarousel } from "../condenser-carousel/condenser-carousel";

@Component({
  selector: 'app-pdp-condenser',
  imports: [PdpcondensorWorkHardest, PdpcondenserSystemEfficiency, ReachOut, Application, Footer, PdpCondenserDifference, PdpCondenserFeatures, CondenserCarousel],
  templateUrl: './pdp-condenser.html',
  styleUrl: './pdp-condenser.scss'
})
export class PdpCondenser {

  @ViewChild('animateTarget', { static: true }) animateTarget!: ElementRef;



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
