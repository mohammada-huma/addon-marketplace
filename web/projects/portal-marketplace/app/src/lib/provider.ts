import { createStandaloneAppProvider } from '@huma-engineering/app-kit';
import { includingHelm } from '@huma-engineering/portal-helm/app';
import { MarketplaceHelmExtension } from 'projects/portal-marketplace/contributions/src/lib/provider';
import { MarketplaceApp } from './portal-marketplace.app';

/**
 * Provides the Marketplace as a standalone application.
 */
export const includingMarketplace = createStandaloneAppProvider(
  MarketplaceApp,
  MarketplaceHelmExtension,
  ...includingHelm().providers,
);
