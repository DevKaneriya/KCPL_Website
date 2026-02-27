import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-difference-section',
  imports: [CommonModule],
  templateUrl: './difference-section.html',
  styleUrl: './difference-section.scss'
})
export class DifferenceSection {
  currentSection: 'radiator' | 'condenser' = 'radiator';
  switchSection(direction: 'next' | 'prev') {
    this.currentSection = this.currentSection === 'radiator'
    ? 'condenser'
    : 'radiator';
  }
}
