import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <section id="experience" class="py-12 md:py-24">
      <div class="container mx-auto px-6">
        <div class="text-center mb-20">
          <h2 appReveal class="text-4xl md:text-5xl mb-4">My Journey</h2>
          <p appReveal [delay]="100" class="text-text-muted max-w-2xl mx-auto">
            A timeline of my professional growth and educational background.
          </p>
        </div>

        <div class="max-w-4xl mx-auto relative">
          <!-- Center line -->
          <div
            class="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border-main md:-translate-x-1/2"
          ></div>

          <div class="space-y-12">
            @for (item of timelineItems; track item.title; let i = $index) {
              <div
                class="relative flex flex-col md:flex-row items-center"
                [class.md:flex-row-reverse]="i % 2 !== 0"
              >
                <!-- Icon -->
                <div
                  class="absolute -left-2 md:left-1/2 w-8 h-8 bg-bg-main rounded-full md:-translate-x-1/2 z-10 flex items-center justify-center text-primary-500 "
                >
                  @switch (item.iconType) {
                    @case ('work') {
                      <img src="work.png" alt="Work" class="w-7 h-7" />
                    }
                    @case ('programming') {
                      <img src="programming.png" alt="Code" class="w-7 h-7" />
                    }
                    @case ('graduated') {
                      <img src="graduated.png" alt="Education" class="w-7 h-7" />
                    }
                  }
                </div>
                <!-- Content Card -->
                <div
                  appReveal
                  [direction]="i % 2 === 0 ? 'left' : 'right'"
                  class="w-full md:w-[45%] pl-8 md:pl-0"
                >
                  <div
                    class="p-8 bg-bg-card border border-border-main rounded-3xl hover:border-primary-500/30 transition-colors"
                  >
                    <span
                      class="text-xs font-bold uppercase tracking-widest text-primary-600 mb-2 block"
                      >{{ item.date }}</span
                    >
                    <h3 class="text-xl font-display mb-1">{{ item.title }}</h3>
                    <h4 class="text-text-muted text-sm mb-4">{{ item.company }}</h4>
                    <p class="text-sm text-text-muted leading-relaxed">
                      {{ item.description }}
                    </p>

                    @if (item.certificateLink) {
                      <div class="mt-6 pt-4 border-t border-border-main/50 flex justify-end">
                        <a
                          [href]="item.certificateLink"
                          target="_blank"
                          class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300 group"
                        >
                          View Certificate
                          <svg
                            class="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2.5"
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            ></path>
                          </svg>
                        </a>
                      </div>
                    }
                  </div>
                </div>

                <!-- Empty space for desktop layout -->
                <div class="hidden md:block w-[10%]"></div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class ExperienceComponent {
  timelineItems = [
    {
      date: '2025 - Present',
      title: 'Frontend Developer',
      company: 'Suez Canal Bank',
      description:
        'Working as a Frontend Developer, contributing to the modernization of internal portals and banking applications using Angular.',
      certificateLink: undefined,
      iconType: 'work',
    },
    {
      date: '2024 - 2025',
      title: '9-Month Scholarship Participant',
      company: 'Information Technology Institute (ITI)',
      description:
        'Intensive professional training program in the Web User Interface track, Gained hands-on experience in Angular, React, Node.js, and UI/UX principles, with a strong focus on building responsive, scalable, and high-quality web applications.',
      certificateLink:
        'https://drive.google.com/file/d/1RwC_DQP3PpgfZ-SPduEiwSH0TyUkFXzr/view?usp=sharing',
      iconType: 'programming',
    },
    {
      date: '2018 - 2022',
      title: 'Computer and Information Science Graduate',
      company: 'Ain Shams University',
      description:
        "Earned my Bachelor's degree with a focus on Computer Science. Built a strong foundation in algorithms, data structures, and software engineering principles.",
      certificateLink: 'https://drive.google.com/file/d/1Q9mgBDCMZjTKROsl9-8hAwb9tm7fj1Bd/view',
      iconType: 'graduated',
    },
  ];
}
