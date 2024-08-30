import { provideImageKitLoader } from '@angular/common';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, isDevMode, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { provideTransloco } from '@jsverse/transloco';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';
import { authorizationInterceptor } from './interceptors/authorization.interceptor';
import { httpCacheInterceptor } from './interceptors/http-cache.interceptor';
import { TranslocoHttpLoader } from './transloco-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideExperimentalZonelessChangeDetection(),
    // provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([httpCacheInterceptor, authorizationInterceptor, authInterceptor])),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideHttpClient(withFetch()),
    provideTransloco({
      config: {
        availableLangs: ['en', 'vi'],
        defaultLang: environment.language,
        fallbackLang: environment.language,
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    importProvidersFrom([NgxSkeletonLoaderModule.forRoot()]),
    provideImageKitLoader('https://ik.imagekit.io/9mx5jcsss/'),
  ],
};
