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
  selector: 'app-founder',
  imports: [CommonModule],
  templateUrl: './founder.html',
  styleUrl: './founder.scss'
})
export class Founder {

  letters: { word: string; isBlue: boolean }[] = [];

  revealedCount = 0;

  @ViewChild('revealH1', { static: true }) revealH1!: ElementRef<HTMLHeadingElement>;

  @ViewChild('mobileVideo') mobileVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('desktopVideo') desktopVideo!: ElementRef<HTMLVideoElement>;


  constructor(private cdr: ChangeDetectorRef) { }



  ngOnInit(): void {
    const blackText = 'What Drives Us';
    const blueText = '';

    const mapWords = (text: string, isBlue: boolean) =>
      text.split(' ').map((word) => ({
        word,
        isBlue
      }));

    this.letters = [...mapWords(blackText, false), ...mapWords(blueText, true)];





  }

  ngAfterViewInit(): void {


    [this.mobileVideo, this.desktopVideo].forEach(v => {
      const video = v?.nativeElement;
      if (!video) return;

      video.muted = true;
      video.play().catch(() => {
        video.muted = true;
        video.play();
      });
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

