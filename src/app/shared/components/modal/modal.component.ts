import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      <!-- Backdrop -->
      <div 
        class="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        (click)="close.emit()"
      ></div>

      <!-- Content -->
      <div 
        class="relative bg-bg-main w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-border-main shadow-2xl animate-in zoom-in slide-in-from-bottom-8 duration-500"
      >
        <!-- Close Button -->
        <button 
          (click)="close.emit()"
          class="absolute top-6 right-6 p-2 rounded-full hover:bg-bg-card z-10 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [],
})
export class ModalComponent {
  @Output() close = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEscape() {
    this.close.emit();
  }
}
