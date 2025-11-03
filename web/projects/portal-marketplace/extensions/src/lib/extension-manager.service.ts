import { computed, inject, Injectable } from '@angular/core';
import { ExtensionManager } from '@huma-engineering/app-kit';
import {
  SAMPLE_EXTENSION_TOKEN,
  SampleExtensionType,
} from './sample-extension';

/**
 * Extension Manager service.
 */
@Injectable({
  providedIn: 'root',
})
export class MarketplaceExtensionManagerService implements ExtensionManager {
  readonly extensions = computed(() => {
    return [...(this.getSampleExtensions() ?? [])];
  });

  private readonly _sampleExtensions = inject(SAMPLE_EXTENSION_TOKEN, {
    optional: true,
  });

  /**
   * Returns all registered sample extensions.
   */
  getSampleExtensions(): SampleExtensionType[] | null {
    return this._sampleExtensions;
  }
}
