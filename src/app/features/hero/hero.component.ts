import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RevealDirective],
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

          <!-- Right Side: Laptop Screen & Base Mockup (5 cols on desktop) -->
          <div class="lg:col-span-5 flex justify-center items-center select-none" appReveal [delay]="300">
            <div class="relative w-full max-w-lg mx-auto flex flex-col items-center group">
              <!-- Ambient Backlight Glow -->
              <div
                class="absolute -inset-4 bg-gradient-to-r from-primary-500/20 to-purple-500/20 rounded-full blur-3xl opacity-60 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none"
              ></div>

              <!-- 3D Laptop Wrapper with floating animation -->
              <div
                class="relative w-full flex flex-col items-center transform-gpu transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:-translate-y-3"
              >
                <!-- Laptop Screen / Lid -->
                <div
                  class="relative w-[88%] aspect-[16/10] bg-slate-950 border-[10px] sm:border-[12px] border-slate-800 rounded-t-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col transition-all duration-300"
                >
                  <!-- Webcam & Sensor -->
                  <div
                    class="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rounded-full flex items-center justify-center z-20"
                  >
                    <div class="w-0.5 h-0.5 bg-blue-500/40 rounded-full"></div>
                  </div>

                  <!-- Glossy Screen Reflection Overlay -->
                  <div
                    class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.07] pointer-events-none z-10"
                  ></div>

                  <!-- Code Terminal Header -->
                  <div
                    class="flex items-center justify-between px-4 py-2 sm:py-2.5 bg-slate-900/90 border-b border-white/5 select-none text-[10px] md:text-xs z-20"
                  >
                    <!-- Window Controls -->
                    <div class="flex space-x-1.5">
                      <span class="w-2.5 h-2.5 rounded-full bg-[#ff5f56] opacity-90"></span>
                      <span class="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] opacity-90"></span>
                      <span class="w-2.5 h-2.5 rounded-full bg-[#27c93f] opacity-90"></span>
                    </div>
                    <!-- Tab Info -->
                    <span class="text-slate-400 font-mono text-[10px] tracking-wider font-medium">developer.ts</span>
                    <!-- Spacing -->
                    <div class="w-10"></div>
                  </div>

                  <!-- Terminal Code Content -->
                  <div
                    class="flex-1 p-4 sm:p-5 md:p-6 font-mono text-[10px] sm:text-xs md:text-sm leading-relaxed text-left overflow-x-auto bg-slate-950 z-20"
                  >
                                  <pre class="text-slate-300"><code><span class="text-blue-400">class</span> <span class="text-emerald-400">Developer</span> &#123;
                <span class="text-purple-400">constructor</span>() &#123;
                  <span class="text-purple-400">this</span>.<span class="text-blue-400">name</span> = <span class="text-amber-300">"Youssef"</span>;
                  <span class="text-purple-400">this</span>.<span class="text-blue-400">stack</span> = [<span class="text-amber-300">"Angular"</span>, <span class="text-amber-300">"React"</span>];
                &#125;

                <span class="text-emerald-400">build</span>() &#123;
                  <span class="text-purple-400">return</span> <span class="text-amber-300">"Clean UI 🚀"</span>;
                &#125;
              &#125;</code></pre>
                  </div>
                </div>

                <!-- Laptop Screen Hinge -->
                <div
                  class="w-[76%] h-2.5 bg-gradient-to-b from-slate-800 to-slate-900 rounded-b-sm shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] z-10"
                ></div>

                <!-- Laptop Base Deck (Keyboard Area) -->
                <div
                  class="relative w-full h-3.5 sm:h-4 bg-gradient-to-b from-slate-700 to-slate-800 rounded-t-sm shadow-[0_10px_20px_rgba(0,0,0,0.3)] z-10"
                >
                  <!-- Keyboard Inset Tray with illuminated backlight -->
                  <div
                    class="absolute top-[2px] left-1/2 -translate-x-1/2 w-[82%] h-2 bg-slate-900 rounded-[1px] opacity-75 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)] keyboard-grid"
                  ></div>
                  <!-- Subtle keyboard illumination reflection -->
                  <div class="absolute inset-x-0 bottom-0 top-[2px] bg-gradient-to-t from-primary-500/10 to-transparent pointer-events-none"></div>
                </div>

                <!-- Laptop Base Bottom Face & Notch -->
                <div
                  class="relative w-full h-2.5 sm:h-3 bg-gradient-to-b from-slate-800 to-slate-900 rounded-b-xl border-t border-slate-700/20 flex justify-center items-start z-10"
                >
                  <!-- Trackpad Cutout -->
                  <div
                    class="w-[18%] h-[2.5px] bg-slate-950 rounded-b-md mx-auto shadow-[inset_0_-1px_1px_rgba(255,255,255,0.05)]"
                  ></div>
                </div>

                <!-- Realistic Floating Ground Shadow -->
                <div
                  class="w-[94%] h-3.5 bg-black/40 rounded-full blur-[6px] mt-2 group-hover:scale-90 group-hover:blur-[8px] transition-all duration-700 opacity-90"
                ></div>
              </div>
            </div>
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
