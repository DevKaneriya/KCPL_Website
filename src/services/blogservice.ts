import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class Blogservice {

  private API = environment.apiUrl;

  getBlogs() {
    return fetch(`${this.API}?route=blogs_list`)
      .then(res => res.json());
  }

  getBlogDetail(slug: string) {
    return fetch(`${this.API}?route=blog_detail&slug=${slug}`)
      .then(res => res.json());
  }
  
}
