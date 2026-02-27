import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../environments/environment';


export interface ProductItem {
  id: number;
  category: string;
  type: string;
  title: string;
  short_description: string;
  description: string;
  image_url: string;
}

@Injectable({
  providedIn: 'root'
})
export class Product {

  private API_URL = environment.apiUrl + '?route=products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductItem[]> {
    return this.http
      .get<{ products: ProductItem[] }>(this.API_URL)
      .pipe(
        map(res => res.products)
      );
  }

}
