import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatTab, MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { TranslationDirective } from '@huma-engineering/tool-kit/i18n';
import { MarketplaceService } from '../service';
import { MarketplaceItemsListComponent } from './marketplace-items-list/marketplace-items-list.component';

/**
 *
 */
@Component({
  selector: 'huma-marketplace-helm-extension',
  imports: [
    TranslationDirective,
    MatTabsModule,
    MatTabGroup,
    MatTab,
    MarketplaceItemsListComponent,
  ],
  templateUrl: './marketplace-helm-extension.component.html',
  styleUrl: './marketplace-helm-extension.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketplaceHelmExtensionComponent {
  private readonly _marketplaceService = inject(MarketplaceService);

  readonly resource = this._marketplaceService.marketplaceResource;
}
