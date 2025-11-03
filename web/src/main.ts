import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Route, RouterOutlet } from '@angular/router';
import { provideShellRoute } from '@huma-engineering/app-kit';
import { provideTranslations } from '@huma-engineering/tool-kit/i18n';
import { standaloneApps } from './enabled-apps';
import { environment } from './environments/environment.development';
import { shellEventsHandler } from './events';
import { extensions } from './extensions';

import {
  authRequestInterceptor,
  provideAuthentication,
  withCraftBackend,
  withEnvironment,
  withLocalStorage,
} from '@huma-engineering/auth-kit';
import { setupAuthProtectedRoutes } from '@huma-engineering/auth-kit/pages';

/** @ignore */
@Component({
  selector: 'huma-root',
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<router-outlet />`,
})
export class App {}

const shellRoute: Route = provideShellRoute();

bootstrapApplication(App, {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter([setupAuthProtectedRoutes([shellRoute])]),
    provideHttpClient(withInterceptors([authRequestInterceptor])),
    provideTranslations({
      availableLocales: ['en_GB'],
      defaultLocale: 'en_GB',
    }),
    provideAuthentication(
      withEnvironment({ hostUrl: environment.HOST_URL }),
      withLocalStorage(),
      withCraftBackend(),
    ),
    standaloneApps,
    shellEventsHandler,
    extensions,
  ],
}).catch((err: unknown) => console.error(err));
