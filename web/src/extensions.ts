import { Provider } from '@angular/core';
import { includingMarketplace } from '@huma-engineering/portal-marketplace/app';

export const extensions: Provider[] = [includingMarketplace()];
