import { Component, Input, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink,RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header {
  constructor(public router: Router, private eRef: ElementRef) { }

  @Input() isTransparent = false;
  isVisible = true;
  isMenuOpen = false;

  isIndustrialOpen = false;

  toggleIndustrialDropdown() {
    this.isIndustrialOpen = !this.isIndustrialOpen;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.handleScroll();
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.isIndustrialOpen = false;
    this.handleScroll();
  }

  handleScroll() {
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  // Detect clicks anywhere in the document
  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent) {
    if (window.innerWidth > 991) { // adjust breakpoint to your design
      const isDesktopDropdown = this.eRef.nativeElement.querySelector('.btn-group')?.contains(event.target);
      if (!isDesktopDropdown) {
        this.isIndustrialOpen = false;
      }
    }
  }
}
