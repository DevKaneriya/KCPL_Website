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

  loading = signal(true);


  /* ---------- CACHE KEY ---------- */

  private CACHE_KEY = 'app_cache_v1';


  constructor(
    private http: HttpClient,
    private productsService: Product,
    private blogsService: Blogservice,
    private jobsService: Career
  ) {}



  /* =====================================================
     LOAD EVERYTHING
  ===================================================== */

  async loadAllData() {

    try {

      /* ✅ CALL VERSIONS API DIRECTLY */
      const serverVersions:any =
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
          serverVersions.blogs_list,
          cache
        ),

        this.loadJobs(
          serverVersions.jobs,
          cache
        )

      ]);

    }
    catch(err){

      console.error(
        "Preload failed",
        err
      );

    }

    this.loading.set(false);

  }



  /* =====================================================
     PRODUCTS
  ===================================================== */

  private async loadProducts(
    serverVersion:number,
    cache:any
  ){

    if(
      cache.products &&
      cache.products.version === serverVersion
    ){

      console.log("Products from cache");

      this.products.set(
        cache.products.data
      );

      return;

    }


    console.log("Fetching products API");


    const res:any =
      await firstValueFrom(
        this.productsService
          .getProducts()
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
     BLOGS
  ===================================================== */

  private async loadBlogs(
    serverVersion:number,
    cache:any
  ){

    if(
      cache.blogs &&
      cache.blogs.version === serverVersion
    ){

      console.log("Blogs from cache");

      this.blogs.set(
        cache.blogs.data
      );

      return;

    }


    console.log("Fetching blogs API");


    const res:any =
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
     JOBS
  ===================================================== */

  private async loadJobs(
    serverVersion:number,
    cache:any
  ){

    if(
      cache.jobs &&
      cache.jobs.version === serverVersion
    ){

      console.log("Jobs from cache");

      this.jobs.set(
        cache.jobs.data
      );

      return;

    }


    console.log("Fetching jobs API");


    const res:any =
      await firstValueFrom(
        this.jobsService.getActiveJobs()
      );


    const data = res ;


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

  private getCache():any {

    const raw =
      localStorage.getItem(
        this.CACHE_KEY
      );

    return raw
      ? JSON.parse(raw)
      : {};

  }



  private saveCache(cache:any){

    localStorage.setItem(

      this.CACHE_KEY,
      JSON.stringify(cache)

    );

  }

}
