import { Injectable } from '@angular/core';

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor() {}

  trackEvent(eventName: string, params: any = {}) {
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, params);
    } else {
      console.log('Analytics Event:', eventName, params);
    }
  }

  trackPageView(url: string) {
    if (typeof gtag !== 'undefined') {
      gtag('config', 'G-XXXXXXXXXX', {
        page_path: url
      });
    }
  }
}
