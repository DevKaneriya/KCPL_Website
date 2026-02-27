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
  selector: 'app-engineering',
  imports: [CommonModule],
  templateUrl: './engineering.html',
  styleUrl: './engineering.scss'
})
export class Engineering {

  letters: { word: string; isBlue: boolean }[] = [];

  revealedCount = 0;

  @ViewChild('revealH1', { static: true }) revealH1!: ElementRef<HTMLHeadingElement>;
  @ViewChild('animateTarget', { static: true }) animateTarget!: ElementRef;


  constructor(private cdr: ChangeDetectorRef, private el: ElementRef) { }

  ngOnInit(): void {
    const blackText = 'KCPL';
    const blueText = 'Engineering';

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

      const proxy = { value: 0 };

      gsap.fromTo(
        proxy,
        { value: 0 },
        {
          value: totalLetters,
          ease: 'none',
          scrollTrigger: {
            trigger: this.revealH1.nativeElement,
            start: 'top 85%',
            end: 'top 45%',
            scrub: 0.6
          },
          onUpdate: () => {
            this.revealedCount = Math.round(proxy.value);
            this.cdr.detectChanges();
          }
        }
      );
    }, 0);




    const images = this.el.nativeElement.querySelectorAll('.reveal-image');

    images.forEach((img: HTMLElement) => {
      gsap.fromTo(
        img,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'power1.out',
          scrollTrigger: {
            trigger: img,
            start: 'top 90%',
            end: 'top 60%',
            scrub: 0.8
          }
        }
      );
    });



  }

}
