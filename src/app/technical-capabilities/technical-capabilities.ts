import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';


@Component({
  selector: 'app-technical-capabilities',
  imports: [ CommonModule],
  templateUrl: './technical-capabilities.html',
  styleUrl: './technical-capabilities.scss'
})
export class TechnicalCapabilities {

  constructor(private cdr: ChangeDetectorRef) {}

  titleWords: string[] = [];
  revealedTitleCount = 0;

  @ViewChild('revealTitle', { static: true })
  revealTitle!: ElementRef<HTMLDivElement>;

  ngOnInit(): void {
    this.titleWords =
      'Manufacturing Technical Capabilities'.split(' ');
  }

  ngAfterViewInit(): void {

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.defaults({ scroller: document.body });

    const totalTitleWords = this.titleWords.length;

    gsap.fromTo(
      this,
      { revealedTitleCount: 0 },
      {
        revealedTitleCount: totalTitleWords,
        ease: 'none',
        scrollTrigger: {
          trigger: this.revealTitle.nativeElement,
          start: 'top 85%',
          end: 'top 45%',
          scrub: true,
          invalidateOnRefresh: true
        },
        onUpdate: () => {
          this.revealedTitleCount = Math.floor(
            gsap.getProperty(this, 'revealedTitleCount') as number
          );
          this.cdr.detectChanges();
        }
      }
    );
  }
}