import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <section id="about" class="py-12 md:py-24 overflow-hidden relative">
      <!-- Animated Background Blobs -->
      <div class="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/30 rounded-full blur-[100px] animate-blob"></div>
        <div class="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-600/30 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
        <div class="absolute bottom-1/4 left-1/2 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
      </div>

      <div class="container mx-auto px-6 relative z-10">
        <div class="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <!-- Image/Visual side (Premium 3D & Parallax) -->
          <div appReveal direction="left" class="lg:w-1/2 relative flex justify-center w-full min-h-[500px]">
            <!-- Parallax Container -->
            <div class="relative w-full max-w-[450px] transition-transform duration-200 ease-out"
                 [style.transform]="'translate(' + parallaxX() + 'px, ' + parallaxY() + 'px)'">
              
              <!-- Soft Spotlight Glow -->
              <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full blur-3xl opacity-30 bg-[radial-gradient(circle,rgba(59,130,246,0.6)_0%,transparent_70%)] pointer-events-none -z-10"></div>
              <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full blur-2xl opacity-40 bg-[radial-gradient(circle,rgba(147,51,234,0.6)_0%,transparent_70%)] pointer-events-none -z-10"></div>

              <!-- Subject Image -->
              <div class="relative z-10 animate-hero-float drop-shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                <img 
                  src="hero.png" 
                  alt="Youssef Ezzat" 
                  class="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] filter contrast-105"
                >
                <!-- Ground Shadow -->
                <div class="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[50%] h-6 bg-black/50 blur-[12px] rounded-[100%] -z-10 transition-all duration-500 hover:scale-110"></div>
              </div>

              <!-- Floating Glass Cards -->
              <!-- Card 1: Angular -->
              <div class="absolute top-[30%] -right-2 sm:-right-12 bg-bg-card/40 backdrop-blur-xl border border-white/10 p-2 sm:p-4 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] z-20 animate-float-delayed hover:scale-105 hover:bg-bg-card/60 hover:border-primary-500/50 transition-all cursor-default group scale-90 sm:scale-100 origin-right">
                <div class="flex items-center gap-2 sm:gap-4">
                  <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30 flex items-center justify-center text-red-500 shadow-lg group-hover:shadow-red-500/20 transition-all">
                    <svg viewBox="0 0 250 250" class="w-5 h-5 sm:w-7 sm:h-7 fill-current"><path d="M125 30L31.9 63.2l14.2 123.1L125 230l78.9-43.7 14.2-123.1z" fill="#dd0031"/><path d="M125 30v22.2-.1V230l78.9-43.7 14.2-123.1L125 30z" fill="#c3002f"/><path d="M125 52.1L66.8 182.6h21.7l11.7-29.2h49.4l11.7 29.2H183L125 52.1zm17 83.3h-34l17-40.9 17 40.9z" fill="#fff"/></svg>
                  </div>
                  <div>
                    <p class="text-xs sm:text-sm font-display font-bold text-gray-900 dark:text-white">Angular Developer</p>
                    <p class="text-[10px] sm:text-xs text-text-muted">Frontend</p>
                  </div>
                </div>
              </div>

              <!-- Card 2: Experience -->
              <div class="absolute bottom-[20%] -left-2 sm:-left-10 bg-bg-card/40 backdrop-blur-xl border border-white/10 p-2 sm:p-4 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] z-20 animate-hero-float hover:scale-105 hover:bg-bg-card/60 hover:border-purple-500/50 transition-all cursor-default group scale-90 sm:scale-100 origin-left">
                <div class="flex items-center gap-2 sm:gap-4">
                  <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary-500/20 to-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-lg group-hover:shadow-purple-500/20 transition-all">
                    <span class="font-display font-bold text-lg sm:text-xl">1+</span>
                  </div>
                  <div>
                    <p class="text-xs sm:text-sm font-display font-bold text-gray-900 dark:text-white">Years Exp.</p>
                    <p class="text-[10px] sm:text-xs text-text-muted">Enterprise</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Content side -->
          <div appReveal direction="right" class="lg:w-1/2">
            <h2 class="text-4xl md:text-5xl mb-8 font-display font-bold leading-[1.2]">
              Crafting seamless <br/>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-500">
                digital experiences.
              </span>
            </h2>
            
            <div class="space-y-6 text-lg text-text-muted leading-relaxed relative">
              <div class="absolute -left-6 top-2 bottom-2 w-1 bg-gradient-to-b from-primary-600 via-purple-600 to-transparent rounded-full opacity-30 hidden md:block"></div>
              
              <p>
                Hello! I'm <span class="text-gray-900 dark:text-white font-medium">Youssef Ezzat</span>, a Frontend Engineer based in Egypt. I specialize in building 
                robust and scalable web applications using modern technologies like Angular and React.
              </p>
              <p>
                My journey in tech began at Ain Shams University, where I graduated from the Faculty 
                of Computer and Information Science. I further honed my skills through the intensive 
                ITI 9-month scholarship, which provided me with deep technical expertise.
              </p>
              <p>
                Having worked as a Frontend Developer at <span class="text-primary-400 font-medium">Suez Canal Bank</span>,  I gained valuable experience in building scalable user interfaces within enterprise environments, with a strong focus on performance, security, and user experience.
              </p>
            </div>

            <!-- Enhanced Stats -->
            <div class="grid grid-cols-2 gap-6 mt-12 pt-8 border-t border-border-main/50">
              <div class="group cursor-default">
                <span class="block text-4xl font-display font-bold text-gray-900 dark:text-white group-hover:text-primary-400 transition-colors">1+</span>
                <span class="text-sm uppercase tracking-widest text-text-muted mt-2 block font-medium">Years Experience</span>
              </div>
              <div class="group cursor-default">
                <span class="block text-4xl font-display font-bold text-gray-900 dark:text-white group-hover:text-purple-400 transition-colors">15+</span>
                <span class="text-sm uppercase tracking-widest text-text-muted mt-2 block font-medium">Projects Completed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class AboutComponent {
  parallaxX = signal(0);
  parallaxY = signal(0);

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (window.innerWidth < 1024) return; // Disable parallax on mobile/tablet

    // Calculate distance from center of screen (subtle movement max 20px)
    const x = (event.clientX / window.innerWidth - 0.5) * 40;
    const y = (event.clientY / window.innerHeight - 0.5) * 40;

    this.parallaxX.set(x);
    this.parallaxY.set(y);
  }
}
