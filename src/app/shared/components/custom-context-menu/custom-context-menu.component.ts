import { Component, HostListener, signal, ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-custom-context-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isVisible()) {
      <!-- Backdrop Blur Overlay -->
      <div 
        class="fixed inset-0 z-[9998] bg-bg-main/5 backdrop-blur-[1px] transition-all duration-300"
        (click)="closeMenu()"
        (contextmenu)="$event.preventDefault(); closeMenu()"
      ></div>

      <!-- Context Menu -->
      <div 
        #menuRef
        class="fixed z-[9999] min-w-[240px] p-2 rounded-2xl bg-white/70 dark:bg-black/60 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-200 animate-in fade-in zoom-in-95 origin-top-left"
        [style.left.px]="x()"
        [style.top.px]="y()"
        (click)="$event.stopPropagation()"
        (contextmenu)="$event.preventDefault()"
      >
        <div class="flex flex-col space-y-1">
          <!-- Contact Me -->
          <a href="#contact" (click)="closeMenu()" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-white/50 dark:hover:bg-white/10 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 group relative overflow-hidden">
            <span class="text-lg group-hover:scale-110 transition-transform duration-200">📩</span>
            <span class="relative z-10">Contact Me</span>
          </a>

          <!-- LinkedIn -->
          <a href="https://www.linkedin.com/in/youssef-ezzat17/" target="_blank" rel="noopener noreferrer" (click)="closeMenu()" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-white/50 dark:hover:bg-white/10 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 group relative overflow-hidden">
            <span class="text-lg group-hover:scale-110 transition-transform duration-200">💼</span>
            <span class="relative z-10">LinkedIn</span>
          </a>

          <!-- GitHub -->
          <a href="https://github.com/YoussefEzzat17" target="_blank" rel="noopener noreferrer" (click)="closeMenu()" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-white/50 dark:hover:bg-white/10 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 group relative overflow-hidden">
            <span class="text-lg group-hover:scale-110 transition-transform duration-200">🐱</span>
            <span class="relative z-10">GitHub</span>
          </a>

          <!-- Divider -->
          <div class="h-px w-full bg-gray-200/50 dark:bg-white/10 my-1"></div>

          <!-- Download CV -->
          <a href="Youssef-Ezzat.pdf" download="Youssef-Ezzat-CV.pdf"  (click)="closeMenu()" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-white/50 dark:hover:bg-white/10 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 group relative overflow-hidden">
            <span class="text-lg group-hover:scale-110 transition-transform duration-200">📄</span>
            <span class="relative z-10">Download CV</span>
          </a>

          <!-- Divider -->
          <div class="h-px w-full bg-gray-200/50 dark:bg-white/10 my-1"></div>

          <!-- Toggle Dark Mode -->
          <button (click)="toggleTheme()" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-white/50 dark:hover:bg-white/10 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 group relative overflow-hidden text-left w-full">
            <span class="text-lg group-hover:scale-110 transition-transform duration-200">
              {{ themeService.theme() === 'dark' ? '☀️' : '🌙' }}
            </span>
            <span class="relative z-10">Toggle {{ themeService.theme() === 'dark' ? 'Light' : 'Dark' }} Mode</span>
          </button>
        </div>
      </div>
    }
  `,
  styles: [],
})
export class CustomContextMenuComponent {
  isVisible = signal(false);
  x = signal(0);
  y = signal(0);

  themeService = inject(ThemeService);

  @ViewChild('menuRef') menuRef!: ElementRef<HTMLDivElement>;

  @HostListener('window:contextmenu', ['$event'])
  onContextMenu(event: MouseEvent) {
    event.preventDefault();

    this.isVisible.set(true);

    // Initial position before calculation to render it
    this.x.set(event.clientX);
    this.y.set(event.clientY);

    // Wait for the next tick to calculate actual dimensions
    setTimeout(() => {
      if (!this.menuRef) return;

      const menu = this.menuRef.nativeElement;
      const menuWidth = menu.offsetWidth;
      const menuHeight = menu.offsetHeight;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      let newX = event.clientX;
      let newY = event.clientY;

      // Smart positioning to prevent overflow
      if (newX + menuWidth > windowWidth - 16) {
        newX = windowWidth - menuWidth - 16;
      }

      if (newY + menuHeight > windowHeight - 16) {
        newY = windowHeight - menuHeight - 16;
      }

      this.x.set(newX);
      this.y.set(newY);
    });
  }

  @HostListener('window:click')
  @HostListener('window:scroll')
  @HostListener('window:resize')
  closeMenu() {
    if (this.isVisible()) {
      this.isVisible.set(false);
    }
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.closeMenu();
  }
}
