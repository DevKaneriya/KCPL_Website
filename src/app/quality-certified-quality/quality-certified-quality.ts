import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
  COMPILER_OPTIONS
} from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-quality-certified-quality',
  imports: [CommonModule, RouterLink],
  templateUrl: './quality-certified-quality.html',
  styleUrl: './quality-certified-quality.scss'
})
export class QualityCertifiedQuality implements AfterViewInit {

  letters: { word: string; isBlue: boolean }[] = [];

  revealedCount = 0;

  @ViewChild('revealH1', { static: true }) revealH1!: ElementRef<HTMLHeadingElement>;



  @ViewChild('animateTarget', { static: true }) animateTarget!: ElementRef;
  @ViewChild('animateTargetMobile', { static: true }) animateTargetMobile!: ElementRef;


  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    const blueText = 'Certified Quality';
    const blackText = 'You Can Trust';
    const reblackText = '';


    const mapWords = (text: string, isBlue: boolean) =>
      text.split(' ').map((word) => ({
        word,
        isBlue
      }));

    this.letters = [...mapWords(blueText, false), ...mapWords(blackText, true), ...mapWords(reblackText, false)];
  }

  ngAfterViewInit(): void {

    //Text reveal animation

    gsap.registerPlugin(ScrollTrigger);

    const totalLetters = this.letters.length;

    setTimeout(() => {
      ScrollTrigger.defaults({ scroller: document.documentElement });

      gsap.fromTo(
        this,
        { revealedCount: 0 },
        {
          revealedCount: totalLetters,
          ease: 'none',
          scrollTrigger: {
            trigger: this.revealH1.nativeElement,
            start: 'top 85%',
            end: 'top 45%',
            scrub: true,
            invalidateOnRefresh: true
          },
          onUpdate: () => {
            this.revealedCount = Math.floor(gsap.getProperty(this, 'revealedCount') as number);
            this.cdr.detectChanges();
          }
        }
      );
    }, 0);



    gsap.from(this.animateTarget.nativeElement, {
      opacity: 0.9,
      scale: 1.5,
      duration: 4,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: this.animateTarget.nativeElement,
        start: 'top 70%',      // when top of element hits 80% of viewport
        end: 'bottom 100%',    // when bottom of element hits bottom of viewport
        once: true,            // animate only once per page load
        toggleActions: 'play none none none'
      }
    });


    gsap.from(this.animateTargetMobile.nativeElement, {
      opacity: 0.9,
      scale: 1.2,
      duration: 4,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: this.animateTargetMobile.nativeElement,
        start: 'top 70%',      // when top of element hits 80% of viewport
        end: 'bottom 100%',    // when bottom of element hits bottom of viewport
        once: true,            // animate only once per page load
        toggleActions: 'play none none none'
      }
    });


  }

}
