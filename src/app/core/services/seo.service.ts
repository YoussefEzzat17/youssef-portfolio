import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly siteUrl = 'https://youssef-ezzat.vercel.app';
  private readonly previewImage = `${this.siteUrl}/preview.png`;

  constructor(
    private title: Title,
    private meta: Meta,
  ) {}

  setMetaTags(config: { title: string; description: string; image?: string; keywords?: string }) {
    const image = config.image || this.previewImage;

    // Page Title
    this.title.setTitle(`Youssef Ezzat | ${config.title}`);

    // Standard SEO
    this.meta.updateTag({
      name: 'description',
      content: config.description,
    });

    this.meta.updateTag({
      name: 'keywords',
      content:
        config.keywords ||
        'Frontend Developer, Angular, React, TypeScript, Portfolio, Youssef Ezzat',
    });

    // Open Graph (WhatsApp, Facebook, LinkedIn)
    this.meta.updateTag({
      property: 'og:title',
      content: config.title,
    });

    this.meta.updateTag({
      property: 'og:description',
      content: config.description,
    });

    this.meta.updateTag({
      property: 'og:image',
      content: image,
    });

    this.meta.updateTag({
      property: 'og:url',
      content: this.siteUrl,
    });

    this.meta.updateTag({
      property: 'og:site_name',
      content: 'Youssef Ezzat Portfolio',
    });

    this.meta.updateTag({
      property: 'og:type',
      content: 'website',
    });

    // Twitter Preview
    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });

    this.meta.updateTag({
      name: 'twitter:title',
      content: config.title,
    });

    this.meta.updateTag({
      name: 'twitter:description',
      content: config.description,
    });

    this.meta.updateTag({
      name: 'twitter:image',
      content: image,
    });
  }
}
