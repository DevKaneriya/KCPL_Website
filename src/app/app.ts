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


  private lenis!: Lenis;

  @ViewChild('progressPath', { static: false }) progressPath!: ElementRef<SVGPathElement>;
  isVisible = false;
  private pathLength = 0;

  scrollToTop(): void {
    if (this.lenis) {
      this.lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  ngAfterViewInit(): void {
    // 1. Run initialization entirely outside Angular zone to avoid freezing UI
    this.zone.runOutsideAngular(() => {
      
      // ✅ SAFE PATCH START
      // Overrides native addEventListener temporarily so that Lenis 
      // is forced to register its wheel/touch events with { passive: false }
      const originalAddEventListener = EventTarget.prototype.addEventListener;
      EventTarget.prototype.addEventListener = function(
        type: string, 
        listener: any, 
        options?: boolean | AddEventListenerOptions
      ) {
        if (type === 'wheel' || type === 'mousewheel' || type === 'touchstart' || type === 'touchmove') {
          if (typeof options === 'object' && options !== null) {
            options.passive = false;
          } else if (options !== true) {
            options = { passive: false };
          }
        }
        return originalAddEventListener.call(this, type, listener, options);
      };

      this.lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1,
        syncTouch: true,
      });

      // ✅ SAFE PATCH END - Restore standard functionality immediately
      EventTarget.prototype.addEventListener = originalAddEventListener;

      // 2. Map Lenis scroll to GSAP ScrollTrigger
      this.lenis.on('scroll', ScrollTrigger.update);

      // 3. Move scroll percentage logic here (out of HostListener) to avoid Zone trigger on every scroll event
      this.lenis.on('scroll', (e: any) => {
        const scroll = e.scroll;
        const limit = e.limit; // total scrollable height
        
        if (this.progressPath && limit > 0) {
          const progress = this.pathLength - ((scroll / limit) * this.pathLength);
          this.progressPath.nativeElement.style.strokeDashoffset = `${progress}`;
        }
        
        // Only trigger change detection when isVisible state actually changes
        const shouldBeVisible = scroll > 50;
        if (this.isVisible !== shouldBeVisible) {
          this.zone.run(() => {
            this.isVisible = shouldBeVisible;
          });
        }
      });

      // 4. Implement smooth scrolling RAF (requestAnimationFrame)
      gsap.ticker.add((time) => {
        this.lenis.raf(time * 1000); // GSAP's ticker works in seconds, Lenis needs ms
      });
      gsap.ticker.lagSmoothing(0);

      // GSAP global defaults setup
      ScrollTrigger.defaults({
        scroller: document.documentElement,
      });

      // Refresh ScrollTrigger and Lenis on navigation changes
      this.router.events
        .pipe(filter(e => e instanceof NavigationEnd))
        .subscribe(() => {
          // Wrap in timeout so DOM can update before refreshing ScrollTrigger
          setTimeout(() => {
            ScrollTrigger.refresh();
            this.lenis.scrollTo(0, { immediate: true });
          }, 100);
        });
    });

    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.config({
      ignoreMobileResize: true,
      limitCallbacks: true
    });
    
    // Normalize scroll is sometimes redundant when using Lenis, but safe if required
    if (this.isMobile()) {
       ScrollTrigger.normalizeScroll({
         allowNestedScroll: true,
         lockAxis: false,
         momentum: 1.7 
       });
    }

    // scrollbar path setup
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
