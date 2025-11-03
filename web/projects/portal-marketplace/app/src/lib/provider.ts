import { Provider } from '@angular/core';
import { includingHelm } from '@huma-engineering/portal-helm/app';
import { MarketplaceHelmExtension } from '@huma-engineering/portal-marketplace/contributions';

/**
 *
 */
export const includingMarketplace: () => Provider[] = () => [
  MarketplaceHelmExtension,
  ...includingHelm().providers,
];
