import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),

    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'D',
        },
        display: {
          dateInput: 'DDD',
          monthYearLabel: 'LLL yyyy',
          dateA11yLabel: 'DD',
          monthYearA11yLabel: 'LLLL yyyy',
        },
      },
    },
  ],
};
