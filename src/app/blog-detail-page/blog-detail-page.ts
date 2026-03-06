import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReachOut } from "../reach-out/reach-out";
import { Footer } from "../footer/footer";
import { News } from "../news/news";
import { Globalservice } from '../../services/globalservice';
import { Blog } from '../blog/blog';

@Component({
  selector: 'app-blog-detail-page',
  imports: [CommonModule, RouterModule, ReachOut, Footer, News,Blog],
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
    public global: Globalservice
  ) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {

      const slug = params.get('slug');

      if (!slug) {
        this.error = true;
        this.loading = false;
        return;
      }

      this.loadBlog(slug);

    });

  }



  private loadBlog(slug: string) {

    const checkBlog = () => {

      const blogs =
        this.global.blogDetails();

      if (!blogs || blogs.length === 0) {

        if (this.global.loading()) {
          setTimeout(checkBlog, 50);
          return;
        }

      }

      const blog =
        blogs.find(b => b.slug === slug);

      const summaryBlog =
        this.global.blogs().find(b => b.slug === slug);

      if (!blog) {
        this.error = true;
        this.blog = null;
      } else {
        this.blog = { ...summaryBlog, ...blog };
      }

      this.loading = false;

    };

    checkBlog();

  }

}


