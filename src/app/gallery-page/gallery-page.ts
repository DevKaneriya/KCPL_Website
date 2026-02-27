import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-gallery-page',
  standalone: true,
  imports: [CommonModule, Footer],
  templateUrl: './gallery-page.html',
  styleUrls: ['./gallery-page.scss']
})
export class GalleryPage {

  GDRIVE_LIST_URL = 'https://script.google.com/macros/s/AKfycbytiV4Jt-inDTy9YmjhBgbeWZBc7yEs1gwNVXD-yunZ8MWGoD3ymZM7jBkOkw82Q-af/exec';

  
  images: Array<{ name: string, url: string, category: string, updated?: string }> = [];

  
  categories: string[] = ['All'];

  
  activeCategory = signal('All');
  selectedImage = signal<string | null>(null);
  loading = signal(false);

  
  private pollIntervalMs = 0; 
  private pollTimer: any = null;

  constructor() { }

  ngOnInit(): void {
    this.loadGallery();

    if (this.pollIntervalMs > 0) {
      this.pollTimer = setInterval(() => this.loadGallery(), this.pollIntervalMs);
    }
  }

  ngOnDestroy(): void {
    if (this.pollTimer) clearInterval(this.pollTimer);
  }

  
  async loadGallery() {
    this.loading.set(true);
    try {
      const res = await fetch(this.GDRIVE_LIST_URL, { cache: "no-store" });
      
      if (!res.ok) {
        console.error('Apps Script returned non-OK status', res.status);
        this.images = [];
        this.categories = ['All'];
        return;
      }

      const json = await res.json();
      if (json.error) {
        console.error('Apps Script error:', json.error);
        this.images = [];
        this.categories = ['All'];
        return;
      }

      const raw = json.images || [];
      
      const normalized = raw.map((it: any) => {
        const name: string = it.name || (it.fileName || '').toString();
        const url: string = it.url || (it.imageUrl || it.fileUrl || '');
        let category: string = it.category || '';

        
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

      
      const withDates = normalized.filter((i: any) => i.updated);
      if (withDates.length) {
        normalized.sort((a: any, b: any) => {
          const da = new Date(a.updated || 0).getTime();
          const db = new Date(b.updated || 0).getTime();
          return db - da;
        });
      }

      this.images = normalized;

      
      const set = new Set<string>();
      normalized.forEach((i: any) => {
        if (i.category) set.add(i.category);
      });
      this.categories = ['All', ...Array.from(set).sort()];

      
      if (!this.categories.includes(this.activeCategory())) {
        this.activeCategory.set('All');
      }

      console.log('Gallery images loaded:', this.images);
      console.log('First image URL:', this.images?.[0]?.url);

    } catch (err) {
      console.error('Failed to load gallery', err);
      this.images = [];
      this.categories = ['All'];
    } finally {
      this.loading.set(false);
    }
  }

  // getter equivalent: filtered images based on activeCategory
  get filteredImages() {
    const current = this.activeCategory();
    if (current === 'All') return this.images;
    return this.images.filter(img => img.category === current);
  }

  filterImages(category: string) {
    this.activeCategory.set(category);
  }

  openImage(src: string) {
    this.selectedImage.set(src);
  }

  closeImage(event?: MouseEvent) {
    if (event) event.stopPropagation();
    this.selectedImage.set(null);
  }

}
