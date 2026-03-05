import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-pdpcondenser-work-hardest',
  imports: [CommonModule],
  templateUrl: './pdpcondenser-work-hardest.html',
  styleUrl: './pdpcondenser-work-hardest.scss'
})
export class PdpcondenserWorkHardest {

  letters: { word: string; isBlue: boolean }[] = [];

  revealedCount = 0;

  @ViewChild('revealH1', { static: true }) revealH1!: ElementRef<HTMLHeadingElement>;



  @ViewChild('animateTarget', { static: true }) animateTarget!: ElementRef;


  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    const blackText = 'Where Our';
    const blueText = 'Condensers Work Hardest';
    const reblackText = '';


    const mapWords = (text: string, isBlue: boolean) =>
      text.split(' ').map((word) => ({
        word,
        isBlue
      }));

    this.letters = [...mapWords(blackText, false), ...mapWords(blueText, true), ...mapWords(reblackText, false)];
  }

  ngAfterViewInit(): void {

    document.querySelectorAll('video').forEach(v => {
      v.muted = true;
      v.volume = 0;
      v.play().catch(() => { });
    });




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

  }

}
