import {
  Component,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  signal,
  NgZone,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface CodeToken {
  text: string;
  cls: string;
}

@Component({
  selector: 'app-hero-visual',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="relative w-full flex items-center justify-center select-none py-6"
      style="perspective: 1200px;"
    >
      <div
        class="absolute inset-6 bg-gradient-to-r from-primary-500/15 to-purple-500/15 rounded-full blur-3xl opacity-70 pointer-events-none"
      ></div>

      <div
        #tiltCard
        (mousemove)="onTiltMove($event)"
        (mouseleave)="onTiltLeave()"
        class="relative z-10 w-full max-w-md animate-float-card transition-transform duration-200 ease-out"
        [style.transform]="tiltTransform()"
      >
        <div
          class="rounded-xl border border-white/10 bg-[#0b0e14] shadow-2xl shadow-black/50 overflow-hidden"
        >
          <div class="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
            <span class="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
            <span class="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
            <span class="w-3 h-3 rounded-full bg-[#27c93f]"></span>
            <span class="ml-3 text-xs font-mono text-text-muted">developer.ts</span>
          </div>

          <div
            class="px-5 py-5 text-[13px] sm:text-sm font-mono leading-relaxed overflow-x-auto min-h-[260px] sm:min-h-[280px]"
          >
            @for (line of codeLines; track $index) {
              @if ($index < visibleLineCount()) {
                <div class="whitespace-pre">
                  @for (token of line; track $index) {
                    <span [class]="token.cls">{{ token.text }}</span>
                  }
                  @if ($index === visibleLineCount() - 1) {
                    <span class="cursor-blink"></span>
                  }
                </div>
              }
            }
          </div>
        </div>

        <div class="relative mx-auto -mt-1 h-3 w-[92%] rounded-b-xl bg-gradient-to-b from-white/10 to-white/0 border-x border-b border-white/10"></div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }
      pre {
        margin: 0;
        white-space: pre;
      }
    `,
  ],
})
export class HeroVisualComponent implements AfterViewInit, OnDestroy {
  @ViewChild('tiltCard') private cardRef!: ElementRef<HTMLDivElement>;

  private ngZone = inject(NgZone);

  visibleLineCount = signal(0);
  tiltTransform = signal('rotateX(0deg) rotateY(0deg)');

  private typeIntervalId?: ReturnType<typeof setInterval>;
  private loopTimeoutId?: ReturnType<typeof setTimeout>;

  readonly codeLines: CodeToken[][] = [
    [
      { text: 'class ', cls: 'text-purple-400' },
      { text: 'Developer', cls: 'text-primary-300' },
      { text: ' {', cls: 'text-slate-400' },
    ],
    [
      { text: '  constructor', cls: 'text-emerald-300' },
      { text: '() {', cls: 'text-slate-400' },
    ],
    [
      { text: '    this.name', cls: 'text-sky-300' },
      { text: ' = ', cls: 'text-slate-400' },
      { text: "'Youssef Ezzat'", cls: 'text-amber-300' },
      { text: ';', cls: 'text-slate-400' },
    ],
    [
      { text: '    this.role', cls: 'text-sky-300' },
      { text: ' = ', cls: 'text-slate-400' },
      { text: "'Frontend Developer'", cls: 'text-amber-300' },
      { text: ';', cls: 'text-slate-400' },
    ],
    [
      { text: '    this.stack', cls: 'text-sky-300' },
      { text: ' = [', cls: 'text-slate-400' },
    ],
    [
      { text: "      'Angular'", cls: 'text-amber-300' },
      { text: ',', cls: 'text-slate-400' },
    ],
    [
      { text: "      'TypeScript'", cls: 'text-amber-300' },
      { text: ',', cls: 'text-slate-400' },
    ],
    [{ text: "      'RxJS'", cls: 'text-amber-300' }],
    [{ text: '    ];', cls: 'text-slate-400' }],
    [{ text: '  }', cls: 'text-slate-400' }],
    [{ text: '', cls: '' }],
    [
      { text: '  build', cls: 'text-emerald-300' },
      { text: 'UI() {', cls: 'text-slate-400' },
    ],
    [
      { text: '    return ', cls: 'text-purple-400' },
      { text: "'Clean, fast, pixel-perfect ✨'", cls: 'text-amber-300' },
      { text: ';', cls: 'text-slate-400' },
    ],
    [{ text: '  }', cls: 'text-slate-400' }],
    [{ text: '}', cls: 'text-slate-400' }],
  ];

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.startTypingLoop();
    });
  }

  private startTypingLoop(): void {
    const totalLines = this.codeLines.length;

    const typeNext = () => {
      this.typeIntervalId = setInterval(() => {
        this.ngZone.run(() => {
          const next = this.visibleLineCount() + 1;
          this.visibleLineCount.set(next);
          if (next >= totalLines) {
            clearInterval(this.typeIntervalId);
            this.loopTimeoutId = setTimeout(() => {
              this.visibleLineCount.set(0);
              typeNext();
            }, 3200);
          }
        });
      }, 220);
    };

    typeNext();
  }

  onTiltMove(event: MouseEvent): void {
    const rect = this.cardRef.nativeElement.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    const rotateY = x * 14;
    const rotateX = -y * 14;

    this.tiltTransform.set(`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  }

  onTiltLeave(): void {
    this.tiltTransform.set('rotateX(0deg) rotateY(0deg)');
  }

  ngOnDestroy(): void {
    clearInterval(this.typeIntervalId);
    clearTimeout(this.loopTimeoutId);
  }
}
