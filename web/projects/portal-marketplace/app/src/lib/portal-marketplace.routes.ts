import { Routes } from '@angular/router';
import { languageLoader } from '@huma-engineering/portal-marketplace/i18n';
import { provideTranslationScope } from '@huma-engineering/tool-kit/i18n';

export const PORTAL_ROUTES: Routes = [
  {
    path: 'main',
    providers: [provideTranslationScope('marketplace', languageLoader())],
    loadComponent: () =>
      import('./portal-marketplace.component').then((c) => c.Marketplace),
    children: [],
  },
  {
    path: '**',
    redirectTo: 'main',
  },
];
