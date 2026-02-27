import { Component } from '@angular/core';

@Component({
  selector: 'app-more-power',
  imports: [],
  templateUrl: './more-power.html',
  styleUrl: './more-power.scss'
})
export class MorePower {

  ngAfterViewInit() {
    const video = document.getElementById('mainVideo') as HTMLVideoElement;

    if (video) {
      video.muted = true;    // ensure default mute
      video.volume = 0;      // extra guarantee
      video.setAttribute('muted', ''); // required for iOS/Chrome autoplay
      video.play().catch(() => { });
    }
  }

}
