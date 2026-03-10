import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { Blogservice } from '../services/blogservice';
import { Product } from '../services/product';
import { Career } from '../services/career';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Globalservice {

  /* ---------- GLOBAL SIGNAL STORES ---------- */

  products = signal<any[]>([]);
  blogs = signal<any[]>([]);
  jobs = signal<any[]>([]);
  blogDetails = signal<any[]>([]);
  galleryImages = signal<any[]>([]);

  loading = signal(true);


  /* ---------- CACHE KEY ---------- */

  private CACHE_KEY = 'app_cache_v1';


  constructor(
    private http: HttpClient,
    private productsService: Product,
    private blogsService: Blogservice,
    private jobsService: Career
  ) { }



  /* =====================================================
     LOAD EVERYTHING
  ===================================================== */

  async loadAllData() {

    try {

      const serverVersions: any =
        await firstValueFrom(
          this.http.get(
            `${environment.apiUrl}?route=versions`
          )
        );

      const cache =
        this.getCache();


      await Promise.all([

        this.loadProducts(
          serverVersions.products,
          cache
        ),

        this.loadBlogs(
          serverVersions.blogs,
          cache
        ),

        this.loadJobs(
          serverVersions.jobs,
          cache
        ),

        this.loadGallery()

      ]);

      await this.loadBlogDetails(
        serverVersions.blogs,
        cache
      );

    }
    catch (err) {

      console.error(
        "Preload failed",
        err
      );

    }

    this.loading.set(false);

  }



  /* =====================================================
     GALLERY
  ===================================================== */

  private async loadGallery() {

  const GDRIVE_LIST_URL =
    'https://script.google.com/macros/s/AKfycbytiV4Jt-inDTy9YmjhBgbeWZBc7yEs1gwNVXD-yunZ8MWGoD3ymZM7jBkOkw82Q-af/exec';



  try {

    const res = await fetch(GDRIVE_LIST_URL, {
      cache: "no-store"
    });

    const json = await res.json();

    const raw = json.images || [];

    const normalized = raw.map((it: any) => {

      const name =
        it.name || (it.fileName || '').toString();

      const url =
        it.url || (it.imageUrl || it.fileUrl || '');

      let category = it.category || '';

      if (!category) {

        const parts = name.split('__');

        if (parts.length > 1 && parts[0].trim() !== '') {

          category = parts[0].trim();

        } else {

          category = 'Uncategorized';

        }

      }

      return {
        name,
        url,
        category,
        updated: it.updated || it.timestamp || null
      };

    });


    const withDates =
      normalized.filter((i: any) => i.updated);

    if (withDates.length) {

      normalized.sort((a: any, b: any) => {

        const da =
          new Date(a.updated || 0).getTime();

        const db =
          new Date(b.updated || 0).getTime();

        return db - da;

      });

    }

    this.galleryImages.set(normalized);

  }
  catch (err) {

    console.error("Gallery load failed", err);

  }

}



  /* =====================================================
     PRODUCTS
  ===================================================== */

  private async loadProducts(
    serverVersion: number,
    cache: any
  ) {

    if (
      cache.products &&
      cache.products.version === serverVersion
    ) {

      this.products.set(
        cache.products.data
      );

      return;

    }




    const res: any =
      await firstValueFrom(
        this.productsService.getProducts()
      );


    const data =
      res.products || res;


    this.products.set(data);


    cache.products = {

      version: serverVersion,
      data: data

    };


    this.saveCache(cache);

  }



  /* =====================================================
     BLOG LIST
  ===================================================== */

  private async loadBlogs(
    serverVersion: number,
    cache: any
  ) {

    if (
      cache.blogs &&
      cache.blogs.version === serverVersion
    ) {

      this.blogs.set(
        cache.blogs.data
      );

      return;

    }





    const res: any =
      await this.blogsService.getBlogs();


    const data =
      res.blogs || [];


    this.blogs.set(data);


    cache.blogs = {

      version: serverVersion,
      data: data

    };


    this.saveCache(cache);

  }



  /* =====================================================
     BLOG DETAILS (NEW)
  ===================================================== */

  private async loadBlogDetails(
    serverVersion: number,
    cache: any
  ) {

    if (
      cache.blogDetails &&
      cache.blogDetails.version === serverVersion
    ) {

      this.blogDetails.set(
        cache.blogDetails.data
      );

      return;

    }





    const blogs =
      this.blogs();


    const requests =
      blogs.map(blog =>
        this.blogsService.getBlogDetail(
          blog.slug
        )
      );


    const results =
      await Promise.all(requests);


    const data =
      results.map((r: any) => r);


    this.blogDetails.set(data);


    cache.blogDetails = {

      version: serverVersion,
      data: data

    };


    this.saveCache(cache);

  }



  /* =====================================================
     JOBS
  ===================================================== */

  private async loadJobs(
    serverVersion: number,
    cache: any
  ) {

    if (
      cache.jobs &&
      cache.jobs.version === serverVersion
    ) {

      this.jobs.set(
        cache.jobs.data
      );

      return;

    }




    const res: any =
      await firstValueFrom(
        this.jobsService.getActiveJobs()
      );


    const data = res;


    this.jobs.set(data);


    cache.jobs = {

      version: serverVersion,
      data: data

    };


    this.saveCache(cache);

  }



  /* =====================================================
     CACHE HELPERS
  ===================================================== */

  private getCache(): any {

    const raw =
      localStorage.getItem(
        this.CACHE_KEY
      );

    return raw
      ? JSON.parse(raw)
      : {};

  }



  private saveCache(cache: any) {

    localStorage.setItem(

      this.CACHE_KEY,
      JSON.stringify(cache)

    );

  }

}
