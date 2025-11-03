import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
} from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslationDirective } from '@huma-engineering/tool-kit/i18n';
import { EmptyComponent } from '@huma-engineering/ui-kit/empty';
import { filter, tap } from 'rxjs/operators';
import { MarketplaceService } from '../../service';
import { MarketplaceItem, MarketplaceItemStatus } from '../../types';

/**
 *
 */
@Component({
  selector: 'huma-marketplace-items-list',
  imports: [
    EmptyComponent,
    MatProgressSpinner,
    TranslationDirective,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatCardSubtitle,
    MatButton,
    MatTabsModule,
    MatIcon,
  ],
  templateUrl: './marketplace-items-list.component.html',
  styleUrl: './marketplace-items-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketplaceItemsListComponent {
  private readonly _marketplaceService = inject(MarketplaceService);
  private readonly _dialog = inject(MatDialog);
  private readonly _destroyRef = inject(DestroyRef);
  readonly onlyInstalled = input<boolean>(false);
  readonly resource = this._marketplaceService.marketplaceResource;
  readonly items = computed(() =>
    this.resource.hasValue()
      ? this.resource
          .value()
          .items.filter((item) =>
            this.onlyInstalled()
              ? item.status === MarketplaceItemStatus.INSTALLED
              : true,
          )
          .map((item) => ({
            ...item,
            installed: item.status === MarketplaceItemStatus.INSTALLED,
          }))
      : [],
  );

  /**
   *
   * @param item - The marketplace item to view.
   */
  onViewItem(item: MarketplaceItem): void {
    void import(
      '../../marketplace-item-page/marketplace-item-page.component'
    ).then(({ MarketplaceItemPageComponent: component }) => {
      this._dialog
        .open(component, {
          data: {
            item,
          },
        })
        .afterClosed()
        .pipe(
          filter((result: boolean) => result),
          tap(() => this.resource.reload()),
          takeUntilDestroyed(this._destroyRef),
        )
        .subscribe();
    });
  }
}
