import { StandaloneApp } from '@huma-engineering/app-kit';

/** Marketplace's Main Application Class */
export class MarketplaceApp extends StandaloneApp {
  override readonly id = 'PORTAL_MARKETPLACE';

  override readonly name = 'Marketplace portal';

  override readonly description = 'Sample description';

  override readonly routingConfig = {
    prefix: 'portal-marketplace',
    routeLoader: () =>
      import('./portal-marketplace.routes').then((r) => r.PORTAL_ROUTES),
  };

  /** @inheritdoc */
  override hasAccess(): boolean {
    return true;
  }
}
