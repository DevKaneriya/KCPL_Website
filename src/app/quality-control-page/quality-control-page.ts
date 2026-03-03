import { Component, ViewChild, ElementRef } from '@angular/core';
import { QualityPhilosophy } from "../quality-philosophy/quality-philosophy";
import { QualityCertifiedQuality } from "../quality-certified-quality/quality-certified-quality";
import { Marque } from "../marque/marque";
import { Footer } from "../footer/footer";
import { ReachOut } from "../reach-out/reach-out";
import { QualityMission } from "../quality-mission/quality-mission";
import { QualityPolicy } from "../quality-policy/quality-policy";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quality-control-page',
  standalone: true,
  imports: [
    QualityCertifiedQuality,
    Marque,
    Footer,
    ReachOut,
    QualityMission,
    QualityPolicy,
    QualityPhilosophy,
    RouterLink
  ],
  templateUrl: './quality-control-page.html',
  styleUrl: './quality-control-page.scss'
})
export class QualityControlPage {

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
      });
    }
  }

}