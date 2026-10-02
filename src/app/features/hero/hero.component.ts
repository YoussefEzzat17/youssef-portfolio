import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { HeroVisualComponent } from './hero-visual.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RevealDirective, HeroVisualComponent],
  template: `
    <section id="home" class="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      <!-- Exactly 2 Blurred Glowing Blobs -->
      <div class="absolute inset-0 z-0 pointer-events-none">
        <div
          class="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-primary-500/10 blur-[80px] animate-blob"
        ></div>
        <div
          class="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-purple-500/10 blur-[80px] animate-blob animation-delay-2000"
        ></div>
      </div>

      <div class="container mx-auto px-6 z-10 relative">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          <!-- Left Side: Content (7 cols on desktop) -->
          <div class="lg:col-span-7 flex flex-col justify-center text-left">
            <h2
              appReveal
              [delay]="100"
              class="text-primary-600 dark:text-primary-400 font-display font-semibold mb-4 tracking-widest uppercase text-xs sm:text-sm"
            >
              Available for freelance & full-time
            </h2>

            <h1
              appReveal
              [delay]="200"
              class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold mb-6 leading-tight tracking-tight text-text-main"
            >
              I'm Youssef Ezzat,<br />
              <span
                class="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-400 cursor-blink  pr-2"
              >
                {{ typedText() }}
              </span>
            </h1>

            <p
              appReveal
              [delay]="300"
              class="text-base sm:text-lg md:text-xl text-text-muted mb-8 max-w-xl leading-relaxed"
            >
              Building fast, scalable, and pixel-perfect user interfaces. Focused on performance,
              clean code, and seamless user experience.
            </p>

            <div appReveal [delay]="400" class="flex flex-col sm:flex-row gap-4">
              <app-button
                variant="primary"
                size="lg"
                (click)="scrollTo('#projects')"
                className="hover:scale-105 hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300"
              >
                View Projects
                <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  ></path>
                </svg>
              </app-button>

              <app-button
                variant="outline"
                size="lg"
                (click)="downloadCV()"
                className="hover:scale-105 hover:shadow-lg hover:shadow-primary-500/5 transition-all duration-300"
              >
                Download CV
                <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  ></path>
                </svg>
              </app-button>
            </div>
          </div>

          <!-- Right Side: Interactive 3D Visual (5 cols on desktop) -->
          <div class="lg:col-span-5 flex justify-center items-center select-none" appReveal [delay]="300">
            <app-hero-visual></app-hero-visual>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div
        class="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer z-10 block"
        (click)="scrollTo('#about')"
      >
        <svg
          class="w-6 h-6 text-text-muted hover:text-white transition-colors duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          ></path>
        </svg>
      </div>
    </section>
  `,
  styles: [],
})
export class HeroComponent implements OnInit, OnDestroy {
  typedText = signal('');
  private phrases = ['Frontend Developer', 'Angular Developer'];
  private currentPhraseIndex = 0;
  private currentCharIndex = 0;
  private isDeleting = false;
  private typingTimeoutId: any;

  ngOnInit() {
    this.type();
  }

  ngOnDestroy() {
    if (this.typingTimeoutId) {
      clearTimeout(this.typingTimeoutId);
    }
  }

  type() {
    const currentPhrase = this.phrases[this.currentPhraseIndex];

    if (this.isDeleting) {
      this.typedText.set(currentPhrase.substring(0, this.currentCharIndex - 1));
      this.currentCharIndex--;
    } else {
      this.typedText.set(currentPhrase.substring(0, this.currentCharIndex + 1));
      this.currentCharIndex++;
    }

    let typeSpeed = this.isDeleting ? 50 : 100;

    if (!this.isDeleting && this.currentCharIndex === currentPhrase.length) {
      typeSpeed = 2000; // Pause at end
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentCharIndex === 0) {
      this.isDeleting = false;
      this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length;
      typeSpeed = 500;
    }

    this.typingTimeoutId = setTimeout(() => this.type(), typeSpeed);
  }

  scrollTo(id: string) {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  downloadCV() {
    const link = document.createElement('a');
    link.href = 'Youssef-Ezzat.pdf';
    link.download = 'Youssef-Ezzat-CV.pdf';
    link.click();
  }
}
