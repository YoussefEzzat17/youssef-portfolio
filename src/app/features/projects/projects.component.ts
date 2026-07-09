import { Component, signal, computed, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../core/models/project.model';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { ThemeService } from '../../core/services/theme.service';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RevealDirective, ButtonComponent],
  template: `
    <section
      id="projects"
      class="relative py-12 md:py-24 transition-colors duration-700 overflow-hidden flex flex-col items-center justify-center font-sans"
    >
      <!-- Left Navigation Button (Pushed to Viewport Edge) -->
      <button
        (click)="prevProject()"
        class="absolute max-md:hidden left-4 lg:left-8 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full border border-gray-200/80 dark:border-white/10 bg-white/70 dark:bg-[#0a0a1a]/70 hover:bg-white dark:hover:bg-[#121226] text-gray-800 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-500/50 dark:hover:border-primary-500/50 shadow-md hover:shadow-lg shadow-primary-500/5 hover:shadow-primary-500/15 dark:shadow-primary-500/10 dark:hover:shadow-primary-500/30 hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-md"
        aria-label="Previous Project"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <!-- Right Navigation Button (Pushed to Viewport Edge) -->
      <button
        (click)="nextProject()"
        class="absolute max-md:hidden right-4 lg:right-8 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full border border-gray-200/80 dark:border-white/10 bg-white/70 dark:bg-[#0a0a1a]/70 hover:bg-white dark:hover:bg-[#121226] text-gray-800 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-500/50 dark:hover:border-primary-500/50 shadow-md hover:shadow-lg shadow-primary-500/5 hover:shadow-primary-500/15 dark:shadow-primary-500/10 dark:hover:shadow-primary-500/30 hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-md"
        aria-label="Next Project"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <div class="container mx-auto px-6 relative z-10 w-full max-w-7xl">
        <div class="text-center mb-16">
          <h2
            appReveal
            class="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-400 dark:to-primary-600 drop-shadow-[0_2px_8px_var(--primary-200)] dark:drop-shadow-[0_0_12px_var(--primary-900)] transition-all duration-700"
          >
            Featured Work
          </h2>
          <p
            appReveal
            [delay]="100"
            class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-base transition-colors duration-700"
          >
            A premium collection of high-performance web applications and immersive digital
            experiences.
          </p>
        </div>

        <!-- 3D Carousel Wrapper -->
        <div class="relative w-full max-w-5xl mx-auto flex items-center justify-center">
          <!-- 3D Carousel Container -->
          <div
            #carouselContainer
            class="relative h-[540px] w-full touch-pan-y select-none"
            style="perspective: 1000px;"
            (pointerdown)="onPointerDown($event)"
            (mousemove)="onMouseMove($event)"
            (mouseleave)="onMouseLeave()"
            (mouseenter)="isHoveringContainer.set(true)"
            appReveal
            [delay]="200"
          >
            <div
              class="absolute inset-0 transition-transform duration-1000 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
              style="transform-style: preserve-3d;"
              [style.transform]="containerTransform()"
            >
              @for (project of projects; track project.id; let i = $index) {
                <div
                  class="absolute top-0 left-1/2 w-full max-w-[280px] md:max-w-[330px] h-full -translate-x-1/2 transition-all duration-[900ms] ease-[cubic-bezier(0.25,0.8,0.25,1)] cursor-pointer group"
                  [style]="getCardStyle(i)"
                  (click)="onCardClick(i)"
                  (mouseenter)="onCardHover(i)"
                  (mouseleave)="hoveredCardIndex.set(null)"
                >
                  <!-- Card Content -->
                  <div
                    class="w-full h-full bg-white/70 dark:bg-[#0a0a1a]/70 backdrop-blur-xl border border-gray-200/80 dark:border-white/10 rounded-[2rem] overflow-hidden flex flex-col relative transition-all duration-700 ease-out"
                    [class.shadow-[0_10px_25px_rgba(0,0,0,0.02)]]="!isActive(i)"
                    [class.dark:shadow-none]="!isActive(i)"
                    [class.shadow-[0_12px_32px_var(--primary-400)]]="isActive(i)"
                    [class.dark:shadow-[0_0_30px_var(--primary-600)]]="isActive(i)"
                    [class.border-primary-400/60]="isActive(i)"
                    [class.dark:border-primary-500/60]="isActive(i)"
                  >
                    <!-- Image Container -->
                    <div
                      class="h-40 md:h-44 w-full relative overflow-hidden border-b border-gray-200/40 dark:border-white/5"
                    >
                      <div
                        class="absolute inset-0 bg-gradient-to-t from-primary-400 via-transparent to-transparent dark:from-[#0a0a1a] z-10"
                      ></div>
                      <img
                        [src]="project.image"
                        [alt]="project.title"
                        class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />

                      <!-- Overlay glow on hover/active -->
                      <div
                        class="absolute inset-0 bg-primary-500/10 dark:bg-primary-500/20 mix-blend-overlay opacity-0 transition-opacity duration-700"
                        [class.opacity-100]="isActive(i)"
                      ></div>

                      <!-- View Details Hover Indicator for the active card -->
                      @if (activeIndex() === i) {
                        <div
                          class="absolute inset-0 bg-black/40 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <span
                            class="text-white text-xs md:text-sm font-bold view-details-btn py-2 px-4 rounded-full shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                          >
                            <svg
                              class="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2.5"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                            View Details
                          </span>
                        </div>
                      }
                    </div>

                    <!-- Details content -->
                    <div class="p-6 flex-grow flex flex-col z-20 relative">
                      <div class="flex flex-wrap gap-2 mb-3">
                        @for (tag of project.tags.slice(0, 3); track tag) {
                          <span
                            class="project-tag text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full backdrop-blur-md transition-colors duration-300"
                          >
                            {{ tag }}
                          </span>
                        }
                        @if (project.tags.length > 3) {
                          <span
                            class="text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200 dark:bg-white/5 dark:text-gray-400 dark:border-white/10"
                          >
                            +{{ project.tags.length - 3 }}
                          </span>
                        }
                      </div>

                      <h3
                        class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300"
                      >
                        {{ project.title }}
                      </h3>
                      <p
                        class="text-gray-600 dark:text-gray-400 text-xs md:text-sm line-clamp-3 mb-4 flex-grow leading-relaxed"
                      >
                        {{ project.description }}
                      </p>

                      <!-- Action buttons on Card -->
                      <div class="flex flex-col gap-2 mt-auto w-full md:flex-row md:gap-3">
                        <app-button
                          variant="primary"
                          size="md"
                          class="block w-full md:flex-1"
                          className="!w-full !px-4 font-bold shadow-md hover:scale-105 active:scale-95 transition-all duration-300"
                          (click)="$event.stopPropagation(); openLink(project.demo)"
                        >
                          {{ project.title.includes('Redesign') ? 'Figma' : 'Live Demo' }}
                        </app-button>
                        <app-button
                          variant="outline"
                          size="md"
                          class="block w-full md:flex-1"
                          className="!w-full !px-4 font-bold hover:scale-105 active:scale-95 transition-all duration-300"
                          (click)="$event.stopPropagation(); openLink(project.github)"
                        >
                          {{ project.title.includes('Redesign') ? 'Behance' : 'GitHub' }}
                        </app-button>
                      </div>
                    </div>

                    <!-- Ambient Glow Underlays -->
                    <div
                      class="absolute inset-0 bg-gradient-to-tr from-primary-500/0 via-primary-500/5 to-primary-500/10 pointer-events-none transition-opacity duration-700"
                      [class.opacity-100]="isActive(i)"
                      [class.opacity-0]="!isActive(i)"
                    ></div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>

        <!-- Pagination / Indicator Dots -->
        <div
          class="flex justify-center items-center gap-4 mt-10 z-20 relative"
          appReveal
          [delay]="300"
        >
          @for (project of projects; track project.id; let i = $index) {
            <button
              (click)="activeIndex.set(i)"
              class="h-2.5 rounded-full transition-all duration-500 focus:outline-none"
              [class]="
                i === activeIndex()
                  ? 'w-10 bg-primary-600 dark:bg-primary-500 shadow-[0_0_8px_var(--primary-600)] dark:shadow-[0_0_12px_var(--primary-500)]'
                  : 'w-2.5 bg-black/10 dark:bg-white/20 hover:bg-black/20 dark:hover:bg-white/40'
              "
              [attr.aria-label]="'Go to project ' + (i + 1)"
            ></button>
          }
        </div>
      </div>

      <!-- Detailed Project Modal Overlay -->
      @if (selectedProject(); as project) {
        <div
          class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/70 animate-modal-overlay"
          (click)="closeProjectDetails()"
        >
          <!-- Modal Container -->
          <div
            class="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-[2rem] bg-white dark:bg-[#0f172a] backdrop-blur-2xl border border-gray-200 dark:border-white/10 shadow-2xl p-6 md:p-10 flex flex-col md:grid md:grid-cols-12 gap-8 animate-modal-content"
            (click)="$event.stopPropagation()"
          >
            <!-- Close Button -->
            <button
              (click)="closeProjectDetails()"
              class="absolute top-4 right-4 z-[110] p-2.5 rounded-full border border-gray-200/80 dark:border-white/10 bg-white/80 dark:bg-[#0a0a1a]/80 hover:bg-red-50 dark:hover:bg-red-950/20 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-500/30 transition-all duration-300 shadow-sm"
              aria-label="Close details"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <!-- Left Column: Image, Category, Buttons -->
            <div class="md:col-span-5 flex flex-col gap-6">
              <div
                class="relative rounded-2xl overflow-hidden border border-gray-200/50 dark:border-white/10 modal-image-container aspect-video md:aspect-[4/3] bg-gray-100 dark:bg-black/30"
              >
                <img
                  [src]="project.image"
                  [alt]="project.title"
                  class="w-full h-full object-cover"
                />
                <div
                  class="absolute top-4 left-4 flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-gray-900/70 dark:bg-black/60 text-white backdrop-blur-md border border-white/20 shadow-lg"
                >
                  <span
                    class="w-1.5 h-1.5 rounded-full bg-primary-400 shadow-[0_0_8px_var(--primary-400)] animate-pulse"
                  ></span>
                  {{ project.category }}
                </div>
              </div>

              <!-- Action buttons inside Modal -->
              <div class="flex gap-2 w-full flex-row md:gap-4">
                <app-button
                  variant="primary"
                  size="md"
                  class="block w-full md:flex-1"
                  className="!w-full !px-4 font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-300 py-3"
                  (click)="openLink(project.demo)"
                >
                  {{ project.title.includes('Redesign') ? 'Figma' : 'Visit Live Site' }}
                </app-button>
                <app-button
                  variant="outline"
                  size="md"
                  class="block w-full md:flex-1"
                  className="!w-full !px-4 font-bold hover:scale-[1.02] active:scale-95 transition-all duration-300 py-3"
                  (click)="openLink(project.github)"
                >
                  {{ project.title.includes('Redesign') ? 'Behance' : 'Source Code' }}
                </app-button>
              </div>
            </div>

            <!-- Right Column: Details, Features, Tags -->
            <div class="md:col-span-7 flex flex-col gap-6 justify-center">
              <div>
                <h3
                  class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2 leading-tight"
                >
                  {{ project.title }}
                </h3>
                <div
                  class="h-1 w-20 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full"
                ></div>
              </div>

              <div>
                <p class="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                  {{ project.detailedDescription || project.description }}
                </p>
              </div>

              @if (project.features && project.features.length > 0) {
                <div>
                  <h4
                    class="text-md font-bold text-gray-800 dark:text-gray-200 mb-3 uppercase tracking-wider text-xs"
                  >
                    Key Features & Milestones
                  </h4>
                  <ul class="space-y-2">
                    @for (feature of project.features; track feature) {
                      <li
                        class="flex items-start gap-2.5 text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-normal"
                      >
                        <svg
                          class="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2.5"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{{ feature }}</span>
                      </li>
                    }
                  </ul>
                </div>
              }

              <div>
                <h4
                  class="text-md font-bold text-gray-400 dark:text-gray-500 mb-3 uppercase tracking-wider text-xs"
                >
                  Technologies Used
                </h4>
                <div class="flex flex-wrap gap-2">
                  @for (tag of project.tags; track tag) {
                    <span
                      class="project-tag text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full backdrop-blur-md"
                    >
                      {{ tag }}
                    </span>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </section>
  `,
  styles: [],
})
export class ProjectsComponent {
  public themeService = inject(ThemeService);
  activeIndex = signal(2); // Start with third project (middle of 5) active
  hoveredCardIndex = signal<number | null>(null);
  isHoveringContainer = signal(false);
  selectedProject = signal<Project | null>(null);

