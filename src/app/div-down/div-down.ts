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


@Component({
  selector: 'app-div-down',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './div-down.html',
  styleUrls: ['./div-down.scss']
})
export class DivDown implements OnInit, AfterViewInit {
  letters: { word: string; isBlue: boolean }[] = [];

  revealedCount = 0;

  @ViewChild('revealH1', { static: true }) revealH1!: ElementRef<HTMLHeadingElement>;



  @ViewChild('animateTarget', { static: true }) animateTarget!: ElementRef;
  @ViewChild('mobileTarget', { static: true }) mobileTarget!: ElementRef;


  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    const blackText = 'We Keep Your Engines';
    const blueText = 'Cool';

    const mapWords = (text: string, isBlue: boolean) =>
      text.split(' ').map((word) => ({
        word,
        isBlue
      }));

    this.letters = [...mapWords(blackText, false), ...mapWords(blueText, true)];
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



    // Image animation 

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


    gsap.from(this.mobileTarget.nativeElement, {
      opacity: 0.9,
      scale: 1.5,
      duration: 4,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: this.mobileTarget.nativeElement,
        start: 'top 90%',      // when top of element hits 80% of viewport
        end: 'bottom 100%',    // when bottom of element hits bottom of viewport
        once: true,            // animate only once per page load
        toggleActions: 'play none none none'
      }
    });


  }
}

