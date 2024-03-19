import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() cardContainer = '';
  @Input() srcImg = '';
  @Input() classImg = '';
  @Input() hoverState = '';
  @Input() text = '';
  @Input() authorName = '';
  @Input() buttonClass = '';

  @Output() clickGallery = new EventEmitter<string>();

  fullScreen(img: string) {
    this.clickGallery.emit(img);
  }
}
