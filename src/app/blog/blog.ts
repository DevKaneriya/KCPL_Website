import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
  effect
} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Footer } from "../footer/footer";
import { Globalservice } from '../../services/globalservice';

@Component({
  selector: 'app-blog',
  imports: [CommonModule, RouterModule, Footer],
  templateUrl: './blog.html',
  styleUrl: './blog.scss'
})
export class Blog implements AfterViewInit, OnInit {

  letters: { word: string; isBlue: boolean }[] = [];

  revealedCount = 0;

  @ViewChild('revealH1', { static: true }) revealH1!: ElementRef<HTMLHeadingElement>;
  @ViewChild('animateTarget', { static: true }) animateTarget!: ElementRef;

  goToBlog(slug: string) {
    this.router.navigate(['/blogs', slug]);
  }

  blogs: any[] = [];
  loading = true;

  constructor(
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    public appData: Globalservice
  ) {
    

    effect(() => {
      const currentSlug =
        this.route.snapshot.paramMap.get('slug');

      const allBlogs = this.appData.blogs();

      if (this.appData.loading())
        return;

      // 🔥 Remove currently opened blog (only on detail page)
      this.blogs = currentSlug
        ? allBlogs.filter((blog: any) => blog.slug !== currentSlug)
        : allBlogs;

      this.loading = false;
    });
  }

  ngOnInit(): void {

    const blackText = 'Blog & Articles';
    const blueText = '';

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

  }

}
