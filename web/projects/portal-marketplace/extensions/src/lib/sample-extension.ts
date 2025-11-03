import { InjectionToken, type Provider, type Type } from '@angular/core';
import { type Extension } from '@huma-engineering/app-kit';

// TODO: Remove 'sample' from these types and functions
// TODO: Remove the entire thing if product doesn't need extensions
export interface SampleExtensionType extends Extension {
  componentLoader: () => Promise<Type<unknown>>;
}

export const SAMPLE_EXTENSION_TOKEN = new InjectionToken<SampleExtensionType[]>(
  'SAMPLE_EXTENSION_TOKEN',
);

/**
 * TODO: A sample JSDoc explaining what this extension function does.
 */
export function provideSampleExtension(
  cmpLoader: SampleExtensionType['componentLoader'],
  name: string,
): Provider {
  return {
    provide: SAMPLE_EXTENSION_TOKEN,
    useValue: {
      id: crypto.randomUUID(),
      componentLoader: cmpLoader,
      name,
    } satisfies SampleExtensionType,
  };
}
