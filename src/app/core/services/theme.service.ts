import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark';
export type ColorTheme = 'blue' | 'purple' | 'green';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  theme = signal<Theme>((localStorage.getItem('theme') as Theme) || 'dark');
  colorTheme = signal<ColorTheme>((localStorage.getItem('color-theme') as ColorTheme) || 'blue');

  constructor() {
    effect(() => {
      const currentTheme = this.theme();
      const currentColor = this.colorTheme();

      document.documentElement.setAttribute('data-theme', currentTheme);
      document.documentElement.setAttribute('data-color', currentColor);
      
      if (currentTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      localStorage.setItem('theme', currentTheme);
      localStorage.setItem('color-theme', currentColor);
    });
  }

  toggleTheme() {
    this.theme.update(t => t === 'light' ? 'dark' : 'light');
  }

  setColorTheme(color: ColorTheme) {
    this.colorTheme.set(color);
  }
}
