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
import { Footer } from "../footer/footer";
import { WhatWeDo } from "../what-we-do/what-we-do";
import { MorePower } from "../more-power/more-power";
import { Journey } from "../journey/journey";
import { Founder } from "../founder/founder";

@Component({
  selector: 'app-about',
  imports: [Footer, WhatWeDo, MorePower, Journey, Founder, CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {

  @ViewChild('animateTarget', { static: true }) animateTarget!: ElementRef;



  ngAfterViewInit(): void {
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

