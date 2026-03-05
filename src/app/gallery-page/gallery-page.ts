import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Footer } from "../footer/footer";
import { Globalservice } from '../../services/globalservice';

@Component({
  selector: 'app-gallery-page',
  standalone: true,
  imports: [CommonModule, Footer],
  templateUrl: './gallery-page.html',
  styleUrls: ['./gallery-page.scss']
})
export class GalleryPage {

  images: Array<{ name: string, url: string, category: string, updated?: string }> = [];

  categories: string[] = ['All'];

  activeCategory = signal('All');
  selectedImage = signal<string | null>(null);
  loading = signal(true);

  private pollIntervalMs = 0;
  private pollTimer: any = null;

  constructor(private global: Globalservice) {}

  ngOnInit(): void {

    this.waitForGallery();

    if (this.pollIntervalMs > 0) {
      this.pollTimer = setInterval(() => this.waitForGallery(), this.pollIntervalMs);
    }

  }

  ngOnDestroy(): void {
    if (this.pollTimer) clearInterval(this.pollTimer);
  }


  /* ============================================
     WAIT FOR GLOBALSERVICE DATA
  ============================================ */

  private waitForGallery() {

    const check = () => {

      const imgs = this.global.galleryImages();

      if (imgs && imgs.length) {

        this.images = imgs;

        this.prepareCategories();

        this.loading.set(false);

      } else {

        this.loading.set(true);

        setTimeout(check, 50);

      }

    };

    check();

  }


  /* ============================================
     CATEGORY PREPARATION
  ============================================ */

  private prepareCategories() {

    const set = new Set<string>();

    this.images.forEach((i: any) => {

      if (i.category) set.add(i.category);

    });

    this.categories = [
      'All',
      ...Array.from(set).sort()
    ];

    if (!this.categories.includes(this.activeCategory())) {
      this.activeCategory.set('All');
    }

  }


  /* ============================================
     FILTERED IMAGES
  ============================================ */

  get filteredImages() {

    const current = this.activeCategory();

    if (current === 'All') return this.images;

    return this.images.filter(
      img => img.category === current
    );

  }


  /* ============================================
     CATEGORY FILTER
  ============================================ */

  filterImages(category: string) {

    this.activeCategory.set(category);

  }


  /* ============================================
     IMAGE MODAL
  ============================================ */

  openImage(src: string) {

    this.selectedImage.set(src);

  }

  closeImage(event?: MouseEvent) {

    if (event) event.stopPropagation();

    this.selectedImage.set(null);

  }

}