import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatTab, MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import {
  provideTranslationScope,
  TranslationDirective,
} from '@huma-engineering/tool-kit/i18n';
import { languageLoader } from '../i18n/src/loader';
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
  providers: [provideTranslationScope('marketplace', languageLoader())],
  templateUrl: './marketplace-helm-extension.component.html',
  styleUrl: './marketplace-helm-extension.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketplaceHelmExtensionComponent {
  private readonly _marketplaceService = inject(MarketplaceService);

  readonly resource = this._marketplaceService.marketplaceResource;
}
