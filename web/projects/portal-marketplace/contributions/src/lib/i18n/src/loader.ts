import { type LanguageLoader } from '@huma-engineering/tool-kit/i18n';

/**
 * Returns an object containing the loader function for all supported languages.
 */
export function languageLoader(): LanguageLoader {
  // Hello, future Huma(n) :) You may be thinking about refactoring this ugly function
  // and using `reduce` to dynamically generate this `LanguageLoader`... but DO NOT do that,
  // as it causes ng-packagr to not be able to correctly analyze the files in the `import()`
  // function, and therefore it will not correctly bundle them with the rest of files, and
  // your package ends up not showing any of the translations.
  return {
    ar: () => import('./ar.json'),
    en_GB: () => import('./en_GB.json'),
    en_US: () => import('./en_US.json'),
  };
}
