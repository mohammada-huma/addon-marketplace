import { provideHelmPageExtension } from '@huma-engineering/portal-helm/extensions';

export const MarketplaceHelmExtension = provideHelmPageExtension([
  {
    id: crypto.randomUUID(),
    name: 'Marketplace',
    sidebarTitle: 'Marketplace',
    sidebarIcon: 'store',
    route: {
      path: 'marketplace',
      loadComponent: () =>
        import(
          './marketplace-helm-extension/marketplace-helm-extension.component'
        ).then((c) => c.MarketplaceHelmExtensionComponent),
    },
  },
]);
