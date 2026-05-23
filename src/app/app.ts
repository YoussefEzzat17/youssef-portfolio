import { Component, signal, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tsParticles } from 'tsparticles-engine';
import { loadSlim } from 'tsparticles-slim';
import { NavbarComponent } from './features/navbar/navbar.component';
import { HeroComponent } from './features/hero/hero.component';
import { AboutComponent } from './features/about/about.component';
import { SkillsComponent } from './features/skills/skills.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { ExperienceComponent } from './features/experience/experience.component';
import { ContactComponent } from './features/contact/contact.component';
import { FooterComponent } from './features/footer/footer.component';
import { ThemeService } from './core/services/theme.service';
import { SeoService } from './core/services/seo.service';
import { SectionDividerComponent } from './shared/components/section-divider/section-divider.component';
import { CustomContextMenuComponent } from './shared/components/custom-context-menu/custom-context-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ExperienceComponent,
    ContactComponent,
    FooterComponent,
    SectionDividerComponent,
    CustomContextMenuComponent,
  ],
  template: `
    <div class="min-h-screen bg-bg-main selection:bg-primary-600/30 relative">
      <!-- Global tsparticles container -->
      <div id="tsparticles" class="fixed inset-0 z-0 pointer-events-none"></div>

      <!-- Loading Screen -->
      @if (isLoading()) {
        <div class="fixed inset-0 z-[100] bg-bg-main flex flex-col items-center justify-center">
          <div class="relative w-40 h-40">
            <div
              class="absolute inset-0 border-4 border-primary-600/20 dark:border-primary-600/30 border-t-primary-600 dark:border-t-primary-500 rounded-full animate-spin"
            ></div>
            <div class="absolute inset-0 flex items-center justify-center font-bold text-4xl">
              <!-- Y -->
              <span class="text-primary-600 relative z-10">Y</span>
              <!-- E -->
              <span class="animate-e text-gray-900 dark:text-white ml-[-2px] e-lean ps-1">E</span>
              <!-- Dot -->
              <span class="animate-dot text-primary-600 ml-1">.</span>
            </div>
          </div>
          
          <!-- Name and Title -->
          <div class="mt-8 flex flex-col items-center">
            <h2 class="text-xl md:text-2xl font-bold tracking-[0.25em] uppercase text-gray-800 dark:text-gray-100">
              Youssef <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Ezzat</span>
            </h2>
            <div class="flex items-center gap-3 mt-3">
              <div class="w-10 h-[1px] bg-gradient-to-r from-transparent to-primary-500/50"></div>
              <span class="text-[10px] md:text-xs font-semibold tracking-[0.3em] uppercase text-gray-500 dark:text-gray-400">
                Frontend Developer
              </span>
              <div class="w-10 h-[1px] bg-gradient-to-l from-transparent to-primary-500/50"></div>
            </div>
          </div>
        </div>
      }

      <app-navbar />

      <main>
        <app-hero />
        <app-about />

        <app-section-divider/>
        <app-skills />

        <app-section-divider/>
        <app-projects />

        <app-section-divider />
        <app-experience />

        <app-section-divider/>
        <app-contact />
      </main>

      <app-footer />

      <!-- Back to Top -->
      @if (showBackToTop()) {
        <button
          (click)="scrollToTop()"
          class="fixed bottom-8 right-8 p-4 bg-primary-600 text-white rounded-full shadow-2xl hover:bg-primary-700 transition-all z-40 animate-in fade-in zoom-in"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M5 15l7-7 7 7"></path>
          </svg>
        </button>
      }

      <!-- Custom Context Menu -->
      <app-custom-context-menu />
    </div>
  `,
  styles: [],
})
export class App implements OnInit, AfterViewInit, OnDestroy {
  isLoading = signal(true);
  showBackToTop = signal(false);

  constructor(
    private themeService: ThemeService,
    private seoService: SeoService,
  ) {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.showBackToTop.set(window.scrollY > 500);
      });

      // Prevent DevTools keyboard shortcuts
      window.addEventListener('keydown', (e) => {
        const isMac = navigator.userAgent.toLowerCase().includes('mac');
        
        if (
          e.key === 'F12' || // F12
          (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) || // Ctrl+Shift+I
          (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c')) || // Ctrl+Shift+C
          (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j')) || // Ctrl+Shift+J
          (e.ctrlKey && (e.key === 'U' || e.key === 'u')) || // Ctrl+U (View Source)
          (isMac && e.metaKey && e.altKey && (e.key === 'I' || e.key === 'i')) || // Cmd+Option+I (Mac)
          (isMac && e.metaKey && e.altKey && (e.key === 'C' || e.key === 'c')) || // Cmd+Option+C (Mac)
          (isMac && e.metaKey && e.altKey && (e.key === 'J' || e.key === 'j')) || // Cmd+Option+J (Mac)
          (isMac && e.metaKey && (e.key === 'U' || e.key === 'u')) // Cmd+Option+U (Mac View Source)
        ) {
          e.preventDefault();
        }
      });
    }
  }

  ngOnInit() {
    this.seoService.setMetaTags({
      title: 'Frontend Developer',
      description:
        'Graduate of CIS - Ain Shams University. Frontend Developer specializing in Angular and React.',
      keywords: 'Angular, React, TypeScript, Frontend Developer, Egypt',
    });

    // Simulate initial load
    setTimeout(() => {
      this.isLoading.set(false);
    }, 2000);
  }

  ngAfterViewInit() {
    this.initParticles();
  }

  ngOnDestroy() {
    this.destroyParticles();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private async initParticles() {
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 768;

      // Initialize slim features of tsparticles
      await loadSlim(tsParticles);

      tsParticles.load({
        id: 'tsparticles',
        options: {
          fpsLimit: 60,
          fullScreen: { enable: false },
          particles: {
            number: {
              value: isMobile ? 25 : 55, // Slightly higher global count but still low-cost
            },
            color: {
              value: '#6366f1', // Indigo primary color
            },
            shape: {
              type: 'circle',
            },
            opacity: {
              value: 0.60,
            },
            size: {
              value: { min: 1, max: 2 },
            },
            links: {
              enable: true,
              distance: 120,
              color: '#6366f1',
              opacity: 0.1,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.5,
              direction: 'none',
              random: false,
              straight: false,
              outModes: {
                default: 'out',
              },
            },
          },
          interactivity: {
            events: {
              onHover: { enable: false },
              onClick: { enable: false },
            },
          },
          detectRetina: true,
        },
      });
    }
  }

  private destroyParticles() {
    if (typeof window !== 'undefined') {
      try {
        const container = tsParticles.dom().find((c: any) => c.id === 'tsparticles');
        if (container) {
          container.destroy();
        }
      } catch (err) {
        console.error('Error destroying particles container:', err);
      }
    }
  }
}