  mouseX = signal(0.5);
  mouseY = signal(0.5);

  carouselWidth = signal(500);
  dragOffset = signal(0);
  isDragging = signal(false);

  isPointerDown = false;
  startX = 0;
  startY = 0;
  preventClick = false;

  fractionalActiveIndex = computed(() => {
    const active = this.activeIndex();
    const offset = this.dragOffset();
    const width = this.carouselWidth();
    return active - (offset / width);
  });

  projects: Project[] = [
    {
      id: 1,
      title: 'Movie App',
      description:
        'An elegant and highly interactive movie indexing and discovery application featuring instant search, beautiful sliders, and dynamic pagination.',
      detailedDescription:
        'A reactive single-page app designed to query, index, and preview movies, series, and cast details. It leverages Context API for state management, beautiful CSS animations, and full page pagination overlays.',
      category: 'React',
      image: 'Movie2.png',
      tags: ['React', 'React Router', 'Context API', 'Bootstrap', 'Animations'],
      github: 'https://github.com/YoussefEzzat17/React-Movie',
      demo: 'https://moviereactsite.netlify.app/',
      features: [
        'Real-time search and filter with query debouncing',
        'Detailed movie information including cast list, ratings, and genre tags',
        'Dynamic infinite scroll pagination and custom carousel sliders',
        'Local storage integration for saving a personal watchlist',
        'Fully responsive layout optimized for all screen sizes',
      ],
    },
    {
      id: 2,
      title: 'Yummy Food App',
      description:
        'A delightful recipes hub and food discovery web application built to help users browse, save, and learn new cooking secrets.',
      detailedDescription:
        'A sleek client application optimized for fast delivery. It queries recipe databases to display complete ingredient listings, nutritional metrics, and preparation steps in a gorgeous CSS grid layout.',
      category: 'Other',
      image: 'Yummy1.png',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Bootstrap'],
      github: 'https://github.com/YoussefEzzat17/Yummy',
      demo: 'https://youssefezzat17.github.io/Yummy/',
      features: [
        'Comprehensive recipe database search with semantic categories',
        'Detailed ingredient lists with volume measurements and scale options',
        'Step-by-step cooking guides with interactive checkable instructions',
        'Interactive preparation time and nutritional breakdowns',
        'Bookmarks system to save favorite recipes locally',
      ],
    },
    {
      id: 3,
      title: 'VueStock Dashboard',
      description:
        'A modern dashboard to track warehouse inventory, manage store items with full-scale CRUD capabilities, and handle custom errors.',
      detailedDescription:
        'An advanced single-page application built on Vue.js to monitor stock levels, compute warehouse valuations, and process store items. Features deep integration of Vuex global state management and Vue Router navigation.',
      category: 'Other',
      image: 'VueStock.jpeg',
      tags: ['Vue.js', 'Vuex', 'Vue Router', 'Axios', 'Bootstrap'],
      github: 'https://github.com/YoussefEzzat17/Vue-CRUD-Operations',
      demo: 'https://www.linkedin.com/posts/youssef-ezzat17_vuejs-vuex-compositionapi-activity-7317935274297061377-5b4N/',
      features: [
        'Real-time stock valuation and inventory health indicators',
        'Advanced product management with full CRUD capabilities',
        'Centralized global state with Vuex for consistent data flow',
        'Dynamic filtering by categories, stock levels, and price ranges',
        'Robust custom error boundary handling and validation guards',
      ],
    },
    {
      id: 4,
      title: 'Hospital UI/UX Redesign',
      description:
        'A professional, human-centered UI/UX redesign project targeting modern healthcare websites, optimized for patient empathy and streamlined appointment flows.',
      detailedDescription:
        'This project involved comprehensive user research, customer journey mapping, wireframing, high-fidelity UI design, and interactive prototyping. The goal was to redesign a hospital portal, reducing friction for booking doctor consultations and accessing medical records.',
      category: 'Other',
      image: 'Hospital.jpeg',
      tags: ['Figma', 'UX Research', 'UI Design', 'Prototyping'],
      github: 'https://www.behance.net/gallery/220263923/Hospital-Project',
      demo: 'https://www.figma.com/proto/NofYo1GWErsFTm9x524BI7/Hospital?node-id=293-855',
      features: [
        'Complete user research, user persona profiling, and empathy mapping',
        'Optimized 3-step doctor consultation booking funnel',
        'Patient-centric medical record overview dashboard',
        'Interactive high-fidelity prototypes demonstrating micro-interactions',
        'Awwwards-inspired modern glassmorphic visual style guide',
      ],
    },
  ];

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.selectedProject()) {
      if (event.key === 'Escape') {
        this.closeProjectDetails();
      }
      return; // Freeze carousel interactions when modal is open
    }
    if (event.key === 'ArrowRight') {
      this.nextProject();
    } else if (event.key === 'ArrowLeft') {
      this.prevProject();
    }
  }

  onPointerDown(event: PointerEvent) {
    if (this.selectedProject()) return;
    if (event.button !== 0) return; // Only track left/primary clicks/taps

    const container = event.currentTarget as HTMLElement;
    if (container) {
      this.carouselWidth.set(container.clientWidth || 500);
    }

    this.isPointerDown = true;
    this.isDragging.set(false);
    this.dragOffset.set(0);
    this.startX = event.clientX;
    this.startY = event.clientY;
  }

  handlePointerMove(event: PointerEvent) {
    if (!this.isPointerDown) return;

    const deltaX = event.clientX - this.startX;

    if (!this.isDragging()) {
      const moveThreshold = 10;
      if (Math.abs(deltaX) > moveThreshold) {
        this.isDragging.set(true);
        this.hoveredCardIndex.set(null); // Clear hovered state when starting drag
      }
    }

    if (this.isDragging()) {
      this.dragOffset.set(deltaX);
    }
  }

  handlePointerEnd() {
    if (!this.isPointerDown) return;
    this.isPointerDown = false;

    const wasDragging = this.isDragging();
    if (wasDragging) {
      const offset = this.dragOffset();
      const len = this.projects.length;
      const threshold = Math.min(80, this.carouselWidth() * 0.15);

      let nextIndex = this.activeIndex();
      if (offset < -threshold) {
        // Dragged left: next slide
        nextIndex = (this.activeIndex() + 1) % len;
      } else if (offset > threshold) {
        // Dragged right: prev slide
        nextIndex = (this.activeIndex() - 1 + len) % len;
      }

      this.activeIndex.set(nextIndex);
      this.preventClick = true;
      setTimeout(() => {
        this.preventClick = false;
      }, 50);
    }

    this.isDragging.set(false);
    this.dragOffset.set(0);
  }

  @HostListener('window:pointermove', ['$event'])
  onWindowPointerMove(event: PointerEvent) {
    if (this.isPointerDown) {
      this.handlePointerMove(event);
    }
  }

  @HostListener('window:pointerup', ['$event'])
  onWindowPointerUp(event: PointerEvent) {
    if (this.isPointerDown) {
      this.handlePointerEnd();
    }
  }

  @HostListener('window:pointercancel', ['$event'])
  onWindowPointerCancel(event: PointerEvent) {
    if (this.isPointerDown) {
      this.handlePointerEnd();
    }
  }

  containerTransform = computed(() => {
    if (!this.isHoveringContainer() || this.selectedProject() || this.isDragging()) return 'rotateX(0deg) rotateY(0deg)';

    // Parallax container tilt based on normalized mouse coordinates
    const rx = (this.mouseY() - 0.5) * -12; // -6 to 6 deg
    const ry = (this.mouseX() - 0.5) * 12; // -6 to 6 deg
    return `rotateX(${rx}deg) rotateY(${ry}deg)`;
  });

  isActive(index: number) {
    if (this.hoveredCardIndex() !== null) {
      return this.hoveredCardIndex() === index;
    }
    return this.activeIndex() === index;
  }

  onCardClick(index: number) {
    if (this.preventClick) return;
    if (this.activeIndex() !== index) {
      this.activeIndex.set(index);
    } else {
      this.openProjectDetails(this.projects[index]);
    }
  }

  onCardHover(index: number) {
    if (this.selectedProject()) return;
    this.hoveredCardIndex.set(index);
  }

  nextProject() {
    if (this.selectedProject()) return;
    const len = this.projects.length;
    this.activeIndex.update((idx) => (idx + 1) % len);
  }

  prevProject() {
    if (this.selectedProject()) return;
    const len = this.projects.length;
    this.activeIndex.update((idx) => (idx - 1 + len) % len);
  }

  getCardStyle(index: number) {
    const active = this.fractionalActiveIndex();
    const len = this.projects.length;

    // Circular difference math: wraps values correctly to always map elements in symmetric [-2, 2] range
    let diff = index - active;
    const half = len / 2;
    while (diff > half) diff -= len;
    while (diff < -half) diff += len;

    const isHovering = this.isHoveringContainer() && !this.selectedProject();
    const hoveredCard = this.selectedProject() ? null : this.hoveredCardIndex();

    // Base 3D transform layers
    let translateX = diff * 80; // Overlapping horizontal position
    let rotateY = diff * -12; // Inward curved 3D rotation
    
    const absDiff = Math.abs(diff);
    let translateZ = 0;
    let scale = 1;
    let opacity = 1;

    if (isHovering) {
      translateX = diff * 96; // Spread card widths further apart for complete text scan
      rotateY = diff * -15; // Deeper rotation
      
      if (absDiff < 1) {
        translateZ = 50 - absDiff * 200; // Interpolate 50 to -150
        scale = 1.03 - absDiff * 0.22; // Interpolate 1.03 to 0.81
        opacity = 1 - absDiff * 0.60; // Interpolate 1 to 0.40
      } else {
        translateZ = absDiff * -150; // Pushed further in back
        scale = 0.85 - absDiff * 0.04; // Focused size vs side layers
        opacity = 0.55 - absDiff * 0.15; // Side elements are slightly more dimmed
      }
    } else {
      if (absDiff < 1) {
        translateZ = -absDiff * 120; // Interpolate 0 to -120
        scale = 1.0 - absDiff * 0.19; // Interpolate 1 to 0.81
        opacity = 1 - absDiff * 0.25; // Interpolate 1 to 0.75
      } else {
        translateZ = absDiff * -120;
        scale = 0.85 - absDiff * 0.04;
        opacity = 1 - absDiff * 0.25;
      }
    }

    let zIndex = Math.round(30 - absDiff);

    // Active glow intensification for the hovered card specifically
    if (hoveredCard === index) {
      translateZ += 12;
      scale += 0.01;
      opacity = 1;
      zIndex = 50; // Pop hovered card to the very front
    }

    let transitionStyle = '';
    if (this.isDragging()) {
      transitionStyle = 'transition: none !important;';
    }

    return `
      transform: translateX(calc(-50% + ${translateX}%)) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale});
      opacity: ${opacity};
      z-index: ${zIndex};
      ${transitionStyle}
    `;
  }

  onMouseMove(event: MouseEvent) {
    if (this.selectedProject() || this.isDragging()) return;
    const container = event.currentTarget as HTMLElement;
    const rect = container.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    this.mouseX.set(x);
    this.mouseY.set(y);
  }

  onMouseLeave() {
    if (this.isDragging()) return;
    this.isHoveringContainer.set(false);
    this.hoveredCardIndex.set(null);
    this.mouseX.set(0.5);
    this.mouseY.set(0.5);
  }

  openProjectDetails(project: Project) {
    this.selectedProject.set(project);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeProjectDetails() {
    this.selectedProject.set(null);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  openLink(url: string) {
    if (typeof window !== 'undefined' && url && url !== '#') {
      window.open(url, '_blank');
    }
  }
}
