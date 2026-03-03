import { Component, ViewChild, ElementRef } from '@angular/core';
import { ManufacturingRawMaterial } from "../manufacturing-raw-material/manufacturing-raw-material";
import { Footer } from "../footer/footer";
import { ReachOut } from "../reach-out/reach-out";
import { ManufacturingQualitySystems } from "../manufacturing-quality-systems/manufacturing-quality-systems";
import { TechnicalCapabilities } from "../technical-capabilities/technical-capabilities";

@Component({
  selector: 'app-manufacturing-page',
  standalone: true,
  imports: [
    ManufacturingRawMaterial,
    Footer,
    ReachOut,
    ManufacturingQualitySystems,
    TechnicalCapabilities
  ],
  templateUrl: './manufacturing-page.html',
  styleUrl: './manufacturing-page.scss'
})
export class ManufacturingPage   {

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

  scrollToQualitySystems(): void {
    const target = document.getElementById('manufacturing-quality-systems');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

}
