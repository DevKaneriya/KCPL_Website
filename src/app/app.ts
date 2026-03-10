import { Component, AfterViewInit, HostListener, NgZone } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollSmoother from 'gsap/ScrollSmoother';
import { Header } from './header/header';
import Lenis from '@studio-freight/lenis';
import { ViewChild, ElementRef } from '@angular/core';
import { Globalservice } from '../services/globalservice';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  isHeaderTransparent = true;

  isMobile(): boolean {
    return window.matchMedia('(max-width: 768px)').matches;
  }

  constructor(
    private router: Router,
    private zone: NgZone,
    public appData: Globalservice
  ) {

    this.appData.loadAllData();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const route = this.router.routerState.root.firstChild;
      this.isHeaderTransparent = route?.snapshot.data['transparentHeader'] ?? false;
      setTimeout(() => ScrollTrigger.refresh(), 100);
    });
  }


  @ViewChild('progressPath', { static: false }) progressPath!: ElementRef<SVGPathElement>;
  isVisible = false;
  private pathLength = 0;
  @HostListener('window:scroll', [])
  onWindowScroll(): void {

    const scroll = window.scrollY || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - window.innerHeight;

    if (this.progressPath) {
      const progress = this.pathLength - (scroll * this.pathLength / height);
      this.progressPath.nativeElement.style.strokeDashoffset = `${progress}`;
    }

    this.isVisible = scroll > 50;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  private lenis!: Lenis;

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {

      this.lenis = new Lenis({
        // lerp: this.isMobile() ? 1 : 0.06,
        // smoothWheel: true,
        // wheelMultiplier: 0.5,
        // touchMultiplier: this.isMobile() ? 1 : 0.6,
        // syncTouch: true,

      });
      this.lenis.on('scroll', ScrollTrigger.update);


      // ✅ RAF loop (CRITICAL)
      const raf = (time: number) => {
        this.lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);

      // ✅ GSAP global defaults
      ScrollTrigger.defaults({
        scroller: document.documentElement,
        anticipatePin: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true
      });

      // ✅ Refresh on route change
      this.router.events
        .pipe(filter(e => e instanceof NavigationEnd))
        .subscribe(() => {
          requestAnimationFrame(() => {
            ScrollTrigger.refresh();
          });

          this.lenis.scrollTo(0, {
            immediate: true
          });
        });
    });



    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.config({
      ignoreMobileResize: true,
      limitCallbacks: true
    });

    // 🔑 THIS IS THE FIX
    ScrollTrigger.normalizeScroll({
      allowNestedScroll: true,
      lockAxis: false,
      momentum: this.isMobile() ? 1.7 : 2
    });

    //scrollbar
    if (!this.progressPath) return;

    const path = this.progressPath.nativeElement;
    this.pathLength = path.getTotalLength();

    path.style.transition = 'none';
    path.style.strokeDasharray = `${this.pathLength} ${this.pathLength}`;
    path.style.strokeDashoffset = `${this.pathLength}`;
    path.getBoundingClientRect();
    path.style.transition = 'stroke-dashoffset 10ms linear';
  }

}
