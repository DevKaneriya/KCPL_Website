import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-precision-stage',
  imports: [CommonModule, RouterLink],
  templateUrl: './precision-stage.html',
  styleUrl: './precision-stage.scss'
})
export class PrecisionStage implements OnInit, AfterViewInit {
  words: { word: string; isBlue: boolean }[] = [];
  revealedCount = 0;

  @ViewChild('revealH2', { static: true }) revealH2!: ElementRef<HTMLElement>;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const headingText = 'Precision At Every Stage';
    this.words = headingText.split(' ').map((word) => ({ word, isBlue: false }));
  }

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);

    const totalWords = this.words.length;

    setTimeout(() => {
      ScrollTrigger.defaults({ scroller: document.documentElement });

      gsap.fromTo(
        this,
        { revealedCount: 0 },
        {
          revealedCount: totalWords,
          ease: 'none',
          scrollTrigger: {
            trigger: this.revealH2.nativeElement,
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
