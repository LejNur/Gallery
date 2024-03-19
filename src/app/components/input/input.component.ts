import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  @Input() myPlaceholder = '';
  @Input() inputClass = '';
  @Input() buttonClass = '';
  @Input() containerClass = '';

  @Output() newClickEvent = new EventEmitter<string>();

  onInput(value: string) {
    this.newClickEvent.emit(value);
  }
}
