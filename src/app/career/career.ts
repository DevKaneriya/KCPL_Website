import { Component } from '@angular/core';
import { JobOffers } from "../job-offers/job-offers";
import { News } from "../news/news";
import { Footer } from "../footer/footer";
import { GlobalImpact } from "../global-impact/global-impact";
import { WorkWithYou } from "../work-with-you/work-with-you";

@Component({
  selector: 'app-career',
  imports: [JobOffers, News, Footer, GlobalImpact, WorkWithYou],
  templateUrl: './career.html',
  styleUrl: './career.scss'
})
export class Career {

}
