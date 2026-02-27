import { Component } from '@angular/core';
import { ProductCondensersType } from "../product-condensers-type/product-condensers-type";
import { ProductRadiatorType } from "../product-radiator-type/product-radiator-type";
import { ReachOut } from "../reach-out/reach-out";
import { Footer } from "../footer/footer";
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-product-page',
  imports: [ProductCondensersType, ProductRadiatorType, ReachOut, Footer, RouterLink],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss'
})
export class ProductPage {

  constructor(private router: Router) { }

  navRadiator() {
    this.router.navigate(['product/radiator']);
  }

  navCondensor() {
    this.router.navigate(['product/condensor']);
  }

}
