import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="py-12 border-t border-border-main">
      <div class="container mx-auto px-6">
        <div class="flex flex-col md:flex-row justify-center items-center gap-9">
          <div class="text-2xl font-serif font-bold">
            <p class=" text-xl">
              © {{ currentYear }}
              <!-- Youssef -->
              <span class="animate-name"> <span class="text-primary-600">Y</span>oussef </span>
              <!-- Ezzat -->
              <span class="text-primary-600 animate-ezzat"> Ezzat </span>.
              <span class="max-md:block max-md:text-center">All rights reserved.</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
