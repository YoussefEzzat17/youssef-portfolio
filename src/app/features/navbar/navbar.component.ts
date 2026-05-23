import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, ColorTheme } from '../../core/services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav
      class="fixed top-0 left-0 w-full z-50 transition-all duration-500"
      [class.py-4]="!isScrolled()"
      [class.py-2]="isScrolled()"
      [class.bg-bg-main/80]="isScrolled()"
      [class.backdrop-blur-lg]="isScrolled()"
      [class.border-b]="isScrolled()"
      [class.border-border-main]="isScrolled()"
    >
      <div class="container mx-auto px-6 flex items-center justify-between">
        <!-- Logo -->
        <a href="#" class="text-2xl font-display font-bold group">
          <div class="flex items-center font-bold text-2xl">
            <span class="animate-y text-primary-600 relative z-10">Y</span>
            <span class="animate-e text-gray-900 dark:text-white ml-[-2px] e-lean ps-1">E</span>
            <span class="animate-dot text-primary-600 ml-1">.</span>
          </div>
        </a>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-10">
          @for (link of navLinks; track link.name) {
            <a
              [href]="link.path"
              class="nav-link"
              [class.nav-link--active]="activeSection() === link.id"
            >
              <span class="nav-link__text">{{ link.name }}</span>
              <span class="nav-link__bar"></span>
            </a>
          }
        </div>

        <!-- Actions -->
        <div class="flex items-center space-x-4">
          <!-- Color Themes -->
          <div class="flex items-center bg-bg-card border border-border-main rounded-full p-1 space-x-1">
            @for (color of colors; track color.id) {
              <button
                (click)="themeService.setColorTheme(color.id)"
                [class]="'w-6 h-6 rounded-full transition-transform hover:scale-110 ' + color.bg"
                [class.ring-2]="themeService.colorTheme() === color.id"
                [class.ring-primary-600]="themeService.colorTheme() === color.id"
                [title]="color.name"
              ></button>
            }
          </div>

          <!-- Dark Mode Toggle -->
          <button
            (click)="themeService.toggleTheme()"
            class="p-2 rounded-full hover:bg-bg-card border border-border-main transition-colors"
          >
            @if (themeService.theme() === 'dark') {
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                   fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" /><path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" /><path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
              </svg>
            } @else {
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                   fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            }
          </button>

          <!-- Mobile Menu Toggle -->
          <button class="md:hidden p-2" (click)="isMenuOpen.set(!isMenuOpen())">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </nav>

    <!-- Mobile Menu Overlay -->
    @if (isMenuOpen()) {
      <!-- Backdrop -->
      <div
        class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden fade-in-overlay"
        (click)="isMenuOpen.set(false)"
      ></div>

      <!-- Right Side Drawer -->
      <div
        class="fixed inset-y-0 right-0 w-64 sm:w-72 bg-bg-main/95 backdrop-blur-xl border-l border-white/10 dark:border-white/5 shadow-2xl z-[70] md:hidden flex flex-col slide-in-right"
      >
        <!-- Drawer Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-white/10 mt-2">
          <span class="font-bold text-sm tracking-[0.2em] uppercase text-white">
               MENU
          </span>
          <button
            (click)="isMenuOpen.set(false)"
            class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-white dark:text-gray-400 hover:text-primary-600 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Drawer Links -->
        <div class="flex flex-col p-6 space-y-6 flex-grow overflow-y-auto">
          @for (link of navLinks; track link.name) {
            <a
              [href]="link.path"
              (click)="isMenuOpen.set(false)"
              class="mobile-nav-link text-white dark:text-text-main"
              [class.mobile-nav-link--active]="activeSection() === link.id"
            >
              <span class="mobile-nav-link__bar"></span>
              {{ link.name }}
            </a>
          }
        </div>

        <!-- Drawer Footer -->
        <div class="p-6 border-t border-gray-200/50 dark:border-white/10">
          <p class="text-xs text-gray-500 dark:text-gray-500 text-center tracking-widest uppercase">
            Youssef Ezzat
          </p>
        </div>
      </div>
    }
  `,
  styles: [],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isScrolled   = signal(false);
  isMenuOpen   = signal(false);
  activeSection = signal<string>('home');

  navLinks = [
    { name: 'Home',       path: '#',           id: 'home' },
    { name: 'About',      path: '#about',      id: 'about' },
    { name: 'Skills',     path: '#skills',     id: 'skills' },
    { name: 'Projects',   path: '#projects',   id: 'projects' },
    { name: 'Experience', path: '#experience', id: 'experience' },
    { name: 'Contact',    path: '#contact',    id: 'contact' },
  ];

  colors: { id: ColorTheme; name: string; bg: string }[] = [
    { id: 'blue',   name: 'Blue',   bg: 'bg-blue-500' },
    { id: 'purple', name: 'Purple', bg: 'bg-purple-500' },
    { id: 'green',  name: 'Green',  bg: 'bg-green-500' },
  ];

  private observer: IntersectionObserver | null = null;

  constructor(public themeService: ThemeService) {}

  ngOnInit() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.isScrolled.set(window.scrollY > 50);
      });
      // Give the DOM time to render all sections
      setTimeout(() => this.initSectionObserver(), 400);
    }
  }

  private initSectionObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry that is most visible
        const best = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (best) {
          this.activeSection.set(best.target.id);
        }
      },
      {
        root: null,
        threshold: [0.2, 0.4, 0.6],
        rootMargin: '-10% 0px -35% 0px',
      }
    );

    this.navLinks.forEach(link => {
      const el = document.getElementById(link.id);
      if (el) {
        this.observer!.observe(el);
      }
    });
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
