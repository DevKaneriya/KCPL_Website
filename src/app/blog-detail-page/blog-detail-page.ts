import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Blogservice } from '../../services/blogservice';
import { CommonModule } from '@angular/common';
import { ReachOut } from "../reach-out/reach-out";
import { Footer } from "../footer/footer";
import { News } from "../news/news";


@Component({
  selector: 'app-blog-detail-page',
  imports: [CommonModule, RouterModule, ReachOut, Footer, News],
  templateUrl: './blog-detail-page.html',
  styleUrl: './blog-detail-page.scss'
})
export class BlogDetailPage {

  blog: any = null;
  loading = true;
  error = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: Blogservice
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');

      if (!slug) {
        this.error = true;
        this.loading = false;
        return;
      }

      this.loading = true;
      this.blogService.getBlogDetail(slug)
        .then(res => {
          if (!res || res.error) {
            this.error = true;
            this.blog = null;
          } else {
            this.blog = res;
          }
          this.loading = false;
        })
        .catch(() => {
          this.error = true;
          this.loading = false;
        });
    });
  }
}


