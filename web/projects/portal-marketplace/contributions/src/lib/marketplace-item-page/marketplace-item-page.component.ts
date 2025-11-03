import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { TranslationDirective } from '@huma-engineering/tool-kit/i18n';
import { MarketplaceService } from '../service';
import { MarketplaceItem, MarketplaceItemStatus } from '../types';

/**
 *
 */
@Component({
  selector: 'huma-marketplace-item-page',
  imports: [
    TranslationDirective,
    MatDialogContent,
    MatButtonModule,
    MatDialogActions,
  ],
  templateUrl: './marketplace-item-page.component.html',
  styleUrl: './marketplace-item-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketplaceItemPageComponent {
  private readonly _dialogRef = inject(
    MatDialogRef<MarketplaceItemPageComponent>,
  );
  private readonly _marketplaceService = inject(MarketplaceService);
  readonly data = inject<{ item: MarketplaceItem }>(MAT_DIALOG_DATA);

  readonly isInstalled = computed<boolean>(
    () => this.data.item.status === MarketplaceItemStatus.INSTALLED,
  );

  onClose() {
    this._dialogRef.close(false);
  }

  onInstall() {
    this._marketplaceService.installPlugin(this.data.item.id).subscribe(() => {
      this._dialogRef.close(true);
    });
  }

  onUninstall() {
    this._marketplaceService
      .uninstallPlugin(this.data.item.id)
      .subscribe(() => {
        this._dialogRef.close(true);
      });
  }
}
