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
import { SlickCarouselComponent } from 'ngx-slick-carousel';
declare const $: any;

@Component({
  selector: 'app-quality',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quality.html',
  styleUrls: ['./quality.scss']
})
export class Quality implements AfterViewInit {



  letters: { word: string; isBlue: boolean }[] = [];

  revealedCount = 0;

  @ViewChild('revealH1', { static: true }) revealH1!: ElementRef<HTMLHeadingElement>;



  @ViewChild('animateTarget', { static: true }) animateTarget!: ElementRef;
  slickModal: any;


  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    const blackText = 'Trusted By Performance. ';
    const blueText = 'Chosen For Quality.';

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





    gsap.registerPlugin(ScrollTrigger);

    setTimeout(() => {
      $(".testimonial-slick-carousel").on('init', () => {
        // Tell ScrollTrigger to re-measure everything
        ScrollTrigger.refresh();
      });

      $(".testimonial-slick-carousel").slick({
        dots: false,
        arrows: true,
        infinite: true,
        slidesToScroll: 1,
        slidesToShow: 3,
        accessibility: true,
        variableWidth: true,
        focusOnSelect: false,
        centerMode: true,
        autoplay: true,
        prevArrow: $('#teSlideArrowL'),
        nextArrow: $('#teSlideArrowR'),
        autoplaySpeed: 3000,
        centerPadding: "26px",
        responsive: [
          { breakpoint: 1200, settings: { slidesToShow: 2, slidesToScroll: 2, arrows: true } },
          { breakpoint: 767, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: true } },
          { breakpoint: 576, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: true } }
        ],
      });

      $(window).on('resize', () => {
        ScrollTrigger.refresh();
      });

    }, 500);
  }

  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    infinite: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  nextSlide() {
    this.slickModal.slickNext();
  }

  prevSlide() {
    this.slickModal.slickPrev();
  }
}
