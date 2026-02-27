import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import { Quality } from '../quality/quality';
import { Cooling } from '../cooling/cooling';
import { News } from '../news/news';
import { ReachOut } from '../reach-out/reach-out';
import { Footer } from '../footer/footer';
import { Application } from '../application/application';
import { Manufacture } from '../manufacture/manufacture';
import { Engineer } from '../engineer/engineer';
import { Engineering } from '../engineering/engineering';
import { Marque } from '../marque/marque';
import { DivDown } from '../div-down/div-down';
import { DifferenceSection } from "../difference-section/difference-section";

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    Quality,
    Cooling,
    News,
    ReachOut,
    Footer,
    Application,
    Manufacture,
    Engineer,
    Engineering,
    Marque,
    DivDown,
    DifferenceSection,
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {

  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    const video = this.bgVideo.nativeElement;

    video.muted = true;
    video.volume = 0;

    // Force reload + play
    video.load();

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked – browser policy
      });
    }
  }

}