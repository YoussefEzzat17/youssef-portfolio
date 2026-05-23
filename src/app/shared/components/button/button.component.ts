import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagneticDirective } from '../../directives/magnetic.directive';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, MagneticDirective],
  template: `
    <button
      [class]="classes"
      [disabled]="disabled"
      (click)="onClick($event)"
      [appMagnetic]="magneticStrength"
    >
      <ng-content></ng-content>
    </button>
  `,
  styles: [],
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'outline' | 'ghost' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled = false;
  @Input() className = '';
  @Input() magneticStrength = 0.2;

  @Output() click = new EventEmitter<MouseEvent>();

  get classes() {
    const base = 'inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 w-full sm:w-auto';
    
    const variants = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-600/20',
      secondary: 'bg-bg-card text-text-main border border-border-main hover:bg-border-main',
      outline: 'bg-transparent border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white',
      ghost: 'bg-transparent text-text-main hover:bg-primary-50 dark:hover:bg-primary-900/20'
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg'
    };

    return `${base} ${variants[this.variant]} ${sizes[this.size]} ${this.className}`;
  }

  onClick(event: MouseEvent) {
    if (!this.disabled) {
      this.click.emit(event);
    }
  }
}
