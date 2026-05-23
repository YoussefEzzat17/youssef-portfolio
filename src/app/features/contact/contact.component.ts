import { Component, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { ContactService } from '../../core/services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonComponent, RevealDirective],
  template: `
    <section id="contact" class="py-12 md:py-24 bg-bg-card/30">
      <div class="container mx-auto px-6">
        <div class="max-w-5xl mx-auto">
          <div class="flex flex-col lg:flex-row gap-16">
            <!-- Contact Info -->
            <div appReveal direction="left" class="lg:w-1/3">
              <h2 class="text-4xl md:text-5xl mb-6">Let's build something great.</h2>
              <p class="text-text-muted mb-10 leading-relaxed">
                I'm currently available for new projects and collaborations. Whether you have a
                question or just want to say hi, I'll try my best to get back to you!
              </p>

              <div class="space-y-6">
                <div class="flex items-center gap-4">
                  <div
                    class="w-12 h-12 rounded-full bg-primary-600/10 flex items-center justify-center text-primary-600"
                  >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <span class="block text-xs uppercase tracking-widest text-text-muted"
                      >Email me</span
                    >
                    <a
                      href="mailto:ezzatyoussef79@gmail.com"
                      class="font-medium hover:text-primary-600 transition-colors"
                      >ezzatyoussef79&#64;gmail.com</a
                    >
                  </div>
                </div>

                <div class="flex items-center gap-4">
                  <div
                    class="w-12 h-12 rounded-full bg-primary-600/10 flex items-center justify-center text-primary-600"
                  >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <span class="block text-xs uppercase tracking-widest text-text-muted"
                      >Location</span
                    >
                    <span class="font-medium">Cairo, Egypt</span>
                  </div>
                </div>
              </div>

              <div class="flex gap-7 mt-12 max-md:justify-center">
                @for (social of socials; track social.name) {
                  <div
                    class="relative group"
                    (mouseenter)="
                      social.previews && startPreviewAnimation(social.name, social.previews.length)
                    "
                    (mouseleave)="social.previews && stopPreviewAnimation(social.name)"
                  >
                    <!-- Preview Card -->
                    @if (social.previews) {
                      <div
                        class="absolute bottom-full left-1/2 -translate-x-1/2 mb-5
                                w-72 aspect-video rounded-3xl overflow-hidden
                                border border-white/10
                                bg-bg-card/60 backdrop-blur-xl
                                shadow-2xl shadow-black/40
                                opacity-0 scale-95 translate-y-3
                                group-hover:opacity-100
                                group-hover:scale-100
                                group-hover:translate-y-0
                                transition-all duration-500
                                pointer-events-none z-50"
                      >
                        <!-- Image -->
                        <div class="relative w-full h-full overflow-hidden">
                          @for (preview of social.previews; track preview; let i = $index) {
                            <img
                              [src]="preview"
                              [alt]="social.name"
                              class="absolute inset-0 w-full h-full object-cover transition-all duration-[1800ms] ease-in-out group-hover:scale-110"
                              [ngClass]="
                                currentPreviewIndexes[social.name] === i
                                  ? 'opacity-100 scale-100 z-10'
                                  : 'opacity-0 scale-105 z-0'
                              "
                            />
                          }
                        </div>
                      </div>
                    }

                    <!-- Social Icon -->
                    <a
                      [href]="social.link"
                      target="_blank"
                      class="w-10 h-10 rounded-full
                              flex items-center justify-center
                              hover:scale-110 hover:-translate-y-1
                              transition-all duration-300
                              overflow-hidden"
                      [title]="social.name"
                    >
                      <img
                        [src]="social.icon"
                        [alt]="social.name"
                        class="w-full h-full object-contain"
                        [ngClass]="{
                          'dark:invert': social.name === 'GitHub',
                        }"
                      />
                    </a>
                  </div>
                }
              </div>
            </div>

            <!-- Contact Form -->
            <div
              appReveal
              direction="right"
              class="lg:w-2/3 bg-bg-main p-8 md:p-12 rounded-3xl border border-border-main shadow-xl"
            >
              <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Name Field -->
                  <div class="space-y-2">
                    <label class="text-sm font-medium ml-1">Name</label>
                    <input
                      type="text"
                      formControlName="name"
                      placeholder="Youssef Ezzat"
                      [class]="getInputClasses('name')"
                    />
                    @if (isFieldInvalid('name')) {
                      <div
                        class="text-xs text-red-500 ml-1 mt-1 animate-in fade-in slide-in-from-top-1"
                      >
                        @if (contactForm.get('name')?.errors?.['required']) {
                          <span>Name is required</span>
                        }
                        @if (contactForm.get('name')?.errors?.['minlength']) {
                          <span>Name must be at least 3 characters</span>
                        }
                      </div>
                    }
                  </div>

                  <!-- Email Field -->
                  <div class="space-y-2">
                    <label class="text-sm font-medium ml-1">Email</label>
                    <input
                      type="email"
                      formControlName="email"
                      placeholder="Youssef@example.com"
                      [class]="getInputClasses('email')"
                    />
                    @if (isFieldInvalid('email')) {
                      <div
                        class="text-xs text-red-500 ml-1 mt-1 animate-in fade-in slide-in-from-top-1"
                      >
                        @if (contactForm.get('email')?.errors?.['required']) {
                          <span>Email is required</span>
                        }
                        @if (contactForm.get('email')?.errors?.['email']) {
                          <span>Please enter a valid email address</span>
                        }
                      </div>
                    }
                  </div>
                </div>

                <!-- Subject Field -->
                <div class="space-y-2">
                  <label class="text-sm font-medium ml-1">Subject</label>
                  <input
                    type="text"
                    formControlName="subject"
                    placeholder="Project Inquiry"
                    [class]="getInputClasses('subject')"
                  />
                  @if (isFieldInvalid('subject')) {
                    <div
                      class="text-xs text-red-500 ml-1 mt-1 animate-in fade-in slide-in-from-top-1"
                    >
                      Subject is required
                    </div>
                  }
                </div>

                <!-- Message Field -->
                <div class="space-y-2">
                  <label class="text-sm font-medium ml-1">Message</label>
                  <textarea
                    rows="5"
                    formControlName="message"
                    placeholder="Tell me about your project..."
                    [class]="getInputClasses('message') + ' resize-none'"
                  ></textarea>
                  @if (isFieldInvalid('message')) {
                    <div
                      class="text-xs text-red-500 ml-1 mt-1 animate-in fade-in slide-in-from-top-1"
                    >
                      @if (contactForm.get('message')?.errors?.['required']) {
                        <span>Message is required</span>
                      }
                      @if (contactForm.get('message')?.errors?.['minlength']) {
                        <span>Message must be at least 10 characters</span>
                      }
                    </div>
                  }
                </div>

                <app-button
                  type="submit"
                  variant="primary"
                  size="lg"
                  class="w-full"
                  [disabled]="isSubmitting() || contactForm.invalid || isCooldown()"
                >
                  <div class="flex items-center justify-center gap-2">
                    @if (isSubmitting()) {
                      <svg
                        class="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    }
                    <span>
                      @if (isSubmitting()) {
                        Sending...
                      } @else if (isCooldown()) {
                        Wait {{ cooldownRemaining() }}s
                      } @else {
                        Send Message
                      }
                    </span>
                  </div>
                </app-button>
              </form>

              <!-- Feedback Messages -->
              <div class="mt-6 space-y-4">
                @if (isSuccess()) {
                  <div
                    class="p-4 bg-green-500/10 border border-green-500/20 text-green-600 rounded-2xl text-center animate-in fade-in slide-in-from-bottom-2"
                  >
                    Thank you! Your message has been sent successfully.
                  </div>
                }

                @if (isError()) {
                  <div
                    class="p-4 bg-red-500/10 border border-red-500/20 text-red-600 rounded-2xl text-center animate-in fade-in slide-in-from-bottom-2"
                  >
                    Oops! Something went wrong. Please try again or email me directly.
                  </div>
                }

                @if (isCooldown() && !isSuccess()) {
                  <div
                    class="p-4 bg-blue-500/10 border border-blue-500/20 text-blue-600 rounded-2xl text-center animate-in fade-in slide-in-from-bottom-2"
                  >
                    Please wait {{ cooldownRemaining() }} seconds before sending another message.
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class ContactComponent implements OnDestroy {
  contactForm: FormGroup;
  isSubmitting = signal(false);
  isSuccess = signal(false);
  isError = signal(false);

  // Rate Limiting
  isCooldown = signal(false);
  cooldownRemaining = signal(0);
  private cooldownInterval: any;
  private readonly COOLDOWN_TIME = 10; // seconds
  currentPreviewIndexes: { [key: string]: number } = {};
  previewIntervals: { [key: string]: any } = {};

  socials = [
    {
      name: 'LinkedIn',
      link: 'https://www.linkedin.com/in/youssef-ezzat17/',
      icon: 'linkedin.png',
      previews: ['linkedin1.jpeg', 'linkedin2.jpeg', 'linkedin3.jpeg'],
    },
    {
      name: 'GitHub',
      link: 'https://github.com/YoussefEzzat17',
      icon: 'github.png',
      previews: ['github1.jpeg', 'github2.jpeg', 'github3.jpeg'],
    },
    {
      name: 'Facebook',
      link: 'https://www.facebook.com/Youssef.Ezzat17',
      icon: 'facebook.png',
      previews: ['facebook1.jpeg', 'facebook2.jpeg', 'facebook3.jpeg'],
    },
    {
      name: 'Instagram',
      link: 'https://www.instagram.com/youssefezzat___',
      icon: 'instagram.png',
      previews: ['instagram1.jpeg', 'instagram2.jpeg', 'instagram3.jpeg'],
    },
    {
      name: 'WhatsApp',
      link: 'https://wa.me/201032433827',
      icon: 'mobile.png',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnDestroy() {
    this.clearCooldown();

    Object.keys(this.previewIntervals).forEach((key) => {
      clearInterval(this.previewIntervals[key]);
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.contactForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  isFieldValid(field: string): boolean {
    const control = this.contactForm.get(field);
    return !!(control && control.valid && (control.dirty || control.touched));
  }

  getInputClasses(field: string): string {
    const base =
      'w-full px-5 py-4 bg-bg-card border rounded-2xl outline-none transition-all focus:ring-2';
    if (this.isFieldInvalid(field)) {
      return `${base} border-red-500 focus:ring-red-500/20`;
    }
    if (this.isFieldValid(field)) {
      return `${base} border-green-500 focus:ring-green-500/20`;
    }
    return `${base} border-border-main focus:ring-primary-500 focus:border-transparent`;
  }
  startPreviewAnimation(name: string, total: number) {
    this.stopPreviewAnimation(name);

    this.previewIntervals[name] = setInterval(() => {
      this.currentPreviewIndexes[name] = ((this.currentPreviewIndexes[name] || 0) + 1) % total;
    }, 2200);
  }

  stopPreviewAnimation(name: string) {
    if (this.previewIntervals[name]) {
      clearInterval(this.previewIntervals[name]);
      this.previewIntervals[name] = null;
    }

    this.currentPreviewIndexes[name] = 0;
  }

  async onSubmit() {
    if (this.isCooldown()) return;

    if (this.contactForm.valid) {
      this.isSubmitting.set(true);
      this.isError.set(false);
      this.isSuccess.set(false);

      try {
        await this.contactService.sendEmail(this.contactForm.value);
        this.isSuccess.set(true);
        this.contactForm.reset();
        this.startCooldown();

        // Clear success message after 5 seconds
        setTimeout(() => this.isSuccess.set(false), 5000);
      } catch (err) {
        console.error('Failed to send email:', err);
        this.isError.set(true);
      } finally {
        this.isSubmitting.set(false);
      }
    } else {
      Object.keys(this.contactForm.controls).forEach((key) => {
        const control = this.contactForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  private startCooldown() {
    this.isCooldown.set(true);
    this.cooldownRemaining.set(this.COOLDOWN_TIME);

    this.cooldownInterval = setInterval(() => {
      this.cooldownRemaining.update((val) => val - 1);
      if (this.cooldownRemaining() <= 0) {
        this.clearCooldown();
      }
    }, 1000);
  }

  private clearCooldown() {
    if (this.cooldownInterval) {
      clearInterval(this.cooldownInterval);
      this.cooldownInterval = null;
    }
    this.isCooldown.set(false);
    this.cooldownRemaining.set(0);
  }
}
