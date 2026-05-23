import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-divider',
  standalone: true,
  template: `
    <div class="flex justify-center w-full -my-4 md:-my-8 relative z-10 pointer-events-none">
      <svg 
        class="w-12 h-24 md:w-16 md:h-32 text-primary-500/40 dark:text-primary-400/30 animate-float-arrow" 
        viewBox="0 0 80 120" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2.5" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      >
        <path d="M40 10 C40 30, 20 40, 20 60 C20 80, 60 80, 60 60 C60 40, 40 40, 40 105 M25 90 L40 105 L55 90"/>
      </svg>
    </div>
  `
})
export class SectionDividerComponent {
}
