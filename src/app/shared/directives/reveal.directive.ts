import { Directive, ElementRef, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appReveal]',
  standalone: true
})
export class RevealDirective implements OnInit {
  @Input() delay = 0;
  @Input() direction: 'up' | 'down' | 'left' | 'right' = 'up';

  @HostBinding('class.reveal') baseClass = true;
  @HostBinding('class.active') isActive = false;
  @HostBinding('style.transition-delay') get transitionDelay() {
    return `${this.delay}ms`;
  }

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.isActive = true;
          observer.unobserve(this.el.nativeElement);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(this.el.nativeElement);
  }
}
