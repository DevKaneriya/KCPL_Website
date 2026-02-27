import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
  COMPILER_OPTIONS
} from '@angular/core';
import { CommonModule} from '@angular/common';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-quality-pdca-cycle',
  imports: [CommonModule],
  templateUrl: './quality-pdca-cycle.html',
  styleUrl: './quality-pdca-cycle.scss'
})
export class QualityPdcaCycle {

  letters: { word: string; isBlue: boolean }[] = [];

  revealedCount = 0;

  @ViewChild('revealH1', { static: true }) revealH1!: ElementRef<HTMLHeadingElement>;



  @ViewChild('animateTarget', { static: true }) animateTarget!: ElementRef;


  constructor(private cdr: ChangeDetectorRef, private el: ElementRef) { }

  ngOnInit(): void {
    const blackText = 'Our Approach:';
    const blueText = 'PDCA Cycle';
    const reblackText = '';


    const mapWords = (text: string, isBlue: boolean) =>
      text.split(' ').map((word) => ({
        word,
        isBlue
      }));

    this.letters = [...mapWords(blackText, false), ...mapWords(blueText, true), ...mapWords(reblackText, false)];
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




    const images = this.el.nativeElement.querySelectorAll('.reveal-image');

    images.forEach((img: HTMLElement) => {
      gsap.fromTo(img,
        { clipPath: 'inset(100% 0% 0% 0%)' }, // fully hidden from top
        {
          clipPath: 'inset(0% 0% 0% 0%)',     // fully revealed
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            start: 'top 90%',
            end: 'top 60%',
            scrub: true
          }
        }
      );
    });

  }

}
