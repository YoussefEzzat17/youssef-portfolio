import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, NgZone, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';

interface Skill {
  name: string;
  icon: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="skills" class="py-12 md:py-24 bg-bg-card/50 overflow-hidden relative">
      <div class="container mx-auto px-6 relative z-10 mb-16">
        <div class="text-center">
          <h2 class="text-4xl md:text-6xl mb-4 font-display font-bold">
            My Skills
            <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-400"
              >& Techno</span
            >
          </h2>
          <p class="text-lg md:text-xl text-text-muted max-w-2xl mx-auto">
            Explore the technologies and tools I use to build scalable, modern, and high-performance
            web applications.
          </p>
        </div>
      </div>

      <!-- Marquee Container -->
      <div
        class="relative w-full max-w-[100vw] overflow-hidden mask-edges py-10 flex flex-col gap-10"
      >
        <!-- Row 1: Fast, Left -->
        <div class="group flex overflow-hidden">
          <div #row1Ref class="flex w-max will-change-transform">
            @for (i of [1, 2, 3, 4]; track i) {
              <div #row1Content class="flex shrink-0">
                @for (skill of row1; track skill.name) {
                  <div
                    class="flex flex-col items-center justify-center gap-3 w-[140px] p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 hover:scale-110 cursor-pointer"
                  >
                    <img
                      [src]="skill.icon"
                      [alt]="skill.name"
                      class="w-14 h-14 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                    />
                    <span class="text-sm font-medium text-text-muted">{{ skill.name }}</span>
                  </div>
                }
              </div>
            }
          </div>
        </div>

        <!-- Row 2: Medium, Right -->
        <div class="group flex overflow-hidden">
          <div #row2Ref class="flex w-max will-change-transform">
            @for (i of [1, 2, 3, 4]; track i) {
              <div #row2Content class="flex shrink-0">
                @for (skill of row2; track skill.name) {
                  <div
                    class="flex flex-col items-center justify-center gap-3 w-[140px] p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 hover:scale-110 cursor-pointer"
                  >
                    <img
                      [src]="skill.icon"
                      [alt]="skill.name"
                      class="w-14 h-14 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                    />
                    <span class="text-sm font-medium text-text-muted">{{ skill.name }}</span>
                  </div>
                }
              </div>
            }
          </div>
        </div>

        <!-- Row 3: Slow, Left -->
        <div class="group flex overflow-hidden">
          <div #row3Ref class="flex w-max will-change-transform">
            @for (i of [1, 2, 3, 4]; track i) {
              <div #row3Content class="flex shrink-0">
                @for (skill of row3; track skill.name) {
                  <div
                    class="flex flex-col items-center justify-center gap-3 w-[140px] p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 hover:scale-110 cursor-pointer"
                  >
                    <img
                      [src]="skill.icon"
                      [alt]="skill.name"
                      class="w-14 h-14 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                    />
                    <span class="text-sm font-medium text-text-muted">{{ skill.name }}</span>
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class SkillsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('row1Ref', { static: false }) row1Container!: ElementRef;
  @ViewChild('row2Ref', { static: false }) row2Container!: ElementRef;
  @ViewChild('row3Ref', { static: false }) row3Container!: ElementRef;

  @ViewChild('row1Content', { static: false }) row1Content!: ElementRef;
  @ViewChild('row2Content', { static: false }) row2Content!: ElementRef;
  @ViewChild('row3Content', { static: false }) row3Content!: ElementRef;

  scrollDirection = signal<1 | -1>(-1); // -1 for scroll down (default), 1 for scroll up

  private direction = -1;
  private lastScrollY = 0;
  private ticking = false;
  private animationFrameId?: number;
  private initialized = false;

  isHovered = [false, false, false];

  private pos1 = 0;
  private pos2 = 0;
  private pos3 = 0;

  constructor(private ngZone: NgZone) {}

  row1: Skill[] = [
    {
      name: 'Angular',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg',
    },
    {
      name: 'React',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    },
    {
      name: 'Next.js',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
    },
    {
      name: 'JavaScript',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    },
    {
      name: 'TypeScript',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
    },
    {
      name: 'HTML5',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
    },
    {
      name: 'CSS3',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
    },
    {
      name: 'Tailwind',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
    },
    {
      name: 'Bootstrap',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg',
    },
    {
      name: 'Sass',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg',
    },
  ];

  row2: Skill[] = [
    {
      name: 'Node.js',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
    },
    {
      name: 'Express',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
    },
    {
      name: 'Vite',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vite/vite-original.svg',
    },
    {
      name: 'Axios',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/axios/axios-plain.svg',
    },
    {
      name: 'Redux',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg',
    },
    {
      name: 'Git',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
    },
    {
      name: 'GitHub',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
    },
    {
      name: 'Figma',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg',
    },
    {
      name: 'NPM',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg',
    },
  ];

  row3: Skill[] = [
    {
      name: 'MongoDB',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
    },
    {
      name: 'PostgreSQL',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
    },
    {
      name: 'MySQL',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
    },
    {
      name: 'Webpack',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/webpack/webpack-original.svg',
    },
    {
      name: 'Jest',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg',
    },
    {
      name: 'Framer Motion',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg',
    },
    {
      name: 'Postman',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg',
    },
    {
      name: 'Jira',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg',
    },
  ];

  ngOnInit() {
    this.lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.animate();
    });
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  animate = () => {
    const speed1 = 1;
    const speed2 = -0.9;
    const speed3 = 1;

    const w1 = this.row1Content?.nativeElement.offsetWidth || 0;
    const w2 = this.row2Content?.nativeElement.offsetWidth || 0;
    const w3 = this.row3Content?.nativeElement.offsetWidth || 0;

    // Initialize positions to -width to guarantee content is rendered on both sides of the visible window
    if (w1 > 0 && !this.initialized) {
      this.pos1 = -w1;
      this.pos2 = -w2;
      this.pos3 = -w3;
      this.initialized = true;
    }

    if (this.initialized) {
      if (!this.isHovered[0] && this.row1Container) {
        this.pos1 += speed1 * this.direction;
        this.pos1 = this.wrap(this.pos1, w1);
        this.row1Container.nativeElement.style.transform = `translateX(${this.pos1}px)`;
      }

      if (!this.isHovered[1] && this.row2Container) {
        this.pos2 += speed2 * this.direction;
        this.pos2 = this.wrap(this.pos2, w2);
        this.row2Container.nativeElement.style.transform = `translateX(${this.pos2}px)`;
      }

      if (!this.isHovered[2] && this.row3Container) {
        this.pos3 += speed3 * this.direction;
        this.pos3 = this.wrap(this.pos3, w3);
        this.row3Container.nativeElement.style.transform = `translateX(${this.pos3}px)`;
      }
    }

    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  wrap(pos: number, width: number): number {
    let newPos = pos;
    // Keep position between -width and -(width * 2)
    if (newPos >= -width) {
      newPos -= width;
    } else if (newPos <= -(width * 2)) {
      newPos += width;
    }
    return newPos;
  }

  @HostListener('window:scroll')
  onScroll() {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.updateScrollDirection();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  private updateScrollDirection() {
    const currentScrollY = window.scrollY;

    if (Math.abs(currentScrollY - this.lastScrollY) < 5) return;

    if (currentScrollY > this.lastScrollY) {
      // Scrolling down
      this.direction = -1;
      this.scrollDirection.set(-1);
    } else {
      // Scrolling up
      this.direction = 1;
      this.scrollDirection.set(1);
    }

    this.lastScrollY = currentScrollY;
  }
}
